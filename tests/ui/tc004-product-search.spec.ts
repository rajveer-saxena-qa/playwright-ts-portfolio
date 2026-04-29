import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';

test.describe('Product Search and Filter Tests', () => {

  test('TC009 - Search for valid product', { tag: ['@smoke', '@ui'] }, async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigateToHome();
    await homePage.clickProducts();
    await productsPage.searchProduct('Top');

    expect(await productsPage.isSearchResultsVisible()).toBeTruthy();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('TC010 - Search for invalid product', { tag: ['@regression', '@ui'] }, async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigateToHome();
    await homePage.clickProducts();
    await productsPage.searchProduct('xyzproductnotexist123');

    expect(await productsPage.isSearchResultsVisible()).toBeTruthy();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBe(0);
  });

  test('TC011 - Filter products by Women category', { tag: ['@regression', '@ui'] }, async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigateToHome();
    await homePage.clickProducts();
    await productsPage.filterByWomenCategory();

    expect(await productsPage.isProductsListVisible()).toBeTruthy();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('TC012 - Filter products by Men category', { tag: ['@regression', '@ui'] }, async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigateToHome();
    await homePage.clickProducts();
    await productsPage.filterByMenCategory();

    expect(await productsPage.isProductsListVisible()).toBeTruthy();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('TC013 - Filter products by Polo brand', { tag: ['@regression', '@ui'] }, async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigateToHome();
    await homePage.clickProducts();
    await productsPage.filterByPoloBrand();

    expect(await productsPage.isProductsListVisible()).toBeTruthy();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});