import './App.css'
import About from './components/About'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Explore from './components/Explore'
import Publications from './components/Publications'
import Footer from './components/Footer'
import VolunteerCorner from './components/VolunteerCorner'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import AdminDashboard from '../Admin/AdminDashboard'
import PressReleases from './components/PressReleases.JSX'
import PressReleaseDetails from './components/PressReleaseDetails'
import Programmes from './components/Programmes'
import ProgrammeDetail from './components/ProgrammeDetail'
import PublicationDetail from './components/PublicationDetail'
import AdminLogin from '../Admin/AdminLogin'
import  DonationModal  from './components/DonationModal'
// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/admin" replace />;
};

function App() {

  // Clear admin flag unless on dashboard
  useEffect(() => {
    if (!window.location.pathname.startsWith("/admin/dashboard")) {
      localStorage.removeItem("isAdmin");
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "K") {
        navigate("/admin"); // navigate to admin login
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [navigate]);

  return (
    <div className='font-primary overflow-x-hidden'>
      <Routes>
        {/* Home route renders all your sections */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <Hero />
              <Publications />
              <PressReleases />
              <Programmes />
              {/* <About /> */}
              {/* <Explore /> */}
              {/* <VolunteerCorner /> */}
              <Footer />
            </>
          } 
        />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Other routes */}
         <Route path="/donate" element={<DonationModal />} />
        <Route path="/press-release/:id" element={<PressReleaseDetails />} />
        <Route path="/programmes/:id" element={<ProgrammeDetail />} />
        <Route path="/publications/:id" element={<PublicationDetail />} />

      </Routes>
    </div>
  )
}

export default App
