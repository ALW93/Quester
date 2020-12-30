from flask import Blueprint, jsonify, request
from app.models import db, Stat, User
from flask_login import login_required
import Levenshtein as L

data_routes = Blueprint('data', __name__)


@data_routes.route('/stat/<int:id>')
@login_required
def getStats(id):
    stat = Stat.query.get(id)
    return stat.to_dict()


@data_routes.route('/find_users', methods=["PUT"])
@login_required
def find_users():
    data = request.json
    users = User.query.all()
    users_json = [user.to_dict() for user in users]
    searchResult = [friend for friend in users_json if L.distance(friend["username"], data['query']) <= 3]  # noqa
    return searchResult
