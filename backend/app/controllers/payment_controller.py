from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.payment_service import PaymentService
from werkzeug.exceptions import BadRequest

class PaymentController:
    @staticmethod
    @jwt_required()
    def create_payment_intent():
        data = request.get_json()
        try:
            intent = PaymentService.create_payment_intent(data['amount'], data.get('currency', 'usd'))
            return jsonify({"client_secret": intent.client_secret}), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    @jwt_required()
    def confirm_payment():
        data = request.get_json()
        try:
            result = PaymentService.confirm_payment(data['payment_intent_id'])
            return jsonify({"success": result}), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    @jwt_required()
    def process_deposit():
        current_user = get_jwt_identity()
        data = request.get_json()
        try:
            transaction = PaymentService.process_deposit(current_user, data['amount'], data.get('currency', 'usd'))
            return jsonify({"message": "Deposit processed successfully", "transaction": transaction.to_dict()}), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    @jwt_required()
    def process_withdrawal():
        current_user = get_jwt_identity()
        data = request.get_json()
        try:
            transaction = PaymentService.process_withdrawal(current_user, data['amount'], data.get('currency', 'usd'))
            return jsonify({"message": "Withdrawal processed successfully", "transaction": transaction.to_dict()}), 200
        except BadRequest as e:
            return jsonify({"error": str(e)}), 400