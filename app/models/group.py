from .db import db, c

class Group(db.Model):
    __tablename__ = "groups"

    id = c(db.Integer, primary_key = True)
    user_id = c(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = c(db.String(50), nullable = False, unique=True)
    tasks = db.relationship('Task', backref="group", lazy="joined")
