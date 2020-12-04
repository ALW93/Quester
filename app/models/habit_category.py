from .db import db, c

habit_categories = db.Table('habit_categories',
                           c('habit_id', db.Integer, db.ForeignKey('tasks.id'), primary_key=True),
                           c('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
                           )
