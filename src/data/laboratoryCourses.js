/**
 * laboratoryCourses.js
 *
 * Mapping laboratorium → daftar mata kuliah terjadwal.
 * Key   = lab ID (sesuai labs.js)
 * Value = array nama mata kuliah yang tersedia di lab tersebut.
 *
 * Laboratorium yang TIDAK tercantum di sini (atau memiliki array kosong)
 * dianggap tidak memiliki mata kuliah terjadwal.
 */
export const laboratoryCourses = {
  // ── Laboratorium Penelitian Katalis dan Polimer (id: 1) ───────────────────────────
  1: [
    "Sintesis Polimer",
    "Karakterisasi Katalis",
    "Kinetika & Katalisis",
    "Kimia Makromolekul",
    "Teknologi Membran",
  ],

  // ── Laboratorium Penelitian Lingkungan (id: 2) ───────────────────
  2: [
    "Kimia Lingkungan",
    "Analisis Kualitas Lingkungan",
    "Pengolahan Limbah Industri",
    "Ekotoksikologi",
    "Kimia Air & Udara",
  ],

  // ── Ruang Analisis Makanan (id: 3) ───────────────
  3: [
    "Analisis Zat Gizi",
    "Keamanan & Sanitasi Pangan",
    "Pengawasan Mutu Pangan",
    "Kimia Makanan",
    "Evaluasi Sensorik",
  ],

  // ── Ruang Administrasi (id: 5) ───────────────
  5: [],

  // ── Pusat Inkubator Bisnis (id: 8) ────────────────────
  8: [
    "Kewirausahaan Berbasis Teknologi (Technopreneurship)",
    "Manajemen Inovasi",
    "Perencanaan Bisnis & Startup",
    "Komersialisasi Produk Riset",
  ],

  // ── Laboratorium Uji Material (id: 9) ───────────────────
  9: [
    "Karakterisasi Material",
    "Uji Mekanis & Metalografi",
    "Fisika Zat Padat",
    "Termodinamika Material",
    "Fisika Kerusakan Material",
  ],

  // ── Laboratorium Geofisika (id: 11) ─────────────────────
  11: [
    "Petrologi & Mineralogi",
    "Geologi Struktur",
    "Interpretasi Seismik",
    "Sistem Informasi Geografis",
    "Geofisika Eksplorasi",
    "Paleontologi Analitik",
  ],

  // ── Laboratorium Fisika Instrumentasi (id: 12) ───────────────
  12: [
    "Mikrokontroler & IoT",
    "Sistem Sensor & Transduser",
    "Sistem Akuisisi Data",
    "Elektronika Analog & Digital",
    "Pemrograman Sistem Tertanam",
  ],

  // ── Laboratorium Fisika Material & Komputasi (id: 32) ───────────────
  32: [
    "Fisika Material Komputasi",
    "Simulasi Dinamika Molekuler",
    "Fisika Zat Padat Lanjut",
    "Metode Elemen Hingga",
    "Pemodelan Material Baru",
  ],

  // ── Laboratorium Fisika Dasar (id: 14) ───────────────
  14: [
    "Fisika Dasar I",
    "Fisika Dasar II",
    "Praktikum Fisika Dasar",
    "Gelombang dan Optik Dasar",
  ],

  // ── Laboratorium Fisika Lanjut (id: 15) ───────────────
  15: [
    "Fisika Eksperimen Lanjut",
    "Fisika Modern",
    "Optika Koheren",
    "Fisika Nuklir Dasar",
  ],

  // ── Laboratorium Kimia Analitik (id: 16) ───────────────
  16: [
    "Kimia Analitik I",
    "Kimia Analitik II",
    "Analisis Kuantitatif",
    "Pemisahan Kimia & Kromatografi",
    "Spektroskopi Analitik",
  ],

  // ── Laboratorium Kimia Anorganik (id: 17) ───────────────
  17: [
    "Kimia Anorganik I",
    "Kimia Anorganik II",
    "Sintesis Senyawa Anorganik",
    "Karakterisasi Struktur Padatan",
    "Kimia Koordinasi Lanjut",
  ],

  // ── Laboratorium Penelitian Kimia Komputasi (id: 18) ───────────────
  18: [
    "Kimia Komputasi",
    "Pemodelan Struktur Molekul",
    "Simulasi Dinamika Molekul Kimia",
    "Desain Obat Berbantuan Komputer",
  ],

  // ── Laboratorium Biokimia (id: 19) ───────────────
  19: [
    "Biokimia I",
    "Biokimia II",
    "Praktikum Biokimia",
    "Isolasi & Karakterisasi Biomolekul",
    "Metabolisme & Bioenergetika",
  ],

  // ── Laboratorium Kimia Organik (id: 20) ───────────────
  20: [
    "Kimia Organik I",
    "Kimia Organik II",
    "Sintesis Kimia Organik",
    "Analisis Senyawa Organik",
    "Kimia Organik Fisik",
  ],

  // ── Laboratorium Ekologi (id: 21) ───────────────
  21: [
    "Ekologi Dasar",
    "Ekologi Hewan & Tumbuhan",
    "Analisis Dampak Lingkungan",
    "Biologi Konservasi",
    "Pemetaan Ekosistem Terestrial",
  ],

  // ── Laboratorium Biologi Dasar (id: 22) ───────────────
  22: [
    "Biologi Umum",
    "Praktikum Biologi Dasar",
    "Keanekaragaman Hayati",
    "Struktur Perkembangan Tumbuhan",
  ],

  // ── Laboratorium Fisiologi (id: 23) ───────────────
  23: [
    "Fisiologi Hewan",
    "Fisiologi Tumbuhan",
    "Fisiologi Seluler",
    "Endokrinologi Komparatif",
    "Fisiologi Adaptasi Biota",
  ],

  // ── Laboratorium Mikrobiologi (id: 24) ───────────────
  24: [
    "Mikrobiologi Dasar",
    "Mikrobiologi Terapan",
    "Bakteriologi & Mikologi",
    "Virologi Dasar",
    "Teknik Aseptik & Sterilisasi",
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
