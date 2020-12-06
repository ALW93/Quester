from werkzeug.security import generate_password_hash
from app.models import db, User, time

# Adds a demo user, you can add other users here if you want
def seed_users():

    userObjects = [
        User(username='Admin', email='admin@aa.io',
             password='password', currency=1000, exp=100, health=100, created_at=time),
        User(username='Berber', email='berber@catmail.com',
             password='password', currency=1000, exp=100, health=80, created_at=time),
        User(username='Wahlu', email='wahlu@canada.net',
             password='password', currency=1000, exp=100, health=95, created_at=time)]

    db.session.bulk_save_objects(userObjects)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
