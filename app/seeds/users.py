from werkzeug.security import generate_password_hash
from app.models import db, User, Category


# Adds a demo user, you can add other users here if you want
def seed_users():

    userObjects = [
        User(username='Admin', email='admin@aa.io',
             password='password', currency=1000),
        User(username='Berber', email='berber@catmail.com',
             password='password', currency=1000),
        User(username='Wahlu', email='wahlu@canada.net',
             password='password', currency=1000)]

     categoryObjects = [
        Category(user_id=1, stat_id=1, name="Workout"),
        Category(user_id=1, stat_id=2, name="Painting"),
        Category(user_id=1, stat_id=2, name="Socializing"),
        Category(user_id=1, stat_id=3, name="Coding"),
        Category(user_id=2, stat_id=4, name="Running"),
        Category(user_id=3, stat_id=7, name="Biking"),
        Category(user_id=3, stat_id=9, name="IOS")
     ]

    db.session.bulk_save_objects(userObjects)
    db.session.bulk_save_objects(categoryObjects)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
