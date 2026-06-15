import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import DashboardLayout from "./layouts/DashboardLayout";
import HeroBanner from "./components/dashboard/HeroBanner";
import LaboratoryGrid from "./components/dashboard/LaboratoryGrid";
import BookingForm from "./layouts/BookingForm";
import MySchedule from "./layouts/MySchedule";
import ContactSupport from "./layouts/ContactSupport";
import History from "./layouts/History";
import LabInfo from "./layouts/LabInfo";
import UserGuide from "./layouts/UserGuide";

function App() {
  return (
    <AppProvider>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <HeroBanner />
                  <LaboratoryGrid />
                </>
              } 
            />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/schedule" element={<MySchedule />} />
            <Route path="/history" element={<History />} />
            <Route path="/laboratories" element={<LabInfo />} />
            <Route path="/guide" element={<UserGuide />} />
            <Route path="/contact" element={<ContactSupport />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
}

export default App;