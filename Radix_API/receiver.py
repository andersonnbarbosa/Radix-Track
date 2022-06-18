from datetime import datetime
import socket
import time
import requests

URL = 'http://radix-track.herokuapp.com/status'
KEY = 'vSgKMxLl9x2g'
HOST = ''              # Endereco IP do Servidor
PORT = 6100            # Porta que o Servidor esta
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
orig = ((HOST, PORT))
tcp.bind(orig)
tcp.listen(1)
print("OK")
def toGrauDecimal(grauMinuto, tipo):
    if tipo == "lat":
        graus = int(grauMinuto[0:2])
        minuto = float(grauMinuto[2:8])

        grauDecimal = str(round((minuto/60),7))

        return "-"+str(graus)+"."+str(grauDecimal[2:8])
    else:
        graus = int(grauMinuto[0:3])
        minuto = float(grauMinuto[3:9])

        grauDecimal = str(round((minuto/60),7))

        return "-"+str(graus)+"."+str(grauDecimal[2:8])

def toHorarioBrasil(hora):
    horario = int(hora[0:2]) - 3
    return str(horario)+str(hora[2:6])

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
            if len(data) == 83:
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
                print(toGrauDecimal(latitude,"lat"))
                print(toGrauDecimal(longitude,"long"))
                print(toHorarioBrasil(hour))
                if gps_status == "A":
                    state = 1
                else: 
                    state = 0
            
                status = {
                'key' : KEY,
                'latitude': toGrauDecimal(latitude,"lat"),
                'longitude' : toGrauDecimal(longitude,"long"),
                'velocidade' : str(velocity),
                'data' : str(date),
                'hora' : toHorarioBrasil(hour),
                'ignicao' : 1,
                'bloqueio' : 1,
                'gps' : state,
                'rastreador' : 1
                }
                
                req = requests.post(URL, json = status)
                con.close()
                break
            else:
                print("Erro na mensagem")
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