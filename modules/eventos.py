from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort
from werkzeug.utils import secure_filename
from db import get_db, get_cursor
import os

evento = Blueprint('evento', __name__)
db = get_db()
cursor = get_cursor(db)

@evento.route('/eventoDetalle')
def eventoDetalle():
    return render_template('detalle_event.html')


# Conexión para ingresar eventos
@evento.route('/publicareventos', methods=['GET', 'POST'])
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
        return redirect(url_for("eventos.eventos"))

    return render_template('formularioeventos.html')
