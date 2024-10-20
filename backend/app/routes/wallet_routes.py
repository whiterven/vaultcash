from flask import Blueprint
from ..controllers.wallet_controller import WalletController

bp = Blueprint('wallet', __name__, url_prefix='/api/wallet')

bp.route('/create', methods=['POST'])(WalletController.create_wallet)
bp.route('/balance', methods=['GET'])(WalletController.get_balance)
bp.route('/transfer', methods=['POST'])(WalletController.transfer)
bp.route('/transactions', methods=['GET'])(WalletController.get_transactions)