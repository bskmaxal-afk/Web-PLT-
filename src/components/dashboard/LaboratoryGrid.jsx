import {
  ArrowRight,
  Code,
  Play,
  Server,
  Anvil,
  Beaker,
  Router,
  Clapperboard,
  Computer,
  ChartNoAxesColumn,
  ChartBar,
  Podcast,
  SquareLibrary,
  BookOpenText,
  Syringe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

/**
 * LaboratoryGrid — Displays all 15 lab cards on the dashboard.
 * When a card is clicked, saves the selected lab to context and
 * navigates to the booking form (TUGAS 2).
 */
export default function LaboratoryGrid() {
  const navigate = useNavigate();
  const { setSelectedLaboratory, laboratories } = useContext(AppContext);

  const handleSelectLaboratory = (lab) => {
    setSelectedLaboratory(lab);
    navigate("/booking");
  };

  const renderIcon = (type) => {
    switch (type) {
      case "sqrt":
        return (
          <span className="text-xl font-bold font-display leading-none select-none">
            √σ
          </span>
        );
      case "code":
        return <Code size={22} className="stroke-[2.5]" />;
      case "play":
        return (
          <Play
            size={20}
            fill="currentColor"
            className="stroke-[2] translate-x-[1px]"
          />
        );
      case "server":
        return <Server size={22} className="stroke-[2.5]" />;
      case "Anvil":
        return <Anvil size={22} className="stroke-[2.5]" />;
      case "Beaker":
        return <Beaker size={22} className="stroke-[2.5]" />;
      case "Router":
        return <Router size={22} className="stroke-[2.5]" />;
      case "Clapperboard":
        return <Clapperboard size={22} className="stroke-[2.5]" />;
      case "Computer":
        return <Computer size={22} className="stroke-[2.5]" />;
      case "ChartNoAxesColumn":
        return <ChartNoAxesColumn size={22} className="stroke-[2.5]" />;
      case "ChartBar":
        return <ChartBar size={22} className="stroke-[2.5]" />;
      case "Podcast":
        return <Podcast size={22} className="stroke-[2.5]" />;
      case "SquareLibrary":
        return <SquareLibrary size={22} className="stroke-[2.5]" />;
      case "BookOpenText":
        return <BookOpenText size={22} className="stroke-[2.5]" />;
      case "Syringe":
        return <Syringe size={22} className="stroke-[2.5]" />;
      default:
        return null;
    }
  };

  const renderCard = (lab) => (
    <div
      key={lab.id}
      onClick={() => handleSelectLaboratory(lab)}
      className="lab-card group"
    >
      {/* Icon */}
      <div className={`lab-icon-container ${lab.colorClass}`}>
        {renderIcon(lab.icon)}
      </div>

      {/* Info */}
      <div className="lab-info">
        <h4 className="lab-name">{lab.name}</h4>
        <p className="lab-description">{lab.description}</p>
      </div>

      {/* Action Button */}
      <div className="lab-card-action">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSelectLaboratory(lab);
          }}
          className={`lab-action-btn ${lab.borderClass} ${lab.textClass} ${lab.hoverBtnClass}`}
        >
          <ArrowRight size={14} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="labs-section">
      {/* Header Info */}
      <div className="labs-header">
        <span className="labs-section-tag">
          — Pilih Ruang Laboratorium —
        </span>
        <h3 className="labs-section-title">
          Silahkan Pilih Ruang Laboratorium
        </h3>
        <p className="labs-section-subtitle">
          Pilih ruang laboratorium yang akan digunakan sesuai kebutuhan Anda
        </p>
      </div>

      {/* Lab Cards Grid */}
      <div className="labs-grid">
        {laboratories.map((lab) => renderCard(lab))}
      </div>
    </section>
  );
}
