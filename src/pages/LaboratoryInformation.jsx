import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Monitor, Users, HardDrive } from "lucide-react";

/**
 * LaboratoryInformation — Shows detailed facility info for all 15 laboratories.
 * Uses lab data from context (single source of truth from labs.js).
 */
export default function LaboratoryInformation() {
  const { laboratories } = useContext(AppContext);

  // Group labs by prodi for organized display
  const prodiColors = {
    "Teknik Informatika": "bg-blue-50 text-blue-600",
    Matematika: "bg-emerald-50 text-emerald-600",
    Biologi: "bg-teal-50 text-teal-600",
    Fisika: "bg-indigo-50 text-indigo-600",
    Kimia: "bg-pink-50 text-pink-600",
    "Teknik Elektro": "bg-orange-50 text-orange-600",
    "Teknik Geologi": "bg-amber-50 text-amber-600",
    Umum: "bg-slate-50 text-slate-600",
  };

  return (
    <div className="px-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Informasi Fasilitas Laboratorium
        </h2>
        <p className="text-gray-400 text-xs font-medium mt-1">
          Detail kapasitas, spesifikasi hardware, dan software pendukung
          praktikum untuk seluruh fasilitas PLT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {laboratories.map((lab) => (
          <div
            key={lab.id}
            className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col"
          >
            {/* Prodi badge */}
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md w-fit ${
                prodiColors[lab.prodi] || "bg-gray-50 text-gray-600"
              }`}
            >
              {lab.prodi}
            </span>

            <h3 className="font-bold text-base text-gray-800 mt-2.5 mb-1">
              {lab.name}
            </h3>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
              {lab.description}
            </p>

            <hr className="border-gray-100 mb-3" />

            <ul className="text-xs space-y-2.5 text-gray-600 flex-1">
              <li className="flex items-start gap-2">
                <Monitor
                  size={13}
                  className="text-gray-400 mt-0.5 shrink-0"
                />
                <span>
                  <strong className="text-gray-700">Spesifikasi:</strong>{" "}
                  {lab.spek}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Users size={13} className="text-gray-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-gray-700">Kapasitas:</strong>{" "}
                  {lab.capacity} pengguna
                </span>
              </li>
              <li className="flex items-start gap-2">
                <HardDrive
                  size={13}
                  className="text-gray-400 mt-0.5 shrink-0"
                />
                <span>
                  <strong className="text-gray-700">Software:</strong>{" "}
                  {lab.software}
                </span>
              </li>
            </ul>

            {/* Status indicator */}
            <div className="mt-3 pt-3 border-t border-gray-50">
              <span
                className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                  lab.status === "available"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {lab.status === "available" ? "Tersedia" : "Tidak Tersedia"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
