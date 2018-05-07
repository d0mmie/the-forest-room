pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'docker pull node:latest'
        sh 'echo "Test"'
      }
    }
  }
}