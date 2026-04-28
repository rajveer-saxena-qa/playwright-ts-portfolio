import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';

// TC004 covers product search and filter functionality
// No login required for searching and browsing products
test.describe('Product Search and Filter Tests', () => {

  // TC009 - Search for a valid product
  test('TC009 - Search for valid product', { tag: ['@smoke', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    // Navigate to home page
    await homePage.navigateToHome();

    // Go to products page
    await homePage.clickProducts();

    // Verify we are on products page
    expect(await productsPage.isOnProductsPage()).toBeTruthy();

    // Search for a product by keyword
    await productsPage.searchProduct('Top');

    // Verify search results heading is visible
    expect(await productsPage.isSearchResultsVisible()).toBeTruthy();

    // Verify search returned at least one product
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  // TC010 - Search for a product that does not exist
  test('TC010 - Search for invalid product', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    // Navigate to home page
    await homePage.navigateToHome();

    // Go to products page
    await homePage.clickProducts();

    // Search for a product that does not exist
    await productsPage.searchProduct('xyzproductnotexist123');

    // Verify search results heading is visible
    expect(await productsPage.isSearchResultsVisible()).toBeTruthy();

    // Verify no products are returned for invalid search
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBe(0);
  });

  // TC011 - Filter products by Women category
  test('TC011 - Filter products by Women category', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    // Navigate to products page
    await homePage.navigateToHome();
    await homePage.clickProducts();

    // Verify we are on products page
    expect(await productsPage.isOnProductsPage()).toBeTruthy();

    // Filter by Women category
    await productsPage.filterByWomenCategory();

    // Verify products list is visible after filtering
    expect(await productsPage.isProductsListVisible()).toBeTruthy();

    // Verify at least one product is returned
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  // TC012 - Filter products by Men category
  test('TC012 - Filter products by Men category', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    // Navigate to products page
    await homePage.navigateToHome();
    await homePage.clickProducts();

    // Filter by Men category
    await productsPage.filterByMenCategory();

    // Verify products list is visible after filtering
    expect(await productsPage.isProductsListVisible()).toBeTruthy();

    // Verify at least one product is returned
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  // TC013 - Filter products by Polo brand
  test('TC013 - Filter products by Polo brand', { tag: ['@regression', '@ui'] }, async ({ page }) => {

    // Initializing page objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    // Navigate to products page
    await homePage.navigateToHome();
    await homePage.clickProducts();

    // Filter by Polo brand
    await productsPage.filterByPoloBrand();

    // Verify products list is visible after filtering
    expect(await productsPage.isProductsListVisible()).toBeTruthy();

    // Verify at least one product is returned
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});