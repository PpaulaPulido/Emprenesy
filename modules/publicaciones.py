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