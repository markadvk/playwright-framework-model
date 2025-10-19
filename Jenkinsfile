pipeline {
  agent any

  tools {
    nodejs 'NodeJS_24' // Ensure Node.js 24 is installed and configured in Jenkins
  }

  parameters {
    choice(
      name: 'TEST_SUITE', // Parameter to select which test suite to run
      choices: ['all', 'smoke', 'functional', 'regression'], // Define available test suites
      description: 'Select which test suite to run'
    )
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Checking out source code...'
        checkout scm // Checkout the source code from the configured SCM
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing npm dependencies...'
        bat 'npm install' // Install project dependencies
      }
    }

    stage('Run UI Tests') {
      steps {
        echo 'Running Playwright tests...'

        ansiColor('xterm') {
          withEnv([
            'FORCE_COLOR=1',
            'NPM_CONFIG_COLOR=true',
            'TERM=xterm-256color'
          ]) {
            bat 'chcp 65001 >NUL'
            bat 'npx playwright install --with-deps'

            script {
              if (params.TEST_SUITE == 'all') {
                bat 'npm run test'
              } else {
                bat "npm run test -- --grep @${params.TEST_SUITE}"
              }
            }
          }
        }
      }

      post {
        always {
          echo '📦 Archiving Playwright reports and publishing to GitHub Pages...'

          archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
          junit 'test-results/**/*.xml'

          publishHTML(target: [
            reportName: 'Playwright HTML Report',
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: false
          ])

          withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
            bat '''
            REM ============================
            REM Setup
            REM ============================
            set REPORT_DIR=playwright-report
            set TARGET_DIR=reports
            set REPO=https://%GITHUB_TOKEN%@github.com/markadvk/playwright-portfolio.git

            rmdir /s /q gh-pages 2>nul || echo "no gh-pages folder"
            git clone --branch gh-pages --depth=1 %REPO% gh-pages || (
              git clone %REPO% gh-pages
              cd gh-pages
              git checkout --orphan gh-pages
              cd ..
            )

            REM ============================
            REM Copy this build’s report
            REM ============================
            rmdir /s /q gh-pages\\%TARGET_DIR%\\latest 2>nul || echo "no latest"
            mkdir gh-pages\\%TARGET_DIR%\\build%BUILD_NUMBER%
            xcopy %REPORT_DIR% gh-pages\\%TARGET_DIR%\\build%BUILD_NUMBER% /E /I /Y
            mkdir gh-pages\\%TARGET_DIR%\\latest
            xcopy %REPORT_DIR% gh-pages\\%TARGET_DIR%\\latest /E /I /Y

            REM ============================
            REM Generate summary page
            REM ============================
            > gh-pages\\%TARGET_DIR%\\index.html echo ^<h1^>Playwright Reports (Last 15 Builds)^</h1^>
            for /f "skip=15 eol=: delims=" %%F in ('dir /b /ad-h /o-d gh-pages\\%TARGET_DIR%\\build*') do rmdir /s /q gh-pages\\%TARGET_DIR%\\%%F
            for /f "eol=: delims=" %%F in ('dir /b /ad-h /o-d gh-pages\\%TARGET_DIR%\\build*') do (
              echo ^<p^>^<a href="./%%F/index.html"^>%%F^</a^>^</p^> >> gh-pages\\%TARGET_DIR%\\index.html
            )

            REM ============================
            REM Push changes
            REM ============================
            cd gh-pages
            git config user.name "jenkins"
            git config user.email "jenkins@ci"
            git add .
            git commit -m "ci: update reports build %BUILD_NUMBER%"
            git push --force %REPO% gh-pages
            '''
          }

          script {
            echo "📊 Report for this build: https://markadvk.github.io/playwright-portfolio/reports/build${env.BUILD_NUMBER}/index.html"
            echo "🔗 Latest report: https://markadvk.github.io/playwright-portfolio/reports/latest/index.html"
            echo "📂 All reports: https://markadvk.github.io/playwright-portfolio/reports/"
          }
        }
      }
    }
  }

  post {
    success {
      echo '✅ Build succeeded!'
    }
    failure {
      echo '❌ Build failed!'
    }
  }
}
