import os
import uuid
from pathlib import Path
from TTS.api import TTS
from services.get_models import get_available_models

# 获取 stellarcore 目录的绝对路径
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def ensure_audio_directory():
    """确保音频输出目录存在"""
    audio_dir = Path(os.path.join(BASE_DIR, 'services', 'audio'))
    audio_dir.mkdir(parents=True, exist_ok=True)
    return audio_dir

def generate_audio(text, model_name, file_name=None):
    """使用指定的模型生成音频"""
    models = get_available_models()
    if model_name not in models:
        raise ValueError(f"Model {model_name} not supported")
    
    model_info = models[model_name]
    config_path = model_info['config_path']
    model_path = model_info['model_file']
    scale_stats = model_info['scale_stats']
    
    if not all([os.path.exists(config_path), os.path.exists(model_path), os.path.exists(scale_stats)]):
        raise FileNotFoundError(f"One or more model files not found: {config_path}, {model_path}, {scale_stats}")
    
    # 确保音频输出目录存在
    audio_dir = ensure_audio_directory()
    
    # 生成唯一的输出文件名
    output_file = f"{model_name}_{uuid.uuid4()}.wav"
    if file_name:
        output_file = f"{file_name}.wav"
    output_path = str(audio_dir / output_file)
    
    try:
        # 初始化 TTS
        tts = TTS(
            model_path=model_path,
            config_path=config_path,
            progress_bar=False,
            gpu=False
        )
        
        # 生成音频
        tts.tts_to_file(text=text, file_path=output_path)
        return output_path
    except Exception as e:
        raise RuntimeError(f"Error generating audio: {str(e)}")

def list_generated_audios():
    """列出所有生成的音频文件"""
    audio_dir = Path(os.path.join(BASE_DIR, 'services', 'audio'))
    if not audio_dir.exists():
        return []
    
    return [str(f.absolute()) for f in audio_dir.glob("*.wav")]