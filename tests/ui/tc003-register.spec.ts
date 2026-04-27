import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { RegisterPage } from '../../pages/registerPage';
import { testUser } from '../../testdata/testUser';

// TC003 covers user registration flow
// Uses unique email each time to avoid duplicate user errors
// Cleans up created user via API after test completes
test.describe('Register Tests', () => {

  // TC006 - Register new user with valid details
  test('TC006 - Register new user with valid details', { tag: ['@smoke', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    // Generate unique email to avoid duplicate user error
    const uniqueEmail = `rajveer.test${Date.now()}@test.com`;

    // Navigate to home page
    await homePage.navigateToHome();

    // Go to login page which also has signup section
    await homePage.clickSignupLogin();

    // Verify signup form is visible
    expect(await loginPage.isSignupFormVisible()).toBeTruthy();

    // Fill name and unique email in signup section
    await loginPage.fillSignupDetails(testUser.name, uniqueEmail);

    // Verify registration form is visible after clicking signup
    expect(await registerPage.isRegisterFormVisible()).toBeTruthy();

    // Fill complete registration form with testUser data
    await registerPage.fillRegistrationForm(testUser);

    // Submit registration form
    await registerPage.submitRegistrationForm();

    // Verify account was created successfully
    expect(await registerPage.isAccountCreated()).toBeTruthy();

    // Click continue to go to home page
    await registerPage.clickContinue();

    // Verify user is logged in after registration
    expect(await homePage.isLoggedIn()).toBeTruthy();

    // Verify correct username is shown after registration
    const loggedInText = await homePage.getLoggedInUsername();
    expect(loggedInText).toContain(testUser.name);
  });

  // TC007 - Register with already existing email
  // Uses apiUser fixture which creates a user before test
  // Then tries to register with same email to test duplicate error
  test('TC007 - Register with already existing email', { tag: ['@regression', '@ui'] }, async ({ page, apiUser }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Navigate to home page
    await homePage.navigateToHome();

    // Go to login page
    await homePage.clickSignupLogin();

    // Try to register with email that already exists
    // apiUser.email is an already created user from fixture
    await loginPage.fillSignupDetails(testUser.name, apiUser.email);

    // Verify error message is shown for duplicate email
    expect(await loginPage.isSignupErrorVisible()).toBeTruthy();
  });

  // TC008 - Register with blank name and email
  test('TC008 - Register with blank details', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Navigate to home page
    await homePage.navigateToHome();

    // Go to login page
    await homePage.clickSignupLogin();

    // Try to register with blank name and email
    await loginPage.fillSignupDetails('', '');

    // Verify user is still on login page
    expect(await loginPage.isSignupFormVisible()).toBeTruthy();
  });
});