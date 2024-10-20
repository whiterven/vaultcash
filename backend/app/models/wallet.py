from datetime import datetime
from ..extensions import db

class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    balance = db.Column(db.Numeric(10, 2), default=0.00)
    currency = db.Column(db.String(3), default='USD')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    transactions = db.relationship('Transaction', backref='wallet', lazy='dynamic')

    def __repr__(self):
        return f'<Wallet {self.id} of User {self.user_id}>'

    def deposit(self, amount):
        self.balance += amount
        db.session.commit()

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            db.session.commit()
            return True
        return False

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'balance': float(self.balance),
            'currency': self.currency,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }