import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { History } from "lucide-react";

/**
 * UsageHistory — Displays completed lab booking history.
 * Shows both hardcoded historical data and completed bookings from context.
 */
export default function UsageHistory() {
  const { mySchedules } = useContext(AppContext);

  // Static historical data + completed bookings from context
  const historicalData = [
    {
      id: "LAB-084",
      ruang: "Lab Aplikasi 1",
      tanggal: "02 Juni 2026",
      keperluan: "Praktikum Algoritma dan Pemrograman",
      status: "Selesai",
    },
    {
      id: "LAB-071",
      ruang: "Lab Sistem Informasi",
      tanggal: "28 Mei 2026",
      keperluan: "Ujian Akhir Semester",
      status: "Selesai",
    },
    {
      id: "LAB-063",
      ruang: "Lab Matematika",
      tanggal: "20 Mei 2026",
      keperluan: "Praktikum Metode Numerik",
      status: "Selesai",
    },
    {
      id: "LAB-055",
      ruang: "Lab Multimedia 1",
      tanggal: "15 Mei 2026",
      keperluan: "Workshop Desain Grafis",
      status: "Selesai",
    },
  ];

  // Merge with approved schedules for full history view
  const approvedFromContext = mySchedules
    .filter((s) => s.status === "Disetujui")
    .map((s) => ({
      id: `LAB-${String(s.id).slice(-3).padStart(3, "0")}`,
      ruang: s.ruang || `Lab #${s.namalab}`,
      tanggal: s.tanggal || s.tanggalKegiatan,
      keperluan: s.keterangan || s.keperluan || "-",
      status: "Disetujui",
    }));

  const allHistory = [...approvedFromContext, ...historicalData];

  return (
    <div className="px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <History size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Riwayat Penggunaan
            </h2>
            <p className="text-gray-400 text-xs font-medium">
              Daftar pemesanan ruang laboratorium yang telah selesai atau
              disetujui.
            </p>
          </div>
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
              {allHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-gray-400 font-medium"
                  >
                    Belum ada riwayat penggunaan.
                  </td>
                </tr>
              ) : (
                allHistory.map((data, index) => (
                  <tr
                    key={`${data.id}-${index}`}
                    className="hover:bg-gray-50/50 transition"
                  >
                    <td className="p-4 font-mono text-gray-500">{data.id}</td>
                    <td className="p-4 font-semibold text-gray-800">
                      {data.ruang}
                    </td>
                    <td className="p-4">{data.tanggal}</td>
                    <td className="p-4 text-gray-500">{data.keperluan}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          data.status === "Selesai"
                            ? "text-blue-600 bg-blue-50"
                            : "text-green-600 bg-green-50"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
