pipeline {
    agent {
        node {
            label 'jenkins_agent'
            }
      }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                withEnv(["SPRING_PROFILES_ACTIVE=production"]) {
                    sh '''
                    ./mvnw clean package
                    '''
                }
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                echo "doing test stuff.."
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}