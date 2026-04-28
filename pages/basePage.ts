import { Page, Locator } from '@playwright/test';

// Base page class that all other page classes will extend
// Contains common methods that are reused across all pages
// This avoids code duplication in every page object
export class BasePage {

  // Page object is available to all child classes
  readonly page: Page;

  // Constructor receives page from Playwright test
  // Every page class that extends BasePage gets this automatically
  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to a specific path on the app
  // baseURL from playwright.config.ts is prepended automatically
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  // Wait for page to fully load before interacting
  // Using domcontentloaded instead of networkidle
  // because automationexercise.com has continuous ad network requests
  // that prevent networkidle from ever settling
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Get page title text
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // Get current page URL
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Click any element by locator
  // Using force click to bypass ad overlays on automationexercise.com
  // Ads frequently cover elements and intercept pointer events
  async click(locator: Locator) {
    try {
    // Try normal click first
     await locator.click({ timeout: 5000 });
    } catch {
    // If normal click fails due to overlay, force click
     await locator.click({ force: true });
    }
   }

  // Fill any input field with given text
  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  // Get text content of any element
  async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  // Check if any element is visible on page
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  // Wait for a specific element to appear on page
  // Increased timeout to 15 seconds to handle slow ad heavy pages
  async waitForElement(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
  }
  
  // Scroll element into view before interacting
  // Useful for elements that are below the fold
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  // Take a screenshot with a meaningful name
  // Useful for debugging failures
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true
    });
  }
}