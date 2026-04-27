import { test as base, request, expect } from '@playwright/test';
import { testUser, TestUser } from '../testdata/testUser';

// Defining shape of data our fixture will pass to each test
// apiUser contains the actual user created via API before test runs
type Fixtures = {
  apiUser: {
    email: string;
    password: string;
    name: string;
  };
};

// Extending base Playwright test with our custom apiUser fixture
// Any test that uses apiUser fixture gets a fresh user created before test
// and that user gets deleted automatically after test completes
export const test = base.extend<Fixtures>({

  apiUser: async ({}, use) => {

    // Generate unique email for each test run to avoid conflicts
    // Date.now() ensures email is different every time
    const uniqueEmail = `rajveer.test${Date.now()}@test.com`;

    // Create API request context with base URL from config
    const context = await request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://automationexercise.com'
    });

    // Create user via API before test starts
    // Spreading testUser brings all registration fields
    // Overriding email with uniqueEmail to avoid duplicate user errors
    const createResponse = await context.post('/api/createAccount', {
      form: {
        ...testUser,
        email: uniqueEmail
      }
    });

    // Validating user was created successfully before running test
    const createBody = await createResponse.json();
    expect(createBody.responseCode).toBe(201);

    // Passing user data to the test
    // uniqueEmail is passed so test uses same email that was created
    await use({
      email: uniqueEmail,
      password: testUser.password,
      name: testUser.name
    });

    // Deleting same user that was created after test completes
    // Using uniqueEmail to ensure we delete the correct user
    const deleteResponse = await context.delete('/api/deleteAccount', {
      form: {
        email: uniqueEmail,
        password: testUser.password
      }
    });

    // Validating user was deleted successfully after test
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.responseCode).toBe(200);

    // Disposing context to free up memory and connections
    await context.dispose();
  }
});

// Re-exporting expect so tests only need to import from fixtures
// Instead of importing from both fixtures and playwright/test
export { expect };