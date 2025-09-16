export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}
 
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange =
    ((currentValue - initialInvestment) / initialInvestment) * 100;
 
  // Map conditions to outcomes (instead of using if statements)
  const performanceSummary =
    percentageChange > 20
      ? "Portfolio gained significantly"
      : percentageChange >= 10
      ? "Portfolio gained moderately"
      : percentageChange > 0
      ? "Portfolio gained slightly"
      : percentageChange === 0
      ? "No change"
      : percentageChange <= -20
      ? "Portfolio lost significantly"
      : percentageChange <= -10
      ? "Portfolio lost moderately"
      : "Portfolio lost slightly";
 
  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}
 
// Interface for an asset
export interface Asset {
  name: string;
  value: number;
}
 
// Function 1:
export function findLargestHolding(assets: Asset[]): Asset | null {
  if (assets.length === 0) return null;
  let largest = assets[0];
  for (const asset of assets) {
    if (asset.value > largest.value) {
      largest = asset;
    }
  }
  return largest;
}
 
// Function 2:
export function assetAllocationPercentages(assets: Asset[]): { name: string; percentage: number }[] {
  const total = assets.reduce((sum, asset) => sum + asset.value, 0);
  if (total === 0 || assets.length === 0) {
    return assets.map(asset => ({ name: asset.name, percentage: 0 }));
  }
  return assets.map(asset => ({
    name: asset.name,
    percentage: +(asset.value / total * 100).toFixed(2)
  }));
}
 
 