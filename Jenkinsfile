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
		  }
		}


		stage('Test') {
		  steps {
			sh 'npm run test'
		  }
		}

		stage('Building Docker Image') {
			steps {
				script {
					dockerImage = docker.build registry + ":$BUILD_NUMBER"
				}
			}
		}

		stage('Deploying Docker Image to Dockerhub') {
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
			  sh "docker rmi --force $registry:$BUILD_NUMBER"
			}
		}
	}
}