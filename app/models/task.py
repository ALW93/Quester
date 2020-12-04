from .db import db, c

class Task(db.Model):
    __tablename__ = "tasks"

    id = c(db.Integer, primary_key = True)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = c(db.Integer, db.ForeignKey('groups.id'), nullable=True)
    name = c(db.String(50), nullable=False)
    description = c(db.String(255), nullable=True)
    deadline = c(db.Date, nullable=True)
    frequency = c(db.String(255), nullable=False)
    status = c(db.String(50), nullable=False)
