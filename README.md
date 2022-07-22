# TicTacTriple
The idea for this is to write a tic-tac-toe game through a browser. It's a 3x3x3 game however.

The idea/scope for this is to learn how to:
Draw the project with html/js/canvas
Host the website with Python (probably flask)
Run checks and possibly a bot AI quickly using C++ and FFI
Possibly account storage with SQL

Some design considerations include:
27 spots vs the usual 9
49 completion lines vs the usual 8
Multiple people at once communicating with server
server responding to multiple people (individually)



Checklist:
Make a prototype visualiser (50%)
Find the 49 attack vectors
Python get the game class operational
Have the web page forms send the things to FLASK
Get FLASK to modify the one game
Have the webpage understand the server response
Have Python understand multiple games at once
Hopefully not overkill server and clients at the same time