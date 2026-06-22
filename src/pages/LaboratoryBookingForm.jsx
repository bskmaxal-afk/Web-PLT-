import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ClipboardList, Send, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { submitBooking } from "../services/bookingService";
import { getCoursesForLab } from "../data/laboratoryCourses";

// ─── Reusable Components ────────────────────────────────────────

/** Inline field error — declared outside to avoid re-creation on render. */
const FieldError = ({ message }) =>
  message ? (
    <p className="flex items-center gap-1 text-red-500 text-xs font-medium mt-1.5">
      <AlertCircle size={12} className="shrink-0" />
      {message}
    </p>
  ) : null;

// ─── Component ──────────────────────────────────────────────────

/**
 * LaboratoryBookingForm — Formulir pengajuan pemesanan ruang laboratorium.
 *
 * Fields:
 *   namalab, namaKetua, numberwa, terjadwal, matkul, dosen, nim,
 *   jumlahPeserta, tanggalKegiatan, jamMasuk, keterangan
 *
 * Dropdown "Mata Kuliah" berubah dinamis sesuai laboratorium yang dipilih.
 * Data mapping ada di src/data/laboratoryCourses.js.
 */
export default function LaboratoryBookingForm() {
  const navigate = useNavigate();
  const {
    laboratories,
    selectedLaboratory,
    setSelectedLaboratory,
    mySchedules,
    setMySchedules,
  } = useContext(AppContext);

  // ─── Form State ─────────────────────────────────────────────

  const [formData, setFormData] = useState(() => ({
    namalab: selectedLaboratory ? String(selectedLaboratory.id) : "",
    namaKetua: "",
    numberwa: "",
    terjadwal: "",
    matkul: "",
    nim: "",
    dosen: "",
    jumlahPeserta: "",
    tanggalKegiatan: "",
    jamMasuk: "",
    keterangan: "",
  }));

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // ─── Derived State ──────────────────────────────────────────

  /** Daftar mata kuliah untuk lab yang sedang dipilih. */
  const matkulOptions = useMemo(
    () => getCoursesForLab(formData.namalab),
    [formData.namalab]
  );

  /** Apakah lab yang dipilih punya mata kuliah terjadwal? */
  const hasMatkulOptions = matkulOptions.length > 0;

  /**
   * Field-field terjadwal (matkul, dosen, nim) di-disable jika:
   * 1. Lab tidak punya daftar matkul, ATAU
   * 2. Kegiatan bersifat insidental (terjadwal === "tidak")
   */
  const isScheduledFieldsDisabled = !hasMatkulOptions || formData.terjadwal === "tidak";

  /** Nama lab yang dipilih, untuk notifikasi & schedule. */
  const selectedLabName = useMemo(() => {
    const labId = parseInt(formData.namalab, 10);
    const lab = laboratories.find((l) => l.id === labId);
    return lab ? lab.name : "";
  }, [formData.namalab, laboratories]);

  // ─── Handlers ───────────────────────────────────────────────

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      // Reset matkul, dosen, nim ketika lab berubah
      // (daftar matkul ikut berubah — lab baru mungkin tidak punya matkul)
      if (name === "namalab") {
        next.matkul = "";
        next.dosen = "";
        next.nim = "";
      }

      // Reset matkul, dosen, nim ketika terjadwal → "tidak"
      if (name === "terjadwal" && value === "tidak") {
        next.matkul = "";
        next.dosen = "";
        next.nim = "";
      }

      return next;
    });

    clearError(name);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // ─── Validation ─────────────────────────────────────────────

  const validateForm = () => {
    const newErrors = {};

    // Laboratorium
    if (!formData.namalab) {
      newErrors.namalab = "Pilih laboratorium terlebih dahulu.";
    }

    // Nama Ketua
    if (!formData.namaKetua.trim()) {
      newErrors.namaKetua = "Nama ketua/penanggung jawab wajib diisi.";
    } else if (formData.namaKetua.trim().length < 3) {
      newErrors.namaKetua = "Nama minimal 3 karakter.";
    }

    // Nomor WhatsApp
    if (!formData.numberwa.trim()) {
      newErrors.numberwa = "Nomor WhatsApp wajib diisi.";
    } else if (!/^(\+?62|08)\d{8,13}$/.test(formData.numberwa.trim())) {
      newErrors.numberwa = "Format nomor WhatsApp tidak valid. Contoh: 081234567890";
    }

    // Terjadwal
    if (!formData.terjadwal) {
      newErrors.terjadwal = "Pilih apakah kegiatan terjadwal atau tidak.";
    }

    // Matkul, Dosen, NIM — wajib hanya jika lab PUNYA daftar matkul DAN terjadwal "iya".
    // Jika lab tidak punya matkul → seluruh blok ini di-skip.
    if (hasMatkulOptions && formData.terjadwal === "iya") {
      if (!formData.matkul) {
        newErrors.matkul = "Mata kuliah wajib dipilih untuk kegiatan terjadwal.";
      }
      if (!formData.dosen.trim()) {
        newErrors.dosen = "Nama dosen pengampu wajib diisi untuk kegiatan terjadwal.";
      }
      if (!formData.nim.trim()) {
        newErrors.nim = "NIM wajib diisi untuk kegiatan terjadwal.";
      }
    }

    // Jumlah Peserta
    if (!formData.jumlahPeserta) {
      newErrors.jumlahPeserta = "Jumlah peserta wajib diisi.";
    } else {
      const peserta = parseInt(formData.jumlahPeserta, 10);
      if (peserta < 1 || peserta > 100) {
        newErrors.jumlahPeserta = "Jumlah peserta harus antara 1 - 100 orang.";
      }
    }

    // Tanggal Kegiatan
    if (!formData.tanggalKegiatan) {
      newErrors.tanggalKegiatan = "Tanggal kegiatan wajib dipilih.";
    } else {
      const selectedDate = new Date(formData.tanggalKegiatan);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.tanggalKegiatan = "Tanggal kegiatan tidak boleh di masa lampau.";
      }
    }

    // Jam Masuk
    if (!formData.jamMasuk) {
      newErrors.jamMasuk = "Jam masuk wajib dipilih.";
    }

    // Keterangan
    if (!formData.keterangan.trim()) {
      newErrors.keterangan = "Keterangan / detail kegiatan wajib diisi.";
    } else if (formData.keterangan.trim().length < 10) {
      newErrors.keterangan = "Keterangan minimal 10 karakter.";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) {
      console.log("Pengiriman gagal (validasi form):", newErrors);
    }
    return isValid;
  };

  // ─── Submit ─────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setNotification(null);

    try {
      const result = await submitBooking(formData);

      if (result.success) {
        // Simpan ke local state untuk "Jadwal Saya"
        const newSchedule = {
          id: Date.now(),
          namalab: parseInt(formData.namalab, 10),
          namaKetua: formData.namaKetua.trim(),
          numberwa: formData.numberwa.trim(),
          terjadwal: formData.terjadwal,
          matkul: formData.matkul || "bukan lab pelajaran",
          nim: formData.nim.trim() || "none",
          dosen: formData.dosen.trim() || "none",
          jumlahPeserta: parseInt(formData.jumlahPeserta, 10),
          tanggalKegiatan: formData.tanggalKegiatan,
          jamMasuk: formData.jamMasuk,
          keterangan: formData.keterangan.trim(),
          ruang: selectedLabName,
          tanggal: formData.tanggalKegiatan,
          status: "Pending",
        };

        setMySchedules([newSchedule, ...mySchedules]);
        setSelectedLaboratory(null);

        console.log("Pengiriman sukses:", result.data);
        showNotification("success", `Pengajuan peminjaman ${selectedLabName} berhasil dikirim! 🎉`);
        setTimeout(() => navigate("/"), 1500);
      } else {
        console.log("Pengiriman gagal (API error):", result.message);
        showNotification("error", result.message);
      }
    } catch (error) {
      console.log("Pengiriman gagal (network/server error):", error);
      console.error("Booking submission failed:", error);
      showNotification("error", "Terjadi kesalahan jaringan. Pastikan server backend aktif dan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────

  /** Shared CSS class builder for form inputs. */
  const fieldClass = (fieldName, extraDisabled = false) =>
    `w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm ${
      extraDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-50"
    } ${errors[fieldName] ? "border-red-300 bg-red-50/30" : "border-gray-200"}`;

  return (
    <div className="px-8 max-w-4xl mx-auto">
      {/* ── Notification ─────────────────────────────────────── */}
      {notification && (
        <div
          className={`mb-4 flex items-center gap-3 px-5 py-4 rounded-2xl border text-sm font-semibold transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
          style={{ animation: "slideUp 0.3s ease-out" }}
        >
          {notification.type === "success" ? (
            <CheckCircle size={18} className="text-emerald-500 shrink-0" />
          ) : (
            <XCircle size={18} className="text-red-500 shrink-0" />
          )}
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto text-current opacity-50 hover:opacity-100 transition cursor-pointer bg-transparent border-none"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* ── Header ───────────────────────────────────────── */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ClipboardList size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Formulir Pengajuan Ruang
              </h2>
              <p className="text-gray-400 text-xs font-medium">
                Silahkan isi detail pemesanan laboratorium di bawah ini.
              </p>
            </div>
          </div>

          {selectedLaboratory && (
            <div className="mt-3 flex items-center gap-2 bg-blue-50/50 border border-blue-100/50 rounded-xl px-4 py-2.5">
              <span className="text-xs text-blue-600 font-semibold">
                📍 Dipilih dari dashboard:
              </span>
              <span className="text-xs font-bold text-blue-800">
                {selectedLaboratory.name}
              </span>
            </div>
          )}
        </div>

        {/* ── Form ─────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* 1. Pilih Laboratorium */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pilih Laboratorium <span className="text-red-400">*</span>
              </label>
              <select
                name="namalab"
                value={formData.namalab}
                onChange={handleChange}
                className={fieldClass("namalab")}
              >
                <option value="">-- Pilih Ruang Laboratorium --</option>
                {laboratories.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name}
                  </option>
                ))}
              </select>
              <FieldError message={errors.namalab} />
            </div>

            {/* 2. Nama Ketua */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Ketua / Penanggung Jawab{" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="namaKetua"
                value={formData.namaKetua}
                onChange={handleChange}
                placeholder="Contoh: Ahmad Rizki"
                className={fieldClass("namaKetua")}
              />
              <FieldError message={errors.namaKetua} />
            </div>

            {/* 3. Nomor WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor WhatsApp <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="numberwa"
                value={formData.numberwa}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                className={fieldClass("numberwa")}
              />
              <FieldError message={errors.numberwa} />
            </div>

            {/* 4. Kegiatan Terjadwal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kegiatan Terjadwal? <span className="text-red-400">*</span>
              </label>
              <select
                name="terjadwal"
                value={formData.terjadwal}
                onChange={handleChange}
                className={fieldClass("terjadwal")}
              >
                <option value="">-- Pilih Status --</option>
                <option value="iya">Iya (Terjadwal)</option>
                <option value="tidak">Tidak (Insidental)</option>
              </select>
              <FieldError message={errors.terjadwal} />
            </div>

            {/* 5. Mata Kuliah — dinamis per lab */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mata Kuliah{" "}
                {hasMatkulOptions && formData.terjadwal === "iya" && (
                  <span className="text-red-400">*</span>
                )}
              </label>
              <select
                name="matkul"
                value={formData.matkul}
                onChange={handleChange}
                disabled={isScheduledFieldsDisabled}
                className={fieldClass("matkul", isScheduledFieldsDisabled)}
              >
                <option value="">
                  {!formData.namalab
                    ? "-- Pilih Laboratorium terlebih dahulu --"
                    : hasMatkulOptions
                      ? "-- Pilih Mata Kuliah --"
                      : "Tidak ada mata kuliah yang tersedia"}
                </option>
                {matkulOptions.map((mk) => (
                  <option key={mk} value={mk}>
                    {mk}
                  </option>
                ))}
              </select>
              <FieldError message={errors.matkul} />
            </div>

            {/* 6. Dosen Pengampu */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dosen Pengampu{" "}
                {hasMatkulOptions && formData.terjadwal === "iya" && (
                  <span className="text-red-400">*</span>
                )}
              </label>
              <input
                type="text"
                name="dosen"
                value={formData.dosen}
                onChange={handleChange}
                placeholder="Contoh: Dr. Budi Santoso"
                disabled={isScheduledFieldsDisabled}
                className={fieldClass("dosen", isScheduledFieldsDisabled)}
              />
              <FieldError message={errors.dosen} />
            </div>

            {/* 7. NIM */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NIM{" "}
                {hasMatkulOptions && formData.terjadwal === "iya" && (
                  <span className="text-red-400">*</span>
                )}
              </label>
              <input
                type="text"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                placeholder="Contoh: 1234567"
                disabled={isScheduledFieldsDisabled}
                className={fieldClass("nim", isScheduledFieldsDisabled)}
              />
              <FieldError message={errors.nim} />
            </div>

            {/* 8. Jumlah Peserta */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Peserta <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="jumlahPeserta"
                value={formData.jumlahPeserta}
                onChange={handleChange}
                placeholder="Contoh: 30"
                min="1"
                max="100"
                className={fieldClass("jumlahPeserta")}
              />
              <FieldError message={errors.jumlahPeserta} />
            </div>

            {/* 9. Tanggal Kegiatan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal Kegiatan <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="tanggalKegiatan"
                value={formData.tanggalKegiatan}
                onChange={handleChange}
                className={fieldClass("tanggalKegiatan")}
              />
              <FieldError message={errors.tanggalKegiatan} />
            </div>

            {/* 10. Jam Masuk */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jam Masuk <span className="text-red-400">*</span>
              </label>
              <input
                type="time"
                name="jamMasuk"
                value={formData.jamMasuk}
                onChange={handleChange}
                className={fieldClass("jamMasuk")}
              />
              <FieldError message={errors.jamMasuk} />
            </div>

          </div>

          {/* 11. Keterangan — full width */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Keterangan / Detail Kegiatan{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              rows="4"
              placeholder="Tuliskan detail agenda kegiatan, keperluan khusus, atau catatan lainnya..."
              className={`${fieldClass("keterangan")} resize-none`}
            />
            <FieldError message={errors.keterangan} />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-md shadow-blue-200 transition-all text-sm cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Ajukan Pemesanan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
