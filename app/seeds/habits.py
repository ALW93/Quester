from app.models import db, Habit, Check, Habit_Category
from datetime import datetime, timedelta, date

dt = datetime.strptime(str(date.today()), '%Y-%m-%d')
tomorrow = dt + timedelta(days=1)


def seed_habits():
    habitObjects = [
      Habit(user_id=1, name="Morning Yoga", created_at=dt),
      Habit(user_id=1, name="Call Mom", created_at=dt),
      Habit(user_id=2, name="Snack Tantrum", created_at=dt),
      Habit(user_id=3, name="Morning Bike Ride", created_at=dt),
      Habit(user_id=3, name="Daily Kotlin Coding", created_at=dt),
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
      Check(date=dt, user_id=1, habit_id=1),
      Check(date=tomorrow, user_id=1, habit_id=1),
      Check(date=dt, user_id=2, habit_id=3),
      Check(date=dt, user_id=3, habit_id=4),
    ]

    db.session.bulk_save_objects(habitObjects)
    db.session.bulk_save_objects(checkObjects)
    db.session.bulk_save_objects(habit_categoriesObjects)
    db.session.commit()


def undo_habits():
    db.session.execute('TRUNCATE habits;')
    db.session.commit()
