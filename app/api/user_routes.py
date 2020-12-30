from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Avatar, Task, Category, Task_Category, Habit, Stat, Habit_Category, friends, messages
from datetime import date

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/avatar')
@login_required
def avatar(id):
    """
    Loads User's Avatar
    """
    avatar = Avatar.query.filter(Avatar.user_id == id).first()
    if avatar:
        return avatar.to_dict()
    else:
        return {}


@user_routes.route('/<int:id>/avatar', methods=['POST'])
@login_required
def create_avatar(id):
    """
    Create User Avatar
    """
    data = request.json
    if data:
        new_avatar = Avatar(
            user_id=id,
            prebuilt=data["prebuilt"]
            # hair=data["hair"],
            # face=data["face"],
            # body=data["body"]
        )
        db.session.add(new_avatar)
        db.session.commit()
        return new_avatar.to_dict()


@user_routes.route('/<int:id>/categories')
@login_required
def get_categories(id):
    """
    Load all Categories for a User
    """
    cats = Category.query.filter(Category.user_id == id).all()
    cats_dicts = [cat.to_dict() for cat in cats]
    cats_json = jsonify({'cats': cats_dicts})
    return cats_json


@user_routes.route('/<int:id>/tasks', methods=['POST'])
@login_required
def create_task(id):
    """
    Post a New Task
    """
    data = request.json
    created = date.today()
    if data:
        new_task = Task(
            user_id=id,
            created_at=created,
            name=data["name"],
            difficulty=data["difficulty"],
            deadline=data["deadline"],
            frequency=data["frequency"],
            status=data["status"],
        )

        db.session.add(new_task)
        db.session.commit()

        latest = Task.query.filter(Task.user_id == id).order_by(Task.id.desc()).first()

        if data["categories"]:
            for cat in data["categories"]:
                new_cat = Task_Category(
                    task_id=latest.id,
                    category_id=cat
                )
                db.session.add(new_cat)
                db.session.commit()
        return new_task.to_dict()


@user_routes.route('/<int:id>/tasks')
@login_required
def get_tasks(id):
    """
    Load all Tasks for a User
    """
    tasks = Task.query.filter(Task.user_id == id).filter(Task.status == "pending").all()
    task_dicts = [task.to_dict() for task in tasks]
    task_json = jsonify({'tasks': task_dicts})
    return task_json


@user_routes.route('/<int:id>/tasks/expired')
@login_required
def get_expired(id):
    """
    Load all Expired Tasks for a User
    """
    tasks = Task.query.filter(Task.user_id == id).filter(Task.status == "expired").all()
    task_dicts = [task.to_dict() for task in tasks]
    task_json = jsonify({'tasks': task_dicts})
    return task_json


@user_routes.route('/<int:id>/tasks/complete')
@login_required
def get_complete(id):
    """
    Load all Expired Tasks for a User
    """
    tasks = Task.query.filter(Task.user_id == id).filter(Task.status == "complete").all()
    task_dicts = [task.to_dict() for task in tasks]
    task_json = jsonify({'tasks': task_dicts})
    return task_json


@user_routes.route('/<int:id>/habits')
@login_required
def get_habits(id):
    """Load all Habits for a User"""
    habits = Habit.query.filter(Habit.user_id == id).all()
    habit_dicts = [habit.to_dict() for habit in habits]
    habit_json = jsonify({'habits': habit_dicts})
    return habit_json


@user_routes.route('/<int:id>/habits', methods=['POST'])
@login_required
def create_habit(id):
    """ POST a new Habit """
    data = request.json
    created = date.today()
    if data:
        new_habit = Habit(
            user_id=id,
            created_at=created,
            name=data["name"],
        )
        db.session.add(new_habit)
        db.session.commit()

        latest = Habit.query.filter(Habit.user_id == id).order_by(Habit.id.desc()).first()

        if data['category']:
            new_cat = Habit_Category(
                    habit_id=latest.id,
                    category_id=data['category']
                )
            db.session.add(new_cat)
            db.session.commit()
        return new_habit.to_dict()


@user_routes.route('/<int:id>/stats')
@login_required
def get_stats(id):
    """Load all Stats for a User"""
    stats = Stat.query.filter(Stat.user_id == id).all()
    stat_dicts = [stat.to_dict() for stat in stats]
    stat_json = jsonify({"stats": stat_dicts})
    return stat_json


@user_routes.route('/<int:id>/stats', methods=["POST"])
def create_stats(id):
    """Post Base Stats for User"""
    stats = ["Strength", "Magic", "Intelligence"]
    for stat in stats:
        info = Stat(user_id=id, name=stat, custom=false, color="red", points=0)
        db.session.add(info)
        db.session.commit()
    return {"message": "stats successfully created"}


@user_routes.route('/<int:id>/categories', methods=["POST"])
@login_required
def new_category(id):
    """POST a new Category for a User"""
    data = request.json
    if data:
        new_cat = Category(
            user_id=id,
            name=data["name"],
            stat_id=data["stat_id"]
        )
        db.session.add(new_cat)
        db.session.commit()
        return new_cat.to_dict()


@user_routes.route('/<int:id>/categories/<int:catId>', methods=["DELETE"])
@login_required
def delete_category(id, catId):
    """DELETE a new Category for a User"""
    delete_cat = Category.query.get(catId)
    if delete_cat:
        db.session.delete(delete_cat)
        db.session.commit()
    return delete_cat.to_dict()


@user_routes.route('/<int:id>/friends')
@login_required
def get_friends(id):
    """Returns List of User's Friends"""
    user_friends = db.session.query(friends).filter((friends.c.friend_a_id == id) | (friends.c.friend_b_id == id)).all()
    friendlist = []

    for friend in user_friends:
        if friend[2] == id:
            friendlist.append(User.query.get(friend[1]).to_dict())
        if friend[1] == id:
            friendlist.append(User.query.get(friend[2]).to_dict())
    friend_json = jsonify({'friends': friendlist})
    return friend_json


@user_routes.route('/<int:id>/messages')
@login_required
def get_messages(id):
    """Returns List of User's Messages"""
    user_msg = db.session.query(messages).filter(messages.c.receiver_id == id).all()
    msg_dict = [{"id": msg[0], "received": msg[1], "type": msg[2], "message": msg[3], "status": msg[4], "sender": User.query.get(msg[6]).short_dict()} for msg in user_msg]
    msg_json = jsonify({"messages": msg_dict})
    return msg_json


@user_routes.route('/messages/<int:id>')
@login_required
def read_message(id):
    """Update Message Status to Read"""
    update = db.update(messages).values(status="read").where(messages.c.id==id)
    db.engine.execute(update)
    user_msg = db.session.query(messages).filter(messages.c.receiver_id == id).all()
    msg_dict = [{"id": msg[0], "received": msg[1], "type": msg[2], "message": msg[3], "status": msg[4], "sender": User.query.get(msg[6]).short_dict()} for msg in user_msg]
    msg_json = jsonify({"messages": msg_dict})
    return msg_json


@user_routes.route('/<int:id>/messages', methods=["POST"])
@login_required
def send_message(id):
    """Send a Message"""
    data = request.json
    created = date.today()
    user = User.query.get(id)
    recipient = User.query.get(data['receiver_id'])

    if data and user:
        newMail = messages.insert().values(created_at=created, type=data['type'], message=data['message'], status="unread", receiver_id=data['receiver_id'], sender_id=id)
        db.session.execute(newMail)
        db.session.commit()
        if data['type'] == 'potion':
            user.currency -= 100
            if (recipient.health + 25) >= 100:
                recipient.health = 100
            else:
                recipient.health += 25
            db.session.commit()

    return "success"
