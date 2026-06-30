import { Share2, DoorOpen, Users, ThumbsUp } from "lucide-react";
import heroImg from "../../assets/hero.png";
import logoUIN from "../../assets/logoUIN_new.png";
import Swal from "sweetalert2"; 

export default function HeroBanner() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FISIKA UIN Jakarta',
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
});
    }
  };

  return (
    <section className="hero-section">
      {/* Main Banner Card */}
      <div 
        className="hero-banner"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 32, 67, 0.95) 45%, rgba(15, 32, 67, 0.7) 70%, rgba(15, 32, 67, 0.3) 100%), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right'
        }}
      >
        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="hero-share-btn"
          title="Bagikan"
        >
          <Share2 size={18} />
        </button>

        {/* Text Contents */}
        <div className="hero-content">
          <h2 className="hero-title">
            PLT UIN Jakarta
          </h2>
          <h3 className="hero-subtitle">
            Pusat Laboratorium Terpadu
          </h3>
          <p className="hero-description">
            Akses berbagai ruang laboratorium untuk mendukung kegiatan praktikum, penelitian, dan pembelajaran Anda dengan fasilitas terbaik.
          </p>
        </div>
      </div>

      {/* Overlapping UIN Logo Badge */}
      <div className="hero-badge-logo">
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img src={logoUIN} alt="UIN Logo" className="w-12 h-12 object-contain" />
        </div>
      </div>

      {/* Overlapping Statistics Card */}
      <div className="hero-stats-card">
        {/* Stat item 1 */}
        <div className="hero-stat-item">
          <div className="hero-stat-icon-wrapper bg-emerald-50 text-emerald-600">
            <DoorOpen size={20} />
          </div>
          <div className="text-left">
            <div className="hero-stat-value">8</div>
            <div className="hero-stat-label">Total Ruang</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hero-stats-divider"></div>

        {/* Stat item 2 */}
        <div className="hero-stat-item">
          <div className="hero-stat-icon-wrapper bg-blue-50 text-blue-600">
            <Users size={20} />
          </div>
          <div className="text-left">
            <div className="hero-stat-value">120+</div>
            <div className="hero-stat-label">Pengguna Aktif</div>
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
