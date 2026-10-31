module.exports = {
  credentials: {
    username: process.env.SAUCEDEMO_USERNAME || 'standard_user',
    password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
  },
  customer: {
    firstName: process.env.CHECKOUT_FIRST_NAME || 'QA',
    lastName: process.env.CHECKOUT_LAST_NAME || 'Automation',
    postalCode: process.env.CHECKOUT_POSTAL_CODE || '10001'
  },
  product: {
    name: 'Sauce Labs Onesie',
    price: '$7.99'
  }
};
