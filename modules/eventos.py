from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session
from werkzeug.utils import secure_filename
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


# Conexión para ingresar eventos
@evento.route('/publicareventos', methods=['GET', 'POST'])
def publicarEventos():
    if request.method == 'POST':
        
        Nombre = request.form.get("nombreven")
        Logo = request.form.get("logoeven")
        tipo_evento = request.form.get("tipoevento")
        Contacto = request.form.get("contactoeven")
        correo = request.form.get("correoeven")
        Fecha = request.form.get("fechaeven")
        HorarioE = request.form.get("horarioE")
        HorarioS = request.form.get("horarioS")  
        Descripcion = request.form.get("descripcioneven")
        Pagina = request.form.get("paginaeven")
        Boleteria = request.form.get("boletoseven")
        Galeria = request.files.getlist('galeriaeven[]')
        redes_instagram = request.form.get("redInstagram")
        redes_tiktok = request.form.get("redTiktok")
        descripcion_adicional = request.form.get("descripcionA")
        
        # Obtener el código del administrador
        cursor.execute("SELECT codadmin FROM administrador LIMIT 1")
        codadmin = cursor.fetchone()[0]

        # Insertar el evento en la tabla 'eventos' con el código del administrador
        cursor.execute(
            "INSERT INTO eventos (nombreeven, logo,tipoevento,descripeven, paginaeven, boletaseven, infoAdicional,contacto, correoeven, codadmin) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s,%s)",
            (Nombre, Logo,tipo_evento ,Descripcion,Pagina,Boleteria,descripcion_adicional,Contacto, correo, codadmin)
        )
        
        evento_id = cursor.lastrowid
        session['evento_id'] = evento_id
        print("evento id almacenado",evento_id)
        print("evento id recuperado", session.get('evento_id'))
        
        cursor.execute("INSERT INTO fechaseven(ideven,fechaseven,horarioEntrada,horarioSalida)VALUE(%s, %s, %s, %s)",(evento_id,Fecha,HorarioE,HorarioS))
        
        if redes_instagram:
            cursor.execute("INSERT INTO redesSocialesEven (ideven, red, url) VALUES (%s, %s, %s)", (evento_id, 'instagram', redes_instagram))
        
        if redes_tiktok:
            cursor.execute("INSERT INTO redesSocialesEven (ideven, red, url) VALUES (%s, %s, %s)", (evento_id, 'tik tok', redes_tiktok))
        
        
        upload_folder = current_app.config['FOLDER_EVENT']
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        for imagen in Galeria:
            if imagen and allowed_file(imagen.filename):
                filename = secure_filename(imagen.filename)
                print("arhcivo: ",filename)
                path = os.path.join(upload_folder, filename)
                imagen.save(path)
                descripcion_default = "Imágen del evento"  

                # Guardar la URL en la base de datos
                cursor.execute("INSERT INTO galeriaeven (ideven, urlImagen, descripcion) VALUES (%s, %s, %s)", (evento_id, path, descripcion_default))
                
        db.commit()
        flash('Evento registrado correctamente', 'success')
        return redirect(url_for("evento.formularioUbicacion"))

    return render_template('formularioeventos.html')

@evento.route('/FormularioEventosUbicacion',methods=['GET', 'POST'])
def formularioUbicacion():

    evento_id = session.get('evento_id')
    print("evento del id",evento_id)
    if request.method == 'POST':
        ubicaciones = request.form.getlist('direccioneven[]')
        print("ubicacion de la variable ubicaciones ",ubicaciones)
        for ubicacion in ubicaciones:
            print("ubicacion dentro del for ",ubicacion)
            if ubicacion:  # Comprobar que la ubicación no este vacía
                cursor.execute("INSERT INTO ubicacioneven (ideven, ubicacion) VALUES (%s, %s)", (evento_id, ubicacion))
        db.commit()
        flash('Ubicaciones guardadas correctamente')
        return redirect(url_for('admin.index_admin'))
    return render_template('formularioEventos2.html')


@evento.route('/SeccionEvento')
def sectionEvento():
    return render_template('seccion_evento.html')

@evento.route('/eventoLocation')
def eventoLocation():
    return render_template('formularioEventos2.html')