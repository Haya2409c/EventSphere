import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Placeholder for missing routes */}
          <Route path="/expos" element={<div className="pt-24 px-8">Expos Page Coming Soon</div>} />
          <Route path="/exhibitors" element={<div className="pt-24 px-8">Exhibitors Page Coming Soon</div>} />
        </Route>

        {/* Admin Routes WITHOUT Navbar */}
        <Route path="/admin" element={<AdminLayout />}>
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