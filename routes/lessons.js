import express from "express";
import { MongoClient, ObjectId } from "mongodb";

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


// PUT /lessons/:id - update the spaces value for a lesson
router.put("/:id", async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { spaces } = req.body;

    if (typeof spaces !== "number") {
      return res.status(400).json({ error: "Invalid 'spaces' value" });
    }

    const result = await db.collection("lessons").updateOne(
      { _id: new ObjectId(lessonId) },
      { $set: { spaces } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.status(200).json({ message: "Lesson updated" });
  } catch (err) {
    console.error("Error updating lesson:", err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
});


export default router;
