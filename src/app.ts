import express, { Express } from "express";
 import { PortfolioPerformance,calculatePortfolioPerformance,findLargestHolding, Asset,assetAllocationPercentages } from "./portfolio/portfolioPerformance";
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
// Portfolio performance endpoint
app.get("/api/v1/portfolio/performance", (req, res) => {
  const { initialInvestment, currentValue } = req.query;
  if (!initialInvestment || !currentValue) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  const result = calculatePortfolioPerformance(
    Number(initialInvestment),
    Number(currentValue)
  );
  res.json(result);
});

// Largest holding endpoint
app.post("/api/v1/portfolio/largest-holding", (req, res) => {
  const assets: Asset[] = req.body.assets || [];
  const result = findLargestHolding(assets);
  res.json(result);
});

// Asset allocation endpoint
app.post("/api/v1/portfolio/allocation", (req, res) => {
  const assets: Asset[] = req.body.assets || [];
  const result = assetAllocationPercentages(assets);
  res.json(result);
}); 
export default app;