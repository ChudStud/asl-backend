// middleware/staticFiles.js
// ---------------------------------------------------------------------
// Custom middleware for serving static image files used by lessons.
// When the frontend requests an image such as:
//    GET /images/math.png
// this middleware checks if the file exists inside the /images folder
// and returns the file. If it does not exist, a 404 JSON error is sent.
// ---------------------------------------------------------------------

import path from "path";
import fs from "fs";

export default function staticFiles(req, res, next) {
  /*
    Build the full filesystem path to the requested image.
    Example:
      req.url = "/math.png"
      filePath = "images/math.png"
  */
  const filePath = path.join("images", req.url);

  /*
    fs.access checks whether the file physically exists.
    - If NOT found → respond with 404 and an error message.
    - If found → send the file back to the client.
  */
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`Image not found: ${req.url}`);
      return res.status(404).json({ error: "Image file not found" });
    }

    // File exists — return it to the frontend
    res.sendFile(path.resolve(filePath));
  });
}
