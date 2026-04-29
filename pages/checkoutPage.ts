import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

// CheckoutPage represents the order checkout page of automationexercise.com
// URL is /checkout
// Contains all locators and actions for placing an order
export class CheckoutPage extends BasePage {

  // Address section locators
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly deliveryFirstName: Locator;

  // Order review section locators
  readonly orderItems: Locator;
  readonly orderProductNames: Locator;
  readonly orderTotalAmount: Locator;

  // Order comment and place order locators
  readonly orderCommentInput: Locator;
  readonly placeOrderButton: Locator;
  readonly checkoutPageHeading: Locator;

  // Payment section locators
  readonly cardNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cardCvcInput: Locator;
  readonly cardExpiryMonthInput: Locator;
  readonly cardExpiryYearInput: Locator;
  readonly payAndConfirmButton: Locator;

  // Order success locators
  readonly orderSuccessMessage: Locator;
  readonly orderSuccessHeading: Locator;
  readonly continueButton: Locator;

  // Constructor receives page from Playwright test
  // Calls super to pass page to BasePage
  constructor(page: Page) {
    super(page);

    // Address section locators
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.deliveryFirstName = page.locator('#address_delivery .address_firstname');

    // Order review section locators
    this.orderItems = page.locator('#cart_info tbody tr');
    this.orderProductNames = page.locator('#cart_info .cart_description h4 a');
    this.orderTotalAmount = page.locator('#cart_info tfoot .cart_total_price');

    // Order comment and place order locators
    this.orderCommentInput = page.locator('textarea.form-control');
    this.placeOrderButton = page.locator('a:has-text("Place Order")');
    this.checkoutPageHeading = page.locator('h2:has-text("Checkout")');

    // Payment section locators
    this.cardNameInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cardCvcInput = page.locator('input[data-qa="cvc"]');
    this.cardExpiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.cardExpiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payAndConfirmButton = page.locator('button[data-qa="pay-button"]');

    // Order success locators
    this.orderSuccessMessage = page.locator('p:has-text("Congratulations")');
    this.orderSuccessHeading = page.locator('h2:has-text("Order Placed!")');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  // Add optional comment before placing order
  async addOrderComment(comment: string) {
    await this.fill(this.orderCommentInput, comment);
  }

  // Click place order button to go to payment page
  async clickPlaceOrder() {
    await this.click(this.placeOrderButton);
    await this.waitForPageLoad();
  }

  // Fill payment details with test card information
  // Never use real card details in tests
  async fillPaymentDetails(
  cardName: string,
  cardNumber: string,
  cvc: string,
  expiryMonth: string,
  expiryYear: string
) {
  // Increased timeout for payment form on slow network
  await this.cardNameInput.waitFor({ state: 'visible', timeout: 25000 });
  await this.fill(this.cardNameInput, cardName);
  await this.fill(this.cardNumberInput, cardNumber);
  await this.fill(this.cardCvcInput, cvc);
  await this.fill(this.cardExpiryMonthInput, expiryMonth);
  await this.fill(this.cardExpiryYearInput, expiryYear);
}

  // Click pay and confirm button to complete order
  async confirmPayment() {
    await this.click(this.payAndConfirmButton);
    await this.waitForPageLoad();
  }

  // Complete full payment flow in one method
  // Combines fillPaymentDetails and confirmPayment
  async completePayment(
    cardName: string,
    cardNumber: string,
    cvc: string,
    expiryMonth: string,
    expiryYear: string
  ) {
    await this.fillPaymentDetails(
      cardName,
      cardNumber,
      cvc,
      expiryMonth,
      expiryYear
    );
    await this.confirmPayment();
  }

  // Get delivery address first name to verify correct address is shown
  async getDeliveryFirstName(): Promise<string> {
    return await this.getText(this.deliveryFirstName);
  }

  // Get count of items in order review section
  async getOrderItemCount(): Promise<number> {
    return await this.orderItems.count();
  }

  // Get total order amount from checkout page
  async getOrderTotal(): Promise<string> {
    return await this.getText(this.orderTotalAmount);
  }

  // Check if checkout page is visible
  // Check URL contains checkout instead of relying on heading locator
  // More reliable than text based locator on this app
  async isOnCheckoutPage(): Promise<boolean> {
  const url = await this.getCurrentUrl();
  return url.includes('checkout');
  }
  // Check if order was placed successfully
  async isOrderPlacedSuccessfully(): Promise<boolean> {
    return await this.isVisible(this.orderSuccessHeading);
  }

  // Click continue after order is placed
  async clickContinue() {
    await this.click(this.continueButton);
    await this.waitForPageLoad();
  }
}