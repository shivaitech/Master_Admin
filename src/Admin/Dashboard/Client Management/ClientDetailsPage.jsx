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

const ClientDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, currentTheme } = useTheme();
  
  const clientId = params.clientId || params.id;
  
  console.log("🔍 ClientId from URL params:", clientId);
  
  if (!clientId) {
    const pathSegments = location.pathname.split('/');
    const possibleClientId = pathSegments[pathSegments.length - 1];
    console.log("🔍 Path segments:", pathSegments);
    console.log("🔍 Possible clientId from path:", possibleClientId);
  }
  
  const [client, setClient] = useState(location.state?.client || null);
  const [loading, setLoading] = useState(!location.state?.client);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [viewMode, setViewMode] = useState("details");
  const [previousTab, setPreviousTab] = useState(null);
  const [apiCallsInProgress, setApiCallsInProgress] = useState(false);
  const [onboardingData, setOnboardingData] = useState(null);
  const [error, setError] = useState(null);

  const isOnboarded = useMemo(() => {
    // Check if we have actual onboarding data OR if client is marked as onboarded
    const hasOnboardingData = onboardingData && typeof onboardingData === 'object' && Object.keys(onboardingData).length > 0;
    const markedAsOnboarded = client?.userData?.isOnboarded || client?.isOnboarded;
    const finalValue = hasOnboardingData || markedAsOnboarded || false;
    
    console.log("🎯 isOnboarded calculation:", {
      hasClient: !!client,
      userData_isOnboarded: client?.userData?.isOnboarded,
      client_isOnboarded: client?.isOnboarded,
      hasOnboardingData: hasOnboardingData,
      onboardingDataKeys: onboardingData ? Object.keys(onboardingData) : [],
      finalValue: finalValue
    });
    return finalValue;
  }, [client?.userData?.isOnboarded, client?.isOnboarded, onboardingData]);

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
    if (typeof clientId !== 'string') {
      console.error("❌ Critical Error: ClientId is not a string:", typeof clientId, clientId);
      setError("Invalid Client ID format");
      setLoading(false);
      return;
    }
    
    if (clientId.length < 3) {  // More flexible minimum length
      console.error("❌ Critical Error: ClientId too short:", clientId, "Length:", clientId.length);
      setError("Invalid Client ID - ID too short");
      setLoading(false);
      return;
    }
    
    // Allow more characters including dashes and underscores
    if (!/^[a-zA-Z0-9_-]+$/.test(clientId)) {
      console.error("❌ Critical Error: ClientId contains invalid characters:", clientId);
      setError("Invalid Client ID - Contains invalid characters");
      setLoading(false);
      return;
    }
    
    console.log("✅ ClientId validation passed:", clientId);
  }, [clientId]);

  // Fetch onboarding data using the API
  useEffect(() => {
    const fetchOnboardingData = async () => {
      console.log("🔄 fetchOnboardingData triggered - client exists:", !!client);
      console.log("🔄 Client object:", client);
      
      // Don't fetch if no client data yet
      if (!client) {
        console.log("⏳ No client data available yet, skipping onboarding fetch");
        return;
      }

      // Prevent multiple simultaneous API calls
      if (apiCallsInProgress) {
        console.log("⏳ API calls already in progress, skipping onboarding fetch");
        return;
      }

      // Enhanced user ID extraction with more logging
      const userIdOptions = {
        userData_id: client?.userData?._id,
        client_id: client?._id,
        userData_id_alt: client?.userData?.id,
        client_id_alt: client?.id,
        email: client?.email,
        userData_email: client?.userData?.email
      };
      
      console.log("🔍 UserId extraction options:", userIdOptions);
      
      const userId =clientId;
      
      console.log("🔍 Final extracted userId:", userId);

      if (!userId) {
        console.warn("⚠️ No user ID found for fetching onboarding data");
        console.warn("⚠️ Client structure:", {
          hasUserData: !!client.userData,
          hasId: !!client._id,
          hasAltId: !!client.id,
          clientKeys: Object.keys(client)
        });
        
        // Try using clientId as fallback
        if (clientId) {
          console.log("🔄 Using clientId as fallback for onboarding fetch:", clientId);
        } else {
          return;
        }
      }

      // More flexible userId validation
      const finalUserId = userId || clientId;
      if (typeof finalUserId !== 'string' || finalUserId.length < 3) {
        console.warn("⚠️ Invalid user ID format:", finalUserId);
        setError("Invalid user ID format");
        return;
      }

      try {
        console.log("🚀 Starting API call for onboarding data - userId:", finalUserId);
        setApiCallsInProgress(true);
        setError(null);
        console.log("🔍 Fetching onboarding data for user ID:", finalUserId);

        const response = await shivaiApiService.getOnboardingByUserId(finalUserId);
        console.log("✅ Onboarding data fetched:", response);

        // Handle different response structures - check the actual API response structure
        let data = null;
        
        // The API returns: { success: true, data: { file_storage: {...}, onboarding: {...} } }
        // We need the `onboarding` object inside `data`
        if (response?.success && response?.data?.onboarding) {
          // API returned {success: true, data: { onboarding: {...} }} structure
          data = response.data.onboarding;
          console.log("📊 Extracted data from response.data.onboarding:", data);
        } else if (response?.data?.onboarding) {
          // Nested onboarding structure without success flag
          data = response.data.onboarding;
          console.log("📊 Extracted data from response.data.onboarding (no success):", data);
        } else if (response?.onboarding) {
          // Direct onboarding property
          data = response.onboarding;
          console.log("📊 Extracted data from response.onboarding:", data);
        } else if (response?.success && response?.data) {
          // API returned {success: true, data: {...}} - data IS the onboarding
          data = response.data;
          console.log("📊 Extracted data from response.data (direct):", data);
        } else if (response?.data) {
          // Fallback to data property
          data = response.data;
          console.log("📊 Extracted data from response.data (fallback):", data);
        } else {
          // Use the entire response
          data = response;
          console.log("📊 Using entire response as data:", data);
        }
        
        console.log("✅ Final onboarding data to set:", data);
        console.log("📋 Data type:", typeof data, "Is object:", typeof data === 'object');
        console.log("📋 Data keys:", data && typeof data === 'object' ? Object.keys(data) : 'Not an object');
        console.log("📋 Has company_basics:", !!data?.company_basics);
        console.log("📋 Has ai_employees:", !!data?.ai_employees);
        
        setOnboardingData(data);
      } catch (err) {
        console.error("❌ Error fetching onboarding data:", err);
        setError(err.message || "Failed to load onboarding data");

        // Fallback to client data if API fails
        const fallbackData =
          client?.onboardingDetails?.onboarding ||
          client?.userData?.onboarding ||
          client?.onboarding ||
          {};

        if (fallbackData && Object.keys(fallbackData).length > 0) {
          console.log("📋 Using fallback onboarding data from client prop");
          setOnboardingData(fallbackData);
          setError(null);
        }
      } finally {
        setApiCallsInProgress(false);
      }
    };

    // Always run this effect when client data changes
    if (client) {
      console.log("🎯 useEffect triggered for onboarding data - clientId:", client?._id || client?.id);
      fetchOnboardingData();
    }
  }, [client, clientId]); // Added clientId to dependencies

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
      finalTabIds: finalTabs.map(t => t.id),
      onboardingTabIncluded: finalTabs.some(t => t.id === "onboarding")
    });

    return finalTabs;
  }, [isOnboarded]);

  const getInitialTab = useCallback(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    console.log("🎯 getInitialTab - tabFromUrl:", tabFromUrl, "isOnboarded:", isOnboarded);

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
    console.log("🎯 Tab update check - currentTab:", currentTab, "activeTab:", activeTab, "isOnboarded:", isOnboarded);
    
    // Only update if we're not on a valid tab for the current onboarded state
    if (activeTab === "onboarding" && !isOnboarded) {
      console.log("🔄 Switching from onboarding to details (not onboarded)");
      setActiveTab("details");
    } else if (!tabs.some(t => t.id === activeTab)) {
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
      console.log("🔄 fetchClientDetails triggered");
      console.log("🔍 Current clientId:", clientId);
      console.log("🔍 ClientId type:", typeof clientId);
      console.log("🔍 ClientId length:", clientId?.length);
      console.log("🔍 Location state exists:", !!location.state?.client);
      
      // Skip if we already have client data from navigation state
      if (location.state?.client) {
        console.log("✅ Using client data from navigation state:", location.state.client);
        setClient(location.state.client);
        setLoading(false);
        return;
      }

      // Critical validation - ensure we have a valid clientId before making API calls
      if (!clientId) {
        console.error("❌ CRITICAL: No clientId provided - cannot fetch client data");
        setError("Client ID is required but missing from URL");
        setLoading(false);
        return;
      }

      if (typeof clientId !== 'string') {
        console.error("❌ CRITICAL: ClientId is not a string:", typeof clientId, clientId);
        setError("Invalid Client ID type");
        setLoading(false);
        return;
      }

      if (clientId.length < 3) {  // More flexible minimum length
        console.error("❌ CRITICAL: ClientId too short for valid ID:", clientId, "Length:", clientId.length);
        setError("Invalid Client ID format");
        setLoading(false);
        return;
      }

      // Prevent multiple simultaneous API calls
      if (apiCallsInProgress) {
        console.log("⏳ API calls already in progress, skipping client fetch");
        return;
      }

      try {
        console.log("🚀 Starting API call for client details");
        console.log("📡 API Call - ClientId being sent:", clientId);
        console.log("📡 API Call - ClientId length:", clientId.length);
        console.log("📡 API Call - ClientId type:", typeof clientId);
        
        setLoading(true);
        setApiCallsInProgress(true);
        setError(null);
        
        // Use the proper API method for getting client/agent data
        let response;
        
        try {
          console.log("🔄 Attempting getAgentsById with clientId:", clientId);
          const agentData = await shivaiApiService.getAgentsById(clientId);
          console.log("✅ getAgentsById SUCCESS - Response:", agentData);
          
          // Structure the response to match expected format
          response = {
            success: true,
            data: agentData
          };
        } catch (agentError) {
          console.log("❌ getAgentsById FAILED for clientId:", clientId, "Error:", agentError.message);
          
          // Fallback to direct user endpoint
          try {
            console.log("🔄 Attempting direct /users endpoint with clientId:", clientId);
            const userResponse = await shivaiApiService.get(`/v1/users/${clientId}`);
            console.log("✅ Direct /users endpoint SUCCESS - Response:", userResponse);
            response = userResponse;
          } catch (usersError) {
            console.log("❌ Direct /users endpoint FAILED for clientId:", clientId, "Error:", usersError.message);
            
            // Final fallback: get all users and filter
            console.log("🔄 Attempting getAllUsers fallback and filtering for clientId:", clientId);
            const allUsersResponse = await shivaiApiService.getAllUsers();
            console.log("📊 getAllUsers response structure:", {
              hasData: !!allUsersResponse?.data,
              hasDataData: !!allUsersResponse?.data?.data,
              isArray: Array.isArray(allUsersResponse),
              dataIsArray: Array.isArray(allUsersResponse?.data),
              dataDataIsArray: Array.isArray(allUsersResponse?.data?.data),
            });
            
            // Extract users array from response
            let users = [];
            if (allUsersResponse?.data?.data) {
              users = allUsersResponse.data.data;
            } else if (allUsersResponse?.data && Array.isArray(allUsersResponse.data)) {
              users = allUsersResponse.data;
            } else if (Array.isArray(allUsersResponse)) {
              users = allUsersResponse;
            } else {
              console.error("❌ Invalid users response structure:", allUsersResponse);
              throw new Error(`Unable to fetch client data. Invalid response structure from API.`);
            }
            
            if (!Array.isArray(users)) {
              console.error("❌ Users data is not an array:", typeof users, users);
              throw new Error("Users data is not in expected array format");
            }
            
            console.log(`🔍 Searching for clientId "${clientId}" in ${users.length} users`);
            
            const foundUser = users.find(user => {
              const userMatches = [
                user._id === clientId,
                user.id === clientId,
                user.userData?._id === clientId,
                user.userData?.id === clientId
              ];
              
              if (userMatches.some(match => match)) {
                console.log("✅ User match found:", {
                  user_id: user._id || user.id,
                  userData_id: user.userData?._id || user.userData?.id,
                  searchingFor: clientId,
                  matchedBy: userMatches
                });
                return true;
              }
              return false;
            });
            
            if (foundUser) {
              console.log("✅ Client found in users list:", foundUser);
              response = { success: true, data: foundUser };
            } else {
              console.error(`❌ Client with ID "${clientId}" not found in ${users.length} users`);
              throw new Error(`Client not found: No client with ID "${clientId}" exists in the system`);
            }
          }
        }
        
        if (response?.success && response?.data) {
          console.log("✅ Final client data to be set:", response.data);
          setClient(response.data);
          setError(null);
        } else {
          console.error("❌ Invalid response structure:", response);
          setError("Failed to load client data - Invalid API response");
        }
      } catch (error) {
        console.error("❌ Complete API failure for clientId:", clientId, "Error:", error);
        
        // Only navigate away for genuine 404 errors
        if (error.response?.status === 404) {
          console.log("🔄 404 Error - Navigating back to clients list");
          toast.error("Client not found");
          navigate("/dashboard/clients");
        } else {
          // For other errors, just set error state and stay on page
          let errorMessage = `Failed to load client details for ID: ${clientId}`;
          if (error.response?.status === 403) {
            errorMessage = "Access denied - You don't have permission to view this client";
          } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
            errorMessage = "Network error. Please check your connection and try again.";
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
        setApiCallsInProgress(false);
      }
    };

    // Only run this effect if we have a valid clientId
    if (clientId && typeof clientId === 'string' && clientId.length >= 3) {
      console.log("🎯 Starting fetchClientDetails with validated clientId:", clientId);
      fetchClientDetails();
    } else {
      console.error("❌ Cannot fetch client details - invalid clientId:", clientId);
      setError("Invalid Client ID in URL");
      setLoading(false);
    }
  }, [clientId, navigate]); // Dependencies: clientId and navigate

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

  const handleApprove = async (client) => {
    console.log(client, "jj");
    try {
      const response = await shivaiApiService.approveClient(
        onboardingData?._id
      );
      if (response?.message === "Onboarding approved successfully") {
        toast.success("Client approved successfully");
        
        // Update local state immediately with approved status
        const updatedClient = {
          ...client,
          onboardingStatus: "approved",
          userData: {
            ...client.userData,
            isOnboarded: true
          }
        };
        setClient(updatedClient);
        
        // Also fetch fresh data from API to ensure consistency
        try {
          const clientResponse = await shivaiApiService.getAgentsById(clientId);
          if (clientResponse) {
            setClient(clientResponse);
          }
        } catch (fetchError) {
          console.warn("Could not refresh client data after approval:", fetchError);
          // Don't throw error, approval was successful
        }
      }
    } catch (error) {
      console.error("Error approving client:", error);
      toast.error("Failed to approve client");
    }
  };

  const handleReject = async (client) => {
    try {
      await shivaiApiService.rejectClient(onboardingData?._id);
      toast.success("Client rejected successfully");
      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Error rejecting client:", error);
      toast.error("Failed to reject client");
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
            {error.includes("Network") ? "Connection Error" : "Error Loading Client"}
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
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={handleBack}
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RiArrowLeftLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
            <div>
              <h1 className={`text-lg md:text-xl font-semibold ${currentTheme.text}`}>
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
                    onClick={() => handleApprove(client)}
                    className="p-1.5 md:p-2 hover:bg-green-50 rounded-lg transition-colors"
                    title="Accept Client"
                  >
                    <RiCheckLine className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
                  </button>
                  <button
                    onClick={() => handleReject(client)}
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
              onClick={() => handleDelete(client)}
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
        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}>
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiRobotLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}>
                {clientStats.totalAIEmployees}
              </p>
              <p className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}>
                AI Employees
              </p>
            </div>
          </div>
        </div>

        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}>
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiUserVoiceLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}>
                {clientStats.liveAIEmployees}
              </p>
              <p className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}>
                Active Now
              </p>
            </div>
          </div>
        </div>

        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}>
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiPhoneLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}>
                {clientStats.totalCalls}
              </p>
              <p className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}>
                Total Calls
              </p>
            </div>
          </div>
        </div>

        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4`}>
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg">
              <RiBankCardLine className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-lg md:text-xl font-bold ${currentTheme.text} leading-none`}>
                ${clientStats.totalRevenue.toLocaleString()}
              </p>
              <p className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}>
                Revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Tabs */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg`}>
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
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
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
            {console.log("🎯 OnboardingDataTab rendering:", {
              activeTab,
              isOnboardingTabActive: activeTab === "onboarding",
              hasClient: !!client,
              hasOnboardingData: !!onboardingData,
              onboardingDataKeys: onboardingData ? Object.keys(onboardingData) : [],
              onboardingDataStructure: onboardingData,
              isOnboarded,
              apiCallsInProgress,
              tabsAvailable: tabs.map(t => t.id)
            })}
            
            {activeTab === "onboarding" && apiCallsInProgress ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading onboarding data...</span>
              </div>
            ) : activeTab === "onboarding" && !onboardingData ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  <RiFileTextLine className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">No Onboarding Data Available</p>
                  <p className="text-sm">This client hasn't completed the onboarding process yet.</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                >
                  Refresh Data
                </button>
              </div>
            ) : activeTab === "onboarding" && onboardingData ? (
              <>
                {console.log("🚀 Rendering OnboardingDataTab with data:", onboardingData)}
                <OnboardingDataTab
                  client={client}
                  onboardingData={onboardingData}
                  currentTheme={currentTheme}
                />
              </>
            ) : (
              activeTab === "onboarding" && (
                <div className="text-center py-8 text-gray-500">
                  <p>Onboarding tab not active or data loading...</p>
                  <p className="text-xs mt-2">Active tab: {activeTab}</p>
                  <p className="text-xs">Has data: {!!onboardingData ? 'Yes' : 'No'}</p>
                  <p className="text-xs">API in progress: {apiCallsInProgress ? 'Yes' : 'No'}</p>
                </div>
              )
            )}
          </div>
          <div className={activeTab === "details" ? "block" : "hidden"}>
            <ClientDetailsTab
              client={client}
              currentTheme={currentTheme}
            />
          </div>
          <div className={activeTab === "employees" ? "block" : "hidden"}>
            <AIEmployeesTab
              client={client}
              currentTheme={currentTheme}
              onViewAgent={handleViewAgent}
            />
          </div>
          <div className={activeTab === "transactions" ? "block" : "hidden"}>
            <TransactionsTab
              client={client}
              currentTheme={currentTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
