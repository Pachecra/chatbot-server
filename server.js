// ===============================================
// 1) ENV laden + Grundsetup
// ===============================================
require("dotenv").config();
const express = require("express");
const path = require("path");
const stripe = require("./stripe");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug
console.log("Loaded Stripe Key:", process.env.STRIPE_SECRET_KEY);

// Check ENV
if (!process.env.PREMIUM_PRICE_ID) {
  console.error("❌ PREMIUM_PRICE_ID fehlt!");
}
if (!process.env.BUSINESS_PRICE_ID) {
  console.error("❌ BUSINESS_PRICE_ID fehlt!");
}

// ===============================================
// 2) Static Files
// ===============================================
app.use(express.static(path.join(__dirname, "public")));


// ===============================================
// 3) Premium Checkout
// ===============================================
app.post("/checkout/premium", async (req, res) => {
  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: process.env.PREMIUM_PRICE_ID,
          quantity: 1,
        }
      ],
      metadata: { plan: "premium" },
      success_url: "http://localhost:3003/success.html",
      cancel_url: "http://localhost:3003/cancel.html"
    });

    console.log("⭐ Premium Session:", session.url);
    return res.json({ url: session.url });

  } catch (err) {
    console.error("❌ Fehler PREMIUM:", err);
    return res.status(500).json({
      error: "Stripe Fehler Premium",
      message: err.message,
      type: err.type
    });
  }
});


// ===============================================
// 4) Business Checkout
// ===============================================
app.post("/checkout/business", async (req, res) => {
  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: process.env.BUSINESS_PRICE_ID,
          quantity: 1,
        }
      ],
      metadata: { plan: "business" },
      success_url: "http://localhost:3003/success.html",
      cancel_url: "http://localhost:3003/cancel.html"
    });

    console.log("🏢 Business Session:", session.url);
    return res.json({ url: session.url });

  } catch (err) {
    console.error("❌ Fehler BUSINESS:", err);
    return res.status(500).json({
      error: "Stripe Fehler Business",
      message: err.message,
      type: err.type
    });
  }
});


// ===============================================
// 5) Server Start
// ===============================================
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
