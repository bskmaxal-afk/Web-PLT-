/**
 * laboratoryCourses.js
 *
 * Mapping laboratorium → daftar mata kuliah terjadwal.
 * Key   = lab ID (sesuai labs.js)
 * Value = array nama mata kuliah yang tersedia di lab tersebut.
 *
 * Laboratorium yang TIDAK tercantum di sini (atau memiliki array kosong)
 * dianggap tidak memiliki mata kuliah terjadwal, sehingga:
 *   - Dropdown mata kuliah di-disable
 *   - Validasi mata kuliah tidak dijalankan
 *
 * Untuk menambah / mengubah daftar mata kuliah, cukup edit file ini.
 */
export const laboratoryCourses = {
  // ── Lab Aplikasi 1 (id: 1) ──────────────────────────────────
  1: [
    "Algoritma dan Struktur Data",
    "Tata Kelola Teknologi Informasi",
    "Sistem Informasi Perbankan Syariah",
    "Etika Profesi Teknologi Informasi",
    "Proyek Minor Sistem Informasi",
    "Gudang Data dan Kecerdasan Bisnis",
    "Computer Vision",
  ],

  // ── Lab Aplikasi 2 (id: 2) ──────────────────────────────────
  2: [
    "Rekayasa Perangkat Lunak",
    "Interaksi Manusia dan Komputer",
    "Sistem Enterprise",
    "Tata Kelola Teknologi Informasi",
    "Algoritma dan Struktur Data",
    "Proyek Minor Sistem Informasi",
    "Pendidikan Pancasila",
  ],

  // ── Lab Aplikasi 3 / Lab Data Sains (id: 3) ────────────────
  3: [
    "Natural Language Processing",
    "Statistika Elementer",
    "High Performance Computing",
    "Algoritma dan Struktur Data",
    "Metode Optimasi",
  ],

  // ── Lab Jaringan / Lab Jaringan Komputer (id: 4) ────────────
  4: [
    "Digital Forensic (A)",
    "Internet of Things (IoT)",
    "Digital Forensic (B)",
    "Infrastruktur Teknologi Informasi",
  ],

  // ── Lab Multimedia 1 (id: 6) ────────────────────────────────
  6: [
    "Algoritma dan Struktur Data",
    "Analisis dan Perancangan Sistem Informasi",
    "Rekayasa Perangkat Lunak",
    "Sistem Basis Data Spesial",
    "Konsep Sistem Informasi",
  ],

  // ── Lab Multimedia 2 (id: 7) ────────────────────────────────
  7: [
    "Proyek Minor Sistem Informasi",
    "Interaksi Manusia dan Komputer",
    "Rekayasa Perangkat Lunak",
    "Konsep Sistem Informasi",
    "Tata Kelola Teknologi Informasi",
  ],

  // ── Lab Programming (id: 8) ─────────────────────────────────
  8: [
    "Kapita Selekta",
    "Kecerdasan Komputasional",
    "Kriptografi (A)",
    "Proyek Perangkat Lunak",
    "Pemrograman Lanjut",
    "Software Process",
    "Kriptografi (B)",
  ],

  // ── Lab Digital / Lab Sistem Digital (id: 9) ────────────────
  9: [
    "Robotik (B)",
    "Sistem Digital",
    "Robotik (A)",
  ],

  // ── Lab Operasi / Ruang Operasi (id: 15) ────────────────────
  15: [
    "Sistem Operasi",
    "Pemrograman Lanjut",
    "Big Data",
    "Data Science",
  ],
};

/**
 * Helper: dapatkan daftar mata kuliah untuk lab tertentu.
 * Mengembalikan array kosong jika lab tidak punya daftar matkul.
 *
 * @param {number|string} labId — ID laboratorium
 * @returns {string[]}
 */
export const getCoursesForLab = (labId) => {
  const id = typeof labId === "string" ? parseInt(labId, 10) : labId;
  return laboratoryCourses[id] || [];
};

/**
 * Helper: cek apakah lab memiliki mata kuliah terjadwal.
 *
 * @param {number|string} labId — ID laboratorium
 * @returns {boolean}
 */
export const labHasCourses = (labId) => {
  return getCoursesForLab(labId).length > 0;
};
