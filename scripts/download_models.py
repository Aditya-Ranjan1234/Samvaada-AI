import os
import torch
from transformers import AutoModel, AutoTokenizer
import whisper

def download_tiny_models():
    base_path = "d:/6th Sem/ai for bharat/samvaada-ai/ml-models"
    os.makedirs(base_path, exist_ok=True)

    # 1. Whisper Tiny (ASR) - ~75MB
    print("Downloading Whisper Tiny...")
    asr_path = os.path.join(base_path, "asr")
    os.makedirs(asr_path, exist_ok=True)
    whisper.load_model("tiny", download_root=asr_path)
    print(f"Whisper Tiny verified/saved to {asr_path}")

    # 2. TinyBERT (NLU) - ~17MB (Ultra-stable)
    print("Downloading TinyBERT NLU...")
    nlu_model_name = "google/bert_uncased_L-2_H-128_A-2"
    nlu_path = os.path.join(base_path, "nlu")
    os.makedirs(nlu_path, exist_ok=True)
    
    tokenizer = AutoTokenizer.from_pretrained(nlu_model_name)
    model = AutoModel.from_pretrained(nlu_model_name)
    
    tokenizer.save_pretrained(nlu_path)
    model.save_pretrained(nlu_path)
    print(f"NLU model saved to {nlu_path}")

if __name__ == "__main__":
    download_tiny_models()
