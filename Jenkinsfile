pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Code fetched from GitHub'
            }
        }

        stage('Verify') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Docker Build Simulation') {
            steps {
                echo 'Docker build would happen here'
            }
        }
    }
}
