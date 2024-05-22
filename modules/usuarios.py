from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session,jsonify
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash 
from db import get_db, get_cursor
import os
import mysql.connector

usuarios = Blueprint('usuarios', __name__)
db = get_db()
cursor = get_cursor(db)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#*******************************************Ruta de iniciar sesion****************************************************************
@usuarios.route('/login', methods=['GET','POST'])
def inicio_sesion():
    cursor = get_db().cursor()
    cursor = db.cursor(dictionary=True)
    if request.method =='POST':
        username= request.form.get('txtusuario')
        password= request.form.get('txtcontrasena')
        roles = request.form.get ('rol')
        

        if (roles == 'usuario'):
            sql = 'SELECT codusuario,correousu,contrasena FROM usuario where correousu = %s'
            cursor.execute(sql,(username,))
            user = cursor.fetchone() 
            if user and check_password_hash(user['contrasena'], password):
                session['email'] = user['correousu']
                session['user_id'] = user['codusuario'] 
                return redirect(url_for('usuarios.perfil_usuario'))
            else:
                return render_template('iniciar_sesion.html')
        elif (roles == 'Administrador'):
            sql = 'SELECT codadmin,correoadmin, contrasena FROM administrador where correoadmin = %s'
            cursor.execute(sql,(username,))
            admin = cursor.fetchone()
            if admin and check_password_hash(admin['contrasena'], password):
                session['email'] = admin['correoadmin']
                session['admin_id'] = admin['codadmin'] 
                return redirect(url_for('admin.perfil_admin'))
            else:
                error='Credenciales invalidas. por favor intentarlo de nuevo'
                return render_template('iniciar_sesion.html', error=error)
    return render_template('iniciar_sesion.html')
           
#****************************************Ruat para cerrar la sesion***************************************************************
@usuarios.route('/logout')
def logout():
    if 'email' in session:
        if 'admin_id' in session:
            session.pop('admin_id',None)
        elif 'user_id' in session:
            session.pop('user_id',None)
    return redirect(url_for('index'))
#*******************************************Ruta de registro de usuario****************************************************************
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
            return redirect(url_for("usuarios.inicio_sesion"))
        
        elif ( roles == 'Administrador'):
              cursor.execute(
                "INSERT INTO administrador (nombreadmin, apellidoadmin, telfadmin, correoadmin, fechanac_admin, contrasena) VALUES (%s, %s, %s, %s, %s, %s)",
                (Nombres, Apellidos, telefono, Email,fechaNac, contrasenaEncriptada)
            )
              db.commit() 
              flash('Usuario creado correctamente', 'success')
              return redirect(url_for("usuarios.inicio_sesion"))
        
        else:
            return redirect(url_for("usuarios.registrar_usuario"))
    return render_template('registro.html')

#*******************************************Ruta de perfil usuario****************************************************************        
@usuarios.route('/perfil_usuario')
def perfil_usuario():
    
    user_id = session.get('user_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
        
    db = get_db() 
    cursor = db.cursor() 
    
    default_portada = '/static/img/Portada-Bogota.jpg'
    default_perfil = '/static/img/perfil_user.png'
    
    try:
        cursor.execute("SELECT nombreusu,apellidousu,correousu FROM usuario WHERE codusuario = %s", (user_id,))
        usuDatos= cursor.fetchone()
        
        if usuDatos:
            nombreUsu, apellidoUsu, correoUsu = usuDatos
        else:
            nombreUsu, apellidoUsu, correoUsu  = "Información no disponible"
        
        cursor.execute("SELECT direccionUsu,ciudadUsu,descripcionAcercaUsu,sitioWebUsu,blogUsu FROM datosUsuario WHERE codusuario= %s",(user_id,))
        usuario_datosDetalles = cursor.fetchone()
        
        if usuario_datosDetalles:
            direccionUsu, ciudadUsu, descripcionAcercaUsu, sitioWebUsu, blogUsu = usuario_datosDetalles
        else:
            direccionUsu = ciudadUsu = descripcionAcercaUsu = sitioWebUsu = blogUsu = "No disponible"
            
        def obtenerImagen(image_type, default_image):
            cursor.execute("SELECT ruta_foto FROM fotos_usuario WHERE cod_usuario = %s AND tipo_foto = %s ORDER BY id_foto DESC LIMIT 1", (user_id, image_type))
            image = cursor.fetchone()
            if image:
                return os.path.join('/', image[0])
            else:
                return default_image

        fotoPortada = obtenerImagen('portada', default_portada)
        fotoPerfil = obtenerImagen('perfil', default_perfil)

    finally:
        cursor.close()  
        db.close()
        
    return render_template('perfil_usuario.html',nombreUsu = nombreUsu,apellidoUsu = apellidoUsu,correoUsu = correoUsu,fotoPortada = fotoPortada, fotoPerfil = fotoPerfil,direccionUsu = direccionUsu,ciudadUsu = ciudadUsu,descripcionAcercaUsu = descripcionAcercaUsu,sitioWebUsu = sitioWebUsu, blogUsu = blogUsu)

#*******************************************Ruta de imagen de perfil****************************************************************
@usuarios.route('/perfilImagen_user')
def perfilImagen_usuario():
    
    user_id = session.get('user_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    
    db = get_db()
    cursor = get_cursor(db)
    
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

#*******************************Ruta para subir la foto de perfil ********************************************************************************
@usuarios.route('/subirFotoPerfil_usuario', methods=['POST'])
def subirFotoperfil_usu():
    
    user_id = session.get('user_id')
    cursor = db.cursor()
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    
    file = request.files.get('fotoPerfilUsu')
    
    if file and allowed_file(file.filename):
        
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        cursor.execute("""
            INSERT INTO fotos_usuario(cod_usuario, ruta_foto, tipo_foto)
            VALUES (%s, %s, 'perfil')
            ON DUPLICATE KEY UPDATE ruta_foto = VALUES(ruta_foto)
        """, (user_id, file_path))
        
        db.commit()

        flash('Foto de portada actualizada con éxito.')
        return redirect(url_for('usuarios.perfil_usuario'))
    
    else:
        flash('No se seleccionó archivo o el tipo de archivo no está permitido.')
        return redirect(url_for('usuarios.perfil_usuario'))
    
#*********************************Ruta para subir la foto de portada**************************************** 
@usuarios.route('/subirPortadaUsu', methods=['POST'])
def subirportadaUsu():
    
    user_id = session.get('user_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    file = request.files.get('fotoPortada')
    if file and allowed_file(file.filename):
        # 'secure_filename' sanea el nombre del archivo para asegurarse de que es seguro de usar en el sistema de archivos.
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        cursor.execute("""
            INSERT INTO fotos_usuario (cod_usuario, ruta_foto, tipo_foto)
            VALUES (%s, %s, 'portada')
            ON DUPLICATE KEY UPDATE ruta_foto = VALUES(ruta_foto)
        """, (user_id, file_path))
        
        db.commit()
        
        flash('Foto de portada actualizada con éxito.')
        
        return redirect(url_for('usuarios.perfil_usuario'))
    
    else:
        flash('No se seleccionó archivo o el tipo de archivo no está permitido.')
        return redirect(url_for('usuarios.perfil_usuario'))

#*********************************************Ruta para las reseñas del usuario******************************
@usuarios.route('/reseñasUsuario')
def resena_usuario():
    
    user_id = session.get('user_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT R.calificacion, R.comentario, R.entidad_tipo, R.entidad_id FROM Resenas AS R WHERE R.autor_tipo = 'usuario' AND R.autor_id = %s ORDER BY R.id_resena DESC LIMIT 5", (user_id,))
        resenas = cursor.fetchall()
        
        resenas_list = []
        
        for resena in resenas:
            nombre_entidad = ""
            
            if resena['entidad_tipo'] == 'evento':
                cursor.execute("SELECT nombreeven FROM eventos WHERE ideven = %s", (resena['entidad_id'],))
                entidad = cursor.fetchone()
                if entidad:
                    nombre_entidad = entidad['nombreeven']
                    
            elif resena['entidad_tipo'] == 'emprendimiento':
                cursor.execute("SELECT nombreempre FROM emprendimientos WHERE idempre = %s", (resena['entidad_id'],))
                entidad = cursor.fetchone()
                if entidad:
                    nombre_entidad = entidad['nombreempre']
                    
            elif resena['entidad_tipo'] == 'restaurante':
                cursor.execute("SELECT nombreresta FROM restaurantes WHERE idresta = %s", (resena['entidad_id'],))
                entidad = cursor.fetchone()
                if entidad:
                    nombre_entidad = entidad['nombreresta']
            
            resenas_list.append({
                'calificacion': resena['calificacion'],
                'comentario': resena['comentario'],
                'nombre_entidad': nombre_entidad
            })
    finally:
        cursor.close()
        db.close()
    
    return jsonify(resenas_list)

#******************************************Galeria de fotos del usuario*******************************************************
@usuarios.route('/galeriaUsuario')
def galeria_usuario():
    
    user_id = session.get('user_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    db = get_db()
    cursor = db.cursor()
    
    try:
        cursor.execute("""
            SELECT ruta_foto, tipo_foto FROM fotos_usuario
            WHERE tipo_foto IN ('perfil', 'portada')
            ORDER BY id_foto DESC LIMIT 9
        """)
        fotos = cursor.fetchall()
        # Formatear los resultados como una lista de diccionarios
        
        fotos_list = [{'ruta_foto': normalize_path(foto[0]), 'tipo_foto': foto[1]} for foto in fotos]
    finally:
        cursor.close()
        db.close()
    
    return jsonify(fotos_list)

#*****************************************Ruta de mis fotos de usuario **************************************************************
@usuarios.route('/MisFotosUsuario')
def photosUser():
    
    user_id = session.get('user_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    db = get_db()
    cursor = db.cursor()
    
    try:
        cursor.execute("""
            SELECT ruta_foto, tipo_foto FROM fotos_admin
            WHERE tipo_foto IN ('perfil', 'portada')
            ORDER BY id_foto DESC
        """)
        fotos = cursor.fetchall()
        # Formatear los resultados como una lista de diccionarios
        
        fotos_list = [{'ruta_foto': normalize_path(foto[0]), 'tipo_foto': foto[1]} for foto in fotos]
    finally:
        cursor.close()
        db.close()
    
    return jsonify(fotos_list)

#*****************************************Ruta para editar perfil usuarios**********************************************
@usuarios.route('/editarPerfilUsuario/<int:id>', methods=['POST', 'GET'])
def editarPerfilUsuario(id):
    
    db = get_db()
    cursor = get_cursor(db)
    cursor = db.cursor()
    
    if request.method == 'POST':
        nombreUsu = request.form.get('nombreUsu')
        apellidosUsu = request.form.get('apellidosUsu')
        correoUsu = request.form.get('correoUsu')
        telefonoUsu = request.form.get('telefonoUsu')
        fechaNacUsu = request.form.get('fechaNacUsu')
        
        direccionUsu = request.form.get('direccionUsu')
        ciudadUsu = request.form.get('ciudadUsu')
        descripcionAcerca = request.form.get('acercaUsu')
        sitioWeb = request.form.get('sitioWebUsu')
        blog = request.form.get('blogUsu')

        sql = "UPDATE usuario SET nombreusu = %s, apellidousu = %s, telusu = %s, fechanac_usu  = %s , correousu = %s WHERE codusuario = %s"
        cursor.execute(sql,(nombreUsu,apellidosUsu,telefonoUsu,fechaNacUsu,correoUsu,id))
        db.commit()
        
        cursor.execute("SELECT id_datosUsu FROM datosUsuario WHERE codusuario = %s", (id,))
        datosConsulta = cursor.fetchone()
        
        if datosConsulta is None:
            sqlDatos = "INSERT INTO datosUsuario (direccionUsu, ciudadUsu, descripcionAcercaUsu, sitioWebUsu, blogUsu,codusuario) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sqlDatos, (direccionUsu, ciudadUsu, descripcionAcerca, sitioWeb, blog, id))
            db.commit()
        else:
            sqlDatos = "UPDATE datosUsuario SET direccionUsu = %s, ciudadUsu = %s, descripcionAcercaUsu = %s, sitioWebUsu = %s, blogUsu = %s WHERE codusuario= %s"
            cursor.execute(sqlDatos, (direccionUsu, ciudadUsu, descripcionAcerca, sitioWeb, blog, id))
            db.commit()
        
        flash('Datos actualizados correctamente', 'success') 
        cursor.close()
        return redirect(url_for('usuarios.perfil_usuario'))
    else:
        
        cursor.execute('SELECT nombreusu, apellidousu, telusu, fechanac_usu, correousu FROM usuario WHERE codusuario = %s', (id,))
        data = cursor.fetchone()
        
        # Obtener la ruta de la foto de perfil desde la base de datos
        cursor.execute('SELECT ruta_foto FROM fotos_usuario WHERE cod_usuario = %s AND tipo_foto = "perfil" ORDER BY id_foto DESC LIMIT 1', (id,))
        foto_perfil_data = cursor.fetchone()
        
        foto_perfil = normalize_path(foto_perfil_data[0]) if foto_perfil_data else "../static/img/perfil_user.png"
        
        cursor.execute('SELECT direccionUsu,ciudadUsu,descripcionAcercaUsu,sitioWebUsu,blogUsu FROM datosUsuario WHERE codusuario = %s',(id,))
        datos = cursor.fetchone()
    
        if datos is None:
            datos = {}
      
     
    return render_template('editarPerfil_user.html',foto_perfil = foto_perfil, usuario=data, user_id=id, datos = datos)
#*****************************************Ruta del index principal de usuario **************************************************************
@usuarios.route('/index_user')
def index_user():
    return render_template('index_user.html')

@usuarios.route('/nosotros_user')
def nosotros_user():
    return render_template('MVQ_user.html')

@usuarios.route('/favoritos_user')
def favoritos_user():
    return render_template('favoritos.html')

#Formatear los slashes para las imagenes
def normalize_path(path):
    """Convierte backslashes a slashes en una ruta y asegura que empieza con '/'."""
    normalized_path = path.replace('\\', '/')
    if not normalized_path.startswith('/'):
        normalized_path = '/' + normalized_path
    return normalized_path