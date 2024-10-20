from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
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
                first_name=data['first_name'],
                last_name=data['last_name'],
                phone_number=data['phone_number']
            )
            return jsonify({"message": "User registered successfully", "user": user.to_dict()}), 201
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    def login():
        data = request.get_json()
        try:
            result = AuthService.login_user(data['username'], data['password'])
            return jsonify(result), 200
        except Unauthorized as e:
            return jsonify({"error": str(e)}), 401

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