class SentimentService:
    def analyze_speech(self, audio_bytes: bytes) -> dict:
        return {"emotion": "neutral", "anger_score": 0.1}

    def analyze_text(self, text: str) -> dict:
        return {"sentiment": "neutral", "distress_score": 0.1}

    def compute_urgency_score(self) -> str:
        return "LOW"
