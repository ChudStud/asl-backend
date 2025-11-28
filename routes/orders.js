// routes/orders.js
// ---------------------------------------------------------------------
// Handles everything related to customer orders.
// Provides two endpoints:
//   - POST /orders → save a new order during checkout
//   - GET /orders  → return all stored orders (for admin/testing)
// ---------------------------------------------------------------------

import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

// ---------------------------------------------------------------------
// DATABASE CONNECTION (MongoDB Atlas)
// ---------------------------------------------------------------------

const uri =
  "mongodb+srv://fuglymale:bridge2far011125@aslmongo.ecbeznx.mongodb.net/?appName=aslmongo";

const client = new MongoClient(uri);
let db;

// Connect immediately when this route file loads.
(async () => {
  try {
    await client.connect();
    db = client.db("asl_database"); // database name
    console.log("Orders route connected to MongoDB");
  } catch (err) {
    console.error("Orders route connection failed:", err);
  }
})();

// ---------------------------------------------------------------------
// POST /orders
// Saves a new customer order.
// Triggered when the user confirms checkout on the frontend.
// ---------------------------------------------------------------------

router.post("/", async (req, res) => {
  try {
    const orderData = req.body;

    /*
      Basic validation:
      - name: required
      - phone: required
      - items: must be an array (each item represents a lesson purchased)
    */
    if (!orderData.name || !orderData.phone || !Array.isArray(orderData.items)) {
      return res.status(400).json({ error: "Invalid order data format" });
    }

    // Insert order into the "orders" collection
    const result = await db.collection("orders").insertOne({
      ...orderData,
      createdAt: new Date(), // timestamp for tracking
    });

    // Respond with success + generated order ID
    res.status(201).json({
      message: "Order successfully saved",
      orderId: result.insertedId,
    });

  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// ---------------------------------------------------------------------
// GET /orders
// Returns all saved orders.
// Helpful for debugging or admin views.
// ---------------------------------------------------------------------

router.get("/", async (req, res) => {
  try {
    const orders = await db.collection("orders").find({}).toArray();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ---------------------------------------------------------------------
// EXPORT ROUTER
// Allows server.js to mount this at /orders
// ---------------------------------------------------------------------
export default router;
