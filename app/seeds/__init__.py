from flask.cli import AppGroup
from .users import seed_users, undo_users
from .avatars import seed_avatars, undo_avatars
from .habits import seed_habits, undo_habits

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_avatars()
    seed_habits()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_avatars()
    undo_users()
    undo_habits()
    # Add other undo functions here
