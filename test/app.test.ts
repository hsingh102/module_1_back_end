// tests/app.test.ts
import request from "supertest";
import app from "../src/app";
 
describe("GET /health", () => {
  it("should return 200 and correct JSON structure", async () => {
    const response = await request(app).get("/health");
 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("uptime");
  });

  it("should return 200 and correct JSON structure", async () => {
    const res = await request(app).get("/health");

    expect(res.body).toHaveProperty("version", "1.0.0");
  });
 

});