from .db import db, c

class Task_Category(db.Model):
    __tablename__ = "task_categories"

    id = c(db.Integer, primary_key = True)
    task_id = c(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = c(db.Integer, db.ForeignKey('user.id'), nullable=False)
