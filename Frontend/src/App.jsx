import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import ManageExpos from './pages/ManageExpos';
import ExhibitorApprovals from './pages/ExhibitorApprovals';
import ScheduleManagement from './pages/ScheduleManagement';
import Home from './pages/Home';
import Expos from './pages/Expos';
import ExpoDetails from './pages/ExpoDetails';
import Exhibitors from './pages/Exhibitors';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import ExhibitorLayout from './layouts/ExhibitorLayout';
import ExhibitorDashboard from './pages/ExhibitorDashboard';
import CompanyProfile from './pages/CompanyProfile';
import BoothManagement from './pages/BoothManagement';
import OrganizerMessages from './pages/OrganizerMessages';
import AttendeeLayout from './layouts/AttendeeLayout';
import AttendeePasses from './pages/AttendeePasses';
import AttendeeSchedule from './pages/AttendeeSchedule';


// Public Layout component jo sirf un pages par Navbar dikhayega
const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-background text-textMain font-sans">
      <Routes>
        {/* Public Routes with Navbar */}
        <Route element={<PublicLayout />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/expos" element={<Expos />} />
          <Route path="/exhibitors" element={<Exhibitors />} />
          <Route path="/expos/:id" element={<ExpoDetails />} />

        </Route>

        <Route
  path="/exhibitor"
  element={
    <ProtectedRoute allowedRoles={['exhibitor']}>
      <ExhibitorLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<ExhibitorDashboard />} />
  <Route path="profile" element={<CompanyProfile />} />
  <Route path="booths" element={<BoothManagement />} />
  <Route path="messages" element={<OrganizerMessages />} />
  </Route>

        {/* Attendee Routes (protected, attendee role) */}
        <Route
          path="/attendee"
          element={
            <ProtectedRoute allowedRoles={['attendee']}>
              <AttendeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AttendeePasses />} />
          <Route path="schedule" element={<AttendeeSchedule />} />
        </Route>


        {/* Admin Routes WITHOUT Navbar */}
        <Route path="/admin"element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
          <Route index element={<AdminDashboard />} />
          <Route path="expos" element={<ManageExpos />} />
          <Route path="exhibitors" element={<ExhibitorApprovals />} />
          <Route path="schedule" element={<ScheduleManagement />} />
        </Route>
        

        {/* 404 Fallback */}
        <Route path="*" element={<div className="pt-24 px-8 text-center text-2xl font-bold">404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;