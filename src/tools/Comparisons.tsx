import type { Restaurant } from "../types/Restaurant";

export const CompareNamesAZ = (a: Restaurant, b: Restaurant): number => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;

export const CompareNamesZA = (a: Restaurant, b: Restaurant): number => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;

export const CompareRateHiLo = (a: Restaurant, b: Restaurant): number => a.details.reviewScore > b.details.reviewScore ? -1 : 1;

export const CompareRateLoHi = (a: Restaurant, b: Restaurant): number => a.details.reviewScore > b.details.reviewScore ? 1 : -1;
