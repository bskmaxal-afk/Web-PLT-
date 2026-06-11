import { ArrowRight, Code, Play, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LaboratoryGrid() {
  const navigate = useNavigate();

  const labsData = [
    {
      id: 1,
      name: "Lab Matematika",
      description: "Laboratorium untuk praktikum dan penelitian matematika",
      icon: "sqrt",
      colorClass: "bg-emerald-500",
      textClass: "text-emerald-600",
      borderClass: "border-emerald-500/20 hover:border-emerald-500",
      hoverBtnClass: "hover:bg-emerald-500 hover:text-white",
      path: "/booking"
    },
    {
      id: 2,
      name: "Lab Aplikasi 1",
      description: "Laboratorium untuk praktikum pemrograman dan aplikasi",
      icon: "code",
      colorClass: "bg-blue-500",
      textClass: "text-blue-600",
      borderClass: "border-blue-500/20 hover:border-blue-500",
      hoverBtnClass: "hover:bg-blue-500 hover:text-white",
      path: "/booking"
    },
    {
      id: 3,
      name: "Lab Aplikasi 2",
      description: "Laboratorium untuk praktikum pemrograman lanjutan",
      icon: "code",
      colorClass: "bg-purple-500",
      textClass: "text-purple-600",
      borderClass: "border-purple-500/20 hover:border-purple-500",
      hoverBtnClass: "hover:bg-purple-500 hover:text-white",
      path: "/booking"
    },
    {
      id: 4,
      name: "Lab Multimedia 1",
      description: "Laboratorium untuk praktikum multimedia dan desain",
      icon: "play",
      colorClass: "bg-orange-500",
      textClass: "text-orange-600",
      borderClass: "border-orange-500/20 hover:border-orange-500",
      hoverBtnClass: "hover:bg-orange-500 hover:text-white",
      path: "/booking"
    },
    {
      id: 5,
      name: "Lab Komputasi",
      description: "Laboratorium untuk komputasi dan pengolahan data",
      icon: "server",
      colorClass: "bg-teal-500",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
      path: "/booking"
    }
  ];

  const renderIcon = (type) => {
    switch (type) {
      case "sqrt":
        return <span className="text-xl font-bold font-display leading-none select-none">√σ</span>;
      case "code":
        return <Code size={22} className="stroke-[2.5]" />;
      case "play":
        return <Play size={20} fill="currentColor" className="stroke-[2] translate-x-[1px]" />;
      case "server":
        return <Server size={22} className="stroke-[2.5]" />;
      default:
        return null;
    }
  };

  const renderCard = (lab) => (
    <div
      key={lab.id}
      onClick={() => navigate(lab.path)}
      className="bg-white border border-slate-100 rounded-[2rem] p-7 shadow-xs hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 relative flex flex-col justify-between min-h-[190px] w-full md:max-w-[310px] hover:-translate-y-1.5 cursor-pointer group"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-[1.1rem] ${lab.colorClass} text-white flex items-center justify-center shadow-md shadow-slate-100`}>
        {renderIcon(lab.icon)}
      </div>

      {/* Info */}
      <div className="text-left mt-6 flex-1">
        <h4 className="font-extrabold text-slate-800 text-[16px] leading-tight mb-2 font-display">
          {lab.name}
        </h4>
        <p className="text-[11px] text-slate-400 font-semibold leading-relaxed max-w-[220px]">
          {lab.description}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(lab.path);
          }}
          className={`w-8 h-8 rounded-full border ${lab.borderClass} ${lab.textClass} ${lab.hoverBtnClass} flex items-center justify-center transition-all duration-200 cursor-pointer`}
        >
          <ArrowRight size={14} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="mt-12 px-8 flex flex-col items-center">
      {/* Header Info */}
      <div className="text-center mb-8">
        <span className="text-[10px] tracking-widest text-slate-400 font-extrabold uppercase leading-none">
          — Pilih Ruang Laboratorium —
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-display mt-2 mb-2">
          Silahkan Pilih Ruang Laboratorium
        </h3>
        <p className="text-xs text-slate-500 font-semibold">
          Pilih ruang laboratorium yang akan digunakan sesuai kebutuhan Anda
        </p>
      </div>

      {/* Row 1: Labs 1, 2, 3 */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mb-6">
        {labsData.slice(0, 3).map((lab) => renderCard(lab))}
      </div>

      {/* Row 2: Labs 4, 5 */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
        {labsData.slice(3, 5).map((lab) => renderCard(lab))}
      </div>
    </section>
  );
}
