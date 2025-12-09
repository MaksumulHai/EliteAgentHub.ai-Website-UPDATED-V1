
export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  includedMinutes: number | string;
  features: string[];
  isPopular?: boolean;
  cta: string;
  note?: string;
  perMinuteRate?: string;
  additionalLocationFee?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RoiCalculatorResults {
  monthlyLostRevenue: number;
  annualLostRevenue: number;
  breakEvenCalls: number;
  planPayback: string;
}

export interface MissedCallCalculatorResults {
    roiPercentage: number;
    netGainPerMonth: number;
    breakEvenCalls: number;
}