from datetime import date
from .db import db
from .user import User, friends, messages
from .avatar import Avatar
from .stat import Stat
from .category import Category
from .habit import Habit, Habit_Category
from .check import Check
from .task import Task, Task_Category

time = date.today()
