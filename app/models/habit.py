from .db import db, c

class Habit(db.Model):
    __tablename__ = "habits"

    id = c(db.Integer, primary_key=True)
    created_at = c(db.Date, nullable=False)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = c(db.String(50), nullable=False, unique=True)
    frequency = c(db.String(50), nullable=False)
    checks = db.relationship('Check', backref="habit", lazy=True)
    categories = db.relationship('Habit_Category', backref="habit", lazy=True)

class Habit_Category(db.Model):
    __tablename__ = "task_categories"
    id = c(db.Integer, primary_key = True)
    habit_id = c(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    category_id = c(db.Integer, db.ForeignKey('habits.id'), nullable=False)
