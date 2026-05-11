import type {
  ParametersBrandingSnapshot,
  ParametersCatalogsSnapshot,
  ParametersHomeSnapshot,
  ParametersIntegrationsSnapshot,
  ParametersMarketplaceSnapshot,
  ParametersMonetizationSnapshot,
  ParametersSeoSnapshot,
} from '@features/parameters/domain/parameters-sections.models';

const now = () => new Date().toISOString();

export function buildParametersHomeSnapshot(): ParametersHomeSnapshot {
  return {
    generatedAt: now(),
    heroEyebrow: 'Portal inmobiliario',
    heroTitle: 'Encuentra tu próximo hogar',
    heroSubtitle: 'Propiedades verificadas y asesores cercanos a ti.',
    heroImagePath: '/images/hero-default.webp',
    ctaPrimary: 'Explorar propiedades',
    ctaSecondary: 'Publicar inmueble',
    faqItemsCount: 6,
    featuredStripLimit: 12,
    latestStripLimit: '24 publicaciones',
  };
}

export function buildParametersBrandingSnapshot(): ParametersBrandingSnapshot {
  return {
    generatedAt: now(),
    portalName: 'REP Marketplace',
    logoNote: 'SVG principal + variante horizontal para header.',
    faviconNote: 'favicon.ico + apple-touch-icon',
    primaryToken: '--rep-color-primary',
    secondaryToken: '--rep-color-surface-elevated',
    institutionalLine: '© REP · Términos y privacidad enlazados desde el pie.',
  };
}

export function buildParametersMarketplaceSnapshot(): ParametersMarketplaceSnapshot {
  return {
    generatedAt: now(),
    statusRows: [
      { code: 'draft', label: 'Borrador', color: '#94a3b8', active: true },
      { code: 'review', label: 'En revisión', color: '#f59e0b', active: true },
      { code: 'published', label: 'Publicada', color: '#22c55e', active: true },
      { code: 'archived', label: 'Archivada', color: '#64748b', active: true },
    ],
    featuredDefault: 'Score editorial + antigüedad reciente',
    publishRuleSummary: 'Moderación humana obligatoria para primer alta.',
  };
}

export function buildParametersMonetizationSnapshot(): ParametersMonetizationSnapshot {
  return {
    generatedAt: now(),
    activePlans: 5,
    currency: 'EUR',
    creditPolicySummary: 'Créditos mensuales por paquete; rollover 30 días.',
    highlightSummary: 'Destacados nacionales limitados a 3 por zona activa.',
  };
}

export function buildParametersSeoSnapshot(): ParametersSeoSnapshot {
  return {
    generatedAt: now(),
    defaultTitle: 'REP · Propiedades y servicios inmobiliarios',
    defaultDescription:
      'Compra, alquila y publica propiedades con confianza. Marketplace curado y planes flexibles.',
    ogImageNote: 'Imagen OG 1200×630 desde biblioteca de marca.',
    sitemapPolicy: 'Regeneración diaria + prioridad 0.8 en fichas publicadas.',
  };
}

export function buildParametersIntegrationsSnapshot(): ParametersIntegrationsSnapshot {
  return {
    generatedAt: now(),
    items: [
      { name: 'SMTP transaccional', state: 'Configurado', detail: 'Proveedor mock · DKIM pendiente' },
      { name: 'Medios (Cloudinary)', state: 'Activo', detail: 'Carpeta `rep-public/`' },
      { name: 'Google Maps', state: 'Activo', detail: 'Clave restringida por dominio' },
      { name: 'Pasarela de pagos', state: 'Sandbox', detail: 'Webhook firmado' },
    ],
  };
}

export function buildParametersCatalogsSnapshot(): ParametersCatalogsSnapshot {
  return {
    generatedAt: now(),
    catalogs: [
      { name: 'Tipos de propiedad', rows: 18, lastSync: '2026-05-09T06:00:00.000Z' },
      { name: 'Monedas y tasas', rows: 6, lastSync: '2026-05-09T06:00:00.000Z' },
      { name: 'Zonas y barrios', rows: 240, lastSync: '2026-05-08T22:00:00.000Z' },
    ],
  };
}
