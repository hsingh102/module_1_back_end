import {
  calculatePortfolioPerformance,
  findLargestHolding,
  assetAllocationPercentages,
  Asset
} from "../src/portfolio/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {
  it("should calculate correctly when there is a profit", () => {
    const result = calculatePortfolioPerformance(10000, 12000);

    expect(result.profitOrLoss).toBe(2000);
    expect(result.percentageChange).toBeCloseTo(20, 1);
    expect(result.performanceSummary).toBe("Portfolio gained moderately");
  });

  it("should calculate correctly when there is a loss", () => {
    const result = calculatePortfolioPerformance(10000, 8000);

    expect(result.profitOrLoss).toBe(-2000);
    expect(result.percentageChange).toBeCloseTo(-20, 1);
    expect(result.performanceSummary).toBe("Portfolio lost significantly");
  });

  it("should calculate correctly when there is no change", () => {
    const result = calculatePortfolioPerformance(10000, 10000);

    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.performanceSummary).toBe("No change");
  });

  it("should handle slight gain correctly", () => {
    const result = calculatePortfolioPerformance(10000, 10100);

    expect(result.profitOrLoss).toBe(100);
    expect(result.percentageChange).toBeCloseTo(1, 1);
    expect(result.performanceSummary).toBe("Portfolio gained slightly");
  });
});

describe("findLargestHolding", () => {
  it("returns the asset with the largest value", () => {
    const assets = [
      { name: "House", value: 500000 },
      { name: "Stocks", value: 20000 },
      { name: "Bonds", value: 10000 }
    ];

    expect(findLargestHolding(assets)).toEqual({ name: "House", value: 500000 });
  });

  it("returns null for empty array", () => {
    expect(findLargestHolding([])).toBeNull();
  });

  it("returns the first asset in case of a tie", () => {
    const assets = [
      { name: "Stocks", value: 10000 },
      { name: "Bonds", value: 10000 }
    ];
    expect(findLargestHolding(assets)).toEqual({ name: "Stocks", value: 10000 });
  });
});

describe("assetAllocationPercentages", () => {
  it("calculates even distribution", () => {
    const assets = [
      { name: "Stocks", value: 5000 },
      { name: "Bonds", value: 5000 }
    ];
    expect(assetAllocationPercentages(assets)).toEqual([
      { name: "Stocks", percentage: 50 },
      { name: "Bonds", percentage: 50 }
    ]);
  });

  it("calculates uneven distribution", () => {
    const assets = [
      { name: "Stocks", value: 3000 },
      { name: "Bonds", value: 7000 }
    ];
    expect(assetAllocationPercentages(assets)).toEqual([
      { name: "Stocks", percentage: 30 },
      { name: "Bonds", percentage: 70 }
    ]);
  });

  it("returns 0% for all assets if array is empty or total is zero", () => {
    expect(assetAllocationPercentages([])).toEqual([]);
    const zeroAssets = [
      { name: "Stocks", value: 0 },
      { name: "Bonds", value: 0 }
    ];
    expect(assetAllocationPercentages(zeroAssets)).toEqual([
      { name: "Stocks", percentage: 0 },
      { name: "Bonds", percentage: 0 }
    ]);
  });
});