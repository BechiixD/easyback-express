import express from "express";
const app = express();
app.use(express.json());

// ENDPOINTS_GENERADOS_AQUI

app.listen(3000, () => console.log("Server running"));
