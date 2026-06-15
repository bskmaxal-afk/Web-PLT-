import React from 'react';

export default function ContactSupport() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kontak & Bantuan</h2>
        <p className="text-gray-500 text-sm">Punya pertanyaan atau kendala seputar lab? Tim admin kami siap membantu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Jalur Cepat */}
        <div className="md:col-span-1 space-y-4">
          <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl text-xl">💬</div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">WhatsApp</p>
              <p className="text-sm font-bold text-gray-700">+62 812-3456-789</p>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl">📧</div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Email Resmi</p>
              <p className="text-sm font-bold text-gray-700">lab.matisi@uin.ac.id</p>
            </div>
          </div>
        </div>

        {/* Form Kirim Kritik/Saran */}
        <div className="md:col-span-2 bg-white p-5 border border-gray-100 rounded-2xl shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 text-base">Kirim Pesan Langsung</h4>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert("Pesan terkirim!"); }}>
            <input type="text" placeholder="Nama Lengkap / NIM" required className="w-full p-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50" />
            <textarea placeholder="Tulis kendala atau pertanyaan Anda di sini..." rows="3" required className="w-full p-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"></textarea>
            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}