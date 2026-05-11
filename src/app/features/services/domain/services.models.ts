import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';

export interface ServicesListSnapshot {
  generatedAt: string;
  kpis: AdminModuleKpi[];
  rows: RepTableRow[];
}
