import * as THREE from 'three';
import type { MaterialKey, LayerHeightKey, MaterialInfo, LayerHeightInfo } from '../types';
import { SITE_CONFIG } from '../config/site';

export const MATERIALS: Record<MaterialKey, MaterialInfo> = {
  PLA: {
    key: 'PLA',
    name: 'PLA',
    fullName: 'Polylactic Acid',
    density: 1.24, // g/cm³
    basePricePerGram: 750,
    tempResistance: '50°C - 55°C',
    strengthRating: 3.5,
    flexibilityRating: 2,
    detailRating: 5,
    bestFor: 'Maket arsitektur, figurin, display visual, prototype awal',
    description: 'Material ramah lingkungan berbasis pati jagung. Menghasilkan permukaan paling rapi, minim warping, dan sudut tajam sangat presisi.',
    colorOptions: ['Hitam Doff', 'Putih Bersih', 'Abu-Abu Industri', 'Hijau Hutan', 'Merah'],
    imageSrc: '/images/pla_sample.jpg'
  },
  PETG: {
    key: 'PETG',
    name: 'PETG',
    fullName: 'Polyethylene Terephthalate Glycol',
    density: 1.27, // g/cm³
    basePricePerGram: 850,
    tempResistance: '70°C - 75°C',
    strengthRating: 4.5,
    flexibilityRating: 3.5,
    detailRating: 4,
    bestFor: 'Komponen mekanis fungsional, wadah tahan air, part outdoor',
    description: 'Kombinasi kemudahan cetak PLA dengan ketahanan benturan tinggi. Sangat ulet, tahan cuaca, dan tahan paparan bahan kimia ringan.',
    colorOptions: ['Hitam Pekat', 'Transparan/Bening', 'Abu-Abu', 'Biru'],
    imageSrc: '/images/petg_sample.png'
  }
};

export const LAYER_HEIGHTS: Record<LayerHeightKey, LayerHeightInfo> = {
  '0.12': {
    key: '0.12',
    label: '0.12 mm (High Detail)',
    detailLevel: 'Sangat Halus',
    pricePerGramPla: { min: 850, max: 2400, base: 850 },
    description: 'Lapisan layer nyaris tidak terlihat dengan mata telanjang. Cocok untuk figurin dan model dengan lekukan kurva halus.',
    recommendedFor: 'Figurin, miniature, aksesoris cosplay presisi'
  },
  '0.16': {
    key: '0.16',
    label: '0.16 mm (Optimal / Standard)',
    detailLevel: 'Halus Seimbang',
    pricePerGramPla: { min: 750, max: 2400, base: 750 },
    description: 'Keseimbangan sempurna antara kecepatan produksi dan kehalusan permukaan. Pilihan standar paling populer.',
    recommendedFor: 'Casing perangkat, prototype produk, part mekanik umum'
  },
  '0.20': {
    key: '0.20',
    label: '0.20 mm (Draft / Fast)',
    detailLevel: 'Standar Cepat',
    pricePerGramPla: { min: 500, max: 2400, base: 500 },
    description: 'Waktu cetak paling efisien dan biaya paling terjangkau. Cocok untuk uji dimensi dan mock-up awal.',
    recommendedFor: 'Tugas akhir validasi bentuk, fitting rangka, dudukan alat'
  }
};

/**
 * Calculates signed volume of a 3D geometry using the divergence theorem
 * on tetrahedrons formed by triangles and the origin.
 * Result is in cm³ (cubic centimeters).
 */
export function calculateMeshVolume(geometry: THREE.BufferGeometry): number {
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  let bboxVolumeCm3 = 1.0;
  if (bbox) {
    const size = new THREE.Vector3();
    bbox.getSize(size);
    bboxVolumeCm3 = Math.max(0.1, (size.x * size.y * size.z) / 1000.0);
  }

  let volumeMm3 = 0;
  const position = geometry.attributes.position;
  const index = geometry.index;

  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  const getSignedVolume = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
    return a.dot(b.cross(c)) / 6.0;
  };

  if (index) {
    for (let i = 0; i < index.count; i += 3) {
      const i1 = index.getX(i);
      const i2 = index.getX(i + 1);
      const i3 = index.getX(i + 2);

      p1.fromBufferAttribute(position, i1);
      p2.fromBufferAttribute(position, i2);
      p3.fromBufferAttribute(position, i3);

      volumeMm3 += getSignedVolume(p1, p2, p3);
    }
  } else if (position) {
    for (let i = 0; i < position.count; i += 3) {
      p1.fromBufferAttribute(position, i);
      p2.fromBufferAttribute(position, i + 1);
      p3.fromBufferAttribute(position, i + 2);

      volumeMm3 += getSignedVolume(p1, p2, p3);
    }
  }

  const rawVolCm3 = Math.abs(volumeMm3) / 1000.0;

  // Sanity check:
  // Model 3D di dunia nyata mengisi sekitar 25% - 70% dari volume bounding box.
  // Jika mesh tidak watertight, terbuka, atau segitiganya saling meniadakan sehingga rawVol mendekati 0,
  // gunakan estimasi volumetrik 35% bounding box agar pertambahan dimensi selalu menaikkan harga secara realistis.
  let validVolCm3 = rawVolCm3;
  if (validVolCm3 < bboxVolumeCm3 * 0.05 || isNaN(validVolCm3)) {
    validVolCm3 = bboxVolumeCm3 * 0.35;
  } else if (validVolCm3 > bboxVolumeCm3) {
    validVolCm3 = bboxVolumeCm3 * 0.85;
  }

  return Math.max(0.1, Number(validVolCm3.toFixed(2)));
}

/**
 * Computes bounding box dimensions in mm.
 */
export function getBoundingDimensions(geometry: THREE.BufferGeometry): { x: number; y: number; z: number } {
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  if (!bbox) {
    return { x: 0, y: 0, z: 0 };
  }
  const size = new THREE.Vector3();
  bbox.getSize(size);
  return {
    x: Number(size.x.toFixed(1)),
    y: Number(size.y.toFixed(1)),
    z: Number(size.z.toFixed(1))
  };
}

/**
 * Estimates physical filament weight in grams based on solid volume,
 * material density, and infill percentage.
 * FDM printing utilizes perimeter walls (solid) plus internal infill.
 */
export function estimateFilamentWeight(
  volumeCm3: number,
  materialKey: MaterialKey,
  infillPct: number
): number {
  const material = MATERIALS[materialKey];
  // Effective density factor: ~25% fixed shell perimeters + remaining percentage scaled by infill
  const infillRatio = Math.max(0.1, Math.min(1.0, infillPct / 100));
  const effectiveVolumeFactor = 0.25 + 0.75 * infillRatio;
  const rawWeight = volumeCm3 * material.density * effectiveVolumeFactor;
  // Add 10% safety margin for purge line, brim, and slicer travel retraction
  const totalWeight = rawWeight * 1.1;
  return Math.max(1, Math.round(totalWeight));
}

/**
 * Calculates estimated price based on Treedible service tariff from Observation Report.
 * Uses transparent linear tariff per gram based on material and layer height.
 */
export function calculatePrintPrice(
  weightGrams: number,
  materialKey: MaterialKey,
  layerHeightKey: LayerHeightKey,
  quantity: number = 1
): { unitPrice: number; totalPrice: number; ratePerGram: number } {
  const layerInfo = LAYER_HEIGHTS[layerHeightKey];
  let ratePerGram = layerInfo.pricePerGramPla.base;

  if (materialKey === 'PETG') {
    ratePerGram += 100;
  }

  // Pure linear tariff based on filament weight:
  // e.g. PLA 0.16mm is Rp 750/g, 0.12mm is Rp 850/g, 0.20mm is Rp 500/g
  const materialCost = weightGrams * ratePerGram;
  
  // Unit price rounds to nearest 500 IDR with minimal floor of Rp 1.000
  const unitPrice = Math.max(1000, Math.ceil(materialCost / 500) * 500);
  const totalPrice = unitPrice * quantity;

  return { unitPrice, totalPrice, ratePerGram };
}

/**
 * Estimates print time in hours for Bambu Lab P1S high-speed printer.
 */
export function estimatePrintTimeHours(weightGrams: number, layerHeightKey: LayerHeightKey): number {
  // Bambu Lab P1S typically prints 15g to 30g per hour depending on layer height
  let speedGramPerHour = 22;
  if (layerHeightKey === '0.12') speedGramPerHour = 14;
  if (layerHeightKey === '0.20') speedGramPerHour = 28;

  const hours = weightGrams / speedGramPerHour;
  return Math.max(0.5, Number(hours.toFixed(1)));
}

/**
 * Formats numbers into Indonesian Rupiah currency format.
 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Generates direct WhatsApp click-to-chat URL with structured order summary.
 */
export function generateWhatsAppLink(
  fileName: string,
  dimensions: { x: number; y: number; z: number },
  volumeCm3: number,
  weightGrams: number,
  materialKey: MaterialKey,
  layerHeightKey: LayerHeightKey,
  infillPct: number,
  color: string,
  quantity: number,
  totalPrice: number,
  scalePct: number = 100
): string {
  const phone = SITE_CONFIG.whatsappNumber;
  const scaleInfo = scalePct !== 100 ? `\nSkala Cetak: ${scalePct}%` : '';
  const message = `Halo Admin Treedible 3D Printing, saya ingin konsultasi dan cetak file 3D dengan rincian berikut:

Nama File: ${fileName}
Dimensi Model: ${dimensions.x} x ${dimensions.y} x ${dimensions.z} mm${scaleInfo}
Volume Geometris: ${volumeCm3} cm³
Material: ${materialKey} (${MATERIALS[materialKey].fullName})
Warna: ${color}
Kerapatan Infill: ${infillPct}%
Kualitas Layer: ${layerHeightKey} mm (${LAYER_HEIGHTS[layerHeightKey].detailLevel})
Jumlah Pesanan: ${quantity} pcs
Estimasi Berat Filament: ±${weightGrams * quantity} gram
Estimasi Biaya: ${formatRupiah(totalPrice)}

Apakah file ini siap untuk di-slice di Bambu Studio? Terima kasih.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
