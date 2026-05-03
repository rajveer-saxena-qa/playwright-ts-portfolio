import * as dotenv from 'dotenv';
dotenv.config();
/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 3 : 1,
  reporter: [['html'], ['list']],
  timeout: 60000,

  use: {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    // LOCAL CHROME - default for development and debugging
    {
      name: 'local-chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    // LOCAL FIREFOX
    {
      name: 'local-firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // LOCAL EDGE
    {
      name: 'local-edge',
      use: { ...devices['Desktop Edge'] },
    },

    // API TESTS
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://automationexercise.com',
      },
    },
  ],
});
