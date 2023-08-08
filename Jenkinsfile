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
                withCredentials([usernamePassword(credentialsId: 'postgres', passwordVariable: 'POSTGRES_PASSWORD', usernameVariable: 'POSTGRES_USERNAME')]) {
                    withEnv([
                        "SPRING_PROFILES_ACTIVE=production",
                        "SPRING_DATASOURCE_URL=jdbc:postgresql://ep-rapid-boat-97751576.eu-central-1.aws.neon.tech/neondb",
                        "SPRING_DATASOURCE_USERNAME=${POSTGRES_USERNAME}",
                        "SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}"
                    ]) {
                        sh "./mvnw clean package"
                    }
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
