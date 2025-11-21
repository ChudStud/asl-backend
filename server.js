// Import dependencies
import express from "express";
import path from "path";
import cors from "cors";
import { MongoClient } from "mongodb";
import lessonsRouter from "./routes/lessons.js";
import ordersRouter from "./routes/orders.js";
import logger from "./middleware/logger.js";
import staticFiles from "./middleware/staticFiles.js";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Implementation of CORS
app.use(express.json());   // Parse JSON requests
app.use(logger);           // Custom logger middleware
app.use("/images", staticFiles); // Static file middleware for lesson images

// Database setup (MongoDB Atlas)
const uri = "mongodb+srv://fuglymale:bridge2far011125@aslmongo.ecbeznx.mongodb.net/?appName=aslmongo";
const client = new MongoClient(uri);
let db;

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

// Route connections
app.use("/lessons", lessonsRouter);
app.use("/orders", ordersRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Express backend is running correctly ✅");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export database
export { db };
