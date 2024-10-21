#auth_service.py

from ..models import User
from ..extensions import db
from werkzeug.exceptions import BadRequest, Unauthorized
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
import secrets
import datetime

class AuthService:
    @staticmethod
    def register_user(username, email, password, first_name, last_name, phone_number):
        if User.query.filter_by(username=username).first():
            raise BadRequest('Username already exists')
        if User.query.filter_by(email=email).first():
            raise BadRequest('Email already exists')

        new_user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number
        )
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        return new_user

    @staticmethod
    def login_user(username, password):
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            if not user.is_active:
                raise Unauthorized('Account is deactivated')
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            return {
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user': user.to_dict()
            }
        raise Unauthorized('Invalid username or password')

    @staticmethod
    def refresh_token(user_id):
        return create_access_token(identity=user_id)

    @staticmethod
    def change_password(user_id, old_password, new_password):
        user = User.query.get(user_id)
        if not user:
            raise BadRequest('User not found')
        if not user.check_password(old_password):
            raise Unauthorized('Invalid old password')
        user.set_password(new_password)
        db.session.commit()
        return True

    @staticmethod
    def reset_password_request(email):
        user = User.query.filter_by(email=email).first()
        if user:
            reset_token = secrets.token_urlsafe(32)
            user.reset_token = reset_token
            user.reset_token_expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            db.session.commit()
            # Here you would typically send an email with the reset token
        return True  # Always return True to prevent email enumeration

    @staticmethod
    def reset_password(reset_token, new_password):
        user = User.query.filter_by(reset_token=reset_token).first()
        if user and user.reset_token_expiration > datetime.datetime.utcnow():
            user.set_password(new_password)
            user.reset_token = None
            user.reset_token_expiration = None
            db.session.commit()
            return True
        raise BadRequest('Invalid or expired reset token')