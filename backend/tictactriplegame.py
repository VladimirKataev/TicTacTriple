

class board:
    
    attackVectors = [7] #a list of all victory condition masks (49 32bit ints), rn its '7' because first one
                        #
    def __init__(self):
        self.takenMask = 0  #32bit int on occupied spot
        self.redMask = 0    #32bit int on which spots are red
        self.redTurn = True #boolean

    def move(self, where): #where should be (0-8) int 
        maskPos = (1 << where)
        
        while(self.takenMask & maskPos > 0):
            maskPos = maskPos << 9
        self.takenMask = self.takenMask | maskPos
        if(self.redTurn):
            self.redMask = self.redMask | maskPos

        self.redTurn = not self.redTurn
    
    def checkGameEnd(self):
        for dir in board.attackVectors:
            if(dir & self.takenMask == dir): #the entire attack vector is full
                if(dir & self.redMask == dir and not self.redTurn): #they're all red
                    return True
                elif(dir & self.redMask == 0 and self.redTurn): #they're all blue
                    return True

        return False

    

tstGame = board()

while(not tstGame.checkGameEnd()):
    mv = int(input("Enter you move 0-8"))
    tstGame.move(mv)
