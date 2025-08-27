// This is an example Express server setup

import express from "express";
import { json } from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(cors());
app.use(morgan("dev"));

// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
