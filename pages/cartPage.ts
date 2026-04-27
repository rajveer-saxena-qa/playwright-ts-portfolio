import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

// CartPage represents the shopping cart page of automationexercise.com
// URL is /view_cart
// Contains all locators and actions for cart review and management
export class CartPage extends BasePage {

  // Cart table locators
  readonly cartTable: Locator;
  readonly cartItems: Locator;
  readonly cartProductNames: Locator;
  readonly cartProductPrices: Locator;
  readonly cartProductQuantities: Locator;
  readonly cartProductTotals: Locator;

  // Cart action locators
  readonly proceedToCheckoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly cartPageHeading: Locator;

  // Login modal that appears when checkout clicked without login
  readonly checkoutLoginModal: Locator;
  readonly checkoutLoginButton: Locator;
  readonly checkoutRegisterButton: Locator;

  // Constructor receives page from Playwright test
  // Calls super to pass page to BasePage
  constructor(page: Page) {
    super(page);

    // Cart table locators
    this.cartTable = page.locator('#cart_info_table');
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.cartProductNames = page.locator('#cart_info_table .cart_description h4 a');
    this.cartProductPrices = page.locator('#cart_info_table .cart_price p');
    this.cartProductQuantities = page.locator('#cart_info_table .cart_quantity button');
    this.cartProductTotals = page.locator('#cart_info_table .cart_total p');

    // Cart action locators
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
    this.emptyCartMessage = page.locator('b:has-text("Cart is empty!")');
    this.cartPageHeading = page.locator('li:has-text("Shopping Cart")');

    // Login modal locators
    this.checkoutLoginModal = page.locator('#checkoutModal');
    this.checkoutLoginButton = page.locator('#checkoutModal a:has-text("Login")');
    this.checkoutRegisterButton = page.locator('#checkoutModal a:has-text("Register")');
  }

  // Navigate directly to cart page
  async navigateToCart() {
    await this.goto('/view_cart');
    await this.waitForPageLoad();
  }

  // Get count of items currently in cart
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  // Get names of all products in cart as array
  // Useful for asserting specific products are in cart
  async getCartProductNames(): Promise<string[]> {
    const count = await this.cartProductNames.count();
    const names: string[] = [];

    // Loop through all product names and collect them
    for (let i = 0; i < count; i++) {
      names.push(await this.cartProductNames.nth(i).innerText());
    }
    return names;
  }

  // Get total price of specific item by index
  // Index starts from 0 for first item
  async getItemTotal(index: number = 0): Promise<string> {
    return await this.cartProductTotals.nth(index).innerText();
  }

  // Click proceed to checkout button
  // If not logged in this shows login modal
  async proceedToCheckout() {
    await this.click(this.proceedToCheckoutButton);
    await this.waitForPageLoad();
  }

  // Click login button inside checkout modal
  // Used when user is not logged in and tries to checkout
  async clickLoginFromModal() {
    await this.waitForElement(this.checkoutLoginModal);
    await this.click(this.checkoutLoginButton);
    await this.waitForPageLoad();
  }

  // Check if cart page is visible
  async isOnCartPage(): Promise<boolean> {
    return await this.isVisible(this.cartPageHeading);
  }

  // Check if cart is empty
  async isCartEmpty(): Promise<boolean> {
    return await this.isVisible(this.emptyCartMessage);
  }

  // Check if cart has items
  async isCartNotEmpty(): Promise<boolean> {
    return await this.cartItems.count() > 0;
  }

  // Check if checkout modal is visible
  // Appears when user tries to checkout without logging in
  async isCheckoutModalVisible(): Promise<boolean> {
    return await this.isVisible(this.checkoutLoginModal);
  }
}