import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Expos from './pages/Expos';
import ExpoDetails from './pages/ExpoDetails';
import Exhibitors from './pages/Exhibitors';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import ExhibitorLayout from './layouts/ExhibitorLayout';
import ExhibitorDashboard from './pages/ExhibitorDashboard';


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
  <Route path="profile" element={<div className="p-6 bg-white rounded-2xl border border-[#e6e5e0]">Company Profile & Products — Next Step</div>} />
  <Route path="booths" element={<div className="p-6 bg-white rounded-2xl border border-[#e6e5e0]">Booth Selection & Management — Next Step</div>} />
  <Route path="messages" element={<div className="p-6 bg-white rounded-2xl border border-[#e6e5e0]">Organizer Messages — Next Step</div>} />
</Route>


        {/* Admin Routes WITHOUT Navbar */}
        <Route path="/admin"element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
          <Route index element={<AdminDashboard />} />
          <Route path="expos" element={<div>Manage Expos Module</div>} />
          <Route path="exhibitors" element={<div>Exhibitor Approvals Module</div>} />
          <Route path="schedule" element={<div>Event Schedule Module</div>} />
        </Route>
        

        {/* 404 Fallback */}
        <Route path="*" element={<div className="pt-24 px-8 text-center text-2xl font-bold">404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;