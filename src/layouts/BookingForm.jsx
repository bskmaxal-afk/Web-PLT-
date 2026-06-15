import React, { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    ruang: '',
    tanggal: '',
    sesi: '',
    keperluan: '',
    jumlahPeserta: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Permohonan booking ${formData.ruang} berhasil dikirim! Silahkan cek menu 'Jadwal Saya'.`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Formulir Pengajuan Ruang</h2>
        <p className="text-gray-500 text-sm">Silahkan isi detail pemesanan laboratorium di bawah ini.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Laboratorium</label>
            <select name="ruang" onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50">
              <option value="">-- Pilih Ruang --</option>
              <option value="Lab Komputer 1">Lab Komputer 1 (Matematika)</option>
              <option value="Lab Komputer 2">Lab Komputer 2 (Teknik Informatika)</option>
              <option value="Lab Sistem Informasi">Lab Sistem Informasi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Pemakaian</label>
            <input type="date" name="tanggal" onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sesi Waktu</label>
            <select name="sesi" onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50">
              <option value="">-- Pilih Sesi --</option>
              <option value="Sesi 1">Sesi 1 (07.30 - 09.30)</option>
              <option value="Sesi 2">Sesi 2 (10.00 - 12.00)</option>
              <option value="Sesi 3">Sesi 3 (13.00 - 15.00)</option>
              <option value="Sesi 4">Sesi 4 (15.30 - 17.30)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estimasi Jumlah Peserta</label>
            <input type="number" name="jumlahPeserta" placeholder="Contoh: 30" onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Keperluan Penggunaan</label>
          <textarea name="keperluan" rows="4" placeholder="Tuliskan detail agenda kegiatan atau praktikum..." onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"></textarea>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-200 transition-all">
            Ajukan Pemesanan
          </button>
        </div>
      </form>
    </div>
  );
}