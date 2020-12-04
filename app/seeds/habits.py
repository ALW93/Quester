from app.models import db, Habit, Check, habit_categories, time


def seed_habits():
    habitObjects = [
      Habit(user_id=1, name="Morning Yoga", frequency="Daily", created_at=time),
      Habit(user_id=1, name="Call Mom", frequency="Weekly", created_at=time),
      Habit(user_id=2, name="Snack Tantrum", frequency="Daily", created_at=time),
      Habit(user_id=3, name="Morning Bike Ride", frequency="Bi-Weekly", created_at=time),
      Habit(user_id=3, name="Daily Kotlin Coding", frequency="Daily", created_at=time),
    ]

    # h1 = habit_categories(habit_id=1, category_id=1),
    # h2 = habit_category.insert().values(habit_id=1, category_id=3),
    # h3 = habit_category.insert().values(habit_id=2, category_id=3),
    # h4 = habit_category.insert().values(habit_id=3, category_id=5),
    # h5 = habit_category.insert().values(habit_id=4, category_id=6),
    # h6 = habit_category.insert().values(habit_id=5, category_id=7),

    checkObjects = [
      Check(date=time, user_id=1, habit_id=1),
      Check(date=time, user_id=2, habit_id=3),
      Check(date=time, user_id=3, habit_id=4),
    ]

    db.session.bulk_save_objects(habitObjects)
    db.session.bulk_save_objects(checkObjects)
    # db.session.add(h1)
    # db.session.execute(h2)
    # db.session.execute(h3)
    # db.session.execute(h4)
    # db.session.execute(h5)
    # db.session.execute(h6)
    db.session.commit()


def undo_habits():
    db.session.execute('TRUNCATE habits;')
    db.session.commit()
