from flask import Flask, request, render_template, redirect, url_for, flash
from werkzeug.security import generate_password_hash
import mysql.connector

app = Flask(__name__)
app.secret_key = '123456789'

# Configuración de la conexión a la base de datos
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='emprenesy'
)
cursor = db.cursor()

@app.route('/')
def index():
    return render_template('index.html')


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
        confirmar_contrasena = request.form.get('confirmar_contrasena')
        
        if contrasena != confirmar_contrasena:
            flash('Las contraseñas no coinciden', 'error')
            print('Las contraseñas no coinciden')
            return render_template('registro.html')
        
        # Encriptar la contraseña
        contrasenaEncriptada = generate_password_hash(contrasena)
        cursor.execute('SELECT correousu FROM usuario WHERE correousu = %s', (Email,))
        resultado = cursor.fetchall()
        cursor.execute('SELECT correoadmin from administrador where correoadmin=%s', (Email,))
        resultado1= cursor.fetchall()

        if len(resultado) > 0 or len(resultado1)>0:
            flash('El correo electrónico ya está registrado', 'error')
            print('El correo electrónico ya está registrado')
        if (roles == 'usuario'):
            cursor.execute(
                "INSERT INTO usuario (nombreusu, apellidousu, telusu, fechanac_usu, correousu, contrasena) VALUES (%s, %s, %s, %s, %s, %s)",
                (Nombres, Apellidos, telefono, fechaNac, Email, contrasenaEncriptada)
            )
            db.commit()
            flash('Usuario creado correctamente', 'success')
            return redirect(url_for("registrar_usuario"))
        elif ( roles == 'Administrador'):
              cursor.execute(
                "INSERT INTO administrador (nombreadmin, apellidoadmin, telfadmin, correoadmin, fechanac_admin, contrasena) VALUES (%s, %s, %s, %s, %s, %s)",
                (Nombres, Apellidos, telefono, Email,fechaNac, contrasenaEncriptada)
            )
              db.commit() 
              flash('Usuario creado correctamente', 'success')
              return redirect(url_for("registrar_usuario"))


    return render_template('registro.html')

if __name__ == '__main__':
    app.add_url_rule('/', view_func=index)
    app.run(debug = True, port=3000)
