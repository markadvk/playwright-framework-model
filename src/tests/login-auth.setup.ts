import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/common/login/page';
import { username, password } from '../../credentials';
import { applyAllureMetadata } from '../utils/allureHelper';

test('login and save auth state', async ({ page }) => {
  applyAllureMetadata({
    ownerName: 'qa-team',
    severityLevel: 'critical',
    epicName: 'Authentication',
    featureName: 'Login Functionality',
    storyName: 'User can log in with valid credentials',
  });

  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(username, password);

  await expect(loginPage.getResultLocator()).toHaveText('Congratulations, you logged in successfully');
});
