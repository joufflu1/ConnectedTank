from flask import Flask,url_for,jsonify,render_template
from flask_socketio import SocketIO

app = Flask(__name__)
level = 0

socketio = SocketIO(app)

@socketio.on('sendlevel')
def handle_message_event(json):
    distance = json['data']
    print(distance)
    global level
    level  = distance
    broadcastLevel(level)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/Greetings')
def Greetings():
    return render_template('hello.html',temperature=35,humidity=78)

@app.route('/Tank')
def Tank():
    print level
    return render_template('App.html',niveau=level)

def broadcastLevel(level):
    socketio.emit('level',{'niveau':level},broadcast=True)


if __name__ == "__main__":
	socketio.run(app, host='192.168.42.1', port=5000,log_output=True)

