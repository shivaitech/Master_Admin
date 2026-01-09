import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  RiTeamLine,
  RiSearchLine,
  RiUserLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiUserAddLine,
  RiBankCardLine,
  RiDownloadLine,
  RiCheckLine,
  RiCheckDoubleLine,
  RiCloseLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiGlobalLine,
  RiMailLine,
  RiBuildingLine,
  RiUserVoiceLine,
  RiBookOpenLine,
  RiRocketLine,
  RiFileTextLine,
  RiQuestionLine,
  RiRobotLine,
  RiShieldCheckLine,
  RiRefreshLine,
  RiWhatsappLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiChatVoiceLine,
  RiSendPlaneLine,
  RiPlayLine,
  RiMicLine,
  RiCalendarLine,
  RiShoppingBagLine,
  RiSlackLine,
  RiSettingsLine,
  RiAddLine,
  RiListCheck2,
  RiArrowDownLine,
  RiSettings4Line,
  RiMoneyDollarCircleLine,
  RiCpuLine,
  RiPulseLine,
  RiTokenSwapLine,
  RiVipCrownLine,
  RiShoppingBag3Line,
  RiExchangeDollarLine,
  RiBarChartLine,
  RiPhoneLine,
  RiChatOffLine,
  RiUser3Line,
} from "react-icons/ri";
import { useTheme } from "../contexts/ThemeContext";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import {
  Target,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Download,
  Play,
  Pause,
  Bot,
  Clock,
  FileText,
  Phone,
  Loader2,
  XCircle,
  Activity,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MessageSquare,
} from "lucide-react";

// Import the separate components
import OnboardingDataTab from "./OnboardingDataTab";
import ClientDetailsTab from "./ClientDetailsTab";
import AIEmployeesTab from "./AIEmployeesTab";
import TransactionsTab from "./TransactionsTab";
import AgentDetailsView from "./AgentDetailsView";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";

// Industry options from onboarding (Step 3)
const industryOptions = [
  { value: "saas-software", label: "SaaS & Software Development" },
  { value: "technology-it", label: "Technology / IT Services" },
  { value: "healthcare-clinics", label: "Healthcare & Clinics" },
  { value: "finance-insurance", label: "Finance & Insurance" },
  { value: "retail-ecommerce", label: "Retail & E-Commerce" },
  { value: "education-training", label: "Education & Training" },
  { value: "real-estate-property", label: "Real Estate & Property" },
  { value: "hospitality-travel", label: "Hospitality & Travel" },
  {
    value: "food-beverage",
    label: "Food & Beverage (Restaurants, Cafes, Catering)",
  },
  { value: "automotive-transportation", label: "Automotive & Transportation" },
  { value: "legal-professional", label: "Legal & Professional Services" },
  { value: "manufacturing-industrial", label: "Manufacturing & Industrial" },
  { value: "consulting-business", label: "Consulting & Business Services" },
  { value: "marketing-advertising", label: "Marketing & Advertising" },
  { value: "construction-home", label: "Construction & Home Services" },
  { value: "logistics-supply", label: "Logistics & Supply Chain" },
  { value: "media-entertainment", label: "Media & Entertainment" },
  { value: "beauty-wellness", label: "Beauty, Wellness & Personal Care" },
  {
    value: "nonprofit-community",
    label: "Nonprofit & Community Organizations",
  },
  { value: "other", label: "Other" },
];

// Agent configuration options from Step 3  
const agentTypeOptions = [
  { value: "sales", label: "Sales & Business Development" },
  { value: "support", label: "Customer Support & Service" },
  { value: "appointment", label: "Appointment & Scheduling" },
  { value: "order", label: "Order Management & Billing" },
  { value: "product", label: "Product / Service Explainers" },
  { value: "feedback", label: "Feedback & Engagement" },
  { value: "custom", label: "Custom Workflows" },
];

const templateOptions = [
  {
    value: "sales-business-development",
    label: "Sales & Business Development",
  },
  { value: "customer-support-service", label: "Customer Support & Service" },
  { value: "appointment-scheduling", label: "Appointment & Scheduling" },
  { value: "order-billing", label: "Order Management & Billing" },
  {
    value: "product-service-explainers",
    label: "Product / Service Explainers",
  },
  { value: "feedback-engagement", label: "Feedback & Engagement" },
  { value: "custom-workflows", label: "Custom Workflows" },
];

const languageOptions = [
  { value: "All", label: "🌍 Multilingual" },
  { value: "ar", label: "🇸🇦 Arabic" },
  { value: "zh", label: "🇨🇳 Chinese" },
  { value: "nl", label: "🇳🇱 Dutch" },
  { value: "en-GB", label: "🇬🇧 English (UK)" },
  { value: "en-US", label: "🇺🇸 English (US)" },
  { value: "en-IN", label: "🇮🇳 English (India)" },
  { value: "fr", label: "🇫🇷 French" },
  { value: "de", label: "🇩🇪 German" },
  { value: "hi", label: "🇮🇳 Hindi" },
  { value: "it", label: "🇮🇹 Italian" },
  { value: "ja", label: "🇯🇵 Japanese" },
  { value: "ko", label: "🇰🇷 Korean" },
  { value: "pt", label: "🇵🇹 Portuguese" },
  { value: "pl", label: "🇵🇱 Polish" },
  { value: "ru", label: "🇷🇺 Russian" },
  { value: "es", label: "🇪🇸 Spanish" },
  { value: "tr", label: "🇹🇷 Turkish" },
];

const voiceGenderOptions = [
  { value: "neutral", label: "Gender Neutral" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

// Plan options from onboarding (Step 3)
const planOptions = [
  {
    id: "starter",
    name: "Starter",
    apiKey: "Starter Plan",
    description: "Perfect for small businesses",
    maxAgents: 1,
    aiEmployees: 1,
    price: "$49/mo",
  },
  {
    id: "professional",
    name: "Professional",
    apiKey: "Professional Plan",
    description: "For Growing Teams & Small Businesses",
    maxAgents: 5,
    aiEmployees: 5,
    price: "$149/mo",
  },
  {
    id: "business",
    name: "Business",
    apiKey: "Business Plan",
    description: "For Scaling Companies & Mid-Sized Teams",
    maxAgents: 15,
    aiEmployees: 15,
    price: "$299/mo",
  },
  {
    id: "custom",
    name: "Custom",
    apiKey: "Custom Plan",
    description: "For Large Organizations & Enterprises",
    maxAgents: 999,
    aiEmployees: 999,
    price: "Custom",
  },
];

const ClientManagement = () => {
  const { theme, currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get initial tab from URL params or default to "all"
  const getInitialTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'all';
  };
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list, edit, details, or agentView
  const [editData, setEditData] = useState(null);
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
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if fields are editable

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // Industry dropdown state
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [industrySearch, setIndustrySearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationMeta, setPaginationMeta] = useState(null);

  // Track which tabs have been visited to avoid unnecessary count fetches
  const visitedTabsRef = useRef(new Set());
  const fetchInProgressRef = useRef(false);
  
  // Update URL when active tab changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentTabParam = params.get('tab');
    
    if (currentTabParam !== activeTab) {
      if (activeTab === 'all') {
        params.delete('tab');
      } else {
        params.set('tab', activeTab);
      }
      
      const newSearch = params.toString();
      const newPath = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
      
      navigate(newPath, { replace: true });
    }
  }, [activeTab, location.pathname, location.search, navigate]);

  // Click outside handler for industry dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-industry-dropdown]")) {
        console.log("Clicking outside industry dropdown");
        setShowIndustryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect - also resets page
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm !== searchQuery) {
        setSearchQuery(searchTerm);
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, searchQuery]);

  // Reset to first page when active tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Fetch counts for all tabs
  const fetchAllCounts = async () => {
    try {
      const tabs = [
        "all",
        "newlySignup",
        "pending",
        "onboarded",
        "approved",
        "rejected",
      ];
      const countPromises = tabs.map(async (tab) => {
        try {
          // For counts, just get page 1 with limit 1 and read the meta.total
          const baseParams = { page: 1, limit: 1 };
          let params = baseParams;

          switch (tab) {
            case "all":
              params = baseParams;
              break;
            case "newlySignup":
              params = { ...baseParams, isVerified: false };
              break;
            case "pending":
              params = { ...baseParams, isVerified: true, isOnboarded: false };
              break;
            case "onboarded":
              params = { ...baseParams, isVerified: true, isOnboarded: true };
              break;
            case "approved":
              params = { ...baseParams, onboardingStatus: "approved" };
              break;
            case "rejected":
              params = { ...baseParams, onboardingStatus: "rejected" };
              break;
          }

          const response = await shivaiApiService.get("/v1/users", params);
          const responseData = response.data || response;
          const meta = responseData?.meta || {};
          // Use meta.total for accurate count
          const count = meta.total !== undefined ? meta.total : 0;
          console.log(`📊 Count for ${tab}:`, count, "from meta:", meta);
          return { tab, count };
        } catch (error) {
          console.error(`Error fetching count for ${tab}:`, error);
          return { tab, count: 0 };
        }
      });

      const results = await Promise.all(countPromises);
      const newCounts = {};
      results.forEach(({ tab, count }) => {
        newCounts[tab] = count;
      });
      console.log("✅ All counts fetched:", newCounts);
      setCounts(newCounts);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  // Counts will be populated as user switches tabs - no need for initial fetch of all counts
  // This saves 6 API calls on mount

  // Helper function to get query params based on tab
  const getQueryParams = (tab) => {
    const baseParams = {
      page: currentPage,
      limit: itemsPerPage,
    };

    switch (tab) {
      case "all":
        return baseParams;
      case "newlySignup":
        return { ...baseParams, isVerified: false };
      case "pending":
        return { ...baseParams, isVerified: true, isOnboarded: false };
      case "onboarded":
        return { ...baseParams, isVerified: true, isOnboarded: true };
      case "approved":
        return { ...baseParams, onboardingStatus: "approved" };
      case "rejected":
        return { ...baseParams, onboardingStatus: "rejected" };
      default:
        return baseParams;
    }
  };

  // Reusable function to fetch clients data
  const fetchClients = async (tab = activeTab, page = currentPage) => {
    // Prevent duplicate calls
    if (fetchInProgressRef.current) {
      console.log("⏭️ Skipping fetch - already in progress");
      return;
    }

    try {
      fetchInProgressRef.current = true;
      setLoading(true);
      setError(null);

      // Mark this tab as visited
      visitedTabsRef.current.add(tab);

      const params = getQueryParams(tab);
      console.log(`📡 Fetching data for tab: ${tab} with params:`, params);

      const response = await shivaiApiService.get("/v1/users", params);
      console.log(`✅ Raw response for ${tab}:`, response);
      console.log(`✅ Response data:`, response.data);

      // Handle response data structure - transform to client format
      const responseData = response.data || response;
      const users =
        responseData?.data?.users || responseData?.users || responseData || [];
      const meta = responseData?.meta || {};
      const pagination =
        responseData?.data?.meta?.pagination || meta?.pagination || {};
      console.log(
        `📊 Extracted users (${users.length}):`,
        users.length > 0 ? users.slice(0, 2) : "No users"
      );
      console.log(`📊 Meta data:`, meta);
      console.log(`📊 Pagination data:`, pagination);

      const transformedClients = users.map((user) => ({
        _id: user?.id || user?._id,
        onBoardingId: user?.onboarding?._id || null,
        userData: user,
        company_basics: {
          name: user?.onboarding?.company_name || user?.fullName || "Unknown",
          company_email: user?.onboarding?.company_email || user?.email,
          company_size: user?.onboarding?.address || user?.address || "Unknown",
          industry: [user?.onboarding?.region || "Not specified"],
        },
        plan_details: {
          type:
            user?.userData?.onboarding?.plan_type ||
            user?.onboarding?.plan_type ||
            user?.plan_type ||
            "Selected",
          ai_employee_limit:
            user?.onboarding?.ai_employee_count || user?.ai_employee_count || 1,
          monthly_price: (() => {
            const planType =
              user?.userData?.onboarding?.plan_type ||
              user?.onboarding?.plan_type;
            const plan = planOptions.find((p) => p.apiKey === planType);
            return plan?.price === "Custom"
              ? 0
              : parseFloat(plan?.price?.replace(/[$\/mo,]/g, "") || "0");
          })(),
        },
        ai_employees:
          user?.onboarding?.ai_employees ||
          Array.from(
            { length: user?.onboarding?.ai_employee_count || 0 },
            (_, i) => ({
              id: `ai_${i + 1}`,
              name: `AI Employee ${i + 1}`,
              type: "Assistant",
              status: "Active",
            })
          ),
        isOnBoarded: user?.isOnBoarded || false,
        isApproved: user?.isApproved || false,
        createdAt: user?.createdAt,
        lastLoginAt: user?.lastLoginAt,
        knowledge_sources: {
          website_url: user?.onboarding?.website_url || "",
          social_links: { linkedin: user?.onboarding?.linkedin || "" },
          faqs_text: user?.onboarding?.faqs_text || "",
          uploaded_files: user?.onboarding?.uploaded_files || [],
        },
        deployment_targets: {
          channels: user?.onboarding?.channels || [],
        },
        instructions: {
          dos_and_donts: user?.onboarding?.dos_and_donts || "",
          fallback_contacts: user?.onboarding?.fallback_contacts || "",
        },
        targets: {
          success_goals: user?.onboarding?.success_goals || "",
          success_metrics: user?.onboarding?.success_metrics || "",
        },
      }));

      setClients(transformedClients);

      // Update pagination state from meta
      setPaginationMeta(pagination);

      // Update total items from meta if available
      const totalFromMeta = pagination.total || meta.total;
      const totalPagesFromMeta = pagination.totalPages || meta.totalPages;

      if (totalFromMeta !== undefined) {
        setTotalItems(totalFromMeta);
        setTotalPages(
          totalPagesFromMeta || Math.ceil(totalFromMeta / itemsPerPage)
        );

        // Also update the count for current active tab immediately
        setCounts((prevCounts) => ({
          ...prevCounts,
          [tab]: totalFromMeta,
        }));
        console.log(`✅ Set count for ${tab}:`, totalFromMeta);
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError(error.message);
      setClients([]);
    } finally {
      setLoading(false);
      fetchInProgressRef.current = false;
    }
  };

  // Fetch data from API based on active tab
  useEffect(() => {
    fetchClients();
  }, [activeTab, currentPage]);

  // Memoized calculations
  const getClientsForTab = useMemo(() => {
    let filteredClients = clients;

    if (searchQuery) {
      filteredClients = clients.filter((client) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          client.company_basics?.name?.toLowerCase().includes(searchLower) ||
          client.company_basics?.company_email
            ?.toLowerCase()
            .includes(searchLower) ||
          client.userData?.fullName?.toLowerCase().includes(searchLower) ||
          client.userData?.email?.toLowerCase().includes(searchLower)
        );
      });
    }

    return filteredClients;
  }, [clients, searchQuery]);

  // Get current page items - API already returns paginated data, so just use clients
  const currentPageClients = useMemo(() => {
    return clients; // API returns paginated data already
  }, [clients]);

  // Helper functions
  const getCount = (status) => {
    return counts[status] || 0;
  };

  const getTotalOnboardingCount = () => {
    return counts.all || 0;
  };

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleEditClient = (client) => {
    console.log("🔍 handleEditClient called with client:", client);
    
    if (!client?.id) {
      console.error("❌ No client.id available:", client);
      setError("Client ID not found");
      return;
    }

    setSelectedClient(client);
    // Set basic edit data - child components will fetch their own detailed data
    setEditData({
      _id: client._id || client.id,
      userData: client,
    });
    setViewMode("edit");
    setIsEditing(false);
  };

  // Open delete confirmation modal
  const openDeleteModal = (client) => {
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setClientToDelete(null);
  };

  // Handle delete confirmation
  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    
    try {
      const clientId = clientToDelete?.id;
      const clientName = clientToDelete?.fullName || clientToDelete?.name || "this client";

      console.log(`🗑️ Deleting client: ${clientName} (ID: ${clientId})`);
      if (!clientId) {
        toast.error("Client ID not found");
        return;
      }

      const response = await shivaiApiService.deleteUser(clientId);

      if (response?.success) {
        toast.success("Client deleted successfully");
        await fetchClients(activeTab, currentPage);
      } else {
        toast.error(response?.message || "Failed to delete client");
      }
    } catch (error) {
      console.error("❌ Error deleting client:", error);
      toast.error("Failed to delete client");
    }
  };

  const handleBackToList = () => {
    setSelectedClient(null);
    setViewMode("list");
    setEditData(null);
    setIsEditing(false);
    setSelectedAgent(null);
  };

  const handleViewAgent = (agent) => {
    setSelectedAgent(agent);
    setViewMode("agentView");
  };

  const handleViewClient = async (client) => {
    try {
      console.log("🔍 handleViewClient called with client:", client);
      // Navigate to client details page with client data in state
      navigate(`/dashboard/clients/${client?.id || client?._id}`, {
        state: { client }
      });
    } catch (error) {
      console.error("❌ Error navigating to client details:", error);
      toast.error("Failed to navigate to client details");
    }
  };

  // Agent Details View
  if (viewMode === "agentView" && selectedAgent) {
    return (
      <AgentDetailsView 
        agent={selectedAgent} 
        onBack={handleBackToList}
        currentTheme={currentTheme}
      />
    );
  }

  // Client Details View - Navigate to dedicated page
  if (viewMode === "details" && selectedClient) {
    navigate(`/dashboard/clients/${selectedClient._id || selectedClient.userData?._id}`, {
      state: { client: selectedClient }
    });
    // Reset viewMode to prevent infinite loop
    setViewMode("list");
    return null;
  }

  // List View
  return (
    <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
      {/* Stats Cards - Row Layout with Mobile Sliding */}
      <div className="relative -mx-2 sm:mx-0">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-2 sm:px-0 snap-x snap-mandatory sm:grid sm:grid-cols-3">
          {/* Total Clients Card */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 shadow-sm min-w-[240px] sm:min-w-0 snap-center flex-shrink-0`}
          >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center flex-shrink-0`}
            >
              <RiTeamLine
                className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-xs ${currentTheme.textSecondary} font-medium`}>
                  All Clients
                </p>
                <span className="text-xs font-medium text-blue-500">Total</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-semibold ${currentTheme.text}`}>
                {paginationMeta?.total || totalItems || getCount("all")}
              </h3>
              {paginationMeta && (
                <p className={`text-xs ${currentTheme.textSecondary}`}>
                  Page {paginationMeta.page || currentPage} of {paginationMeta.totalPages || totalPages}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pending Clients Card */}
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 shadow-sm min-w-[240px] sm:min-w-0 snap-center flex-shrink-0`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center flex-shrink-0`}
            >
              <RiTimeLine
                className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-xs ${currentTheme.textSecondary} font-medium`}>
                  Awaiting Review
                </p>
                <span className="text-xs font-medium text-yellow-500">Pending</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-semibold ${currentTheme.text}`}>
                {getCount("pending")}
              </h3>
            </div>
          </div>
        </div>

        {/* Active Clients Card */}
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 shadow-sm min-w-[240px] sm:min-w-0 snap-center flex-shrink-0`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center flex-shrink-0`}
            >
              <RiCheckLine
                className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-xs ${currentTheme.textSecondary} font-medium`}>
                  Approved Clients
                </p>
                <span className="text-xs font-medium text-green-500">Active</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-semibold ${currentTheme.text}`}>
                {getCount("approved")}
              </h3>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 md:p-6 shadow-lg`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <h2
              className={`text-lg md:text-xl font-semibold ${currentTheme.text} flex items-center gap-2`}
            >
              <RiTeamLine className="w-4 h-4 md:w-5 md:h-5" />
              Client Requests
            </h2>
            <p
              className={`${currentTheme.textSecondary} text-xs md:text-sm mt-1`}
            >
              ({paginationMeta?.total || totalItems || getCount("all")} total)
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.location.reload()}
              className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 flex-shrink-0`}
              title="Refresh data"
            >
              <RiRefreshLine className="w-4 h-4" />
            </button>

            <div className="relative flex-1 sm:flex-none">
              <RiSearchLine
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full sm:w-48 md:w-64 pl-10 sm:pl-9 pr-3 py-2 text-sm rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-1 mb-4 md:mb-6 border-b ${currentTheme.border} overflow-x-auto scrollbar-hide -mx-3 sm:mx-0 px-3 sm:px-0`}
        >
          {[
            "all",
            "newlySignup",
            "pending",
            "onboarded",
            "approved",
            "rejected",
          ].map((tab) => {
            const tabConfig = {
              all: { icon: RiListCheck2, label: "All" },
              newlySignup: { icon: RiUserAddLine, label: "Newly Signup" },
              pending: { icon: RiTimeLine, label: "Pending" },
              onboarded: { icon: RiCheckLine, label: "Onboarded" },
              approved: { icon: RiCheckDoubleLine, label: "Approved" },
              rejected: { icon: RiCloseLine, label: "Rejected" },
            };
            const { icon: TabIcon, label } = tabConfig[tab];

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? `${currentTheme.activeBorder} ${currentTheme.text}`
                    : `border-transparent ${currentTheme.textSecondary} ${currentTheme.hover}`
                }`}
              >
                <div className="flex items-center gap-1.5 md:gap-2">
                  <TabIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-sm md:text-base">{label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Client List */}
        <div className="space-y-3 md:space-y-4">
          {loading ? (
            <div
              className={`text-center py-12 md:py-16 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}
            >
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
              <h3
                className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-2`}
              >
                Loading clients...
              </h3>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                Please wait while we fetch the data
              </p>
            </div>
          ) : currentPageClients.length === 0 ? (
            <div
              className={`text-center py-8 md:py-12 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}
            >
              <RiUserLine
                className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 ${currentTheme.textSecondary}`}
              />
              <h3
                className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-1 md:mb-2`}
              >
                {searchQuery ? "No matching clients" : "No client requests yet"}
              </h3>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                {searchQuery
                  ? "Try adjusting your search criteria"
                  : "No client requests available"}
              </p>
            </div>
          ) : (
            currentPageClients?.map((client) => (
              <div
                key={client.id}
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4 hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <div
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${currentTheme.activeBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <RiBuildingLine
                        className={`w-4 h-4 md:w-5 md:h-5 ${currentTheme.text}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold ${currentTheme.text} text-base md:text-lg truncate`}
                      >
                        {client?.userData?.fullName ||
                          client?.company_basics?.name ||
                          "Unknown"}
                      </h4>
                      <p
                        className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}
                      >
                        {client?.userData?.email ||
                          client?.company_basics?.company_email ||
                          "No email"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewClient(client?.userData)}
                      className={`p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 transition-all duration-200`}
                      title="View Client Details"
                    >
                      <RiEyeLine className="w-4 h-4" />
                    </button>
                    {/* Analytics button - only shown for onboarded clients */}
                    {(client?.userData?.isOnboarded || client?.isOnboarded) && (
                      <button
                        onClick={() => {
                          const clientId = client?.id || client?._id || client?.userData?.id || client?.userData?._id;
                          navigate(`/dashboard/clients/${clientId}?tab=employees`, {
                            state: { client }
                          });
                        }}
                        className={`p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 transition-all duration-200`}
                        title="View AI Employee Analytics"
                      >
                        <RiBarChartLine className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEditClient(client?.userData)}
                      className={`p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 transition-all duration-200`}
                      title="Edit Client"
                    >
                      <RiEditLine className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(client?.userData)}
                      className={`p-2 flex items-center justify-center text-red-500 rounded-lg hover:bg-red-50 hover:scale-105 transition-all duration-200`}
                      title="Delete Client"
                    >
                      <RiDeleteBinLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  <div>
                    <p
                      className={`text-xs ${currentTheme.textSecondary} uppercase mb-0.5`}
                    >
                      Plan
                    </p>
                    <p
                      className={`${currentTheme.text} font-medium text-xs md:text-sm truncate`}
                    >
                      {(() => {
                        const planType =
                          client?.userData?.onboarding?.plan_type ||
                          client?.plan_details?.type;
                        const plan = planOptions.find(
                          (p) => p.apiKey === planType
                        );
                        return plan
                          ? `${plan.name} (${plan.price})`
                          : planType || "No plan";
                      })()}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs ${currentTheme.textSecondary} uppercase`}
                    >
                      Company
                    </p>
                    <p className={`${currentTheme.text} font-medium text-sm`}>
                      {client?.userData?.onboarding?.company_name || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs ${currentTheme.textSecondary} uppercase`}
                    >
                      Email
                    </p>
                    <p
                      className={`${currentTheme.text} font-medium text-sm truncate`}
                    >
                      {client?.userData?.onboarding?.company_email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs ${currentTheme.textSecondary} uppercase`}
                    >
                      AI Employees
                    </p>
                    <p className={`${currentTheme.text} font-medium text-sm`}>
                      {client?.userData?.onboarding?.ai_employee_count ||
                        (client?.ai_employees || []).length}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3 mt-4 md:mt-6 p-3 md:p-4 rounded-lg ${currentTheme.searchBg}`}
          >
            <div
              className={`text-xs md:text-sm ${currentTheme.textSecondary} text-center sm:text-left`}
            >
              Showing{" "}
              {((paginationMeta?.page || currentPage) - 1) *
                (paginationMeta?.limit || itemsPerPage) +
                1}{" "}
              to{" "}
              {Math.min(
                (paginationMeta?.page || currentPage) *
                  (paginationMeta?.limit || itemsPerPage),
                paginationMeta?.total || totalItems
              )}{" "}
              of {paginationMeta?.total || totalItems}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`px-2.5 md:px-3 py-1.5 text-xs md:text-sm rounded-md transition-all duration-200 ${
                  currentPage === 1
                    ? `${currentTheme.textSecondary} cursor-not-allowed opacity-50`
                    : `${currentTheme.text} ${currentTheme.hover} hover:scale-105`
                }`}
              >
                Previous
              </button>

              <span
                className={`mx-2 md:mx-3 text-xs md:text-sm ${currentTheme.text}`}
              >
                {paginationMeta?.page || currentPage}/
                {paginationMeta?.totalPages || totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-2.5 md:px-3 py-1.5 text-xs md:text-sm rounded-md transition-all duration-200 ${
                  currentPage === totalPages
                    ? `${currentTheme.textSecondary} cursor-not-allowed opacity-50`
                    : `${currentTheme.text} ${currentTheme.hover} hover:scale-105`
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteClient}
        title="Delete Client"
        itemName={clientToDelete?.fullName || clientToDelete?.name || clientToDelete?.email || ""}
        itemType="client"
        warningMessage="All associated data including AI employees, transactions, and settings will be permanently deleted."
      />
    </div>
  );
};

export default ClientManagement;

// Export tab components for use in ClientDetailsPage
export {
  OnboardingDataTab,
  ClientDetailsTab,
  AIEmployeesTab,
  TransactionsTab,
  AgentDetailsView,
};