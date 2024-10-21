from flask import Flask, jsonify
import logging
from .config import Config
from .error_handlers import register_error_handlers
from .extensions import db, migrate, jwt, cors  # Import from extensions instead of redefining

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Configure logging
    logging.basicConfig(level=logging.INFO)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    # Register error handlers
    register_error_handlers(app)

    # Root route
    @app.route('/')
    def index():
        return jsonify({
            'message': 'Welcome to VaultCash API',
            'version': '1.0',
            'status': 'running'
        })

    @app.route('/api')
    def api_index():
        return jsonify({
            'message': 'VaultCash API endpoints',
            'documentation': '/api/docs',  # If you have API documentation
            'version': '1.0'
        })

    # Import and register blueprints
    from .routes.auth_routes import bp as auth_bp
    from .routes.payment_routes import bp as payment_bp
    from .routes.wallet_routes import bp as wallet_bp
    from .routes.admin_routes import bp as admin_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(payment_bp)
    app.register_blueprint(wallet_bp)
    app.register_blueprint(admin_bp)

    return app