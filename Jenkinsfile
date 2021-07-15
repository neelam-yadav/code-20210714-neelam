pipeline {
	agent any

	tools {nodejs "NodeJS"}
	environment {
		registry = "neelamyadav10053/my-images"
		registryCredential = 'dockerhub'
		dockerImage = ''
	}
	stages {

		stage('Checkout') {
		  steps {
			git 'https://github.com/neelam-yadav/code-20210714-neelam.git'
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

		stage('Deploy: Docker Image to Dockerhub') {
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
			}
		}
	}
}