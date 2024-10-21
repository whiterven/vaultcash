#auth_routes.py

from flask import Blueprint, jsonify
from ..controllers.auth_controller import AuthController

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# Define routes using add_url_rule instead of route decorator
bp.add_url_rule('/register', view_func=AuthController.register, methods=['POST'])
bp.add_url_rule('/login', view_func=AuthController.login, methods=['POST'])
bp.add_url_rule('/refresh', view_func=AuthController.refresh, methods=['POST'])
bp.add_url_rule('/refresh-token', view_func=AuthController.refresh, methods=['POST'])  # Added this line
bp.add_url_rule('/change-password', view_func=AuthController.change_password, methods=['POST'])
bp.add_url_rule('/request-password-reset', view_func=AuthController.request_password_reset, methods=['POST'])
bp.add_url_rule('/reset-password', view_func=AuthController.reset_password, methods=['POST'])

# Add an index route for the auth blueprint
@bp.route('', methods=['GET'])
def auth_index():
    return jsonify({
        'message': 'Auth endpoints',
        'endpoints': {
            'register': '/api/auth/register [POST]',
            'login': '/api/auth/login [POST]',
            'refresh': '/api/auth/refresh [POST]',
            'refresh-token': '/api/auth/refresh-token [POST]',  # Added this line
            'change-password': '/api/auth/change-password [POST]',
            'request-password-reset': '/api/auth/request-password-reset [POST]',
            'reset-password': '/api/auth/reset-password [POST]'
        }
    })