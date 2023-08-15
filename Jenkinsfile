pipeline {
    agent any
    
    environment {
        POSTGRES_HOST = 'localhost'
        POSTGRES_NAME = 'orderflow_db'
        POSTGRES_USER = 'postgres'
        POSTGRES_PASSWORD = 'postgres'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build and run the Backend Docker container
                    sh "docker run -d -v ${WORKSPACE}:/workspace -w /workspace -p 8000:8000 python:3.9 sh -c 'pip install --upgrade pip && pip install -r back/requirements.txt && cd back && python manage.py migrate && python manage.py runserver 0.0.0.0:8000 &'"

                    // Build and run the Frontend Docker container
                    sh "docker run -d -v ${WORKSPACE}:/workspace -w /workspace -p 3000:3000 node:18 sh -c 'cd front && npm ci && npm start &'"
                }
            }
        }
        
        stage('Database Setup') {
            steps {
                script {
                    sh 'sudo apt update'
                    sh 'sudo apt install postgresql-client'
                    sh "PGPASSWORD='${POSTGRES_PASSWORD}' psql -h '${POSTGRES_HOST}' -U '${POSTGRES_USER}' -c 'CREATE DATABASE ${POSTGRES_NAME};'"
                    sh "PGPASSWORD='${POSTGRES_PASSWORD}' psql -h '${POSTGRES_HOST}' -U '${POSTGRES_USER}' -d '${POSTGRES_NAME}' << EOF\nINSERT INTO products (name, price, price_full, image_url, description)\nVALUES\n  ('Whiskerjig Table', 299.99, 349.99, 'http://localhost:3000/images/01.jpg', 'Product 1 description'),\n  ('Fluffelorn Chaise', 124.99, 199.99, 'http://localhost:3000/images/02.jpg', 'Product 2 description'),\n  ('Gobbledy Table', 259.99, 349.99, 'http://localhost:3000/images/03.jpg', 'Product 3 description'),\n  ('Fluffernut Ottoman', 249.99, 499.99, 'http://localhost:3000/images/04.jpg', 'Product 4 description'),\n  ('Pufflewump Sofa', 549.99, null, 'http://localhost:3000/images/05.jpg', 'Product 5 description'),\n  ('Zippitydoo Table', 129.99, null, 'http://localhost:3000/images/06.jpg', 'Product 6 description'),\n  ('Snuggleplank Table', 29.99, null, 'http://localhost:3000/images/07.jpg', 'Product 7 description'),\n  ('Bumbleflop Chair', 519.99, 629.99, 'http://localhost:3000/images/08.jpg', 'Product 8 description'),\n  ('Zonkplunk Ottoman', 229.99, null, 'http://localhost:3000/images/09.jpg', 'Product 9 description'),\n  ('Flibberjibber Table', 329.99, null, 'http://localhost:3000/images/10.jpg', 'Product 10 description');\nEOF"
                }
            }
        }
        
        stage('Run API Tests (Cypress)') {
            steps {
                script {
                    sh 'cd front && npm run test:cypress'
                }
            }
        }
        
        stage('Start Frontend') {
            steps {
                sh 'cd front && npm start &'
            }
        }
        
        stage('Run UI Tests (pytest/Selenium)') {
            steps {
                script {
                    sh 'python -m pip install --upgrade pip'
                    sh 'pip install -r requirements.txt'
                    sh 'pytest .'
                }
            }
        }
    }
}
