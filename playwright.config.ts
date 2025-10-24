import { defineConfig, devices } from '@playwright/test';
import { junit } from 'node:test/reporters';

export default defineConfig({
  testDir: './src/tests',
  outputDir: './test-results/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  timeout: 300000,
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['junit', { outputFile: './test-results/results.xml' }]
  ],

  use: {
    baseURL: 'https://markadvk.github.io/verifykoders/demos/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'regression',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        // storageState: '.auth/auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});
