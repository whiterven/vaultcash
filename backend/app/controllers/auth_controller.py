#auth_controller.py
import logging
from flask import request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from ..services.auth_service import AuthService
from werkzeug.exceptions import BadRequest, Unauthorized

class AuthController:
    @staticmethod
    def register():
        data = request.get_json()
        try:
            user = AuthService.register_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                phone_number=data.get('phone_number')
            )
            return jsonify({"message": "User registered successfully", "user": user.to_dict()}), 201
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    def login():
        data = request.get_json()
        try:
            logging.info(f"Login attempt for user: {data.get('username')}")
            result = AuthService.login_user(data['username'], data['password'])
            logging.info(f"Successful login for user: {data.get('username')}")
            return jsonify(result), 200
        except Unauthorized as e:
            logging.warning(f"Failed login attempt for user: {data.get('username')} - {str(e)}")
            return jsonify({"error": str(e)}), 401
        except Exception as e:
            logging.error(f"Unexpected error during login: {str(e)}")
            return jsonify({"error": "An unexpected error occurred"}), 500
            
    @staticmethod
    @jwt_required(refresh=True)
    def refresh():
        current_user = get_jwt_identity()
        new_token = AuthService.refresh_token(current_user)
        return jsonify(access_token=new_token), 200

    @staticmethod
    @jwt_required()
    def change_password():
        current_user = get_jwt_identity()
        data = request.get_json()
        try:
            AuthService.change_password(current_user, data['old_password'], data['new_password'])
            return jsonify({"message": "Password changed successfully"}), 200
        except (BadRequest, Unauthorized) as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    def request_password_reset():
        data = request.get_json()
        AuthService.reset_password_request(data['email'])
        return jsonify({"message": "If the email exists, a reset link will be sent"}), 200

    @staticmethod
    def reset_password():
        data = request.get_json()
        try:
            AuthService.reset_password(data['reset_token'], data['new_password'])
            return jsonify({"message": "Password reset successfully"}), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400