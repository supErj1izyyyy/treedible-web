import React, { useRef, useState } from 'react';
import { UploadCloud, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';
import { assetUrl } from '../../config/site';

interface FileUploadZoneProps {
  onFileLoaded: (file: File | { name: string; buffer: ArrayBuffer }) => void;
  currentFileName: string | null;
  loading: boolean;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileLoaded,
  currentFileName,
  loading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'stl' && ext !== 'obj') {
      setErrorMessage('Format file tidak didukung. Mohon unggah file format .STL atau .OBJ.');
      return;
    }
    setErrorMessage(null);
    onFileLoaded(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Load built-in sample models
  const loadSample = async (samplePath: string, sampleName: string) => {
    try {
      setErrorMessage(null);
      const targetUrl = assetUrl(samplePath);
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Gagal memuat sampel file 3D');
      const buffer = await response.arrayBuffer();
      // Verify buffer is not an HTML 404 page
      const header = new Uint8Array(buffer.slice(0, 10));
      const headerStr = String.fromCharCode(...header);
      if (headerStr.includes('<html') || headerStr.includes('<!DOC')) {
        throw new Error('File sampel tidak ditemukan di server.');
      }
      onFileLoaded({ name: sampleName, buffer });
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kendala saat memuat sampel model.');
    }
  };

  return (
    <div className="w-full">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
          }
        }}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 scale-[1.01]'
            : currentFileName
            ? 'border-emerald-500/70 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-600'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-850'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".stl,.obj"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={loading}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            currentFileName 
              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}>
            {currentFileName ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            ) : (
              <UploadCloud className="w-7 h-7" aria-hidden="true" />
            )}
          </div>

          <div>
            {currentFileName ? (
              <div>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">File Terpasang</p>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5 break-all">{currentFileName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Klik atau seret file lain untuk mengganti</p>
              </div>
            ) : (
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  Tarik & Lepas File 3D (.STL / .OBJ) di sini
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Atau klik untuk memilih file dari komputer atau ponsel kamu
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">.STL (Binary/ASCII)</span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">.OBJ</span>
            <span>Maksimal 50 MB</span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs text-red-700 dark:text-red-300 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick Sample Selector */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100/90 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <FileCode className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
          <span>Belum punya file 3D? Uji coba contoh instan:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadSample('samples/calibration_cube.stl', 'calibration_cube_20mm.stl')}
            disabled={loading}
            className="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-medium rounded-lg border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs hover:border-emerald-600"
          >
            Kubus Kalibrasi (20 mm)
          </button>
          <button
            type="button"
            onClick={() => loadSample('samples/mechanical_gear.stl', 'mechanical_gear_sample.stl')}
            disabled={loading}
            className="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-medium rounded-lg border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs hover:border-emerald-600"
          >
            Gir Roda Gigi
          </button>
        </div>
      </div>
    </div>
  );
};
