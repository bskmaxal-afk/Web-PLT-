import { useSearchParams } from "react-router-dom";

/**
 * UsageGuide — Step-by-step guide for navigating the PLT homepage and rumpun dashboards,
 * or procedure for lab booking inside specific rumpuns.
 */
export default function UsageGuide() {
  const [searchParams] = useSearchParams();
  const rumpun = searchParams.get("rumpun");

  // Nama rumpun dalam huruf kapital (misal TISIMAT)
  const rumpunName = rumpun ? rumpun.toUpperCase() : null;

  const steps = rumpunName ? [
    {
      step: "01",
      title: "Pilih Ruang & Jadwal",
      desc: `Lihat daftar laboratorium yang tersedia pada rumpun ${rumpunName} di halaman Dashboard, kemudian cek ketersediaan ruang atau langsung buka menu "Pemesanan Ruang".`,
    },
    {
      step: "02",
      title: "Isi Formulir Pemesanan",
      desc: `Lengkapi formulir pengisian data pemesanan: penanggung jawab kegiatan, nomor WhatsApp aktif, mata kuliah (jika terjadwal), tanggal, jam mulai & selesai, jumlah hadir, serta keterangan penggunaan untuk rumpun ${rumpunName}.`,
    },
    {
      step: "03",
      title: "Check-in & Gunakan Lab",
      desc: `Datanglah tepat waktu ke laboratorium rumpun ${rumpunName} sesuai dengan waktu peminjaman yang telah disetujui. Hubungi laboran atau admin di lokasi untuk membuka ruangan.`,
    },
  ] : [
    {
      step: "01",
      title: "Pilih Rumpun Keilmuan",
      desc: 'Buka menu "Dashboard" di halaman utama PLT UIN Jakarta untuk melihat 8 daftar rumpun keilmuan fakultas (seperti TISIMAT, KIMIA, BIOLOGI, FISIKA, dll).',
    },
    {
      step: "02",
      title: "Masuk ke Dashboard Rumpun",
      desc: "Klik pada kartu rumpun keilmuan yang ingin Anda tuju. Browser akan langsung mengarahkan Anda ke portal dashboard eksternal atau halaman detail khusus rumpun tersebut.",
    },
    {
      step: "03",
      title: "Eksplorasi Fasilitas & Layanan",
      desc: "Di portal rumpun masing-masing, Anda dapat melihat secara lengkap daftar laboratorium yang aktif, kapasitas ruangan, spesifikasi perangkat keras (hardware), software pendukung praktikum, serta layanan akademik lainnya.",
    },
  ];

  const title = rumpunName 
    ? `Alur Prosedur Peminjaman Lab ${rumpunName}`
    : "Panduan Navigasi Portal PLT";

  const subtitle = rumpunName
    ? `Ikuti langkah-langkah mudah untuk menggunakan fasilitas Lab Rumpun ${rumpunName}`
    : "Ikuti langkah-langkah mudah untuk mengakses informasi layanan Pusat Laboratorium Terpadu";

  return (
    <div className="px-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-slate-800 font-display">
            {title}
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            {subtitle}
          </p>
        </div>

        <div className="relative border-l-2 border-blue-100 ml-4 md:ml-6 space-y-8">
          {steps.map((item, index) => (
            <div key={index} className="relative pl-6 md:pl-8">
              <div className="absolute -left-[17px] top-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-200">
                {item.step}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base font-display">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips section */}
        {rumpunName ? (
          <div className="mt-8 p-6 bg-blue-50/30 border border-blue-100/50 rounded-2xl">
            <h4 className="text-xs font-extrabold text-blue-800 mb-2.5 uppercase tracking-wider">
              💡 Tips Penting
            </h4>
            <ul className="text-xs text-blue-700/80 space-y-2 font-semibold">
              <li>
                • Ajukan pemesanan ruang minimal <strong>2 hari sebelum</strong> tanggal kegiatan berlangsung.
              </li>
              <li>
                • Pastikan kapasitas jumlah peserta kegiatan tidak melebihi batas maksimal laboratorium rumpun {rumpunName}.
              </li>
              <li>
                • Untuk kegiatan praktikum terjadwal (mata kuliah), pastikan mengisi nama dosen pengampu mata kuliah dengan benar.
              </li>
              <li>
                • Apabila ada perubahan jadwal atau pembatalan, silakan hubungi admin rumpun {rumpunName} melalui menu Kontak.
              </li>
            </ul>
          </div>
        ) : (
          <div className="mt-8 p-6 bg-blue-50/30 border border-blue-100/50 rounded-2xl">
            <h4 className="text-xs font-extrabold text-blue-800 mb-2.5 uppercase tracking-wider">
              💡 Informasi Tambahan
            </h4>
            <ul className="text-xs text-blue-700/80 space-y-2 font-semibold">
              <li>
                • Ringkasan spesifikasi laboratorium dan profil rumpun juga dapat diakses langsung melalui menu <strong>"Informasi Rumpun"</strong> di sidebar tanpa berpindah portal.
              </li>
              <li>
                • Jadwal penggunaan laboratorium dan aktivitas perkuliahan dapat dilihat pada dashboard rumpun masing-masing setelah Anda dialihkan.
              </li>
              <li>
                • Jika tautan pengalihan rumpun mengalami kendala akses, silakan laporkan ke tim pengelola melalui menu <strong>"Kontak & Bantuan"</strong>.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
