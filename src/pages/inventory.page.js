class InventoryPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByText('Products', { exact: true });
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  product(name) {
    return this.page.locator('.inventory_item').filter({
      has: this.page.getByText(name, { exact: true })
    });
  }

  async addToCart(name) {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
