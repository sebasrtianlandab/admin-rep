/** Tarjeta del centro de parámetros (hub visual). */
export type ParametersHubRisk = 'Bajo' | 'Medio' | 'Alto' | 'Crítico';

export interface ParametersHubCard {
  id: string;
  /** Ruta relativa bajo `/parameters/` */
  path: string;
  category: string;
  audience: string;
  title: string;
  description: string;
  impact: string;
  risk: ParametersHubRisk;
  lastModified: string;
  icon: string;
}

export interface ParametersHubSnapshot {
  generatedAt: string;
  cards: ParametersHubCard[];
}
