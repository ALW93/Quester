from .db import db, c

class Category(db.Model):
    __tablename__ = "categories"

    id = c(db.Integer, primary_key=True)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stat_id = c(db.Integer, db.ForeignKey('stats.id'), nullable=True)
    name = c(db.String(50), nullable = False)
    habits = db.relationship('Habit', backref="category", lazy=True)
