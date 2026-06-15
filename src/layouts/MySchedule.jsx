import React from 'react';

export default function MySchedule() {
  const schedules = [
    { id: 1, ruang: 'Lab Komputer 2', tanggal: '15 Juni 2026', sesi: 'Sesi 2 (10.00 - 12.00)', status: 'Disetujui', color: 'bg-green-100 text-green-700' },
    { id: 2, ruang: 'Lab Sistem Informasi', tanggal: '18 Juni 2026', sesi: 'Sesi 4 (15.30 - 17.30)', status: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Jadwal Penggunaan Saya</h2>
        <p className="text-gray-500 text-sm">Pantau status pengajuan pemesanan ruang laboratorium Anda.</p>
      </div>

      <div className="space-y-4">
        {schedules.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-100 bg-gray-50 rounded-2xl gap-4">
            <div>
              <h4 className="font-bold text-gray-800 text-lg">{item.ruang}</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                <span>📅 {item.tanggal}</span>
                <span>🕒 {item.sesi}</span>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${item.color}`}>
                {item.status}
              </span>
              {item.status === 'Pending' && (
                <button className="text-sm font-semibold text-red-500 hover:text-red-700 transition">Batal</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}