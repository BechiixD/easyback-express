// This file will take the JSON configuration and the server template and create a new Express server file with the foundations of the backend

import express from "express";
import { randomUUID } from "crypto";
import path from "path";
// import { template } from "/templates/server.js";
//
// Maybe this have to come from the frontend
import jsonFile from "./projects/example.json" with { type: "json" };
import { readFile, writeFile } from "fs/promises";

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.URL || `https://localhost:${PORT}`;

const template = await readFile("./templates/server.js", "utf-8", (err, c) => {
  if (err) {
    console.error("Error reading template file:", err);
    return;
  }
  return c;
});
const content = jsonFile.endpoints.map((endpoint) => {
  const { method, path, response } = endpoint;
  const { body, status, headers } = response;

  return `
app.${[method.toLowerCase()]}("${path}", (req, res) => {
  res.status(${status} || 200);
  ${body ? `res.json(${JSON.stringify(body)})` : "// No response body defined"}
  ${
    headers
      ? Object.entries(headers)
          .map(([key, value]) => `res.setHeader("${key}", "${value}"); \n`)
          .join("")
      : ""
  }
  res.send("it works");
});
  `;
});

async function replaceCode() {
  try {
    let template = await readFile("./templates/server.js", "utf-8");
    let newContent = template.replace("// {{ENDPOINTS}}", content.join("\n\n"));
    await writeFile("./server.js", newContent);
    console.log("Archivo generado con endpoints");
    return newContent;
  } catch (err) {
    console.error("Error:", err);
  }
}

const newContent = await replaceCode();

const newFilePath = path.join("output", "project", "server.js");
await writeFile(newFilePath, newContent);
