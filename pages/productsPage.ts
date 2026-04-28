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
    // Wait for products heading to confirm page is fully loaded
    await this.waitForElement(this.allProductsHeading);
}

  // Search for a product by keyword
  // Added explicit wait for search input to be visible before filling
  async searchProduct(keyword: string) {
    // Wait for search input to be visible before interacting
    await this.waitForElement(this.searchInput);
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
  // Used to navigate to product detail page
  async viewFirstProduct() {
    await this.scrollToElement(this.firstProductViewButton);
    await this.click(this.firstProductViewButton);
    await this.waitForPageLoad();
  }
// Filter products by Women category
// Women link is an accordion toggle, need to click subcategory after
async filterByWomenCategory() {
  await this.scrollToElement(this.womenCategoryLink);
  await this.click(this.womenCategoryLink);
  // Click first subcategory under Women after accordion opens
  const womenSubCategory = this.page.locator('#Women a').first();
  await this.waitForElement(womenSubCategory);
  await womenSubCategory.click();
  await this.waitForPageLoad();
}

// Filter products by Men category
// Men link is an accordion toggle, need to click subcategory after
async filterByMenCategory() {
  await this.scrollToElement(this.menCategoryLink);
  await this.click(this.menCategoryLink);
  // Click first subcategory under Men after accordion opens
  const menSubCategory = this.page.locator('#Men a').first();
  await this.waitForElement(menSubCategory);
  await menSubCategory.click();
  await this.waitForPageLoad();
}

// Filter products by Kids category
async filterByKidsCategory() {
  await this.scrollToElement(this.kidsCategoryLink);
  await this.click(this.kidsCategoryLink);
  // Click first subcategory under Kids after accordion opens
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
    // Wait for URL to change after brand filter is applied
    await this.page.waitForURL('**/brand_products/**');
    await this.waitForPageLoad();
  }

  // Filter products by H&M brand
  async filterByHmBrand() {
    await this.scrollToElement(this.hmBrandLink);
    await this.click(this.hmBrandLink);
    // Wait for URL to change after brand filter is applied
    await this.page.waitForURL('**/brand_products/**');
    await this.waitForPageLoad();
  }

  // Filter products by Madame brand
  async filterByMadameBrand() {
    await this.scrollToElement(this.madameBrandLink);
    await this.click(this.madameBrandLink);
    // Wait for URL to change after brand filter is applied
    await this.page.waitForURL('**/brand_products/**');
    await this.waitForPageLoad();
  }

   // Check if all products heading is visible
   // Added explicit wait to handle slow page load on this app
   async isOnProductsPage(): Promise<boolean> {
     try {
       await this.waitForElement(this.allProductsHeading);
       return await this.isVisible(this.allProductsHeading);
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