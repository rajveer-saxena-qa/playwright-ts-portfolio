import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

// HomePage represents the main landing page of automationexercise.com
// Contains locators and actions specific to home page
// Extends BasePage to inherit all common methods like goto, click, fill
export class HomePage extends BasePage {

  // Defining all locators as readonly class properties
  // Keeping locators at top makes them easy to find and update
  readonly signupLoginButton: Locator;
  readonly loggedInAsText: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly cartButton: Locator;
  readonly productsButton: Locator;
  readonly homePageLogo: Locator;
  readonly searchProductsButton: Locator;

  // Constructor receives page from Playwright test
  // Calls super to pass page to BasePage
  // All locators are initialized here
  constructor(page: Page) {
    super(page);

    // Navigation bar locators
    this.signupLoginButton = page.locator('a[href="/login"]');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.deleteAccountButton = page.locator('a[href="/delete_account"]');
    this.cartButton = page.locator('a[href="/view_cart"]');
    this.productsButton = page.locator('a[href="/products"]');

    // Home page specific locators
    this.homePageLogo = page.locator('#header .logo img');
    this.loggedInAsText = page.locator('li:has-text("Logged in as")');
    this.searchProductsButton = page.locator('a[href="/products"]');
  }

  // Navigate to home page
  async navigateToHome() {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  // Click signup login button in navigation
  async clickSignupLogin() {
    await this.click(this.signupLoginButton);
    await this.waitForPageLoad();
  }

  // Click logout button in navigation
  async clickLogout() {
    await this.click(this.logoutButton);
    await this.waitForPageLoad();
  }

  // Click cart button in navigation
  async clickCart() {
    await this.click(this.cartButton);
    await this.waitForPageLoad();
  }

  // Click products button in navigation
  async clickProducts() {
    await this.click(this.productsButton);
    await this.waitForPageLoad();
  }

  // Check if user is logged in by looking for logged in as text
  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.loggedInAsText);
  }

  // Get the logged in username from navigation
  async getLoggedInUsername(): Promise<string> {
    return await this.getText(this.loggedInAsText);
  }

  // Check if home page logo is visible to confirm we are on home page
  async isOnHomePage(): Promise<boolean> {
    return await this.isVisible(this.homePageLogo);
  }
}
