# Samvaada AI | CivicVoice Intelligence Platform

Samvaada AI is a professional-grade, government-standard helpline intelligence platform. It provides real-time multilingual voice transcription, automated intent analysis (NLU), and supervisor analytics for large-scale administrative operations.

## 🚀 Key Features
- **Real-time Transcription**: Powered by local Whisper v3 models.
- **Indic NLU**: Intent and entity extraction for Indian languages using IndicBERT.
- **Supervisor Dashboard**: Live district-level sentiment heatmaps and operation KPIs.
- **Secure Operator Portal**: High-authority "CivicVoice" UI with 2FA simulation.
- **100% Local**: Optimized for offline/air-gapped government environments.

## 📁 Project Structure
- `/frontend`: React + Vite + Tailwind v4 (UI Workstation)
- `/backend`: FastAPI + Python (Intelligence Engine)
- `/ml-models`: Local storage for Whisper and IndicBERT weights.
- `/scripts`: Automation for model acquisition and system health.

## 🛠️ How to Run Locally

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- Virtual Environment (venv)

### 2. Setup Backend
```powershell
cd backend
# Create and activate venv
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download ML Models (First time only)
python ..\scripts\download_models.py

# Run server
uvicorn app.main:app --reload --port 8000
```

### 3. Setup Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open [http://localhost:5176](http://localhost:5176) to access the portal.

## 🌐 Hosting (Vercel / Cloud)
The project is configured for Vercel via the root `vercel.json`.

**Important Note:** 
Because this platform uses large-scale ML models (Whisper), the **Backend Intelligence Engine** requires a server with a GPU or significant RAM. For cloud hosting, it is recommended to host the backend on a GPU-enabled VPS or use a dedicated ML host (like Modal or Replicate) and point the frontend to that endpoint.

## 🔑 Default Credentials
- **Username:** `admin`
- **Password:** `admin`

---
© 2024 Samvaada Civic Intelligence | Built for Bharat
