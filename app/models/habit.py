from .db import db, c

class Habit(db.Model):
    __tablename__ = "habits"

    id = c(db.Integer, primary_key=True)
    user_id = c(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = c(db.Integer, db.ForeignKey('category.id'), nullable=True)
    name = c(db.String(50), nullable=False, unique=True)
    frequency = c(d.String(50), nullable=False)
