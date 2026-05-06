# Samvaada AI | CivicVoice Intelligence Platform 🇮🇳

Samvaada AI is a professional-grade, government-standard helpline intelligence platform built for the **AI for Bharat** challenge. It bridges the communication gap between citizens and administration through real-time multilingual AI orchestration.

## 🌟 Core Value Proposition
Samvaada AI transforms traditional helplines into "Intelligent Civic Workstations." It automates the transcription, language detection, and response generation for Indian languages, allowing operators to handle complex civic issues with high-precision AI assistance.

## 🚀 Key Functionalities

### 1. Live Intelligence Workstation (Agent Dashboard)
- **Live Mic Simulation**: Real-time voice-to-text processing directly in the browser.
- **Multilingual Auto-Detection**: Seamlessly switches between **Kannada, Hindi, and English** using the MMS-LID (Language Identification) model.
- **AI-Generated Replies**: Integrated with **Groq Llama-3-8B** to provide empathetic, context-aware responses in the citizen's native tongue.
- **Entity & Intent Mapping**: Automatically extracts locations (e.g., "Richmond Road") and issue types (e.g., "Water Leakage").

### 2. Supervisor Oversight & Analytics
- **Operational KPIs**: Live tracking of call volume, agent accuracy, and average handling time (AHT).
- **Intent Trending**: Visualizes the most reported civic issues across districts.
- **Agent Performance**: Deep-dive into operator stats and verification scores.

### 3. High-Authority Design System
- **CivicVoice UI**: A curated design system using government-standard typography (Public Sans) and a "Clear Trust" color palette.
- **Interactive Panels**: Slide-over system settings and operator profile management.

## 🏗️ Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Material Symbols.
- **Backend**: FastAPI (Python 3.10+), SQLAlchemy.
- **Intelligence**: Groq Llama-3, Hugging Face Inference API, OpenAI Whisper.
- **Database**: PostgreSQL (Supabase) for persistent call logs and agent metrics.
- **Deployment**: Vercel (Monorepo architecture with serverless Python functions).

## 📁 Project Structure
- `/frontend`: React workstation UI.
- `/backend`: Intelligence engine and API routes.
- `/scripts`: Utility scripts for local model management.
- `vercel.json`: Cloud orchestration and routing configuration.

## 🛠️ Instructions to Run

### Local Environment
1. **Clone & Install**:
   ```bash
   git clone https://github.com/Aditya-Ranjan1234/Samvaada-AI.git
   cd samvaada-ai
   pip install -r backend/requirements.txt
   cd frontend && npm install
   ```
2. **Setup AI Models**:
   ```bash
   python scripts/download_models.py
   ```
3. **Launch**:
   - Backend: `uvicorn backend.app.main:app --reload`
   - Frontend: `npm run dev` (inside `/frontend`)

### Vercel Cloud Deployment
1. Connect your repository to Vercel.
2. Add `HF_TOKEN` and `GROQ_API_KEY` to Environment Variables.
3. Vercel will automatically deploy the **Hybrid Cloud Architecture** (<250MB bundle).

---
*Developed for the AI for Bharat Challenge 2026*
