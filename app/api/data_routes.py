from flask import Blueprint, jsonify, request
from app.models import db, Stat
from flask_login import login_required

data_routes = Blueprint('data', __name__)


@data_routes.route('/stat/<int:id>')
@login_required
def taskCats(id):
    stat = Stat.query.get(id)
    return stat.to_dict()
