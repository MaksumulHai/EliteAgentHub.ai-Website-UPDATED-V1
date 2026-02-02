
import React, { useState, useEffect, useRef } from 'react';

interface VoiceAgentDemoProps {
    onClose?: () => void;
}

/**
 * PRODUCTION CONFIGURATION:
 * 1. Deploy 'voice-proxy' to Google Cloud Run.
 * 2. Set VITE_LIVE_VOICE_WS_URL in your .env or Vercel config.
 *    Example: wss://voice-proxy-xyz-uc.a.run.app
 * 3. Set STREAMING_VOICE_ENABLED = true below.
 */
const STREAMING_VOICE_ENABLED = false; // KEEP FALSE until backend is verified
const WS_URL = (import.meta as any).env?.VITE_LIVE_VOICE_WS_URL || '';

const VoiceAgentDemo: React.FC<VoiceAgentDemoProps> = ({ onClose }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [status, setStatus] = useState<'Idle' | 'Connecting' | 'Live' | 'Error'>('Idle');
    
    const socketRef = useRef<WebSocket | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const micStreamRef = useRef<MediaStream | null>(null);

    // Binary Utilities
    const float32ToInt16 = (buffer: Float32Array) => {
        let l = buffer.length;
        const buf = new Int16Array(l);
        while (l--) {
            buf[l] = Math.max(-1, Math.min(1, buffer[l])) * 0x7FFF;
        }
        return buf.buffer;
    };

    const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const base64ToUint8 = (base64: string) => {
        const binary = window.atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    };

    const stopSession = () => {
        setIsConnected(false);
        setStatus('Idle');
        socketRef.current?.close();
        audioCtxRef.current?.close();
        micStreamRef.current?.getTracks().forEach(t => t.stop());
        
        audioCtxRef.current = null;
        socketRef.current = null;
        micStreamRef.current = null;
    };

    const startSession = async () => {
        if (!STREAMING_VOICE_ENABLED || !WS_URL) {
            alert("Backend not configured. Please see VoiceAgentDemo.tsx comments.");
            return;
        }

        try {
            setStatus('Connecting');
            
            // 1. Init Audio Context at 24kHz (Gemini Output Rate)
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            // 2. Open Mic
            micStreamRef.current = await navigator.mediaDevices.getUserMedia({ 
                audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } 
            });
            
            // 3. Connect Proxy
            socketRef.current = new WebSocket(WS_URL);
            
            socketRef.current.onopen = () => {
                setIsConnected(true);
                setStatus('Live');
                startMicStreaming();
            };

            socketRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                // Handle Audio Output
                const audioB64 = data.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (audioB64 && audioCtxRef.current) {
                    processIncomingAudio(audioB64);
                }

                // Handle Interruptions (Barge-in)
                if (data.serverContent?.interrupted) {
                    nextStartTimeRef.current = audioCtxRef.current?.currentTime || 0;
                }
            };

            socketRef.current.onclose = () => stopSession();
            socketRef.current.onerror = () => setStatus('Error');

        } catch (err) {
            console.error("Voice Engine Failure:", err);
            setStatus('Error');
        }
    };

    const startMicStreaming = () => {
        if (!audioCtxRef.current || !micStreamRef.current) return;

        const source = audioCtxRef.current.createMediaStreamSource(micStreamRef.current);
        const processor = audioCtxRef.current.createScriptProcessor(4096, 1, 1);
        
        processor.onaudioprocess = (e) => {
            if (socketRef.current?.readyState !== WebSocket.OPEN) return;
            
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBuffer = float32ToInt16(inputData);
            
            const realtimeInput = {
                realtimeInput: {
                    media: {
                        data: arrayBufferToBase64(pcmBuffer),
                        mimeType: 'audio/pcm;rate=16000'
                    }
                }
            };
            socketRef.current.send(JSON.stringify(realtimeInput));
        };

        source.connect(processor);
        processor.connect(audioCtxRef.current.destination);
    };

    const processIncomingAudio = (base64: string) => {
        if (!audioCtxRef.current) return;
        
        const raw = base64ToUint8(base64);
        const int16 = new Int16Array(raw.buffer);
        const buffer = audioCtxRef.current.createBuffer(1, int16.length, 24000);
        const channelData = buffer.getChannelData(0);
        
        for (let i = 0; i < int16.length; i++) {
            channelData[i] = int16[i] / 32768.0;
        }

        const source = audioCtxRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtxRef.current.destination);
        
        const startTime = Math.max(nextStartTimeRef.current, audioCtxRef.current.currentTime);
        source.start(startTime);
        nextStartTimeRef.current = startTime + buffer.duration;
    };

    // Maintenance View
    if (!STREAMING_VOICE_ENABLED) {
        return (
            <div className="flex flex-col h-full min-h-[500px] w-full bg-white text-slate-900 font-sans rounded-3xl overflow-hidden shadow-sm p-8 text-center justify-center space-y-8">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto border-4 border-amber-100">
                    <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">Browser Demo Offline</h3>
                    <p className="text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
                        We are currently upgrading Josh to our new <span className="text-primary font-bold">Streaming Voice Engine</span> for a more natural, low-latency experience.
                    </p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Primary Demo Available</p>
                    <p className="text-sm font-bold text-slate-900 mb-3">Call Belle on your mobile phone:</p>
                    <a href="tel:+18042233141" className="text-3xl font-black text-primary hover:text-primary-dark transition-colors">
                        (804) 223-3141
                    </a>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4">
                    <p className="text-[10px] text-slate-400 font-mono">
                        Developer: Backend Deployment Required.<br/>See VoiceAgentDemo.tsx
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-h-[550px] w-full bg-white text-slate-900 font-sans rounded-3xl overflow-hidden shadow-sm pointer-events-auto border-4 border-slate-50">
            {/* Live Visualizer UI */}
            <div className="p-5 border-b flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-inner">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-base font-black uppercase tracking-tight">Josh (Live Streaming)</h3>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Enterprise Voice Protocol</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-10 bg-gradient-to-b from-white to-slate-50/50">
                <div className="relative">
                    <div className={`absolute inset-0 rounded-full bg-primary/20 transition-all duration-700 ${isConnected ? 'animate-ping scale-150 opacity-100' : 'scale-100 opacity-0'}`}></div>
                    <div className={`w-40 h-40 rounded-full flex items-center justify-center z-10 relative transition-all duration-500 ${isConnected ? 'bg-primary shadow-[0_0_60px_rgba(37,99,235,0.4)] border-4 border-white' : 'bg-slate-200'}`}>
                        {isConnected ? (
                            <div className="flex gap-1.5 items-center h-12">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-1.5 bg-white rounded-full animate-pulse" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 100}ms` }}></div>
                                ))}
                            </div>
                        ) : (
                            <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-3xl font-black text-slate-900 leading-tight">
                        {status === 'Connecting' ? "Connecting Stream..." : isConnected ? "Josh is Online" : "Voice Experience"}
                    </h4>
                    <p className="text-base text-slate-500 font-medium max-w-xs mx-auto">
                        {isConnected ? "Talk naturally. Josh is listening via server-side streaming." : "Experience low-latency AI conversation using the Gemini 2.5 Native Audio engine."}
                    </p>
                </div>

                <div className="w-full max-w-sm">
                    <button
                        onClick={isConnected ? stopSession : startSession}
                        disabled={status === 'Connecting'}
                        className={`w-full py-5 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-4 ${isConnected ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/30'} ${status === 'Connecting' ? 'opacity-50 cursor-wait' : ''}`}
                    >
                        {status === 'Connecting' ? "Establishing..." : isConnected ? "End Conversation" : "Start Conversation"}
                    </button>
                </div>
            </div>
            
            <div className="p-5 border-t text-center bg-white">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    WSS-PCM Proxy Protocol • 24kHz Sample Rate <br/> 
                    Server-Auth • Hands-Free Conversation
                </p>
            </div>
        </div>
    );
};

export default VoiceAgentDemo;
