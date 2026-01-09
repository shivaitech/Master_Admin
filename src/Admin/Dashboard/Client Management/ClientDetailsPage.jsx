import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  RiErrorWarningLine,
  RiBankCardLine,
  RiUserVoiceLine,
} from "react-icons/ri";

import {
  OnboardingDataTab,
  ClientDetailsTab,
  AIEmployeesTab,
  TransactionsTab,
  AgentDetailsView,
} from "./ClientManagement";
import ConfirmationModal from "../components/common/ConfirmationModal";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";

const ClientDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, currentTheme } = useTheme();

  const clientId = params.clientId || params.id;

  console.log("🔍 ClientId from URL params:", clientId);

  if (!clientId) {
    const pathSegments = location.pathname.split("/");
    const possibleClientId = pathSegments[pathSegments.length - 1];
    console.log("🔍 Path segments:", pathSegments);
    console.log("🔍 Possible clientId from path:", possibleClientId);
  }

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [viewMode, setViewMode] = useState("details");
  const [previousTab, setPreviousTab] = useState(null);
  const [error, setError] = useState(null);

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const isOnboarded = useMemo(() => {
    const markedAsOnboarded = client?.userData?.isOnboarded || client?.isOnboarded;
    console.log("🎯 isOnboarded calculation:", {
      hasClient: !!client,
      userData_isOnboarded: client?.userData?.isOnboarded,
      client_isOnboarded: client?.isOnboarded,
      finalValue: markedAsOnboarded,
    });
    return markedAsOnboarded || false;
  }, [client?.userData?.isOnboarded, client?.isOnboarded]);

  // Validate clientId on component mount with more flexible validation
  useEffect(() => {
    console.log("🎯 ClientDetailsPage mounted with clientId:", clientId);

    if (!clientId) {
      console.error("❌ Critical Error: No clientId found in URL params");
      setError("Invalid URL - Client ID is missing");
      setLoading(false);
      return;
    }

    // More flexible clientId validation
    if (typeof clientId !== "string") {
      console.error(
        "❌ Critical Error: ClientId is not a string:",
        typeof clientId,
        clientId
      );
      setError("Invalid Client ID format");
      setLoading(false);
      return;
    }

    if (clientId.length < 3) {
      // More flexible minimum length
      console.error(
        "❌ Critical Error: ClientId too short:",
        clientId,
        "Length:",
        clientId.length
      );
      setError("Invalid Client ID - ID too short");
      setLoading(false);
      return;
    }

    // Allow more characters including dashes and underscores
    if (!/^[a-zA-Z0-9_-]+$/.test(clientId)) {
      console.error(
        "❌ Critical Error: ClientId contains invalid characters:",
        clientId
      );
      setError("Invalid Client ID - Contains invalid characters");
      setLoading(false);
      return;
    }

    console.log("✅ ClientId validation passed:", clientId);
  }, [clientId]);

  const tabs = useMemo(() => {
    const allTabs = [
      { id: "onboarding", label: "Onboarding Data", icon: RiFileTextLine },
      { id: "details", label: "Client Details", icon: RiUserLine },
      { id: "employees", label: "AI Employees", icon: RiRobotLine },
      { id: "transactions", label: "Transactions", icon: RiExchangeDollarLine },
    ];

    const finalTabs = isOnboarded
      ? allTabs
      : allTabs.filter((tab) => tab.id !== "onboarding");

    console.log("🔍 Tabs calculation:", {
      isOnboarded,
      allTabsCount: allTabs.length,
      finalTabsCount: finalTabs.length,
      finalTabIds: finalTabs.map((t) => t.id),
      onboardingTabIncluded: finalTabs.some((t) => t.id === "onboarding"),
    });

    return finalTabs;
  }, [isOnboarded]);

  const getInitialTab = useCallback(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    console.log(
      "🎯 getInitialTab - tabFromUrl:",
      tabFromUrl,
      "isOnboarded:",
      isOnboarded
    );

    if (tabFromUrl && tabs.some((t) => t.id === tabFromUrl)) {
      console.log("✅ Using tab from URL:", tabFromUrl);
      return tabFromUrl;
    }

    const defaultTab = isOnboarded ? "onboarding" : "details";
    console.log("✅ Using default tab:", defaultTab);
    return defaultTab;
  }, [location.search, tabs, isOnboarded]);

  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Update active tab when isOnboarded changes (important for refresh scenarios)
  useEffect(() => {
    const currentTab = getInitialTab();
    console.log(
      "🎯 Tab update check - currentTab:",
      currentTab,
      "activeTab:",
      activeTab,
      "isOnboarded:",
      isOnboarded
    );

    // Only update if we're not on a valid tab for the current onboarded state
    if (activeTab === "onboarding" && !isOnboarded) {
      console.log("🔄 Switching from onboarding to details (not onboarded)");
      setActiveTab("details");
    } else if (!tabs.some((t) => t.id === activeTab)) {
      console.log("🔄 Switching to valid tab:", currentTab);
      setActiveTab(currentTab);
    }
  }, [isOnboarded, tabs, getInitialTab, activeTab]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const currentTabInUrl = urlParams.get("tab");

    if (currentTabInUrl !== activeTab) {
      const newParams = new URLSearchParams(location.search);
      newParams.set("tab", activeTab);
      const newUrl = `${location.pathname}?${newParams.toString()}`;

      if (window.location.href !== window.location.origin + newUrl) {
        window.history.replaceState(location.state, "", newUrl);
      }
    }
  }, [activeTab, location.pathname, location.search, location.state]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      if (!clientId || typeof clientId !== "string" || clientId.length < 3) {
        console.error("❌ Invalid clientId:", clientId);
        setError("Invalid Client ID in URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log("🔍 Fetching client by userId:", clientId);
        const response = await shivaiApiService.getClientByUserId(clientId);
        
        if (response?.data) {
          console.log("✅ Client data fetched:", response.data);
          setClient(response.data?.user);
        } else if (response) {
          console.log("✅ Client data fetched:", response);
          setClient(response);
        } else {
          throw new Error("No client data returned");
        }
      } catch (error) {
        console.error("❌ Error fetching client:", error);
        
        if (error.response?.status === 404) {
          toast.error("Client not found");
          navigate("/dashboard/clients");
        } else {
          const errorMessage = error.message || "Failed to load client details";
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [clientId, navigate]);

  // Update browser tab title
  useEffect(() => {
    if (client) {
      const clientName =
        client?.userData?.fullName || client?.company_basics?.name || "Client";
      const tabLabel =
        tabs.find((tab) => tab.id === activeTab)?.label || "Details";
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
    // Use browser back if available, otherwise navigate to clients page
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard/clients");
    }
  };

  const handleEdit = (client) => {
    toast("Edit functionality coming soon", {
      icon: "ℹ️",
      duration: 3000,
    });
  };

  const handleDelete = async (client) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${client?.userData?.fullName || "this client"}?`
      )
    ) {
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

  const handleApprove = async () => {
    try {
      // Get onboarding ID from client data
      const onboardingId = client?.onboarding?._id || client?.userData?.onboarding?._id || client?.onboardingDetails?.onboarding?._id;
      
      let approveId = onboardingId;
      if (!approveId) {
        // Fetch onboarding data to get the ID
        const onboardingResponse = await shivaiApiService.getOnboardingByUserId(clientId);
        approveId = onboardingResponse?.data?.onboarding?._id || onboardingResponse?.onboarding?._id;
        if (!approveId) {
          toast.error("Could not find onboarding data to approve");
          return;
        }
      }
      
      const response = await shivaiApiService.approveClient(approveId);
      if (response?.message === "Onboarding approved successfully") {
        toast.success("Client approved successfully");

        // Refresh client data from API
        try {
          const clientResponse = await shivaiApiService.getClientByUserId(clientId);
          if (clientResponse?.data) {
            setClient(clientResponse.data);
          } else if (clientResponse) {
            setClient(clientResponse);
          }
        } catch (fetchError) {
          console.warn("Could not refresh client data after approval:", fetchError);
          // Update local state as fallback
          setClient(prev => ({
            ...prev,
            onboardingStatus: "approved",
          }));
        }
      }
    } catch (error) {
      console.error("Error approving client:", error);
      toast.error("Failed to approve client");
    }
  };

  const handleReject = async () => {
    try {
      // Get onboarding ID from client data
      const onboardingId = client?.onboarding?._id || client?.userData?.onboarding?._id || client?.onboardingDetails?.onboarding?._id;
      
      let rejectId = onboardingId;
      if (!rejectId) {
        // Fetch onboarding data to get the ID
        const onboardingResponse = await shivaiApiService.getOnboardingByUserId(clientId);
        rejectId = onboardingResponse?.data?.onboarding?._id || onboardingResponse?.onboarding?._id;
        if (!rejectId) {
          toast.error("Could not find onboarding data to reject");
          return;
        }
      }
      
      await shivaiApiService.rejectClient(rejectId);
      toast.success("Client rejected successfully");
      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Error rejecting client:", error);
      toast.error("Failed to reject client");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await shivaiApiService.deleteUser(clientId);
      toast.success("Client deleted successfully");
      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client");
    }
  };

  const handleViewAgent = (agent) => {
    console.log("View agent:", agent);
    setPreviousTab(activeTab); // Save current tab
    setSelectedAgent(agent);
    setViewMode("agentView");
  };

  const handleBackFromAgent = () => {
    setSelectedAgent(null);
    setViewMode("details");
    // Restore the previous tab if it was saved
    if (previousTab) {
      setActiveTab(previousTab);
      setPreviousTab(null);
    }
  };

  console.log("🔍 ClientDetailsPage - isOnboarded:", isOnboarded);
  console.log(
    "🔍 ClientDetailsPage - Tabs to display:",
    tabs.map((t) => t.id)
  );
  console.log("🔍 ClientDetailsPage - Current active tab:", activeTab);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client && !loading && error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RiErrorWarningLine className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error.includes("Network")
              ? "Connection Error"
              : "Error Loading Client"}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Back to Clients
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RiErrorWarningLine className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Client Not Found
          </h2>
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
    liveAIEmployees:
      client?.ai_employees?.filter((emp) => emp.status === "active")?.length ||
      0,
    totalCalls: 0,
    usedTokens: 0,
    totalRevenue: 0,
    planUsage: 0,
    isActive: client?.isApproved || false,
  };

  return (
    <div className="space-y-3">
      {/* Simple Header */}
      <div
        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={handleBack}
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RiArrowLeftLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
            <div>
              <h1
                className={`text-lg md:text-xl font-semibold ${currentTheme.text}`}
              >
                {client?.fullName ||
                  client?.company_basics?.name ||
                  "Client Details"}
              </h1>
              <p className={`text-xs md:text-sm ${currentTheme.textSecondary}`}>
                {client?.email || client?.company_basics?.company_email || ""}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {(client?.userData?.isOnboarded || client?.isOnboarded) &&
              client?.onboardingStatus !== "approved" && (
                <>
                  <button
                    onClick={() => setApproveModalOpen(true)}
                    className="p-1.5 md:p-2 hover:bg-green-50 rounded-lg transition-colors"
                    title="Accept Client"
                  >
                    <RiCheckLine className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
                  </button>
                  <button
                    onClick={() => setRejectModalOpen(true)}
                    className="p-1.5 md:p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Reject Client"
                  >
                    <RiCloseLine className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" />
                  </button>
                </>
              )}
            {client?.onboardingStatus === "approved" && (
              <div className="flex items-center space-x-1 px-2 py-1 md:px-3 md:py-1.5 border border-gray-200 text-gray-700 rounded-lg text-xs md:text-sm font-medium">
                <RiCheckLine className="w-3 h-3 md:w-4 md:h-4" />
                <span>Approved</span>
              </div>
            )}

            <button
              onClick={() => handleEdit(client)}
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Client"
            >
              <RiEditLine className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="p-1.5 md:p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Client"
            >
              <RiDeleteBinLine className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Optimized Stats Cards - Row Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}
        >
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiRobotLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}
              >
                {clientStats.totalAIEmployees}
              </p>
              <p
                className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}
              >
                AI Employees
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}
        >
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiUserVoiceLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}
              >
                {clientStats.liveAIEmployees}
              </p>
              <p
                className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}
              >
                Active Now
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}
        >
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiPhoneLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}
              >
                {clientStats.totalCalls}
              </p>
              <p
                className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}
              >
                Total Calls
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}
        >
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiBankCardLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}
              >
                ${clientStats.totalRevenue.toLocaleString()}
              </p>
              <p
                className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}
              >
                Revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Tabs */}
      <div
        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg`}
      >
        <div className="border-b border-gray-200 px-2 md:px-4">
          <div className="flex  space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-3 md:py-3 text-[13px] lg:text-[16px] md:text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-4 md:h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-3 md:p-6">
          <div className={activeTab === "onboarding" ? "block" : "hidden"}>
            <OnboardingDataTab
              client={client}
              currentTheme={currentTheme}
              clientId={clientId}
            />
          </div>
          <div className={activeTab === "details" ? "block" : "hidden"}>
            <ClientDetailsTab
              client={client}
              currentTheme={currentTheme}
              clientId={clientId}
            />
          </div>
          <div className={activeTab === "employees" ? "block" : "hidden"}>
            <AIEmployeesTab
              client={client}
              currentTheme={currentTheme}
              onViewAgent={handleViewAgent}
              clientId={clientId}
            />
          </div>
          <div className={activeTab === "transactions" ? "block" : "hidden"}>
            <TransactionsTab
              client={client}
              currentTheme={currentTheme}
              clientId={clientId}
            />
          </div>
        </div>
      </div>

      {/* Approve Confirmation Modal */}
      <ConfirmationModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        onConfirm={handleApprove}
        title="Approve Client"
        message={`Are you sure you want to approve "${client?.userData?.fullName || client?.fullName || client?.email || "this client"}"?`}
        description="This will grant the client access to all approved features and services."
        confirmText="Approve"
        variant="success"
        icon={<RiCheckLine className="w-12 h-12 text-green-500" />}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmationModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleReject}
        title="Reject Client"
        message={`Are you sure you want to reject "${client?.userData?.fullName || client?.fullName || client?.email || "this client"}"?`}
        description="The client will be notified of the rejection and will need to reapply."
        confirmText="Reject"
        variant="danger"
        icon={<RiCloseLine className="w-12 h-12 text-red-500" />}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Client"
        itemName={
          client?.userData?.fullName || client?.fullName || client?.email || ""
        }
        itemType="client"
        warningMessage="All associated data including AI employees, transactions, and settings will be permanently deleted."
      />
    </div>
  );
};

export default ClientDetailsPage;
