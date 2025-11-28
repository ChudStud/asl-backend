// seed/seed-lessons.js
import { MongoClient } from "mongodb";

// Your MongoDB Atlas connection string (same as in server.js)
const uri = "mongodb+srv://fuglymale:bridge2far011125@aslmongo.ecbeznx.mongodb.net/?appName=aslmongo";
const client = new MongoClient(uri);

// Lesson data
const LESSONS = [
  // -----------------------------
  // MATH (3 locations)
  // -----------------------------
  { subject: "Math", location: "Hendon",     price: 100, spaces: 5, image: "" },
  { subject: "Math", location: "Finchley",   price:  95, spaces: 5, image: "" },
  { subject: "Math", location: "Edgware",    price:  90, spaces: 5, image: "" },

  // -----------------------------
  // SCIENCE (2 locations)
  // -----------------------------
  { subject: "Science", location: "Colindale",  price: 80, spaces: 5, image: "" },
  { subject: "Science", location: "Hendon",     price: 85, spaces: 5, image: "" },

  // -----------------------------
  // ENGLISH (3 locations)
  // -----------------------------
  { subject: "English", location: "Mill Hill",  price: 70, spaces: 5, image: "" },
  { subject: "English", location: "Brent Cross", price: 75, spaces: 5, image: "" },
  { subject: "English", location: "Colindale",   price: 72, spaces: 5, image: "" },

  // -----------------------------
  // HISTORY (1 location)
  // -----------------------------
  { subject: "History", location: "Finchley",   price: 90, spaces: 5, image: "" },

  // -----------------------------
  // ART (3 locations)
  // -----------------------------
  { subject: "Art", location: "Brent Cross",   price: 60, spaces: 5, image: "" },
  { subject: "Art", location: "Edgware",       price: 65, spaces: 5, image: "" },
  { subject: "Art", location: "Hendon",        price: 72, spaces: 5, image: "" },

  // -----------------------------
  // MUSIC (2 locations)
  // -----------------------------
  { subject: "Music", location: "Barnet",      price: 75, spaces: 5, image: "" },
  { subject: "Music", location: "Finchley",    price: 78, spaces: 5, image: "" },

  // -----------------------------
  // DANCE (1 location)
  // -----------------------------
  { subject: "Dance", location: "Edgware",     price: 85, spaces: 5, image: "" },

  // -----------------------------
  // DRAMA (2 locations)
  // -----------------------------
  { subject: "Drama", location: "Golders Green", price: 95, spaces: 5, image: "" },
  { subject: "Drama", location: "Barnet",        price: 90, spaces: 5, image: "" },

  // -----------------------------
  // COMPUTING (1 location)
  // -----------------------------
  { subject: "Computing", location: "Kingsbury", price: 120, spaces: 5, image: "" },

  // -----------------------------
  // SPORTS (2 locations)
  // -----------------------------
  { subject: "Sports", location: "Colindale",   price: 50, spaces: 5, image: "" },
  { subject: "Sports", location: "Hendon",      price: 55, spaces: 5, image: "" }
];

async function run() {
  try {
    await client.connect();
    const db = client.db("asl_database"); // Database name
    const Lessons = db.collection("lessons");

    // Remove any existing lessons to avoid duplicates
    await Lessons.deleteMany({});
    console.log("Old lesson data cleared");

    // Insert new lessons
    const result = await Lessons.insertMany(LESSONS);
    console.log(`Inserted ${result.insertedCount} lessons successfully`);
  } catch (err) {
    console.error("Error seeding lessons:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();
