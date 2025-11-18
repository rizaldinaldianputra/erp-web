import React, { useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiDatabase,
  FiHome,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { COLORS } from '../../constant/colors';

interface DrawerProps {
  collapsed: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  to?: string;
  group?: boolean;
  children?: MenuItem[];
}

const Drawer: React.FC<DrawerProps> = ({ collapsed, onClose }) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const menu: MenuItem[] = [
    { label: 'Dashboard', icon: <FiHome />, to: '/' },
    {
      label: 'Master Data',
      group: true,
      icon: <FiDatabase />,
      children: [
        { label: 'Users', icon: <FiUsers />, to: '/user' },
        { label: 'Settings', icon: <FiSettings />, to: '/settings' },
      ],
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 p-4 z-30 shadow-md bg-white
        transition-transform duration-300
        md:translate-x-0 md:block
        ${collapsed ? '-translate-x-full' : 'translate-x-0'}
      `}
    >
      {/* Title */}
      <h2
        className="text-2xl font-bold mb-6"
        style={{ background: COLORS.primary, WebkitBackgroundClip: 'text', color: 'transparent' }}
      >
        Admin Panel
      </h2>

      {/* Menu */}
      <ul className="flex flex-col gap-1">
        {menu.map((item) => {
          if (item.group && item.children) {
            const isOpen = openGroups[item.label] ?? true;
            return (
              <li key={item.label}>
                {/* Group Header */}
                <button
                  className="flex items-center justify-between w-full px-2 py-2 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-all rounded-md"
                  onClick={() => toggleGroup(item.label)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                {/* Group Children */}
                {isOpen && (
                  <ul className="flex flex-col gap-1 ml-5 mt-1">
                    {item.children.map((child) => {
                      const active = location.pathname === child.to;
                      return (
                        <li key={child.label}>
                          <Link
                            to={child.to!}
                            onClick={onClose}
                            className={`flex items-center gap-2 p-2 text-sm rounded-md transition-all ${
                              active ? 'text-white font-semibold' : 'text-gray-700'
                            }`}
                            style={{
                              background: active ? COLORS.primary : 'transparent',
                            }}
                          >
                            {child.icon}
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          }

          // Menu biasa
          const active = location.pathname === item.to;
          return (
            <li key={item.label}>
              <Link
                to={item.to!}
                onClick={onClose}
                className={`flex items-center gap-2 p-2 rounded-md text-sm transition-all ${
                  active ? 'text-white font-semibold' : 'text-gray-700'
                }`}
                style={{
                  background: active ? COLORS.primary : 'transparent',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Drawer;
