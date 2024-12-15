from flask import Blueprint, request, jsonify, send_file
from services.generate import generate_audio, list_generated_audios
from services.get_models import get_available_models

model_bp = Blueprint('model', __name__)

@model_bp.route('/models', methods=['GET'])
def list_models():
    """获取所有可用的模型"""
    try:
        models = get_available_models()
        return jsonify(models)
    except Exception as e:
        logging.error(f"Error getting models: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

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
        
        # 生成音频
        audio_path = generate_audio(text, model_name)
        
        return jsonify({
            'status': 'success',
            'path': audio_path
        })
        
    except ValueError as e:
        # 处理模型不存在等验证错误
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400
        
    except Exception as e:
        # 处理其他错误
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@model_bp.route('/audios', methods=['GET'])
def list_audios():
    """获取所有生成的音频文件列表"""
    try:
        audio_files = list_generated_audios()
        
        return jsonify({
            'status': 'success',
            'audios': audio_files
        })
        
    except Exception as e:
        logging.error(f"Error listing audio files: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@model_bp.route('/audio/<path:filename>', methods=['GET'])
def get_audio(filename):
    """获取生成的音频文件"""
    try:
        return send_file(
            f'services/audio/{filename}',
            mimetype='audio/wav'
        )
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Audio file not found: {str(e)}'
        }), 404