from .db import db, c

class Check(db.Model):
    __tablename__ = "check"

    id = c(db.Integer, primary_key = True)
    user_id = c(db.Integer, db.ForeignKey('user.id'), nullable=False)
    habit_id = c(db.Integer, db.ForeignKey('habit.id'), nullable=False)
