import { Share2, DoorOpen, ThumbsUp, CalendarRange } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import heroImg from "../../assets/hero.png";
import logoUIN from "../../assets/logoUIN_new.png";
import Swal from "sweetalert2"; 

/**
 * HeroBanner — Displays the main hero section of the PLT dashboard.
 * Features a dynamic time-based greeting, dynamic statistics from AppContext, and share action.
 */
export default function HeroBanner() {
  const { laboratories } = useContext(AppContext);

  // Dynamic time-based greeting helper
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PLT UIN Jakarta',
        text: 'Akses berbagai ruang laboratorium untuk mendukung kegiatan praktikum, penelitian, dan pembelajaran Anda.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Tautan disalin ke papan klip!',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-3xl p-6',
          title: 'text-sm font-bold text-slate-800'
        }
      });
    }
  };

  return (
    <section className="hero-section">
      {/* Main Banner Card */}
      <div 
        className="hero-banner relative overflow-hidden group"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 32, 67, 0.95) 45%, rgba(15, 32, 67, 0.7) 70%, rgba(15, 32, 67, 0.3) 100%), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right'
        }}
      >
        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="hero-share-btn hover:scale-105 active:scale-95 transition-transform"
          title="Bagikan"
        >
          <Share2 size={18} />
        </button>

        {/* Text Contents */}
        <div className="hero-content relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200/90 mb-3.5 block bg-white/10 px-3.5 py-1.5 rounded-full w-fit backdrop-blur-md">
            👋 {getGreeting()}, Selamat Datang di Portal
          </span>
          
          <h2 className="hero-title">
            PLT UIN Jakarta
          </h2>
          <h3 className="hero-subtitle">
            Pusat Laboratorium Terpadu
          </h3>
          <p className="hero-description">
            Akses berbagai ruang laboratorium terpadu untuk mendukung kegiatan praktikum, penelitian riset sains, dan pembelajaran kolaboratif dengan fasilitas berstandar tinggi.
          </p>
        </div>

        {/* Floating background decorative shape */}
        <div className="absolute right-[-10%] bottom-[-20%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>
      </div>

      {/* Overlapping UIN Logo Badge */}
      <div className="hero-badge-logo hover:rotate-6 transition-transform duration-300">
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img src={logoUIN} alt="UIN Logo" className="w-12 h-12 object-contain" />
        </div>
      </div>

      {/* Overlapping Statistics Card */}
      <div className="hero-stats-card hover:shadow-xl transition-all duration-300">
        {/* Stat item 1 */}
        <div className="hero-stat-item">
          <div className="hero-stat-icon-wrapper bg-emerald-50 text-emerald-600">
            <DoorOpen size={20} />
          </div>
          <div className="text-left">
            <div className="hero-stat-value">{laboratories.length}</div>
            <div className="hero-stat-label">Total Laboratorium</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hero-stats-divider"></div>

        {/* Stat item 2 */}
        <div className="hero-stat-item">
          <div className="hero-stat-icon-wrapper bg-blue-50 text-blue-600">
            <CalendarRange size={19} />
          </div>
          <div className="text-left">
            <div className="hero-stat-value">8</div>
            <div className="hero-stat-label">Rumpun Keilmuan</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hero-stats-divider"></div>

        {/* Stat item 3 */}
        <div className="hero-stat-item">
          <div className="hero-stat-icon-wrapper bg-purple-50 text-purple-600">
            <ThumbsUp size={18} />
          </div>
          <div className="text-left">
            <div className="hero-stat-value">98%</div>
            <div className="hero-stat-label">Tingkat Kepuasan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
