pipeline {
    agent any

    stages {

        stage('Verify Files') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app:${BUILD_NUMBER} .'
            }
        }

        stage('Tag Image') {
            steps {
                sh 'docker tag my-app:${BUILD_NUMBER} vishwajeet97/my-app:${BUILD_NUMBER}'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push vishwajeet97/my-app:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Clone Manifest Repository') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {
                    sh '''
                    rm -rf manifests

                    git clone https://${GIT_USER}:${GIT_TOKEN}@github.com/VishwajeetMalik/my-app-manifests.git manifests

                    ls -la manifests
                    '''
                }
            }
        }

        stage('Update Manifest') {
            steps {
                sh '''
                sed -i "s|image: .*|image: vishwajeet97/my-app:${BUILD_NUMBER}|" manifests/deployment.yaml

                echo "===== Updated deployment.yaml ====="
                cat manifests/deployment.yaml
                '''
            }
        }

    }
}
