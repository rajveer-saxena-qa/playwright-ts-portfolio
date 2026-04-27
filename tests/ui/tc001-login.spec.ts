import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';

// TC001 covers login flow with valid and invalid credentials
// Uses apiUser fixture to create a real user before test
// and delete it after test completes automatically
test.describe('Login Tests', () => {

  // TC001 - Login with valid credentials
  // Uses apiUser fixture to get real user created via API
  test('TC001 - Login with valid credentials', { tag: ['@smoke', '@ui'] }, async ({ page, apiUser }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Navigate to home page first
    await homePage.navigateToHome();

    // Click signup login button in navigation
    await homePage.clickSignupLogin();

    // Verify login form is visible before filling
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();

    // Login with credentials from apiUser fixture
    // apiUser is a real user created via API before this test
    await loginPage.login(apiUser.email, apiUser.password);

    // Verify user is logged in by checking logged in as text
    expect(await homePage.isLoggedIn()).toBeTruthy();

    // Verify correct username is shown in navigation
    const loggedInText = await homePage.getLoggedInUsername();
    expect(loggedInText).toContain(apiUser.name);
  });

  // TC002 - Login with invalid credentials
  // No fixture needed as we are not creating a real user
  test('TC002 - Login with invalid credentials', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Navigate to home page first
    await homePage.navigateToHome();

    // Click signup login button in navigation
    await homePage.clickSignupLogin();

    // Login with wrong credentials
    await loginPage.login('invalid@test.com', 'wrongpassword');

    // Verify error message is shown for invalid credentials
    expect(await loginPage.isLoginErrorVisible()).toBeTruthy();

    // Verify user is not logged in
    expect(await homePage.isLoggedIn()).toBeFalsy();
  });

  // TC003 - Login with blank credentials
  test('TC003 - Login with blank credentials', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Navigate to home page first
    await homePage.navigateToHome();

    // Click signup login button in navigation
    await homePage.clickSignupLogin();

    // Try to login with blank email and password
    await loginPage.login('', '');

    // Verify user is still on login page
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();

    // Verify user is not logged in
    expect(await homePage.isLoggedIn()).toBeFalsy();
  });
});