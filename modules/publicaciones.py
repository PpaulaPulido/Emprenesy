from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session,jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
from db import get_db, get_cursor
import os

publicacionDash = Blueprint('publicacionDash', __name__)
db = get_db()
cursor = get_cursor(db)

def dashboardPublicacion(entidad):
    
    db = get_db()
    cursor = db.cursor()
    codadmin = session.get('admin_id')

    # Seleccionamos los campos comunes y específicos según el tipo de entidad
    if entidad == 'restaurante':
        table_name = 'restaurantes'
        entity_fields = 'idresta as id, nombreresta as nombre, logo, tiporesta as tipo, fecha_publicacion'
        
    elif entidad == 'emprendimiento':
        table_name = 'emprendimientos'
        entity_fields = 'idempre as id, nombreempre as nombre, logo, tipoempre as tipo, fecha_publicacion'
    
    elif entidad == 'evento':
        table_name = 'eventos'
        entity_fields = 'ideven as id, nombreeven as nombre, logo, tipoevento as tipo, fecha_publicacion'
    
    else:
        return jsonify({'error': 'Tipo de entidad no soportado'}), 400

    querySelect = f"SELECT {entity_fields} FROM {table_name} WHERE codadmin = %s ORDER BY fecha_publicacion DESC"
    cursor.execute(querySelect, (codadmin,))
    publicaciones = cursor.fetchall()

    publicaciones_list = []

    for publicacion in publicaciones:
        id, nombre, logo_filename, tipo, fecha_publicacion = publicacion

        # Normalizamos la URL del logo
        if logo_filename:
            normalized_logo_filename = logo_filename.replace('\\', '/')
            logo_url = url_for('static', filename=normalized_logo_filename)
        else:
            logo_url = url_for('static', filename='img/notFound.png')

        # Agregamos la publicación formateada a la lista
        publicaciones_list.append({
            'id': id,
            'nombre': nombre,
            'logo': logo_url,
            'tipo': tipo,
            'fecha_publicacion': fecha_publicacion
        })

    return jsonify(publicaciones_list)


@publicacionDash.route('/dashboard/restaurante')
def dashRes():
    return dashboardPublicacion("restaurante")

@publicacionDash.route('/dashboard/emprendimiento')
def dashEmmprendimiento():
    return dashboardPublicacion("emprendimiento")

@publicacionDash.route('/dashboard/evento')
def dashEventos():
    return dashboardPublicacion("evento")

def publicacionesPublica(entidad, tipo):
    db = get_db()
    cursor = db.cursor()

    if entidad == 'restaurante':
        tabla = 'restaurantes'
        campos = 'idresta as id, nombreresta as nombre, logo, tiporesta as tipo, fecha_publicacion'
        tipo_columna = 'tiporesta'
        
    elif entidad == 'emprendimiento':
        tabla = 'emprendimientos'
        campos = 'idempre as id, nombreempre as nombre, logo, tipoempre as tipo, fecha_publicacion'
        tipo_columna = 'tiporesta'
        
    elif entidad == 'evento':
        tabla = 'eventos'
        campos = 'ideven as id, nombreeven as nombre, logo, tipoevento as tipo, fecha_publicacion'
        tipo_columna = 'tipoevento'
    else:
        return jsonify({'error': 'Tipo de entidad no soportado'}), 400

    querySelect = f"SELECT {campos} FROM {tabla} WHERE LOWER({tipo_columna}) = LOWER(%s) ORDER BY fecha_publicacion DESC"

    
    cursor.execute(querySelect, (tipo,))
    publicaciones = cursor.fetchall()
    
    publicaciones_list = []

    for publicacion in publicaciones:
        id, nombre, logo_filename, tipo, fecha_publicacion = publicacion

        if logo_filename:
            normalized_logo_filename = logo_filename.replace('\\', '/')
            logo_url = url_for('static', filename=normalized_logo_filename)
        else:
            logo_url = url_for('static', filename='img/notFound.png')

        publicaciones_list.append({
            'id': id,
            'nombre': nombre,
            'logo': logo_url,
            'tipo': tipo,
            'fecha_publicacion': fecha_publicacion
        })

    return jsonify(publicaciones_list)


@publicacionDash.route('/tipoRestaurante')
def restaurantesList():
    tipo = request.args.get('tipo')  # parámetro 'tipo' de la URL
    if tipo is None:
        return jsonify({'error': 'Falta el parámetro tipo en la URL'}), 400
    
    return publicacionesPublica('restaurante', tipo)


@publicacionDash.route('/restauranteTipo')
def resTipo():
    return render_template('tipo_restaurante.html')

@publicacionDash.route('/galeriaImagenes/<int:id>')
def galeriaImagenes(id):
    db = get_db()
    cursor = get_cursor(db)
    
    sql = "SELECT imagenresta FROM galeriaresta WHERE idresta = %s"
    cursor.execute(sql, (id,))
    imagenes = cursor.fetchall()
    
    cursor.close()
    db.close()
    
    directory_path = os.path.join(current_app.root_path, 'static', 'galeriaRes')
    
    imagenes_encontradas = []
    for imagen in imagenes:
        file_name = imagen[0]  # El nombre del archivo de la imagen está en la primera columna
        # Removemos el prefijo 'galeriaRes\' de file_name si está presente
        file_name = file_name.split('galeriaRes\\')[-1]
        full_file_path = os.path.join(directory_path, file_name)
        
        if os.path.isfile(full_file_path):
            imagenes_encontradas.append(url_for('static', filename=f'galeriaRes/{file_name}'))
        else:
            print(f"Archivo no encontrado: {full_file_path}")  # Log para depuración

    # Si no se encontraron imágenes válidas, se añade una imagen por defecto
    if not imagenes_encontradas:
        default_file_name = 'bogota.jpg'  # Nombre de la imagen por defecto
        default_directory_path = os.path.join(current_app.root_path, 'static', 'img')
        default_full_file_path = os.path.join(default_directory_path, default_file_name)
        
        if os.path.isfile(default_full_file_path):
            imagenes_encontradas.append(url_for('static', filename=f'img/{default_file_name}'))  # Ajustar la ruta para devolver la imagen por defecto
        else:
            print(f"Imagen por defecto no encontrada: {default_full_file_path}")  # Log para depuración
            # Manejar el caso en que ni siquiera la imagen por defecto existe
            flash('No se encontraron imágenes para esta galería y la imagen por defecto no está disponible.', 'error')
            return redirect(url_for('some_default_route'))  # Redirige a una ruta por defecto si no hay imágenes

    return jsonify(imagenes=imagenes_encontradas)


    
    
    