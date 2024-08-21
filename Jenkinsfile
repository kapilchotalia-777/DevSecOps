pipeline {
    agent any

    environment {
        // Define credentials IDs
        GITHUB_CREDENTIALS = credentials('Github') // GitHub credentials ID
        SONARQUBE_CREDENTIALS = credentials('Sonar') // SonarQube credentials ID
        DOCKER_CREDENTIALS = credentials('Docker') // Docker credentials ID (if needed)
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone the GitHub repository
                git credentialsId: env.GITHUB_CREDENTIALS, url: 'https://github.com/kapilchotalia-777/Devsecops'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                dir('path-to-your-maven-project') { // Adjust this path if your pom.xml is not in the root
                    // Run SonarQube analysis
                    withSonarQubeEnv('SonarQube') {
                        sh 'mvn clean verify sonar:sonar -Dsonar.login=${SONARQUBE_CREDENTIALS}'
                    }
                }
            }
        }
        stage('OWASP Dependency-Check') {
            steps {
                // Run OWASP Dependency-Check
                dependencyCheck additionalArguments: '--scan .', odcInstallation: 'DC' 
            }
        }
        stage('Publish Dependency-Check Report') {
            steps {
                // Publish OWASP Dependency-Check report
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('Trivy Scan') {
            steps {
                // Run Trivy scan
                sh 'trivy fs --format table -o trivy-fs-report.html .'
            }
        }
        stage('create docker image') {
            steps {
                    dir('/var/lib/jenkins/workspace/DevSecOps CI-CD') {
                        sh 'docker build -t devsecops .'
                        }
                }   
        }
        stage('Deploy using docker image') {
            steps {
                    dir('/var/lib/jenkins/workspace/DevSecOps CI-CD') {
                        sh 'docker run -d -p 3000:3000 devsecops'
                        }
                }   
        }
    }
    
    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
