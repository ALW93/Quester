from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email is already registered.")


def unique_name(form, field):
    print("Checking if unique username", field.data)
    name = field.data
    username = User.query.filter(User.username == name).first()
    if username:
        raise ValidationError("Username already taken.")


def check_pass(form, field):
    print("Checking Password", field.data)
    password = field.data
    if len(password) < 6:
        raise ValidationError("Password must be greater than 6 characters long.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), unique_name])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), check_pass])
