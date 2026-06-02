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
    }
}
