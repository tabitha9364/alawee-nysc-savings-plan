import { PLAN } from "../data/plan";

export interface PlanProjection {
  monthlySaving: number;
  savingsShare: number;
  contributions: number;
  estimatedReturns: number;
  projectedTotal: number;
}

export function calculateProjection(
  monthlySaving: number,
  skippedMonths: number[] = [],
): PlanProjection {
  const skipped = new Set(skippedMonths);
  const projectedTotal = Array.from({ length: PLAN.months }, (_, month) => {
    if (skipped.has(month + 1)) return 0;
    const daysInvested = (PLAN.months - month) * (365 / PLAN.months);
    return monthlySaving * (1 + (PLAN.annualEstimateRate * daysInvested) / 365);
  }).reduce((total, contribution) => total + contribution, 0);
  const contributions = monthlySaving * (PLAN.months - skipped.size);

  return {
    monthlySaving,
    savingsShare: (monthlySaving / PLAN.monthlyAlawee) * 100,
    contributions,
    estimatedReturns: projectedTotal - contributions,
    projectedTotal,
  };
}
