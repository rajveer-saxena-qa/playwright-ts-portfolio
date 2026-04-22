import { test, expect } from '@playwright/test';
// TC004 validates that PUT method is not supported for brands list API
test('TC004 - PUT To All Brands List - Method Not Supported', async ({ request }) => {
  // Sending PUT request to brands API
  const response = await request.put('https://automationexercise.com/api/brandsList');
  // Validating HTTP status code
  expect(response.status()).toBe(200);
  // Parsing response body
  const body = await response.json();
  // Validating response code at application level is 405
  expect(body.responseCode).toBe(405);
  // Validating error message
  expect(body.message).toBe('This request method is not supported.');
});