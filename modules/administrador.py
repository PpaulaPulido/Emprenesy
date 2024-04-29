from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from db import get_db, get_cursor
import os

admin = Blueprint('admin', __name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

db = get_db()
cursor = get_cursor(db)

''' se utiliza para verificar si el nombre de un archivo tiene una extensión permitida según una lista de extensiones '''
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@admin.route('/index_admin')
def index_admin():
    return render_template('index_admin.html')


@admin.route('/perfil_admin')
def perfil_admin():
    user_id = 1
    
    
    cursor.execute("SELECT ruta_foto FROM fotos_usuario WHERE cod_usuario = %s AND tipo_foto = 'portada' ORDER BY id_foto DESC LIMIT 1", (user_id,))
    foto_portada = cursor.fetchone()
    if foto_portada:
        foto_portada = os.path.join('/', foto_portada[0])
    else:
        foto_portada = '/static/img/bogota-turismo.jpg'  # Foto de portada por default


    cursor.execute("SELECT ruta_foto FROM fotos_usuario WHERE cod_usuario = %s AND tipo_foto = 'perfil' ORDER BY id_foto DESC LIMIT 1", (user_id,))
    foto_perfil = cursor.fetchone()
    if foto_perfil:
        foto_perfil = os.path.join('/', foto_perfil[0])
    else:
        foto_perfil = '/static/img/perfil_user.png'  # Foto de perfil por default

    return render_template('perfil_admin.html', foto_portada=foto_portada, foto_perfil=foto_perfil)



@admin.route('/subir_fotoPerfil', methods=['POST'])
def subir_fotoperfil():
    
    user_id = 1  #Obtener el user_id de la sesión o contexto de autenticación para identificar al usuario actual.
    
    file = request.files.get('fotoPerfil')
    
    if file and allowed_file(file.filename):
        
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        cursor.execute("""
            INSERT INTO fotos_usuario (cod_usuario, ruta_foto, tipo_foto)
            VALUES (%s, %s, 'perfil')
            ON DUPLICATE KEY UPDATE ruta_foto = VALUES(ruta_foto)
        """, (user_id, file_path))
        
        db.commit()

        flash('Foto de portada actualizada con éxito.')

        return redirect(url_for('admin.perfil_admin'))
    
    else:
        flash('No se seleccionó archivo o el tipo de archivo no está permitido.')
        return redirect(url_for('admin.perfil_admin'))


@admin.route('/subir_portada', methods=['POST'])
def subir_portada():
    
    user_id = 1  # Obtener el user_id de la sesión o contexto de autenticación para identificar al usuario actual.
    
    # Intenta obtener el archivo con el nombre 'fotoPortada' del formulario enviado. Si no hay archivo, 'file' será None.
    file = request.files.get('fotoPortada')
    
    # Verifica primero si se obtuvo un archivo y luego si el archivo tiene una extensión permitida.
    if file and allowed_file(file.filename):
        # 'secure_filename' sanea el nombre del archivo para asegurarse de que es seguro de usar en el sistema de archivos.
        filename = secure_filename(file.filename)
        
        # Construye una ruta completa donde se guardará el archivo, usando el directorio configurado para subidas.
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        
        # Guarda el archivo en el sistema de archivos del servidor.
        file.save(file_path)

        # Ejecuta una consulta SQL para insertar o actualizar la ruta de la foto de portada en la base de datos.
        cursor.execute("""
            INSERT INTO fotos_usuario (cod_usuario, ruta_foto, tipo_foto)
            VALUES (%s, %s, 'portada')
            ON DUPLICATE KEY UPDATE ruta_foto = VALUES(ruta_foto)
        """, (user_id, file_path))
        
        # Confirma los cambios en la base de datos.
        db.commit()
        
        # Muestra un mensaje al usuario indicando que la foto de portada ha sido actualizada con éxito.
        flash('Foto de portada actualizada con éxito.')
        
        # Redirecciona al usuario de vuelta a la página 'perfil_admin'.
        return redirect(url_for('admin.perfil_admin'))
    
    else:
        # Si no se subió un archivo o el tipo de archivo no es permitido, muestra un mensaje de error.
        flash('No se seleccionó archivo o el tipo de archivo no está permitido.')
        
        # Redirecciona al usuario de vuelta a la página 'perfil_admin' para mantenerlo en la misma página en caso de error.
        return redirect(url_for('admin.perfil_admin'))
