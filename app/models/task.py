from .db import db, c

class Task(db.Model):
    __tablename__ = "tasks"

    id = c(db.Integer, primary_key = True)
    created_at = c(db.Date, nullable=False)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = c(db.Integer, db.ForeignKey('groups.id'), nullable=True)
    name = c(db.String(50), nullable=False)
    description = c(db.String(255), nullable=True)
    deadline = c(db.Date, nullable=True)
    frequency = c(db.String(255), nullable=False)
    status = c(db.String(50), nullable=False)

task_categories = db.Table('task_categories',
                           c('task_id', db.Integer, db.ForeignKey('tasks.id'), primary_key=True),
                           c('cateory_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
                          )

class Task_Category(db.Model):
    __tablename__ = "task_categories"
