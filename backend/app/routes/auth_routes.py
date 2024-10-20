from flask import Blueprint
from ..controllers.auth_controller import AuthController

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

bp.route('/register', methods=['POST'])(AuthController.register)
bp.route('/login', methods=['POST'])(AuthController.login)
bp.route('/refresh', methods=['POST'])(AuthController.refresh)
bp.route('/change-password', methods=['POST'])(AuthController.change_password)
bp.route('/request-password-reset', methods=['POST'])(AuthController.request_password_reset)
bp.route('/reset-password', methods=['POST'])(AuthController.reset_password)