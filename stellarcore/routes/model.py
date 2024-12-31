# routes/model.py
from flask import Blueprint, request, jsonify, send_file
from services.generate import generate_audio
from services.get_models import get_available_models
import os
import logging

model_bp = Blueprint('model', __name__)

@model_bp.route('/models', methods=['GET'])
def list_models():
    """获取所有可用的模型"""
    try:
        models = get_available_models()
        return jsonify({
            'status': 'success',
            'models': models
        })
    except Exception as e:
        logging.error(f"Error getting models: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@model_bp.route('/tts', methods=['POST'])
def text_to_speech():
    """将文本转换为语音"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data or 'model' not in data:
            return jsonify({
                'status': 'error',
                'message': 'Missing required parameters: text and model'
            }), 400
        
        text = data['text']
        model_name = data['model']
        file_name = data.get('filename', None)
        
        # 生成音频
        audio_path = generate_audio(text, model_name, file_name)
        
        return jsonify({
            'status': 'success',
            'path': audio_path
        })
        
    except ValueError as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400
        
    except Exception as e:
        logging.error(f"Error generating audio: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@model_bp.route('/audio/<path:filename>', methods=['GET'])
def get_audio(filename):
    """获取生成的音频文件"""
    try:
        # 构建音频文件的完整路径
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        audio_path = os.path.join(BASE_DIR, 'services', 'audio', filename)
        
        if not os.path.exists(audio_path):
            return jsonify({
                'status': 'error',
                'message': 'Audio file not found'
            }), 404
            
        return send_file(
            audio_path,
            mimetype='audio/wav'
        )
    except Exception as e:
        logging.error(f"Error getting audio file: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500