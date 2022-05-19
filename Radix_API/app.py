
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
import os

from sqlalchemy import ForeignKey

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

class Cliente(db.Model):
    __tablename__ = 'cliente'
    id = db.Column(db.Integer, primary_key=True)
    cpf_cnpj = db.Column(db.Integer, unique=True)
    nome = db.Column(db.String(20))
    veiculo = db.Column(db.Integer, db.ForeignKey('veiculo.id'), nullable=False)
    endereco = db.Column(db.Integer, db.ForeignKey('endereco.id'), nullable=False)
    def __init__ (self, cpf_cnpj, nome, veiculo, endereco):
        self.cpf_cnpj = cpf_cnpj
        self.nome = nome
        self.veiculo = veiculo
        self.endereco = endereco
    def as_dict(self):
        return {
            "id": self.id,
            "nome": str(self.nome)
        }
class Endereco(db.Model):
    __tablename__ = 'endereco'
    id = db.Column(db.Integer, primary_key=True)
    cep = db.Column(db.Integer)
    logradouro = db.Column(db.String(20))
    bairro = db.Column(db.String(20))
    estado = db.Column(db.String(20))
    clientes = db.relationship('Cliente', backref='endereco', lazy=True)
    def __init__ (self, cep, logradouro, bairro, estado):
        self.cep = cep
        self.logradouro = logradouro
        self.bairro = bairro
        self.estado = estado

class Veiculo(db.Model):
    __tablename__ = 'veiculo'
    id = db.Column(db.Integer, primary_key=True)
    renavam = db.Column(db.Integer, unique=True)
    placa = db.Column(db.String(10))
    modelo = db.Column(db.String(10))
    fabricante = db.Column(db.String(10))
    rastreador = db.Column(db.Integer, db.ForeignKey('rastreador.id'), nullable=False)
    clientes = db.relationship('Cliente', backref='veiculo', lazy=True)
    def __init__ (self, renavam, placa, modelo, fabricante, rastreador):
        self.renavam = renavam
        self.placa = placa
        self.modelo = modelo
        self.fabricante = fabricante
        self.rastreador = rastreador
    def as_dict(self):
        return{
            "id": self.id,
            "placa": str(self.placa)
        }

class Rastreador(db.Model):
    __tablename__ = 'rastreador'
    id = db.Column(db.Integer, primary_key=True)
    imei = db.Column(db.Integer, unique=True)
    chip = db.Column(db.Integer, db.ForeignKey('chip.id'), nullable=False)
    veiculos = db.relationship('Veiculo', backref='rastreador', lazy=True)
    status = db.relationship('Status', backref='rastreador', lazy=True)
    def __init__ (self, id, imei, chip):
        self.id = id
        self.imei = imei
        self.chip = chip
    def as_dict(self):
        return{
            "id": self.id
        }

class Status(db.Model):
    __tablename__ = 'status'
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.String(10))
    longitude = db.Column(db.String(10))
    velocidade = db.Column(db.Float)
    data = db.Column(db.String(10))
    hora = db.Column(db.String(10))
    ignicao = db.Column(db.Boolean)
    bloqueio = db.Column(db.Boolean)
    gps = db.Column(db.Boolean)
    rastreador = db.Column(db.Integer, db.ForeignKey('rastreador.id'), nullable=False)
    def __init__ (self, latitude, longitude, velocidade, data, hora, ignicao, bloqueio, gps, rastreador):
        self.latitude = latitude
        self.longitude = longitude
        self.velocidade = velocidade
        self.data = data
        self.hora = hora
        self.ignicao = ignicao
        self.bloqueio = bloqueio
        self.gps = gps
        self.rastreador = rastreador

class Chip(db.Model):
    __tablename__ = 'chip'
    id = db.Column(db.Integer, primary_key=True)
    iccid = db.Column(db.Integer, unique=True)
    linha = db.Column(db.String(10))
    operadora = db.Column(db.String(10))
    rastreadores = db.relationship('Rastreador', backref='chip', lazy=True)
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
    nome = db.Column(db.Integer)
    login = db.Column(db.String(10))
    senha = db.Column(db.String(10))
    cliente = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    def __init__ (self, nome, login, senha, cliente):
        self.nome = nome
        self.login = login
        self.senha = senha
        self.cliente = cliente

db.create_all()

@app.route('/')
def index():
    rastreador = Rastreador.query.all()
    return render_template('index.html', rastreador = rastreador)

@app.route('/novoRastreador', methods=['POST'])
def novoRastreador():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            rastreador  = Rastreador(
                request_data['id'],
                request_data['imei'],
                Chip.query.get(int(request_data['chip']))
            )
            db.session.add(rastreador)
            db.session.commit()
     
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
                request_data['fabricante']
            )
            db.session.add(veiculo)
            db.session.commit()

@app.route('/novoChip', methods=['POST'])
def novoChip():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            chip = Chip(
                request_data['iccid'],
                request_data['linha'],
                request_data['operadora']
            )
            db.session.add(chip)
            db.session.commit()

@app.route('/novoUsuario', methods=['POST'])
def novoUsuario():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            usuario = Usuario(
                request_data['nome'],
                request_data['login'],
                request_data['senha']
            )
            db.session.add(usuario)
            db.session.commit()

@app.route('/novoCliente', methods=['POST'])
def novoCliente():
    if request.method == 'POST':
        request_data = request.get_json()
        key = str(request_data['key'])
        if key == str(os.environ.get('KEY_API')):
            cliente = Cliente(
                request_data['cpf_cnpj'],
                request_data['nome'],
                Veiculo.query.get(int(request_data['veiculo'])),
                Endereco.query.get(int(request_data['endereco']))
            )
            db.session.add(cliente)
            db.session.commit()

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
                request_data['estado']
            )
            db.session.add(endereco)
            db.session.commit()

if __name__ == '__main__':
    app.run()