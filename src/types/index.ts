export type MaterialKey = 'PLA' | 'PETG' | 'ABS';

export type LayerHeightKey = '0.12' | '0.16' | '0.20';

export interface MaterialInfo {
  key: MaterialKey;
  name: string;
  fullName: string;
  density: number; // g/cm3
  basePricePerGram: number; // IDR
  tempResistance: string;
  strengthRating: number; // 1-5
  flexibilityRating: number; // 1-5
  detailRating: number; // 1-5
  bestFor: string;
  description: string;
  colorOptions: string[];
  imageSrc: string;
}

export interface LayerHeightInfo {
  key: LayerHeightKey;
  label: string;
  detailLevel: string;
  pricePerGramPla: { min: number; max: number; base: number };
  description: string;
  recommendedFor: string;
}

export interface ModelMetrics {
  volumeCm3: number;
  dimensionsMm: {
    x: number;
    y: number;
    z: number;
  };
  triangleCount: number;
  fileName: string;
}

export interface CalculationResult {
  metrics: ModelMetrics;
  material: MaterialKey;
  layerHeight: LayerHeightKey;
  infillPct: number;
  quantity: number;
  color: string;
  estimatedWeightGrams: number;
  unitPrice: number;
  totalPrice: number;
  estimatedHours: number;
}
