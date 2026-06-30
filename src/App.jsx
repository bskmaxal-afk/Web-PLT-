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

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Redirect root path to /homepages */}
          <Route path="/" element={<Navigate to="/homepages" replace />} />
          
          {/* Landing Page on /homepages */}
          <Route path="/homepages" element={<LandingPage />} />

          {/* Dashboard Pages (Wrapped in DashboardLayout) */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <HeroBanner />
                <RumpunGrid />
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