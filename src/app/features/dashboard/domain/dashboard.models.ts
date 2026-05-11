/** Domain models — dashboard aggregate (application-agnostic). */

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  hint: string | null;
  icon: string;
  trendLabel: string | null;
  trendPositive: boolean | null;
}

export interface QuickStatLine {
  label: string;
  value: string;
}

export interface ChartPlaceholder {
  id: string;
  title: string;
  description: string;
}

export interface ActivityRow {
  date: string;
  kind: string;
  actor: string;
  summary: string;
  outcome: string;
}

export interface DashboardSnapshot {
  generatedAt: string;
  kpis: KpiMetric[];
  quickStats: QuickStatLine[];
  charts: ChartPlaceholder[];
  activity: ActivityRow[];
}
