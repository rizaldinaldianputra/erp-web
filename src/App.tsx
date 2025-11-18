import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Drawer from './components/layout/Drawer';
import Dashboard from './pages/Dashboard';
import User from './pages/User';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleDrawer = () => setCollapsed(!collapsed);
  const closeDrawer = () => setCollapsed(true);

  return (
    <Router>
      {/* === TOGGLE BUTTON (mobile) === */}
      <button
        onClick={toggleDrawer}
        className="md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded shadow"
      >
        <FiMenu size={22} />
      </button>

      <div className="flex">
        <Drawer collapsed={collapsed} onClose={closeDrawer} />

        <div className="flex-1 min-h-screen bg-gray-50">
          <main className="pt-6 p-4 md:ml-64">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
