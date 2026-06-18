import API from "./api";

/**
 * Fetch all usage history / timestamp data.
 * Only accessible by authenticated admin.
 *
 * @returns {Promise<{ success: boolean, data?: Array, message?: string }>}
 */
export const getHistory = async () => {
  try {
    const response = await API.get("/get/timestamp");
    // Normalize response — API may return array directly or wrapped
    const data = Array.isArray(response.data)
      ? response.data
      : response.data?.data || response.data?.results || [];
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal memuat data riwayat. Silakan coba lagi.";
    return { success: false, message };
  }
};

/**
 * Delete a specific history entry by ID.
 *
 * @param {string|number} id — the entry ID to delete
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const deleteEntry = async (id) => {
  try {
    await API.delete(`/get/${id}`);
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal menghapus data. Silakan coba lagi.";
    return { success: false, message };
  }
};
