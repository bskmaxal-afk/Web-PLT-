import API from "./api";

/**
 * Hapus entri jadwal dan logbook berdasarkan ID.
 * DELETE /delete/:id (Public)
 *
 * @param {string|number} id — ID yang akan dihapus
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const deleteEntry = async (id) => {
  try {
    await API.delete(`/delete/${id}`);
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal menghapus data. Silakan coba lagi.";
    return { success: false, message };
  }
};

/**
 * Hapus entri logbook berdasarkan ID (anak saja, parent schedule dipertahankan).
 * DELETE /delete/logbook/:id
 *
 * @param {string|number} id — ID logbook yang akan dihapus
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const deleteLogbookEntry = async (id) => {
  try {
    await API.delete(`/delete/logbook/${id}`);
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal menghapus data logbook. Silakan coba lagi.";
    return { success: false, message };
  }
};

/**
 * Hapus semua data logbook.
 * DELETE /delete/logbook/clear
 *
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const clearAllLogbooks = async () => {
  try {
    await API.delete("/delete/logbook/clear");
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal menghapus semua data logbook.";
    return { success: false, message };
  }
};

/**
 * Hapus semua data jadwal.
 * DELETE /delete/jadwal/clear
 *
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const clearAllSchedules = async () => {
  try {
    await API.delete("/delete/jadwal/clear");
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal menghapus semua data jadwal.";
    return { success: false, message };
  }
};

/**
 * Ambil semua data riwayat jadwal (Protected - butuh JWT).
 * GET /get/history/schadule
 *
 * @returns {Promise<{ success: boolean, data?: Array, message?: string }>}
 */
export const getHistorySchedules = async () => {
  try {
    const response = await API.get("/get/history/schadule");
    const data = Array.isArray(response.data)
      ? response.data
      : response.data?.message || response.data?.data || response.data?.results || [];
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal memuat data riwayat jadwal. Silakan coba lagi.";
    return { success: false, message };
  }
};

/**
 * Ambil semua data riwayat logbook (Protected - butuh JWT).
 * GET /get/history/logbook
 *
 * @returns {Promise<{ success: boolean, data?: Array, message?: string }>}
 */
export const getHistoryLogbooks = async () => {
  try {
    const response = await API.get("/get/history/logbook");
    const data = Array.isArray(response.data)
      ? response.data
      : response.data?.message || response.data?.data || response.data?.results || [];
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal memuat data riwayat logbook. Silakan coba lagi.";
    return { success: false, message };
  }
};



