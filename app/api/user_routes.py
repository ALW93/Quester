from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Avatar
from sqlalchemy.exc import SQLAlchemyError

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
