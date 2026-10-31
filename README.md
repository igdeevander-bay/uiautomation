# SauceDemo UI Automation

Browser-based automated coverage for the SauceDemo login and end-to-end checkout flow. The tests use Playwright Test and page objects. An ExtentReports 5 HTML report is generated after each run, with screenshots attached to the relevant test cases.

## Requirements

- Node.js 20 or newer
- npm
- Java 17 or newer
- Chromium browser (installed by the setup command below)

## Setup

```powershell
npm ci
npx playwright install chromium
```

The Maven Wrapper downloads the configured Maven distribution and ExtentReports dependencies on the first test run.

## Run the tests

```powershell
npm test
```

Run with a visible browser:

```powershell
npm run test:headed
```

Regenerate the ExtentReports HTML report from the most recent test run:

```powershell
npm run report
```

Open `reports/extent-report.html` in a browser. The report includes login and checkout screenshots from `reports/extent-assets/`, including the product, cart, checkout information, order summary, and confirmation states. Playwright test results and failure traces are saved under `reports/test-results/`; the supplementary Playwright HTML report is at `reports/html-report/index.html`.

## Configuration

The suite defaults to the SauceDemo standard account and a sample checkout address. Override values with environment variables when needed:

| Variable | Default |
|---|---|
| `BASE_URL` | `https://www.saucedemo.com` |
| `SAUCEDEMO_USERNAME` | `standard_user` |
| `SAUCEDEMO_PASSWORD` | `secret_sauce` |
| `CHECKOUT_FIRST_NAME` | `QA` |
| `CHECKOUT_LAST_NAME` | `Automation` |
| `CHECKOUT_POSTAL_CODE` | `10001` |

## Test cases

See [test-cases/test-cases.md](test-cases/test-cases.md) for the documented scenarios and expected results.
