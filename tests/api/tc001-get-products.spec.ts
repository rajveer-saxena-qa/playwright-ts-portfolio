import {test,expect} from '@playwright/test';
// Used interface to define the structure of GET Products API response fetched from console log
interface ProductsResponse {
    responseCode: number;
      products: {
        id: number;
        name: string;
        price: string;
        brand: string;
        category: object;
        }[];
        }
// Creating Test cases for Get All product list API        
test('TC001 - Get All Product list',async({request})=>{
// Sending Get request to product API
const response = await request.get('https://automationexercise.com/api/productsList');
//Validating HTTP status Code
expect (response.status()).toBe(200);
//Validating response body is not empty 
const body = await response.json() as ProductsResponse;
//validating response is not Null/Undefined/empty/false
expect(body).toBeTruthy();
//validating response code at application level
expect(body.responseCode).toBe(200);
//Validating product array is not empty
expect(body.products.length).toBeGreaterThan(0);
//Validating first product has required fields
// Validating id field exist in response
expect(body.products[0]).toHaveProperty('id');
//Validating name field exist in response
expect(body.products[0]).toHaveProperty('name');
//Validating price field exist in reposne
expect(body.products[0]).toHaveProperty('price');
//Validating brand field exist in response
expect(body.products[0]).toHaveProperty('brand');
});
