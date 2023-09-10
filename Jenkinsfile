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

        stage('Start the backend') {
            steps {
                script {
                    bat "docker compose up -d && cd front && npm ci && npx cypress run"
                    // sleep 5
                }
            }
        }
        
        stage('Run API Tests (Cypress)') {
            steps {
                script {
                    bat "cd front && npm ci && npx cypress run"
                }
            }
        }
        
        stage('Run UI Tests (pytest/Selenium)') {
            steps {
                script {
                    bat 'cd front && npm start && cd .. && pytest .'
                }
            }
        }
    }

    post {
        always {
            bat 'docker compose down'
        }
    }
}
