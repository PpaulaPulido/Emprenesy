from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort
from werkzeug.utils import secure_filename
from db import get_db, get_cursor
import os

emprende = Blueprint('emprende', __name__)
db = get_db()
cursor = get_cursor(db)

@emprende.route('/sectionEmprende')
def sectionEmprende():
    return render_template('seccion_empren.html')

@emprende.route('/emprendeDetalle')
def emprendeDetalle():
    return render_template('detalle_empren.html')