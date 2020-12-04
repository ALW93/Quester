from app.models import db, Avatar, Stat, Category


# Adds a demo user, you can add other users here if you want
def seed_avatars():

    avatarObjects = [
        Avatar(user_id=1, name='spookychu', exp=100,
               hair="pink", face="type-1", body="type-1"),
        Avatar(user_id=2, name='sirBerber', exp=100,
               hair="brown", face="type-2", body="type-2"),
        Avatar(user_id=3, name='momatomimumu', exp=100,
               hair="black", face="type-3", body="type-3")]

    statObjects = [
        Stat(avatar_id=1, name="Strength", custom=False, icon="/str.png", points=10),
        Stat(avatar_id=1, name="Magic", custom=False, icon="/ap.png", points=20),
        Stat(avatar_id=1, name="Intelligence", custom=False, icon="/int.png", points=23),
        Stat(avatar_id=2, name="Strength", custom=False, icon="/str.png", points=30),
        Stat(avatar_id=2, name="Magic", custom=False, icon="/ap.png", points=50),
        Stat(avatar_id=2, name="Intelligence", custom=False, icon="/int.png", points=3),
        Stat(avatar_id=3, name="Strength", custom=False, icon="/str.png", points=30),
        Stat(avatar_id=3, name="Magic", custom=False, icon="/ap.png", points=15),
        Stat(avatar_id=3, name="Intelligence", custom=False, icon="/int.png", points=23)
    ]

    categoryObjects = [
        Category(user_id=1, stat_id=1, name="Workout"),
        Category(user_id=1, stat_id=2, name="Painting"),
        Category(user_id=1, stat_id=2, name="Socializing"),
        Category(user_id=1, stat_id=3, name="Coding"),
        Category(user_id=2, stat_id=4, name="Running"),
        Category(user_id=3, stat_id=7, name="Biking"),
        Category(user_id=3, stat_id=9, name="IOS")
     ]

    db.session.bulk_save_objects(avatarObjects)
    db.session.bulk_save_objects(statObjects)
    db.session.bulk_save_objects(categoryObjects)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_avatars():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
