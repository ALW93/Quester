from flask import Blueprint, jsonify, request
from app.models import db, Task_Category, Category, Task, User
from flask_login import login_required


task_routes = Blueprint('tasks', __name__)


@task_routes.route('/<int:id>/cat')
@login_required
def task_categories(id):
    """
    Get Categories for a Specific Task
    """
    taskCats = Category.query.filter(Task_Category.task_id == id, Task_Category.category_id == Category.id).all()
    cat_dicts = [cat.to_dict() for cat in taskCats]
    cat_json = jsonify({'categories': cat_dicts})
    return cat_json


@task_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_task(id):
    """Delete a specific task"""

    delete_task = Task.query.get(id)
    if delete_task:
        db.session.delete(delete_task)
        db.session.commit()


@task_routes.route('/<int:id>/expire', methods=["PUT"])
@login_required
def expire_task(id):
    """Expire a Task"""
    task = Task.query.get(id)
    if task:
        task.status = "expired"
        db.session.commit()
        return task.status


@task_routes.route('/<int:id>/complete', methods=["PUT"])
@login_required
def complete_task(id):
    """Complete a task"""
    task = Task.query.get(id)
    user = User.query.get(task.user_id)
    if task and user:
        task.status = "complete"
        user.currency += 10
        db.session.commit()
        return task.status
