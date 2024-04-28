from flask import Blueprint, request, render_template, redirect, url_for, flash
from werkzeug.security import generate_password_hash
from db import get_db, get_cursor


usuarios = Blueprint('usuarios', __name__)

@usuarios.route('/registrarUser', methods=['GET', 'POST'])
def registrar_usuario():
    db = get_db()
    cursor = get_cursor(db)

    if request.method == 'POST':
        nombres = request.form.get('nombres')
        apellidos = request.form.get('apellidos')
        telefono = request.form.get('tel')
        fecha_nac = request.form.get('fechaNac')
        email = request.form.get('correo')
        roles = request.form.get('rol')
        contrasena = request.form.get('contrasena')
        confirmar_contrasena = request.form.get('confirmar_contrasena')
        
        if contrasena != confirmar_contrasena:
            flash('Las contraseñas no coinciden', 'error')
            return render_template('registro.html')
        
        contrasena_encriptada = generate_password_hash(contrasena)
        cursor.execute('SELECT * FROM usuario WHERE correo_usuario = %s', (email,))
        resultado = cursor.fetchall()
        if resultado:
            flash('El correo electrónico ya está registrado', 'error')
            return render_template('registro.html')
        else:
            cursor.execute("""
                INSERT INTO usuario (nombre_usuario, apellido_usuario, telefono_usuario, fecha_nac_usuario, correo_usuario, rol, contrasena)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (nombres, apellidos, telefono, fecha_nac, email, roles, contrasena_encriptada))
            db.commit()
            flash('Usuario creado correctamente', 'success')
            return redirect(url_for("usuarios.registrar_usuario"))

    db.close()
    return render_template('registro.html')
