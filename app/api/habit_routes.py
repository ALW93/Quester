from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Habit, Habit_Category, Check

habit_routes = Blueprint("habits", __name__)


@habit_routes.route("/<int:id>/checks")
@login_required
def habit_checks(id):
    """Get Checks for a Habit"""
    data = Check.query.filter(Check.habit_id == id).all()
    checks = [check.to_dict() for check in data]
    check_json = jsonify({'checks': checks})
    return check_json
