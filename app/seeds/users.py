from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    userObjects = [
        User(username='Admin', email='admin@aa.io',
             password='password', currency=1000, exp=100,
             hair="pink", face="type-1", body="type-1"),
        User(username='Berber', email='berber@catmail.com',
             password='password', currency=1000, exp=100,
             hair="brown", face="type-2", body="type-2"),
        User(username='Wahlu', email='wahlu@canada.net',
             password='password', currency=1000, exp=100,
             hair="black", face="type-3", body="type-3")]

    db.session.bulk_save_objects(userObjects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
