import os
from flask import abort, current_app, make_response, request, Flask, jsonify
from mimetypes import guess_extension
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pywhispercpp.model import Model

app = Flask(__name__)
CORS(app)

model_en = Model('base',language = 'en', 
    n_threads=6, print_progress=False, 
    print_realtime=False)
model_fr = Model('base',language = 'fr', 
    n_threads=6, print_progress=False, 
    print_realtime=False)

@app.route('/upload', methods=['POST'])
def upload():
    if 'audio_file' in request.files:
        file = request.files.get('audio_file')
        lang = request.form.get('lang')
        print(lang)
        # Get the file suffix based on the mime type.
        extname = guess_extension(file.mimetype)
        if not extname:
            abort(400)

        # Test here for allowed file extensions.

        # Generate a unique file name with the help of consecutive numbering.

        dst =secure_filename(f'audio_record{extname}')

        # Save the file to disk.
        file.save(dst)
        if lang == "en":
            segments = model_en.transcribe(dst, speed_up=True)
        elif lang == "fr":
            print("here")
            segments = model_fr.transcribe(dst, speed_up=True)
        text = ""
        for segment in segments:
            text += str(segment.text)
        print(text)
        os.remove(dst)
        return jsonify(text)
    
    abort(400)

if __name__ == '__main__':
    app.run(host='localhost', port=8000)