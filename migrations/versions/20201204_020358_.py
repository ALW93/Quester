"""empty message

Revision ID: bff300ed8bc8
Revises: ffdc0a98111c
Create Date: 2020-12-04 02:03:58.726476

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bff300ed8bc8'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('body', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('bottom', sa.String(length=50), nullable=True))
    op.add_column('users', sa.Column('currency', sa.Integer(), nullable=False))
    op.add_column('users', sa.Column('exp', sa.Integer(), nullable=False))
    op.add_column('users', sa.Column('face', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('hair', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('helmet', sa.String(length=50), nullable=True))
    op.add_column('users', sa.Column('top', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'top')
    op.drop_column('users', 'helmet')
    op.drop_column('users', 'hair')
    op.drop_column('users', 'face')
    op.drop_column('users', 'exp')
    op.drop_column('users', 'currency')
    op.drop_column('users', 'bottom')
    op.drop_column('users', 'body')
    # ### end Alembic commands ###