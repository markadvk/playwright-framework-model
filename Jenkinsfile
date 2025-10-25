pipeline {
  agent any

  tools {
    nodejs 'NodeJS_24'
    jdk 'JDK_17'
  }

  parameters {
    choice(name: 'TEST_SUITE', choices: ['all', 'regression', 'smoke'], description: 'Choose which test suite to run')
    string(name: 'BRANCH_NAME', defaultValue: '', description: 'Optional: Git branch to build. Leave empty for default SCM branch')
    string(name: 'PLAYWRIGHT_CREDS_ID', defaultValue: 'PW_CREDS', description: 'Credential ID for Playwright test login')
    string(name: 'EMAIL_RECIPIENTS', defaultValue: 'markadvk.sdet@gmail.com', description: 'Email recipients (comma separated). Leave empty to disable email')
  }

  environment {
    NPM_CACHE = "${WORKSPACE}/.npm-cache"
    ALLURE_RESULTS = "${WORKSPACE}/allure-results"
    ALLURE_REPORT = "${WORKSPACE}/allure-report"
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    disableConcurrentBuilds()
    timeout(time: 45, unit: 'MINUTES')
  }

  stages {
    stage('Checkout SCM') {
      steps {
        script {
          echo "SCM checkout on: ${isUnix() ? 'Linux/Unix' : 'Windows'}"
          if (params.BRANCH_NAME?.trim()) {
            echo "Checking out branch: ${params.BRANCH_NAME}"
            checkout([
              $class: 'GitSCM',
              branches: [[name: "*/${params.BRANCH_NAME}"]],
              userRemoteConfigs: scm.userRemoteConfigs,
              extensions: scm.extensions ?: []
            ])
          } else {
            echo "No branch override. Using default SCM branch."
            checkout scm
          }
        }
      }
    }

    stage('Initial Clean') {
      steps {
        script {
          echo "Removing old test / Allure files"
          if (isUnix()) {
            sh 'rm -rf "${ALLURE_RESULTS}" "${ALLURE_REPORT}" test-results playwright-report temp || true'
          } else {
            bat 'rd /s /q "%ALLURE_RESULTS%" "%ALLURE_REPORT%" test-results playwright-report temp || exit 0'
          }
        }
      }
    }

    stage('Install Dependencies (Cached)') {
      steps {
        script {
          echo "Installing Node dependencies using cache"
          if (isUnix()) {
            sh 'mkdir -p "${NPM_CACHE}"'
            sh 'npm ci --prefer-offline --no-audit --cache "${NPM_CACHE}"'
          } else {
            bat 'if not exist "%NPM_CACHE%" mkdir "%NPM_CACHE%"'
            bat 'npm ci --prefer-offline --no-audit --cache "%NPM_CACHE%"'
          }
        }
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        script {
          echo "Ensure Playwright browser binaries installed"
          if (isUnix()) {
            sh 'npx playwright install --with-deps || true'
          } else {
            bat 'npx playwright install || exit 0'
          }
        }
      }
    }

    stage('Run Tests') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${params.PLAYWRIGHT_CREDS_ID}", usernameVariable: 'MY_USERNAME', passwordVariable: 'MY_PASSWORD')]) {
          script {
            def cmd = params.TEST_SUITE == 'all'
              ? "npx playwright test"
              : "npx playwright test --grep @${params.TEST_SUITE}"

            echo "Executing test suite: ${params.TEST_SUITE}"

            retry(2) {
              if (isUnix()) sh "${cmd}"
              else bat "${cmd}"
            }
          }
        }
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: '**/test-results/*.xml'
        }
      }
    }

    stage('Generate Allure Report') {
      steps {
        script {
          echo "Building Allure Report"
          if (isUnix()) {
            sh 'npx allure generate "${ALLURE_RESULTS}" --clean -o "${ALLURE_REPORT}" || true'
          } else {
            bat 'npx allure generate "%ALLURE_RESULTS%" --clean -o "%ALLURE_REPORT%" || exit 0'
          }
        }
      }
    }

    stage('Archive & Publish Allure') {
      steps {
        archiveArtifacts artifacts: 'allure-report/**', fingerprint: true, allowEmptyArchive: true
        allure([
          includeProperties: false,
          reportBuildPolicy: 'ALWAYS',
          results: [[path: 'allure-results']]
        ])
      }
    }
  }

  post {
    success {
      echo "All good! Sending success email..."
      script {
        if (params.EMAIL_RECIPIENTS?.trim()) {
          emailext to: params.EMAIL_RECIPIENTS,
                   subject: "[SUCCESS] ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                   body: "✅ Build successful. View: ${env.BUILD_URL}"
        }
      }
    }
    failure {
      echo "Build failed! Notifying users..."
      script {
        if (params.EMAIL_RECIPIENTS?.trim()) {
          emailext to: params.EMAIL_RECIPIENTS,
                   subject: "[FAILURE] ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                   body: "❌ Build failed. Investigate: ${env.BUILD_URL}"
        }
      }
    }
    always {
      echo "Light cleanup"
      script {
        if (isUnix()) sh 'rm -rf temp || true'
        else bat 'rd /s /q temp || exit 0'
      }
    }
  }
}
