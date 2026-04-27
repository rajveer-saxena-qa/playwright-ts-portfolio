import { test, expect } from '@playwright/test';

// TC004 validates that PUT method is not allowed for brands list API
// Note: This API returns HTTP 200 always but uses responseCode inside body
// to indicate actual result. So we validate responseCode 405 in body.
test('TC004 - PUT To All Brands List - Method Not Supported', { tag: ['@regression', '@api'] }, async ({ request }) => {

  // Sending PUT request to brands API using baseURL from config
  // No hardcoded URL, picks up API_BASE_URL from .env file
  const response = await request.put('/api/brandsList');

  // This API always returns HTTP 200 even for unsupported methods
  // Actual error is inside response body as responseCode
  expect(response.status()).toBe(200);

  // Parsing response body to validate application level error
  const body = await response.json();

  // Validating body is not null or undefined
  expect(body).toBeTruthy();

  // Validating application level response code is 405 method not supported
  expect(body.responseCode).toBe(405);

  // Validating correct error message is returned
  expect(body.message).toBe('This request method is not supported.');
});