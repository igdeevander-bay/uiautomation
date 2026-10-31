# SauceDemo UI Test Cases

| Test case ID | Scenario | Preconditions | Steps | Expected result |
|---|---|---|---|---|
| TC-LOGIN-001 | Successful login | SauceDemo is available; valid standard-user credentials are configured. | 1. Open the login page. 2. Enter the standard username and password. 3. Select **Login**. | The Products page is displayed and the URL ends in `inventory.html`. |
| TC-CHECKOUT-001 | Complete checkout for Sauce Labs Onesie | SauceDemo is available; valid standard-user credentials and checkout details are configured. | 1. Log in. 2. Add **Sauce Labs Onesie** to the cart. 3. Open the cart and verify the item and quantity. 4. Select **Checkout**. 5. Enter first name, last name, and postal code. 6. Continue and verify the order summary. 7. Select **Finish**. | The order summary contains one Sauce Labs Onesie at $7.99, with $0.64 tax and $8.63 total. Checkout completes and the order confirmation is displayed. |
