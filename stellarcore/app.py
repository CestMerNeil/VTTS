from flask import Flask
from flask_cors import CORS
from routes.health import health_bp
from routes.model import model_bp
import logging

# 设置日志
logging.basicConfig(level=logging.DEBUG)

stellarcore = Flask(__name__)
CORS(stellarcore) 
stellarcore.register_blueprint(health_bp, url_prefix='/health')
stellarcore.register_blueprint(model_bp, url_prefix='/model')

# 开启调试模式
stellarcore.debug = True

if __name__ == '__main__':
    stellarcore.run(host="0.0.0.0", port=5001, debug=True)