"""
    This file is used to generate audio from text by using Coqui TTS python API.
    However, there is a bug in the API, which is mentioned in the issue #3449 of Coqui TTS.
    This bug was fixed, but the fix is not merged into the master branch.

    In this case, we've changed the pip lib to generate audio from text until the fix is merged into the master branch.
    So... please be patient and wait for a application update...
    
    The changement is in the file : miniconda3/envs/tts/lib/python3.9/site-packages/TTS/api.py
    The changement is to replace the line 102 by the following code:
        and ("xtts" in self.config.model or "languages" in self.config and len(self.config.languages) > 1)
    The original line 102 is:
        and ("xtts" in self.config.model or len(self.config.languages) > 1)

    That's it, take care and have a nice day!
"""

import torch
from api import TTS

def tts(text, model_path, model_config, output_path):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    tts = TTS(model_path=model_path, config_path=model_config, progress_bar=True).to(device)
    tts.tts_to_file(text=text, file_path=output_path)
    print("Done")

if __name__ == '__main__':
    import sys
    
    text = sys.argv[1]
    model_path = sys.argv[2]
    model_config = sys.argv[3]
    output_path = sys.argv[4]
    
    print(text)
    print(model_path)
    print(model_config)
    print(output_path)
    
    tts(text, model_path, model_config, output_path)
