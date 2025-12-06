import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

// CORS aktivieren
app.use(cors());

// Damit dein Server JSON verarbeiten kann
app.use(express.json());

// Basisroute – wichtig, damit Render nicht "Not Found" zeigt
app.get("/", (req, res) => {
  res.send("Server läuft 🚀");
});

// PUBLIC-Ordner für deine HTML/CSS/JS Dateien
app.use(express.static("public"));

// OpenAI Client vorbereiten
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Beispiel-Route für Chat-Anfragen an OpenAI
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI Fehler" });
  }
});

// Stripe-Webhook (falls du Stripe nutzt)
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log("Webhook Event:", event.type);
      res.sendStatus(200);
    } catch (err) {
      console.error("Webhook Error:", err.message);
      res.sendStatus(400);
    }
  }
);

// Render PORT
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
