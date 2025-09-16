import express, { Request, Response } from "express";
import { calculatePortfolioPerformance, findLargestHolding, assetAllocationPercentage, Asset } from './portfolio/portfolioPerformance';

const app = express();

/**
 * Represents the response structure for a health check endpoint
 * @interface HealthCheckResponse
 * @property {string} status - Current status of the API ("OK")
 * @property {number} uptime - How long the server has been running (in seconds)
 * @property {string} timestamp - Current server time in ISO format
 * @property {string} version - Version of the API
 */

interface HealthCheckResponse {
    status: string; 
    uptime: number; 
    timestamp: string; 
    version: string; 
}

// Using the interface to type your response
app.get("/api/v1/health", (req: Request, res: Response) => {
    // Create a response object that matches our interface
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(), // server uptime in seconds
        timestamp: new Date().toISOString(), // current timestamp
        version: "1.0.0", // API version
    };

    // Send the health data as a JSON response
    res.json(healthData);
});

// Portfolio performance endpoint
// Route: GET /api/v1/portfolio/performance
// Purpose: Returns the performance of a portfolio based on initial and current values
app.get('/api/v1/portfolio/performance', (req: Request, res: Response) => {
  const result = calculatePortfolioPerformance(10000, 12000); // Example values: initial = 10000, current = 12000
  res.json(result); // Send the performance result as JSON response
});

// Largest holding endpoint
// Route: GET /api/v1/portfolio/largest-holding
// Purpose: Returns the asset with the highest value from the portfolio
app.get('/api/v1/portfolio/largest-holding', (req: Request, res: Response) => {
  const assets: Asset[] = [
    { name: 'House', value: 500000 },
    { name: 'Stocks', value: 200000 },
    { name: 'Bonds', value: 100000 },
  ];
  const largest = findLargestHolding(assets); // Find the asset with the largest value
  res.json(largest); // Send the largest asset as JSON response
});

// Asset allocation endpoint
// Route: GET /api/v1/portfolio/allocation
// Purpose: Returns the allocation percentages of each asset in the portfolio
app.get('/api/v1/portfolio/allocation', (req: Request, res: Response) => {
  const assets: Asset[] = [
    { name: 'Stocks', value: 5000 },
    { name: 'Bonds', value: 5000 },
  ];
  const allocation = assetAllocationPercentage(assets); // Calculate allocation percentages
  res.json(allocation); // Send the allocation object as JSON response
});

export default app; // Export the Express app for use in server or tests