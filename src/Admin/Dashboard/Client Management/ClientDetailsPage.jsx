import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import toast from "react-hot-toast";
import {
  RiArrowLeftLine,
  RiFileTextLine,
  RiUserLine,
  RiRobotLine,
  RiExchangeDollarLine,
  RiPhoneLine,
  RiCheckLine,
  RiCloseLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiErrorWarningLine,
  RiTimeLine,
  RiGlobalLine,
  RiMailLine,
  RiBuildingLine,
  RiBankCardLine,
  RiUserVoiceLine,
} from "react-icons/ri";

// Import tab components from ClientManagement
import {
  OnboardingDataTab,
  ClientDetailsTab,
  AIEmployeesTab,
  TransactionsTab,
  AgentDetailsView,
} from "./ClientManagement";

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, currentTheme } = useTheme();
  
  const [client, setClient] = useState(location.state?.client || null);
  const [loading, setLoading] = useState(!location.state?.client);
  const [activeTab, setActiveTab] = useState("onboarding");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [viewMode, setViewMode] = useState("details"); // "details" or "agentView"

  useEffect(() => {
    const fetchClientDetails = async () => {
      // If client data is already in state, no need to fetch
      if (location.state?.client) {
        console.log("✅ Client data received from navigation state:", location.state.client);
        setClient(location.state.client);
        setLoading(false);
        return;
      }

      // Fetch from API only if not in state
      try {
        setLoading(true);
        console.log("🔄 Fetching client details from API for ID:", clientId);
        
        const response = await shivaiApiService.getClientById(clientId);
        console.log("✅ Client data fetched from API:", response);
        
        if (response?.success && response?.data) {
          setClient(response.data);
        } else {
          toast.error("Client not found");
          navigate("/dashboard/clients");
        }
      } catch (error) {
        console.error("❌ Error fetching client:", error);
        toast.error("Failed to load client details");
        navigate("/dashboard/clients");
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClientDetails();
    }
  }, [clientId, navigate, location.state]);

  // Update browser tab title
  useEffect(() => {
    if (client) {
      const clientName = client?.userData?.fullName || client?.company_basics?.name || "Client";
      const tabLabel = tabs.find(tab => tab.id === activeTab)?.label || "Details";
      document.title = `${clientName} - ${tabLabel} | ShivAI Admin`;
    } else {
      document.title = "Client Details | ShivAI Admin";
    }

    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = "ShivAI Admin";
    };
  }, [client, activeTab]);

  const handleBack = () => {
    navigate("/dashboard/clients");
  };

  const handleEdit = (client) => {
    toast("Edit functionality coming soon", {
      icon: "ℹ️",
      duration: 3000,
    });
  };

  const handleDelete = async (client) => {
    if (window.confirm(`Are you sure you want to delete ${client?.userData?.fullName || "this client"}?`)) {
      try {
        await shivaiApiService.deleteClient(client?._id);
        toast.success("Client deleted successfully");
        navigate("/dashboard/clients");
      } catch (error) {
        console.error("Error deleting client:", error);
        toast.error("Failed to delete client");
      }
    }
  };

  const handleApprove = async (client) => {
    try {
      await shivaiApiService.approveClient(client?._id);
      toast.success("Client approved successfully");
      // Refresh client data
      const response = await shivaiApiService.getClientById(clientId);
      if (response?.success && response?.data) {
        setClient(response.data);
      }
    } catch (error) {
      console.error("Error approving client:", error);
      toast.error("Failed to approve client");
    }
  };

  const handleReject = async (client) => {
    try {
      await shivaiApiService.rejectClient(client?._id);
      toast.success("Client rejected successfully");
      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Error rejecting client:", error);
      toast.error("Failed to reject client");
    }
  };

  const handleViewAgent = (agent) => {
    console.log("View agent:", agent);
    setSelectedAgent(agent);
    setViewMode("agentView");
  };

  const handleBackFromAgent = () => {
    setSelectedAgent(null);
    setViewMode("details");
  };

  const tabs = [
    { id: "onboarding", label: "Onboarding Data", icon: RiFileTextLine },
    { id: "details", label: "Client Details", icon: RiUserLine },
    { id: "employees", label: "AI Employees", icon: RiRobotLine },
    { id: "transactions", label: "Transactions", icon: RiExchangeDollarLine },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RiErrorWarningLine className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Client Not Found</h2>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  // Show Agent Details View when agent is selected
  if (viewMode === "agentView" && selectedAgent) {
    return (
      <AgentDetailsView
        agent={selectedAgent}
        onBack={handleBackFromAgent}
        currentTheme={currentTheme}
      />
    );
  }

  const clientStats = {
    totalAIEmployees: client?.ai_employees?.length || 0,
    liveAIEmployees: client?.ai_employees?.filter((emp) => emp.status === "active")?.length || 0,
    totalCalls: 1247,
    usedTokens: 125000,
    totalRevenue: 2450.0,
    planUsage: 75,
    isActive: client?.isApproved || false,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header with Back Button */}
      <div className="flex flex-col gap-3 sm:gap-0">
        <div className="flex items-start justify-between gap-3 sm:gap-4 min-w-0">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
            <button
              onClick={handleBack}
              className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 flex-shrink-0 mt-1`}
            >
              <RiArrowLeftLine className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className={`text-xl sm:text-2xl font-bold ${currentTheme.text} truncate`}>
                {client?.userData?.fullName || client?.company_basics?.name || "Client Details"}
              </h1>
              <p className={`text-sm ${currentTheme.textSecondary} truncate mt-1`}>
                {client?.userData?.email || client?.company_basics?.company_email || ""}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {(client?.userData?.isOnboarded || client?.isOnboarded) &&
              !client?.onboarding?.status === "approved" &&
              !client?.isRejected && (
                <>
                  <button
                    onClick={() => handleApprove(client)}
                    className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5"
                  >
                    <RiCheckLine className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(client)}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5"
                  >
                    <RiCloseLine className="w-4 h-4" />
                    Reject
                  </button>
                </>
              )}

            <button
              onClick={() => handleEdit(client)}
              className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200`}
              title="Edit Client"
            >
              <RiEditLine className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(client)}
              className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-all duration-200"
              title="Delete Client"
            >
              <RiDeleteBinLine className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-3 md:p-4`}>
          <div className="flex items-center justify-between mb-2">
            <RiRobotLine className={`w-5 h-5 ${currentTheme.textSecondary}`} />
          </div>
          <p className={`text-2xl md:text-3xl font-bold ${currentTheme.text}`}>
            {clientStats.totalAIEmployees}
          </p>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>AI Employees</p>
        </div>

        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-3 md:p-4`}>
          <div className="flex items-center justify-between mb-2">
            <RiUserVoiceLine className={`w-5 h-5 ${currentTheme.textSecondary}`} />
          </div>
          <p className={`text-2xl md:text-3xl font-bold ${currentTheme.text}`}>
            {clientStats.liveAIEmployees}
          </p>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>Active Now</p>
        </div>

        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-3 md:p-4`}>
          <div className="flex items-center justify-between mb-2">
            <RiPhoneLine className={`w-5 h-5 ${currentTheme.textSecondary}`} />
          </div>
          <p className={`text-2xl md:text-3xl font-bold ${currentTheme.text}`}>
            {clientStats.totalCalls}
          </p>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>Total Calls</p>
        </div>

        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-3 md:p-4`}>
          <div className="flex items-center justify-between mb-2">
            <RiBankCardLine className={`w-5 h-5 ${currentTheme.textSecondary}`} />
          </div>
          <p className={`text-2xl md:text-3xl font-bold ${currentTheme.text}`}>
            ${clientStats.totalRevenue.toLocaleString()}
          </p>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>Revenue</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl shadow-lg`}>
        <div className={`border-b ${currentTheme.border} px-4 md:px-6`}>
          <div className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-3 md:py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-blue-500 ${currentTheme.text}`
                      : `border-transparent ${currentTheme.textSecondary} hover:${currentTheme.text}`
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "onboarding" && (
            <OnboardingDataTab
              key={`onboarding-${client?._id}`}
              client={client}
              currentTheme={currentTheme}
            />
          )}
          {activeTab === "details" && (
            <ClientDetailsTab
              key={`details-${client?._id}`}
              client={client}
              currentTheme={currentTheme}
            />
          )}
          {activeTab === "employees" && (
            <AIEmployeesTab
              key={`employees-${client?._id}-${activeTab}`}
              client={client}
              currentTheme={currentTheme}
              onViewAgent={handleViewAgent}
            />
          )}
          {activeTab === "transactions" && (
            <TransactionsTab
              key={`transactions-${client?._id}`}
              client={client}
              currentTheme={currentTheme}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
