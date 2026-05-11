import { Injectable } from '@angular/core';
import type { RepDataExportFormat, RepDataExportPayload } from './rep-data-export.models';

@Injectable({ providedIn: 'root' })
export class RepDataExportService {
  async export(payload: RepDataExportPayload, format: RepDataExportFormat): Promise<void> {
    switch (format) {
      case 'csv':
        this.exportCsv(payload);
        return;
      case 'excel':
        await this.exportExcel(payload);
        return;
      case 'pdf':
        await this.exportPdf(payload);
        return;
    }
  }

  private exportCsv(payload: RepDataExportPayload): void {
    const header = payload.columns.map((column) => this.escapeCsv(column.label)).join(',');
    const rows = payload.rows.map((row) =>
      payload.columns.map((column) => this.escapeCsv(row[column.key] ?? '')).join(','),
    );

    this.downloadFile(`${header}\r\n${rows.join('\r\n')}`, `${this.safeFileName(payload.fileName)}.csv`, 'text/csv;charset=utf-8;');
  }

  private async exportExcel(payload: RepDataExportPayload): Promise<void> {
    // Dynamic import keeps heavy export libraries out of the initial app bundle.
    const xlsx = await import('xlsx');
    const worksheetData = [
      payload.columns.map((column) => column.label),
      ...payload.rows.map((row) => payload.columns.map((column) => row[column.key] ?? '')),
    ];

    const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, this.safeSheetName(payload.title ?? 'Export'));
    xlsx.writeFile(workbook, `${this.safeFileName(payload.fileName)}.xlsx`);
  }

  private async exportPdf(payload: RepDataExportPayload): Promise<void> {
    const [{ default: JsPdf }, { default: autoTable }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable'),
    ]);

    const doc = new JsPdf({
      orientation: payload.columns.length > 6 ? 'landscape' : 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    let startY = 40;
    if (payload.title?.trim()) {
      doc.setFontSize(14);
      doc.text(payload.title.trim(), 40, startY);
      startY += 18;
    }

    autoTable(doc, {
      startY,
      head: [payload.columns.map((column) => column.label)],
      body: payload.rows.map((row) => payload.columns.map((column) => row[column.key] ?? '')),
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 6,
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: 255,
        fontStyle: 'bold',
      },
    });

    doc.save(`${this.safeFileName(payload.fileName)}.pdf`);
  }

  private downloadFile(content: string, fileName: string, mimeType: string): void {
    const blob = new Blob(['\uFEFF', content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = fileName;
    anchor.click();

    URL.revokeObjectURL(url);
  }

  private escapeCsv(value: string): string {
    const normalized = value.replace(/\r?\n/g, ' ').trim();
    const escaped = normalized.replace(/"/g, '""');
    return `"${escaped}"`;
  }

  private safeFileName(fileName: string): string {
    return fileName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '') || 'export';
  }

  private safeSheetName(name: string): string {
    const sanitized = name.replace(/[\\/?*[\]:]/g, ' ').trim();
    return (sanitized || 'Export').slice(0, 31);
  }
}
