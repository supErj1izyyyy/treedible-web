/**
 * Konfigurasi kontak & info usaha Treedible.
 * Cukup ubah nomor WhatsApp atau link medsos di file ini,
 * maka seluruh tombol dan kalkulator di website akan otomatis terupdate.
 */
export const SITE_CONFIG = {
  name: 'Treedible 3D Printing',
  
  // Ganti nomor WhatsApp di sini (gunakan awalan 62 tanpa spasi, strip, atau tanda +)
  whatsappNumber: '62895395213600',

  // Pesan default saat tombol WhatsApp di navbar/footer diklik
  defaultWhatsAppMessage: 'Halo Treedible, saya ingin konsultasi layanan 3D Printing',

  // Link sosial media & toko online
  instagramUrl: 'https://instagram.com',
  shopeeUrl: 'https://shopee.co.id',

  // Lokasi & operasional
  location: 'Malang, Jawa Timur, Indonesia',
  operatingHours: '08:00 – 20:00 WIB',
};

/**
 * Helper untuk mengarahkan asset gambar dan 3D sample ke base URL yang benar
 * (baik saat di localhost maupun di GitHub Pages subpath /treedible-web/).
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
