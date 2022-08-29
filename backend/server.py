import flask
import tictactriplegame as ttt
import flask_sse
import time

#remember to
#export FLASK_APP=server.py

test = ttt.board()
print("Imported TTT")



app = flask.Flask(__name__)
sk = input("Secret Key:")
app.config['SECRET_KEY'] = sk
#app.register_blueprint(flask_sse, url_prefix='/stream')

def sendGameState():
    
    time.sleep(1.0)
    ans = str(test.takenMask) + ',' + str(test.redMask) + ' '
    print(ans)
    
    return ans
    

@app.route('/')
def home():
    return flask.render_template('home.html')


@app.route('/userServer', methods=['POST']) #sending data from the user to server
def receiveMove():
    data = flask.request.form.get('move')
    print(data)
    #move = int(data['move'])
    #print(move)
    test.move(int(data))
    #print(test)

    return ('', 204)

@app.route('/serverUser')
def stream():
    def updateStream():
        while True:
            yield 'data: {}\n\n'.format(sendGameState())
            
    return flask.Response(updateStream(), mimetype='text/event-stream')
