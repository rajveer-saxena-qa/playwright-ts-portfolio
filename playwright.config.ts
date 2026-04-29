/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

// Reading credentials and URLs from .env file
// T keeps sensitive data out of the code
const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

export default defineConfig({

  // Folder where all test files are located
  testDir: './tests',

  // Run tests one by one by default, not at the same time
  fullyParallel: false,

  // If any test has .only tag, fail the run in CI to avoid accidental focus
  forbidOnly: !!process.env.CI,

  // Retry failed tests 2 times in CI, 1 time locally
  retries: process.env.CI ? 2 : 1,

  // Run 3 tests at same time in CI, only 1 locally to avoid conflicts
  workers: process.env.CI ? 3 : 1,

  // HTML report gives a nice visual report after test run
  // List reporter shows live results in terminal while tests are running
  reporter: [['html'], ['list']],
  timeout: 60000,

  use: {
  baseURL: process.env.BASE_URL || 'https://automationexercise.com',
  trace: 'on-first-retry',
  screenshot: 'on',
  video: 'on',
  // Increased action timeout to handle slow ad heavy pages
  actionTimeout: 15000,
  navigationTimeout: 30000,
  },

  projects: [

    // LOCAL CHROME
    // Use this for day to day development and debugging on your machine
    {
      name: 'local-chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    // API TESTS
    // Separate project for all API tests
    // Uses API base URL instead of UI base URL
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://automationexercise.com',
      },
    },

    // TESTMU AI CLOUD - CHROME
    // Runs your tests on real Chrome browser on TestMu AI cloud
    // All 4 capabilities are enabled as required by certification
    {
      name: 'cloud-chrome',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Chrome',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright TS Portfolio',
              name: 'Chrome Test',
              username: LT_USERNAME,
              accessKey: LT_ACCESS_KEY,
              // Captures all network requests and responses
              network: true,
              // Records full video of the test session
              video: true,
              // Takes screenshot at each step
              screenshot: true,
              // Captures browser console logs
              console: true,
            },
          }))}`,
        },
      },
    },

    // TESTMU AI CLOUD - FIREFOX
    // Same as Chrome but runs on Firefox browser
    // Cross browser testing is required for certification
    {
      name: 'cloud-firefox',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Firefox',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright TS Portfolio',
              name: 'Firefox Test',
              username: LT_USERNAME,
              accessKey: LT_ACCESS_KEY,
              network: true,
              video: true,
              screenshot: true,
              console: true,
            },
          }))}`,
        },
      },
    },

    // TESTMU AI CLOUD - EDGE
    // Same as Chrome but runs on Microsoft Edge browser
    // Having 3 browsers proves cross browser capability
    {
      name: 'cloud-edge',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'MicrosoftEdge',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright TS Portfolio',
              name: 'Edge Test',
              username: LT_USERNAME,
              accessKey: LT_ACCESS_KEY,
              network: true,
              video: true,
              screenshot: true,
              console: true,
            },
          }))}`,
        },
      },
    },

  ],
});