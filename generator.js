// This file will take the JSON configuration and the server template and create a new Express server file with the foundations of the backend

import express from "express";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
// import { template } from "/templates/server.js";
//
// Maybe this have to come from the frontend
import jsonFile from "./projects/example.json" with { type: "json" };
import { readFile, writeFile } from "fs/promises";
import { join } from "path/win32";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.URL || `https://localhost:${PORT}`;

const template = await readFile("./templates/server.js", "utf-8", (err, c) => {
  if (err) {
    console.error("Error reading template file:", err);
    return;
  }
  return c;
});

app.listen(PORT, () => {
  console.log(`Server runing on ${BACKEND_URL}`);
});
const content = jsonFile.endpoints.map((endpoint) => {
  const { method, path, response } = endpoint;
  const { body, status, headers } = response;

  // app[method.toLowerCase()](`${path}`, (req, res) => {
  //   res.status(status || 200);
  //   if (body) {
  //     const responseBody = JSON.parse(
  //       JSON.stringify(body).replace(/<UUID>/g, randomUUID()),
  //     );
  //     res.json(responseBody);
  //   }
  //   if (headers) {
  //     Object.entries(headers).map(([key, value]) => {
  //       res.setHeader(key, value);
  //     });
  //   }
  //   console.log(headers);
  //   res.send("it works");
  // });

  return `
  app${[method.toLowerCase()]}(${path}, (req, res) =>
    res.status(${status} || 200);
    if (${body}) {
      const responseBody = JSON.parse(
        JSON.stringify(${body}).replace(/<UUID>/g, ${randomUUID()})
      );
      res.json(responseBody);
    }
    if (${headers}) {
      Object.entries(${headers}).map(([key, value]) => {
        res.setHeader(key, value);
      });
    }
    res.send("it works");
    }
  `;
});

const newContent = await readFile(
  "./templates/server.js",
  "utf-8",
  (err, c) => {
    return c.replace("/// ENDPOINTS_GENERADOS_AQUI", content);
  },
);

const newFilePath = join("output", "project", "server.js");
