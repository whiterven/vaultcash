from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Define extensions here - only place where they should be defined
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()