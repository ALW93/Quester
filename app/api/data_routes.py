from flask import Blueprint, jsonify, request
from app.models import db, Stat, User
from flask_login import login_required

data_routes = Blueprint('data', __name__)


@data_routes.route('/stat/<int:id>')
@login_required
def getStats(id):
    stat = Stat.query.get(id)
    return stat.to_dict()


@data_routes.route('/find_users/<str:query>')
@login_required
def find_users(query):
    lowerQuery = query.lower()
    user_list = User.query.filter(User.username.lower() == = lowerQuery)
    if user_list:
