import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { accessLog } from "./middlewares/accessLog";
import routes from "./routes";

// Environment variables are loaded in index.ts before any other imports

const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(accessLog);

// CORS middleware (for not release mode)
if (process.env.MODE != "release") {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
}

// Routes
app.use("/v1", routes);

// Error handling middleware
app.use(errorHandler);

export default app;
