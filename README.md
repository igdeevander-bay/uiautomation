# SauceDemo UI Automation

Playwright tests for the SauceDemo login and checkout flow. Each run also creates an ExtentReports HTML report with screenshots from each stage.

## Requirements

- Node.js 20 or newer
- Java 17 or newer
- npm
- Chromium

## Setup

Run these commands from the project directory:

```powershell
npm ci
npx playwright install chromium
```

The Maven Wrapper downloads Maven and the ExtentReports dependencies on the first run.

## Run the tests

Run the tests in a headless browser:

```powershell
npm test
```

Run the tests with a visible browser:

```powershell
npm run test:headed
```

## View the reports

Open `reports/extent-report.html` in a browser to view the ExtentReports report and screenshots.

To regenerate the report without rerunning the tests:

```powershell
npm run report
```

Playwright's supplementary HTML report is available at `reports/html-report/index.html`. Test results and failure traces are stored in `reports/test-results/`.

## Automated test cases

The test cases are implemented in [tests/saucedemo.test.js](tests/saucedemo.test.js):

- `TC-LOGIN-001` logs in with `standard_user` and verifies the Products page.
- `TC-CHECKOUT-001` adds Sauce Labs Onesie to the cart, completes checkout, verifies the $8.63 order total, and confirms the order.

The test account defaults to `standard_user` with password `secret_sauce`. Checkout uses sample customer details.
