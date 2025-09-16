import express, { Express } from "express";

const app: Express = express();

// API version
const API_VERSION = "1.0.0";

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(), 
    timestamp: new Date().toISOString(),
    version: API_VERSION, 
  });
});

export default app;