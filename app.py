from flask import Flask, request, redirect, url_for, render_template, flash, session
from flask_mail import Mail, Message
import os
from db import get_db, get_cursor


app = Flask(__name__)
app.secret_key = '123456789'

app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['FOLDER_EVENT'] = 'static/galeriaEventos'
app.config['FOLDER_EMPREN'] = 'static/galeriaEmprende'
app.config['FOLDER_RES'] = 'static/galeriaRes'

# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'emprenesy@gmail.com'
app.config['MAIL_PASSWORD'] = 'emprenesy12345'
app.config['MAIL_DEFAULT_SENDER'] = ('Emprenesy Soporte', 'emprenesy@gmail.com')
mail = Mail(app)

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

from modules.publicaciones import publicacionDash
app.register_blueprint(publicacionDash, url_prefix="/publicacion")

@app.route('/')
def index():
    return render_template('index.html')

<<<<<<< HEAD

@app.route('/registrarUser', methods=['GET', 'POST'])
def registrar_usuario():
    if request.method == 'POST':
        Nombres = request.form.get('nombres')
        Apellidos = request.form.get('apellidos')
        telefono = request.form.get('tel')
        fechaNac = request.form.get('fechaNac')
        Email = request.form.get('correo')
        roles = request.form.get('rol')
        contrasena = request.form.get('contrasena')
        
        # Encriptar la contraseña
        contrasenaEncriptada = generate_password_hash(contrasena)
        cursor.execute('SELECT * FROM usuario WHERE correousu = %s', (Email,))
        resultado = cursor.fetchall()

        if len(resultado) > 0:
            flash('El correo electrónico ya está registrado', 'error')
            print('El correo electrónico ya está registrado')
        else:
            cursor.execute(
                "INSERT INTO usuario (nombreusu, apellidousu, telusu, fechanac_usu, correousu, roles, contrasena) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (Nombres, Apellidos, telefono, fechaNac, Email, roles, contrasenaEncriptada)
            )
            db.commit()
            flash('Usuario creado correctamente', 'success')
            return redirect(url_for("registrar_usuario"))

    return render_template('registro.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
=======
#Ruta para cerrar sesión
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('registro.html'))
>>>>>>> paula

#Ruta para el panel de control (requiere inicio de sesión)
@app.route('/dashboard')
def dashboard():
    if 'logged_in' in session:
        return 'Panel de control. <a href="/logout">Cerrar sesión</a>'
    else:
        return redirect(url_for('login'))
    
if __name__ == '__main__':
    app.run(debug=True,port=3036)