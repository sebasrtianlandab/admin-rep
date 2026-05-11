import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { PaymentsListSnapshot } from '@features/payments/domain/payments.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'failed',
      label: 'Fallidos 24h',
      value: '14',
      hint: 'Revisar webhooks / gateway',
      icon: 'alert-triangle',
      trendLabel: '+2',
      trendPositive: false,
    },
    {
      id: 'pending',
      label: 'Pendientes captura',
      value: '38',
      hint: 'Estado intermedio · mock',
      icon: 'credit-card',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'volume',
      label: 'Volumen liquidado (24h)',
      value: 'COP 42,1M',
      hint: 'Suma aproximada simulada',
      icon: 'bar-chart-3',
      trendLabel: '+5%',
      trendPositive: true,
    },
    {
      id: 'gw',
      label: 'Gateways activos',
      value: '2',
      hint: 'Coincide con `webhook/:gateway`',
      icon: 'settings',
      trendLabel: null,
      trendPositive: null,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      id: 'PAY-9001',
      user: 'U-10421',
      amount: '149.900',
      currency: 'COP',
      gateway: 'stripe',
      status: 'Completado',
      created: '2026-05-10 08:01',
    },
    {
      id: 'PAY-9002',
      user: 'U-10422',
      amount: '89.000',
      currency: 'COP',
      gateway: 'wompi',
      status: 'Fallido',
      created: '2026-05-10 07:55',
    },
    {
      id: 'PAY-9003',
      user: 'U-10424',
      amount: '320.000',
      currency: 'COP',
      gateway: 'stripe',
      status: 'Pendiente',
      created: '2026-05-10 07:40',
    },
  ];
}

export function buildPaymentsListSnapshot(): PaymentsListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
