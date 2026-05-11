import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { PropertiesListSnapshot } from '@features/properties/domain/properties.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'mod',
      label: 'Pendientes moderación',
      value: '24',
      hint: 'Cola operador · mock',
      icon: 'alert-circle',
      trendLabel: '+3',
      trendPositive: false,
    },
    {
      id: 'pub',
      label: 'Publicadas (24h)',
      value: '186',
      hint: 'Flujo `publish` portal',
      icon: 'building-2',
      trendLabel: '+12%',
      trendPositive: true,
    },
    {
      id: 'pause',
      label: 'Pausadas',
      value: '902',
      hint: 'Estado pause',
      icon: 'activity',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'media',
      label: 'Incidencias media',
      value: '5',
      hint: 'Videos/imágenes rechazados',
      icon: 'alert-triangle',
      trendLabel: '−1',
      trendPositive: true,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      ref: 'P-88201',
      title: 'Apartamento Chapinero',
      owner: 'U-10421',
      status: 'Publicada',
      operation: 'Venta',
      city: 'Bogotá',
      views: '1.240',
      updated: '2026-05-10 07:30',
    },
    {
      ref: 'P-88202',
      title: 'Casa campestre',
      owner: 'U-10422',
      status: 'Borrador',
      operation: 'Arriendo',
      city: 'Medellín',
      views: '—',
      updated: '2026-05-09 22:10',
    },
    {
      ref: 'P-88203',
      title: 'Oficina zona rosa',
      owner: 'U-10424',
      status: 'Revisión',
      operation: 'Venta',
      city: 'Bogotá',
      views: '12',
      updated: '2026-05-10 09:00',
    },
    {
      ref: 'P-88204',
      title: 'Lote industrial',
      owner: 'U-10422',
      status: 'Pausada',
      operation: 'Venta',
      city: 'Cali',
      views: '430',
      updated: '2026-05-08 18:00',
    },
  ];
}

export function buildPropertiesListSnapshot(): PropertiesListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
