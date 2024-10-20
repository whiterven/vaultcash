from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Transaction
from ..extensions import db
from werkzeug.exceptions import Forbidden, NotFound

class AdminController:
    @staticmethod
    @jwt_required()
    def get_all_users():
        current_user = User.query.get(get_jwt_identity())
        if not current_user.is_admin:
            return jsonify({"error": "Admin access required"}), 403

        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        users = User.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            "users": [user.to_dict() for user in users.items],
            "total": users.total,
            "pages": users.pages,
            "current_page": users.page
        }), 200

    @staticmethod
    @jwt_required()
    def get_user_transactions(user_id):
        current_user = User.query.get(get_jwt_identity())
        if not current_user.is_admin:
            return jsonify({"error": "Admin access required"}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        transactions = Transaction.query.filter_by(user_id=user_id).paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            "transactions": [t.to_dict() for t in transactions.items],
            "total": transactions.total,
            "pages": transactions.pages,
            "current_page": transactions.page
        }), 200

    @staticmethod
    @jwt_required()
    def deactivate_user(user_id):
        current_user = User.query.get(get_jwt_identity())
        if not current_user.is_admin:
            return jsonify({"error": "Admin access required"}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        user.is_active = False
        db.session.commit()
        return jsonify({"message": "User deactivated successfully"}), 200

    @staticmethod
    @jwt_required()
    def activate_user(user_id):
        current_user = User.query.get(get_jwt_identity())
        if not current_user.is_admin:
            return jsonify({"error": "Admin access required"}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        user.is_active = True
        db.session.commit()
        return jsonify({"message": "User activated successfully"}), 200