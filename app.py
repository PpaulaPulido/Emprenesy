from flask import Flask, request, redirect, url_for, render_template, flash
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os
from db import get_db, get_cursor


app = Flask(__name__)
app.secret_key = '123456789'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
db = get_db()
cursor = get_cursor(db)

from modules.usuarios import usuarios
app.register_blueprint(usuarios, url_prefix='/usuarios')

from modules.administrador import admin
app.register_blueprint(admin, url_prefix='/admin')

from modules.restaurantes  import res
app.register_blueprint(res, url_prefix="/res")

from modules.eventos  import evento
app.register_blueprint(evento, url_prefix="/evento")

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)



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


# Conexión para ingresar eventos
@app.route('/publicareventos', methods=['GET', 'POST'])
def eventos():
    if request.method == 'POST':
        Nombre = request.form.get("nombreven")
        Galeria = request.form.get('galeria')
        Logo = request.form.get("logo")
        Tipoevento = request.form.get("tipoevento")
        Redes = request.form.get("redes")
        Contacto = request.form.get("contacto")
        Fecha = request.form.get("txtañodeimprenta")
        HorarioE = request.form.get("horarioE")
        HorarioS = request.form.get("horarioS")  # Corregido el nombre de la variable
        Ubicacion = request.form.get("ubicacion")
        Descripcion = request.form.get("descripcion")
        Pagina = request.form.get("pagina")
        Boleteria = request.form.get("boletos")
        
        # Obtener el código del administrador
        cursor.execute("SELECT codadmin FROM administrador LIMIT 1")
        codadmin = cursor.fetchone()[0]

        # Insertar el evento en la tabla 'eventos' con el código del administrador
        cursor.execute(
            "INSERT INTO eventos (nombreeven, logo, descripeven, boletaseven, paginaeven, infoAdicional, correoeven, televen, codadmin) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (Nombre, Logo, Descripcion, Boleteria, Pagina, Redes, Contacto, Fecha, codadmin)
        )

        db.commit()
        flash('Evento registrado correctamente', 'success')
        return redirect(url_for("eventos"))

    return render_template('formularioeventos.html')


        
if __name__ == '__main__':
    app.add_url_rule('/', view_func=index)
    app.run(debug = True, port=3000)