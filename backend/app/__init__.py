from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    # Register blueprints
    from .routes import auth_routes, payment_routes, wallet_routes, admin_routes
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(payment_routes.bp)
    app.register_blueprint(wallet_routes.bp)
    app.register_blueprint(admin_routes.bp)

    # Register error handlers
    from .error_handlers import register_error_handlers
    register_error_handlers(app)

    return app