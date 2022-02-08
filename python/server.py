from axi import Axi
import socket

axidraw = Axi()

host = 'localhost'
port = 12345
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind((host, port))
print ("Running on {}:{}...".format(host, port))

sock.listen(1)
while True:
    print('Waiting for a connection...')
    conn, addr = sock.accept()
    print('Connected by', addr)
    while True:
        try:
            data = conn.recv(1024)
            if not data:
                conn.send(b"Request rejected: Cannot understand the sent data.")
                break
            else:
                data = data.decode("utf-8") 
                print("👉 Client says:", data)
                axidraw.move(data)
                break

        except socket.error:
            print("❌ Error Occured.")
            axidraw.shutdown()
            break
