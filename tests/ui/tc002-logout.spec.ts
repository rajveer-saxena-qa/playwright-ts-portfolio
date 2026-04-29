import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';

// TC002 covers logout flow
// User must be logged in first before logout can be tested
// Uses apiUser fixture to create real user and login before testing logout
test.describe('Logout Tests', () => {

  // TC004 - Logout after valid login
  // Uses apiUser fixture to get real user created via API
  test('TC004 - Logout after valid login', { tag: ['@smoke', '@ui'] }, async ({ page, apiUser }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Navigate to home page
    await homePage.navigateToHome();

    // Go to login page
    await homePage.clickSignupLogin();

    // Login with real user from fixture
    await loginPage.login(apiUser.email, apiUser.password);

    // Verify user is logged in before testing logout
    expect(await homePage.isLoggedIn()).toBeTruthy();

    // Click logout button in navigation
    await homePage.clickLogout();

    // Verify user is redirected to login page after logout
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();

    // Verify user is no longer logged in
    expect(await homePage.isLoggedIn()).toBeFalsy();
  });

  // TC005 - Verify user cannot access account after logout
  test('TC005 - Cannot access account after logout',
  { tag: ['@regression', '@ui'] }, async ({ page, apiUser }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHome();
  await homePage.clickSignupLogin();
  await loginPage.login(apiUser.email, apiUser.password);
  expect(await homePage.isLoggedIn()).toBeTruthy();

  // Logout
  await homePage.clickLogout();

  // Verify on login page after logout
  expect(await loginPage.isLoginFormVisible()).toBeTruthy();

  // Navigate back to home
  await homePage.navigateToHome();

  // Verify login button visible meaning user is logged out
  expect(await homePage.isVisible(homePage.signupLoginButton)).toBeTruthy();
});
});