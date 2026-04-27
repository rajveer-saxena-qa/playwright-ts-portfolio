import { test, expect } from '@playwright/test';

// Interface defines the expected structure of the API response
// This gives us type safety and auto complete in VS Code
interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: object;
}

interface ProductsResponse {
  responseCode: number;
  products: Product[];
}

// Smoke and api tags help run filtered tests during certification
test('TC001 - Get All Product list', { tag: ['@smoke', '@api'] }, async ({ request }) => {

  // Sending GET request using baseURL from playwright.config.ts
  // No hardcoded URL, picks up API_BASE_URL from .env file
  const response = await request.get('/api/productsList');

  // Validating HTTP status code from server
  expect(response.status()).toBe(200);

  // Parsing response body and casting to our defined interface
  const body = await response.json() as ProductsResponse;

  // Validating response body is not null or undefined
  expect(body).toBeTruthy();

  // Validating application level response code inside body
  expect(body.responseCode).toBe(200);

  // Validating products array is not empty
  expect(body.products.length).toBeGreaterThan(0);

  // Validating every product has required fields with correct data types
  // Checking all products not just first one
  body.products.forEach(product => {
    // Check field exists and is correct type
    expect(typeof product.id).toBe('number');
    expect(typeof product.name).toBe('string');
    expect(typeof product.price).toBe('string');
    expect(typeof product.brand).toBe('string');
  });
});