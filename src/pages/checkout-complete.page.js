class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByText('Checkout: Complete!', { exact: true });
    this.confirmation = page.getByText('Thank you for your order!', { exact: true });
    this.dispatchMessage = page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
      { exact: true }
    );
  }
}

module.exports = { CheckoutCompletePage };
