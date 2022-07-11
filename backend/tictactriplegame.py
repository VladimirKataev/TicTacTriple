

class board:
    
    attackVectors = [] #a list of all victory condition masks (49 32bit ints)

    def __init__(self):
        self.takenMask = 0  #32bit int on occupied spot
        self.redMask = 0    #32bit int on which spots are red
        self.redTurn = True #boolean

    def move(self, where): #where should be (0-8) int 
        maskPos = (1 << where)
        
        while(self.takenMask & maskPos > 0):
            maskPos = maskPos << 9
        takenMask = takenMask | maskPos
        if(self.redTurn):
            redMask = redMask | maskPos

        self.redTurn = not self.redTurn
    


    
