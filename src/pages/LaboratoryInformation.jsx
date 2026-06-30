import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Monitor, Users, HardDrive, Info, Landmark } from "lucide-react";

const RUMPUN_TABS = [
  { id: "tisimat", name: "TISIMAT", fullName: "Teknologi Informasi, Sistem Informasi, Matematika" },
  { id: "kimia", name: "KIMIA", fullName: "Rumpun Kimia" },
  { id: "biologi", name: "BIOLOGI", fullName: "Rumpun Biologi" },
  { id: "fisika", name: "FISIKA", fullName: "Rumpun Fisika" },
  { id: "agribisnis", name: "AGRIBISNIS", fullName: "Rumpun Agribisnis" },
  { id: "tambang", name: "TAMBANG", fullName: "Rumpun Tambang & Geologi" },
  { id: "pangan", name: "PANGAN", fullName: "Rumpun Pangan" },
  { id: "lingkungan", name: "LINGKUNGAN", fullName: "Rumpun Lingkungan" }
];

const RUMPUN_INFO = {
  tisimat: { 
    description: "Pusat inovasi komputasi sains, rekayasa perangkat lunak, analisis data cerdas, dan keamanan siber.", 
    colorClass: "from-indigo-600 to-violet-800",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    tabActiveColor: "bg-indigo-600 text-white shadow-indigo-500/10"
  },
  kimia: { 
    description: "Fasilitas laboratorium terpadu untuk pengujian instrumentasi kimia, analisis kuantitatif, dan sintesis senyawa organik.", 
    colorClass: "from-teal-500 to-emerald-700",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-100",
    tabActiveColor: "bg-teal-600 text-white shadow-teal-500/10"
  },
  biologi: { 
    description: "Eksplorasi ilmu hayati dengan fokus riset kultur jaringan tumbuhan, mikrobiologi terapan, dan biokimia molekuler.", 
    colorClass: "from-emerald-500 to-teal-700",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    tabActiveColor: "bg-emerald-600 text-white shadow-emerald-500/10"
  },
  fisika: { 
    description: "Pusat eksperimen fisika material dasar, kalibrasi instrumen optik, elektronika digital, dan fisika medis.", 
    colorClass: "from-blue-500 to-indigo-700",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
    tabActiveColor: "bg-blue-600 text-white shadow-blue-500/10"
  },
  agribisnis: { 
    description: "Inkubator bisnis pertanian, kajian ekonomi sosial makro-mikro pertanian, dan riset agribisnis berkelanjutan.", 
    colorClass: "from-amber-500 to-orange-700",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
    tabActiveColor: "bg-amber-500 text-white shadow-amber-500/10"
  },
  tambang: { 
    description: "Fasilitas pengolahan mineral galian bumi, survei seismik, geomekanika batuan, dan pemetaan geologi lapangan.", 
    colorClass: "from-orange-500 to-red-700",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-100",
    tabActiveColor: "bg-orange-600 text-white shadow-orange-500/10"
  },
  pangan: { 
    description: "Pengembangan produk olahan pangan, rekayasa kemasan pangan, serta evaluasi gizi dan analisis sensoris makanan.", 
    colorClass: "from-rose-500 to-pink-700",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-100",
    tabActiveColor: "bg-rose-600 text-white shadow-rose-500/10"
  },
  lingkungan: { 
    description: "Kajian ekologi terapan, rekayasa pengolahan limbah industri/domestik, mitigasi kebencanaan, dan geografi lingkungan.", 
    colorClass: "from-lime-600 to-green-700",
    badgeColor: "bg-lime-50 text-lime-700 border-lime-100",
    tabActiveColor: "bg-lime-600 text-white shadow-lime-500/10"
  }
};

const prodiColors = {
  "Teknik Informatika": "bg-blue-50 text-blue-600 border-blue-100",
  "Sistem Informasi": "bg-indigo-50 text-indigo-600 border-indigo-100",
  Matematika: "bg-purple-50 text-purple-600 border-purple-100",
  Biologi: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Fisika: "bg-sky-50 text-sky-600 border-sky-100",
  Kimia: "bg-teal-50 text-teal-600 border-teal-100",
  "Teknik Elektro": "bg-orange-50 text-orange-600 border-orange-100",
  "Teknik Geologi": "bg-amber-50 text-amber-600 border-amber-100",
  "Teknik Pertambangan": "bg-red-50 text-red-600 border-red-100",
  "Teknologi Pangan": "bg-rose-50 text-rose-600 border-rose-100",
  "Teknik Lingkungan": "bg-lime-50 text-lime-600 border-lime-100",
  Umum: "bg-slate-50 text-slate-600 border-slate-100",
};

export default function LaboratoryInformation() {
  const { laboratories } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("tisimat");

  const activeRumpun = RUMPUN_INFO[activeTab];
  const activeTabMeta = RUMPUN_TABS.find(t => t.id === activeTab);

  // Filter laboratories belonging to the active rumpun
  const filteredLabs = laboratories.filter(
    (lab) => lab.rumpun?.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="px-8 max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 font-display">
          Informasi Rumpun Keilmuan & Laboratorium
        </h2>
        <p className="text-gray-400 text-xs font-semibold mt-1">
          Eksplorasi pembagian rumpun keilmuan fakultas beserta fasilitas spesifikasi laboratorium terintegrasi PLT.
        </p>
      </div>

      {/* Rumpun Selection Tabs */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-slate-100 pb-5">
        {RUMPUN_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const meta = RUMPUN_INFO[tab.id];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                isActive
                  ? `${meta.tabActiveColor} shadow-md`
                  : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-100"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Selected Rumpun Jumbotron Banner */}
      <div className={`w-full bg-gradient-to-r ${activeRumpun.colorClass} rounded-[2rem] p-8 md:p-10 text-white shadow-md relative overflow-hidden mb-10`}>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
              <Landmark size={18} className="text-white" />
            </div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-100">
              Profil Rumpun Keilmuan
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold font-display leading-tight tracking-tight mb-1">
            {activeTabMeta?.name}
          </h3>
          <h4 className="text-xs md:text-sm font-bold text-blue-100/90 mb-4 font-display">
            {activeTabMeta?.fullName}
          </h4>
          <p className="text-xs md:text-sm text-blue-50/90 leading-relaxed font-medium">
            {activeRumpun.description}
          </p>
        </div>
      </div>

      {/* Facilities header */}
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-base font-bold text-slate-800 font-display">
          Fasilitas Laboratorium di Rumpun {activeTabMeta?.name}
        </h4>
        <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-100 rounded-lg px-2.5 py-1">
          {filteredLabs.length} Ruangan
        </span>
      </div>

      {/* Laboratory specs grid */}
      {filteredLabs.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-500">
          <Info className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="font-semibold text-sm">Tidak ada laboratorium</p>
          <p className="text-[11px] text-slate-400 mt-1">Belum ada fasilitas laboratorium aktif untuk rumpun ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Prodi Badge */}
                <span
                  className={`text-[9px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-lg border w-fit block mb-3.5 ${
                    prodiColors[lab.prodi] || "bg-slate-50 text-slate-600 border-slate-100"
                  }`}
                >
                  {lab.prodi}
                </span>

                <h5 className="font-extrabold text-slate-800 text-sm mb-1.5 font-display leading-tight">
                  {lab.name}
                </h5>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mb-4 min-h-[50px]">
                  {lab.description}
                </p>

                <hr className="border-slate-50 mb-4" />

                {/* Specs Info */}
                <ul className="text-[11px] space-y-2.5 text-slate-600 mb-6 font-semibold">
                  <li className="flex items-start gap-2.5">
                    <Monitor size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-slate-700">Spesifikasi:</strong>{" "}
                      <span className="font-medium text-slate-500">{lab.spek}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Users size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-slate-700">Kapasitas:</strong>{" "}
                      <span className="font-medium text-slate-500">{lab.capacity} pengguna</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <HardDrive size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-slate-700">Software:</strong>{" "}
                      <span className="font-medium text-slate-500">{lab.software}</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Status Area */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-4 mt-auto">
                <span className="text-[10px] font-bold text-slate-400">Status Ruangan</span>
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                    lab.status === "available"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-rose-50 text-rose-600 border border-rose-100"
                  }`}
                >
                  {lab.status === "available" ? "Tersedia" : "Penuh"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
