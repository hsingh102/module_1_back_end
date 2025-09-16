import request, { Response } from "supertest";
import app from "../src/app";

/**
 * This test checks the /api/v1/health endpoint to make sure the server is running properly
 */
describe("GET /api/v1/health", () => {
    // Test to ensure the endpoint returns the expected health status and required fields
    it("should return server health status", async () => {
        // Arrange: Prepare the request to the health endpoint
        // Act: Send a GET request to the health endpoint
        const response: Response = await request(app).get("/api/v1/health"); // Send a GET request to the health check endpoint
        // Assert: Validate the response structure and content
        expect(response.status).toBe(200); // Check that the HTTP status code is 200 OK
        expect(response.body.status).toBe("OK"); // Check that the status field in the response is "OK"
        expect(response.body).toHaveProperty("uptime"); // Verify that the response contains the 'uptime' property
        expect(response.body).toHaveProperty("timestamp"); // Verify that the response contains the 'timestamp' property
        expect(response.body).toHaveProperty("version"); // Verify that the response contains the 'version' property
    });

    /**
     * Test Case 2: Validate uptime type
     * Purpose: Ensure the 'uptime' field is a number.
     */
    it("should have uptime as a number", async () => {
        // Arrange: Prepare the request to the health endpoint
        // Act: Send a GET request to the health endpoint
        const response: Response = await request(app).get("/api/v1/health"); // Send another GET request to the health check endpoint
        // Assert: Check the type of 'uptime'
        expect(typeof response.body.uptime).toBe("number"); // Check that 'uptime' is of type number
    });
});

/**
   * Test /api/v1/portfolio/performance endpoint
   * Purpose: Ensure the endpoint returns the portfolio performance with required fields
   */
  describe('GET /api/v1/portfolio/performance', () => {
    it('should return portfolio performance data', async () => {
      // Arrange: No setup needed for GET request

      // Act: Send GET request to portfolio performance endpoint
      const res = await request(app).get('/api/v1/portfolio/performance');

      // Assert: Validate HTTP status and required fields
      expect(res.status).toBe(200); // Status should be 200 OK
      expect(res.body).toHaveProperty('initialInvestment'); // Must include initialInvestment
      expect(res.body).toHaveProperty('currentValue'); // Must include currentValue
      expect(res.body).toHaveProperty('profitOrLoss'); // Must include profitOrLoss
      expect(res.body).toHaveProperty('percentageChange'); // Must include percentageChange
      expect(res.body).toHaveProperty('performanceSummary'); // Must include performanceSummary
    });
  });

  /**
   * Test /api/v1/portfolio/largest-holding endpoint
   * Purpose: Ensure the endpoint returns the largest asset in the portfolio
   */
  describe('GET /api/v1/portfolio/largest-holding', () => {
    it('should return the largest holding asset', async () => {

      // Act: Send GET request to largest holding endpoint
      const res = await request(app).get('/api/v1/portfolio/largest-holding');

      // Assert: Validate HTTP status and required fields
      expect(res.status).toBe(200); // Status should be 200 OK
      expect(res.body).toHaveProperty('name'); // Asset must include name
      expect(res.body).toHaveProperty('value'); // Asset must include value
    });
  });

  /**
   * Test /api/v1/portfolio/allocation endpoint
   * Purpose: Ensure the endpoint returns allocation percentages for all assets
   */
  describe('GET /api/v1/portfolio/allocation', () => {
    it('should return asset allocation percentages', async () => {

      // Act: Send GET request to asset allocation endpoint
      const res = await request(app).get('/api/v1/portfolio/allocation');

      // Assert: Validate HTTP status and allocation object
      expect(res.status).toBe(200); // Status should be 200 OK
      expect(typeof res.body).toBe('object'); // Response should be an object
      expect(Object.keys(res.body).length).toBeGreaterThan(0); // Should contain at least one asset allocation
    });
  });