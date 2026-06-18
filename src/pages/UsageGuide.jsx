/**
 * UsageGuide — Step-by-step guide for lab booking procedure.
 * Ported from Dashboard B (UserGuide.jsx) with enhanced content.
 */
export default function UsageGuide() {
  const steps = [
    {
      step: "01",
      title: "Pilih Ruang & Jadwal",
      desc: 'Klik salah satu card laboratorium di halaman Dashboard untuk memilih ruang, atau langsung buka menu "Pemesanan Ruang". Cek ketersediaan di halaman Informasi Lab terlebih dahulu.',
    },
    {
      step: "02",
      title: "Isi Formulir Pemesanan",
      desc: "Lengkapi formulir pengajuan ruang: data penanggung jawab, nomor WhatsApp, mata kuliah (jika terjadwal), tanggal, jam masuk, jumlah peserta, dan keterangan kegiatan.",
    },
    {
      step: "03",
      title: "Tunggu Validasi Admin",
      desc: 'Admin laboratorium akan memeriksa kesesuaian agenda dan jadwal ruang. Status pengajuan Anda dapat dipantau real-time di halaman "Jadwal Saya".',
    },
    {
      step: "04",
      title: "Check-in & Gunakan Lab",
      desc: "Jika disetujui, datang tepat waktu ke laboratorium sesuai sesi. Hubungi laboran/admin di lokasi untuk membuka ruangan dan memulai kegiatan.",
    },
  ];

  return (
    <div className="px-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            Alur Prosedur Peminjaman
          </h2>
          <p className="text-gray-400 text-xs font-medium mt-1">
            Ikuti langkah-langkah mudah untuk menggunakan fasilitas Lab MaTiSi
          </p>
        </div>

        <div className="relative border-l-2 border-blue-100 ml-4 md:ml-6 space-y-8">
          {steps.map((item, index) => (
            <div key={index} className="relative pl-6 md:pl-8">
              <div className="absolute -left-[17px] top-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-blue-200">
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-base">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips section */}
        <div className="mt-8 p-4 bg-blue-50/30 border border-blue-100/50 rounded-xl">
          <h4 className="text-sm font-bold text-blue-800 mb-2">
            💡 Tips Penting
          </h4>
          <ul className="text-xs text-blue-700/80 space-y-1.5 font-medium">
            <li>
              • Ajukan pemesanan minimal <strong>2 hari sebelum</strong> tanggal
              kegiatan.
            </li>
            <li>
              • Pastikan jumlah peserta tidak melebihi kapasitas laboratorium.
            </li>
            <li>
              • Untuk kegiatan terjadwal (mata kuliah), sertakan nama dosen
              pengampu.
            </li>
            <li>
              • Jika ada perubahan jadwal, batalkan pemesanan lama dan ajukan
              ulang.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
