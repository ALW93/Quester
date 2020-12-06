from .db import db, c


class Task(db.Model):
    __tablename__ = "tasks"

    id = c(db.Integer, primary_key=True)
    created_at = c(db.Date, nullable=False)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = c(db.String(50), nullable=False)
    difficult = c(db.Integer, nullable=False)
    deadline = c(db.DateTime, nullable=True)
    frequency = c(db.String(255), nullable=False)
    status = c(db.String(50), nullable=False)

    categories = db.relationship('Task_Category', backref="task", lazy=True)


class Task_Category(db.Model):
    __tablename__ = "task_categories"
    id = c(db.Integer, primary_key=True)
    task_id = c(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    category_id = c(db.Integer, db.ForeignKey('categories.id'), nullable=False)
