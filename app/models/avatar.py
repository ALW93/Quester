from .db import db, c


class Avatar(db.Model):
    __tablename__ = "avatars"

    id = c(db.Integer, primary_key=True)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = c(db.String(50), nullable=False)
    exp = c(db.Integer, nullable=False)
    hair = c(db.String(50), nullable=False)
    face = c(db.String(50), nullable=False)
    body = c(db.String(50), nullable=False)
    helmet = c(db.String(50), nullable=True)
    top = c(db.String(50), nullable=True)
    bottom = c(db.String(50), nullable=True)
    stats = db.relationship('Stat', backref="user", lazy=True)

    def to_dict():
        return {
            pass
        }
