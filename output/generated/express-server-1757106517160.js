import express from "express";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.URL || `https://localhost:${PORT}`;

// {{MIDDLEWARES}}


// Test endpoint
app.get("/api/test", (req, res) => {
  res.setHeader("X-Test-Header", "test-value");
  res.status(200).json({
    "message": "GET /api/test endpoint",
    "description": "Test endpoint",
    "timestamp": "2025-09-05T21:08:37.160Z"
});
});

app.listen(PORT, () => console.log(`Server running on ${BACKEND_URL}`));
