import express from "express";
import Stripe from "stripe";

const PORT = process.env.PORT || 3000;

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.text());

app.post("/charge", async (req, res) => {
  try {
    // Create a Customer:
    const customer = await stripe.customers.create({
      source: req.body,
      email: `user.${Date.now()}@example.com`
    });

    // Charge the Customer instead of the card:
    const charge = await stripe.charges.create({
      amount: 50,
      currency: "jpy",
      customer: customer.id
    });

    res.json({ status: charge.status });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.listen(PORT, () => console.log(`Listenting on port ${PORT}`));
