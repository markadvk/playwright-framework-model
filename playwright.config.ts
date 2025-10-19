import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  outputDir: './test-results/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 300000,
  reporter: [
    ['list'],
    ['allure-playwright'],
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
