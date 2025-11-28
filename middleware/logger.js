// middleware/logger.js
// ---------------------------------------------------------------------
// Simple logging middleware for Express.
// Runs on every request and prints useful information to the terminal.
// Helps with debugging and monitoring server activity.
// ---------------------------------------------------------------------

export default function logger(req, res, next) {
  // Format a readable timestamp for each request
  const timestamp = new Date().toISOString();

  /*
    Log the HTTP method (GET, POST, PUT, etc.)
    and the URL that was requested.

    Example output:
    [2025-01-15T18:32:12.501Z] GET /lessons
  */
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // Continue to the next middleware or route handler
  next();
}
