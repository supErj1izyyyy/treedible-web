import React, { useState } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Logo Treedible 3D Printing"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-tight">
                Treedible
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase block">
                3D Printing Service
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#kalkulator" className="hover:text-emerald-700 transition-colors">
              Kalkulator Harga
            </a>
            <a href="#material" className="hover:text-emerald-700 transition-colors">
              Bahan & Komparasi
            </a>
            <a href="#layanan" className="hover:text-emerald-700 transition-colors">
              Layanan Cetak
            </a>
            <a href="#alur" className="hover:text-emerald-700 transition-colors">
              Alur Pesan
            </a>
            <a href="#tentang" className="hover:text-emerald-700 transition-colors">
              Tentang Kami
            </a>
          </nav>

          {/* Direct CTA WhatsApp Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.defaultWhatsAppMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp Admin</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <a
            href="#kalkulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-emerald-700"
          >
            Kalkulator Harga
          </a>
          <a
            href="#material"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-emerald-700"
          >
            Bahan & Komparasi
          </a>
          <a
            href="#layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-emerald-700"
          >
            Layanan Cetak
          </a>
          <a
            href="#alur"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-emerald-700"
          >
            Alur Pesan
          </a>
          <a
            href="#tentang"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-emerald-700"
          >
            Tentang Kami
          </a>
          <div className="pt-2 border-t border-slate-100">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.defaultWhatsAppMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp Admin</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
