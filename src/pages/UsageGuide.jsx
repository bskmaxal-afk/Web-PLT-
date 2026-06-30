/**
 * UsageGuide — Step-by-step guide for navigating the PLT homepage and rumpun dashboards.
 */
export default function UsageGuide() {
  const steps = [
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

  return (
    <div className="px-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-slate-800 font-display">
            Panduan Navigasi Portal PLT
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            Ikuti langkah-langkah mudah untuk mengakses informasi layanan Pusat Laboratorium Terpadu
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
      </div>
    </div>
  );
}
