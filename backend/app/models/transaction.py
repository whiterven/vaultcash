from datetime import datetime
from ..extensions import db

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey('wallet.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    transaction_type = db.Column(db.String(20), nullable=False)  # 'deposit', 'withdrawal', 'transfer'
    status = db.Column(db.String(20), default='pending')  # 'pending', 'completed', 'failed'
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Transaction {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'wallet_id': self.wallet_id,
            'amount': float(self.amount),
            'currency': self.currency,
            'transaction_type': self.transaction_type,
            'status': self.status,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }