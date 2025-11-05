import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

// MongoDB connection
const uri = "mongodb+srv://fuglymale:bridge2far011125@aslmongo.ecbeznx.mongodb.net/?appName=aslmongo";
const client = new MongoClient(uri);
let db;

(async () => {
  try {
    await client.connect();
    db = client.db("asl_database");
    console.log("Orders route connected to MongoDB");
  } catch (err) {
    console.error("Orders route connection failed:", err);
  }
})();

// POST /orders — save a new order
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;

    // Basic validation
    if (!orderData.name || !orderData.phone || !Array.isArray(orderData.items)) {
      return res.status(400).json({ error: "Invalid order data format" });
    }

    // Insert the order into MongoDB
    const result = await db.collection("orders").insertOne({
      ...orderData,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Order successfully saved",
      orderId: result.insertedId,
    });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

export default router;
