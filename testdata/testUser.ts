// Test user data used across UI and API tests
// This file defines the base user structure
// Email is overridden in fixtures with unique value for each test run
export const testUser = {

  // User full name used during registration
  name: 'Rajveer Saxena',

  // Base email - this gets overridden in fixture with unique email
  // Do not use this email directly in tests, use fixture instead
  email: 'rajveer.test@test.com',

  // Password must meet app requirements
  password: 'Test@1234',

  // Below fields are required for registration form on automationexercise.com
  title: 'Mr',
  birth_date: '1',
  birth_month: 'January',
  birth_year: '1990',
  firstname: 'Rajveer',
  lastname: 'Saxena',
  company: 'Coforge',
  address1: '123 Test Street',
  address2: 'Test Area',
  country: 'India',
  zipcode: '110001',
  state: 'Delhi',
  city: 'New Delhi',
  mobile_number: '9999999999'
};

// Exporting type so it can be reused in fixtures and page objects
export type TestUser = typeof testUser;