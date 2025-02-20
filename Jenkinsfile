pipeline {
	agent any

	tools {nodejs "NodeJS"}
	environment {
		registry = "<docker_hub_account>/<repository_name>"
		registryCredential = 'dockerhub'
		dockerImage = ''
	}
	stages {

		stage('Checkout') {
		  steps {
			git 'https://github.com/neelam-yadav/sample-nodejs-devops.git'
		  }
		}

		stage('Build') {
		  steps {
			sh 'npm install'
			sh 'node index.js'
			sh 'npm pack'
		  }
		}

		stage('Test') {
		  steps {
			sh 'npm test'
		  }
		  post {
              always {
                archiveArtifacts artifacts: '*.tgz', fingerprint: true
                junit skipPublishingChecks: true, testResults: 'test-reports.xml'
              }
            }
		}

		stage('Build: Docker Image') {
			steps {
				script {
					dockerImage = docker.build registry + ":bmi-$BUILD_NUMBER"
				}
			}
		}

		stage('Deploy: over Dockerhub') {
			steps {
				script {
					docker.withRegistry('', registryCredential) {
					dockerImage.push()
					}
				}
			}
		}

		stage('Cleaning Up') {
			steps{
			  sh "docker rmi --force $registry:bmi-$BUILD_NUMBER"
			  sh 'rm node_modules -rf'
			}
		}
	}
}
