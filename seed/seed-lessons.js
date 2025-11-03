// seed/seed-lessons.js
import { MongoClient } from "mongodb";

// Your MongoDB Atlas connection string (same as in server.js)
const uri = "mongodb+srv://fuglymale:bridge2far011125@aslmongo.ecbeznx.mongodb.net/?appName=aslmongo";
const client = new MongoClient(uri);

// Lesson data
const LESSONS = [
  { subject: "Math",      location: "Hendon",       price: 100, spaces: 5, image: "" },
  { subject: "Science",   location: "Colindale",    price:  80, spaces: 5, image: "" },
  { subject: "English",   location: "Mill Hill",     price:  70, spaces: 5, image: "" },
  { subject: "History",   location: "Finchley",      price:  90, spaces: 5, image: "" },
  { subject: "Art",       location: "Brent Cross",   price:  60, spaces: 5, image: "" },
  { subject: "Music",     location: "Barnet",        price:  75, spaces: 5, image: "" },
  { subject: "Dance",     location: "Edgware",       price:  85, spaces: 5, image: "" },
  { subject: "Drama",     location: "Golders Green", price:  95, spaces: 5, image: "" },
  { subject: "Computing", location: "Kingsbury",     price: 120, spaces: 5, image: "" },
  { subject: "Sports",    location: "Colindale",     price:  50, spaces: 5, image: "" }
];

async function run() {
  try {
    await client.connect();
    const db = client.db("asl_database"); // ✅ Database name
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
