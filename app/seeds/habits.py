from app.models import db, Habit, Check, Habit_Category, time


def seed_habits():
    habitObjects = [
      Habit(user_id=1, name="Morning Yoga", frequency="Daily", created_at=time),
      Habit(user_id=1, name="Call Mom", frequency="Weekly", created_at=time),
      Habit(user_id=2, name="Snack Tantrum", frequency="Daily", created_at=time),
      Habit(user_id=3, name="Morning Bike Ride", frequency="Bi-Weekly", created_at=time),
      Habit(user_id=3, name="Daily Kotlin Coding", frequency="Daily", created_at=time),
    ]

    habit_categoriesObjects = [
      Habit_Category(habit_id=1, category_id=1),
      Habit_Category(habit_id=1, category_id=3),
      Habit_Category(habit_id=2, category_id=3),
      Habit_Category(habit_id=3, category_id=5),
      Habit_Category(habit_id=4, category_id=6),
      Habit_Category(habit_id=5, category_id=7),
    ]

    checkObjects = [
      Check(date=time, user_id=1, habit_id=1),
      Check(date=time, user_id=2, habit_id=3),
      Check(date=time, user_id=3, habit_id=4),
    ]

    db.session.bulk_save_objects(habitObjects)
    db.session.bulk_save_objects(checkObjects)
    db.session.bulk_save_objects(habit_categoriesObjects)
    db.session.commit()


def undo_habits():
    db.session.execute('TRUNCATE habits;')
    db.session.commit()
