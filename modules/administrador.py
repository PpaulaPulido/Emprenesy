from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,jsonify,session
from werkzeug.utils import secure_filename
#from werkzeug.security import generate_password_hashz
from db import get_db, get_cursor
import os

admin = Blueprint('admin', __name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

db = get_db()
cursor = get_cursor(db)

#*********************************Funcion para permitir tipo de extensiones para las img********************************
''' se utiliza para verificar si el nombre de un archivo tiene una extensión permitida según una lista de extensiones '''
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@admin.route('/index_admin')
def index_admin():
    return render_template('index_admin.html')


#***********************************Ruta para perfil de administrador************************************
@admin.route('/perfil_admin')
def perfil_admin():
    
    user_id = session.get('admin_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    db = get_db()  # Obtener la conexión a la base de datos
    cursor = db.cursor()  # Crear un cursor

    default_portada = '/static/img/bogota-turismo.jpg'
    default_perfil = '/static/img/perfil_user.png'

    try:
        cursor.execute("SELECT nombreadmin,apellidoadmin,correoadmin FROM administrador WHERE codadmin = %s", (user_id,))
        admin_datos= cursor.fetchone()
        if admin_datos:
            nombre_admin, apellido_admin, correo_admin = admin_datos
        else:
            nombre_admin = apellido_admin = correo_admin = "Información no disponible"
        
        def obtenerImagen(image_type, default_image):
            cursor.execute("SELECT ruta_foto FROM fotos_admin WHERE cod_admin = %s AND tipo_foto = %s ORDER BY id_foto DESC LIMIT 1", (user_id, image_type))
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

    return render_template('perfil_admin.html', nombre_admin = nombre_admin, apellido_admin = apellido_admin, correo_admin = correo_admin, foto_portada=fotoPortada, foto_perfil=fotoPerfil)

@admin.route('/MisFotos')
def photos():
    
    user_id = session.get('admin_id')
    
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


@admin.route('/galeriaAdmin')
def galeria_admin():
    
    user_id = session.get('admin_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    db = get_db()
    cursor = db.cursor()
    
    try:
        cursor.execute("""
            SELECT ruta_foto, tipo_foto FROM fotos_admin
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

#****************************Ruta para la imagen de perfil************************************************************
@admin.route('/perfil_imagen')
def perfil_imagen():
    
    user_id = session.get('admin_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    cursor.execute("SELECT ruta_foto FROM fotos_admin  WHERE cod_admin= %s AND tipo_foto = 'perfil' ORDER BY id_foto DESC LIMIT 1", (user_id,))
    foto_perfil = cursor.fetchone()

    if foto_perfil:
        foto_perfil_path = foto_perfil[0]  
        directory_path = os.path.join(current_app.root_path, 'static', 'uploads') 
        file_name = os.path.basename(foto_perfil_path)  # Extrae el nombre del archivo
    else:
        # Manejar el caso en que no hay foto de perfil configurada
        directory_path = os.path.join(current_app.root_path, 'static', 'uploads')  # Ruta al directorio de imágenes por defecto
        file_name = 'perfil_user.png'  # Nombre de una imagen por defecto

    # Verificar si el archivo realmente existe
    full_file_path = os.path.join(directory_path, file_name)
    if not os.path.isfile(full_file_path):
        print(f"Archivo no encontrado: {full_file_path}")  # Log para depuración
        abort(404)  # Si el archivo no existe, devuelve un error 404

    return send_from_directory(directory_path, file_name)

#*******************************Ruta para subir la foto de perfil ********************************************************************************
@admin.route('/subir_fotoPerfil', methods=['POST'])
def subir_fotoperfil():
    
    user_id = session.get('admin_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
    file = request.files.get('fotoPerfil')
    
    if file and allowed_file(file.filename):
        
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        cursor.execute("""
            INSERT INTO fotos_admin (cod_admin, ruta_foto, tipo_foto)
            VALUES (%s, %s, 'perfil')
            ON DUPLICATE KEY UPDATE ruta_foto = VALUES(ruta_foto)
        """, (user_id, file_path))
        
        db.commit()

        flash('Foto de portada actualizada con éxito.')

        return redirect(url_for('admin.perfil_admin'))
    
    else:
        flash('No se seleccionó archivo o el tipo de archivo no está permitido.')
        return redirect(url_for('admin.perfil_admin'))

#*******************************Ruta para subir la foto de Portada********************************************************************************
@admin.route('/subir_portada', methods=['POST'])
def subir_portada():
    
    user_id = session.get('admin_id')
    
    if not user_id:
        flash('No está autenticado.', 'error')
        return redirect(url_for('usuarios.inicio_sesion')) 
    
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
            INSERT INTO fotos_admin (cod_admin, ruta_foto, tipo_foto)
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



@admin.route('/tipo_publicacion')
def tipoPublicacion():
    return render_template('tipo_publicacion.html')


@admin.route('/nosotros')
def nosotrosEmprenesy():
    return render_template('MVQ_admin.html')

#Formatear los slashes para las imagenes
def normalize_path(path):
    """Convierte backslashes a slashes en una ruta y asegura que empieza con '/'."""
    normalized_path = path.replace('\\', '/')
    if not normalized_path.startswith('/'):
        normalized_path = '/' + normalized_path
    return normalized_path