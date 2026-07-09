pipeline {
    agent any

    stages {

        // Verify Jenkins has checked out the code
        stage('Verify Files') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        // Build Docker Image
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app:${BUILD_NUMBER} .'
            }
        }

        // Tag Docker Image for Docker Hub
        stage('Tag Image') {
            steps {
                sh 'docker tag my-app:${BUILD_NUMBER} vishwajeet97/my-app:${BUILD_NUMBER}'
            }
        }

        // Login to Docker Hub and Push Image
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

        // Clone Kubernetes Manifest Repository
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

                    echo "===== Manifest Repository ====="
                    ls -la manifests
                    '''
                }
            }
        }

        // Update deployment.yaml with latest Docker image tag
        stage('Update Manifest') {
            steps {
                sh '''
                sed -i "s|image: .*|image: vishwajeet97/my-app:${BUILD_NUMBER}|" manifests/deployment.yaml

                echo "===== Updated deployment.yaml ====="
                cat manifests/deployment.yaml
                '''
            }
        }

        // Commit updated deployment.yaml
        stage('Commit Manifest Changes') {
            steps {
                dir('manifests') {

                    sh '''
                    git config user.name "Jenkins"
                    git config user.email "jenkins@local"

                    git add deployment.yaml

                    git commit -m "Update image to $BUILD_NUMBER" || echo "No changes to commit"
                    '''
                }
            }
        }

        // Push updated manifest repository to GitHub
        stage('Push Manifest Changes') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {

                    dir('manifests') {

                        sh '''
                        git remote set-url origin https://${GIT_USER}:${GIT_TOKEN}@github.com/VishwajeetMalik/my-app-manifests.git
                        git push origin HEAD:main
                        '''
                    }
                }
            }
        }
    }
}
