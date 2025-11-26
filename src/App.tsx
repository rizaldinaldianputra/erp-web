import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/auth/login';
import Dashboard from './pages/Dashboard';
import User from './pages/department/Department';

const AppContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  // Cek apakah halaman login
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {/* Tampilkan sidebar hanya jika bukan halaman login */}
      {!isLoginPage && <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          !isLoginPage ? (collapsed ? 'md:ml-16' : 'md:ml-64') : ''
        }`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>

      {/* Mobile toggle button (hanya tampil jika bukan login) */}
      {!isLoginPage && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        >
          <FiMenu size={22} />
        </button>
      )}
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
