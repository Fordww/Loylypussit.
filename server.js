const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: 'https://loylypussit.vercel.app' }));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const line_items = items.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: 'https://loylypussit.vercel.app/success',
      cancel_url: 'https://loylypussit.vercel.app/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: 'Maksulinkki ei toiminut' });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Serveri käynnissä portissa ${PORT}`));

