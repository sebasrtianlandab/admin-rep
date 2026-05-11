import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { CompaniesListSnapshot } from '@features/companies/domain/companies.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'active',
      label: 'Empresas activas',
      value: '1.204',
      hint: '`companies` · mock',
      icon: 'landmark',
      trendLabel: '+0,6%',
      trendPositive: true,
    },
    {
      id: 'lic',
      label: 'Licencias sin asignar',
      value: '27',
      hint: '`company_licence_assignments`',
      icon: 'users',
      trendLabel: null,
      trendPositive: null,
    },
    {
      id: 'invite',
      label: 'Invitaciones pendientes',
      value: '41',
      hint: 'Miembros sin aceptar',
      icon: 'activity',
      trendLabel: '+3',
      trendPositive: false,
    },
    {
      id: 'plan',
      label: 'En plan Enterprise',
      value: '88',
      hint: 'Agrupación comercial · mock',
      icon: 'bar-chart-3',
      trendLabel: null,
      trendPositive: null,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      id: 'C-5001',
      name: 'Inmobiliaria Norte SAS',
      members: '12',
      licences: '8 / 10',
      plan: 'Empresa Pro',
      state: 'Activa',
    },
    {
      id: 'C-5002',
      name: 'Urban Living',
      members: '4',
      licences: '4 / 5',
      plan: 'Equipo',
      state: 'Activa',
    },
    {
      id: 'C-5003',
      name: 'Holdings Pacífico',
      members: '22',
      licences: '20 / 20',
      plan: 'Enterprise',
      state: 'Advertencia',
    },
  ];
}

export function buildCompaniesListSnapshot(): CompaniesListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
