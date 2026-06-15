

export default function LabInfo() {
  const labs = [
    { nama: 'Lab Komputer 1', prodi: 'Matematika', spek: 'Core i5, 16GB RAM', kapasitas: '30 PC User', software: 'MATLAB, SPSS, Maple' },
    { nama: 'Lab Komputer 2', prodi: 'Teknik Informatika', spek: 'Core i7, 32GB RAM, RTX 3060', kapasitas: '40 PC User', software: 'VS Code, Android Studio, Docker' },
    { nama: 'Lab Sistem Informasi', prodi: 'Sistem Informasi', spek: 'Core i5, 16GB RAM', kapasitas: '35 PC User', software: 'StarUML, MySQL Workbench, Tableau' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Informasi Fasilitas Laboratorium</h2>
        <p className="text-gray-500 text-sm">Detail kapasitas, spesifikasi hardware, dan software pendukung praktikum.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labs.map((lab, index) => (
          <div key={index} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-blue-50 text-blue-600">{lab.prodi}</span>
            <h3 className="font-bold text-lg text-gray-800 mt-2">{lab.nama}</h3>
            <hr className="my-3 border-gray-100" />
            <ul className="text-xs space-y-2 text-gray-600">
              <li>🖥️ <strong>Spek:</strong> {lab.spek}</li>
              <li>👥 <strong>Kapasitas:</strong> {lab.kapasitas}</li>
              <li>💾 <strong>Software:</strong> {lab.software}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}