# health.py
from flask import Blueprint, jsonify, request

health_bp = Blueprint('health', __name__)

@health_bp.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

@health_bp.route('/', methods=['POST'])
def greet():
    # print(request.data)
    # print(request.headers)
    data = request.get_json()
    return jsonify({'message': f"Hello, {data['name']}!"})