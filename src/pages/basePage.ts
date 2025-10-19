/**
 * VerifyKoders Automation Framework
 * Author: VerifyKoders (Geetanjali)
 * Licensed under MIT License
 */

import { Page, Locator, expect } from '@playwright/test';

type LocatorOrSelector = string | Locator;

/**
 * BasePage: Common reusable actions for all Page Objects
 * Provides stable, non-flaky wrapper methods with built-in waits and safety checks.
 */
export class BasePage {
  protected page: Page;

  // Default timeouts (in ms)
  private readonly defaultTimeout = 20000;
  private readonly shortTimeout = 40000;
  private readonly longTimeout = 200000;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a given endpoint (relative to baseURL) */
  async goto(endPoint: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle') {
    await this.page.goto(endPoint, { waitUntil, timeout: this.longTimeout });
  }

  /** Wait for element to be visible before clicking */
  async click(locator: LocatorOrSelector, options: { timeout?: number; force?: boolean } = {}) {
    const element = this.toLocator(locator);
    await element.waitFor({ state: 'visible', timeout: options.timeout ?? this.defaultTimeout });
    await element.click({ timeout: options.timeout ?? this.defaultTimeout, force: options.force ?? false });
  }

  /** Wait for element to be visible and fill value safely */
  async fill(locator: LocatorOrSelector, text: string, options: { timeout?: number; clear?: boolean } = {}) {
    const element = this.toLocator(locator);
    await element.waitFor({ state: 'visible', timeout: options.timeout ?? this.defaultTimeout });
    if (options.clear) {
      await element.fill('');
    }
    await element.fill(text, { timeout: options.timeout ?? this.defaultTimeout });
  }

  /** Get trimmed text content safely */
  async getText(locator: LocatorOrSelector, timeout = this.defaultTimeout): Promise<string> {
    const element = this.toLocator(locator);
    await element.waitFor({ state: 'visible', timeout });
    const text = await element.textContent();
    return text?.trim() || '';
  }

  /** Check if element is visible within timeout */
  async isVisible(locator: LocatorOrSelector, timeout = this.shortTimeout): Promise<boolean> {
    const element = this.toLocator(locator);
    try {
      return await element.isVisible({ timeout });
    } catch {
      return false;
    }
  }

  /** Wait until element is hidden or detached from DOM */
  async waitForHidden(locator: LocatorOrSelector, timeout = this.defaultTimeout) {
    const element = this.toLocator(locator);
    await element.waitFor({ state: 'hidden', timeout });
  }

  /** Wait until element is visible or attach to DOM */
  async waitForVisible(locator: LocatorOrSelector, timeout = this.defaultTimeout) {
    const element = this.toLocator(locator);
    await element.waitFor({ state: 'visible', timeout });
  }

  /** Reload the page and wait for stability */
  async reload(waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle') {
    await this.page.reload({ waitUntil, timeout: this.longTimeout });
  }

  /** Wait for page title to match expected text */
  async waitForTitle(expectedTitle: string, timeout = this.defaultTimeout) {
    await expect(this.page).toHaveTitle(expectedTitle, { timeout });
  }

  /** Wait for URL to contain a specific substring */
  async waitForUrlContains(substring: string, timeout = this.defaultTimeout) {
    await expect(this.page).toHaveURL(new RegExp(substring), { timeout });
  }

  /** Wait until network is idle — good for post-action stability */
  async waitForNetworkIdle(timeout = this.longTimeout) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /** Utility to convert string | Locator → Locator */
  protected toLocator(locator: LocatorOrSelector): Locator {
    return typeof locator === 'string' ? this.page.locator(locator) : locator;
  }
}
