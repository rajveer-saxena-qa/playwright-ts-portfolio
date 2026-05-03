# Playwright TypeScript Automation Portfolio — Rajveer Saxena

## About This Project

Hi, I am Rajveer Saxena, a QA Professional with 12+ years of experience in BFSI domain currently working as Test Architect at Coforge Technologies.

After completing my first Playwright portfolio on a banking application using JavaScript, I wanted to level up to TypeScript and build a more structured, production-grade framework. This repository represents that next step — moving from basic test scripting to a full framework with Page Object Model, API-driven fixtures, centralized test data, and CI/CD integration.

**Application Under Test:** [AutomationExercise.com](https://automationexercise.com) — a public e-commerce demo application ideal for end to end automation practice.

---
## Tech Stack
- **Playwright** 1.59.1
- **TypeScript** for type safe automation
- **Node.js** runtime environment
- **GitHub Actions** for CI/CD pipeline

## Framework Architecture

### Design Patterns
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

**Total: 22 Tests**

## Prerequisites
- Node.js 18 or above
- npm 8 or above

## Setup and Installation

git clone https://github.com/rajveer-saxena-qa/playwright-ts-portfolio.git
cd playwright-ts-portfolio
npm install
npx playwright install

## Environment Configuration
Create a `.env` file in the root directory:

BASE_URL=https://automationexercise.com
API_BASE_URL=https://automationexercise.com

No credentials required. Both values point to the public test application.

## Running Tests

```bash
# Run all UI tests on Chrome
npx playwright test --project=local-chrome

# Run all UI tests on Firefox
npx playwright test --project=local-firefox

# Run all UI tests on Edge
npx playwright test --project=local-edge

# Run API tests only
npx playwright test --project=api

# Run smoke tests only
npx playwright test --grep @smoke --project=local-chrome

# Run regression tests only
npx playwright test --grep @regression --project=local-chrome
```
## Test Tags
| Tag | Description |
|-----|-------------|
| @smoke | Critical path tests |
| @regression | Full regression suite |
| @ui | UI automation tests |
| @api | API automation tests |

## CI/CD Pipeline
GitHub Actions workflow runs automatically on every push and pull request:
- Dependency installation
- Playwright browser installation
- Test execution on Ubuntu
- HTML report upload as artifact (retained 30 days)

## Test Reports
npx playwright show-report

## Author
**Rajveer Saxena**
QA Test Architect | 12+ Years BFSI Domain
