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
 * Hapus entri logbook berdasarkan ID.
 * DELETE /delete/logbook/:id (Public/Admin)
 *
 * @param {string|number} id — ID logbook yang akan dihapus
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const deleteLogbook = async (id) => {
  try {
    const response = await API.delete(`/delete/logbook/${id}`);
    // Check if response contains affectedRows or custom status
    if (response.data && (response.data.status === 200 || response.data.message?.affectedRows > 0)) {
      return { success: true };
    }
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal menghapus data logbook. Silakan coba lagi.";
    return { success: false, message };
  }
};
