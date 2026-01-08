import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Building2,
  User
} from 'lucide-react';

// Import existing components
import { 
  OnboardingDataTab, 
  ClientDetailsTab, 
  AIEmployeesTab, 
  TransactionsTab,
  AgentDetailsView 
} from './ClientManagement';

// Simplified ClientDetailsPage component
const ClientDetailsPage = ({ selectedClient, onBack, currentTheme, clients, setClients, fetchClients, fetchCountsOptimized }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-4">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold ${currentTheme.text}`}>
          {selectedClient?.fullName || selectedClient?.company_basics?.name || 'Client Details'}
        </h2>
        <button
          onClick={onBack}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      {/* Simple Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'onboarding', label: 'Onboarding' },
          { key: 'employees', label: 'AI Employees' },
          { key: 'transactions', label: 'Transactions' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <ClientDetailsTab 
            client={{ userData: selectedClient }} 
            currentTheme={currentTheme} 
          />
        )}
        {activeTab === 'onboarding' && (
          <OnboardingDataTab 
            client={{ userData: selectedClient }} 
            currentTheme={currentTheme} 
          />
        )}
        {activeTab === 'employees' && (
          <AIEmployeesTab 
            client={{ userData: selectedClient }} 
            currentTheme={currentTheme}
            onViewAgent={(agent) => {}}
          />
        )}
        {activeTab === 'transactions' && (
          <TransactionsTab 
            client={{ userData: selectedClient }} 
            currentTheme={currentTheme} 
          />
        )}
      </div>
    </div>
  );
};

// Plan options for display
const planOptions = [
  { id: "starter", name: "Starter", apiKey: "Starter Plan", price: "$49/mo" },
  { id: "professional", name: "Professional", apiKey: "Professional Plan", price: "$149/mo" },
  { id: "business", name: "Business", apiKey: "Business Plan", price: "$299/mo" },
  { id: "custom", name: "Custom", apiKey: "Custom Plan", price: "Custom" }
];

const ClientManagementClean = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [clients, setClients] = useState([]);
  const [counts, setCounts] = useState({
    all: 0,
    newlySignup: 0,
    pending: 0,
    onboarded: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationMeta, setPaginationMeta] = useState(null);

  // Mock data for development
  useEffect(() => {
    const mockClients = [
      {
        id: 1,
        userData: {
          id: '1',
          fullName: 'TechCorp Solutions',
          email: 'contact@techcorp.com',
          isOnboarded: true,
          onboarding: {
            plan_type: 'Professional Plan',
            company_name: 'TechCorp Solutions',
            company_email: 'contact@techcorp.com',
            ai_employee_count: 3
          }
        }
      },
      {
        id: 2,
        userData: {
          id: '2',
          fullName: 'Marketing Masters',
          email: 'hello@marketing.com',
          isOnboarded: false,
          onboarding: {
            plan_type: 'Starter Plan',
            company_name: 'Marketing Masters',
            company_email: 'hello@marketing.com',
            ai_employee_count: 1
          }
        }
      }
    ];

    setClients(mockClients);
    setCounts({
      all: 2,
      newlySignup: 1,
      pending: 0,
      onboarded: 1,
      approved: 1,
      rejected: 0
    });
    setLoading(false);
    setTotalPages(1);
  }, []);

  // Handlers
  const handleViewClient = (client) => {
    setSelectedClient(client);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
  };

  const handleDeleteClient = (client) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(c => c.userData.id !== client.id));
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Filter clients based on search and active tab
  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery || 
      client.userData?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.userData?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'approved': return matchesSearch && client.userData?.isOnboarded;
      case 'pending': return matchesSearch && !client.userData?.isOnboarded;
      case 'onboarded': return matchesSearch && client.userData?.isOnboarded;
      case 'newlySignup': return matchesSearch && !client.userData?.isOnboarded;
      default: return matchesSearch;
    }
  });

  // Mock functions for compatibility
  const fetchClients = () => {};
  const fetchCountsOptimized = () => {};

  // Main render function
  const renderContent = () => {
    if (selectedAgent) {
      return (
        <AgentDetailsView
          agent={selectedAgent}
          onBack={() => setSelectedAgent(null)}
          currentTheme={currentTheme}
        />
      );
    }

    if (selectedClient) {
      return (
        <ClientDetailsPage
          selectedClient={selectedClient}
          onBack={() => setSelectedClient(null)}
          currentTheme={currentTheme}
          clients={clients}
          setClients={setClients}
          fetchClients={fetchClients}
          fetchCountsOptimized={fetchCountsOptimized}
        />
      );
    }

    // Main client list view
    return (
      <div className="space-y-4">
        {/* Clean Client List */}
        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className={`ml-3 ${currentTheme.textSecondary}`}>Loading clients...</span>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <User className={`w-12 h-12 mx-auto mb-3 ${currentTheme.textSecondary}`} />
              <h3 className={`text-lg font-medium ${currentTheme.text} mb-2`}>
                {searchQuery ? "No matching clients" : "No clients found"}
              </h3>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                {searchQuery ? "Try adjusting your search criteria" : "No client requests available"}
              </p>
            </div>
          ) : (
            filteredClients.map((client) => (
              <div
                key={client.id}
                className={`p-4 border ${currentTheme.border} rounded-lg hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${currentTheme.searchBg} rounded-lg`}>
                      <Building2 className={`w-5 h-5 ${currentTheme.text}`} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${currentTheme.text}`}>
                        {client?.userData?.fullName || "Unknown"}
                      </h4>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>
                        {client?.userData?.email || "No email"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewClient(client.userData)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Client"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    {client.userData?.isOnboarded && (
                      <button
                        onClick={() => navigate(`/dashboard/clients/${client.id}?tab=employees`, { state: { client } })}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Analytics"
                      >
                        <BarChart3 className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEditClient(client.userData)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit Client"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.userData)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase mb-1`}>Plan</p>
                    <p className={`text-sm font-medium ${currentTheme.text}`}>
                      {(() => {
                        const planType = client?.userData?.onboarding?.plan_type;
                        const plan = planOptions.find((p) => p.apiKey === planType);
                        return plan ? `${plan.name} (${plan.price})` : planType || "No plan";
                      })()}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase mb-1`}>Company</p>
                    <p className={`text-sm font-medium ${currentTheme.text}`}>
                      {client?.userData?.onboarding?.company_name || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase mb-1`}>Email</p>
                    <p className={`text-sm font-medium ${currentTheme.text}`}>
                      {client?.userData?.onboarding?.company_email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase mb-1`}>AI Employees</p>
                    <p className={`text-sm font-medium ${currentTheme.text}`}>
                      {client?.userData?.onboarding?.ai_employee_count || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Simple Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between py-4">
            <p className={`text-sm ${currentTheme.textSecondary}`}>
              Showing results
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className={`text-sm ${currentTheme.text}`}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Simple Header */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-semibold ${currentTheme.text}`}>
            Client Management
          </h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Clean Search Bar */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border ${currentTheme.border} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Clean Status Tabs */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All Clients", count: counts.all },
            { key: "approved", label: "Approved", count: counts.approved },
            { key: "pending", label: "Pending", count: counts.pending },
            { key: "onboarded", label: "Onboarded", count: counts.onboarded },
            { key: "newlySignup", label: "New Signups", count: counts.newlySignup },
            { key: "rejected", label: "Rejected", count: counts.rejected }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : `${currentTheme.textSecondary} hover:${currentTheme.text} hover:bg-gray-50`
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.key ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-6`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ClientManagementClean;