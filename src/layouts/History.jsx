

export default function History() {
  const historyData = [
    { id: 'LAB-084', ruang: 'Lab Komputer 1', tanggal: '02 Juni 2026', keperluan: 'Praktikum Alpro', status: 'Selesai' },
    { id: 'LAB-071', ruang: 'Lab Sistem Informasi', tanggal: '28 Mei 2026', keperluan: 'Ujian Akhir Semester', status: 'Selesai' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Riwayat Penggunaan</h2>
        <p className="text-gray-500 text-sm">Daftar pemesanan ruang laboratorium yang telah selesai dilaksanakan.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
              <th className="p-4">ID Booking</th>
              <th className="p-4">Laboratorium</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Keperluan</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-50">
            {historyData.map((data) => (
              <tr key={data.id} className="hover:bg-gray-50/50 transition">
                <td className="p-4 font-mono text-gray-500">{data.id}</td>
                <td className="p-4 font-semibold text-gray-800">{data.ruang}</td>
                <td className="p-4">{data.tanggal}</td>
                <td className="p-4 text-gray-500">{data.keperluan}</td>
                <td className="p-4"><span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-xs font-medium">{data.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}   