from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort
from werkzeug.utils import secure_filename
from db import get_db, get_cursor
import os

res = Blueprint('res', __name__)
db = get_db()
cursor = get_cursor(db)

@res.route('/publicacionRes')
def publicacionRes():
    return render_template('publicacionRes.html')

@res.route('/restauranteInfoContacto')
def restauranteContacto():
    return render_template('publicacionRes1.html')

@res.route('/restauranteLocation')
def restauranteLocation():
    return render_template('publicacionRes2.html')