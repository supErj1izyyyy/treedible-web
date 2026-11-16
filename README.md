# Treedible 3D Printing - Web Platform & Instant 3D Quote Calculator

Platform website technopreneur untuk layanan jasa cetak 3D **Treedible 3D Printing** (Malang, Jawa Timur), dilengkapi fitur inovasi pembeda **Kalkulator & Estimator Harga Instan Berbasis Upload File 3D (.STL / .OBJ)**.

Projek Tugas Akhir Mata Kuliah Kewirausahaan Semester 5 — Kelompok 4 / 3A-JTD (D4 Jaringan Telekomunikasi Digital, Politeknik Negeri Malang).

---

## Fitur Utama

1. **3D Instant Slicing & Price Estimator (Fitur Pembeda)**:
   - Viewer 3D interaktif berbasis Three.js dengan kontrol rotasi, zoom, pan, dan mode wireframe.
   - Mengukur dimensi fisik bounding box ($X \times Y \times Z$ dalam mm).
   - Menghitung volume geometris solid mesh aktual ($cm^3$) langsung di browser.
   - Pilihan konfigurasi dinamis:
     - Material: PLA, PETG, ABS dengan densitas filament yang akurat.
     - Layer Height / Kualitas: 0.12 mm (High Detail), 0.16 mm (Optimal/Standard), 0.20 mm (Draft/Fast).
     - Infill Density: Slider interaktif 10% hingga 100%.
     - Warna: Pilihan warna sesuai stok filament Treedible.
     - Jumlah unit: Kalkulasi harga total dinamis.
   - Estimasi berat (gram) dan biaya (Rp) seketika mengacu pada tarif resmi Treedible di Laporan Observasi.
   - Tombol Direct WhatsApp Order yang langsung menyusun rincian pesanan secara otomatis.
2. **Katalog & Komparasi Material**:
   - Penjelasan detail karakteristik PLA, PETG, dan ABS.
   - Tabel perbandingan komprehensif (Kekuatan tarik, ketahanan suhu, fleksibilitas, ketahanan UV, dan tarif per gram).
3. **Layanan & Spesifikasi Mesin**:
   - Rapid prototyping tugas akhir, sparepart fungsional, maket arsitektur, dan figurin.
   - Showcase mesin Bambu Lab P1S dengan enclosure tertutup untuk stabilitas cetak material ABS/PETG.
4. **Alur Pemesanan Transparan**:
   - 4 langkah dari upload file hingga pengiriman barang.
5. **Profil Usaha & Kontak**:
   - Filosofi nama "Tree-di-able", visi-misi, alamat workshop di Malang, dan saluran Shopee serta Instagram.

---

## Cara Menjalankan

Masuk ke folder `treedible-web`:

```bash
cd treedible-web
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buka browser di `http://localhost:5173`.

Untuk membuat build produksi:

```bash
npm run build
npm run preview
```
