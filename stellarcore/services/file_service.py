# services/file_service.py
import os
import shutil
from pathlib import Path
import json
import logging

class FileService:
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.models_dir = self.base_dir / 'services' / 'models'
        self.audio_dir = self.base_dir / 'services' / 'audio'
        
    def upload_model_files(self, language_code, config_file, model_file, scale_stats_file):
        """
        上传模型相关的三个文件
        
        Args:
            language_code: 语言代码 (例如: zh-CN)
            config_file: 配置文件
            model_file: 模型文件
            scale_stats_file: 统计文件
        """
        model_dir = self.models_dir / language_code
        model_dir.mkdir(parents=True, exist_ok=True)
        
        try:
            # 保存三个文件
            config_file.save(str(model_dir / 'config.json'))
            model_file.save(str(model_dir / 'model_file.pth'))
            scale_stats_file.save(str(model_dir / 'scale_stats.npy'))
            
            # 更新 metadata.json
            self._update_metadata(language_code)
            
            return {
                'status': 'success',
                'message': f'Model files for {language_code} uploaded successfully',
                'files': {
                    'config_path': str(model_dir / 'config.json'),
                    'model_file': str(model_dir / 'model_file.pth'),
                    'scale_stats': str(model_dir / 'scale_stats.npy')
                }
            }
            
        except Exception as e:
            # 如果上传过程中出错，删除已上传的文件
            if model_dir.exists():
                shutil.rmtree(model_dir)
            raise Exception(f"Error uploading model files: {str(e)}")

    def _update_metadata(self, language_code):
        """更新 metadata.json 文件"""
        metadata_path = self.models_dir / 'metadata.json'
        try:
            if metadata_path.exists():
                with open(metadata_path, 'r', encoding='utf-8') as f:
                    metadata = json.load(f)
            else:
                metadata = {}
            
            # 更新或添加新的语言模型信息
            metadata[language_code] = {
                'config_path': f'services/models/{language_code}/config.json',
                'model_file': f'services/models/{language_code}/model_file.pth',
                'scale_stats': f'services/models/{language_code}/scale_stats.npy'
            }
            
            with open(metadata_path, 'w', encoding='utf-8') as f:
                json.dump(metadata, f, indent=4, ensure_ascii=False)
                
        except Exception as e:
            raise Exception(f"Error updating metadata: {str(e)}")

    def delete_model_files(self, language_code):
        """
        删除指定语言的模型文件
        
        Args:
            language_code: 语言代码 (例如: zh-CN)
        """
        model_dir = self.models_dir / language_code
        if not model_dir.exists():
            raise FileNotFoundError(f"Model directory for {language_code} not found")
        
        try:
            # 删除模型目录
            shutil.rmtree(model_dir)
            
            # 更新 metadata.json
            metadata_path = self.models_dir / 'metadata.json'
            if metadata_path.exists():
                with open(metadata_path, 'r', encoding='utf-8') as f:
                    metadata = json.load(f)
                
                if language_code in metadata:
                    del metadata[language_code]
                    
                with open(metadata_path, 'w', encoding='utf-8') as f:
                    json.dump(metadata, f, indent=4, ensure_ascii=False)
            
            return {
                'status': 'success',
                'message': f'Model files for {language_code} deleted successfully'
            }
            
        except Exception as e:
            raise Exception(f"Error deleting model files: {str(e)}")

    def delete_audio_file(self, filename):
        """
        删除指定的音频文件
        
        Args:
            filename: 音频文件名
        """
        audio_path = self.audio_dir / filename
        if not audio_path.exists():
            raise FileNotFoundError(f"Audio file not found: {filename}")
        
        try:
            audio_path.unlink()
            return {
                'status': 'success',
                'message': f'Audio file {filename} deleted successfully'
            }
        except Exception as e:
            raise Exception(f"Error deleting audio file: {str(e)}")

    def list_audio_files(self):
        """列出所有音频文件"""
        if not self.audio_dir.exists():
            return []
        
        return [f.name for f in self.audio_dir.glob("*.wav")]