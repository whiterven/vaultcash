# tests/test_auth_service.py
import unittest
from app import create_app, db
from app.models import User
from app.services.auth_service import AuthService

class TestAuthService(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_register_user(self):
        user = AuthService.register_user('testuser', 'test@example.com', 'password', 'John', 'Doe', '1234567890')
        self.assertIsNotNone(user)
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')

    def test_login_user(self):
        AuthService.register_user('testuser', 'test@example.com', 'password', 'John', 'Doe', '1234567890')
        result = AuthService.login_user('testuser', 'password')
        self.assertIn('access_token', result)
        self.assertIn('refresh_token', result)
        self.assertIn('user', result)

# Add more tests for other services and controllers