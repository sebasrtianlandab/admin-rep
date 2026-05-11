/**
 * KPI shape aligned with `rep-kpi-card` + dashboard KPIs (mock-first list modules).
 */
export interface AdminModuleKpi {
  id: string;
  label: string;
  value: string;
  hint: string | null;
  icon: string;
  trendLabel: string | null;
  trendPositive: boolean | null;
}
