import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { ProductsPage } from '../../pages/productsPage';
import { ProductDetailPage } from '../../pages/productDetailPage';
import { CartPage } from '../../pages/cartPage';

// TC008 covers search to cart end to end journey
// User logs in, searches for specific product,
// filters by category, adds to cart and verifies
// Uses apiUser fixture for login
test.describe('Search to Cart E2E', () => {

  test('TC020 - Search product filter and add to cart',
    { tag: ['@smoke', '@e2e'] }, async ({ page, apiUser }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    // STEP 1 - Login with fixture user
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
    await loginPage.login(apiUser.email, apiUser.password);

    // Verify logged in
    expect(await homePage.isLoggedIn()).toBeTruthy();

    // STEP 2 - Navigate to products
    await homePage.clickProducts();

    

    // STEP 3 - Search for product
    await productsPage.searchProduct('Top');

    // Verify search results visible
    expect(await productsPage.isSearchResultsVisible()).toBeTruthy();

    // Verify search returned results
    const searchCount = await productsPage.getProductCount();
    expect(searchCount).toBeGreaterThan(0);

    // STEP 4 - View first search result
    await productsPage.viewFirstProduct();

    // Verify on product detail page
    expect(await productDetailPage.isOnProductDetailPage()).toBeTruthy();

    // Get product details for later verification
    const productName = await productDetailPage.getProductName();
    const productPrice = await productDetailPage.getProductPrice();

    // Verify product details are not empty
    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();

    // STEP 5 - Add product to cart with quantity 2
    await productDetailPage.addToCart(2);

    // Verify cart modal appeared
    expect(await productDetailPage.isCartModalVisible()).toBeTruthy();

    // STEP 6 - Go to cart and verify
    await productDetailPage.clickViewCart();

    // Verify on cart page
    expect(await cartPage.isOnCartPage()).toBeTruthy();

    // Verify cart is not empty
    expect(await cartPage.isCartNotEmpty()).toBeTruthy();

    // Verify correct product is in cart
    const cartProductNames = await cartPage.getCartProductNames();
    expect(cartProductNames[0]).toContain(productName);

    // Verify quantity is 2
    const quantity = await cartPage.cartProductQuantities.first().innerText();
    expect(quantity).toBe('2');

    // Verify cart has exactly 1 unique product
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);
  });

  // TC021 - Search filter by category then add to cart
  test('TC021 - Filter by category and add to cart',
    { tag: ['@regression', '@e2e'] }, async ({ page, apiUser }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    // STEP 1 - Login
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
    await loginPage.login(apiUser.email, apiUser.password);

    // Verify logged in
    expect(await homePage.isLoggedIn()).toBeTruthy();

    // STEP 2 - Go to products and filter by Women category
    await homePage.clickProducts();
   

    // Filter by Women category
    await productsPage.filterByWomenCategory();

    // Verify products visible after filter
    expect(await productsPage.isProductsListVisible()).toBeTruthy();

    // Verify filtered results not empty
    const filteredCount = await productsPage.getProductCount();
    expect(filteredCount).toBeGreaterThan(0);

    // STEP 3 - View and add first filtered product
    await productsPage.viewFirstProduct();
    expect(await productDetailPage.isOnProductDetailPage()).toBeTruthy();

    // Get product name
    const productName = await productDetailPage.getProductName();

    // Add to cart
    await productDetailPage.addToCart(1);
    expect(await productDetailPage.isCartModalVisible()).toBeTruthy();

    // STEP 4 - Verify in cart
    await productDetailPage.clickViewCart();
    expect(await cartPage.isOnCartPage()).toBeTruthy();
    expect(await cartPage.isCartNotEmpty()).toBeTruthy();

    // Verify correct filtered product is in cart
    const cartProductNames = await cartPage.getCartProductNames();
    expect(cartProductNames[0]).toContain(productName);
  });
});