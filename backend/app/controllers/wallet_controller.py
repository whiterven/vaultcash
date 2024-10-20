from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.wallet_service import WalletService
from werkzeug.exceptions import BadRequest

class WalletController:
    @staticmethod
    @jwt_required()
    def create_wallet():
        current_user = get_jwt_identity()
        try:
            wallet = WalletService.create_wallet(current_user)
            return jsonify({"message": "Wallet created successfully", "wallet": wallet.to_dict()}), 201
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    @jwt_required()
    def get_balance():
        current_user = get_jwt_identity()
        try:
            balance = WalletService.get_balance(current_user)
            return jsonify({"balance": float(balance)}), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    @jwt_required()
    def transfer():
        current_user = get_jwt_identity()
        data = request.get_json()
        try:
            from_transaction, to_transaction = WalletService.transfer(
                current_user, data['to_user_id'], data['amount']
            )
            return jsonify({
                "message": "Transfer successful",
                "from_transaction": from_transaction.to_dict(),
                "to_transaction": to_transaction.to_dict()
            }), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    @jwt_required()
    def get_transactions():
        current_user = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        try:
            transactions = WalletService.get_transactions(current_user, page, per_page)
            return jsonify({
                "transactions": [t.to_dict() for t in transactions.items],
                "total": transactions.total,
                "pages": transactions.pages,
                "current_page": transactions.page
            }), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400