import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthcareLanding from './pages/HealthcareLanding';
import About from './pages/About';
import Donate from './pages/Donation';
import Contact from './pages/Contact';
import HospitalRegistration from './pages/HospitalRegistration';
import PatientRegistration from './pages/PatientRegistration';
import UserProfile from './pages/UserProfile';
import Medicines from './pages/Avialablemedicine';
// import Login from './pages/Login';
import Signup from './pages/Signup'
import BookConsultation from './pages/BookConsultation';
import  Upload  from './pages/Upload';
import Reports from './pages/reports'
import ReportDetail from './pages/ReportDetail'


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<HealthcareLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hospital-registration" element={<HospitalRegistration />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
        <Route path="/bookconsultation" element={<BookConsultation />}/>
      </Routes>
  );
}
