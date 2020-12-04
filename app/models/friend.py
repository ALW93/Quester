from .db import db, c


friends = db.Table('friends',
                   c('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),  # noqa
                   c('friend_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)  # noqa
                   )
