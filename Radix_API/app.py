
from flask import Flask, request, render_template, json
from flask_sqlalchemy import SQLAlchemy
import os
app = Flask (__name__)

ENV = 'prod'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = ''
else:
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#####################################################################################
                         ## MODELAGEM DO BANCO DE DADOS ##
#####################################################################################

class Cliente(db.Model):
    __tablename__ = 'cliente'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    cpf_cnpj = db.Column(db.String(10), unique=True)
    nome = db.Column(db.String(20))
    endereco = db.relationship('Endereco', backref='cliente', uselist=False)
    veiculo = db.relationship('Veiculo', backref='cliente', uselist=False)
    usuario = db.relationship('Usuario', backref='cliente', uselist=False)
    def __init__ (self, cpf_cnpj, nome):
        self.cpf_cnpj = cpf_cnpj
        self.nome = nome
    def as_dict(self):
        return {
            "id": self.id,
            "nome": str(self.nome)
        }
class Endereco(db.Model):
    __tablename__ = 'endereco'
    id = db.Column(db.Integer, primary_key=True)
    cep = db.Column(db.String(10))
    logradouro = db.Column(db.String(20))
    bairro = db.Column(db.String(20))
    estado = db.Column(db.String(20))
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    def __init__ (self, cep, logradouro, bairro, estado, cliente_id):
        self.cep = cep
        self.logradouro = logradouro
        self.bairro = bairro
        self.estado = estado
        self.cliente_id = cliente_id

class Veiculo(db.Model):
    __tablename__ = 'veiculo'
    id = db.Column(db.Integer, primary_key=True)
    renavam = db.Column(db.Integer, unique=True)
    placa = db.Column(db.String(10))
    modelo = db.Column(db.String(10))
    fabricante = db.Column(db.String(10))
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    rastreador_id = db.Column(db.Integer, db.ForeignKey('rastreador.id'))
    def __init__ (self, renavam, placa, modelo, fabricante, cliente_id, rastreador_id):
        self.renavam = renavam
        self.placa = placa
        self.modelo = modelo
        self.fabricante = fabricante
        self.cliente_id = cliente_id
        self.rastreador_id = rastreador_id
    def as_dict(self):
        return{
            "id": self.id,
            "placa": str(self.placa)
        }

class Rastreador(db.Model):
    __tablename__ = 'rastreador'
    id = db.Column(db.Integer, primary_key=True)
    id_track = db.Column(db.String(20))
    imei = db.Column(db.String(15), unique=True)
    chip_id = db.Column(db.Integer, db.ForeignKey('chip.id'), nullable=False)
    veiculo = db.relationship('Veiculo', backref='rastreador', uselist=False)
    def __init__ (self, id_track, imei, chip_id):
        self.id_track = id_track
        self.imei = imei
        self.chip_id = chip_id
    def as_dict(self):
        return{
            "id": self.id_track
        }

class Status(db.Model):
    __tablename__ = 'status'
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.String(15))
    longitude = db.Column(db.String(15))
    velocidade = db.Column(db.Float)
    data = db.Column(db.String(15))
    hora = db.Column(db.String(15))
    ignicao = db.Column(db.Boolean)
    bloqueio = db.Column(db.Boolean)
    gps = db.Column(db.Boolean)
    rastreador_id = db.Column(db.Integer, db.ForeignKey('rastreador.id'), nullable=False)
    def __init__ (self, latitude, longitude, velocidade, data, hora, ignicao, bloqueio, gps, rastreador_id):
        self.latitude = latitude
        self.longitude = longitude
        self.velocidade = velocidade
        self.data = data
        self.hora = hora
        self.ignicao = ignicao
        self.bloqueio = bloqueio
        self.gps = gps
        self.rastreador_id = rastreador_id
    def as_dict(self):
        return{
            "id": self.id,
            "latitude": str(self.latitude),
            "longitude": str(self.longitude),
            "velocidade": str(self.velocidade),
            "data": str(self.data),
            "hora": str(self.hora),
            "ignicao": str(self.ignicao),
            "bloqueio": str(self.bloqueio),
            "gps": str(self.gps),
            "rastreador": str(self.rastreador_id)
        }

class Chip(db.Model):
    __tablename__ = 'chip'
    id = db.Column(db.Integer, primary_key=True)
    iccid = db.Column(db.String(15), unique=True)
    linha = db.Column(db.String(15))
    operadora = db.Column(db.String(15))
    rastreadores = db.relationship('Rastreador', backref='chip', uselist=True)
    def __init__ (self, iccid, linha, operadora):
        self.iccid = iccid
        self.linha = linha
        self.operadora = operadora
    def as_dict(self):
        return{
            "id": self.id,
            "iccid": self.iccid,
            "operadora": str(self.operadora)
        }

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(10))
    login = db.Column(db.String(10))
    senha = db.Column(db.String(10))
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    def __init__ (self, nome, login, senha, cliente_id):
        self.nome = nome
        self.login = login
        self.senha = senha
        self.cliente_id = cliente_id

#####################################################################################
                              ## APLICAÇÃO WEB FLASK ##
#####################################################################################

##### Rotas Cadastro/novo
db.create_all()

@app.route('/')
def index():
    rastreador = Rastreador.query.all()
    chip = Chip.query.all()
    return render_template('index.html', rastreador = rastreador, chip = chip)

@app.route('/novoRastreador', methods=['POST'])
def novoRastreador():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            rastreador  = Rastreador(
                request_data['id'],
                request_data['imei'],
                Chip.query.filter_by(iccid = str(request_data['chip'])).first().id
            )
            db.session.add(rastreador)
            db.session.commit()
            print("Adicionado ao Banco de dados")
        else:
            return 'Problema na chave'
    return 'HTTP/1.1', 200
     
@app.route('/status', methods=['POST'])
def status():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            status = Status(
                request_data['latitude'],
                request_data['longitude'],
                request_data['velocidade'],
                request_data['data'],
                request_data['hora'],
                request_data['ignicao'],
                request_data['bloqueio'],
                request_data['gps'],
                request_data['rastreador']
            )
            db.session.add(status)
            db.session.commit()
            print("Adicionado ao Banco de dados")
        else:
            return 'Problema na chave'
    return 'HTTP/1.1', 200

@app.route('/novoVeiculo', methods=['POST'])
def novoVeiculo():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            veiculo = Veiculo(
                request_data['renavam'],
                request_data['placa'],
                request_data['modelo'],
                request_data['fabricante'],
                Cliente.query.filter_by(nome = str(request_data['cliente'])).first().id,
                Rastreador.query.filter_by(imei = str(request_data['rastreador'])).first().id
            )
            db.session.add(veiculo)
            db.session.commit()
            print("Adicionado ao Banco de dados")
        else:
            return 'Problema na chave'
    return 'HTTP/1.1', 200

@app.route('/novoChip', methods=['POST'])
def novoChip():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            chip = Chip(
                int(request_data['iccid']),
                str(request_data['linha']),
                str(request_data['operadora'])
            )
            db.session.add(chip)
            db.session.commit()
            print("Adicionado ao Banco de dados")
        else:
            return 'Problema na chave'
    return 'HTTP/1.1', 200

@app.route('/novoUsuario', methods=['POST'])
def novoUsuario():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            usuario = Usuario(
                request_data['nome'],
                request_data['login'],
                request_data['senha'],
                Cliente.query.filter_by(nome = request_data['cliente']).first().id
            )
            db.session.add(usuario)
            db.session.commit()
            print("Adicionado ao Banco de dados")
        else:
            return 'Problema na chave'
    return 'HTTP/1.1', 200

@app.route('/novoCliente', methods=['POST'])
def novoCliente():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            cliente = Cliente(
                request_data['cpf_cnpj'],
                request_data['nome']
            )
            db.session.add(cliente)
            db.session.commit()
            print("Adicionado ao Banco de dados")
        else:
            return 'Problema na chave'
    return 'HTTP/1.1', 200

@app.route('/novoEndereco', methods=['POST'])
def novoEndereco():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            endereco = Endereco(
                request_data['cep'],
                request_data['logradouro'],
                request_data['bairro'],
                request_data['estado'],
                Cliente.query.filter_by(nome = request_data['cliente']).first().id
            )
            db.session.add(endereco)
            db.session.commit()
            print("Adicionado ao Banco de dados")
        else:
            return 'Problema na chave'
    return 'HTTP/1.1', 200

### Rotas autocomplete
@app.route('/autocompleteRastreador', methods=['POST'])
def autocompleteRastreador():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        rastreadores = Rastreador.query.all()
        list = [r.as_dict() for r in rastreadores]
        if key == str(os.environ.get('KEY_API')):
            return json.dumps(list)

@app.route('/autocompleteVeiculo', methods=['POST'])
def autocompleteVeiculo():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        veiculo = Veiculo.query.all()
        list = [r.as_dict() for r in veiculo]
        if key == str(os.environ.get('KEY_API')):
           return json.dumps(list)

@app.route('/autocompleteChip', methods=['POST'])
def autocompleteChip():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        chip = Chip.query.all()
        list = [r.as_dict() for r in chip]
        if key == str(os.environ.get('KEY_API')):
            return json.dumps(list)

@app.route('/autocompleteUsuario', methods=['POST'])
def autocompleteUsuario():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        usuario = Usuario.query.all()
        list = [r.as_dict() for r in usuario]
        if key == str(os.environ.get('KEY_API')):
            return json.dumps(list)

@app.route('/autocompleteCliente', methods=['POST'])
def autocompleteCliente():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        cliente = Cliente.query.all()
        list = [r.as_dict() for r in cliente]
        if key == str(os.environ.get('KEY_API')):
            return json.dumps(list)

@app.route('/statusRastreador', methods=['POST'])
def statusRastreador():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            status = Status.query.filter_by(rastreador_id = request_data['rastreador']).all()
            counter = 0
            for i in status:
                counter += 1
            s = Status.query.get(counter)
            res = status.as_dict()
            return json.dumps(res)

if __name__ == '__main__':
    app.run()