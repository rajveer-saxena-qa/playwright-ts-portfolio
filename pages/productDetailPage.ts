import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

// ProductDetailPage represents a single product page
// URL is /product_details/{id}
// Contains product information and add to cart functionality
export class ProductDetailPage extends BasePage {

  // Product information locators
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

  // Add to cart section locators
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  // Success modal locators after adding to cart
  readonly cartSuccessModal: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  // Constructor receives page from Playwright test
  // Calls super to pass page to BasePage
  constructor(page: Page) {
    super(page);

    // Product information locators
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p:has-text("Category")');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p:has-text("Availability")');
    this.productCondition = page.locator('.product-information p:has-text("Condition")');
    this.productBrand = page.locator('.product-information p:has-text("Brand")');

    // Add to cart section locators
    this.quantityInput = page.locator('input#quantity');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');

    // Success modal locators
    this.cartSuccessModal = page.locator('#cartModal');
    this.viewCartLink = page.locator('#cartModal a:has-text("View Cart")');
    this.continueShoppingButton = page.locator('#cartModal button:has-text("Continue Shopping")');
  }

  // Get product name text from product detail page
  async getProductName(): Promise<string> {
    return await this.getText(this.productName);
  }

  // Get product price text from product detail page
  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  // Set quantity before adding to cart
  // Clears existing value first then types new quantity
  async setQuantity(quantity: number) {
    await this.quantityInput.clear();
    await this.fill(this.quantityInput, quantity.toString());
  }

// Add product to cart with given quantity
// Default quantity is 1 if not specified
async addToCart(quantity: number = 1) {
  // Wait for quantity input to be visible before interacting
  await this.waitForElement(this.quantityInput);
  await this.setQuantity(quantity);
  await this.click(this.addToCartButton);
  // Wait for success modal to appear after adding to cart
  await this.waitForElement(this.cartSuccessModal);
}

  // Click view cart link inside success modal
  // Navigates directly to cart page
  async clickViewCart() {
    await this.click(this.viewCartLink);
    await this.waitForPageLoad();
  }

  // Click continue shopping button inside success modal
  // Stays on products page to add more items
  async clickContinueShopping() {
    await this.click(this.continueShoppingButton);
    await this.waitForPageLoad();
  }

  // Check if success modal is visible after adding to cart
  async isCartModalVisible(): Promise<boolean> {
    return await this.isVisible(this.cartSuccessModal);
  }

 // Check if on product detail page
  async isOnProductDetailPage(): Promise<boolean> {
    try {
      await this.waitForElement(this.productName);
      return await this.isVisible(this.productName);
    } catch {
      return false;
    }
  }

  // Get all product details as an object
  // Useful for assertions in tests
  async getProductDetails(): Promise<{
    name: string;
    price: string;
    availability: string;
    condition: string;
    brand: string;
  }> {
    return {
      name: await this.getText(this.productName),
      price: await this.getText(this.productPrice),
      availability: await this.getText(this.productAvailability),
      condition: await this.getText(this.productCondition),
      brand: await this.getText(this.productBrand),
    };
  }
}