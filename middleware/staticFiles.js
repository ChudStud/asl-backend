// middleware/staticFiles.js
import path from "path";
import fs from "fs";

export default function staticFiles(req, res, next) {
  const filePath = path.join("images", req.url);

  // Check if the file exists in /images
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`Image not found: ${req.url}`);
      return res.status(404).json({ error: "Image file not found" });
    }
    // Serve the image file
    res.sendFile(path.resolve(filePath));
  });
}
