import { DashboardSnapshot } from '@features/dashboard/domain/dashboard.models';

export function buildMockDashboardSnapshot(): DashboardSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    kpis: [
      {
        id: 'users',
        label: 'Usuarios activos (30 días)',
        value: '2 847',
        hint: 'Personas naturales y cuentas verificadas',
        icon: 'users',
        trendLabel: '+6,2 % vs. mes anterior',
        trendPositive: true,
      },
      {
        id: 'listings',
        label: 'Propiedades publicadas',
        value: '1 192',
        hint: 'Catálogo visible en portal',
        icon: 'building-2',
        trendLabel: '+2,1 %',
        trendPositive: true,
      },
      {
        id: 'payments',
        label: 'Pagos completados (7 días)',
        value: 'S/ 184 200',
        hint: 'Importe bruto mock · no conciliado',
        icon: 'credit-card',
        trendLabel: '−0,8 %',
        trendPositive: false,
      },
      {
        id: 'requests',
        label: 'Solicitudes de servicio',
        value: '356',
        hint: 'Nuevas en la última semana',
        icon: 'activity',
        trendLabel: 'Estable',
        trendPositive: null,
      },
    ],
    quickStats: [
      { label: 'Borradores de propiedad', value: '128' },
      { label: 'Profesionales de servicios', value: '412' },
      { label: 'Empresas (legal)', value: '96' },
      { label: 'Créditos consumidos (hoy)', value: '74' },
    ],
    charts: [
      {
        id: 'publications',
        title: 'Publicaciones por día',
        description: 'Serie simulada · integración de analytics pendiente',
      },
      {
        id: 'revenue',
        title: 'Ingresos por gateway (mock)',
        description: 'Distribución ilustrativa Culqi / Flow',
      },
    ],
    activity: [
      {
        date: '2026-05-10 08:42',
        kind: 'Propiedad',
        actor: 'maria.g@ejemplo.pe',
        summary: 'Publicación · Miraflores · Venta',
        outcome: 'Crédito consumido',
      },
      {
        date: '2026-05-10 08:15',
        kind: 'Pago',
        actor: 'checkout',
        summary: 'Plan Profesional · paquete 10 créditos',
        outcome: 'Completado',
      },
      {
        date: '2026-05-10 07:58',
        kind: 'Servicio',
        actor: 'carlos.r@ejemplo.pe',
        summary: 'Borrador enviado a revisión multimedia',
        outcome: 'Pendiente',
      },
      {
        date: '2026-05-09 18:22',
        kind: 'Empresa',
        actor: 'admin@inmobiliaria.demo',
        summary: 'Asignación de licencia a asesor',
        outcome: 'Pool actualizado',
      },
      {
        date: '2026-05-09 16:05',
        kind: 'Usuario',
        actor: 'soporte@rep.local',
        summary: 'Verificación de correo',
        outcome: 'OK',
      },
    ],
  };
}
