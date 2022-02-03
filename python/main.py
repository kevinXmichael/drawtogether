import sys
from pyaxidraw import axidraw
ad = axidraw.AxiDraw()
ad.interactive()
    
def gohome():
    print('AxiDraw goes home')
    ad.moveto(0,0)

def shutdown():
    gohome()
    print('AxiDraw goes to bed')
    ad.disconnect()

def main():
    # ad.options.port = 0
    connected = ad.connect()

    if not connected:
        sys.exit()

    ad.move(0, 2)
    ad.line(6,0)
    ad.line(0,4)
    ad.line(-6,0)

    print('current_pos', ad.current_pos())
    print('turtle_pos', ad.turtle_pos())
    shutdown()

main()
