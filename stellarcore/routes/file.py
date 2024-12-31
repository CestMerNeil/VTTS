# routes/file.py
from flask import Blueprint, request, jsonify
from services.file_service import FileService
import os
import logging

file_bp = Blueprint('file', __name__)
file_service = FileService(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

@file_bp.route('/model/<language_code>', methods=['POST'])
def upload_model(language_code):
    """上传模型文件"""
    try:
        if not all(key in request.files for key in ['config', 'model', 'scale_stats']):
            return jsonify({
                'status': 'error',
                'message': 'Missing required files: config, model, and scale_stats'
            }), 400

        result = file_service.upload_model_files(
            language_code,
            request.files['config'],
            request.files['model'],
            request.files['scale_stats']
        )
        
        return jsonify(result)
        
    except Exception as e:
        logging.error(f"Error uploading model files: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@file_bp.route('/model/<language_code>', methods=['DELETE'])
def delete_model(language_code):
    """删除模型文件"""
    try:
        result = file_service.delete_model_files(language_code)
        return jsonify(result)
        
    except FileNotFoundError as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 404
        
    except Exception as e:
        logging.error(f"Error deleting model files: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@file_bp.route('/audio/<filename>', methods=['DELETE'])
def delete_audio(filename):
    """删除音频文件"""
    try:
        result = file_service.delete_audio_file(filename)
        return jsonify(result)
        
    except FileNotFoundError as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 404
        
    except Exception as e:
        logging.error(f"Error deleting audio file: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@file_bp.route('/audio', methods=['GET'])
def list_audio():
    """获取音频文件列表"""
    try:
        files = file_service.list_audio_files()
        return jsonify({
            'status': 'success',
            'files': files
        })
        
    except Exception as e:
        logging.error(f"Error listing audio files: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500