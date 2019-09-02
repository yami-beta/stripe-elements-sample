import express from "express";
import Stripe from "stripe";

const PORT = process.env.PORT || 3000;

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.text());

app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 50,
      currency: "jpy",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.listen(PORT, () => console.log(`Listenting on port ${PORT}`));
