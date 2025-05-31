
cat > server.js <<EOF
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
            mode: "payment",
                line_items: items.map(item => ({
                      price_data: {
                              currency: "eur",
                                      product_data: { name: item.name },
                                              unit_amount: item.price
                                                    },
                                                          quantity: item.quantity
                                                              })),
                                                                  success_url: "https://loylypussit.vercel.app/success.html",
                                                                      cancel_url: "https://loylypussit.vercel.app/cancel.html",
                                                                          shipping_address_collection: { allowed_countries: ["FI"] }
                                                                            });