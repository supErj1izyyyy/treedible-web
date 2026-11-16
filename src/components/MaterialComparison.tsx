import React, { useState } from 'react';
import { MATERIALS } from '../utils/calculator';
import type { MaterialKey } from '../types';
import { Layers } from 'lucide-react';

export const MaterialComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MaterialKey>('PLA');

  const comparisonData = [
    {
      prop: 'Kekuatan Tarik & Benturan',
      pla: 'Menengah (Kaku, getas bila terjatuh)',
      petg: 'Tinggi (Ulet dan liat, tahan benturan)',
    },
    {
      prop: 'Ketahanan Suhu Panas',
      pla: '50°C - 55°C (Bisa melengkung di dalam mobil panas)',
      petg: '70°C - 75°C (Aman untuk outdoor dan panas terik)',
    },
    {
      prop: 'Tingkat Kehalusan Detail',
      pla: 'Maksimal (Finishing sudut paling presisi)',
      petg: 'Bagus (Sangat rapi, sedikit stringing pada detail mikro)',
    },
    {
      prop: 'Ketahanan Cuaca & Air',
      pla: 'Kurang cocok untuk outdoor jangka panjang',
      petg: 'Sangat tahan air dan paparan sinar UV outdoor',
    },
    {
      prop: 'Tingkat Fleksibilitas',
      pla: 'Rendah (Kaku)',
      petg: 'Menengah (Sedikit fleksibel, tidak mudah patah)',
    },
    {
      prop: 'Aplikasi Rekomendasi',
      pla: 'Maket arsitektur, display, miniatur, prototype visual',
      petg: 'Part fungsional mekanis, casing drone, bracket, wadah',
    },
    {
      prop: 'Tarif Dasar Treedible',
      pla: 'Mulai Rp 500 – Rp 850 / gram',
      petg: 'Mulai Rp 650 – Rp 950 / gram',
    },
  ];

  return (
    <section id="material" className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-800">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            Panduan Material Filament
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Kenali & Bandingkan Karakteristik Bahan Cetak
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Setiap proyek membutuhkan karakteristik fisik berbeda. Kami menyediakan dua jenis filament utama dengan kelebihan spesifik masing-masing.
          </p>
        </div>

        {/* 2 Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-16">
          {(Object.keys(MATERIALS) as MaterialKey[]).map((key) => {
            const mat = MATERIALS[key];
            const isTabActive = activeTab === key;
            return (
              <div
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all cursor-pointer ${
                  isTabActive
                    ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 ring-2 ring-emerald-700 dark:ring-emerald-500 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{mat.name}</span>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      {mat.fullName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {mat.description}
                  </p>

                  {/* Ratings Bar */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-1">
                        <span>Ketahanan Suhu Panas</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{mat.tempResistance}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-1">
                        <span>Kekuatan Mekanik</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{mat.strengthRating} / 5</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                        <div
                          className="bg-emerald-700 dark:bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${(mat.strengthRating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-1">
                        <span>Presisi & Detail Permukaan</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{mat.detailRating} / 5</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                        <div
                          className="bg-emerald-700 dark:bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${(mat.detailRating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 dark:text-slate-400 block uppercase font-bold tracking-wider mb-1">
                    Paling Cocok Untuk:
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    {mat.bestFor}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        <div className="mt-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Tabel Komparasi Teknis PLA vs PETG
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Gunakan tabel acuan ini untuk menentukan material yang paling cocok dengan kebutuhan fungsi part kamu.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold">
                  <th className="py-3 px-4 w-1/3">Parameter</th>
                  <th className="py-3 px-4 w-1/3 text-emerald-900 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-t-lg">PLA (Polylactic Acid)</th>
                  <th className="py-3 px-4 w-1/3">PETG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{row.prop}</td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 bg-emerald-50/30 dark:bg-emerald-950/20 font-medium">{row.pla}</td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">{row.petg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
