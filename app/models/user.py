from .db import db, c
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# class Friend(db.Model):
#     __tablename__ = "friends"
#     friend_a_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     friend_b_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)

# class Message(db.Model):
#     __tablename__ = "messages"
#     id = c(db.Integer, primary_key=True)
#     created_at = c(db.Date, nullable=False)
#     type = c(db.String(50), nullable=False)
#     message = c(db.String(255), nullable=False)
#     receiver_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     sender_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)

messages = db.Table('messages', c("id", db.Integer, primary_key=True),
                    c("created_at", db.Date, nullable=False),
                    c("type", db.String(50), nullable=False),
                    c("message", db.String(255), nullable=False),
                    c("receiver_id", db.Integer, db.ForeignKey("users.id")),
                    c("sender_id", db.Integer, db.ForeignKey("users.id")))

friends = db.Table('friends', c("id", db.Integer, primary_key=True),
                   c("friend_a_id", db.Integer, db.ForeignKey("users.id")),
                   c("friend_b_id", db.Integer, db.ForeignKey("users.id")))

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = c(db.Integer, primary_key=True)
    created_at = c(db.Date, nullable=False)
    username = c(db.String(40), nullable=False, unique=True)
    email = c(db.String(255), nullable=False, unique=True)
    hashed_password = c(db.String(255), nullable=False)
    currency = c(db.Integer, nullable=False)

    categories = db.relationship('Category', backref="user", lazy=True)
    groups = db.relationship('Group', backref="user", lazy=True)
    tasks = db.relationship('Task', backref="user", lazy=True)
    habits = db.relationship('Habit', backref="user", lazy=True)
    checks = db.relationship('Check', backref="user", lazy=True)

    friends = db.relationship('User', secondary=friends, primaryjoin=id == friends.c.friend_a_id, secondaryjoin=id == friends.c.friend_b_id, backref=backref('friends'))
    messages = db.relationship('User', secondary=messages, primaryjoin=id == messages.c.receiver_id, secondaryjoin=id == messages.c.sender_id, backref=backref('messages'))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "username": self.username,
          "email": self.email,
          "currency": self.currency,
          "exp": self.exp,
          "base": {
            "hair": self.hair,
            "face": self.face,
            "body": self.body,
          },
          "equip": {
            "helmet": self.helmet,
            "top": self.top,
            "bottom": self.bottom
          }
        }
