from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta

def generate_tokens(user_id):
    access_token = create_access_token(identity=user_id)
    refresh_token = create_refresh_token(identity=user_id)
    return access_token, refresh_token

def generate_access_token(user_id):
    return create_access_token(identity=user_id)

def generate_refresh_token(user_id):
    return create_refresh_token(identity=user_id)

def set_jwt_settings(jwt):
    jwt.access_token_expires = timedelta(minutes=15)
    jwt.refresh_token_expires = timedelta(days=30)