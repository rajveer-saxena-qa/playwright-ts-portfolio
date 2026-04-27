import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

// ProductsPage represents the products listing page of automationexercise.com
// URL is /products and contains product list, search and filter functionality
// Contains all locators and actions for product search and filter flows
export class ProductsPage extends BasePage {

  // Search section locators
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultsHeading: Locator

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
  // Clears existing text first to avoid appending to previous search
  async searchProduct(keyword: string) {
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
  async filterByWomenCategory() {
    await this.scrollToElement(this.womenCategoryLink);
    await this.click(this.womenCategoryLink);
    await this.waitForPageLoad();
  }

  // Filter products by Men category
  async filterByMenCategory() {
    await this.scrollToElement(this.menCategoryLink);
    await this.click(this.menCategoryLink);
    await this.waitForPageLoad();
  }

  // Filter products by Polo brand
  async filterByPoloBrand() {
    await this.scrollToElement(this.poloBrandLink);
    await this.click(this.poloBrandLink);
    await this.waitForPageLoad();
  }

  // Check if all products heading is visible
  // Confirms we are on products page
  async isOnProductsPage(): Promise<boolean> {
    return await this.isVisible(this.allProductsHeading);
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