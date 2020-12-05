from app.models import db, friends, messages, time


def seed_social():
    f1 = friends.insert().values(friend_a_id=1, friend_b_id=2)
    f2 = friends.insert().values(friend_a_id=1, friend_b_id=3)
    m1 = messages.insert().values(created_at=time, type="potion",
                                  message="keep going!", receiver_id=1,
                                  sender_id=2)
    m2 = messages.insert().values(created_at=time, type="mail",
                                  message="gl with biking!", receiver_id=3,
                                  sender_id=1)

    db.session.execute(f1)
    db.session.execute(f2)
    db.session.execute(m1)
    db.session.execute(m2)
    db.session.commit()


def undo_social():
    db.session.execute('TRUNCATE socials;')
    db.session.commit()
