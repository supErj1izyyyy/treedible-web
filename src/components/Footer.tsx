import React from 'react';
import { MessageSquare, ShoppingBag, MapPin } from 'lucide-react';
import { SITE_CONFIG, assetUrl } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info: 5 Cols */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={assetUrl('images/logo.png')}
                alt="Logo Treedible 3D Printing"
                className="h-10 w-auto object-contain bg-white rounded-lg p-1"
              />
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block">
                  Treedible
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase block">
                  3D Printing Service
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Layanan jasa cetak 3D FDM presisi tinggi di Malang berbasis Bambu Lab P1S. Melayani rapid prototyping akademis, sparepart fungsional, dan model arsitektur ke seluruh Indonesia.
            </p>

            <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>Malang, Jawa Timur, Indonesia</span>
            </div>
          </div>

          {/* Quick Links: 3 Cols */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#kalkulator" className="hover:text-emerald-400 transition-colors">
                  Kalkulator & Estimator 3D
                </a>
              </li>
              <li>
                <a href="#material" className="hover:text-emerald-400 transition-colors">
                  Komparasi Bahan (PLA, PETG, ABS)
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-emerald-400 transition-colors">
                  Layanan & Spesifikasi Mesin
                </a>
              </li>
              <li>
                <a href="#alur" className="hover:text-emerald-400 transition-colors">
                  Alur Pemesanan
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-emerald-400 transition-colors">
                  Profil & Visi Misi
                </a>
              </li>
            </ul>
          </div>

          {/* Channels & Order Links: 4 Cols */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Saluran Pemesanan Resmi
            </h4>
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.defaultWhatsAppMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors text-xs text-slate-200 hover:text-white"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <div>
                  <span className="font-semibold block">WhatsApp Official</span>
                  <span className="text-[11px] text-slate-400">Konsultasi teknis & konfirmasi order</span>
                </div>
              </a>

              <a
                href="https://shopee.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors text-xs text-slate-200 hover:text-white"
              >
                <ShoppingBag className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <div>
                  <span className="font-semibold block">Toko Shopee Treedible</span>
                  <span className="text-[11px] text-slate-400">Transaksi rekber & gratis ongkir</span>
                </div>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors text-xs text-slate-200 hover:text-white"
              >
                <svg className="w-4 h-4 text-pink-400 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div>
                  <span className="font-semibold block">Instagram @treedible</span>
                  <span className="text-[11px] text-slate-400">Portofolio hasil cetak terbaru</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Treedible 3D Printing. Hak Cipta Dilindungi.</p>
          <p className="text-[11px]">
            Projek Tugas Akhir Kewirausahaan Kelompok 4 / 3A-JTD (Politeknik Negeri Malang).
          </p>
        </div>
      </div>
    </footer>
  );
};
