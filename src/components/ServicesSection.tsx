import React from 'react';
import { Cpu, Wrench, Building2, Palette, CheckCircle2, Sliders } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Cpu,
      title: 'Rapid Prototyping & Tugas Akhir',
      desc: 'Validasi konsep tugas akhir mahasiswa teknik, riset akademis, dan produk startup dengan siklus pembuatan cepat dan akurat.',
      points: ['Validasi dimensi & toleransi pasang', 'Hemat waktu revisi desain fisik', 'Siap uji fungsi mekanik awal']
    },
    {
      icon: Wrench,
      title: 'Sparepart & Komponen Fungsional',
      desc: 'Cetak suku cadang pengganti yang sudah langka atau modifikasi komponen mekanik khusus menggunakan material kuat PETG dan ABS.',
      points: ['Ketahanan benturan tinggi', 'Tahan gesek dan getaran', 'Presisi ulir dan lubang baut']
    },
    {
      icon: Building2,
      title: 'Maket Arsitektur & Model Display',
      desc: 'Cetak maket berskala halus untuk presentasi klien, pameran arsitektur, dan model visual perumahan dengan detail dinding rapi.',
      points: ['Layer super halus 0.12 mm', 'Sudut fasad tajam tanpa benang liar', 'Pilihan warna netral siap dicat']
    },
    {
      icon: Palette,
      title: 'Figurin, Cosplay & Seni Kustom',
      desc: 'Realisasikan model karakter 3D, miniatur game, helm cosplay, dan cinderamata dengan kelengkungan permukaan yang mulus.',
      points: ['Dukungan support mudah dilepas', 'Bentuk organik kurva kompleks', 'Kerapatan infill fleksibel']
    }
  ];

  return (
    <section id="layanan" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3 border border-emerald-200">
            <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
            Layanan Spesialis Treedible
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solusi Cetak 3D untuk Kebutuhan Akademis dan Industri
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Mulai dari satu unit purwarupa hingga pesanan batch kecil, kami memastikan setiap lapis tercetak sempurna sesuai spesifikasi CAD kamu.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs hover:border-slate-300 transition-all hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5">
                  <IconComp className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5">{srv.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{srv.desc}</p>
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  {srv.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hardware Capability Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono-tech text-emerald-400 uppercase tracking-wider font-semibold block">
                Peralatan Produksi Utama
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Teknologi Bambu Lab P1S dengan Chamber Tertutup
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Bambu Lab P1S dilengkapi sistem pendingin aktif ganda, kompensasi getaran otomatis (Input Shaping), dan sensor auto bed-leveling. Ruang tertutup menjaga suhu ambient tetap stabil sehingga material bersuhu tinggi seperti ABS dan PETG tidak mengalami keretakan atau pemuaian antar layer.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Akurasi Nozzle</span>
                  <span className="font-bold text-white font-mono-tech text-sm">0.4 mm Hardened</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Kecepatan Maksimal</span>
                  <span className="font-bold text-emerald-400 font-mono-tech text-sm">500 mm/detik</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Suhu Hotend Maks</span>
                  <span className="font-bold text-white font-mono-tech text-sm">300°C</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <img
                src="/images/manufacturing.jpg"
                alt="Proses Manufaktur Treedible di Workshop"
                className="rounded-2xl border border-slate-700 shadow-md object-cover h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
