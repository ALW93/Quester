from .db import db, c
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Friend(db.Model):
    __tablename__ = "friends"
    friend_a_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    friend_b_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    created_at = c(db.Date, nullable=False)


class Message(db.Model):
    __tablename__ = "messages"
    id = c(db.Integer, primary_key=True)
    created_at = c(db.Date, nullable=False)
    type = c(db.String(50), nullable=False)
    message = c(db.String(255), nullable=False)
    receiver_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    sender_id = c(db.Integer, db.ForeignKey('users.id'), primary_key=True)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = c(db.Integer, primary_key=True)
    created_at = c(db.Date, nullable=False)
    username = c(db.String(40), nullable=False, unique=True)
    email = c(db.String(255), nullable=False, unique=True)
    hashed_password = c(db.String(255), nullable=False)
    currency = c(db.Integer, nullable=False)
    categories = db.relationship('Category', backref="user", lazy=True)
    checks = db.relationship('Check', backref="user", lazy=True)
    groups = db.relationship('Group', backref="user", lazy=True)
    habits = db.relationship('Habit', backref="user", lazy=True)
    tasks = db.relationship('Task', backref="user", lazy=True)

    friend_to = db.relationship('Friend', backref='to', foreign_keys=[Friend.friend_a_id],  primaryjoin=id == Friend.friend_a_id)
    friend_from = db.relationship('Friend', backref='from', foreign_keys=[Friend.friend_b_id], primaryjoin=id == Friend.friend_b_id )

    message_to = db.relationship('Message', backref='to', foreign_keys=[Message.receiver_id], primaryjoin=id == Message.receiver_id)
    message_from = db.relationship('Message', backref='from', foreign_keys=[Message.sender_id], primaryjoin=id == Message.sender_id )

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
