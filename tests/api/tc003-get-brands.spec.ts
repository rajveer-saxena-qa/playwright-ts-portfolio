import { test, expect } from '@playwright/test';
// Used interface to define the structure of GET Brands API response fetched from console log
interface BrandsResponse {
  responseCode: number;
  brands: {
    id: number;
    brand: string;
  }[];
}
// Creating test case for Get All Brands List API
test('TC003 - GET All Brands List', async ({ request }) => {
// Sending GET request to brands API
  const response = await request.get('https://automationexercise.com/api/brandsList');
// Validating HTTP status code
  expect(response.status()).toBe(200);
  // Parsing response body as BrandsResponse interface
  const body = await response.json() as BrandsResponse;
  // Validating response is not null undefined empty or false
  expect(body).toBeTruthy();
  // Validating response code at application level
  expect(body.responseCode).toBe(200);
  // Validating brands array is not empty
  expect(body.brands.length).toBeGreaterThan(0);
  // Validating first brand has required fields id and brand
  expect(body.brands[0]).toHaveProperty('id');
  expect(body.brands[0]).toHaveProperty('brand');
});