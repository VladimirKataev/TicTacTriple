import flask
import tictactriplegame as ttt
#import flask_sse
import time
import queue

#remember to
#export FLASK_APP=server.py

test = ttt.board()
print("Imported TTT")



app = flask.Flask(__name__)
sk = input("Secret Key:")
app.config['SECRET_KEY'] = sk
#app.register_blueprint(flask_sse, url_prefix='/stream')
listeners = []

def sendGameState():
    ans = str(test.takenMask) + ',' + str(test.redMask) + ' '
    #print("sent")
    return ans
    

@app.route('/')
def home():
    return flask.render_template('home.html')


@app.route('/userServer', methods=['POST']) #sending data from the user to server
def receiveMove():
    global test
    data = flask.request.form.get('move')
    #print(data)
    #move = int(data['move'])
    #print(move)
    test.move(int(data))
    #print(test)
    newState = 'data: {}\n\n'.format(sendGameState())
    for q in listeners:
        q.put_nowait(newState)
    if(test.checkGameEnd()):
        test = ttt.board()
        newState = 'data: {}\n\n'.format(sendGameState())
        for q in listeners:
            q.put_nowait(newState)
        
        return ('Game Over, board has been reset\nGo to home page, or the back button', 200)
    return ('', 204)

@app.route('/serverUser')
def stream():
     
    def updateStream():
        q = queue.Queue()
        listeners.append(q)
        newState = 'data: {}\n\n'.format(sendGameState())
        for q in listeners:
            q.put_nowait(newState)

        while True:
            state = q.get()
            yield state
            #ans = 'data: {}\n\n'.format(sendGameState())
            #yield ans
            
    return flask.Response(updateStream(), mimetype='text/event-stream')
