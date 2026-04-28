import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { ProductsPage } from '../../pages/productsPage';
import { ProductDetailPage } from '../../pages/productDetailPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';

// TC006 covers full checkout flow
// User must be logged in to complete checkout
// Uses apiUser fixture to create real user before test
test.describe('Checkout Tests', () => {

  // TC017 - Complete full checkout flow
  // This is the most important end to end test in the suite
  test('TC017 - Complete full checkout flow', { tag: ['@smoke', '@ui'] }, async ({ page, apiUser }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1 - Login with real user from fixture
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
    await loginPage.login(apiUser.email, apiUser.password);

    // Verify user is logged in before proceeding
    expect(await homePage.isLoggedIn()).toBeTruthy();

    // Step 2 - Navigate to products and add item to cart
    await homePage.clickProducts();
    await productsPage.viewFirstProduct();

    // Verify on product detail page
    expect(await productDetailPage.isOnProductDetailPage()).toBeTruthy();

    // Add product to cart
    await productDetailPage.addToCart(1);

    // Verify cart modal appeared
    expect(await productDetailPage.isCartModalVisible()).toBeTruthy();

    // Step 3 - Go to cart
    await productDetailPage.clickViewCart();

    // Verify cart has items
    expect(await cartPage.isCartNotEmpty()).toBeTruthy();

    // Step 4 - Proceed to checkout
    await cartPage.proceedToCheckout();

    // Verify we are on checkout page
    expect(await checkoutPage.isOnCheckoutPage()).toBeTruthy();

    // Verify delivery address is shown
    const deliveryFirstName = await checkoutPage.getDeliveryFirstName();
    expect(deliveryFirstName).toBeTruthy();

    // Step 5 - Add order comment and place order
    await checkoutPage.addOrderComment('Please deliver between 9am and 5pm');
    await checkoutPage.clickPlaceOrder();

    // Step 6 - Fill payment details with test card
    // Never use real card details in tests
    await checkoutPage.completePayment(
      apiUser.name,
      '4111111111111111',
      '123',
      '12',
      '2027'
    );

    // Verify order was placed successfully
    expect(await checkoutPage.isOrderPlacedSuccessfully()).toBeTruthy();

    // Click continue after order confirmation
    await checkoutPage.clickContinue();

    // Verify user is back on home page after order
    expect(await homePage.isOnHomePage()).toBeTruthy();
  });

  // TC018 - Verify checkout requires login
  // Tests that guest user is prompted to login during checkout
  test('TC018 - Checkout requires login', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    // Navigate to products without logging in
    await homePage.navigateToHome();
    await homePage.clickProducts();

    // Add product to cart
    await productsPage.viewFirstProduct();
    await productDetailPage.addToCart(1);
    await productDetailPage.clickViewCart();

    // Try to proceed to checkout without login
    await cartPage.proceedToCheckout();

    // Verify login modal appears for guest user
    expect(await cartPage.isCheckoutModalVisible()).toBeTruthy();
  });
});