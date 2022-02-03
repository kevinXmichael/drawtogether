import sys
from pyaxidraw import axidraw
ad = axidraw.AxiDraw()
ad.interactive()
    
def gohome():
    print('AxiDraw goes home')
    ad.moveto(0,0)

def main():
    # ad.options.port = 0
    connected = ad.connect()

    if not connected:
        sys.exit()

    ad.penup()
    ad.move(5.08, 5.08)
    # gohome()
    # ad.pendown()

    # Disconnect it at a suitable time 
    ad.disconnect()

main()
