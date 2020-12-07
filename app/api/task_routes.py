from flask import Blueprint, jsonify, request
from app.models import db, Task_Category, Category, Task
from flask_login import login_required


task_routes = Blueprint('tasks', __name__)
user_routes = Blueprint('users', __name__)

@task_routes.route('/<int:id>/cat')
@login_required
def taskCats(id):
    """
    Get Categories for a Specific Task
    """
    taskCats = Category.query.filter(Task_Category.task_id == id, Task_Category.category_id == Category.id).all()
    cat_dicts = [cat.to_dict() for cat in taskCats]
    cat_json = jsonify({'categories': cat_dicts})
    return cat_json
