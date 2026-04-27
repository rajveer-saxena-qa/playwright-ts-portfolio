import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

// LoginPage represents the login and signup page of automationexercise.com
// URL is /login but it contains both login and signup sections
// Contains all locators and actions for login and logout flows
export class LoginPage extends BasePage {

  // Login section locators
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly loginFormHeading: Locator;

  // Signup section locators
  // Signup here is just name and email to start registration
  // Full registration happens on next page
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;
  readonly signupFormHeading: Locator;

  // Constructor receives page from Playwright test
  // Calls super to pass page to BasePage
  // All locators are initialized here
  constructor(page: Page) {
    super(page);

    // Login form locators
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
    this.loginFormHeading = page.locator('h2:has-text("Login to your account")');

    // Signup form locators
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('p:has-text("Email Address already exist!")');
    this.signupFormHeading = page.locator('h2:has-text("New User Signup!")');
  }

  // Navigate directly to login page
  async navigateToLoginPage() {
    await this.goto('/login');
    await this.waitForPageLoad();
  }

  // Login with given email and password
  // Used by tests that need to login before doing other actions
  async login(email: string, password: string) {
    await this.fill(this.loginEmailInput, email);
    await this.fill(this.loginPasswordInput, password);
    await this.click(this.loginButton);
    await this.waitForPageLoad();
  }

  // Fill signup name and email to start registration flow
  // This only fills first step, full registration is on next page
  async fillSignupDetails(name: string, email: string) {
    await this.fill(this.signupNameInput, name);
    await this.fill(this.signupEmailInput, email);
    await this.click(this.signupButton);
    await this.waitForPageLoad();
  }

  // Check if login form is visible on page
  async isLoginFormVisible(): Promise<boolean> {
    return await this.isVisible(this.loginFormHeading);
  }

  // Check if signup form is visible on page
  async isSignupFormVisible(): Promise<boolean> {
    return await this.isVisible(this.signupFormHeading);
  }

  // Check if login error message is visible
  // Used in negative test cases for wrong credentials
  async isLoginErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.loginErrorMessage);
  }

  // Check if signup error message is visible
  // Used in negative test cases for already registered email
  async isSignupErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.signupErrorMessage);
  }
}