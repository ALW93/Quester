from .db import db, c

class Friend(db.Model):
    __tablename__ = "friends"

    id = c(db.Integer, primary_key = True)
    user_id = c(db.Integer, db.ForeignKey('user.id'), nullable=False)
    friend_id = c(db.Integer, db.ForeignKey('user.id'), nullable=False)
