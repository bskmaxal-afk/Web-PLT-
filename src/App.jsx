import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import DashboardLayout from "./layouts/DashboardLayout";
import HeroBanner from "./components/dashboard/HeroBanner";
import RumpunGrid from "./components/dashboard/RumpunGrid";

// Feature Pages
import LaboratoryInformation from "./pages/LaboratoryInformation";
import UsageGuide from "./pages/UsageGuide";
import HelpAndSupport from "./pages/HelpAndSupport";
import LandingPage from "./pages/LandingPage";
import FisikaDashboard from "./pages/Fisika/FisikaDashboard";
import KimiaDashboard from "./pages/Kimia/KimiaDashboard";
import BiologiDashboard from "./pages/Biologi/BiologiDashboard";
import AgribisnisDashboard from "./pages/Agribisnis/AgribisnisDashboard";
import TambangDashboard from "./pages/Tambang/TambangDashboard";
import PanganDashboard from "./pages/Pangan/PanganDashboard";
import LingkunganDashboard from "./pages/Lingkungan/LingkunganDashboard";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Redirect root path to /homepages */}
          <Route path="/" element={<Navigate to="/homepages" replace />} />
          
          {/* Landing Page on /homepages */}
          <Route path="/homepages" element={<LandingPage />} />

          {/* Fisika Custom Dashboard */}
          <Route
            path="/fisika"
            element={<FisikaDashboard />}
          />

          {/* Kimia Custom Dashboard */}
          <Route
            path="/kimia"
            element={<KimiaDashboard />}
          />

          {/* Biologi Custom Dashboard */}
          <Route
            path="/biologi"
            element={<BiologiDashboard />}
          />

          {/* Agribisnis Custom Dashboard */}
          <Route
            path="/agribisnis"
            element={<AgribisnisDashboard />}
          />

          {/* Tambang Custom Dashboard */}
          <Route
            path="/tambang"
            element={<TambangDashboard />}
          />

          {/* Pangan Custom Dashboard */}
          <Route
            path="/pangan"
            element={<PanganDashboard />}
          />

          {/* Lingkungan Custom Dashboard */}
          <Route
            path="/lingkungan"
            element={<LingkunganDashboard />}
          />

          {/* Dashboard Pages */}
          <Route
            path="/dashboard"
            element={<KimiaDashboard />}
          />
          <Route
            path="/booking"
            element={
              <DashboardLayout>
                <LaboratoryBookingForm />
              </DashboardLayout>
            }
          />
          <Route
            path="/laboratories"
            element={
              <DashboardLayout>
                <LaboratoryInformation />
              </DashboardLayout>
            }
          />
          <Route
            path="/guide"
            element={
              <DashboardLayout>
                <UsageGuide />
              </DashboardLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <DashboardLayout>
                <HelpAndSupport />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;