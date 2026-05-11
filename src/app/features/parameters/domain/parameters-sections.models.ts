/** Snapshots mock por dominio (pantallas especializadas, no inventario global). */

export interface ParametersHomeSnapshot {
  generatedAt: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImagePath: string;
  ctaPrimary: string;
  ctaSecondary: string;
  faqItemsCount: number;
  featuredStripLimit: number;
  latestStripLimit: string;
}

export interface ParametersBrandingSnapshot {
  generatedAt: string;
  portalName: string;
  logoNote: string;
  faviconNote: string;
  primaryToken: string;
  secondaryToken: string;
  institutionalLine: string;
}

export interface ParametersMarketplaceSnapshot {
  generatedAt: string;
  statusRows: { code: string; label: string; color: string; active: boolean }[];
  featuredDefault: string;
  publishRuleSummary: string;
}

export interface ParametersMonetizationSnapshot {
  generatedAt: string;
  activePlans: number;
  currency: string;
  creditPolicySummary: string;
  highlightSummary: string;
}

export interface ParametersSeoSnapshot {
  generatedAt: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImageNote: string;
  sitemapPolicy: string;
}

export interface ParametersIntegrationsSnapshot {
  generatedAt: string;
  items: { name: string; state: string; detail: string }[];
}

export interface ParametersCatalogsSnapshot {
  generatedAt: string;
  catalogs: { name: string; rows: number; lastSync: string }[];
}
