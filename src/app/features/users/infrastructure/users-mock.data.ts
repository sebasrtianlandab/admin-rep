import type { AdminModuleKpi } from '@shared/domain/admin-list-page.models';
import type { RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { UsersListSnapshot } from '@features/users/domain/users.models';

function buildKpis(): AdminModuleKpi[] {
  return [
    {
      id: 'active',
      label: 'Cuentas activas',
      value: '18.420',
      hint: 'Últimos 30 días · mock',
      icon: 'users',
      trendLabel: '+1,2%',
      trendPositive: true,
    },
    {
      id: 'blocked',
      label: 'Bloqueadas / revisión',
      value: '37',
      hint: 'Riesgo o moderación pendiente',
      icon: 'alert-triangle',
      trendLabel: '−4',
      trendPositive: true,
    },
    {
      id: 'advisers',
      label: 'Asesores con rol activo',
      value: '2.891',
      hint: 'Rol portal `adviser`',
      icon: 'briefcase',
      trendLabel: '+0,3%',
      trendPositive: true,
    },
    {
      id: 'incomplete',
      label: 'Contactos incompletos',
      value: '512',
      hint: 'Tickets soporte estimados',
      icon: 'activity',
      trendLabel: null,
      trendPositive: null,
    },
  ];
}

function buildRows(): RepTableRow[] {
  return [
    {
      id: 'U-10421',
      email: 'maria.lopez@mail.com',
      entityType: 'natural',
      roles: 'particular, adviser',
      account: 'Activa',
      lastAccess: '2026-05-10 08:12',
      flags: '—',
    },
    {
      id: 'U-10422',
      email: 'inmobiliaria.norte@empresa.com',
      entityType: 'legal',
      roles: 'adviser',
      account: 'Activa',
      lastAccess: '2026-05-09 19:40',
      flags: 'Empresa',
    },
    {
      id: 'U-10423',
      email: 'spam.ring@temp.com',
      entityType: 'natural',
      roles: '—',
      account: 'Bloqueada',
      lastAccess: '2026-05-01 11:02',
      flags: 'Abuso',
    },
    {
      id: 'U-10424',
      email: 'pro.servicios@rep.com',
      entityType: 'natural',
      roles: 'service_pro',
      account: 'Activa',
      lastAccess: '2026-05-10 06:55',
      flags: 'Pro',
    },
    {
      id: 'U-10425',
      email: 'pending.verify@mail.com',
      entityType: 'natural',
      roles: 'particular',
      account: 'Pendiente',
      lastAccess: '—',
      flags: 'KYC',
    },
  ];
}

export function buildUsersListSnapshot(): UsersListSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(),
    rows: buildRows(),
  };
}
