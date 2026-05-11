export type RepDataExportFormat = 'pdf' | 'excel' | 'csv';

export interface RepDataExportColumn {
  key: string;
  label: string;
}

export interface RepDataExportPayload {
  fileName: string;
  title?: string | null;
  columns: RepDataExportColumn[];
  rows: Record<string, string>[];
}
