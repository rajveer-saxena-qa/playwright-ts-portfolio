import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { TestUser } from '../testdata/testUser';

// RegisterPage represents the full registration form page
// This page appears after filling name and email on login page
// and clicking signup button
// URL is /signup and contains all personal and address details
export class RegisterPage extends BasePage {

  // Account information section locators
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly passwordInput: Locator;
  readonly birthDaySelect: Locator;
  readonly birthMonthSelect: Locator;
  readonly birthYearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  // Address information section locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  // Form action locators
  readonly createAccountButton: Locator;
  readonly accountCreatedHeading: Locator;
  readonly continueButton: Locator;
  readonly registerFormHeading: Locator;

  // Constructor receives page from Playwright test
  // Calls super to pass page to BasePage
  constructor(page: Page) {
    super(page);

    // Account information locators
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.birthDaySelect = page.locator('select[data-qa="days"]');
    this.birthMonthSelect = page.locator('select[data-qa="months"]');
    this.birthYearSelect = page.locator('select[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');

    // Address information locators
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.address1Input = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');

    // Form action locators
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedHeading = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
    this.registerFormHeading = page.locator('h2:has-text("Enter Account Information")');
  }

  // Fill complete registration form using testUser data
  // Accepts TestUser type from testdata for type safety
  async fillRegistrationForm(user: TestUser) {

    // Select title based on user data
    if (user.title === 'Mr') {
      await this.click(this.titleMrRadio);
    } else {
      await this.click(this.titleMrsRadio);
    }

    // Fill account information
    await this.fill(this.passwordInput, user.password);

    // Select date of birth dropdowns
    await this.birthDaySelect.selectOption(user.birth_date);
    await this.birthMonthSelect.selectOption(user.birth_month);
    await this.birthYearSelect.selectOption(user.birth_year);

    // Check newsletter and special offers checkboxes
    await this.click(this.newsletterCheckbox);
    await this.click(this.specialOffersCheckbox);

    // Fill address information
    await this.fill(this.firstNameInput, user.firstname);
    await this.fill(this.lastNameInput, user.lastname);
    await this.fill(this.companyInput, user.company);
    await this.fill(this.address1Input, user.address1);
    await this.fill(this.address2Input, user.address2);

    // Select country from dropdown
    await this.countrySelect.selectOption(user.country);

    // Fill remaining address fields
    await this.fill(this.stateInput, user.state);
    await this.fill(this.cityInput, user.city);
    await this.fill(this.zipcodeInput, user.zipcode);
    await this.fill(this.mobileNumberInput, user.mobile_number);
  }

  // Click create account button after filling form
  async submitRegistrationForm() {
    await this.click(this.createAccountButton);
    await this.waitForPageLoad();
  }

  // Click continue button after account is created
  // Added wait for navigation to complete after continue click
  async clickContinue() {
    await this.click(this.continueButton);
    // Wait for URL to change away from account_created page
    await this.page.waitForURL('**/', { timeout: 10000 });
    await this.waitForPageLoad();
  }

  // Check if registration form is visible
  async isRegisterFormVisible(): Promise<boolean> {
    return await this.isVisible(this.registerFormHeading);
  }

  // Check if account created success message is visible
  // Added explicit wait before checking to handle slow page load
  async isAccountCreated(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/account_created**', { timeout: 10000 });
      return await this.isVisible(this.accountCreatedHeading);
    } catch {
      return false;
    }
  }
}