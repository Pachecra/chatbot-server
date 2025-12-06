// stripe.js
require("dotenv").config();
const Stripe = require("stripe");

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Kein STRIPE_SECRET_KEY in der .env gefunden!");
  process.exit(1);
}

console.log("Loaded Stripe Key:", process.env.STRIPE_SECRET_KEY);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
