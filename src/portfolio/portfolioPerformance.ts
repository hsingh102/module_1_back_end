/**
 * Interface representing the portfolio performance result
 * Defines the structure of the object returned by the function
 */
export interface PortfolioResult {
  initialInvestment: number; // The original investment amount
  currentValue: number; // The current value of the portfolio
  profitOrLoss: number; // The profit or loss amount
  percentageChange: number; // The percentage change in the portfolio value
  performanceSummary: string; // A summary of the portfolio performance
}

/**
 **
 * /**
 * Calculates how a portfolio has performed based on its initial and current values.
 * Uses a switch(true) statement to handle the different performance conditions.
 *
 * @param initialInvestment - The original amount invested
 * @param currentValue - The portfolio’s current total value
 * @returns A PortfolioResult object containing profit/loss, percentage change, and summary
 */
 

export const calculatePortfolioPerformance = (
    initialInvestment: number,
    currentValue: number
): PortfolioResult => {
  const profitOrLoss = currentValue - initialInvestment; // Calculate raw profit or loss (positive = gain, negative = loss)
  const percentageChange = (profitOrLoss / initialInvestment) * 100; // Calculate percentage change relative to the initial investment

  // Default value for performance summary
    let performanceSummary: string = "Unknown performance";

    switch (true) {
      // Portfolio grew by more than 20%
    case percentageChange > 20:
      performanceSummary = "Gained significantly";
      break;

      // Portfolio grew between 10% and 20% (inclusive)
    case percentageChange >= 10 && percentageChange <= 20:
      performanceSummary = "Gained moderately";
      break;

      // Portfolio grew slightly (0.1% to 10%)
    case percentageChange >= 0.1 && percentageChange < 10:
      performanceSummary = "Gained slightly";
      break;

      // No change in portfolio value
    case percentageChange === 0:
      performanceSummary = "No change";
      break;

      // Portfolio lost slightly (-0.1% to -10%)
    case percentageChange <= -0.1 && percentageChange > -10:
      performanceSummary = "Lost slightly";
      break;

      // Portfolio lost moderately (-10% to -20%)
    case percentageChange <= -10 && percentageChange >= -20:
      performanceSummary = "Lost moderately";
      break;

      // Portfolio lost significantly (more than -20%)
    case percentageChange < -20:
      performanceSummary = "Lost significantly";
      break;
  }

  // Return the result as a typed object (PortfolioResult)
    return {
        initialInvestment,
        currentValue,
        profitOrLoss,
        percentageChange,
        performanceSummary,
    };
}

/**
 * Interface representing an asset in the portfolio
 */
export interface Asset {
  name: string; // Name of the asset 
  value: number; // Monetary value of the asset
}
/**
 * Finds the largest holding in a portfolio
 * @param assets - Array of assets
 * @returns The asset with the highest value, or null if array is empty
 */

export const findLargestHolding = (assets: Asset[]): Asset | null => {
  // Return null if the assets array is empty
  if (assets.length === 0) return null;
  
  // Use reduce to compare each asset's value and find the largest one
  // largest starts as the first asset, current is each asset in the array
  // If current asset's value is greater than largest, return current; otherwise, keep largest
  return assets.reduce((largest, asset) =>
    asset.value > largest.value ? asset : largest, assets[0] // Initialize largest with the first asset in the array
  );
};

/**
 * Calculates allocation percentages by asset
 * @param assets - Array of assets
 * @returns Object mapping each asset name to its percentage of total portfolio
 */
export function assetAllocationPercentage(
  assets: Asset[]
): { [key: string]: number } {
  // Calculate total value of all assets
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  // If total value is 0, return an empty object to avoid division by zero
  if (totalValue === 0) return {};

  // Use reduce to calculate the percentage allocation for each asset
  return assets.reduce((alloc, asset) => {
    // Percentage = (asset value / total value) * 100
    alloc[asset.name] = (asset.value / totalValue) * 100;
    return alloc; // Return the updated allocation object for the next iteration
  }, {} as { [key: string]: number }); // Initialize allocations as an empty object
}