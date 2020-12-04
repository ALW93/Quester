from .db import db, c

class Habit_Category(db.Model):
    __tablename__ = "habit_categories"

    id = c(db.Integer, primary_key = True)
    habit_id = c(db.Integer, db.ForeignKey('habit.id'), nullable=False)
    category_id = c(db.Integer, db.ForeignKey('category.id'), nullable=False)
