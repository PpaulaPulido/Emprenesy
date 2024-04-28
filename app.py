from flask import Flask, request, redirect, url_for, render_template, flash
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os
from db import get_db, get_cursor


app = Flask(__name__)
app.secret_key = '123456789'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

db = get_db()
cursor = get_cursor(db)

from modules.usuarios import usuarios
app.register_blueprint(usuarios, url_prefix='/usuarios')



''' se utiliza para verificar si el nombre de un archivo tiene una extensión permitida según una lista de extensiones '''
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/perfil_admin')
def perfil_admin():
    user_id = 1 
    cursor.execute("SELECT ruta_foto FROM fotos_usuario WHERE cod_usuario = %s AND tipo_foto = 'portada' ORDER BY id_foto DESC LIMIT 1", (user_id,))
    foto_portada = cursor.fetchone()
    if foto_portada:
        foto_portada = os.path.join('/', foto_portada[0])  
    else:
        foto_portada = '/img/bogota-turismo.jpg' #foto por default

    return render_template('perfil_admin.html', foto_portada=foto_portada)

@app.route('/subir_portada', methods=['POST'])
def subir_portada():
    
    user_id = 1  # Aquí deberías obtener el user_id de la sesión o contexto de autenticación para identificar al usuario actual.
    
    # Intenta obtener el archivo con el nombre 'fotoPortada' del formulario enviado. Si no hay archivo, 'file' será None.
    file = request.files.get('fotoPortada')
    
    # Verifica primero si se obtuvo un archivo y luego si el archivo tiene una extensión permitida.
    if file and allowed_file(file.filename):
        # 'secure_filename' sanea el nombre del archivo para asegurarse de que es seguro de usar en el sistema de archivos.
        filename = secure_filename(file.filename)
        
        # Construye una ruta completa donde se guardará el archivo, usando el directorio configurado para subidas.
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
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
        return redirect(url_for('perfil_admin'))
    
    else:
        # Si no se subió un archivo o el tipo de archivo no es permitido, muestra un mensaje de error.
        flash('No se seleccionó archivo o el tipo de archivo no está permitido.')
        
        # Redirecciona al usuario de vuelta a la página 'perfil_admin' para mantenerlo en la misma página en caso de error.
        return redirect(url_for('perfil_admin'))




if __name__ == '__main__':
    app.run(debug=True, port=3000)
