pipeline {
    agent {
        node {
            label 'jenkins_agent'
            }
      }
    environment {
        SPRING_DATASOURCE_URL = credentials('postgres-url-secret')
        SPRING_DATASOURCE_USERNAME = credentials('postgres-username-secret')
        SPRING_DATASOURCE_PASSWORD = credentials('postgres-password-secret')
    }
    stages {
        stage('Setup Environment') {
            steps {
                script {
                    def envFileContent = readFile('.env')
                    def envVariables = [:]
                    envFileContent.eachLine { line ->
                        def parts = line.split('=')
                        if (parts.size() == 2) {
                            envVariables[parts[0]] = parts[1]
                        }
                    }
                    SPRING_DATASOURCE_URL = envVariables['POSTGRES_URL']
                    SPRING_DATASOURCE_USERNAME = envVariables['POSTGRES_USERNAME']
                    SPRING_DATASOURCE_PASSWORD = envVariables['POSTGRES_PASSWORD']
                }
            }
        }
        stage('Build') {
            steps {
                echo "Building.."
                withEnv([
                    "SPRING_PROFILES_ACTIVE=production",
                    "SPRING_DATASOURCE_URL=${POSTGRES_URL}",
                    "SPRING_DATASOURCE_USERNAME=${POSTGRES_USERNAME}",
                    "SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}"
                ]) {
                    sh "./mvnw clean package"
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