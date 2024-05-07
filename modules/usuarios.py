from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash 
from db import get_db, get_cursor
import os

usuarios = Blueprint('usuarios', __name__)
db = get_db()
cursor = get_cursor(db)

@usuarios.route('/login', methods=['GET','POST'])
def inicio_sesion():
    if request.method =='POST':
        username= request.form.get('txtusuario')
        password= request.form.get('txtcontrasena')
        roles = request.form.get ('rol')

        sql = 'SELECT correousu,contrasena FROM usuario where correousu = %s'
        cursor.execute(sql,(username,))
        user = cursor.fetchone()
        sql = 'SELECT correadmin, contrasena FROM administrador where correoadmin = %s'
        cursor.execute(sql,(username,))
        admin = cursor.fetchone()

        if (roles == 'usuario'):
            user and check_password_hash (user['contrasena'], password)
            return redirect(url_for('usuarios.perfil_usuario'))
        
        elif (roles == 'Administrador'):
            admin and check_password_hash (admin['contrasena'], password)
            return redirect(url_for('usuarios.perfil_admin'))
        
        else:
            error='Credenciales invalidas. por favor intentarlo de nuevo'
        return render_template('iniciar_sesion.html', error=error)
    return render_template('iniciar_sesion.html')
           
        
@usuarios.route('/perfil_usuario')
def perfil_usuario():
    return render_template('perfil_usuario.html')

@usuarios.route('/perfil_admin')
def perfil_admin():
    return render_template('perfil_admin.html')
    


       
    
    

    
    

@usuarios.route('/index_user')
def index_user():
    return render_template('index_user.html')

@usuarios.route('/registrarUser', methods=['GET', 'POST'])
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
            return redirect(url_for("usuarios.registrar_usuario"))
        
        elif ( roles == 'Administrador'):
              cursor.execute(
                "INSERT INTO administrador (nombreadmin, apellidoadmin, telfadmin, correoadmin, fechanac_admin, contrasena) VALUES (%s, %s, %s, %s, %s, %s)",
                (Nombres, Apellidos, telefono, Email,fechaNac, contrasenaEncriptada)
            )
              db.commit() 
              flash('Usuario creado correctamente', 'success')
              return redirect(url_for("usuarios.registrar_usuario"))


    return render_template('registro.html')


@usuarios.route('/perfiflImagen_user')
def perfilImagen_usuario():
    
    user_id = 1
    cursor.execute("SELECT ruta_foto FROM fotos_usuario  WHERE cod_usuario= %s AND tipo_foto = 'perfil' ORDER BY id_foto DESC LIMIT 1", (user_id,))
    fotoPerfil = cursor.fetchone()
    
    if fotoPerfil:
        fotoPerfil_path = fotoPerfil[0]
        directory_path = os.path.join(current_app.root_path, 'static', 'uploads') 
        file_name = os.path.basename(fotoPerfil_path) 
    else:
        directory_path = os.path.join(current_app.root_path, 'static', 'uploads') 
        file_name = 'perfil_user.png'
    
    full_file_path = os.path.join(directory_path, file_name)
    if not os.path.isfile(full_file_path):
        print(f"Archivo no encontrado: {full_file_path}")  
        abort(404)  # Si el archivo no existe, devuelve un error 404

    return send_from_directory(directory_path, file_name)

@usuarios.route('/nosotros_user')
def nosotros_user():
    return render_template('MVQ_user.html')

@usuarios.route('/favoritos_user')
def favoritos_user():
    return render_template('favoritos.html')