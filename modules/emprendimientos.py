from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session,jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
from db import get_db, get_cursor
import os

emprende = Blueprint('emprende', __name__)
db = get_db()
cursor = get_cursor(db)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


#***************************************Restaurar formulario de emprendimiento*********************************************************
@emprende.route('/resetEmprende')
def resetEmprendimiento():
    session.pop('emprende_id', None)
    session.pop('form_data', None)
    return redirect(url_for('emprende.publicar_emprendimiento'))

#************************************************Registro de publicacion de emprendimiento parte 1***************************************************************************
@emprende.route('/publicacionEmprende',methods=['GET', 'POST'])
def publicar_emprendimiento():
    
    current_app.config['FOLDER_EMPREN'] = os.path.join(current_app.root_path, 'static', 'galeriaEmprende')
    
    if request.method == 'GET' and request.args.get('nuevo', '0') == '1':
        # Si se especifica que es un nuevo emprendimiento, resetear la sesión
        session.pop('emprende_id', None)
        session.pop('form_data', None)
        #return redirect(url_for('emprende.publicar_emprendimiento'))
    
    emprende_id = session.get('emprende_id')
    form_data = session.get('form_data', {})
    relativePath = None 
    
    if request.method == 'POST':
        
        galeria  = request.files.getlist('galeria[]')
        logoEmprende = request.files.get("logoEmprende")
        
        if logoEmprende and allowed_file(logoEmprende.filename):
            filename = secure_filename(logoEmprende.filename)
            path = os.path.join(current_app.config['FOLDER_EMPREN'], filename)
            logoEmprende.save(path) 
            relativePath =  os.path.join('galeriaEmprende',filename)
            
        diccionarioEm = {
            "nombreEm": request.form.get("nombreEmprende"),
            "tipoEm": request.form.get("typeEmprende"),
            "descripcionEm": request.form.get("descripcionEmprende"),
            "horarioEm": request.form.get("horarioEmprende"),
            "horarioE": request.form.get("horarioE"),
            "horarioS": request.form.get("horarioS"),
            "paginaEm": request.form.get("paginaEmprende"),
            "productosEm": request.form.get("producempre"),
            "correoEm": request.form.get("correoempre"),
            "contactoEm": request.form.get("telempre"),
            "redInstagram": request.form.get("redInstagram"),
            "redTiktok": request.form.get("redTiktok")
        }
        
        if relativePath:
            diccionarioEm["logo"] = relativePath
        
        form_data.update(diccionarioEm)
        session['form_data'] = form_data
        
        codadmin = session.get('admin_id') 
        cursor = db.cursor()
        
        if not emprende_id:
            fechaPublicacion = datetime.now().date()
            cursor.execute("INSERT INTO emprendimientos (nombreempre,logo,tipoempre,descripempre,horarioempre,horarioApertura,horarioCierre,paginaempre,producempre,correoempre,telempre,fecha_publicacion,codadmin) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(form_data["nombreEm"],form_data['logo'],form_data["tipoEm"],form_data["descripcionEm"],form_data["horarioEm"],form_data["horarioE"],form_data["horarioS"],form_data["paginaEm"],form_data["productosEm"],form_data["correoEm"],form_data["contactoEm"],fechaPublicacion,codadmin))
            
            #recuperar el id del emprendimiento
            emprende_id = cursor.lastrowid
            session['emprende_id'] = emprende_id
            
            #galeria de imagenes
            upload_folder = current_app.config['FOLDER_EMPREN']
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            for imagen in galeria:
                if imagen and allowed_file(imagen.filename):
                    filename = secure_filename(imagen.filename)
                    path = os.path.join(upload_folder, filename)
                    imagen.save(path)
                    cursor.execute("INSERT INTO galeriaempre (idempre, imagenempre, descripcion) VALUES (%s, %s, %s)", (emprende_id, path, "Imágen de emprendimiento"))
            
            # Insertar redes sociales
            if form_data["redInstagram"]:
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (emprende_id, 'emprendimiento', 'instagram', form_data["redInstagram"]))
                
            if form_data["redTiktok"]:
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (emprende_id, 'emprendimiento', 'tiktok', form_data["redTiktok"]))
            
            db.commit()
            cursor.close()
            
        else:
            # Actualiza el evento existente
            cursor = db.cursor()
            cursor.execute("UPDATE emprendimientos SET nombreempre = %s, logo = %s, tipoempre = %s, descripempre = %s, horarioempre = %s, horarioApertura = %s, horarioCierre = %s, paginaempre = %s, producempre = %s, correoempre = %s, telempre = %s WHERE idempre = %s",(form_data["nombreEm"],relativePath,form_data["tipoEm"],form_data["descripcionEm"],form_data["horarioEm"],form_data["horarioE"],form_data["horarioS"],form_data["paginaEm"],form_data["productosEm"],form_data["correoEm"],form_data["contactoEm"],emprende_id))
            
            if form_data["redInstagram"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", 
                   (form_data["redInstagram"], emprende_id, 'emprendimiento', 'instagram'))
            if form_data["redTiktok"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", 
                   (form_data["redTiktok"], emprende_id, 'emprendimiento', 'tiktok'))
            db.commit()
            cursor.close()
        
        flash('Emprendimiento registrado correctamente', 'success')
        return redirect(url_for("emprende.publicar_emprendimientoLocation"))
    
    return render_template('formularioempren.html', datos = form_data, emprende_id = emprende_id)

#************************************************Registro de publicacion de emprendimiento parte 2***********************************
@emprende.route('/EmprendeLocation',methods=['GET', 'POST'])
def publicar_emprendimientoLocation():
    
    emprende_id = session.get('emprende_id')
    
    if request.method == 'POST':
        ubicaciones = request.form.getlist('direcciones[]')
        for ubicacion in ubicaciones:
            if ubicacion:  # Comprobar que la ubicación no este vacía
                cursor.execute("INSERT INTO ubicacionempre (idempre, ubicacion) VALUES (%s, %s)", (emprende_id, ubicacion))
        db.commit()
        flash('Ubicaciones guardadas correctamente')
        return redirect(url_for('admin.index_admin'))
    return render_template('formularioEmprende2.html')


@emprende.route('/sectionEmprende')
def sectionEmprende():
    return render_template('seccion_empren.html')

@emprende.route('/emprendeDetalle')
def emprendeDetalle():
    return render_template('detalle_empren.html')