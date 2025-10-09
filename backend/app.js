const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models"); 
const cookieParser = require("cookie-parser");

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

// --- Rutas de la API ---
const apiRoutes = require("./routes");
app.use("/api", apiRoutes); 

module.exports = app;
