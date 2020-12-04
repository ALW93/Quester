from .db import db, c
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = c(db.Integer, primary_key = True)
  username = c(db.String(40), nullable = False, unique = True)
  email = c(db.String(255), nullable = False, unique = True)
  hashed_password = c(db.String(255), nullable = False)
  currency = c(db.Integer, nullable = False)
  exp = c(db.Integer, nullable = False)
  hair = c(db.String(50), nullable = False)
  face = c(db.String(50), nullable = False)
  body = c(db.String(50), nullable = False)
  helmet = c(db.String(50), nullable = True)
  top = c(db.String(50), nullable = True)
  bottom = c(db.String(50), nullable = True)
  stats = db.relationship('Stat', backref="user", lazy=True)
  categories = db.relationship('Category', backref="user", lazy=True)
  checks = db.relationship('Check', backref="user", lazy=True)
  groups = db.relationship('Group', backref="user", lazy=True)
  habits = db.relationship('Habit', backref="user", lazy=True)
  tasks = db.relationship('Task', backref="user", lazy=True)
  friends = db.relationship('Friend', secondary="friends", lazy='subquery', backref=db.backref("user", lazy=True))

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
