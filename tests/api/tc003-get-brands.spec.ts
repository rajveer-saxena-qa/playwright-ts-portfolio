import { test, expect } from '@playwright/test';

// Interface defines expected structure of Brands API response
interface Brand {
  id: number;
  brand: string;
}

interface BrandsResponse {
  responseCode: number;
  brands: Brand[];
}

// Smoke and api tags help run filtered tests during certification
test('TC003 - GET All Brands List', { tag: ['@smoke', '@api'] }, async ({ request }) => {

  // Sending GET request using baseURL from playwright.config.ts
  // No hardcoded URL, picks up API_BASE_URL from .env file
  const response = await request.get('/api/brandsList');

  // Validating HTTP status code from server
  expect(response.status()).toBe(200);

  // Parsing response body and casting to our defined interface
  const body = await response.json() as BrandsResponse;

  // Validating response body is not null or undefined
  expect(body).toBeTruthy();

  // Validating application level response code inside body
  expect(body.responseCode).toBe(200);

  // Validating brands array is not empty
  expect(body.brands.length).toBeGreaterThan(0);

  // Validating every brand has required fields with correct data types
  // Checking all brands not just first one
  body.brands.forEach(brand => {
    // Check field exists and is correct type
    expect(typeof brand.id).toBe('number');
    expect(typeof brand.brand).toBe('string');
  });
});