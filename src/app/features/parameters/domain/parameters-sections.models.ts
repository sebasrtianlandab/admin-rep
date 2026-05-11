/** Snapshots mock por dominio con formularios editables y metadatos de auditoría. */

export interface ParametersAuditInfo {
  updatedAt: string;
  updatedBy: string;
  editorRole: string;
  summary: string;
}

export type ParametersHeroAlignment = 'left' | 'center' | 'right';

export interface ParametersHomeHeroConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImage: string;
  overlayEnabled: boolean;
  alignment: ParametersHeroAlignment;
  enabled: boolean;
}

export interface ParametersHomeFaqItem {
  id: string;
  question: string;
  answer: string;
  enabled: boolean;
}

export interface ParametersHomeSectionItem {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
  limit: number;
  copy: string;
}

export interface ParametersHomeConfig {
  hero: ParametersHomeHeroConfig;
  faqs: ParametersHomeFaqItem[];
  sections: ParametersHomeSectionItem[];
}

export interface ParametersHomeSnapshot {
  generatedAt: string;
  audit: ParametersAuditInfo;
  config: ParametersHomeConfig;
}

export type ParametersBrandingRadiusPreset = 'soft' | 'balanced' | 'sharp';
export type ParametersBrandingDensityPreset = 'compact' | 'comfortable';

export interface ParametersBrandingConfig {
  logoLight: string;
  logoDark: string;
  favicon: string;
  appName: string;
  shortName: string;
  primaryColor: string;
  accentColor: string;
  neutralColor: string;
  radiusPreset: ParametersBrandingRadiusPreset;
  densityPreset: ParametersBrandingDensityPreset;
  institutionalText: string;
}

export interface ParametersBrandingSnapshot {
  generatedAt: string;
  audit: ParametersAuditInfo;
  config: ParametersBrandingConfig;
}

export interface ParametersMarketplaceStatus {
  id: string;
  code: string;
  label: string;
  color: string;
  icon: string;
  active: boolean;
  description: string;
  order: number;
}

export interface ParametersMarketplaceRules {
  moderationMode: 'manual' | 'assisted' | 'automatic';
  featuredLogic: string;
  publicationLimit: number;
  maxFeaturedPerZone: number;
  reviewSlaHours: number;
  badgesPolicy: string;
}

export interface ParametersMarketplaceConfig {
  statuses: ParametersMarketplaceStatus[];
  rules: ParametersMarketplaceRules;
}

export interface ParametersMarketplaceSnapshot {
  generatedAt: string;
  audit: ParametersAuditInfo;
  config: ParametersMarketplaceConfig;
}

export interface ParametersMonetizationPlan {
  id: string;
  name: string;
  headline: string;
  price: string;
  interval: 'monthly' | 'quarterly' | 'yearly';
  featuredSlots: number;
  creditPack: number;
  active: boolean;
}

export interface ParametersMonetizationConfig {
  general: {
    defaultCurrency: string;
    billingCycleLabel: string;
    taxesIncluded: boolean;
    selfServeEnabled: boolean;
  };
  pricing: {
    featuredPrice: string;
    premiumMultiplier: string;
    renewalDiscount: string;
  };
  limits: {
    freePublications: number;
    premiumPublications: number;
    maxHighlights: number;
  };
  credits: {
    monthlyCredits: number;
    rolloverDays: number;
    bonusPackLabel: string;
  };
  marketing: {
    headline: string;
    subtitle: string;
    cta: string;
  };
  plans: ParametersMonetizationPlan[];
}

export interface ParametersMonetizationSnapshot {
  generatedAt: string;
  audit: ParametersAuditInfo;
  config: ParametersMonetizationConfig;
}

export interface ParametersSeoConfig {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string;
  robots: 'index,follow' | 'noindex,follow' | 'noindex,nofollow';
  canonical: string;
}

export interface ParametersSeoSnapshot {
  generatedAt: string;
  audit: ParametersAuditInfo;
  previewUrl: string;
  config: ParametersSeoConfig;
}

export interface ParametersIntegrationItem {
  id: string;
  name: string;
  status: 'Activo' | 'Configurado' | 'Sandbox' | 'Pendiente';
  enabled: boolean;
  lastFour: string;
  description: string;
  endpoint: string;
  owner: string;
  lastRotated: string;
}

export interface ParametersIntegrationsSnapshot {
  generatedAt: string;
  audit: ParametersAuditInfo;
  items: ParametersIntegrationItem[];
}

export interface ParametersCatalogItem {
  id: string;
  name: string;
  type: string;
  status: 'Activo' | 'Borrador' | 'Sincronizado';
  rows: number;
  lastSync: string;
  description: string;
  editable: boolean;
  source: 'Interno' | 'Sync externo';
  syncStrategy: 'Manual' | 'Nocturna' | 'Webhook';
  visible: boolean;
}

export interface ParametersCatalogsSnapshot {
  generatedAt: string;
  audit: ParametersAuditInfo;
  items: ParametersCatalogItem[];
}
