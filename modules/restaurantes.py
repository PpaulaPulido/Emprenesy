from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort
from werkzeug.utils import secure_filename
from db import get_db, get_cursor
import os

res = Blueprint('res', __name__)
db = get_db()
cursor = get_cursor(db)


#conexion para ingreasar restaurantes 
@res.route('/publicacionRes', methods=['GET', 'POST'])
def publicacionRes():
    if request.method == 'POST':
        nombre = request.form.get('nombreresta')
        descripcion = request.form.get('descripresta')
        tipo = request.form.get('typeRes')
        pagina = request.form.get('paginaresta')
        menu = request.form.get('menuresta')
        horario = request.form.get('horario')
        entrada = request.form.get('entrada')
        salida = request.form.get('salida')
        
        cursor = db.cursor()
        
        sql = "INSERT INTO restaurantes (nombreresta, descripresta, tipo, paginaresta, menuresta, horario, entrada, salida) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val = (nombre, descripcion, tipo, pagina, menu, horario, entrada, salida)
        cursor.execute(sql, val)
        
        db.commit()
        cursor.close()
        
        flash('publicacion de restaurante exitosa')

    return render_template('publicacionRes.html') 

    

@res.route('/restauranteInfoContacto')
def restauranteContacto():
    if request.method == 'POST':
        Correo_electro = request.form.get('correo')
        numero_contacto = request.form.get('correo')
        instagramRes= request.form.get('correo')
        numero_contacto = request.form.get('correo')
        numero_contacto = request.form.get('correo')
        numero_contacto = request.form.get('correo')

    return render_template('publicacionRes1.html')

@res.route('/restauranteLocation')
def restauranteLocation():
    return render_template('publicacionRes2.html')

@res.route('/restauranteDetalle')
def restauranteDetalle():
    return render_template('detalle_res.html')

@res.route('/SeccionRestaurante')
def sectionRes():
    return render_template('seccion_res.html')