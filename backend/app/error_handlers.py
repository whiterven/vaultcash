import logging
from flask import jsonify

logger = logging.getLogger(__name__)

def register_error_handlers(app):
    @app.errorhandler(400)
    def bad_request(error):
        logger.error(f"400 error: {error}")
        return jsonify(error=str(error)), 400

    @app.errorhandler(401)
    def unauthorized(error):
        logger.error(f"401 error: {error}")
        return jsonify(error="Unauthorized"), 401

    @app.errorhandler(403)
    def forbidden(error):
        logger.error(f"403 error: {error}")
        return jsonify(error="Forbidden"), 403

    @app.errorhandler(404)
    def not_found(error):
        logger.error(f"404 error: {error}")
        return jsonify(error="Not found"), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        logger.error(f"500 error: {error}")
        return jsonify(error="Internal server error"), 500

def configure_logging():
    logging.basicConfig(level=logging.INFO)
    file_handler = logging.FileHandler('app.log')
    file_handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    logging.getLogger('').addHandler(file_handler)