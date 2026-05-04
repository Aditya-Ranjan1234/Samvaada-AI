import os
import requests

class IntelligenceService:
    def __init__(self):
        self.api_token = os.getenv("HF_TOKEN")
        self.headers = {"Authorization": f"Bearer {self.api_token}"}
        
        # Models
        self.llm_url = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct"
        self.lid_url = "https://api-inference.huggingface.co/models/facebook/mms-lid-126"

    def detect_language(self, audio_data):
        # Auto-detect language from audio
        response = requests.post(self.lid_url, headers=self.headers, data=audio_data)
        if response.status_code == 200:
            return response.json()[0]['label'] # e.g., 'kan', 'eng'
        return "eng"

    def generate_reply(self, transcript, language="English"):
        # Generate professional response via Llama-3
        prompt = f"You are a helpful assistant for the Karnataka Government Samvaada Helpline. The citizen said: '{transcript}'. Reply in {language} in a professional and empathetic manner. Keep it short."
        
        payload = {
            "inputs": prompt,
            "parameters": {"max_new_tokens": 100, "return_full_text": False}
        }
        
        response = requests.post(self.llm_url, headers=self.headers, json=payload)
        if response.status_code == 200:
            return response.json()[0]['generated_text']
        return "Thank you for your inquiry. An agent will assist you shortly."

intelligence = IntelligenceService()
