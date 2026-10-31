class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByText('Checkout: Overview', { exact: true });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
  }

  item(name) {
    return this.page.locator('.cart_item').filter({
      has: this.page.getByText(name, { exact: true })
    });
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutOverviewPage };
