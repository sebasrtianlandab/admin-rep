import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { AuditListSnapshot } from '@features/audit/domain/audit.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'vol',
      label: 'Eventos / 24h',
      value: '12.800',
      hint: 'Proyección con store futuro',
      icon: 'clipboard-list',
      trendLabel: '+3%',
      trendPositive: false,
    },
    {
      id: 'admin',
      label: 'Acciones admin',
      value: '186',
      hint: 'Cambios sensibles',
      icon: 'alert-triangle',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'auth',
      label: 'Fallos login',
      value: '420',
      hint: 'Rate-limit / fraude',
      icon: 'alert-circle',
      trendLabel: '−2%',
      trendPositive: true,
    },
    {
      id: 'export',
      label: 'Exportaciones compliance',
      value: '2',
      hint: 'Últimos 7 días · mock',
      icon: 'activity',
      trendLabel: null,
      trendPositive: null,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      at: '2026-05-10 09:12:04',
      actor: 'admin@rep.internal',
      action: 'USER_BLOCK_REQUEST',
      resource: 'User U-10423',
      ip: '10.0.4.2',
      outcome: 'Pendiente API',
    },
    {
      at: '2026-05-10 08:58:11',
      actor: 'ops@rep.internal',
      action: 'PROPERTY_MODERATION_HIDE',
      resource: 'Property P-88203',
      ip: '10.0.4.8',
      outcome: 'OK (mock)',
    },
    {
      at: '2026-05-10 08:40:00',
      actor: 'system',
      action: 'PAYMENT_WEBHOOK_STRIPE',
      resource: 'Payment PAY-9001',
      ip: '—',
      outcome: 'Completado',
    },
  ];
}

export function buildAuditListSnapshot(): AuditListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
