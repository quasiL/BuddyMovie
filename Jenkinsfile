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
                sh '''
                ./mvnw clean package
                '''
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