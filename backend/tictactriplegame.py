

class board:
    
    attackVectors = [7] #a list of all victory condition masks (49 32bit ints), rn its '7' because first one
                        #
    def __init__(self):
        self.takenMask = 0  #32bit int on occupied spot
        self.redMask = 0    #32bit int on which spots are red
        self.redTurn = True #boolean

    def move(self, where): #where should be (0-8) int
        if(type(where) != int or where < 0 or where > 8): #make sure move is valid
            return
        maskPos = (1 << where)

        if(self.takenMask & (maskPos << 18)): #make sure the move is possible, if valid
            return
        
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

    def __str__(self):
        ans = ""
        ans += "ABC\nDEF\nGHI\n---\n"

        for a in range(0, 27, 1):
            if((1 << a) & self.takenMask):
                if((1 << a) & self.redMask > 0):
                    ans += 'R'
                else:
                    ans += 'B'

            else:
                ans += " "

            if(a%3 == 0):
                ans += '\n'
            if(a%9 == 0):
                ans += '\n----\n'
        return ans

tstGame = board()

while(not tstGame.checkGameEnd()):
    mv = int(input("Enter your move 0-8:"))
    tstGame.move(mv)
    print(tstGame)
