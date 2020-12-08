from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Avatar, Task, Category, Task_Category
from datetime import date

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/avatar')
@login_required
def avatar(id):
    """
    Loads User's Avatar
    """
    avatar = Avatar.query.filter(Avatar.user_id == id).first()
    if avatar:
        return avatar.to_dict()
    else:
        return {}


@user_routes.route('/<int:id>/avatar', methods=['POST'])
@login_required
def create_avatar(id):
    """
    Create User Avatar
    """
    data = request.json
    if data:
        new_avatar = Avatar(
            user_id=id,
            hair=data["hair"],
            face=data["face"],
            body=data["body"]
        )
        db.session.add(new_avatar)
        db.session.commit()
        return new_avatar.to_dict()




@user_routes.route('/<int:id>/categories')
@login_required
def get_categories(id):
    """
    Load all Categories for a User
    """
    cats = Category.query.filter(Category.user_id == id).all()
    cats_dicts = [cat.to_dict() for cat in cats]
    cats_json = jsonify({'cats': cats_dicts})
    return cats_json


@user_routes.route('/<int:id>/tasks', methods=['POST'])
@login_required
def create_task(id):
    """
    Post a New Task
    """
    data = request.json
    created = date.today()
    if data:
        new_task = Task(
            user_id=id,
            created_at=created,
            name=data["name"],
            difficulty=data["difficulty"],
            deadline=data["deadline"],
            frequency=data["frequency"],
            status=data["status"],
        )

        db.session.add(new_task)
        db.session.commit()

        latest = Task.query.filter(Task.user_id == id).order_by(Task.id.desc()).first()
        for cat in data["categories"]:
            new_cat = Task_Category(
                task_id=latest.id,
                category_id=cat
            )
            db.session.add(new_cat)
            db.session.commit()
        return new_task.to_dict()


@user_routes.route('/<int:id>/tasks')
@login_required
def get_tasks(id):
    """
    Load all Tasks for a User
    """
    tasks = Task.query.filter(Task.user_id == id).all()
    task_dicts = [task.to_dict() for task in tasks]
    task_json = jsonify({'tasks': task_dicts})
    return task_json
