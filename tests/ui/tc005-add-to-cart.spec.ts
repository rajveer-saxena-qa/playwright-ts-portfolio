import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { ProductDetailPage } from '../../pages/productDetailPage';
import { CartPage } from '../../pages/cartPage';

// TC005 covers add to cart functionality
// Tests adding products from product detail page
// and verifying they appear correctly in cart
test.describe('Add to Cart Tests', () => {

  // TC014 - Add single product to cart
  test('TC014 - Add single product to cart', { tag: ['@smoke', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    // Navigate to products page
    await homePage.navigateToHome();
    await homePage.clickProducts();

    
    // Get name of first product before clicking
    await productsPage.viewFirstProduct();

    // Verify we are on product detail page
    expect(await productDetailPage.isOnProductDetailPage()).toBeTruthy();

    // Get product name and price for later assertion
    const productName = await productDetailPage.getProductName();
    const productPrice = await productDetailPage.getProductPrice();

    // Add product to cart with default quantity of 1
    await productDetailPage.addToCart(1);

    // Verify success modal appeared after adding to cart
    expect(await productDetailPage.isCartModalVisible()).toBeTruthy();

    // Click view cart to go to cart page
    await productDetailPage.clickViewCart();

    // Verify we are on cart page
    expect(await cartPage.isOnCartPage()).toBeTruthy();

    // Verify cart has exactly 1 item
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    // Verify correct product name appears in cart
    const cartProductNames = await cartPage.getCartProductNames();
    expect(cartProductNames[0]).toContain(productName);
  });

  // TC015 - Add product with custom quantity to cart
  test('TC015 - Add product with custom quantity', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    // Navigate to products page
    await homePage.navigateToHome();
    await homePage.clickProducts();

    // View first product
    await productsPage.viewFirstProduct();

    // Add product with quantity of 3
    await productDetailPage.addToCart(3);

    // Verify success modal appeared
    expect(await productDetailPage.isCartModalVisible()).toBeTruthy();

    // Go to cart
    await productDetailPage.clickViewCart();

    // Verify cart is not empty
    expect(await cartPage.isCartNotEmpty()).toBeTruthy();

    // Verify quantity shows 3 in cart
    const quantity = await cartPage.cartProductQuantities.first().innerText();
    expect(quantity).toBe('3');
  });
  // TC016 - Continue shopping after adding to cart
test('TC016 - Continue shopping after adding to cart',
  { tag: ['@regression', '@ui'] }, async ({ page }) => {

  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const productDetailPage = new ProductDetailPage(page);

  await homePage.navigateToHome();
  await homePage.clickProducts();
  await productsPage.viewFirstProduct();

  // Verify on product detail page before adding to cart
  expect(await productDetailPage.isOnProductDetailPage()).toBeTruthy();

  // Add product to cart with default quantity
  await productDetailPage.addToCart(1);

  // Verify modal appeared
  expect(await productDetailPage.isCartModalVisible()).toBeTruthy();

  // Click continue shopping
  await productDetailPage.clickContinueShopping();

  // Verify still on product detail page after continuing
  expect(await productDetailPage.isOnProductDetailPage()).toBeTruthy();
});
});
