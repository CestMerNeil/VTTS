import json
import os

# 获取 stellarcore 目录的绝对路径
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_available_models():
    """读取模型元数据文件并返回可用的模型列表"""
    try:
        metadata_path = os.path.join(BASE_DIR, 'services', 'models', 'metadata.json')
        with open(metadata_path, 'r', encoding='utf-8') as f:
            models = json.load(f)
            
            # 更新所有模型文件的路径为绝对路径
            for model in models.values():
                model['config_path'] = os.path.join(BASE_DIR, model['config_path'])
                model['model_file'] = os.path.join(BASE_DIR, model['model_file'])
                model['scale_stats'] = os.path.join(BASE_DIR, model['scale_stats'])
                
        return models
    except Exception as e:
        print(f"Error loading models metadata: {e}")
        return {}