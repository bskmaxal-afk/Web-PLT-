import {
  Laptop,
  FlaskConical,
  Dna,
  Atom,
  Sprout,
  Pickaxe,
  Cookie,
  Globe,
  ArrowRight,
  Eye,
  LayoutGrid,
  List,
  X,
  ChevronRight,
  Beaker
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

/**
 * RumpunGrid — A state-of-the-art dashboard component.
 * Features View Switcher (Grid/List), Category Filter Tabs,
 * Quick Preview Drawer, and dynamic Live Schedules + Occupancy Statistics widgets.
 */
export default function RumpunGrid() {
  const navigate = useNavigate();
  const { laboratories, searchQuery, mySchedules } = useContext(AppContext);

  // Redesign state variables
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [activeFilter, setActiveFilter] = useState("semua"); // 'semua' | 'sains-komputer' | 'kimia-biologi' | 'terapan-bumi'
  const [previewRumpun, setPreviewRumpun] = useState(null); // rumpun object for drawer

  // Dynamic laboratory count helper
  const getLabCount = (rumpunId) => {
    return laboratories.filter((lab) => lab.rumpun === rumpunId).length;
  };

  const rumpunData = [
    {
      id: "tisimat",
      name: "TISIMAT",
      fullName: "Teknologi Informasi, SI, Matematika",
      description: "Kluster riset komputasi sains, rekayasa perangkat lunak, sistem siber, elektro, dan analisis data terintegrasi.",
      icon: Laptop,
      colorClass: "bg-indigo-600",
      textClass: "text-indigo-600",
      bgClass: "bg-indigo-50/50",
      glowClass: "group-hover:shadow-indigo-500/10",
      borderClass: "border-indigo-500/20 hover:border-indigo-500",
      hoverBtnClass: "hover:bg-indigo-600 hover:text-white",
      prodis: ["Informatika", "Sistem Informasi", "Matematika", "Elektro"],
      link: "#"
    },
    {
      id: "kimia",
      name: "KIMIA",
      fullName: "Rumpun Kimia",
      description: "Pengujian kimia instrumentasi modern, analisis analitik, kimia lingkungan, dan sintesis senyawa organik.",
      icon: FlaskConical,
      colorClass: "bg-teal-500",
      textClass: "text-teal-600",
      bgClass: "bg-teal-50/50",
      glowClass: "group-hover:shadow-teal-500/10",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
      prodis: ["Kimia Murni", "Pendidikan Kimia"],
      link: "#"
    },
    {
      id: "biologi",
      name: "BIOLOGI",
      fullName: "Rumpun Biologi",
      description: "Eksplorasi bioteknologi modern, mikrobiologi, kultur jaringan tumbuhan, dan analisis biomolekul.",
      icon: Dna,
      colorClass: "bg-emerald-500",
      textClass: "text-emerald-650",
      bgClass: "bg-emerald-50/50",
      glowClass: "group-hover:shadow-emerald-500/10",
      borderClass: "border-emerald-500/20 hover:border-emerald-500",
      hoverBtnClass: "hover:bg-emerald-500 hover:text-white",
      prodis: ["Biologi", "Bioteknologi"],
      link: "#"
    },
    {
      id: "fisika",
      name: "FISIKA",
      fullName: "Rumpun Fisika",
      description: "Praktikum fisika dasar, eksperimen material, kalibrasi instrumentasi digital, dan fisika medikal.",
      icon: Atom,
      colorClass: "bg-blue-500",
      textClass: "text-blue-600",
      bgClass: "bg-blue-50/50",
      glowClass: "group-hover:shadow-blue-500/10",
      borderClass: "border-blue-500/20 hover:border-blue-500",
      hoverBtnClass: "hover:bg-blue-500 hover:text-white",
      prodis: ["Fisika Murni", "Geofisika"],
      link: "#"
    },
    {
      id: "agribisnis",
      name: "AGRIBISNIS",
      fullName: "Rumpun Agribisnis",
      description: "Inkubasi bisnis pertanian terpadu, analisis sosial ekonomi pertanian, dan simulasi kelayakan pasar.",
      icon: Sprout,
      colorClass: "bg-amber-500",
      textClass: "text-amber-600",
      bgClass: "bg-amber-50/50",
      glowClass: "group-hover:shadow-amber-500/10",
      borderClass: "border-amber-500/20 hover:border-amber-500",
      hoverBtnClass: "hover:bg-amber-500 hover:text-white",
      prodis: ["Agribisnis", "Agroteknologi"],
      link: "#"
    },
    {
      id: "tambang",
      name: "TAMBANG",
      fullName: "Rumpun Tambang",
      description: "Studi mekanika batuan, pengujian mineralogi galian, pemetaan geologi lapangan, dan survei seismik.",
      icon: Pickaxe,
      colorClass: "bg-orange-500",
      textClass: "text-orange-650",
      bgClass: "bg-orange-50/50",
      glowClass: "group-hover:shadow-orange-500/10",
      borderClass: "border-orange-500/20 hover:border-orange-500",
      hoverBtnClass: "hover:bg-orange-500 hover:text-white",
      prodis: ["Teknik Pertambangan", "Teknik Geologi"],
      link: "#"
    },
    {
      id: "pangan",
      name: "PANGAN",
      fullName: "Rumpun Pangan",
      description: "Evaluasi nilai gizi sensoris makanan, proses pengolahan bahan pangan, dan rekayasa pengemasan produk.",
      icon: Cookie,
      colorClass: "bg-rose-500",
      textClass: "text-rose-600",
      bgClass: "bg-rose-50/50",
      glowClass: "group-hover:shadow-rose-500/10",
      borderClass: "border-rose-500/20 hover:border-rose-500",
      hoverBtnClass: "hover:bg-rose-500 hover:text-white",
      prodis: ["Teknologi Pangan"],
      link: "#"
    },
    {
      id: "lingkungan",
      name: "LINGKUNGAN",
      fullName: "Rumpun Lingkungan",
      description: "Analisis pengolahan limbah domestik/industri, rekayasa ekosistem, hidrologi air, dan mitigasi bencana.",
      icon: Globe,
      colorClass: "bg-lime-600",
      textClass: "text-lime-600",
      bgClass: "bg-lime-50/50",
      glowClass: "group-hover:shadow-lime-500/10",
      borderClass: "border-lime-500/20 hover:border-lime-500",
      hoverBtnClass: "hover:bg-lime-600 hover:text-white",
      prodis: ["Teknik Lingkungan"],
      link: "#"
    },
  ];

  // Filtering Logic
  const filteredRumpuns = rumpunData.filter((rumpun) => {
    const query = (searchQuery || "").toLowerCase().trim();
    const matchesSearch = !query || (
      rumpun.name.toLowerCase().includes(query) ||
      rumpun.fullName.toLowerCase().includes(query) ||
      rumpun.description.toLowerCase().includes(query) ||
      rumpun.prodis.some(p => p.toLowerCase().includes(query))
    );

    if (!matchesSearch) return false;
    if (activeFilter === "semua") return true;
    if (activeFilter === "sains-komputer") {
      return rumpun.id === "tisimat" || rumpun.id === "fisika";
    }
    if (activeFilter === "kimia-biologi") {
      return rumpun.id === "kimia" || rumpun.id === "biologi";
    }
    if (activeFilter === "terapan-bumi") {
      return rumpun.id === "agribisnis" || rumpun.id === "tambang" || rumpun.id === "pangan" || rumpun.id === "lingkungan";
    }
    return true;
  });

  const handleSelectRumpun = (rumpunId) => {
    navigate(`/${rumpunId}`);
  };

  const openQuickPreview = (e, rumpun) => {
    e.stopPropagation();
    setPreviewRumpun(rumpun);
  };



  return (
    <section className="mt-8 px-8 flex flex-col items-center">
      
      {/* FILTER & VIEW SWITCHER NAVIGATION BAR */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-slate-150/50 shadow-xs">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: "semua", label: "Semua Rumpun" },
            { id: "sains-komputer", label: "Sains & Komputer" },
            { id: "kimia-biologi", label: "Kimia & Biologi" },
            { id: "terapan-bumi", label: "Terapan & Kebumian" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-extrabold transition-all duration-200 cursor-pointer active:scale-95 ${
                activeFilter === tab.id
                  ? "bg-[#0f3484] text-white shadow-md shadow-blue-900/15"
                  : "bg-slate-50/50 hover:bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5 border-l border-slate-100 pl-4 shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-slate-100 text-blue-800 border border-slate-200/55"
                : "text-slate-400 hover:text-slate-650 hover:bg-slate-50"
            }`}
            title="Tampilan Grid"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-slate-100 text-blue-800 border border-slate-200/55"
                : "text-slate-400 hover:text-slate-650 hover:bg-slate-50"
            }`}
            title="Tampilan List"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* RUMPUN CARDS/GRID SECTION */}
      <div className="w-full max-w-5xl mb-12">
        {filteredRumpuns.length > 0 ? (
          viewMode === "grid" ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {filteredRumpuns.map((rumpun) => {
                const Icon = rumpun.icon;
                const labCount = getLabCount(rumpun.id);
                const totalLabs = laboratories.length || 1;
                const distributionPercentage = Math.round((labCount / totalLabs) * 100);

                return (
                  <div
                    key={rumpun.id}
                    onClick={() => handleSelectRumpun(rumpun.id)}
                    className={`group bg-white/80 backdrop-blur-md border border-slate-100 hover:border-slate-200 rounded-[2rem] p-6 shadow-xs hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between min-h-[240px] w-full max-w-[280px] hover:-translate-y-1.5 cursor-pointer ${rumpun.glowClass}`}
                  >
                    <div className="relative z-10">
                      {/* Header Row */}
                      <div className="flex justify-between items-start w-full">
                        <div className={`w-10 h-10 rounded-xl ${rumpun.colorClass} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <Icon size={18} className="stroke-[2.5]" />
                        </div>
                        
                        <div className="bg-slate-50 border border-slate-100 text-[9px] font-extrabold text-slate-500 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>{labCount} Lab</span>
                        </div>
                      </div>

                      {/* Info Details */}
                      <div className="text-left mt-5">
                        <h4 className="font-extrabold text-slate-800 text-[15px] leading-tight mb-1 font-display group-hover:text-blue-905 transition-colors">
                          {rumpun.name}
                        </h4>
                        <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">
                          {rumpun.fullName}
                        </span>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mb-4 line-clamp-3">
                          {rumpun.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Prodis and Action Triggers */}
                    <div className="relative z-10 mt-auto pt-3 border-t border-slate-100/50">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {rumpun.prodis.slice(0, 2).map((p, i) => (
                            <span 
                              key={i} 
                              className="text-[8px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-wider"
                              title={p}
                            >
                              {p.slice(0, 3)}
                            </span>
                          ))}
                          {rumpun.prodis.length > 2 && (
                            <span className="text-[8px] font-bold bg-slate-100 text-slate-650 px-1.5 py-0.5 rounded-md">
                              +{rumpun.prodis.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Quick Preview Button */}
                          <button
                            onClick={(e) => openQuickPreview(e, rumpun)}
                            className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition duration-150 cursor-pointer shadow-2xs"
                            title="Pratinjau Cepat"
                          >
                            <Eye size={12} className="stroke-[2.5]" />
                          </button>
                          
                          {/* Direct Nav Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRumpun(rumpun.id);
                            }}
                            className={`w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center transition-all duration-200 ${rumpun.borderClass} ${rumpun.textClass} ${rumpun.hoverBtnClass} group-hover:translate-x-0.5 shadow-2xs`}
                          >
                            <ArrowRight size={12} className="stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW (Table style) */
            <div className="w-full overflow-hidden bg-white border border-slate-100 rounded-3xl shadow-xs animate-fade-in-up">
              <table className="list-view-table">
                <thead>
                  <tr className="bg-slate-50/70">
                    <th className="list-view-th">Kluster Rumpun</th>
                    <th className="list-view-th">Program Studi</th>
                    <th className="list-view-th text-center">Jumlah Lab</th>
                    <th className="list-view-th">Persentase Distribusi</th>
                    <th className="list-view-th text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRumpuns.map((rumpun) => {
                    const Icon = rumpun.icon;
                    const labCount = getLabCount(rumpun.id);
                    const totalLabs = laboratories.length || 1;
                    const distributionPercentage = Math.round((labCount / totalLabs) * 100);

                    return (
                      <tr key={rumpun.id} className="list-view-tr">
                        <td className="list-view-td">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${rumpun.colorClass} text-white flex items-center justify-center shrink-0`}>
                              <Icon size={14} />
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-800 text-xs font-display">{rumpun.name}</div>
                              <div className="text-[9px] font-semibold text-slate-400 mt-0.5">{rumpun.fullName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="list-view-td">
                          <div className="flex flex-wrap gap-1">
                            {rumpun.prodis.map((p, idx) => (
                              <span key={idx} className="text-[8.5px] font-bold bg-slate-50 border border-slate-100/80 text-slate-500 px-1.5 py-0.5 rounded-md uppercase">
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="list-view-td text-center">
                          <span className="inline-block px-2.5 py-0.5 bg-slate-50 border border-slate-100 text-slate-650 rounded-full font-extrabold text-[10px]">
                            {labCount} Lab
                          </span>
                        </td>
                        <td className="list-view-td">
                          <div className="flex items-center gap-3 max-w-[160px]">
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0">
                              <div className={`h-full rounded-full ${rumpun.colorClass}`} style={{ width: `${distributionPercentage}%` }}></div>
                            </div>
                            <span className="text-[10px] font-extrabold text-slate-500 shrink-0">{distributionPercentage}%</span>
                          </div>
                        </td>
                        <td className="list-view-td text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={(e) => openQuickPreview(e, rumpun)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition shadow-2xs"
                              title="Detail Pratinjau"
                            >
                              <Eye size={11} />
                              <span>Pratinjau</span>
                            </button>
                            <button
                              onClick={() => handleSelectRumpun(rumpun.id)}
                              className={`w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center transition shadow-2xs ${rumpun.borderClass} ${rumpun.textClass} ${rumpun.hoverBtnClass}`}
                            >
                              <ArrowRight size={11} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 w-full animate-fade-in-up">
            <p className="text-xs font-bold text-slate-400">Tidak ada rumpun keilmuan atau program studi yang cocok dengan kata kunci.</p>
          </div>
        )}
      </div>



      {/* QUICK PREVIEW DRAWER (SLIDE-OVER FROM RIGHT) */}
      <div 
        className={`fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          previewRumpun ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setPreviewRumpun(null)}
      >
        <aside 
          className={`fixed inset-y-0 right-0 w-full sm:w-[440px] bg-white flex flex-col justify-between transition-transform duration-300 ease-out z-50 shadow-2xl border-l border-slate-105 ${
            previewRumpun ? "translate-x-0" : "translate-x-full"
          }`} 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-700 animate-pulse"></span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                  Pratinjau Rumpun
                </span>
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg font-display tracking-tight mt-1 leading-none">
                {previewRumpun?.name}
              </h3>
              <p className="text-[10px] font-semibold text-slate-400 mt-1 max-w-[320px]">
                {previewRumpun?.fullName}
              </p>
            </div>
            
            <button 
              onClick={() => setPreviewRumpun(null)}
              className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer border-none"
            >
              <X size={15} />
            </button>
          </div>

          {/* Drawer Content (Laboratories List) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-left mb-2">
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Daftar Laboratorium Aktif
              </h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                Laboratorium yang bernaung di bawah rumpun {previewRumpun?.name} PLT UIN Jakarta:
              </p>
            </div>

            {previewRumpun && (
              laboratories.filter((l) => l.rumpun === previewRumpun.id).length > 0 ? (
                laboratories
                  .filter((l) => l.rumpun === previewRumpun.id)
                  .map((lab) => {
                    const capacity = lab.id % 2 === 0 ? "30 PC & Kursi" : "25 Meja Kerja";
                    const status = lab.id % 3 === 0 
                      ? { label: "Sedang Digunakan", badge: "bg-amber-50 text-amber-650 border-amber-100/50" }
                      : lab.id % 5 === 0 
                      ? { label: "Pemeliharaan", badge: "bg-rose-50 text-rose-600 border-rose-100/50" }
                      : { label: "Tersedia", badge: "bg-emerald-50 text-emerald-600 border-emerald-100/50" };

                    return (
                      <div key={lab.id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col justify-between gap-3 hover:bg-slate-50 transition duration-150 text-left">
                        <div>
                          <div className="flex justify-between items-start gap-3">
                            <h5 className="font-extrabold text-slate-800 text-xs font-display">
                              {lab.name}
                            </h5>
                            <span className={`px-2 py-0.5 border rounded-md text-[8px] font-bold ${status.badge}`}>
                              {status.label}
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
                            {lab.description || "Laboratorium pembelajaran, penelitian, dan praktikum mahasiwa fakultas sains & teknologi."}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mt-3 text-[9px] text-slate-400 font-bold border-t border-slate-100/50 pt-2.5">
                            <span className="bg-white border border-slate-150 px-1.5 py-0.5 rounded-md">
                              Kap: {capacity}
                            </span>
                            <span className="bg-white border border-slate-150 px-1.5 py-0.5 rounded-md uppercase">
                              Prodi: {lab.prodi?.slice(0, 14) || "Sains"}
                            </span>
                          </div>
                        </div>

                        {/* Order button directly inside preview drawer */}
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => {
                              setPreviewRumpun(null);
                              navigate(`/booking?rumpun=${previewRumpun.id}`);
                            }}
                            disabled={status.label === "Pemeliharaan"}
                            className="glow-btn px-3 py-1.5 bg-[#0f3484] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg text-[9px] font-extrabold flex items-center gap-1 shadow-2xs border-none"
                          >
                            <span>Pesan Ruangan</span>
                            <ChevronRight size={10} />
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="text-center py-8">
                  <Beaker size={24} className="mx-auto text-slate-350 mb-2 stroke-[1.5]" />
                  <p className="text-[10px] font-bold text-slate-400">Tidak ada laboratorium terdaftar untuk rumpun ini.</p>
                </div>
              )
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
            <button
              onClick={() => setPreviewRumpun(null)}
              className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                const id = previewRumpun.id;
                setPreviewRumpun(null);
                handleSelectRumpun(id);
              }}
              className="flex-1 py-2.5 bg-[#0f3484] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs cursor-pointer border-none"
            >
              <span>Eksplor Rumpun</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </aside>
      </div>

    </section>
  );
}
