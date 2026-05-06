import os
import requests
from typing import Dict

class IntelligenceService:
    def __init__(self):
        self.hf_token = os.getenv("HF_TOKEN", "")
        self.groq_api_key = os.getenv("GROQ_API_KEY", "")
        # Standard endpoints
        self.groq_url = "https://api.groq.com/openai/v1/chat/completions"
        self.groq_whisper_url = "https://api.groq.com/openai/v1/audio/transcriptions"

    def detect_language(self, audio_data: bytes) -> str:
        # Using MMS-LID on Hugging Face for auto-detection
        API_URL = "https://api-inference.huggingface.co/models/facebook/mms-lid-126"
        headers = {"Authorization": f"Bearer {self.hf_token}"}
        try:
            response = requests.post(API_URL, headers=headers, data=audio_data, timeout=10)
            result = response.json()
            # Returns 'kan', 'hin', 'eng' etc.
            return result[0]['label'] if isinstance(result, list) else "eng"
        except:
            return "eng"

    def transcribe_audio(self, audio_file_path: str) -> str:
        """REAL ASR using Groq Whisper"""
        if not self.groq_api_key:
            return "Groq API key missing. Configure GROQ_API_KEY."
            
        headers = {"Authorization": f"Bearer {self.groq_api_key}"}
        with open(audio_file_path, "rb") as f:
            files = {
                "file": (os.path.basename(audio_file_path), f, "audio/wav"),
                "model": (None, "whisper-large-v3"),
                "language": (None, "kn") # Optional: Auto-detects if omitted
            }
            response = requests.post(self.groq_whisper_url, headers=headers, files=files, timeout=20)
            
        if response.status_code == 200:
            return response.json().get("text", "")
        return f"ASR Error: {response.text}"

    def generate_reply(self, text: str, language: str = "eng") -> str:
        """REAL LLM Reply using Groq Llama-3"""
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        prompt = f"As a Karnataka Helpline Agent, reply to this in {language}: {text}. Keep it under 50 words."
        payload = {
            "model": "llama3-8b-8192",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.5
        }
        response = requests.post(self.groq_url, headers=headers, json=payload, timeout=15)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        return "I am processing your request. Please hold."

intelligence = IntelligenceService()
