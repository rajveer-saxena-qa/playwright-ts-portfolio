import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { RegisterPage } from '../../pages/registerPage';
import { ProductsPage } from '../../pages/productsPage';
import { ProductDetailPage } from '../../pages/productDetailPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { testUser } from '../../testdata/testUser';

// TC007 is the ultimate end to end test
// Covers complete user journey from registration to order placement
// No fixture used here because we are testing registration itself
// User is created via UI and deleted via API after test
test.describe('Register to Checkout E2E', () => {

  test('TC019 - Complete journey from registration to order placement',
    { tag: ['@smoke', '@e2e'] }, async ({ page, request }) => {

    // Initializing all page objects needed for this journey
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Generate unique email for this test run
    const uniqueEmail = `e2e.test${Date.now()}@test.com`;

    // STEP 1 - Register new user via UI
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();

    // Verify signup form is visible
    expect(await loginPage.isSignupFormVisible()).toBeTruthy();

    // Fill signup details with unique email
    await loginPage.fillSignupDetails(testUser.name, uniqueEmail);

    // Verify registration form appeared
    expect(await registerPage.isRegisterFormVisible()).toBeTruthy();

    // Fill complete registration form
    await registerPage.fillRegistrationForm(testUser);
    await registerPage.submitRegistrationForm();

    // Verify account created successfully
    expect(await registerPage.isAccountCreated()).toBeTruthy();

    // Click continue to proceed to home page
    await registerPage.clickContinue();

    // Verify user is logged in after registration
    expect(await homePage.isLoggedIn()).toBeTruthy();

    // STEP 2 - Search and find a product
    await homePage.clickProducts();

    // Verify on products page
    expect(await productsPage.isOnProductsPage()).toBeTruthy();

    // Search for a specific product
    await productsPage.searchProduct('Top');

    // Verify search results appeared
    expect(await productsPage.isSearchResultsVisible()).toBeTruthy();

    // Verify at least one product found
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // STEP 3 - View product and add to cart
    await productsPage.viewFirstProduct();

    // Verify on product detail page
    expect(await productDetailPage.isOnProductDetailPage()).toBeTruthy();

    // Get product name for later verification
    const productName = await productDetailPage.getProductName();

    // Add product to cart
    await productDetailPage.addToCart(1);

    // Verify cart modal appeared
    expect(await productDetailPage.isCartModalVisible()).toBeTruthy();

    // STEP 4 - Go to cart and verify
    await productDetailPage.clickViewCart();

    // Verify on cart page
    expect(await cartPage.isOnCartPage()).toBeTruthy();

    // Verify cart has items
    expect(await cartPage.isCartNotEmpty()).toBeTruthy();

    // Verify correct product is in cart
    const cartProductNames = await cartPage.getCartProductNames();
    expect(cartProductNames[0]).toContain(productName);

    // STEP 5 - Proceed to checkout
    await cartPage.proceedToCheckout();

    // Verify on checkout page
    expect(await checkoutPage.isOnCheckoutPage()).toBeTruthy();

    // Add order comment
    await checkoutPage.addOrderComment('E2E test order - please ignore');

    // Place order
    await checkoutPage.clickPlaceOrder();

    // STEP 6 - Complete payment
    await checkoutPage.completePayment(
      testUser.name,
      '4111111111111111',
      '123',
      '12',
      '2027'
    );

    // Verify order placed successfully
    expect(await checkoutPage.isOrderPlacedSuccessfully()).toBeTruthy();

    // Click continue after order confirmation
    await checkoutPage.clickContinue();

    // Verify back on home page
    expect(await homePage.isOnHomePage()).toBeTruthy();

    // STEP 7 - Cleanup - Delete user via API after test
    // Since we registered via UI we need to cleanup via API
    await request.delete('/api/deleteAccount', {
      form: {
        email: uniqueEmail,
        password: testUser.password
      }
    });
  });
});