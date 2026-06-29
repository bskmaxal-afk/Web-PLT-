
import { labs as localLabs } from "../data/labs";

/**
 * Fetch daftar laboratorium.
 *
 * Selalu menggunakan data statis dari labs.js sebagai sumber utama (source of truth).
 * Backend tidak lagi menentukan daftar laboratorium yang ditampilkan di frontend,
 * karena daftar lab telah diperbarui ke Lab Sains & Teknologi.
 *
 * @returns {Promise<Array>} Daftar laboratorium
 */
export const getLabs = async () => {
  return localLabs;
};
