import stripe
from flask import current_app
from ..models import Transaction, Wallet, User
from ..extensions import db
from werkzeug.exceptions import BadRequest
from datetime import datetime

stripe.api_key = None  # We'll set this in the PaymentService methods

class PaymentService:
    @staticmethod
    def create_payment_intent(amount, currency='usd'):
        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Stripe expects amounts in cents
                currency=currency,
            )
            return intent
        except stripe.error.StripeError as e:
            raise BadRequest(str(e))

    @staticmethod
    def confirm_payment(payment_intent_id, user_id):
        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']
        try:
            intent = stripe.PaymentIntent.confirm(payment_intent_id)
            if intent.status == 'succeeded':
                wallet = Wallet.query.filter_by(user_id=user_id).first()
                if not wallet:
                    raise BadRequest('Wallet not found')

                amount = intent.amount / 100  # Convert cents to dollars
                transaction = Transaction(
                    user_id=user_id,
                    wallet_id=wallet.id,
                    amount=amount,
                    currency=intent.currency,
                    transaction_type='deposit',
                    status='completed',
                    description=f'Deposit via Stripe (Payment Intent ID: {payment_intent_id})'
                )

                wallet.deposit(amount)
                db.session.add(transaction)
                db.session.commit()
                return True
            return False
        except stripe.error.StripeError as e:
            raise BadRequest(str(e))

    @staticmethod
    def process_deposit(user_id, amount, currency='usd'):
        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']
        wallet = Wallet.query.filter_by(user_id=user_id).first()
        if not wallet:
            raise BadRequest('Wallet not found')

        transaction = Transaction(
            user_id=user_id,
            wallet_id=wallet.id,
            amount=amount,
            currency=currency,
            transaction_type='deposit',
            status='completed',
            description='Deposit via Stripe'
        )

        wallet.deposit(amount)
        db.session.add(transaction)
        db.session.commit()

        return transaction

    @staticmethod
    def process_withdrawal(user_id, amount, currency='usd'):
        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']
        wallet = Wallet.query.filter_by(user_id=user_id).first()
        if not wallet:
            raise BadRequest('Wallet not found')

        if wallet.balance < amount:
            raise BadRequest('Insufficient funds')

        transaction = Transaction(
            user_id=user_id,
            wallet_id=wallet.id,
            amount=amount,
            currency=currency,
            transaction_type='withdrawal',
            status='pending',
            description='Withdrawal request'
        )

        wallet.withdraw(amount)
        db.session.add(transaction)
        db.session.commit()

        # Initiate bank transfer
        try:
            transfer = stripe.Transfer.create(
                amount=int(amount * 100),  # Convert to cents
                currency=currency,
                destination=User.query.get(user_id).stripe_account_id,
                description=f"Withdrawal for user {user_id}"
            )
            transaction.status = 'completed'
            transaction.description += f" (Transfer ID: {transfer.id})"
            db.session.commit()
        except stripe.error.StripeError as e:
            # Rollback the withdrawal if the transfer fails
            wallet.deposit(amount)
            transaction.status = 'failed'
            transaction.description += f" (Failed: {str(e)})"
            db.session.commit()
            raise BadRequest(f"Withdrawal failed: {str(e)}")

        return transaction