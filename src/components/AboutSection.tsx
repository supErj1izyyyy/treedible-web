import React from 'react';
import { Target, Compass, MapPin, Clock, ShieldCheck, Truck, Cpu } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Brand Story & Philosophy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span>Profil Usaha</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Treedible 3D Printing: Solusi Manufaktur Aditif Presisi dari Malang.
            </h2>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Nama <strong>Treedible</strong> berakar dari filosofi <em>"Tree-di-able"</em> (3D-able) dan simbol pohon yang terus bertumbuh kokoh. Kami hadir sebagai solusi manufaktur aditif terpercaya bagi rekan mahasiswa, akademisi, desainer industri, dan pehobi kreatif yang membutuhkan purwarupa fisik cepat, kuat, dan akurat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white text-sm">
                  <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  <span>Visi Usaha</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Menjadi penyedia layanan 3D printing terdepan yang mengedepankan presisi teknis, transparansi biaya, dan kecepatan respons berbasis teknologi digital.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white text-sm">
                  <Compass className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  <span>Misi Usaha</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Mempermudah siapa pun mewujudkan ide CAD menjadi objek nyata berkualitas tinggi dengan alur pemesanan mudah dan pilihan material teruji.
                </p>
              </div>
            </div>

            {/* Quick Contact & Operational Hours */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Jam Operasional: {SITE_CONFIG.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Commitments & Badges (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Komitmen Kualitas Layanan
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900">
                  <Cpu className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Teknologi Bambu Lab P1S</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Akurasi layer mikron tinggi dengan kompensasi getaran aktif dan chamber tertutup stabil.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Filament Teruji & Berkualitas</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Hanya menggunakan filament berkualitas tinggi (PLA & PETG) dengan toleransi diameter presisi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900">
                  <Truck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pengiriman Aman ke Seluruh Indonesia</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Proteksi ekstra tebal (bubble wrap & kardus kokoh) agar part sampai dalam kondisi utuh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
