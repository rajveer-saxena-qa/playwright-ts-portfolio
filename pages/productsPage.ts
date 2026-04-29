import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

// ProductsPage represents the products listing page of automationexercise.com
// URL is /products and contains product list, search and filter functionality
// Contains all locators and actions for product search and filter flows
export class ProductsPage extends BasePage {

  // Search section locators
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultsHeading: Locator;

  // Products list locators
  readonly productsList: Locator;
  readonly productCards: Locator;
  readonly firstProductViewButton: Locator;
  readonly allProductsHeading: Locator;

  // Category filter locators on left sidebar
  readonly womenCategoryLink: Locator;
  readonly menCategoryLink: Locator;
  readonly kidsCategoryLink: Locator;

  // Brand filter locators on right sidebar
  readonly poloBrandLink: Locator;
  readonly hmBrandLink: Locator;
  readonly madameBrandLink: Locator;

  // Constructor receives page from Playwright test
  // Calls super to pass page to BasePage
  constructor(page: Page) {
    super(page);

    // Search section locators
    this.searchInput = page.locator('input#search_product');
    this.searchButton = page.locator('button#submit_search');
    this.searchResultsHeading = page.locator('h2:has-text("Searched Products")');

    // Products list locators
    this.productsList = page.locator('.features_items');
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.firstProductViewButton = page.locator('.features_items .product-image-wrapper').first().locator('a:has-text("View Product")');
    this.allProductsHeading = page.locator('h2:has-text("All Products")');

    // Category filter locators
    this.womenCategoryLink = page.locator('a[href="#Women"]');
    this.menCategoryLink = page.locator('a[href="#Men"]');
    this.kidsCategoryLink = page.locator('a[href="#Kids"]');

    // Brand filter locators
    this.poloBrandLink = page.locator('.brands-name a:has-text("Polo")');
    this.hmBrandLink = page.locator('.brands-name a:has-text("H&M")');
    this.madameBrandLink = page.locator('.brands-name a:has-text("Madame")');
  }

  // Navigate directly to products page
  async navigateToProductsPage() {
    await this.goto('/products');
    await this.waitForPageLoad();
  }

  // Search for a product by keyword
  // Scroll to search input first as it may be below fold
  async searchProduct(keyword: string) {
  // Navigate directly to products page to ensure search input is available
  await this.page.goto('/products');
  await this.searchInput.waitFor({ state: 'visible', timeout: 20000 });
  await this.fill(this.searchInput, keyword);
  await this.click(this.searchButton);
  await this.waitForPageLoad();
}

  // Get count of products currently visible on page
  // Used to verify search and filter results
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  // Click view product button on first product in list
  // Added retry logic for ad intercept issues
  async viewFirstProduct() {
    await this.scrollToElement(this.firstProductViewButton);
    try {
      await this.click(this.firstProductViewButton);
      await this.page.waitForURL('**/product_details/**', { timeout: 10000 });
    } catch {
      // Retry once if ad intercepted the click
      await this.click(this.firstProductViewButton);
      await this.page.waitForURL('**/product_details/**', { timeout: 10000 });
    }
    await this.waitForPageLoad();
  }

  // Filter products by Women category
  // Women link is accordion toggle need to click subcategory after
 async filterByWomenCategory() {
  await this.scrollToElement(this.womenCategoryLink);
  await this.click(this.womenCategoryLink);
  await this.page.evaluate(() => {
    const link = document.querySelector('#Women a') as HTMLElement;
    if (link) link.click();
  });
  // Wait for URL change instead of products list
  await this.page.waitForURL('**/category_products/**', { timeout: 20000 });
  await this.waitForPageLoad();
}
  // Filter products by Men category
  // Using page evaluate to click hidden accordion element via JavaScript
  // bypasses Playwright visibility check for hidden elements
  async filterByMenCategory() {
  await this.scrollToElement(this.menCategoryLink);
  await this.click(this.menCategoryLink);
  await this.page.evaluate(() => {
    const link = document.querySelector('#Men a') as HTMLElement;
    if (link) link.click();
  });
  // Wait for products list to appear after category filter
  await this.waitForElement(this.productsList);
  await this.waitForPageLoad();
}
  // Filter products by Kids category
  async filterByKidsCategory() {
    await this.scrollToElement(this.kidsCategoryLink);
    await this.click(this.kidsCategoryLink);
    const kidsSubCategory = this.page.locator('#Kids a').first();
    await this.waitForElement(kidsSubCategory);
    await kidsSubCategory.click();
    await this.waitForPageLoad();
  }

  // Filter products by Polo brand
  // Added waitForURL to handle page reload after brand filter
  async filterByPoloBrand() {
    await this.scrollToElement(this.poloBrandLink);
    await this.click(this.poloBrandLink);

    await this.page.waitForURL('**/brand_products/**');
    await this.waitForPageLoad();
  }

  // Filter products by H&M brand
  async filterByHmBrand() {
    await this.scrollToElement(this.hmBrandLink);
    await this.click(this.hmBrandLink);

    await this.page.waitForURL('**/brand_products/**');
    await this.waitForPageLoad();
  }

  // Filter products by Madame brand
  async filterByMadameBrand() {
    await this.scrollToElement(this.madameBrandLink);
    await this.click(this.madameBrandLink);

    await this.page.waitForURL('**/brand_products/**');
    await this.waitForPageLoad();
  }

  // Check if on products page using URL
  // More reliable than heading locator on this app
  async isOnProductsPage(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/products**', { timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  // Check if search results heading is visible
  // Confirms search was performed
  async isSearchResultsVisible(): Promise<boolean> {
    return await this.isVisible(this.searchResultsHeading);
  }

  // Check if products list is visible and not empty
  async isProductsListVisible(): Promise<boolean> {
    return await this.isVisible(this.productsList);
  }
}