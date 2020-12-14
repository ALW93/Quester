from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Habit, Habit_Category, Check, Category
from datetime import datetime, timedelta, date

dt = datetime.strptime(str(date.today()), '%Y-%m-%d')
start = dt - timedelta(days=dt.weekday())
end = start + timedelta(days=7)

habit_routes = Blueprint("habits", __name__)


@habit_routes.route("/<int:id>/checks")
@login_required
def habit_checks(id):
    """Get Checks for a Habit"""
    data = Check.query.filter(Check.habit_id == id) \
        .filter(Check.date >= start).filter(Check.date <= end).all()
    checks = [check.to_dict() for check in data]
    check_json = jsonify({'checks': checks})
    return check_json


@habit_routes.route("/<int:id>/checks", methods=["POST"])
@login_required
def post_check(id):
    """POST Check for a Habit"""
    data = request.json
    if data:
        new_check = Check(
            date=data["date"],
            user_id=data["user_id"],
            habit_id=data["habit_id"]
        )
        db.session.add(new_check)
        db.session.commit()
        return new_check.to_dict()
    return {"error": "Something went wrong..."}


@habit_routes.route("/<int:id>/checks", methods=["DELETE"])
@login_required
def delete_check(id):
    """Delete Check from a Habit"""

    data = request.json
    delete_check = Check.query.filter(Check.habit_id == id).filter(Check.date == data['date']).first();

    if delete_check:
        db.session.delete(delete_check)
        db.session.commit()
    return {"message": "Success"}


@habit_routes.route("/<int:id>/cat")
@login_required
def habit_categories(id):
    """Get Categories for a Specific Habit"""
    habitCats = Category.query.filter(Habit_Category.habit_id == id, Habit_Category.category_id == Category.id).all()
    cat_dicts = [cat.to_dict() for cat in habitCats]
    cat_json = jsonify({'categories': cat_dicts})
    return cat_json


@habit_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_habit(id):
    """Delete a specific Habit"""
    delete_habit = Habit.query.get(id)
    if delete_habit:
        db.session.delete(delete_habit)
        db.session.commit()
    return {"message": "Success"}
