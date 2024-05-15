import mysql.connector
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuario'
    codusuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombreusu = db.Column(db.String(50))
    apellidousu = db.Column(db.String(50))
    telusu = db.Column(db.String(20))
    fechanac_usu = db.Column(db.Date)
    correousu = db.Column(db.String(50))
    contrasena = db.Column(db.String(255))

class Administrador(db.Model):
    __tablename__ = 'administrador'
    codadmin = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombreadmin = db.Column(db.String(50))
    apellidoadmin = db.Column(db.String(50))
    telfadmin = db.Column(db.String(15))
    correoadmin = db.Column(db.String(50))
    codsitio = db.Column(db.Integer)
    fechanac_admin = db.Column(db.Date)
    contrasena = db.Column(db.String(255))

    
def get_db():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='emprenesy'
    )

def get_cursor(db):
    return db.cursor()
