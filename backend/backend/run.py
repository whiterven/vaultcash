from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Replace with your database URI
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Your routes and other app configurations go here

if __name__ == '__main__':
    app.run(debug=True)
