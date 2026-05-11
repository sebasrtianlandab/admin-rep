import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { SupportListSnapshot } from '@features/support/domain/support.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'open',
      label: 'Casos abiertos',
      value: '64',
      hint: 'Sin entidad `tickets` en back hoy · mock',
      icon: 'life-buoy',
      trendLabel: '+5',
      trendPositive: false,
    },
    {
      id: 'sla',
      label: 'P1 sin respuesta',
      value: '3',
      hint: 'Urgente operador',
      icon: 'alert-circle',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'link',
      label: 'Vinculados a pago',
      value: '11',
      hint: 'Disputas / devoluciones',
      icon: 'credit-card',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'csat',
      label: 'CSAT (7d)',
      value: '4,3 / 5',
      hint: 'Simulado',
      icon: 'bar-chart-3',
      trendLabel: '+0,1',
      trendPositive: true,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      caseId: 'CS-7001',
      subject: 'No puedo publicar borrador',
      priority: 'P2',
      linked: 'Property P-88202',
      channel: 'Email',
      state: 'Abierto',
      opened: '2026-05-10 06:20',
    },
    {
      caseId: 'CS-7002',
      subject: 'Cobro duplicado',
      priority: 'P1',
      linked: 'Payment PAY-9002',
      channel: 'Chat',
      state: 'En curso',
      opened: '2026-05-10 05:50',
    },
    {
      caseId: 'CS-7003',
      subject: 'Invitación licencia no llega',
      priority: 'P3',
      linked: 'Company C-5001',
      channel: 'Portal',
      state: 'Espera cliente',
      opened: '2026-05-09 16:00',
    },
  ];
}

export function buildSupportListSnapshot(): SupportListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
