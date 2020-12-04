"""empty message

Revision ID: 258d1c0daf27
Revises: bff300ed8bc8
Create Date: 2020-12-04 02:24:02.585894

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '258d1c0daf27'
down_revision = 'bff300ed8bc8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friends',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('friend_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'friend_id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('message', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
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
    op.drop_table('messages')
    op.drop_table('friends')
    # ### end Alembic commands ###