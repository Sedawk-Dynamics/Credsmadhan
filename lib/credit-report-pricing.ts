// Single source of truth for credit report prices (in rupees).
// Used by the purchase page, the homepage cards and the payment API routes,
// so the server never trusts an amount sent from the browser.

export type ReportType = "Equifax" | "Experian" | "TransUnion" | "All"

export const REPORT_PRICES: Record<ReportType, number> = {
  Equifax: 300,
  Experian: 300,
  TransUnion: 300,
  All: 550,
}

export const REPORT_LABELS: Record<ReportType, string> = {
  Equifax: "Equifax",
  Experian: "Experian",
  TransUnion: "TransUnion CIBIL",
  All: "All 3 Bureau Reports",
}

export function isReportType(value: unknown): value is ReportType {
  return typeof value === "string" && value in REPORT_PRICES
}

export function getReportPrice(reportType: unknown): number | null {
  return isReportType(reportType) ? REPORT_PRICES[reportType] : null
}
