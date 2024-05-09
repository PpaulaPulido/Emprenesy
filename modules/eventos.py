from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session,jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
from db import get_db, get_cursor
import os

evento = Blueprint('evento', __name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
db = get_db()
cursor = get_cursor(db)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@evento.route('/eventoDetalle')
def eventoDetalle():
    return render_template('detalle_event.html')

@evento.route('/SeccionEvento')
def sectionEvento():
    return render_template('seccion_evento.html')

@evento.route('/eventoLocation')
def eventoLocation():
    return render_template('formularioEventos2.html')

#********************************Resetear publicacion evento para registrar uno nuevo**************************************
@evento.route('/resetEvento')
def resetEvento():
    session.pop('evento_id', None)
    session.pop('form_data', None)
    return redirect(url_for('evento.publicarEventos'))


# Conexión para ingresar publicaciones de  eventos *******************************
@evento.route('/publicareventos', methods=['GET', 'POST'])
def publicarEventos():
    
    current_app.config['FOLDER_EVENT'] = os.path.join(current_app.root_path, 'static', 'galeriaEventos')
    
    if request.method == 'GET' and request.args.get('nuevo', '0') == '1':
        # Si se especifica que es un nuevo evento, resetear la sesión
        session.pop('evento_id', None)
        session.pop('form_data', None)
        
    # Recuperar el ID del evento si existe en la sesión
    evento_id = session.get('evento_id')
    form_data = session.get('form_data', {})  # Almacena los datos del formulario en la sesión

    if request.method == 'POST':
        # Captura los datos del formulario y los almacena en la sesión
        galeria  = request.files.getlist('galeriaeven[]')
        
        logoeven = request.files.get("logoeven")
        if logoeven and allowed_file(logoeven.filename):
            filename = secure_filename(logoeven.filename)
            path = os.path.join(current_app.config['FOLDER_EVENT'], filename)
            logoeven.save(path)  # Guarda el archivo en el sistema de archivos
            relativePath =  os.path.join('galeriaEventos',filename)
            
        form_data.update({
            "nombreven": request.form.get("nombreven"),
            "tipoevento": request.form.get("tipoevento"),
            "contactoeven": request.form.get("contactoeven"),
            "correoeven": request.form.get("correoeven"),
            "fechaeven": request.form.get("fechaeven"),
            "horarioE": request.form.get("horarioE"),
            "horarioS": request.form.get("horarioS"),
            "descripcioneven": request.form.get("descripcioneven"),
            "paginaeven": request.form.get("paginaeven"),
            "boletoseven": request.form.get("boletoseven"),
            "redInstagram": request.form.get("redInstagram"),
            "redTiktok": request.form.get("redTiktok"),
            "descripcionA": request.form.get("descripcionA"),
        })
        session['form_data'] = form_data

        codadmin = session.get('admin_id')  # Código del administrador

        if not evento_id:
            cursor = db.cursor()
            fechaPublicacion = datetime.now().date()
            # Inserta un nuevo evento en la base de datos
            cursor.execute( "INSERT INTO eventos (nombreeven, logo, tipoevento, descripeven, paginaeven, boletaseven, infoAdicional, contacto, correoeven,fecha_publicacion, codadmin) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)",(form_data["nombreven"], relativePath, form_data["tipoevento"], form_data["descripcioneven"], form_data["paginaeven"], form_data["boletoseven"], form_data["descripcionA"], form_data["contactoeven"], form_data["correoeven"],fechaPublicacion ,codadmin))
            
            evento_id = cursor.lastrowid
            session['evento_id'] = evento_id
            
            # Inserta la galería de imágenes
            upload_folder = current_app.config['FOLDER_EVENT']
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            for imagen in galeria:
                if imagen and allowed_file(imagen.filename):
                    filename = secure_filename(imagen.filename)
                    path = os.path.join(upload_folder, filename)
                    imagen.save(path)
                    cursor.execute("INSERT INTO galeriaeven (ideven, urlImagen, descripcion) VALUES (%s, %s, %s)", (evento_id, path, "Imagen del evento"))
            
            # Insertar fechas y horarios
            cursor.execute("INSERT INTO fechaseven (ideven, fechaseven, horarioEntrada, horarioSalida) VALUES (%s, %s, %s, %s)", (evento_id, form_data["fechaeven"], form_data["horarioE"], form_data["horarioS"]))

            # Insertar redes sociales
            if form_data["redInstagram"]:
                #cursor.execute("INSERT INTO redesSocialesEven (ideven, red, url) VALUES (%s, %s, %s)", (evento_id, 'instagram', form_data["redInstagram"]))
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (evento_id, 'evento', 'instagram', form_data["redInstagram"]))
            if form_data["redTiktok"]:
                #cursor.execute("INSERT INTO redesSocialesEven (ideven, red, url) VALUES (%s, %s, %s)", (evento_id, 'tik tok', form_data["redTiktok"]))
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (evento_id, 'evento', 'tiktok', form_data["redTiktok"]))

            db.commit()
            cursor.close()
        else:
            # Actualiza el evento existente
            cursor = db.cursor()
            cursor.execute(
                "UPDATE eventos SET nombreeven=%s, tipoevento=%s, descripeven=%s, paginaeven=%s, boletaseven=%s, infoAdicional=%s, contacto=%s, correoeven=%s WHERE ideven=%s",
                (form_data["nombreven"], form_data["tipoevento"], form_data["descripcioneven"], form_data["paginaeven"], form_data["boletoseven"], form_data["descripcionA"], form_data["contactoeven"], form_data["correoeven"], evento_id)
            )
            cursor.execute("UPDATE fechaseven SET fechaseven= %s, horarioEntrada = %s ,horarioSalida = %s WHERE ideven=%s",(form_data["fechaeven"],form_data["horarioE"], form_data["horarioS"],evento_id))
            
            if form_data["redInstagram"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", 
                   (form_data["redInstagram"], evento_id, 'evento', 'instagram'))
            if form_data["redTiktok"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", 
                   (form_data["redTiktok"], evento_id, 'evento', 'tiktok'))
            db.commit()
            cursor.close()

        flash('Evento registrado correctamente', 'success')
        return redirect(url_for("evento.formularioUbicacion"))

    return render_template('formularioeventos.html', datos=form_data, evento_id=evento_id)

@evento.route('/FormularioEventosUbicacion',methods=['GET', 'POST'])
def formularioUbicacion():

    evento_id = session.get('evento_id')
    print("evento del id",evento_id)
    if request.method == 'POST':
        ubicaciones = request.form.getlist('direcciones[]')
        print("ubicacion de la variable ubicaciones ",ubicaciones)
        for ubicacion in ubicaciones:
            print("ubicacion dentro del for ",ubicacion)
            if ubicacion:  # Comprobar que la ubicación no este vacía
                cursor.execute("INSERT INTO ubicacioneven (ideven, ubicacion) VALUES (%s, %s)", (evento_id, ubicacion))
        db.commit()
        flash('Ubicaciones guardadas correctamente')
        return redirect(url_for('admin.index_admin'))
    return render_template('formularioEventos2.html')


#ruta para mostrar publicacion a los administradores
@evento.route('/dashEvento' ,methods = ['GET'])
def dashEvento():
    
    db = get_db()
    cursor = db.cursor()
    
    codadmin = session.get('admin_id')
    
    cursor.execute("select ideven,nombreeven,logo,tipoevento from eventos WHERE codadmin = %s",(codadmin,))
    publicacionesEven = cursor.fetchall()
    
    publicacionesEvenList = []
    
    for publicacion in publicacionesEven:
        idEven,nombreeven,logo_filename,tipoevento = publicacion
    
        if logo_filename:
            normalized_logo_filename = logo_filename.replace('\\', '/')
            logo_url = url_for('static', filename=normalized_logo_filename)
        else:
            logo_url = url_for('static', filename='img/notFound.png')

        publicacionesEvenList.append({
            'idEven': idEven,
            'nombreeven': nombreeven,
            'logo': logo_url,
            'tipoevento': tipoevento
        })
    return jsonify(publicacionesEvenList)

#ruta para mostrar publicacion a los usuarios
@evento.route('/TarjetaEvento', methods=['GET'])
def tarjetaEvento():
    tipo_evento = request.args.get('tipo')  # Obtiene el tipo de evento desde la consulta
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT nombreeven, logo, tipoevento FROM eventos WHERE tipoevento = %s", (tipo_evento,))
    eventos = cursor.fetchall()
    
    eventos_list = []
    for evento in eventos:
        nombreeven, logo_filename, tipoEvento = evento
        logo_url = url_for('static', filename=logo_filename.replace('\\', '/')) if logo_filename else url_for('static', filename='img/notFound.png')
        
        eventos_list.append({
            'nombreeven': nombreeven,
            'logo': logo_url,
            'tipoevento': tipoEvento
        })
    return jsonify(eventos_list)

@evento.route('/tipoEvento')
def tipo_evento():
    return render_template('tipo_evento.html')
