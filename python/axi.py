import sys
from pyaxidraw import axidraw

class Axi():
    ad = axidraw.AxiDraw()
    connected = False

    def __init__(self):
        Axi.ad.interactive()
        if not Axi.connected:
            self.__connect()

    def __del__(self):
        self.shutdown()

    def __gohome(self):
        print("AxiDraw goes home")
        Axi.ad.moveto(0,0)

    def shutdown(self):
        self.__gohome()
        print("AxiDraw goes to bed")
        Axi.ad.disconnect()

    def __connect(self):
        # ad.options.port = 0
        Axi.connected = Axi.ad.connect()

        if not Axi.connected:
            sys.exit()

    def move(self, direction):
        if not Axi.connected:
            sys.exit()
        
        print("Direction is", direction)
        # ad.move(0, 2)
        # ad.line(6,0)
        print("current_pos", Axi.ad.current_pos())
