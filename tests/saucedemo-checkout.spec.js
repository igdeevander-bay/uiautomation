const { expect } = require('@playwright/test');
const { test } = require('./fixtures/test');
const { credentials, customer, product } = require('../src/config/testData');
const { captureEvidence } = require('../src/helpers/evidence');

test('TC-LOGIN-001 | Standard user can log in successfully', async ({
  page,
  loginPage,
  inventoryPage
}, testInfo) => {
  await test.step('Open the SauceDemo login page', async () => {
    await loginPage.open();
    await expect(loginPage.loginButton).toBeVisible();
  });

  await test.step('Log in with the standard user account', async () => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(inventoryPage.heading).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  await captureEvidence(page, testInfo, 'login-products-page');
});

test('TC-CHECKOUT-001 | Standard user completes checkout for Sauce Labs Onesie', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
}, testInfo) => {
  await test.step('Log in and confirm the product inventory is displayed', async () => {
    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await expect(inventoryPage.heading).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  await test.step('Add Sauce Labs Onesie to the cart', async () => {
    const onesie = inventoryPage.product(product.name);
    await expect(onesie).toBeVisible();
    await expect(onesie.getByText(product.price, { exact: true })).toBeVisible();
    await inventoryPage.addToCart(product.name);
    await expect(onesie.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
  await captureEvidence(page, testInfo, 'product-added-to-cart');

  await test.step('Open the cart and verify the selected item', async () => {
    await inventoryPage.openCart();
    await expect(cartPage.heading).toBeVisible();
    await expect(cartPage.item(product.name)).toBeVisible();
    await expect(cartPage.item(product.name).locator('.cart_quantity')).toHaveText('1');
    await expect(cartPage.item(product.name).locator('.inventory_item_price')).toHaveText(
      product.price
    );
  });
  await captureEvidence(page, testInfo, 'cart-item-verified');

  await test.step('Enter checkout information and continue', async () => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await checkoutInformationPage.completeCustomerInformation(customer);
    await expect(checkoutOverviewPage.heading).toBeVisible();
  });
  await captureEvidence(page, testInfo, 'checkout-information-submitted');

  await test.step('Verify the order summary before placing the order', async () => {
    await expect(checkoutOverviewPage.item(product.name)).toBeVisible();
    await expect(checkoutOverviewPage.item(product.name).locator('.inventory_item_price'))
      .toHaveText(product.price);
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $7.99');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $0.64');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $8.63');
  });
  await captureEvidence(page, testInfo, 'checkout-order-summary');

  await test.step('Finish checkout and verify order confirmation', async () => {
    await checkoutOverviewPage.finishCheckout();
    await expect(checkoutCompletePage.heading).toBeVisible();
    await expect(checkoutCompletePage.confirmation).toBeVisible();
    await expect(checkoutCompletePage.dispatchMessage).toBeVisible();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
  });
  await captureEvidence(page, testInfo, 'checkout-completed');
});
