import express from "express";
import cors from "cors";
import "dotenv/config";

// path setup
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import getLocalIPAddress from "./utils/getLocalIPAddress.js";
import homeRoute from "./routes/homeRoute.js";
import postRoute from "./routes/postRoutes.js";
import { errorHandler } from "./errorHandler/errorHandler.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRoute);
app.use("/api", postRoute);

// Handle Errors
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  if (getLocalIPAddress()) {
    console.log(`local: http://localhost:${PORT}`);
    console.log(`network: http://${getLocalIPAddress()}:${PORT}`);
  } else {
    console.log(`local: http://localhost:${PORT}`);
  }
});
