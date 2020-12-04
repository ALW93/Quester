from .db import db, c

class Stat(db.Model):
  __tablename__ = "stats"

  id = c(db.Integer, primary_key = True)
  user_id = c(db.Integer, db.ForeignKey('user.id', nullable=False))
  name = c(db.String(50), nullable = False)
  custom = c(db.Boolean, nullable = False)
  icon = c(db.String(50), nullable = False)
  points = c(db.String(50), nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "custom": self.custom,
      "icon": self.icon,
      "points": self.points,
    }
