from flask import Flask,url_for,jsonify,render_template
from flask_socketio import SocketIO

app = Flask(__name__)
level = 0

socketio = SocketIO(app)

@socketio.on('sendlevel')
def handle_message_event(json):
    level = json['data']
    print(level)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/Greetings')
def Greetings():
	return render_template('hello.html',temperature=35,humidity=78)

@app.route('/Tank')
def Tank():
    return render_template('App.html',niveau=level)

if __name__ == "__main__":
	socketio.run(app, host='192.168.42.1', port=5000,log_output=True)

