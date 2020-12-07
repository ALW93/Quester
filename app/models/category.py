from .db import db, c


class Category(db.Model):
    __tablename__ = "categories"

    id = c(db.Integer, primary_key=True)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stat_id = c(db.Integer, db.ForeignKey('stats.id'), nullable=True)
    name = c(db.String(50), nullable=False)

    tasks = db.relationship('Task_Category', backref="category", lazy=True)
    habits = db.relationship('Habit_Category', backref="category", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stat_id": self.stat_id,
            "name": self.name,
        }
