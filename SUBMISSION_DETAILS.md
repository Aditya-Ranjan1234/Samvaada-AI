# 🚀 Project Submission: Samvaada AI | CivicVoice Intelligence

## 📌 Basic Information
- **Title**: Samvaada AI | CivicVoice Intelligence Platform
- **Synopsis**: A professional-grade, government-standard helpline intelligence workstation featuring real-time multilingual ASR, NLU intent mapping, and Llama-3 powered response generation.

## 📝 Project Description
Samvaada AI is a comprehensive AI-driven helpline platform designed for the Karnataka Government (1092 Helpline). It transforms voice calls into actionable intelligence through a high-authority "CivicVoice" design system.

**Key Capabilities:**
- **Real-time Multilingual Transcription**: Powered by Whisper-Tiny (optimized for low-latency).
- **Auto-Language Detection (LID)**: Automatically identifies Kannada, Hindi, and English speakers using the MMS-LID model.
- **Intelligence Loop**: Integrated Llama-3-8B-Instruct to generate professional, empathetic responses in the caller's native language.
- **Supervisor Dashboard**: Real-time operational analytics, sentiment heatmaps, and agent performance tracking.
- **Cloud-Hybrid Architecture**: Optimized for Vercel deployment (<250MB) while maintaining high-fidelity AI performance via Hugging Face Inference API.

## 🔗 Project Links
- **Demo Link**: [https://samvaada-ai.vercel.app](https://samvaada-ai.vercel.app)
- **Repository URL**: [https://github.com/Aditya-Ranjan1234/Samvaada-AI.git](https://github.com/Aditya-Ranjan1234/Samvaada-AI.git)

## 🛠️ Instructions to Run

### Local Setup (For Development/Privacy)
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/Aditya-Ranjan1234/Samvaada-AI.git
   cd samvaada-ai
   ```
2. **Setup Backend**:
   - Create a virtual environment: `python -m venv venv`
   - Activate it: `.\venv\Scripts\activate` (Windows)
   - Install dependencies: `pip install -r backend/requirements.txt`
   - Run download script: `python scripts/download_models.py`
   - Start FastAPI: `uvicorn backend.app.main:app --reload`
3. **Setup Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

### Production Deployment (Vercel)
1. Push the code to a GitHub repository.
2. Link the repository to **Vercel**.
3. Add the following **Environment Variables** in Vercel:
   - `POSTGRES_URL`: Your Supabase/Postgres connection string.
   - `HF_TOKEN`: Your Hugging Face API token (for Cloud ASR/LLM).
4. Vercel will auto-detect the `vercel.json` and deploy both the React frontend and FastAPI backend.

## 🎯 Themes & Impact
- **Theme**: AI for Governance / Civic Intelligence.
- **Idea**: Shortlisted prototype for "Voice-based Multilingual Helpline Intelligence for Rural Bharat."

---
*Generated for AI for Bharat Challenge 2026*
