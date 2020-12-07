from flask import Blueprint, jsonify, request
from app.models import db, Stat
from flask_login import login_required

data_routes = Blueprint('data', __name__)


@data_routes.route('/stat/<int:id>')
@login_required
def taskCats(id):
    taskCats = Category.query.filter(Task_Category.task_id == id, Task_Category.category_id == Category.id).all()
    cat_dicts = [cat.to_dict() for cat in taskCats]
    cat_json = jsonify({'categories': cat_dicts})
    return cat_json
