from .db import db, c

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
