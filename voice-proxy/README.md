
# Voice Proxy Backend (Gemini Live)

This is a secure, server-side WebSocket proxy that authenticates with Google Cloud Vertex AI using Service Account credentials. It bridges the frontend (browser) to the Gemini Live API without exposing API keys.

## Prerequisites

1.  **Google Cloud Project** with billing enabled.
2.  **Google Cloud CLI** installed (or use Cloud Shell).

## Deployment Steps

Run these commands in your terminal (from the project root):

### 1. Setup Environment
Replace `YOUR_PROJECT_ID` with your actual GCP Project ID.

```bash
export PROJECT_ID=YOUR_PROJECT_ID
export LOCATION=us-central1
gcloud config set project $PROJECT_ID
```

### 2. Enable APIs
Enable Vertex AI and Cloud Run.

```bash
gcloud services enable aiplatform.googleapis.com run.googleapis.com cloudbuild.googleapis.com
```

### 3. Deploy to Cloud Run
This builds the container and deploys it in one step.

```bash
gcloud run deploy voice-proxy \
  --source ./voice-proxy \
  --platform managed \
  --region $LOCATION \
  --allow-unauthenticated \
  --set-env-vars PROJECT_ID=$PROJECT_ID,LOCATION=$LOCATION
```

### 4. Get the URL
After deployment, Cloud Run will output a Service URL (e.g., `https://voice-proxy-xxxxx-uc.a.run.app`).

### 5. Configure Frontend
1.  Copy the URL.
2.  Change `https://` to `wss://`.
3.  Set this as the environment variable `VITE_LIVE_VOICE_WS_URL` in your frontend deployment (Vercel/Netlify) or `.env` file for local development.

## Troubleshooting

*   **Logs:** Check Cloud Run logs for "Setup frame sent".
*   **Permissions:** The default Compute Engine service account usually has access. If not, ensure the service account attached to Cloud Run has the `Vertex AI User` role.
