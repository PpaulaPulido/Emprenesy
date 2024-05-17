from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session,jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
from db import get_db, get_cursor
import os


res = Blueprint('res', __name__)
db = get_db()
cursor = get_cursor(db)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#*********************************Resetear la publicaicon de emprendimiento para registrar uno nuevo*******************************************
@res.route('/resetRestaurante')
def resetRestaurante():
    session.pop('res_id', None)
    session.pop('form_data', None)
    return redirect(url_for('res.publicacionRes'))

#*********************************Ruta para el formualrio de restaurantes parte 1************************************************
@res.route('/publicacionRes',methods=['GET', 'POST'])
def publicacionRes():
    
    current_app.config['FOLDER_RES'] = os.path.join(current_app.root_path, 'static', 'galeriaRes')
    codadmin = session.get('admin_id') 
    
    if request.method == 'GET' and request.args.get('nuevo', '0') == '1':
        # Si se especifica que es un nuevo restaurante, resetear la sesión
        session.pop('res_id', None)
        session.pop('form_data', None)
    
    res_id = session.get('res_id')
    form_data = session.get('form_data', {})
    relativePath = None 
    
    if request.method == 'POST':
        
        logoRes = request.files.get("logoRes")
        galeria = request.files.getlist('galeria[]')
        
        if logoRes and allowed_file(logoRes.filename):
            filename = secure_filename(logoRes.filename)
            path = os.path.join(current_app.config['FOLDER_RES'], filename)
            logoRes.save(path) 
            relativePath =  os.path.join('galeriaRes',filename)
        
        diccionarioRes = {
            "nombreRes": request.form.get("nombreRes"),
            "tipoRes": request.form.get("typeRes"),
            "descripcionRes": request.form.get("descripcionRes"),
            "paginaRes": request.form.get("paginaRes"),
            "menu": request.form.get("menu"),
            "horarioRes": request.form.get("horarioRes"),
            "horarioE": request.form.get("entrada"),
            "horarioS": request.form.get("salida"),
            "correoRes": request.form.get("correoRes"),
            "contactoRes": request.form.get("contactoRes"),
            "redInstagram": request.form.get("redInstagram"),
            "redTiktok": request.form.get("redTiktok"),
        }
        
        if relativePath:
            diccionarioRes["logo"] = relativePath
        
        form_data.update(diccionarioRes)
        session['form_data'] = form_data
        
        codadmin = session.get('admin_id') 
        cursor = db.cursor()
        
        if not res_id:
            fechaPublicacion = datetime.now().date()
            cursor.execute(" INSERT INTO restaurantes (nombreresta, logo, tiporesta, descripresta, paginaresta, menu, horario, horarioApertura, horarioCierre, correoresta, telresta, fecha_publicacion, codadmin) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) ", (form_data["nombreRes"], form_data["logo"], form_data["tipoRes"], form_data["descripcionRes"], form_data["paginaRes"], form_data["menu"], form_data["horarioRes"], form_data["horarioE"], form_data["horarioS"], form_data["correoRes"], form_data["contactoRes"], fechaPublicacion, codadmin))
            
            res_id = cursor.lastrowid
            session['res_id'] = res_id
            
            
            #galeria de imagenes
            upload_folder = current_app.config['FOLDER_RES']
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            for imagen in galeria:
                if imagen and allowed_file(imagen.filename):
                    filename = secure_filename(imagen.filename)
                    #path = os.path.join(upload_folder, filename)
                    path = os.path.join(current_app.config['FOLDER_RES'], filename)
                    imagen.save(path)
                    cursor.execute("INSERT INTO galeriaresta(idresta, imagenresta, descripcion) VALUES (%s, %s, %s)", (res_id, path, "Imágen de restaurante"))
            
            # Insertar redes sociales
            if form_data["redInstagram"]:
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (res_id, 'restaurante', 'instagram', form_data["redInstagram"]))
                
            if form_data["redTiktok"]:
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (res_id, 'restaurante', 'tiktok', form_data["redTiktok"]))
            
            db.commit()
            cursor.close()
        
        else:
            cursor = db.cursor()
            cursor.execute("UPDATE restaurantes SET nombreresta = %s, logo = %s, tiporesta = %s, descripresta = %s, paginaresta = %s, menu = %s, horario = %s, horarioApertura = %s, horarioCierre = %s, correoresta = %s, telresta = %s WHERE idresta = %s ",(form_data["nombreRes"],form_data["logo"],form_data["tipoRes"],form_data["descripcionRes"],form_data["paginaRes"],form_data["menu"],form_data["horarioRes"],form_data["horarioE"],form_data["horarioS"],form_data["correoRes"],form_data["contactoRes"],res_id))
            
            if form_data["redInstagram"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", (form_data["redInstagram"], res_id, 'restaurante', 'instagram'))
            if form_data["redTiktok"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", (form_data["redTiktok"], res_id, 'restaurante', 'tiktok'))
                
            db.commit()
            cursor.close()
        
        flash('Restaurante registrado correctamente', 'success')
        return redirect(url_for("res.restauranteLocation"))
        
    return render_template('publicacionRes.html',datos = form_data,res_id = res_id,admin_id = codadmin)

#*************************************Ruta de registro de restaurante parte 2***********************************************
@res.route('/restauranteLocation',methods=['GET', 'POST'])
def restauranteLocation():
    
    res_id = session.get('res_id')
    admin_id = session.get('admin_id')
    if request.method == 'POST':
        ubicaciones = request.form.getlist('direcciones[]')
        for ubicacion in ubicaciones:
            if ubicacion:  # Comprobar que la ubicación no este vacía
                cursor.execute("INSERT INTO ubicacionresta (idresta, ubicacion) VALUES (%s, %s)", (res_id, ubicacion))
        db.commit()
        flash('Ubicaciones guardadas correctamente')
        return redirect(url_for('admin.index_admin'))
    return render_template('publicacionRes2.html',admin_id = admin_id)

#********************************************************Ruta para json de detalles******************************************************************



@res.route('/restauranteDetalle')
def restauranteDetalle():
    return render_template('detalle_res.html')

@res.route('/SeccionRestaurante')
def sectionRes():
    return render_template('seccion_res.html')

