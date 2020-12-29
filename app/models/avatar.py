from .db import db, c


class Avatar(db.Model):
    __tablename__ = "avatars"

    id = c(db.Integer, primary_key=True)
    user_id = c(db.Integer, db.ForeignKey('users.id'), nullable=False)
    prebuilt = c(db.String(50), nullable=False)
    hair = c(db.String(50), nullable=True)
    face = c(db.String(50), nullable=True)
    body = c(db.String(50), nullable=True)
    helmet = c(db.String(50), nullable=True)
    top = c(db.String(50), nullable=True)
    bottom = c(db.String(50), nullable=True)

    def to_dict(self):
        return {
            "prebuilt": self.prebuilt,
            "hair": self.hair,
            "face": self.face,
            "body": self.body,
        }
