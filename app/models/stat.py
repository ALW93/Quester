from .db import db, c


class Stat(db.Model):
    __tablename__ = "stats"

    id = c(db.Integer, primary_key=True)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = c(db.String(50), nullable=False)
    custom = c(db.Boolean, nullable=False)
    color = c(db.String(50), nullable=False)
    points = c(db.Integer, nullable=False)

    categories = db.relationship('Category', backref="stat", lazy=True)

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "custom": self.custom,
          "color": self.color,
          "points": self.points,
        }
