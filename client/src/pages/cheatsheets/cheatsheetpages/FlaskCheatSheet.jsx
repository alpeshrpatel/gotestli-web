import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const flaskSections = [
  {
    heading: "What is Flask?",
    content: `Flask is a lightweight and flexible Python web framework. It is micro by design but extensible, making it a popular choice for small and large applications alike. Flask follows the WSGI toolkit and Jinja2 templating engine.`
  },
  {
    heading: "Key Features",
    content: `• Lightweight and minimal core
• Built-in development server and debugger
• RESTful request dispatching
• Jinja2 templating engine
• Support for secure cookies (client-side sessions)
• Easily extensible with plugins`
  },
  {
    heading: "Setting Up Flask",
    code: `# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Flask
pip install Flask`
  },
  {
    heading: "Basic App Setup",
    code: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)`
  },
  {
    heading: "Routing and URL Parameters",
    code: `@app.route('/user/<username>')
def show_user_profile(username):
    return f'User: {username}'`
  },
  {
    heading: "Templates",
    code: `# templates/home.html
<h1>Welcome {{ name }}</h1>

# app.py
from flask import render_template

@app.route('/hello/<name>')
def hello(name):
    return render_template('home.html', name=name)`
  },
  {
    heading: "Static Files",
    content: `• Place CSS/JS files inside a folder named "static"
• Access via /static/filename`
  },
  {
    heading: "Forms and Request Data",
    code: `from flask import request

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    return f'Hello, {name}'`
  },
  {
    heading: "Redirects and Error Handling",
    code: `from flask import redirect, url_for

@app.route('/login')
def login():
    return redirect(url_for('home'))

@app.errorhandler(404)
def not_found(e):
    return 'Page not found', 404`
  },
  {
    heading: "Using Blueprints",
    code: `# In user.py
from flask import Blueprint

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile')
def profile():
    return 'User Profile'

# In app.py
from user import user_bp
app.register_blueprint(user_bp, url_prefix='/user')`
  },
  {
    heading: "Best Practices",
    content: `• Structure your app using blueprints for modularity
• Use environment variables for configuration
• Handle errors gracefully
• Validate form inputs
• Keep dependencies updated
• Use gunicorn for production deployment`
  },
  {
    heading: "Common Use Cases",
    content: `• REST APIs
• Prototypes and MVPs
• Small to medium web applications
• Admin dashboards
• Microservices architecture`
  }
];

const FlaskCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Flask Framework Cheat Sheet"
      description="A comprehensive guide for building web applications using Flask."
      sections={flaskSections}
      cheatsheetId={17}
    />
  );
};

export default FlaskCheatSheet;
