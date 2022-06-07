// secret API key.
const stripe = require('stripe')('sk_test_51L82rSKKKVNA4VPmE1pjn5QZueZiayllF21jBBQkv432Dz2VWE0MMRG2PFo026xdd34OTqX2ddnfKQz14smDt2TH000Tg3vANt');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1L843qKKKVNA4VPmWGK0TgQG',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));