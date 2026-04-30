# Playwright TypeScript Automation Portfolio

## Overview
This repository contains an end to end test automation framework developed using Playwright and TypeScript. The framework demonstrates industry standard automation practices including Page Object Model, API testing, fixture based test data management and cross browser execution on TestMu AI cloud grid.

## Tech Stack
- **Playwright** 1.59.1
- **TypeScript** for type safe automation
- **Node.js** runtime environment
- **TestMu AI Cloud Grid** for cross browser execution
- **GitHub Actions** for CI/CD pipeline

## Framework Architecture

### Design Patterns Used
- **Page Object Model (POM)** with BasePage for shared methods across all pages
- **Custom Fixtures** for automated user lifecycle management via API
- **Centralized Test Data** using TypeScript interfaces for type safety
- **Retry Logic** for handling dynamic ad overlays on test application

### Folder Structure
```
playwright-ts-portfolio/
├── pages/                    # Page Object Model classes
│   ├── basePage.ts           # Common methods inherited by all pages
│   ├── homePage.ts           # Home page actions and locators
│   ├── loginPage.ts          # Login and signup actions
│   ├── registerPage.ts       # Registration form actions
│   ├── productsPage.ts       # Product search and filter actions
│   ├── productDetailPage.ts  # Product detail and add to cart actions
│   ├── cartPage.ts           # Cart management actions
│   └── checkoutPage.ts       # Checkout and payment actions
├── tests/
│   ├── api/                  # API test specifications
│   └── ui/                   # UI test specifications
├── fixtures/                 # Custom Playwright fixtures
├── testdata/                 # Centralized test data
├── utils/                    # Helper utilities
└── playwright.config.ts      # Framework configuration
```

## Test Coverage

### API Tests (4 Tests)
| Test ID | Description | Type |
|---------|-------------|------|
| TC001 | GET All Products List | Smoke |
| TC002 | POST To Products List - Method Not Supported | Regression |
| TC003 | GET All Brands List | Smoke |
| TC004 | PUT To Brands List - Method Not Supported | Regression |

### UI Tests (18 Tests)
| Area | Tests Covered |
|------|--------------|
| Login | Valid credentials, Invalid credentials, Blank credentials |
| Logout | Logout after login, Cannot access after logout |
| Register | Valid registration, Existing email, Blank details |
| Product Search | Valid search, Invalid search, Women filter, Men filter, Polo brand filter |
| Add to Cart | Single product, Custom quantity, Continue shopping |
| Checkout | Full checkout flow, Checkout requires login |

### E2E Tests (3 Tests)
| Test ID | Description |
|---------|-------------|
| TC019 | Complete journey from registration to order placement |
| TC020 | Search product filter and add to cart |
| TC021 | Filter by category and add to cart |

**Total: 25 Tests**

## Prerequisites
- Node.js 18 or above
- npm 8 or above
- TestMu AI account for cloud execution

## Setup and Installation

```bash
# Clone the repository
git clone https://github.com/rajveer-saxena-qa/playwright-ts-portfolio.git

# Navigate to project directory
cd playwright-ts-portfolio

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Environment Configuration
Create a `.env` file in the root directory with the following variables:

```
LT_USERNAME=your_lambdatest_username
LT_ACCESS_KEY=your_lambdatest_access_key
BASE_URL=https://automationexercise.com
API_BASE_URL=https://automationexercise.com
```

## How to Run Tests

### Local Execution
```bash
# Run all tests on local Chrome
npx playwright test --project=local-chrome

# Run API tests only
npx playwright test --project=api

# Run smoke tests only
npx playwright test --grep @smoke --project=local-chrome

# Run regression tests only
npx playwright test --grep @regression --project=local-chrome
```

### Cloud Execution on TestMu AI
```bash
# Run on Chrome
npx playwright test --project=cloud-chrome

# Run on Firefox
npx playwright test --project=cloud-firefox

# Run on Edge
npx playwright test --project=cloud-edge

# Run cross browser parallel execution
npx playwright test --project=cloud-chrome --project=cloud-firefox --project=cloud-edge
```

### Test Tags Available
| Tag | Description |
|-----|-------------|
| @smoke | Critical path tests |
| @regression | Full regression suite |
| @ui | UI automation tests |
| @api | API automation tests |
| @e2e | End to end journey tests |

## CI/CD Pipeline
GitHub Actions workflow is configured to run tests automatically on every code push. The pipeline includes:
- Dependency installation
- Playwright browser installation
- Test execution
- Report generation

## Test Reports
HTML reports are generated automatically after each test run:
```bash
npx playwright show-report
```

## Author
**Rajveer Saxena**
QA Engineer