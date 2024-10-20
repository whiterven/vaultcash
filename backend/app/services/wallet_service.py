from ..models import Wallet, Transaction
from ..extensions import db
from werkzeug.exceptions import BadRequest

class WalletService:
    @staticmethod
    def create_wallet(user_id, currency='USD'):
        existing_wallet = Wallet.query.filter_by(user_id=user_id).first()
        if existing_wallet:
            raise BadRequest('User already has a wallet')

        wallet = Wallet(user_id=user_id, currency=currency)
        db.session.add(wallet)
        db.session.commit()
        return wallet

    @staticmethod
    def get_wallet(user_id):
        wallet = Wallet.query.filter_by(user_id=user_id).first()
        if not wallet:
            raise BadRequest('Wallet not found')
        return wallet

    @staticmethod
    def get_balance(user_id):
        wallet = WalletService.get_wallet(user_id)
        return wallet.balance

    @staticmethod
    def transfer(from_user_id, to_user_id, amount):
        from_wallet = WalletService.get_wallet(from_user_id)
        to_wallet = WalletService.get_wallet(to_user_id)

        if from_wallet.balance < amount:
            raise BadRequest('Insufficient funds')

        from_wallet.withdraw(amount)
        to_wallet.deposit(amount)

        from_transaction = Transaction(
            user_id=from_user_id,
            wallet_id=from_wallet.id,
            amount=amount,
            transaction_type='transfer',
            status='completed',
            description=f'Transfer to user {to_user_id}'
        )

        to_transaction = Transaction(
            user_id=to_user_id,
            wallet_id=to_wallet.id,
            amount=amount,
            transaction_type='transfer',
            status='completed',
            description=f'Transfer from user {from_user_id}'
        )

        db.session.add(from_transaction)
        db.session.add(to_transaction)
        db.session.commit()

        return from_transaction, to_transaction

    @staticmethod
    def get_transactions(user_id, page=1, per_page=20):
        wallet = WalletService.get_wallet(user_id)
        transactions = Transaction.query.filter_by(wallet_id=wallet.id)\
            .order_by(Transaction.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        return transactions