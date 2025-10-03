import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar mobile */}
        <div className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              aria-label="Abrir menu"
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-700 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <span className="font-semibold text-gray-800">Dashboard</span>
            <div className="w-6" />
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
