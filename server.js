import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Baseline request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// Database setup (to be updated with MongoDB Atlas URI)
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

// Test route
app.get("/", (req, res) => {
  res.send("Express backend is running correctly");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
