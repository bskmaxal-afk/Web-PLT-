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
  // ── Lab Biologi Agraria (id: 1) ───────────────────────────
  1: [
    "Bioteknologi Pertanian",
    "Fisiologi Tumbuhan Lanjut",
    "Genetika Tumbuhan",
    "Mikrobiologi Agraria",
    "Kultur Jaringan Tanaman",
    "Ekologi Pertanian",
  ],

  // ── Lab Fisika Dasar & Material (id: 2) ───────────────────
  2: [
    "Fisika Dasar I",
    "Fisika Dasar II",
    "Fisika Eksperimen",
    "Termodinamika Lanjut",
    "Karakterisasi Material",
    "Fisika Zat Padat",
    "Mekanika Analitik",
  ],

  // ── Lab Kimia Analitik & Lingkungan (id: 3) ───────────────
  3: [
    "Kimia Analitik Dasar",
    "Kimia Lingkungan",
    "Analisis Instrumen",
    "Pemisahan Kimia",
    "Kimia Air & Udara",
    "Spektroskopi Organik",
  ],

  // ── Lab Komputasi Sains & Pemodelan (id: 5) ───────────────
  5: [
    "Metode Numerik",
    "Pemodelan Matematika",
    "Analisis Data Sains",
    "Optimasi Numerik",
    "Persamaan Diferensial",
    "Komputasi Aljabar",
  ],

  // ── Lab Elektronika & Robotika (id: 8) ────────────────────
  8: [
    "Mikrokontroler & IoT",
    "Sistem Kontrol Analog",
    "Perancangan Robotika",
    "Elektronika Daya",
    "Sensor & Aktuator",
    "Sistem Tertanam (Embedded)",
  ],

  // ── Lab Biokimia & Mikrobiologi (id: 9) ───────────────────
  9: [
    "Biokimia Klinik",
    "Mikrobiologi Medis",
    "Teknologi Enzim",
    "Rekayasa Genetika",
    "Metabolisme Biomolekul",
    "Imunologi Dasar",
  ],

  // ── Lab Geologi & Geofisika (id: 11) ─────────────────────
  11: [
    "Petrologi & Mineralogi",
    "Geologi Struktur",
    "Interpretasi Seismik",
    "Sistem Informasi Geografis",
    "Geofisika Eksplorasi",
    "Paleontologi Analitik",
  ],

  // ── Lab Jaringan Komputer & Siber (id: 12) ───────────────
  12: [
    "Administrasi Jaringan",
    "Keamanan Informasi",
    "Kriptografi Praktis",
    "Ethical Hacking",
    "Analisis Forensik Digital",
    "Arsitektur Jaringan Enterprise",
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
