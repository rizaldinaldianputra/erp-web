'use client';

import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

interface AppBarProps {
  onToggle: () => void;
}

interface Crumb {
  label: string;
  href: string;
}

const AppBar: React.FC<AppBarProps> = ({ onToggle }) => {
  const location = useLocation();

  // Generate breadcrumb dari path
  const crumbs: Crumb[] = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, idx, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + arr.slice(0, idx + 1).join('/'),
    }));

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex flex-col z-20">
      <div className="flex items-center px-4 h-16 justify-between">
        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded hover:bg-gray-200" onClick={onToggle}>
          <FiMenu size={24} />
        </button>

        <h1 className="ml-4 text-xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Breadcrumb */}
      <nav className="px-4 py-1 text-sm text-gray-600">
        {crumbs.length > 0 ? (
          <ul className="flex items-center gap-1">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1">
                <span>/</span>
                {idx === crumbs.length - 1 ? (
                  <span className="font-semibold">{crumb.label}</span>
                ) : (
                  <Link to={crumb.href} className="hover:underline">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-500">Home</span>
        )}
      </nav>
    </header>
  );
};

export default AppBar;
