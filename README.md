# VTTS

## 核心功能概述
- 上传管理TTS模型
- 生成音频文件
- 文件管理
- 前后端联动
  
## 系统设计

### 2.1 数据结构设计
#### 模型管理：
- models/ 目录：存储所有可用的 TTS 模型。
- models.json 文件：记录模型的元信息，例如模型名称、路径、描述等。
#### 音频文件管理：
- audio/ 目录：存储所有生成的音频文件。
- 音频文件命名规则：timestamp_modelName_inputHash.wav。

### 2.2 路由设计
在 Flask 后端提供以下 API：
#### 模型管理：
- GET /api/models：获取所有可用的 TTS 模型。
- POST /api/models：上传一个新模型。
- DELETE /api/models/<model_name>：删除一个模型。
#### 音频生成：
- POST /api/generate：根据文本生成音频文件。
#### 音频文件管理：
- GET /api/audios：获取所有生成的音频文件。
- DELETE /api/audios/<file_name>：删除指定音频文件。