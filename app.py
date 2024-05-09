from flask import Flask, request, redirect, url_for, render_template, flash
import os
from db import get_db, get_cursor



app = Flask(__name__)
app.secret_key = '123456789'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['FOLDER_EVENT'] = 'static/galeriaEventos'
app.config['FOLDER_EMPREN'] = 'static/galeriaEmprende'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db = get_db()
cursor = get_cursor(db)

from modules.index import inicio
app.register_blueprint(inicio, url_prefix='/inicio')

from modules.usuarios import usuarios
app.register_blueprint(usuarios, url_prefix='/usuarios')

from modules.administrador import admin
app.register_blueprint(admin, url_prefix='/admin')

from modules.restaurantes  import res
app.register_blueprint(res, url_prefix="/res")

from modules.eventos  import evento
app.register_blueprint(evento, url_prefix="/evento")

from modules.emprendimientos  import emprende
app.register_blueprint(emprende, url_prefix="/emprende")

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=3036)

