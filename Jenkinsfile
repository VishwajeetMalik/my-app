pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Fetching source code'
            }
        }

        stage('Verify Project') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Docker build stage coming next'
            }
        }

        stage('Deploy To Kubernetes') {
            steps {
                echo 'Kubernetes deployment stage coming next'
            }
        }
    }
}
