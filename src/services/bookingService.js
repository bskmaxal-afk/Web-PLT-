import API from "./api";

/**
 * Submit a lab booking form to the backend.
 * Maps frontend field names to API-expected field names.
 *
 * @param {object} formData — raw form data from LaboratoryBookingForm
 * @returns {Promise<{ success: boolean, message?: string, data?: any }>}
 */
export const submitBooking = async (formData) => {
  try {
    // Map payload to match API expected field names
    const payload = {
      namalab: parseInt(formData.namalab, 10),
      namaKetua: formData.namaKetua.trim(),
      numberWa: formData.numberwa.trim(),       // API expects capital W
      Terjadwal: formData.terjadwal,             // API expects capital T
      matkul: (formData.matkul || "").trim() || "bukan lab pelajaran",
      nim: (formData.nim || "").trim() || "none",
      dosen: (formData.dosen || "").trim() || "none",
      jumlahPeserta: parseInt(formData.jumlahPeserta, 10),
      tanggalKegiatan: formData.tanggalKegiatan,
      jamMasuk: formData.jamMasuk,
      keterangan: formData.keterangan.trim(),
    };

    const response = await API.post("/post/form", payload);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal mengirim pengajuan. Silakan coba lagi.";
    return { success: false, message };
  }
};
