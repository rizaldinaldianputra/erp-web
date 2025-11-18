'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const COLORS = {
  primary: '#090979',
};

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to?: string;
  group?: boolean;
  children?: MenuItem[];
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const menu: MenuItem[] = [
    { label: 'Dashboard', icon: <FiHome />, to: '/' },
    {
      label: 'Master Data',
      group: true,
      icon: <FiUsers />,
      children: [
        { label: 'Users', icon: <FiUsers />, to: '/user' },
        { label: 'Settings', icon: <FiSettings />, to: '/settings' },
      ],
    },
  ];

  const isActivePath = (path?: string) => path && location.pathname === path;

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen z-30 flex flex-col bg-white shadow-md transition-all duration-300',
          collapsed ? 'w-16' : 'w-64',
        )}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="text-lg font-bold">Cosmic</h2>}
          <button onClick={onToggle} className="p-2 rounded hover:bg-gray-100 transition">
            <FiMenu size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-auto mt-2">
          <ul className="flex flex-col gap-1">
            {menu.map((item) => {
              const isGroup = item.group && item.children?.length;
              const anyChildActive = item.children?.some((ch) => isActivePath(ch.to)) ?? false;
              const isParentActive = isActivePath(item.to);
              const mainActive = isParentActive || anyChildActive;
              const isOpen = openGroups[item.label] ?? false;

              // ========================
              // COLLAPSED / SMALL MODE
              // ========================
              if (collapsed) {
                // Hanya tampilkan item yang punya 'to', abaikan group parent
                if (!item.to && !item.children) return null;
                if (item.children) {
                  // render semua child yang bisa di-routing
                  return item.children.map((child) => {
                    const childActive = isActivePath(child.to);
                    return (
                      <li key={child.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={child.to!}
                              className={cn(
                                'flex items-center justify-center w-full p-2 rounded-md transition',
                                childActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100',
                              )}
                              style={childActive ? { backgroundColor: COLORS.primary } : {}}
                            >
                              {child.icon}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>{child.label}</TooltipContent>
                        </Tooltip>
                      </li>
                    );
                  });
                }
                // normal item
                return (
                  <li key={item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.to!}
                          className={cn(
                            'flex items-center justify-center w-full p-2 rounded-md transition',
                            mainActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100',
                          )}
                          style={mainActive ? { backgroundColor: COLORS.primary } : {}}
                        >
                          {item.icon}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{item.label}</TooltipContent>
                    </Tooltip>
                  </li>
                );
              }

              // ========================
              // EXPANDED MODE
              // ========================
              if (isGroup) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleGroup(item.label)}
                      className={cn(
                        'flex items-center justify-between w-full px-2 py-2 rounded-md text-sm transition',
                        mainActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100',
                      )}
                      style={mainActive ? { backgroundColor: COLORS.primary } : {}}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {isOpen && (
                      <ul className="flex flex-col gap-1 ml-6 mt-1">
                        {item.children!.map((child) => {
                          const childActive = isActivePath(child.to);
                          return (
                            <li key={child.label}>
                              <Link
                                to={child.to!}
                                className={cn(
                                  'flex items-center gap-2 p-2 rounded-md text-sm transition',
                                  childActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100',
                                )}
                                style={childActive ? { backgroundColor: COLORS.primary } : {}}
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

              // NORMAL ITEM
              return (
                <li key={item.label}>
                  <Link
                    to={item.to!}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-md text-sm transition',
                      mainActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100',
                    )}
                    style={mainActive ? { backgroundColor: COLORS.primary } : {}}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* FOOTER */}
        {!collapsed && (
          <div className="flex items-center justify-between p-4 border-t">
            <img src="https://i.pravatar.cc/40" className="w-10 h-10 rounded-full" alt="Profile" />
            <div className="flex-1 flex flex-col ml-3">
              <span className="text-sm font-medium">Admin Name</span>
              <span className="text-xs text-gray-500">admin@example.com</span>
            </div>
            <button className="flex items-center gap-1 text-red-600 hover:bg-gray-100 p-2 rounded">
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
