import React from 'react';
import { UploadCloud, FileCheck, Printer, Truck, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: UploadCloud,
      title: 'Upload & Hitung Instan',
      desc: 'Unggah file 3D (.STL/.OBJ) ke kalkulator online kami untuk mendapatkan estimasi berat dan biaya secara langsung.'
    },
    {
      step: '02',
      icon: FileCheck,
      title: 'Konfirmasi Slicing Bambu',
      desc: 'Kirim rincian ke WhatsApp admin. Kami akan memverifikasi orientasi cetak, support yang dibutuhkan, dan ketersediaan warna.'
    },
    {
      step: '03',
      icon: Printer,
      title: 'Proses Cetak Presisi',
      desc: 'Pencetakan dijalankan di mesin Bambu Lab P1S dengan kalibrasi otomatis dan pemantauan suhu chamber ketat.'
    },
    {
      step: '04',
      icon: Truck,
      title: 'Finishing & Pengiriman',
      desc: 'Pembersihan support, quality check dimensi, pengemasan ekstra aman dengan bubble wrap tebal, lalu dikirim ke alamat kamu.'
    }
  ];

  return (
    <section id="alur" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3 border border-emerald-200">
            <span>Alur Transparan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Empat Langkah Mudah Memulai Cetak 3D
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Dari file digital di komputer kamu hingga part fisik siap pakai yang sampai di depan pintu rumah.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => {
            const IconComp = st.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between relative hover:border-slate-300 transition-all hover:bg-slate-100/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center font-mono-tech shadow-xs">
                      {st.step}
                    </span>
                    <IconComp className="w-5 h-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{st.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar below workflow */}
        <div className="mt-12 text-center">
          <a
            href="#kalkulator"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Coba hitung file 3D kamu sekarang</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
