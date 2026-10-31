const { test: base } = require('@playwright/test');
const { LoginPage } = require('../../src/pages/login.page');
const { InventoryPage } = require('../../src/pages/inventory.page');
const { CartPage } = require('../../src/pages/cart.page');
const { CheckoutInformationPage } = require('../../src/pages/checkout-information.page');
const { CheckoutOverviewPage } = require('../../src/pages/checkout-overview.page');
const { CheckoutCompletePage } = require('../../src/pages/checkout-complete.page');

const test = base.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutInformationPage: async ({ page }, use) =>
    use(new CheckoutInformationPage(page)),
  checkoutOverviewPage: async ({ page }, use) =>
    use(new CheckoutOverviewPage(page)),
  checkoutCompletePage: async ({ page }, use) =>
    use(new CheckoutCompletePage(page))
});

module.exports = { test };
