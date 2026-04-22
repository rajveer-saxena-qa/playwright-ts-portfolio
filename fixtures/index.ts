import { test as base, request } from '@playwright/test';
import { testUser } from '../testdata/testUser';

type Fixtures = {
  apiUser: {
    email: string;
    password: string;
    name: string;
  };
};

export const test = base.extend<Fixtures>({
  apiUser: async ({}, use) => {
    
    // Create user via API before test
    const context = await request.newContext();
    await context.post('https://automationexercise.com/api/createAccount', {
      form: {
        ...testUser,
        email: `testuser${Date.now()}@test.com`
      }
    });

    // Pass user data to test
    await use({
      email: testUser.email,
      password: testUser.password,
      name: testUser.name
    });

    // Delete user via API after test
    await context.delete('https://automationexercise.com/api/deleteAccount', {
      form: {
        email: testUser.email,
        password: testUser.password
      }
    });

    await context.dispose();
  }
});

export { expect } from '@playwright/test';