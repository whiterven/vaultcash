from flask import Blueprint
from ..controllers.payment_controller import PaymentController

bp = Blueprint('payment', __name__, url_prefix='/api/payment')

bp.route('/create-payment-intent', methods=['POST'])(PaymentController.create_payment_intent)
bp.route('/confirm-payment', methods=['POST'])(PaymentController.confirm_payment)
bp.route('/deposit', methods=['POST'])(PaymentController.process_deposit)
bp.route('/withdraw', methods=['POST'])(PaymentController.process_withdrawal)