from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Habit, Habit_Category, Check
from datetime import datetime, timedelta, date

dt = datetime.strptime(str(date.today()), '%Y-%m-%d')
start = dt - timedelta(days=dt.weekday())
end = start + timedelta(days=6)

habit_routes = Blueprint("habits", __name__)


@habit_routes.route("/<int:id>/checks")
@login_required
def habit_checks(id):
    """Get Checks for a Habit"""
    dates = request.json
    data = Check.query.filter(Check.habit_id == id) \
        .filter(Check.date >= start).filter(Check.date <= end).all()
    checks = [check.to_dict() for check in data]
    check_json = jsonify({'checks': checks})
    return check_json
