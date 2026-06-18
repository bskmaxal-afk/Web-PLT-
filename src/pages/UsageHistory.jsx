import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { History, FileText, FileSpreadsheet, Download } from "lucide-react";

/**
 * UsageHistory — Displays completed lab booking history.
 * Shows both hardcoded historical data and completed bookings from context.
 * Includes export functionality for PDF and Excel formats.
 */
export default function UsageHistory() {
  const { mySchedules } = useContext(AppContext);
  const [isExporting, setIsExporting] = useState(null);

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

  /**
   * Export to Excel (CSV format that opens in Excel)
   */
  const handleExportExcel = () => {
    setIsExporting("excel");

    setTimeout(() => {
      try {
        const BOM = "\uFEFF";
        const headers = ["ID Booking", "Laboratorium", "Tanggal", "Keperluan", "Status"];
        const csvRows = [headers.join(",")];

        allHistory.forEach((data) => {
          const row = [
            data.id,
            `"${data.ruang}"`,
            `"${data.tanggal}"`,
            `"${data.keperluan}"`,
            data.status,
          ];
          csvRows.push(row.join(","));
        });

        const csvContent = BOM + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Riwayat_Penggunaan_Lab_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Export Excel error:", error);
        alert("Gagal mengekspor ke Excel. Silakan coba lagi.");
      }
      setIsExporting(null);
    }, 500);
  };

  /**
   * Export to PDF using a clean printable view
   */
  const handleExportPDF = () => {
    setIsExporting("pdf");

    setTimeout(() => {
      try {
        const printWindow = window.open("", "_blank");
        const now = new Date();
        const dateStr = now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const tableRows = allHistory
          .map(
            (data, index) => `
          <tr>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">${index + 1}</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-family: 'Courier New', monospace; color: #64748b; font-size: 13px;">${data.id}</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b; font-size: 13px;">${data.ruang}</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 13px;">${data.tanggal}</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">${data.keperluan}</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px;">
              <span style="
                padding: 4px 12px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                ${data.status === 'Selesai'
                  ? 'color: #2563eb; background: #eff6ff;'
                  : 'color: #16a34a; background: #f0fdf4;'
                }
              ">${data.status}</span>
            </td>
          </tr>
        `
          )
          .join("");

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Riwayat Penggunaan Laboratorium - Lab MaTiSi</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
                color: #1e293b;
                background: #fff;
                padding: 40px;
              }

              .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 32px;
                padding-bottom: 20px;
                border-bottom: 3px solid #2563eb;
              }

              .header-left h1 {
                font-size: 22px;
                font-weight: 800;
                color: #1e293b;
                margin-bottom: 4px;
              }

              .header-left p {
                font-size: 13px;
                color: #64748b;
                font-weight: 500;
              }

              .header-right {
                text-align: right;
              }

              .header-right .org {
                font-size: 15px;
                font-weight: 700;
                color: #2563eb;
              }

              .header-right .date {
                font-size: 12px;
                color: #94a3b8;
                margin-top: 4px;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 8px;
              }

              thead tr {
                background: #f1f5f9;
              }

              thead th {
                padding: 12px 14px;
                text-align: left;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: #475569;
                border-bottom: 2px solid #e2e8f0;
              }

              tbody tr:hover {
                background: #f8fafc;
              }

              .footer {
                margin-top: 40px;
                padding-top: 16px;
                border-top: 1px solid #e2e8f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 11px;
                color: #94a3b8;
              }

              .total-badge {
                display: inline-block;
                padding: 6px 16px;
                background: #f1f5f9;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                color: #475569;
                margin-top: 16px;
              }

              @media print {
                body { padding: 20px; }
                .no-print { display: none !important; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="header-left">
                <h1>📋 Riwayat Penggunaan Laboratorium</h1>
                <p>Daftar pemesanan ruang laboratorium yang telah selesai atau disetujui</p>
              </div>
              <div class="header-right">
                <div class="org">Lab MaTiSi</div>
                <div class="date">Dicetak: ${dateStr}</div>
              </div>
            </div>

            <div class="total-badge">Total: ${allHistory.length} data riwayat</div>

            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID Booking</th>
                  <th>Laboratorium</th>
                  <th>Tanggal</th>
                  <th>Keperluan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>

            <div class="footer">
              <span>Laboratorium Komputer Prodi Matematika, Teknik Informatika dan Sistem Informasi</span>
              <span>Halaman 1</span>
            </div>

            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      } catch (error) {
        console.error("Export PDF error:", error);
        alert("Gagal mengekspor ke PDF. Silakan coba lagi.");
      }
      setIsExporting(null);
    }, 500);
  };

  return (
    <div className="px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header with Export Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
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

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              disabled={isExporting === "pdf" || allHistory.length === 0}
              className="export-btn export-btn-pdf"
              title="Cetak ke PDF"
            >
              {isExporting === "pdf" ? (
                <span className="export-spinner"></span>
              ) : (
                <FileText size={15} />
              )}
              <span>PDF</span>
            </button>

            <button
              onClick={handleExportExcel}
              disabled={isExporting === "excel" || allHistory.length === 0}
              className="export-btn export-btn-excel"
              title="Unduh sebagai Excel"
            >
              {isExporting === "excel" ? (
                <span className="export-spinner"></span>
              ) : (
                <FileSpreadsheet size={15} />
              )}
              <span>Excel</span>
            </button>
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
                    <div className="flex flex-col items-center gap-2">
                      <Download size={32} className="text-gray-300" />
                      <span>Belum ada riwayat penggunaan.</span>
                    </div>
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

        {/* Footer info */}
        {allHistory.length > 0 && (
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400 font-medium px-1">
            <span>Menampilkan {allHistory.length} data riwayat</span>
            <span>Klik PDF atau Excel untuk mengunduh data</span>
          </div>
        )}
      </div>
    </div>
  );
}
