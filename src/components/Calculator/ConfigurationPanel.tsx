import React from 'react';
import type { MaterialKey, LayerHeightKey, ModelMetrics } from '../../types';
import { MATERIALS, LAYER_HEIGHTS, formatRupiah, generateWhatsAppLink } from '../../utils/calculator';
import { Layers, Disc, Scale, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

interface ConfigurationPanelProps {
  metrics: ModelMetrics | null;
  material: MaterialKey;
  onChangeMaterial: (mat: MaterialKey) => void;
  layerHeight: LayerHeightKey;
  onChangeLayerHeight: (layer: LayerHeightKey) => void;
  infillPct: number;
  onChangeInfill: (val: number) => void;
  selectedColor: string;
  onChangeColor: (col: string) => void;
  quantity: number;
  onChangeQuantity: (qty: number) => void;
  estimatedWeightGrams: number;
  unitPrice: number;
  totalPrice: number;
  estimatedHours: number;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  metrics,
  material,
  onChangeMaterial,
  layerHeight,
  onChangeLayerHeight,
  infillPct,
  onChangeInfill,
  selectedColor,
  onChangeColor,
  quantity,
  onChangeQuantity,
  estimatedWeightGrams,
  unitPrice,
  totalPrice,
  estimatedHours
}) => {
  const currentMaterial = MATERIALS[material];

  const handleWhatsAppClick = () => {
    if (!metrics) return;
    const url = generateWhatsAppLink(
      metrics.fileName,
      metrics.dimensionsMm,
      metrics.volumeCm3,
      estimatedWeightGrams,
      material,
      layerHeight,
      infillPct,
      selectedColor,
      quantity,
      totalPrice
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
      {/* 1. Material Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Disc className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            1. Pilih Bahan Filament
          </label>
          <span className="text-xs text-slate-500 font-medium">Densitas: {currentMaterial.density} g/cm³</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {(Object.keys(MATERIALS) as MaterialKey[]).map((key) => {
            const mat = MATERIALS[key];
            const isSelected = material === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onChangeMaterial(key);
                  onChangeColor(mat.colorOptions[0]);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 shadow-xs ring-1 ring-emerald-700'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm">{mat.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{mat.bestFor.split(',')[0]}</p>
                <div className="mt-2 text-[11px] font-semibold text-emerald-800">
                  Mulai {formatRupiah(mat.basePricePerGram)}/g
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Material Color Choice */}
        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-700 block mb-2">
            Pilihan Warna ({currentMaterial.name}):
          </label>
          <div className="flex flex-wrap gap-2">
            {currentMaterial.colorOptions.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => onChangeColor(col)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
                  selectedColor === col
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Layer Height / Quality Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            2. Kualitas Cetak (Layer Height)
          </label>
        </div>

        <div className="space-y-2">
          {(Object.keys(LAYER_HEIGHTS) as LayerHeightKey[]).map((key) => {
            const layer = LAYER_HEIGHTS[key];
            const isSelected = layerHeight === key;
            return (
              <label
                key={key}
                className={`flex items-start justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-700'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="layerHeight"
                    value={key}
                    checked={isSelected}
                    onChange={() => onChangeLayerHeight(key)}
                    className="mt-0.5 accent-emerald-700"
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-900">{layer.label}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{layer.description}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-emerald-800 font-mono-tech">
                    {formatRupiah(layer.pricePerGramPla.base)}/g
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Infill Density & Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Infill */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-900">
              Kerapatan Infill: <span className="text-emerald-700 font-mono-tech">{infillPct}%</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {infillPct <= 20 ? 'Standar Display' : infillPct <= 50 ? 'Fungsional Kuat' : 'Solid Maksimal'}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={infillPct}
            onChange={(e) => onChangeInfill(Number(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>10% (Ringan)</span>
            <span>20% (Umum)</span>
            <span>50% (Teknik)</span>
            <span>100%</span>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-xs font-bold text-slate-900 block mb-1.5">
            Jumlah Unit (Qty):
          </label>
          <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="px-3.5 py-1.5 text-slate-700 hover:bg-slate-100 disabled:opacity-40 font-bold transition-colors"
              aria-label="Kurangi jumlah"
            >
              -
            </button>
            <span className="px-4 py-1.5 font-bold text-slate-900 font-mono-tech text-sm min-w-10 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onChangeQuantity(quantity + 1)}
              className="px-3.5 py-1.5 text-slate-700 hover:bg-slate-100 font-bold transition-colors"
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 4. Calculation Summary Breakdown */}
      <div className="pt-4 border-t border-slate-200">
        <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3 text-xs pb-3 border-b border-slate-800">
            <div>
              <span className="text-slate-400 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                Estimasi Berat Filament
              </span>
              <p className="text-sm font-bold text-slate-100 font-mono-tech mt-0.5">
                ±{estimatedWeightGrams * quantity} gram
                {quantity > 1 && <span className="text-[11px] text-slate-400 font-normal"> (@{estimatedWeightGrams}g)</span>}
              </p>
            </div>
            <div>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                Estimasi Cetak (P1S)
              </span>
              <p className="text-sm font-bold text-slate-100 font-mono-tech mt-0.5">
                ±{estimatedHours * quantity} jam
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between pt-3">
            <div>
              <span className="text-xs text-slate-300 block font-medium">Perkiraan Biaya Cetak</span>
              <span className="text-[11px] text-slate-400">Termasuk prep mesin Bambu Lab P1S</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono-tech block">
                {formatRupiah(totalPrice)}
              </span>
              {quantity > 1 && (
                <span className="text-[11px] text-slate-400 font-mono-tech">
                  {formatRupiah(unitPrice)} / unit
                </span>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            disabled={!metrics}
            className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed text-sm"
          >
            <MessageSquare className="w-5 h-5" aria-hidden="true" />
            {metrics ? 'Lanjut Konsultasi & Pesan via WhatsApp' : 'Unggah File 3D untuk Melanjutkan'}
          </button>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Estimasi cepat berdasarkan tarif resmi Treedible. Konfirmasi akhir via slicing Bambu Studio.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
