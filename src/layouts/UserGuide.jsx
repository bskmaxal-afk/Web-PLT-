

export default function UserGuide() {
  const steps = [
    { step: '01', title: 'Pilih Ruang & Jadwal', desc: 'Cek ketersediaan di menu Informasi Lab lalu buka menu Pemesanan Ruang.' },
    { step: '02', title: 'Isi Formulir Pemesanan', desc: 'Lengkapi formulir pengajuan ruang dengan data penanggung jawab, nomor WhatsApp, mata kuliah, dan keterangan kegiatan.' },
    { step: '03', title: 'Check-in & Gunakan Lab', desc: 'Datang tepat waktu ke lab sesuai sesi yang dipesan. Hubungi laboran/admin di lokasi untuk membuka ruangan.' },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Alur Prosedur Peminjaman</h2>
        <p className="text-gray-500 text-sm">Ikuti 3 langkah mudah untuk menggunakan fasilitas PLT</p>
      </div>

      <div className="relative border-l-2 border-blue-100 ml-4 md:ml-6 space-y-8">
        {steps.map((item, index) => (
          <div key={index} className="relative pl-6 md:pl-8">
            <div className="absolute -left-[17px] top-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-blue-200">
              {item.step}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}