from werkzeug.security import generate_password_hash
from app.models import db, Avatar


# Adds a demo user, you can add other users here if you want
def seed_avatars():

    avatarObjects = [
        Avatar(user_id=1, name='spookychu', exp=100,
               hair="pink", face="type-1", body="type-1"),
        Avatar(user_id=2, name='sirBerber', exp=100,
               hair="brown", face="type-2", body="type-2"),
        Avatar(user_id=3, name='momatomimumu', exp=100,
               hair="black", face="type-3", body="type-3")]

    db.session.bulk_save_objects(avatarObjects)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_avatars():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
