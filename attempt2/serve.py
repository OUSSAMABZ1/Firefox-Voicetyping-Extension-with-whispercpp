from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/your_endpoint', methods=['POST'])
def handle_post_request():
    param1 = request.form.get('param1')
    param2 = request.form.get('param2')

    result = {
        'param1': param1,
        'param2': param2
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
