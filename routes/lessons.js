// routes/lessons.js
// ---------------------------------------------------------------------
// Handles all backend operations related to lessons.
// Includes:
//   - GET /lessons → returns all lessons from the database
//   - PUT /lessons/:id → updates available spaces for a specific lesson
// ---------------------------------------------------------------------

import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const router = express.Router();

// ---------------------------------------------------------------------
// DATABASE CONNECTION (MongoDB Atlas)
// ---------------------------------------------------------------------

// Connection string matches the one used in server.js
const uri =
  "mongodb+srv://fuglymale:bridge2far011125@aslmongo.ecbeznx.mongodb.net/?appName=aslmongo";

const client = new MongoClient(uri);
let db;

// Immediately-invoked async function to connect this router to the database
(async () => {
  try {
    await client.connect();
    db = client.db("asl_database"); // database name
    console.log("Lessons route connected to MongoDB");
  } catch (err) {
    console.error("Lessons route connection failed:", err);
  }
})();

// ---------------------------------------------------------------------
// GET /lessons
// Returns every lesson in the database.
// This route is called by the frontend when the page loads.
// ---------------------------------------------------------------------

router.get("/", async (req, res) => {
  try {
    const lessons = await db.collection("lessons").find({}).toArray();

    // Send all lessons back to the Vue frontend
    res.status(200).json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// ---------------------------------------------------------------------
// PUT /lessons/:id
// Updates the "spaces" value for a specific lesson.
// Triggered during checkout to reduce available spaces.
// The frontend ALWAYS sends an updated number.
// ---------------------------------------------------------------------

router.put("/:id", async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { spaces } = req.body; // new spaces value sent from frontend

    // Validate the spaces field
    if (typeof spaces !== "number") {
      return res.status(400).json({ error: "Invalid 'spaces' value" });
    }

    // Update the lesson in MongoDB
    const result = await db.collection("lessons").updateOne(
      { _id: new ObjectId(lessonId) },
      { $set: { spaces } }
    );

    // If no lesson matched the given ID
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.status(200).json({ message: "Lesson updated" });
  } catch (err) {
    console.error("Error updating lesson:", err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

// ---------------------------------------------------------------------
// EXPORT ROUTER
// Allows server.js to mount this router at /lessons
// ---------------------------------------------------------------------
export default router;
