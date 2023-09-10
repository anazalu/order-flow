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
                    bat "docker compose up -d"
                    sleep 10
                }
            }
        }
        
        stage('Run API Tests (Cypress)') {
            steps {
                script {
                    bat "cd '${WORKSPACE}' && npm start && npx cypress run"
                }
            }
        }
        
        stage('Run UI Tests (pytest/Selenium)') {
            steps {
                script {
                    bat "cd '${WORKSPACE}'"
                    bat 'pytest .'
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
