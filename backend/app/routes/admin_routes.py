from flask import Blueprint
from ..controllers.admin_controller import AdminController

bp = Blueprint('admin', __name__, url_prefix='/api/admin')

bp.route('/users', methods=['GET'])(AdminController.get_all_users)
bp.route('/users/<int:user_id>/transactions', methods=['GET'])(AdminController.get_user_transactions)
bp.route('/users/<int:user_id>/deactivate', methods=['POST'])(AdminController.deactivate_user)
bp.route('/users/<int:user_id>/activate', methods=['POST'])(AdminController.activate_user)