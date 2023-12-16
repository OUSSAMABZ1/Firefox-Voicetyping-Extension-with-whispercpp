import os
from flask import abort, current_app, make_response, request, Flask
from mimetypes import guess_extension
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pywhispercpp.model import Model

app = Flask(__name__)
CORS(app)

model = Model('base.en',language = 'en', 
    n_threads=6, print_progress=False, 
    print_realtime=False)

@app.route('/upload', methods=['POST'])
def upload():
    if 'audio_file' in request.files:
        file = request.files['audio']
        # Get the file suffix based on the mime type.
        extname = guess_extension(file.mimetype)
        if not extname:
            abort(400)

        # Test here for allowed file extensions.

        # Generate a unique file name with the help of consecutive numbering.

        dst =secure_filename(f'audio_record{extname}')

        # Save the file to disk.
        file.save(dst)
        segments = model.transcribe(dst, speed_up=True)
        text = ""
        for segment in segments:
            text += str(segment)
        print(text)
        os.remove(dst)
        return make_response({'text': text}, 200)
    
    abort(400)

if __name__ == '__main__':
    app.run(host='localhost', port=8000)
'''
Open Firefox and go to about:debugging#/runtime/this-firefox
Click on "Load Temporary Add-on"
Select any file in your extension directory (e.g., manifest.json)
'''