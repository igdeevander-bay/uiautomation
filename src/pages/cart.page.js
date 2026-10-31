class CartPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByText('Your Cart', { exact: true });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  item(name) {
    return this.page.locator('.cart_item').filter({
      has: this.page.getByText(name, { exact: true })
    });
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
