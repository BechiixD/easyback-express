import express from "express";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.URL || `https://localhost:${PORT}`;

// {{MIDDLEWARES}}


app.get("/example", (req, res) => {
  res.status(200 || 200);
  res.json({"title":"Example Movie","genre":["Genre1","Genre 2"]})
  res.setHeader("Content-Type", "application/json"); 
  res.setHeader("X-Custom-Header", "CustomValue"); 

  res.send("it works");
});
  


app.post("/example", (req, res) => {
  res.status(201 || 200);
  res.json({"message":"Example created successfully"})
  res.setHeader("Content-Type", "application/json"); 

  res.send("it works");
});
  


app.put("/example/:id", (req, res) => {
  res.status(200 || 200);
  res.json({"message":"Example with ID updated successfully"})
  res.setHeader("Content-Type", "application/json"); 

  res.send("it works");
});
  


app.delete("/example/:id", (req, res) => {
  res.status(204 || 200);
  res.json({})

  res.send("it works");
});
  

app.listen(PORT, () => console.log(`Server running on ${BACKEND_URL}`));
