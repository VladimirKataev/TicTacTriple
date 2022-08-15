import flask
import tictactriplegame as ttt

test = ttt.board()
print("Imported TTT")

app = flask.Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World'
