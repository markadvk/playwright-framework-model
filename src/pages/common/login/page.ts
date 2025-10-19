import { Page } from '@playwright/test';
import { BasePage } from '../../basePage';
import { loginLocators } from './locators';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator(loginLocators.usernameInput);
  readonly passwordInput = this.page.locator(loginLocators.passwordInput);
  readonly loginButton = this.page.locator(loginLocators.loginButton);
  readonly resultText = this.page.locator(loginLocators.resultText);

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('login/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // remove below method if not needed
  getResultLocator() {
    return this.resultText;
  }
}
