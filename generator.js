// This file will take the JSON configuration and the server template and create a new Express server file with the foundations of the backend

import express from "express";
import { randomUUID } from "crypto";
// import { template } from "/templates/server.js";
import example from "./projects/example.json" with { type: "json" };

const app = express();

app.disable("x-powered-by");
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.URL || `https://localhost:${PORT}`;

example.endpoints.map((endpoint) => {
  const { method, path, response } = endpoint;
  app[method.toLowerCase()](`${path}`, (req, res) => {
    console.log("at least it works");
  });
});

app.listen(PORT, () => {
  console.log(`Server runing on ${BACKEND_URL}`);
});
