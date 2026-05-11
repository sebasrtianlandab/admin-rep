import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { ServicesListSnapshot } from '@features/services/domain/services.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'active',
      label: 'Servicios visibles',
      value: '3.402',
      hint: '`professional_services` activos · mock',
      icon: 'briefcase',
      trendLabel: '+2,1%',
      trendPositive: true,
    },
    {
      id: 'open',
      label: 'Solicitudes abiertas',
      value: '118',
      hint: '`service_requests` sin cerrar',
      icon: 'activity',
      trendLabel: '+8',
      trendPositive: false,
    },
    {
      id: 'sla',
      label: 'SLA 1ª respuesta (p50)',
      value: '6,4 h',
      hint: 'Objetivo interno · simulado',
      icon: 'bar-chart-3',
      trendLabel: '−0,3 h',
      trendPositive: true,
    },
    {
      id: 'flagged',
      label: 'Reviews marcadas',
      value: '6',
      hint: 'Moderación pendiente',
      icon: 'alert-triangle',
      trendLabel: null,
      trendPositive: null,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      ref: 'S-12001',
      title: 'Inspección técnica',
      professional: 'U-10424',
      category: 'Ingeniería',
      state: 'Activo',
      openRequests: '2',
      rating: '4,8',
    },
    {
      ref: 'S-12002',
      title: 'Fotografía inmobiliaria',
      professional: 'U-20102',
      category: 'Marketing',
      state: 'Activo',
      openRequests: '0',
      rating: '4,6',
    },
    {
      ref: 'S-12003',
      title: 'Trámite legal escritura',
      professional: 'U-20155',
      category: 'Legal',
      state: 'Pausado',
      openRequests: '1',
      rating: '4,9',
    },
  ];
}

export function buildServicesListSnapshot(): ServicesListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
