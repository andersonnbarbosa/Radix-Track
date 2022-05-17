from datetime import datetime
import socket
import time
import requests

HOST = ''              # Endereco IP do Servidor
PORT = 6100            # Porta que o Servidor esta
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
orig = ((HOST, PORT))
tcp.bind(orig)
tcp.listen(1)
print("OK")
while True:
    con, cliente = tcp.accept()
    print("Conectado")
    print(cliente)
    while True:
        try:
            msg = con.recv(1024)
            data = str(msg)
            print(data)
        except:
            break
        if "BP05" in data:
            con.sendall(str.encode("(027046892428AP05)"))
            print("Resposta enviada")
         
        if "BR01" in data or "BR00" in data:
            now = datetime.now()
            print(f'Login realizado {now}')
            device_number = data[4:15]
            gps_status = data[25]
            latitude = data[26:36]
            longitude = data[36:47]
            velocity = data[47:52]
            hour = data[52:58]
            date = data[19:25]
            print(f'Device ID: {device_number}')
            if gps_status == "A":
                state = "valid"
            else: 
                state = "invalid"
            con.close()
            break
        if "BP00" in data:
            time.sleep(1)
            con.sendall(str.encode("(027046892428AP01HSO)"))
            print("Resposta enviada")
            con.close()
        if not msg: 
            print("Não há mensagens")
            con.close()
            break

        print("Mensagem recebida")
        print(" ")
    print("Conexão encerrada")
    con.close()                  