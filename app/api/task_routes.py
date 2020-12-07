from flask import Blueprint, jsonify, request
from app.models import db, Task_Category
from flask_login import login_required

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/<int:id>/cat')
@login_required
def taskCats(id):
    taskCats = Task_Category.query.filter(Task_Category.task_id == id).all()
    tc_dicts = [tc.getCat() for tc in taskCats]
    tc_json = jsonify({'categories': tc_dicts})
    return tc_json
