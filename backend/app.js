const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models"); 
const cookieParser = require("cookie-parser");
const { swaggerUi, swaggerSpec } = require("./swagger"); 

dotenv.config();

const app = express();

// --- Middlewares ---
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// --- Swagger ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// --- Rutas de la API ---
const apiRoutes = require("./routes");
app.use("/api", apiRoutes); 

module.exports = app;
