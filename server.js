// server.js
// ---------------------------------------------------------------------
// Main entry point for the Express backend.
// Handles middleware, routing, database connection,
// and enables communication with the Vue frontend.
// ---------------------------------------------------------------------

// Import dependencies
import express from "express";
import path from "path";
import cors from "cors";             // Allows frontend (5173) to access backend (3000)
import { MongoClient } from "mongodb";

import lessonsRouter from "./routes/lessons.js";     // Lesson list + update routes
import ordersRouter from "./routes/orders.js";       // Order storage routes
import logger from "./middleware/logger.js";         // Custom logging middleware
import staticFiles from "./middleware/staticFiles.js"; // Serve lesson images

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------
// GLOBAL MIDDLEWARE
// ---------------------------------------------------------------------

// Enable CORS so the Vue frontend can make requests to this server.
// Without this, ALL fetch() calls from 5173 → 3000 would be blocked.
app.use(cors());

// Body parser for JSON requests (POST/PUT)
app.use(express.json());

// Log every request (useful during development and debugging)
app.use(logger);

// Serve static lesson images from /images folder.
// Example: GET http://localhost:3000/images/math.png
app.use("/images", staticFiles);

// ---------------------------------------------------------------------
// DATABASE CONNECTION (MongoDB Atlas)
// ---------------------------------------------------------------------

const uri =
  "mongodb+srv://fuglymale:bridge2far011125@aslmongo.ecbeznx.mongodb.net/?appName=aslmongo";

const client = new MongoClient(uri);
let db;

// Connect to MongoDB when the server starts
async function connectDB() {
  try {
    await client.connect();
    db = client.db("asl_database");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

connectDB();

// ---------------------------------------------------------------------
// ROUTES
// ---------------------------------------------------------------------

// /lessons → Return all lessons + Update spaces
app.use("/lessons", lessonsRouter);

// /orders → Save new orders + Retrieve all orders
app.use("/orders", ordersRouter);

// Base route for quick API testing
app.get("/", (req, res) => {
  res.send("Express backend is running correctly");
});

// ---------------------------------------------------------------------
// START SERVER
// ---------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export db so routed files can access the database instance if needed
export { db };
