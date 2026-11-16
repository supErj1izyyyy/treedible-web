import React from 'react';
import { Upload, ArrowDown, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background Subtle Ambient Shape */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-50/80 pointer-events-none blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content: 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Layanan 3D Printing Malang, Siap Kirim Seluruh Indonesia</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Cetak Desain 3D Presisi Tinggi dengan Estimasi Biaya Instan.
            </h1>

            {/* Subheadline without em dashes */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Didukung mesin industri modern Bambu Lab P1S untuk hasil detail, kuat, dan minim deviasi dimensi. Cukup unggah file desain 3D (.STL / .OBJ) untuk mengetahui volume, estimasi gramasi, dan perkiraan biaya seketika.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#kalkulator"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-sm rounded-xl inline-flex items-center gap-2 shadow-sm transition-all hover:shadow-md"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                <span>Upload File & Hitung Harga</span>
              </a>
              <a
                href="#material"
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl inline-flex items-center gap-2 transition-colors border border-slate-200"
              >
                <span>Lihat Pilihan Bahan</span>
                <ArrowDown className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </a>
            </div>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-700">Mesin Bambu Lab P1S</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-700">Layer Halus hingga 0.12 mm</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-700">Tarif Transparan per Gram</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Card: 5 Cols */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900 p-3 sm:p-4 text-white shadow-xl border border-slate-800">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-200">Hardware Showcase</span>
                </div>
                <span className="font-mono-tech text-[11px] text-emerald-400">BAMBU LAB P1S</span>
              </div>

              {/* Machine Photo */}
              <div className="relative mt-3 rounded-2xl overflow-hidden bg-slate-950 aspect-4/3 flex items-center justify-center">
                <img
                  src="/images/bambu_p1s.png"
                  alt="Mesin 3D Printer Bambu Lab P1S milik Treedible"
                  className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                  fetchPriority="high"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                  <span className="text-emerald-400 font-bold block">Kecepatan hingga 500 mm/s</span>
                  <span className="text-[10px] text-slate-300">Enclosed Chamber untuk cetak ABS & PETG</span>
                </div>
              </div>

              {/* Quick Spec Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px] block">Volume Maksimal</span>
                  <span className="font-bold text-slate-100 font-mono-tech">256 × 256 × 256 mm</span>
                </div>
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px] block">Material Siap Cetak</span>
                  <span className="font-bold text-slate-100">PLA, PETG, ABS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
