from app.models import db, Task, Group, Task_Category, time

def seed_tasks():
    groupObjects = [
      Group(user_id=1, name="Sunday Afternoon"),
      Group(user_id=2, name="Acquire Snacks"),
      Group(user_id=3, name="Canadian Activities")
    ]

    taskObjects = [
      Task(user_id=1, group_id=1, name="Make Tea",
           description="Chamomile in the upper cupboard",
           deadline=time, frequency="Once", status="pending"),
      Task(user_id=1, name="Run 5 Miles", frequency="Daily", status="complete"),
      Task(user_id=2, name="Pander for Snack", description="Grandma gives the most snacks!",
           frequency="Daily", status="pending"),
      Task(user_id=3, name="Bike 15 Miles", frequency="Weekly", status="expired"),
    ]

    task_categoriesObjects = [
      Task_Category(task_id=2, category_id=1),
      Task_Category(task_id=3, category_id=5),
      Task_Category(task_id=4, category_id=6)
    ]

    db.session.bulk_save_objects(groupObjects)
    db.session.bulk_save_objects(taskObjects)
    db.session.bulk_save_objects(task_categoriesObjects)
    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks;')
    db.session.commit()
