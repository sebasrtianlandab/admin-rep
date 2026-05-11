import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import type { ParametersAdvancedListSnapshot } from '@features/parameters/domain/parameters-advanced.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'psc',
      label: 'Estados en `property_status_config`',
      value: '12',
      hint: 'Transiciones operativas',
      icon: 'sliders-horizontal',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'plans',
      label: 'Planes activos',
      value: '5',
      hint: '`plans` / `plan_packages`',
      icon: 'credit-card',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'cat',
      label: 'Catálogos versionados',
      value: '9',
      hint: 'Tipos, monedas, categorías',
      icon: 'settings',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'ff',
      label: 'Feature flags (técnicos)',
      value: '14',
      hint: 'Solo esta sección debe editarlos',
      icon: 'activity',
      trendLabel: null,
      trendPositive: null,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      key: 'property_status_config',
      scope: 'Marketplace',
      valueType: 'Matriz estados',
      preview: 'draft → review → published',
      source: 'PostgreSQL',
      risk: 'Alto',
      changed: '2026-04-02',
    },
    {
      key: 'plan_packages.publicador',
      scope: 'Monetización',
      valueType: 'JSON límites',
      preview: 'créditos: 40, visibilidad: nacional',
      source: 'PostgreSQL',
      risk: 'Alto',
      changed: '2026-03-18',
    },
    {
      key: 'payments.webhook.stripe',
      scope: 'Integraciones',
      valueType: 'Secreto ref.',
      preview: '•••• last4 env',
      source: 'Vault',
      risk: 'Crítico',
      changed: '2026-05-01',
    },
    {
      key: 'feature.flags.search_v2',
      scope: 'Técnico',
      valueType: 'Boolean',
      preview: 'false (staging: true)',
      source: 'Config service',
      risk: 'Alto',
      changed: '2026-05-07',
    },
  ];
}

export function buildParametersAdvancedListSnapshot(): ParametersAdvancedListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
