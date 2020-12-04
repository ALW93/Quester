from .db import db, c

class Habit(db.Model):
    __tablename__ = "habits"

    id = c(db.Integer, primary_key=True)
    created_at = c(db.Date, nullable=False)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = c(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    name = c(db.String(50), nullable=False, unique=True)
    frequency = c(db.String(50), nullable=False)
    checks = db.relationship('Check', backref="habits", lazy=True)
