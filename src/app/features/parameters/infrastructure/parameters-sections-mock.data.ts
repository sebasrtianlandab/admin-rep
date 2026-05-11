import type {
  ParametersAuditInfo,
  ParametersBrandingSnapshot,
  ParametersCatalogsSnapshot,
  ParametersHomeSnapshot,
  ParametersIntegrationsSnapshot,
  ParametersMarketplaceSnapshot,
  ParametersMonetizationSnapshot,
  ParametersSeoSnapshot,
} from '@features/parameters/domain/parameters-sections.models';

const now = () => new Date().toISOString();

function audit(
  updatedBy: string,
  editorRole: string,
  summary: string,
  updatedAt = now(),
): ParametersAuditInfo {
  return { updatedAt, updatedBy, editorRole, summary };
}

export function buildParametersHomeSnapshot(): ParametersHomeSnapshot {
  return {
    generatedAt: now(),
    audit: audit('Mariana Torres', 'Marketing Lead', 'Ajustó el hero y el orden de las tiras.'),
    config: {
      hero: {
        eyebrow: 'Portal inmobiliario',
        title: 'Encuentra tu próximo hogar',
        subtitle: 'Propiedades verificadas, atención humana y destacados de alto rendimiento.',
        ctaPrimary: 'Explorar propiedades',
        ctaSecondary: 'Publicar inmueble',
        heroImage: '/images/hero-default.webp',
        overlayEnabled: true,
        alignment: 'left',
        enabled: true,
      },
      faqs: [
        {
          id: 'faq-1',
          question: '¿Cómo publico una propiedad?',
          answer: 'Completa la ficha, envía para revisión y el equipo valida el contenido antes de publicar.',
          enabled: true,
        },
        {
          id: 'faq-2',
          question: '¿Qué incluye un plan destacado?',
          answer: 'Mayor visibilidad en home, prioridad en listados y créditos para boosts semanales.',
          enabled: true,
        },
        {
          id: 'faq-3',
          question: '¿Puedo editar mi anuncio luego?',
          answer: 'Sí, puedes editarlo y reenviarlo a moderación si el cambio es sensible.',
          enabled: true,
        },
      ],
      sections: [
        { id: 'featured', label: 'Propiedades destacadas', enabled: true, order: 1, limit: 12, copy: 'Selección editorial con mayor conversión.' },
        { id: 'latest', label: 'Últimas publicaciones', enabled: true, order: 2, limit: 24, copy: 'Inventario fresco por zona y tipología.' },
        { id: 'testimonials', label: 'Testimonios', enabled: true, order: 3, limit: 3, copy: 'Historias de clientes y agentes verificados.' },
        { id: 'cta-footer', label: 'CTA final', enabled: true, order: 4, limit: 1, copy: 'Invita a publicar o agendar una asesoría.' },
        { id: 'blog', label: 'Blog strip', enabled: false, order: 5, limit: 4, copy: 'Contenido SEO para captación orgánica.' },
      ],
    },
  };
}

export function buildParametersBrandingSnapshot(): ParametersBrandingSnapshot {
  return {
    generatedAt: now(),
    audit: audit('Diego Molina', 'Brand Manager', 'Actualizó activos y preset de interfaz.'),
    config: {
      logoLight: '/img/logo/rep-light.svg',
      logoDark: '/img/logo/rep-dark.svg',
      favicon: '/img/logo/favicon.ico',
      appName: 'REP Marketplace',
      shortName: 'REP',
      primaryColor: '#663366',
      accentColor: '#1d6bad',
      neutralColor: '#212832',
      radiusPreset: 'balanced',
      densityPreset: 'comfortable',
      institutionalText: 'La plataforma inmobiliaria para publicar, descubrir y operar con confianza.',
    },
  };
}

export function buildParametersMarketplaceSnapshot(): ParametersMarketplaceSnapshot {
  return {
    generatedAt: now(),
    audit: audit('Sofía Ramírez', 'Operations Manager', 'Ajustó workflow y límites de publicación.'),
    config: {
      statuses: [
        {
          id: 'draft',
          code: 'draft',
          label: 'Borrador',
          color: '#94a3b8',
          icon: 'help-circle',
          active: true,
          description: 'Contenido incompleto o pendiente de envío.',
          order: 1,
        },
        {
          id: 'review',
          code: 'review',
          label: 'En revisión',
          color: '#f59e0b',
          icon: 'alert-circle',
          active: true,
          description: 'Validación editorial y comercial.',
          order: 2,
        },
        {
          id: 'published',
          code: 'published',
          label: 'Publicada',
          color: '#22c55e',
          icon: 'activity',
          active: true,
          description: 'Visible en catálogo y landing.',
          order: 3,
        },
        {
          id: 'archived',
          code: 'archived',
          label: 'Archivada',
          color: '#64748b',
          icon: 'x',
          active: true,
          description: 'Fuera de circulación pero disponible en histórico.',
          order: 4,
        },
      ],
      rules: {
        moderationMode: 'manual',
        featuredLogic: 'Score editorial + antigüedad reciente + prioridad comercial por zona.',
        publicationLimit: 30,
        maxFeaturedPerZone: 3,
        reviewSlaHours: 12,
        badgesPolicy: 'Solo propiedades verificadas pueden recibir badge Premium.',
      },
    },
  };
}

export function buildParametersMonetizationSnapshot(): ParametersMonetizationSnapshot {
  return {
    generatedAt: now(),
    audit: audit('Carlos Vega', 'Revenue Ops', 'Actualizó precios y créditos del publicador.'),
    config: {
      general: {
        defaultCurrency: 'EUR',
        billingCycleLabel: 'Facturación mensual',
        taxesIncluded: true,
        selfServeEnabled: true,
      },
      pricing: {
        featuredPrice: '29.90',
        premiumMultiplier: '1.8',
        renewalDiscount: '10%',
      },
      limits: {
        freePublications: 2,
        premiumPublications: 40,
        maxHighlights: 6,
      },
      credits: {
        monthlyCredits: 120,
        rolloverDays: 30,
        bonusPackLabel: 'Pack impulso trimestral',
      },
      marketing: {
        headline: 'Planes flexibles para inmobiliarias y agentes.',
        subtitle: 'Activa boosts, destacados y créditos según el tamaño de tu operación.',
        cta: 'Ver planes',
      },
      plans: [
        {
          id: 'starter',
          name: 'Starter',
          headline: 'Primeras publicaciones con soporte básico',
          price: '19',
          interval: 'monthly',
          featuredSlots: 1,
          creditPack: 20,
          active: true,
        },
        {
          id: 'growth',
          name: 'Growth',
          headline: 'Mayor visibilidad y créditos para impulsar zonas',
          price: '59',
          interval: 'monthly',
          featuredSlots: 3,
          creditPack: 80,
          active: true,
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          headline: 'Operación multi-equipo con límites extendidos',
          price: '129',
          interval: 'monthly',
          featuredSlots: 8,
          creditPack: 200,
          active: true,
        },
      ],
    },
  };
}

export function buildParametersSeoSnapshot(): ParametersSeoSnapshot {
  return {
    generatedAt: now(),
    audit: audit('Lucía Herrera', 'SEO Lead', 'Optimizó title, description y robots por defecto.'),
    previewUrl: 'https://realestate.pe/',
    config: {
      metaTitle: 'REP · Propiedades y servicios inmobiliarios',
      metaDescription:
        'Compra, alquila y publica propiedades con confianza. Marketplace curado y planes flexibles.',
      ogImage: '/img/seo/og-home.png',
      keywords: 'inmuebles, marketplace, propiedades, inmobiliaria, alquiler, compra',
      robots: 'index,follow',
      canonical: 'https://realestate.pe/',
    },
  };
}

export function buildParametersIntegrationsSnapshot(): ParametersIntegrationsSnapshot {
  return {
    generatedAt: now(),
    audit: audit('Miguel Paredes', 'Platform Admin', 'Actualizó endpoints y rotación programada.'),
    items: [
      {
        id: 'smtp',
        name: 'SMTP transaccional',
        status: 'Configurado',
        enabled: true,
        lastFour: '1A2B',
        description: 'Notificaciones de alta, recuperación y validación de cuentas.',
        endpoint: 'smtp://mail.rep.mock',
        owner: 'Growth Ops',
        lastRotated: '2026-05-04T09:00:00.000Z',
      },
      {
        id: 'cloudinary',
        name: 'Cloudinary',
        status: 'Activo',
        enabled: true,
        lastFour: '9X3Q',
        description: 'Gestión de imágenes públicas y assets de marca.',
        endpoint: 'https://api.cloudinary.com/v1_1/rep-public',
        owner: 'Brand Ops',
        lastRotated: '2026-04-26T12:30:00.000Z',
      },
      {
        id: 'maps',
        name: 'Google Maps',
        status: 'Activo',
        enabled: true,
        lastFour: '7M4K',
        description: 'Geocoding y autocompletado de direcciones.',
        endpoint: 'https://maps.googleapis.com/maps/api',
        owner: 'Marketplace Ops',
        lastRotated: '2026-04-18T08:20:00.000Z',
      },
      {
        id: 'stripe',
        name: 'Pasarela de pagos',
        status: 'Sandbox',
        enabled: true,
        lastFour: '5P8D',
        description: 'Cobros de planes y validación de webhooks firmados.',
        endpoint: 'https://api.stripe.com',
        owner: 'Revenue Ops',
        lastRotated: '2026-05-08T10:00:00.000Z',
      },
    ],
  };
}

export function buildParametersCatalogsSnapshot(): ParametersCatalogsSnapshot {
  return {
    generatedAt: now(),
    audit: audit('Ana Rojas', 'Data Steward', 'Versionó catálogos principales del marketplace.'),
    items: [
      {
        id: 'property-types',
        name: 'Tipos de propiedad',
        type: 'Marketplace',
        status: 'Activo',
        rows: 18,
        lastSync: '2026-05-09T06:00:00.000Z',
        description: 'Catálogo maestro para publicación y filtros públicos.',
        editable: true,
        source: 'Interno',
        syncStrategy: 'Manual',
        visible: true,
      },
      {
        id: 'currencies',
        name: 'Monedas y tasas',
        type: 'Finanzas',
        status: 'Sincronizado',
        rows: 6,
        lastSync: '2026-05-09T06:00:00.000Z',
        description: 'Monedas visibles y ajustes operativos del pricing.',
        editable: false,
        source: 'Sync externo',
        syncStrategy: 'Nocturna',
        visible: true,
      },
      {
        id: 'districts',
        name: 'Zonas y barrios',
        type: 'Geo',
        status: 'Borrador',
        rows: 240,
        lastSync: '2026-05-08T22:00:00.000Z',
        description: 'Referencia geográfica para formularios y buscador.',
        editable: true,
        source: 'Interno',
        syncStrategy: 'Webhook',
        visible: true,
      },
    ],
  };
}
