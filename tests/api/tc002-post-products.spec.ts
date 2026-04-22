import { test, expect } from '@playwright/test';
// TC002 validates that POST method is not supported for products list API
test('TC002 - POST To All Products List - Method Not Supported', async ({ request }) => {
  // Sending POST request to products API
  const response = await request.post('https://automationexercise.com/api/productsList');
  // Validating HTTP status code is 405 - method not supported
  expect(response.status()).toBe(200);
  // Parsing Converting response body
  const body = await response.json();
  // Validating response code at application level is 405
  expect(body.responseCode).toBe(405);
  // Validating error message
  expect(body.message).toBe('This request method is not supported.');
});