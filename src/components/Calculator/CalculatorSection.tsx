import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import type { MaterialKey, LayerHeightKey, ModelMetrics } from '../../types';
import {
  calculateMeshVolume,
  getBoundingDimensions,
  estimateFilamentWeight,
  calculatePrintPrice,
  estimatePrintTimeHours
} from '../../utils/calculator';
import { ModelViewer } from './ModelViewer';
import { FileUploadZone } from './FileUploadZone';
import { ConfigurationPanel } from './ConfigurationPanel';
import { Calculator, AlertCircle } from 'lucide-react';

export const CalculatorSection: React.FC = () => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuration States
  const [material, setMaterial] = useState<MaterialKey>('PLA');
  const [layerHeight, setLayerHeight] = useState<LayerHeightKey>('0.16');
  const [infillPct, setInfillPct] = useState<number>(20);
  const [selectedColor, setSelectedColor] = useState<string>('Hitam Doff');
  const [quantity, setQuantity] = useState<number>(1);
  const [wireframe, setWireframe] = useState<boolean>(false);

  // Parse Buffer into Three.js BufferGeometry
  const parseModelData = (buffer: ArrayBuffer, fileName: string) => {
    setLoading(true);
    setError(null);
    try {
      const ext = fileName.split('.').pop()?.toLowerCase();
      let parsedGeo: THREE.BufferGeometry | null = null;

      if (ext === 'stl') {
        const loader = new STLLoader();
        parsedGeo = loader.parse(buffer);
      } else if (ext === 'obj') {
        const loader = new OBJLoader();
        const textDecoder = new TextDecoder();
        const objText = textDecoder.decode(buffer);
        const objGroup = loader.parse(objText);
        
        // Merge or extract first geometry from group
        const geometries: THREE.BufferGeometry[] = [];
        objGroup.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            geometries.push(mesh.geometry.clone());
          }
        });
        if (geometries.length > 0) {
          parsedGeo = geometries[0];
        } else {
          throw new Error('Tidak ditemukan data mesh 3D di dalam file OBJ ini.');
        }
      }

      if (!parsedGeo) {
        throw new Error('Gagal memproses struktur geometri model.');
      }

      // Calculate Metrics
      const volumeCm3 = calculateMeshVolume(parsedGeo);
      const dimensionsMm = getBoundingDimensions(parsedGeo);
      const triangleCount = parsedGeo.index
        ? parsedGeo.index.count / 3
        : parsedGeo.attributes.position.count / 3;

      setGeometry(parsedGeo);
      setMetrics({
        volumeCm3,
        dimensionsMm,
        triangleCount,
        fileName
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat memproses file 3D.');
      setGeometry(null);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle User File Upload
  const handleFileLoaded = (fileData: File | { name: string; buffer: ArrayBuffer }) => {
    if ('buffer' in fileData) {
      parseModelData(fileData.buffer, fileData.name);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result instanceof ArrayBuffer) {
          parseModelData(e.target.result, fileData.name);
        }
      };
      reader.readAsArrayBuffer(fileData);
    }
  };

  // Load default initial sample on mount so user sees an active working 3D viewer immediately
  useEffect(() => {
    fetch('/samples/calibration_cube.stl')
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        parseModelData(buf, 'calibration_cube_20mm.stl');
      })
      .catch((e) => console.log('Sample load error:', e));
  }, []);

  // Compute Live Calculated Values
  const volume = metrics ? metrics.volumeCm3 : 8.0;
  const estimatedWeightGrams = estimateFilamentWeight(volume, material, infillPct);
  const { unitPrice, totalPrice } = calculatePrintPrice(estimatedWeightGrams, material, layerHeight, quantity);
  const estimatedHours = estimatePrintTimeHours(estimatedWeightGrams, layerHeight);

  // Map selected color to CSS/Three hex
  const getRenderColor = (colorName: string) => {
    switch (colorName) {
      case 'Hitam Doff':
      case 'Hitam Pekat':
      case 'Hitam Industri':
        return '#1e293b';
      case 'Putih Bersih':
      case 'Putih':
        return '#f8fafc';
      case 'Abu-Abu Industri':
      case 'Abu-Abu':
      case 'Abu-Abu Mesin':
        return '#64748b';
      case 'Hijau Hutan':
        return '#15803d';
      case 'Merah':
        return '#dc2626';
      case 'Biru':
        return '#2563eb';
      case 'Transparan/Bening':
        return '#cbd5e1';
      default:
        return '#15803d';
    }
  };

  return (
    <section id="kalkulator" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3 border border-emerald-200">
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            Fitur Pembeda Treedible
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kalkulator & Estimator Harga 3D Instan
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tidak perlu menunggu balasan manual untuk mengetahui perkiraan biaya. Cukup unggah file desain 3D (.STL / .OBJ), sistem kami akan mengukur volume solid dan menghitung tarif filament secara real-time.
          </p>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* 2-Column Grid: Left (Upload + 3D Viewer) / Right (Configuration & Price) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 7 Cols */}
          <div className="lg:col-span-7 space-y-4">
            {/* Upload Zone */}
            <FileUploadZone
              onFileLoaded={handleFileLoaded}
              currentFileName={metrics?.fileName || null}
              loading={loading}
            />

            {/* 3D Model Viewer Canvas */}
            <ModelViewer
              geometry={geometry}
              materialColor={getRenderColor(selectedColor)}
              wireframe={wireframe}
              onToggleWireframe={() => setWireframe(!wireframe)}
              dimensions={metrics?.dimensionsMm || null}
              loading={loading}
            />
          </div>

          {/* Right Column: 5 Cols (Pricing & Parameters) */}
          <div className="lg:col-span-5">
            <ConfigurationPanel
              metrics={metrics}
              material={material}
              onChangeMaterial={setMaterial}
              layerHeight={layerHeight}
              onChangeLayerHeight={setLayerHeight}
              infillPct={infillPct}
              onChangeInfill={setInfillPct}
              selectedColor={selectedColor}
              onChangeColor={setSelectedColor}
              quantity={quantity}
              onChangeQuantity={setQuantity}
              estimatedWeightGrams={estimatedWeightGrams}
              unitPrice={unitPrice}
              totalPrice={totalPrice}
              estimatedHours={estimatedHours}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
