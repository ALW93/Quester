from .db import db, c

task_categories = db.Table('task_categories',
                           c('task_id', db.Integer, db.ForeignKey('tasks.id'), primary_key=True),
                           c('cateory_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
                          )
