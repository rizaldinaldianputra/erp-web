import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import User from './pages/User';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Router>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main Content */}
      <div className={`p-5 transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        <FiMenu size={22} />
      </button>
    </Router>
  );
};

export default App;
