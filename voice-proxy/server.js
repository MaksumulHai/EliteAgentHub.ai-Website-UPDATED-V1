
const WebSocket = require('ws');
const { GoogleAuth } = require('google-auth-library');

const PORT = Number(process.env.PORT) || 8080;
const LOCATION = process.env.LOCATION || 'us-central1';
const PROJECT_ID = process.env.PROJECT_ID;
const MODEL = 'gemini-2.5-flash-native-audio-preview-12-2025';

if (!PROJECT_ID) {
  console.error("FATAL: PROJECT_ID environment variable is missing.");
  process.exit(1);
}

const UPSTREAM_URL = `wss://${LOCATION}-aiplatform.googleapis.com/ws/google.cloud.aiplatform.v1.LlmBidiService/BidiGenerateContent`;

const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', async (clientWs) => {
  console.log('[Proxy] Client connected');
  let upstreamWs = null;
  let heartbeat = null;
  let isClosed = false;

  const cleanup = (code = 1000, reason = 'session_closed') => {
    if (isClosed) return;
    isClosed = true;

    if (heartbeat) {
      clearInterval(heartbeat);
      heartbeat = null;
    }

    // Graceful upstream close
    if (upstreamWs && upstreamWs.readyState === WebSocket.OPEN) {
      try { upstreamWs.close(1000, 'client_disconnect'); } catch (e) { console.error(e); }
    }

    // Graceful client close
    if (clientWs.readyState === WebSocket.OPEN) {
      try { clientWs.close(code, reason); } catch (e) { console.error(e); }
    }
    
    console.log(`[Proxy] Session ended: ${reason}`);
  };

  try {
    // 1. Authenticate via Service Account (Cloud Run)
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const accessToken = tokenResponse.token;

    if (!accessToken) throw new Error("Could not acquire access token");

    // 2. Connect to Gemini Live
    upstreamWs = new WebSocket(UPSTREAM_URL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    upstreamWs.on('open', () => {
      console.log('[Proxy] Upstream open. Sending setup...');

      // 3. Send Setup Frame (Required)
      const setupFrame = {
        setup: {
          model: `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}`,
          generation_config: {
            response_modalities: ["AUDIO"],
            speech_config: {
              voice_config: {
                prebuilt_voice_config: {
                  voice_name: "Kore"
                }
              }
            },
            vad_config: {
              start_sensitivity: "LOW",
              end_sensitivity: "HIGH"
            }
          },
          system_instruction: {
            parts: [
              {
                text: "You are Josh, an Elite Agent Hub voice demo. Speak naturally and professionally. Keep responses under 40 words. Spoken audio only. No markdown. No lists. No medical, legal, or emergency advice."
              }
            ]
          }
        }
      };
      upstreamWs.send(JSON.stringify(setupFrame));

      // 4. JSON Heartbeat (Protocol Requirement)
      // Send an empty media chunk every 5 seconds to keep the Bidi stream alive
      heartbeat = setInterval(() => {
        if (upstreamWs.readyState === WebSocket.OPEN) {
          const heartbeatFrame = { realtime_input: { media_chunks: [] } };
          upstreamWs.send(JSON.stringify(heartbeatFrame));
        }
      }, 5000);
    });

    // Pipe: Upstream -> Client
    upstreamWs.on('message', (data) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(data);
      }
    });

    // Pipe: Client -> Upstream
    clientWs.on('message', (data) => {
      if (upstreamWs && upstreamWs.readyState === WebSocket.OPEN) {
        upstreamWs.send(data);
      }
    });

    // Error Handling
    upstreamWs.on('close', () => cleanup(1000, 'upstream_closed'));
    upstreamWs.on('error', (e) => {
      console.error('[Proxy] Upstream error:', e.message);
      cleanup(1011, 'upstream_error');
    });

    clientWs.on('close', () => cleanup(1000, 'client_closed'));
    clientWs.on('error', (e) => {
      console.error('[Proxy] Client error:', e.message);
      cleanup(1011, 'client_error');
    });

  } catch (err) {
    console.error('[Proxy] Handshake/Auth failed:', err.message);
    clientWs.close(1011, 'auth_failed');
  }
});

console.log(`[Proxy] Listening on port ${PORT}`);
