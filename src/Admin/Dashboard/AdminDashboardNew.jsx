import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Settings, 
  X, 
  Menu,
  Search,
  User,
  Eye,
  Edit,
  Plus,
  LogOut,
  DollarSign,
  MessageSquare,
  Bell,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Import your existing assets
import Shivlogo from "/assets/navbar/ShivAi.svg";
import bg from '/assets/Hero/bg.svg';
// Import Analytics component
import AnalyticsDark from './components/AnalyticsDark';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', section: 'dashboard' },
    { id: 'leads', icon: Users, label: 'All Users', section: 'leads', badge: 5 },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', section: 'analytics' },
    { id: 'settings', icon: Settings, label: 'Settings', section: 'settings' }
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const stats = [
    { label: 'Total Leads', value: '124', change: '+12%', color: 'from-blue-400 to-cyan-400' },
    { label: 'Active Proposals', value: '8', change: '+3', color: 'from-purple-400 to-pink-400' },
    { label: 'Revenue', value: '$45K', change: '+18%', color: 'from-green-400 to-emerald-400' },
    { label: 'Conversion', value: '12.5%', change: '+2.3%', color: 'from-orange-400 to-red-400' }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-[#161616]/90 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="relative group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl"></div>
        <div className="relative bg-[#161616]/90 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New lead submitted', user: 'john@example.com', time: '2 minutes ago' },
              { action: 'Proposal approved', user: 'Sarah Johnson', time: '1 hour ago' },
              { action: 'Meeting scheduled', user: 'Mike Chen', time: '3 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl"></div>
        <div className="relative bg-[#161616]/90 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">All Leads</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-medium hover:from-blue-700 hover:to-cyan-700 transition-all">
              <Plus className="w-4 h-4" />
              New Lead
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'John Smith', email: 'john@techcorp.com', company: 'TechCorp Inc.', status: 'new' },
              { name: 'Sarah Johnson', email: 'sarah@abc.com', company: 'ABC Solutions', status: 'qualified' },
              { name: 'Mike Chen', email: 'mike@startup.com', company: 'Startup Co.', status: 'contacted' }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{lead.name}</p>
                    <p className="text-gray-400 text-sm">{lead.email} • {lead.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lead.status === 'new' ? 'bg-green-500/20 text-green-400' :
                    lead.status === 'qualified' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {lead.status}
                  </span>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'leads':
        return renderLeads();
      case 'proposals':
        return <div className="text-white">Proposals coming soon...</div>;
      case 'messages':
        return <div className="text-white">Messages coming soon...</div>;
      case 'analytics':
        return <AnalyticsDark />;
      case 'settings':
        return <div className="text-white">Settings coming soon...</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={bg} alt="Background" className="object-cover w-full h-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#004998] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Mobile Menu Button */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-6 left-6 z-40 p-3 bg-[#161616]/90 backdrop-blur-lg rounded-xl border border-white/10 lg:hidden transition-all duration-300 hover:border-white/20"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-[#161616]/95 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src={Shivlogo} alt="ShivAi Logo" className="h-8 w-auto" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Admin Panel
                  </h1>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 lg:hidden transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-400/20 blur-sm"></div>
              <div className="relative bg-black/50 rounded-xl border border-white/10">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search... (Ctrl+K)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.section;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-cyan-400/20 text-white border border-blue-500/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-400/10 blur-sm"></div>
                  )}
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110 relative z-10" />
                  <span className="font-medium text-sm flex-1 text-left relative z-10">{item.label}</span>
                  {item.badge && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center relative z-10">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@shivai.com</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ease-in-out lg:ml-80`}>
        <div className="min-h-screen relative z-10">
          {/* Top Bar */}
          <div className="bg-[#161616]/80 backdrop-blur-lg border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent capitalize">
                  {activeSection}
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;