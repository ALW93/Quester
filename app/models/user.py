from .db import db, c
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

friendship = db.Table(
                      'friendships',
                      db.Column('friend_a_id', db.Integer,
                                db.ForeignKey('users.id'),
                                primary_key=True),
                      db.Column('friend_b_id', db.Integer,
                                ForeignKey('users.id'),
                                primary_key=True)
                      )

class Message(db.Model):
  __tablename__ = "messages"

  id = c(db.Integer, primary_key = True)
  user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
  sender_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
  type = c(db.String(50), nullable = False)
  message = c(db.String(255), nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "message": self.message
    }


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = c(db.Integer, primary_key=True)
    username = c(db.String(40), nullable=False, unique=True)
    email = c(db.String(255), nullable=False, unique=True)
    hashed_password = c(db.String(255), nullable=False)
    currency = c(db.Integer, nullable=False)
    categories = db.relationship('Category', backref="user", lazy=True)
    checks = db.relationship('Check', backref="user", lazy=True)
    groups = db.relationship('Group', backref="user", lazy=True)
    habits = db.relationship('Habit', backref="user", lazy=True)
    tasks = db.relationship('Task', backref="user", lazy=True)
    messages = db.relationship('Message', backref="user", lazy=True)
    friends = db.relationship("User", secondary=friendship,
                           primaryjoin=id==friendship.c.friend_a_id,
                           secondaryjoin=id==friendship.c.friend_b_id)

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
