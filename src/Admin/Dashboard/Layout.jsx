import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the comprehensive AdminSidebar component */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Mobile Menu Button - positioned absolutely to appear on top */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg border border-gray-200 lg:hidden transition-all duration-300 ${
          sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Optional: If you still want to use React Router for specific sections */}
      <div className="lg:ml-80">
        <div className="hidden">
          {/* This is hidden by default since AdminSidebar handles content rendering */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
