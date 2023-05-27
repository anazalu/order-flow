# OrderFlow
This is a web project with Linux, MySQL and Python Django on backend. The server exposes a REST API that is consumed by web frontend (React). The project's source code is stored in a GitHub repository. The project needs 1 backend developer (Python/Django), 1 frontend developer (JavaScript/React), 1 test engineer with test automation skills (Python/pytest/Selenium).

Development (backend):
- set up MySQL in the test environment
- create a database with 2-3 tables (like, CUSTOMERS, PRODUCTS, ORDERS)
- set up Python Django in the test environment (see the instruction below)
- connect to the database
- write some backend code that handles GET and POST requests

Development (frontend):
- the frontend consumes the REST API and renders a basic web interface
- available actions: list products, place an order

Testing:
- backend, manual
- backend, automated (pytest)
- API, manual (Postman)
- API, automated (?)
- web, manual
- web, automated (Selenium)

The project needs further refinement to create stories and start development.



ChatGPT: How to write a REST API in Python Django?

To write a REST API in Python using the Django framework, you can follow these steps:

Step 1: Set up the Django project
1. Install Django using pip: `pip install django`
2. Create a new Django project: `django-admin startproject myproject`
3. Navigate to the project directory: `cd myproject`

Step 2: Create a Django app
1. Create a new Django app within the project: `python manage.py startapp myapp`

Step 3: Define the API models
1. Open the `models.py` file within your app (`myapp/models.py`) and define your API models using Django's model fields and relationships.

Step 4: Create the API views
1. Open the `views.py` file within your app (`myapp/views.py`).
2. Import the necessary modules: `from rest_framework.views import APIView` and `from rest_framework.response import Response`.
3. Create your API views by subclassing `APIView` and defining the desired HTTP methods (e.g., `get`, `post`, `put`, `delete`).
4. Implement the logic for each method by overriding the corresponding methods in your view class (e.g., `get`, `post`).
5. Return the desired response using the `Response` class.

Step 5: Define the API URLs
1. Open the project's `urls.py` file (`myproject/urls.py`).
2. Import the necessary modules: `from django.urls import path, include`.
3. Define the URL patterns for your API by adding a new path for your app's URLs.
4. Optionally, you can use the `include` function to include the URLs from your app's `urls.py` file.

Step 6: Run the Django development server
1. Start the Django development server using the command: `python manage.py runserver`.
2. Visit the URL shown in the console to access your API (e.g., `http://localhost:8000/myapp/`).

These steps provide a basic structure for creating a REST API in Python using Django. You can further enhance your API by adding authentication, serializers, permissions, and more using the Django REST framework (DRF), which provides additional features and tools for building robust APIs.
