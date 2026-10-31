# SauceDemo UI Automation

Browser-based automated coverage for the SauceDemo login and end-to-end checkout flow. The tests use Playwright Test and page objects. Each test produces a standalone HTML report, and checkout screenshots are attached to the report and saved with the test results.

## Requirements

- Node.js 20 or newer
- npm
- Chromium browser (installed by the setup command below)

## Setup

```powershell
npm ci
npx playwright install chromium
```

## Run the tests

```powershell
npm test
```

Run with a visible browser:

```powershell
npm run test:headed
```

Open the latest HTML report:

```powershell
npm run report
```

The report is generated at `reports/html-report/index.html`. Test results, traces for failed tests, and screenshot evidence are saved under `reports/test-results/`. Screenshot attachments include the inventory, cart, checkout information, order summary, and order confirmation states.

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
