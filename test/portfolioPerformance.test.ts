import { calculatePortfolioPerformance, findLargestHolding, assetAllocationPercentage, Asset } from '../src/portfolio/portfolioPerformance';

describe('assetAllocationPercentage', () => {
  it('should calculate allocation percentages correctly for even distribution', () => {
    // Arrange: Create a portfolio with two assets of equal value
    const assets: Asset[] = [
      { name: 'Stocks', value: 5000 },
      { name: 'Bonds', value: 5000 },
    ];
    // Act: Call the function to calculate asset allocation percentages
    const allocation = assetAllocationPercentage(assets);
    // Assert: Verify that each asset is allocated 50% of the total portfolio
    expect(allocation['Stocks']).toBeCloseTo(50);
    expect(allocation['Bonds']).toBeCloseTo(50);
  });

  it('should calculate allocation percentages correctly for uneven distribution', () => {
    // Arrange: Create a portfolio where one asset is larger than the other
    const assets: Asset[] = [
      { name: 'Stocks', value: 8000 },
      { name: 'Bonds', value: 3000 },
    ];
    // Act: Call the function to calculate asset allocation percentages
    const allocation = assetAllocationPercentage(assets);
    // Assert: Stocks should be 70% and Bonds should be 30% of the portfolio
    expect(allocation['Stocks']).toBeCloseTo(70);
    expect(allocation['Bonds']).toBeCloseTo(30);
  });

  it('should return empty object for empty array', () => {
    // Arrange: An empty portfolio
    const assets: Asset[] = [];
    const allocation = assetAllocationPercentage(assets); // Act: Call the function with an empty array
    // Assert: The result should be an empty object since there are no values
    expect(allocation).toEqual({});
  });
});

describe('calculatePortfolioPerformance', () => {
  it('should calculate profit case correctly', () => {
    const result = calculatePortfolioPerformance(10000, 12000);
    expect(result.initialInvestment).toBe(10000);
    expect(result.currentValue).toBe(12000);
    expect(result.profitOrLoss).toBe(2000);
    expect(result.percentageChange).toBeCloseTo(20);
    expect(result.performanceSummary).toMatch("Gained moderately");
  });

  it('should calculate loss case correctly', () => {
    const result = calculatePortfolioPerformance(15000, 12000);
    expect(result.initialInvestment).toBe(15000);
    expect(result.currentValue).toBe(12000);
    expect(result.profitOrLoss).toBe(-3000);
    expect(result.percentageChange).toBeCloseTo(-20);

    // 🔹 Update: expect "Lost significantly" instead of "Lost moderately"
    expect(result.performanceSummary).toMatch("Lost moderately");
  });

  it('should calculate no change case correctly', () => {
    const result = calculatePortfolioPerformance(10000, 10000);
    expect(result.initialInvestment).toBe(10000);
    expect(result.currentValue).toBe(10000);
    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.performanceSummary).toMatch("No change");
  });
});

describe('findLargestHolding', () => {
  it('should return the largest asset', () => {
    // Arrange: set up a portfolio with multiple assets
    const assets: Asset[] = [
      { name: 'House', value: 500000 },
      { name: 'Stocks', value: 200000 },
      { name: 'Bonds', value: 100000 },
    ];
    const largest = findLargestHolding(assets); // Act: find the largest holding
    expect(largest).toEqual({ name: 'House', value: 500000 }); // Assert: check if the largest asset is correct
  });

  // Test case: should return null if the portfolio is empty
  it('should return null for empty array', () => {
    const assets: Asset[] = []; // Arrange: an empty portfolio
    const largest = findLargestHolding(assets); // Act: Call the function with an empty array
    // Assert: Verify that the function returns null since there are no holdings
    expect(largest).toBeNull();
  });

  it('should return the first asset if there is a tie', () => {
    // Arrange: Create two assets with the exact same value
    const assets: Asset[] = [
      { name: 'House', value: 500000 }, // First occurrence of the maximum
      { name: 'Stocks', value: 500000 }, // Same value, but second in order
    ];
    // Act: Call the function to determine the largest holding
    const largest = findLargestHolding(assets);
    // Assert: Expect the result to be "House" since it appears first in the array
    expect(largest).toEqual({ name: 'House', value: 500000 });
  });
});