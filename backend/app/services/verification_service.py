class VerificationService:
    def generate_verification_text(self, intent: str, entities: dict) -> str:
        issue = entities.get("issue", "samasyegalu")
        return f"Neevu {issue} bagge dhooru needuttiddira, sariya?"

    def handle_confirmation(self, confirmed: bool, call_id: str) -> bool:
        return confirmed

    def refine_on_rejection(self, call_id: str) -> str:
        return "Kshamisiri, nimma dhooru enu anta matte heluvira?"
