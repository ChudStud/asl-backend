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
    console.log("Lessons route connected to MongoDB");
  } catch (err) {
    console.error("Lessons route connection failed:", err);
  }
})();

// GET /lessons — return all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await db.collection("lessons").find({}).toArray();
    res.status(200).json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

export default router;
