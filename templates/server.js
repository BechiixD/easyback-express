import express from "express";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.URL || `https://localhost:${PORT}`;

// {{MIDDLEWARES}}

// {{ENDPOINTS}}

app.listen(PORT, () => console.log(`Server running on ${BACKEND_URL}`));
