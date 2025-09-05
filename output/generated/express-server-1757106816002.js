import express from "express";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.URL || `https://localhost:${PORT}`;

// {{MIDDLEWARES}}


// GET /api/users
app.get("/api/users", (req, res) => {

  res.status(200).json({
    "message": "GET /api/users endpoint",
    "description": "GET endpoint for /api/users",
    "timestamp": "2025-09-05T21:13:36.002Z"
});
});

app.listen(PORT, () => console.log(`Server running on ${BACKEND_URL}`));
