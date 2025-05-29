import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const djangoSections = [
  {
    heading: "What is Django?",
    content: `Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the Model-View-Template (MVT) architectural pattern.`
  },
  {
    heading: "Key Features",
    content: `• Built-in admin interface
• ORM (Object-Relational Mapping)
• URL routing system
• Authentication system
• Middleware support
• Scalability and security features built-in`
  },
  {
    heading: "Setting Up Django",
    code: `# Create a virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install Django
pip install django

# Create a new project
django-admin startproject myproject`
  },
  {
    heading: "Creating an App",
    code: `cd myproject
python manage.py startapp myapp`
  },
  {
    heading: "Basic Views and URLs",
    code: `# myapp/views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, Django")

# myproject/urls.py
from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
]`
  },
  {
    heading: "Models and Migrations",
    code: `# myapp/models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

# Make migrations
python manage.py makemigrations
python manage.py migrate`
  },
  {
    heading: "Admin Interface",
    code: `# myapp/admin.py
from django.contrib import admin
from .models import Post

admin.site.register(Post)

# Create superuser
python manage.py createsuperuser`
  },
  {
    heading: "Templates",
    code: `# myapp/views.py
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

# Create templates/myapp/home.html
<h1>Welcome to Django</h1>`
  },
  {
    heading: "Static Files",
    content: `• Place CSS/JS in static/myapp/
• Load in templates using {% static %} tag after loading static: {% load static %}`
  },
  {
    heading: "Forms and Validation",
    code: `from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)`
  },
  {
    heading: "Best Practices",
    content: `• Use virtual environments
• Keep settings modular (e.g., settings for dev, staging, production)
• Use Django’s built-in security features
• Write tests using Django’s test framework
• Use class-based views when appropriate
• Follow the DRY (Don't Repeat Yourself) principle`
  },
  {
    heading: "Common Use Cases",
    content: `• Content management systems (CMS)
• eCommerce platforms
• Social networks
• Data dashboards and admin panels
• REST APIs (with Django REST framework)`
  }
];

const DjangoCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Django Framework Cheat Sheet"
      description="Essential guide for building robust web applications with Django."
      sections={djangoSections}
      cheatsheetId={14}
    />
  );
};

export default DjangoCheatSheet;
