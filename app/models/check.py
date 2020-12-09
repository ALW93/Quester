from .db import db, c


class Check(db.Model):
    __tablename__ = "check"

    id = c(db.Integer, primary_key=True)
    date = c(db.DateTime, nullable=False)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    habit_id = c(db.Integer, db.ForeignKey('habits.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
        }
