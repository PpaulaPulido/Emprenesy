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