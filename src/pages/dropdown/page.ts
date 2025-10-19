import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { locators } from './locators';

export class DropdownPage extends BasePage {
  readonly staticDropdown = this.page.locator(locators.staticDropdown);
  readonly searchableInput = this.page.locator(locators.searchableInput);
  readonly customDropdownButton = this.page.locator(locators.customDropdownButton);

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('dropdown/');
  }

  async selectStaticOption(value: string) {
    await this.staticDropdown.selectOption(value);
  }

  async getStaticSelectedValue(): Promise<string> {
    return await this.staticDropdown.inputValue();
  }

  async searchAndSelect(option: string) {
    await this.searchableInput.fill(option);
    const optionLocator = this.page.locator(locators.searchableOption(option));
    await optionLocator.click();
  }

  async getSearchInputValue(): Promise<string> {
    return await this.searchableInput.inputValue();
  }

  async selectFromCustomDropdown(option: string) {
    await this.customDropdownButton.click();
    const optionLocator = this.page.locator(locators.customDropdownOption(option));
    await optionLocator.click();
  }

  async getCustomDropdownSelected(): Promise<string> {
    return await this.customDropdownButton.innerText();
  }
}
