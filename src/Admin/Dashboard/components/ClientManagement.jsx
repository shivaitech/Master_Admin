import React, { useState, useEffect, useMemo, useCallback } from "react";
import toast from 'react-hot-toast';
import {
  RiTeamLine,
  RiSearchLine,
  RiUserLine,
  RiEyeLine,
  RiEditLine,
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
  RiCalendarLine,
  RiShoppingBagLine,
  RiSlackLine,
  RiSettingsLine,
  RiAddLine,
  RiListCheck2,
} from "react-icons/ri";
import { useTheme } from "../contexts/ThemeContext";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import { Target } from "lucide-react";

const ClientManagement = () => {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list or edit
  const [editData, setEditData] = useState(null);
  const [onboardingData, setOnboardingData] = useState({
    onboarded: [],
    pending: [],
    approved: [],
    rejected: [],
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const usersResponse = await shivaiApiService.getAllUsers();
          console.log("✅ Raw users response:", usersResponse);

          const userData = usersResponse.data || usersResponse || [];
          const allUsers = userData?.users || [];
          console.log("📊 Processed users data:", {
            userData,
            allUsers: allUsers.length > 0 ? allUsers.slice(0, 3) : "No users found",
            totalCount: allUsers.length,
          });

          if (!Array.isArray(allUsers)) {
            console.warn("⚠️ Users data is not an array:", allUsers);
            setUsers([]);
            setOnboardingData({
              pending: [],
              onboarded: [],
            });
            return;
          }

          // Categorize users based on onboarding status
          const categorizedData = {
            pending: [],
            onboarded: [],
            approved: [],
          };

          console.log("Starting user categorization...", allUsers);
          allUsers?.forEach((user) => {
            const clientData = {
              _id: user?.id,
              userData: user,
              company_basics: {
                name: user?.onboarding?.company_name || user?.fullName || "Unknown",
                company_email: user?.onboarding?.company_email || user?.email,
                company_size: user?.onboarding?.address || user?.address || "Unknown",
                industry: [user?.onboarding?.region || "Not specified"],
              },
              plan_details: {
                type: user?.onboarding?.plan_type || user?.plan_type || "Selected",
              },
              ai_employees: user?.onboarding?.ai_employees || Array.from(
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
                website_url: "",
                social_links: { linkedin: "" },
                faqs_text: "",
                uploaded_files: [],
              },
              deployment_targets: {
                channels: [],
              },
              instructions: {
                dos_and_donts: "",
                fallback_contacts: "",
              },
              targets: {
                success_goals: "",
                success_metrics: "",
              },
            };

            if (user?.isApproved) {
              categorizedData.approved.push(clientData);
            } else if (!user?.isOnboarded) {
              categorizedData.pending.push(clientData);
            } else {
              categorizedData.onboarded.push(clientData);
            }
          });

          console.log("Categorized data:", categorizedData);

          setOnboardingData({
            pending: categorizedData.pending,
            onboarded: categorizedData.onboarded,
            approved: categorizedData.approved,
          });

          setUsers(allUsers);
        } catch (userError) {
          console.error("Failed to fetch users:", userError);
          setUsers([]);
          setOnboardingData({
            onboarded: [],
            pending: [],
          });
        }
      } catch (error) {
        console.error("General error fetching data:", error);
        setOnboardingData({
          onboarded: [],
          pending: [],
        });
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoized calculations
  const getClientsForTab = useMemo(() => {
    const onboardingClients = onboardingData[activeTab] || [];

    let filteredClients = onboardingClients;
    if (searchQuery) {
      filteredClients = onboardingClients.filter((client) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          client.company_basics?.name?.toLowerCase().includes(searchLower) ||
          client.company_basics?.company_email?.toLowerCase().includes(searchLower) ||
          client.userData?.fullName?.toLowerCase().includes(searchLower) ||
          client.userData?.email?.toLowerCase().includes(searchLower)
        );
      });
    }

    return filteredClients;
  }, [onboardingData, activeTab, searchQuery]);

  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    const totalItems = getClientsForTab.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return { totalItems, totalPages };
  }, [getClientsForTab, itemsPerPage]);

  // Get current page items
  const currentPageClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return getClientsForTab.slice(startIndex, endIndex);
  }, [getClientsForTab, currentPage, itemsPerPage]);

  // Update pagination state
  useEffect(() => {
    setTotalItems(paginationInfo.totalItems);
    setTotalPages(paginationInfo.totalPages);

    if (currentPage > paginationInfo.totalPages && paginationInfo.totalPages > 0) {
      setCurrentPage(1);
    }
  }, [paginationInfo, currentPage]);

  // Helper functions
  const getCount = (status) => {
    return (onboardingData[status] || []).length;
  };

  const getTotalOnboardingCount = () => {
    return (
      getCount("pending") +
      getCount("onboarded") +
      getCount("approved") +
      getCount("rejected")
    );
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

  const handleEditClient = async (client) => {
    try {
      console.log("🔍 handleEditClient called with client:", client);
      setLoading(true);
      setSelectedClient(client);

      if (client._id) {
        console.log(`🚀 Fetching onboarding data for user: ${client._id}`);
        const onboardingResponse = await shivaiApiService.getOnboardingByUserId(client._id);
        console.log("✅ Onboarding data response:", onboardingResponse);

        let clientWithDetails = client;
        if (onboardingResponse?.data) {
          clientWithDetails = {
            ...client,
            onboardingDetails: onboardingResponse.data,
          };
        } else {
          clientWithDetails = {
            ...client,
            onboardingDetails: { onboarding: null },
          };
        }

        // Create edit data structure
        const mappedEditData = {
          _id: clientWithDetails._id,
          company_basics: {
            name: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.name || clientWithDetails?.company_basics?.name || '',
            description: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.description || clientWithDetails?.company_basics?.description || '',
            company_email: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.company_email || clientWithDetails?.company_basics?.company_email || '',
            company_phone: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.company_phone || clientWithDetails?.company_basics?.company_phone || '',
            website: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.website || clientWithDetails?.company_basics?.website || '',
            address: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.address || clientWithDetails?.company_basics?.address || '',
            company_size: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.company_size || clientWithDetails?.company_basics?.company_size || '',
            industry: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.industry || clientWithDetails?.company_basics?.industry || [],
            linkedin_profile: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.linkedin_profile || clientWithDetails?.company_basics?.linkedin_profile || '',
            primary_region: {
              countries: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.primary_region?.countries || [],
              states: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.primary_region?.states || [],
              cities: clientWithDetails?.onboardingDetails?.onboarding?.company_basics?.primary_region?.cities || []
            }
          },
          ai_employees: (clientWithDetails?.onboardingDetails?.onboarding?.ai_employees || clientWithDetails?.ai_employees || []).map(emp => ({
            ...emp,
            knowledge_sources: {
              faqs_text: emp?.knowledge_sources?.faqs_text || '',
              uploaded_files: emp?.knowledge_sources?.uploaded_files || [],
              website_url: emp?.knowledge_sources?.website_url || '',
              social_links: emp?.knowledge_sources?.social_links || {},
              additional_sources: Array.isArray(emp?.knowledge_sources) 
                ? emp.knowledge_sources 
                : (emp?.knowledge_sources?.additional_sources || [])
            }
          })),
          plan_details: clientWithDetails?.onboardingDetails?.onboarding?.plan_details || clientWithDetails?.plan_details || {},
          deployment_targets: clientWithDetails?.onboardingDetails?.onboarding?.deployment_targets || clientWithDetails?.deployment_targets || {},
          deployment_service: clientWithDetails?.onboardingDetails?.onboarding?.deployment_service || clientWithDetails?.deployment_service || {},
          consent_options: clientWithDetails?.onboardingDetails?.onboarding?.consent_options || clientWithDetails?.consent_options || {},
          instructions: clientWithDetails?.onboardingDetails?.onboarding?.instructions || clientWithDetails?.instructions || {},
          targets: clientWithDetails?.onboardingDetails?.onboarding?.targets || clientWithDetails?.targets || {},
          userData: clientWithDetails?.userData
        };

        setEditData(mappedEditData);
        setViewMode("edit");
      } else {
        console.error("❌ No client._id available:", client);
        setError("Client ID not found");
      }
    } catch (error) {
      console.error("❌ Error fetching onboarding data:", error);
      setError(`Failed to fetch client data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedClient(null);
    setViewMode("list");
    setEditData(null);
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Saving edited data:", editData);

      // TODO: Add API call to update onboarding data
      // await shivaiApiService.updateOnboardingData(editData._id, editData);

      setOnboardingData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((client) =>
          client._id === editData?._id ? editData : client
        ),
      }));

      toast.success("Client data updated successfully!");
      handleBackToList();
    } catch (error) {
      console.error("Error saving client data:", error);
      toast.error("Failed to save client data");
    }
  };

  const handleCancelEdit = () => {
    handleBackToList();
  };

  const handleApproveClient = async (client) => {
    console.log("🚀 handleApproveClient called with client:", client);
    if (client?.isApproved) {
      toast.error('Client is already approved');
      return;
    }

    try {
      setActionLoading(true);
      toast.loading('Approving client...', { id: 'approve-toast' });

      const result = await shivaiApiService.approveClient(client._id);

      const updatedClient = {
        ...client,
        isApproved: true,
        status: 'approved',
        approvalDate: new Date().toISOString(),
      };

      setOnboardingData((prev) => ({
        ...prev,
        onboarded: prev.onboarded.filter((c) => c._id !== client._id),
        approved: [...(prev.approved || []), updatedClient],
      }));

      if (selectedClient?._id === client._id) {
        setSelectedClient(updatedClient);
      }

      toast.success(`${client?.company_basics?.name || 'Client'} approved successfully!`, { id: 'approve-toast' });
    } catch (error) {
      console.error("Error approving client:", error);
      toast.error('Failed to approve client. Please try again.', { id: 'approve-toast' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectClient = async (client) => {
    if (client?.isRejected) {
      toast.error('Client is already rejected');
      return;
    }

    const rejectionReason = 'Application rejected by admin';

    try {
      setActionLoading(true);
      toast.loading('Rejecting client...', { id: 'reject-toast' });

      const result = await shivaiApiService.rejectClient(client._id, rejectionReason.trim());

      const rejectedClient = {
        ...client,
        isRejected: true,
        status: 'rejected',
        rejectionReason: rejectionReason.trim(),
        rejectionDate: new Date().toISOString(),
      };

      setOnboardingData((prev) => ({
        ...prev,
        onboarded: prev.onboarded.filter((c) => c._id !== client._id),
        approved: prev.approved.filter((c) => c._id !== client._id),
        rejected: [...(prev.rejected || []), rejectedClient],
      }));

      if (selectedClient && selectedClient._id === client._id) {
        handleBackToList();
      }

      toast.success(`${client?.company_basics?.name || 'Client'} rejected successfully!`, { id: 'reject-toast' });
    } catch (error) {
      console.error("Error rejecting client:", error);
      toast.error('Failed to reject client. Please try again.', { id: 'reject-toast' });
    } finally {
      setActionLoading(false);
    }
  };

  // Form field update functions
  const updateEditData = (path, value) => {
    setEditData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const updateIndustry = (industries) => {
    setEditData((prev) => ({
      ...prev,
      company_basics: {
        ...prev?.company_basics,
        industry: industries,
      },
    }));
  };

  const addChannel = (channel) => {
    if (channel && !editData?.deployment_targets?.channels?.includes(channel)) {
      setEditData((prev) => ({
        ...prev,
        deployment_targets: {
          ...prev?.deployment_targets,
          channels: [...(prev?.deployment_targets?.channels || []), channel],
        },
      }));
    }
  };

  const removeChannel = (channel) => {
    setEditData((prev) => ({
      ...prev,
      deployment_targets: {
        ...prev?.deployment_targets,
        channels: (prev?.deployment_targets?.channels || []).filter((c) => c !== channel),
      },
    }));
  };

  // AI Employee management
  const addAIEmployee = () => {
    setEditData((prev) => ({
      ...prev,
      ai_employees: [
        ...(prev?.ai_employees || []),
        {
          name: "",
          type: "Assistant",
          template: "",
          preferred_language: "English",
          voice_gender: "Gender Neutral",
          agent_personality: "",
          voice_style: "",
          special_instructions: "",
          knowledge_sources: {
            faqs_text: '',
            uploaded_files: [],
            website_url: '',
            social_links: {},
            additional_sources: []
          },
          workflows: [],
          _id: `new_${Date.now()}`,
        },
      ],
    }));
  };

  const removeAIEmployee = (index) => {
    setEditData((prev) => ({
      ...prev,
      ai_employees: (prev?.ai_employees || []).filter((_, i) => i !== index),
    }));
  };

  const updateAIEmployee = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      ai_employees: (prev?.ai_employees || []).map((emp, i) =>
        i === index ? { ...emp, [field]: value } : emp
      ),
    }));
  };

  // Reusable form field component for edit mode
  const FormField = ({ label, value, onChange, type = "text", placeholder = "", rows, children, className = "" }) => {
    return (
      <div className={className}>
        <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-vertical`}
          />
        ) : type === "select" ? (
          children
        ) : (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        )}
      </div>
    );
  };

  // Loading state
  if (loading && viewMode === "list") {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${currentTheme.bg}`}>
        <div className={`${currentTheme.text} text-lg flex items-center gap-3`}>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          Loading client data...
        </div>
      </div>
    );
  }

  // Edit View
  if (viewMode === "edit" && editData) {
    return (
     <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
        {/* Header with Actions */}
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                onClick={handleCancelEdit}
                className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200`}
              >
                <RiArrowLeftLine className="w-5 h-5" />
                <span className="text-sm sm:text-base">Cancel</span>
              </button>
              <h2
                className={`text-xl md:text-2xl font-bold ${currentTheme.text} text-center sm:text-left`}
              >
                Edit: {editData?.company_basics?.name || "Client"}
              </h2>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleCancelEdit}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base`}
              >
                <RiCloseLine className="w-4 h-4" />
                <span className="hidden sm:inline">Cancel</span>
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 sm:flex-none admin-btn-primary px-3 sm:px-4 py-2 text-sm sm:text-base"
              >
                <RiCheckLine className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Edit Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Company Basics */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
          >
            <h3
              className={`text-base md:text-lg font-bold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
            >
              <RiBuildingLine className="w-4 h-4 md:w-5 md:h-5" />
              Company Basics
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  value={editData?.company_basics?.name || ""}
                  onChange={(e) =>
                    updateEditData("company_basics.name", e.target.value)
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Description
                </label>
                <textarea
                  value={editData?.company_basics?.description || ""}
                  onChange={(e) =>
                    updateEditData("company_basics.description", e.target.value)
                  }
                  rows={3}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Company Size
                </label>
                <select
                  value={editData?.company_basics?.company_size || ""}
                  onChange={(e) =>
                    updateEditData(
                      "company_basics.company_size",
                      e.target.value
                    )
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Industry (comma separated)
                </label>
                <input
                  type="text"
                  value={(editData?.company_basics?.industry || []).join(", ")}
                  onChange={(e) =>
                    updateIndustry(
                      e.target.value
                        .split(",")
                        .map((i) => i.trim())
                        .filter((i) => i)
                    )
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Technology, SaaS"
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Website
                </label>
                <input
                  type="url"
                  value={editData?.company_basics?.website || ""}
                  onChange={(e) =>
                    updateEditData("company_basics.website", e.target.value)
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Company Email
                </label>
                <input
                  type="email"
                  value={editData?.company_basics?.company_email || ""}
                  onChange={(e) =>
                    updateEditData(
                      "company_basics.company_email",
                      e.target.value
                    )
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Company Phone
                </label>
                <input
                  type="tel"
                  value={editData?.company_basics?.company_phone || ""}
                  onChange={(e) =>
                    updateEditData(
                      "company_basics.company_phone",
                      e.target.value
                    )
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={editData?.company_basics?.linkedin_profile || ""}
                  onChange={(e) =>
                    updateEditData(
                      "company_basics.linkedin_profile",
                      e.target.value
                    )
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Company Address
                </label>
                <input
                  type="text"
                  value={editData?.company_basics?.address || ""}
                  onChange={(e) =>
                    updateEditData(
                      "company_basics.address",
                      e.target.value
                    )
                  }
                  placeholder="Street, City, State, Country"
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Primary Region - Countries
                </label>
                <input
                  type="text"
                  value={(editData?.company_basics?.primary_region?.countries || []).join(", ")}
                  onChange={(e) => {
                    const countries = e.target.value.split(",").map(c => c.trim()).filter(c => c);
                    updateEditData("company_basics.primary_region.countries", countries);
                  }}
                  placeholder="USA, Canada, UK (comma separated)"
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Primary Region - States/Provinces
                </label>
                <input
                  type="text"
                  value={(editData?.company_basics?.primary_region?.states || []).join(", ")}
                  onChange={(e) => {
                    const states = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                    updateEditData("company_basics.primary_region.states", states);
                  }}
                  placeholder="California, New York, Texas (comma separated)"
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Primary Region - Cities
                </label>
                <input
                  type="text"
                  value={(editData?.company_basics?.primary_region?.cities || []).join(", ")}
                  onChange={(e) => {
                    const cities = e.target.value.split(",").map(c => c.trim()).filter(c => c);
                    updateEditData("company_basics.primary_region.cities", cities);
                  }}
                  placeholder="New York, Los Angeles, Chicago (comma separated)"
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>
          </div>

          {/* Plan Details */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
          >
            <h3
              className={`text-base md:text-lg font-bold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
            >
              <RiBankCardLine className="w-4 h-4 md:w-5 md:h-5" />
              Plan Details
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Plan Type
                </label>
                <select
                  value={editData?.plan_details?.type || ""}
                  onChange={(e) =>
                    updateEditData("plan_details.type", e.target.value)
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="Starter Plan">Starter Plan</option>
                  <option value="Professional Plan">Professional Plan</option>
                  <option value="Advanced Plan">Advanced Plan</option>
                  <option value="Enterprise Plan">Enterprise Plan</option>
                </select>
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Monthly Price ($)
                </label>
                <input
                  type="number"
                  value={editData?.plan_details?.monthly_price || ""}
                  onChange={(e) =>
                    updateEditData(
                      "plan_details.monthly_price",
                      parseFloat(e.target.value)
                    )
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  AI Employee Limit
                </label>
                <input
                  type="number"
                  value={editData?.plan_details?.ai_employee_limit || ""}
                  onChange={(e) =>
                    updateEditData(
                      "plan_details.ai_employee_limit",
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div className={`pt-4 border-t ${currentTheme.border}`}>
                <h4 className={`text-sm font-bold ${currentTheme.text} mb-3`}>
                  Billing Contact
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData?.plan_details?.billing_contact?.name || ""}
                    onChange={(e) =>
                      updateEditData(
                        "plan_details.billing_contact.name",
                        e.target.value
                      )
                    }
                    placeholder="Contact Name"
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <input
                    type="email"
                    value={editData?.plan_details?.billing_contact?.email || ""}
                    onChange={(e) =>
                      updateEditData(
                        "plan_details.billing_contact.email",
                        e.target.value
                      )
                    }
                    placeholder="Contact Email"
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <input
                    type="tel"
                    value={editData?.plan_details?.billing_contact?.phone || ""}
                    onChange={(e) =>
                      updateEditData(
                        "plan_details.billing_contact.phone",
                        e.target.value
                      )
                    }
                    placeholder="Contact Phone"
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <input
                    type="text"
                    value={editData?.plan_details?.billing_contact?.company_name || ""}
                    onChange={(e) =>
                      updateEditData(
                        "plan_details.billing_contact.company_name",
                        e.target.value
                      )
                    }
                    placeholder="Billing Company Name (if different)"
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>
              </div>

              <div className={`pt-4 border-t ${currentTheme.border}`}>
                <h4 className={`text-sm font-bold ${currentTheme.text} mb-3`}>
                  Billing Address
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={
                      editData?.plan_details?.billing_address?.street || ""
                    }
                    onChange={(e) =>
                      updateEditData(
                        "plan_details.billing_address.street",
                        e.target.value
                      )
                    }
                    placeholder="Street Address"
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={
                        editData?.plan_details?.billing_address?.city || ""
                      }
                      onChange={(e) =>
                        updateEditData(
                          "plan_details.billing_address.city",
                          e.target.value
                        )
                      }
                      placeholder="City"
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                    <input
                      type="text"
                      value={
                        editData?.plan_details?.billing_address?.state || ""
                      }
                      onChange={(e) =>
                        updateEditData(
                          "plan_details.billing_address.state",
                          e.target.value
                        )
                      }
                      placeholder="State"
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={
                        editData?.plan_details?.billing_address?.postal_code ||
                        ""
                      }
                      onChange={(e) =>
                        updateEditData(
                          "plan_details.billing_address.postal_code",
                          e.target.value
                        )
                      }
                      placeholder="Postal Code"
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                    <input
                      type="text"
                      value={
                        editData?.plan_details?.billing_address?.country || ""
                      }
                      onChange={(e) =>
                        updateEditData(
                          "plan_details.billing_address.country",
                          e.target.value
                        )
                      }
                      placeholder="Country"
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* AI Employees */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl lg:col-span-2`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <h3
                className={`text-lg md:text-xl font-bold ${currentTheme.text} flex items-center gap-3`}
              >
                <div className={`p-2 rounded-lg ${currentTheme.activeBg}`}>
                  <RiUserVoiceLine className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <span>AI Employees</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${currentTheme.searchBg} ${currentTheme.textSecondary}`}>
                    {(editData?.ai_employees || []).length} configured
                  </span>
                </div>
              </h3>
              <button
                onClick={addAIEmployee}
                className="admin-btn-primary px-4 py-2.5 text-sm w-full sm:w-auto flex items-center justify-center gap-2 font-medium"
              >
                <RiUserAddLine className="w-4 h-4" />
                Add AI Employee
              </button>
            </div>
            <div className="space-y-6">
              {(editData?.ai_employees || []).length === 0 ? (
                <div className={`text-center py-12 border-2 border-dashed ${currentTheme.border} rounded-xl`}>
                  <div className={`p-3 rounded-full ${currentTheme.searchBg} w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <RiUserVoiceLine className={`w-8 h-8 ${currentTheme.textSecondary}`} />
                  </div>
                  <h4 className={`text-lg font-medium ${currentTheme.text} mb-2`}>No AI Employees Yet</h4>
                  <p className={`${currentTheme.textSecondary} text-sm mb-4`}>
                    Add your first AI employee to get started with automation
                  </p>
                  <button
                    onClick={addAIEmployee}
                    className="admin-btn-primary px-6 py-2.5 text-sm font-medium"
                  >
                    <RiUserAddLine className="w-4 h-4 mr-2" />
                    Create First AI Employee
                  </button>
                </div>
              ) : (
                (editData?.ai_employees || []).map((ai, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border ${currentTheme.border} ${currentTheme.searchBg} shadow-sm`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}>
                          <RiRobotLine className={`w-5 h-5 ${currentTheme.text}`} />
                        </div>
                        <div>
                          <h4 className={`${currentTheme.text} font-bold text-lg`}>
                            {ai?.name || `AI Employee #${idx + 1}`}
                          </h4>
                          <p className={`${currentTheme.textSecondary} text-sm`}>
                            {ai?.type || 'Assistant'} • {ai?.preferred_language || 'English'}
                          </p>
                        </div>
                      </div>
                      {(editData?.ai_employees || []).length > 1 && (
                        <button
                          onClick={() => removeAIEmployee(idx)}
                          className={`p-2 rounded-lg ${currentTheme.hover} text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2`}
                          title="Remove AI Employee"
                        >
                          <RiCloseLine className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        value={ai?.name || ""}
                        onChange={(e) =>
                          updateAIEmployee(idx, "name", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Type
                      </label>
                      <input
                        type="text"
                        value={ai?.type || ""}
                        onChange={(e) =>
                          updateAIEmployee(idx, "type", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Template
                      </label>
                      <input
                        type="text"
                        value={ai?.template || ""}
                        onChange={(e) =>
                          updateAIEmployee(idx, "template", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Language
                      </label>
                      <input
                        type="text"
                        value={ai?.preferred_language || ""}
                        onChange={(e) =>
                          updateAIEmployee(
                            idx,
                            "preferred_language",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Voice Gender
                      </label>
                      <select
                        value={ai?.voice_gender || ""}
                        onChange={(e) =>
                          updateAIEmployee(idx, "voice_gender", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Gender Neutral">Gender Neutral</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Personality
                      </label>
                      <input
                        type="text"
                        value={ai?.agent_personality || ""}
                        onChange={(e) =>
                          updateAIEmployee(
                            idx,
                            "agent_personality",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Voice Style
                      </label>
                      <input
                        type="text"
                        value={ai?.voice_style || ""}
                        onChange={(e) =>
                          updateAIEmployee(
                            idx,
                            "voice_style",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Professional, Friendly, Energetic"
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Special Instructions
                      </label>
                      <textarea
                        value={ai?.special_instructions || ""}
                        onChange={(e) =>
                          updateAIEmployee(
                            idx,
                            "special_instructions",
                            e.target.value
                          )
                        }
                        rows={2}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>

                    {/* Workflows Section */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase block`}
                        >
                          <RiFileTextLine className="w-4 h-4 inline mr-1" />
                          Workflow Integrations ({(ai?.workflows || []).length})
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            // Add a new workflow integration
                            setEditData(prev => ({
                              ...prev,
                              ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                i === idx ? {
                                  ...emp,
                                  workflows: [...(emp.workflows || []), {
                                    name: 'WhatsApp Business',
                                    instruction: 'Configure WhatsApp Business integration'
                                  }]
                                } : emp
                              )
                            }));
                          }}
                          className={`px-3 py-1 rounded-lg text-xs bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors flex items-center gap-1`}
                        >
                          <RiAddLine className="w-3 h-3" />
                          Add Workflow
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {(ai?.workflows || []).length > 0 ? (
                          (ai?.workflows || []).map((workflow, workflowIdx) => (
                            <div
                              key={workflowIdx}
                              className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h5 className={`text-sm font-medium ${currentTheme.text} flex items-center gap-2`}>
                                  <RiSettingsLine className="w-4 h-4" />
                                  Workflow #{workflowIdx + 1}
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Remove this workflow
                                    setEditData(prev => ({
                                      ...prev,
                                      ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                        i === idx ? {
                                          ...emp,
                                          workflows: (emp.workflows || []).filter((_, wIdx) => wIdx !== workflowIdx)
                                        } : emp
                                      )
                                    }));
                                  }}
                                  className={`p-1 rounded ${currentTheme.hover} text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
                                >
                                  <RiCloseLine className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 gap-3">
                                <div>
                                  <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}>
                                    Integration Type
                                  </label>
                                  <select
                                    value={workflow?.name || ''}
                                    onChange={(e) => {
                                      setEditData(prev => ({
                                        ...prev,
                                        ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                          i === idx ? {
                                            ...emp,
                                            workflows: (emp.workflows || []).map((w, wIdx) => 
                                              wIdx === workflowIdx ? {
                                                ...w,
                                                name: e.target.value
                                              } : w
                                            )
                                          } : emp
                                        )
                                      }));
                                    }}
                                    className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                  >
                                    <option value="">Select Integration</option>
                                    <option value="WhatsApp Business">WhatsApp Business</option>
                                    <option value="Gmail">Gmail</option>
                                    <option value="Webhooks">Webhooks</option>
                                    <option value="Google Calendar">Google Calendar</option>
                                    <option value="Calendly">Calendly</option>
                                    <option value="Google Sheets">Google Sheets</option>
                                    <option value="Zoho CRM">Zoho CRM</option>
                                    <option value="Odoo">Odoo</option>
                                    <option value="HubSpot">HubSpot</option>
                                    <option value="Salesforce CRM">Salesforce CRM</option>
                                    <option value="Zendesk">Zendesk</option>
                                    <option value="Shopify">Shopify</option>
                                    <option value="Slack">Slack</option>
                                    <option value="Zapier">Zapier</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}>
                                    Integration Instructions
                                  </label>
                                  <textarea
                                    value={workflow?.instruction || ''}
                                    onChange={(e) => {
                                      setEditData(prev => ({
                                        ...prev,
                                        ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                          i === idx ? {
                                            ...emp,
                                            workflows: (emp.workflows || []).map((w, wIdx) => 
                                              wIdx === workflowIdx ? {
                                                ...w,
                                                instruction: e.target.value
                                              } : w
                                            )
                                          } : emp
                                        )
                                      }));
                                    }}
                                    rows={3}
                                    placeholder="Enter specific instructions for this workflow integration..."
                                    className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                  />
                                </div>
                                
                                {workflow?.name && (
                                  <div className={`p-3 rounded-lg ${currentTheme.searchBg} border ${currentTheme.border}`}>
                                    <div className="flex items-start gap-3">
                                      <div className={`p-2 rounded-lg ${currentTheme.activeBg}`}>
                                        {workflow?.name === 'WhatsApp Business' && <RiWhatsappLine className="w-4 h-4 text-green-600" />}
                                        {workflow?.name === 'Gmail' && <RiMailLine className="w-4 h-4 text-blue-600" />}
                                        {workflow?.name === 'Google Calendar' && <RiCalendarLine className="w-4 h-4 text-blue-600" />}
                                        {workflow?.name === 'Shopify' && <RiShoppingBagLine className="w-4 h-4 text-green-600" />}
                                        {workflow?.name === 'Slack' && <RiSlackLine className="w-4 h-4 text-purple-600" />}
                                        {!['WhatsApp Business', 'Gmail', 'Google Calendar', 'Shopify', 'Slack'].includes(workflow?.name) && 
                                          <RiSettings4Line className="w-4 h-4 text-gray-600" />
                                        }
                                      </div>
                                      <div className="flex-1">
                                        <h6 className={`text-sm font-medium ${currentTheme.text} mb-1`}>
                                          {workflow?.name} Integration
                                        </h6>
                                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                                          {workflow?.instruction || 'No instructions provided'}
                                        </p>
                                        <div className="mt-2">
                                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                                            Configured
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className={`text-center py-6 border-2 border-dashed ${currentTheme.border} rounded-lg`}>
                            <RiFileTextLine className={`w-8 h-8 mx-auto mb-2 ${currentTheme.textSecondary} opacity-50`} />
                            <p className={`${currentTheme.textSecondary} text-sm font-medium mb-1`}>No workflow integrations configured</p>
                            <p className={`${currentTheme.textSecondary} text-xs mb-3 opacity-75`}>
                              Add integrations like WhatsApp, Gmail, CRM systems to enhance this AI employee
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                // Add first workflow
                                setEditData(prev => ({
                                  ...prev,
                                  ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                    i === idx ? {
                                      ...emp,
                                      workflows: [{
                                        name: '',
                                        instruction: ''
                                      }]
                                    } : emp
                                  )
                                }));
                              }}
                              className={`px-4 py-2 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-2 mx-auto`}
                            >
                              <RiAddLine className="w-4 h-4" />
                              Add Your First Workflow
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Knowledge Sources Section within AI Employee */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase block`}
                        >
                          <RiBookOpenLine className="w-4 h-4 inline mr-1" />
                          Knowledge Sources
                        </label>
                      </div>
                      
                      {/* Website URL Section */}
                      <div className="mb-4 p-4 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg}">
                        <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                          <RiGlobalLine className="w-4 h-4 inline mr-1" />
                          Website URL
                        </label>
                        <input
                          type="url"
                          value={ai?.knowledge_sources?.website_url || ""}
                          onChange={(e) => {
                            setEditData(prev => ({
                              ...prev,
                              ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                i === idx ? {
                                  ...emp,
                                  knowledge_sources: {
                                    ...emp.knowledge_sources,
                                    website_url: e.target.value
                                  }
                                } : emp
                              )
                            }));
                          }}
                          placeholder="https://example.com"
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>
                      
                      {/* FAQs Text Section */}
                      <div className="mb-4 p-4 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg}">
                        <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                          <RiQuestionLine className="w-4 h-4 inline mr-1" />
                          FAQs / Knowledge Text
                        </label>
                        <textarea
                          value={ai?.knowledge_sources?.faqs_text || ""}
                          onChange={(e) => {
                            setEditData(prev => ({
                              ...prev,
                              ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                i === idx ? {
                                  ...emp,
                                  knowledge_sources: {
                                    ...emp.knowledge_sources,
                                    faqs_text: e.target.value
                                  }
                                } : emp
                              )
                            }));
                          }}
                          rows={4}
                          placeholder="Enter frequently asked questions and answers, or any text-based knowledge..."
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>
                      
                      {/* Uploaded Files Section */}
                      <div className="mb-4 p-4 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg}">
                        <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                          <RiFileTextLine className="w-4 h-4 inline mr-1" />
                          Uploaded Files ({(ai?.knowledge_sources?.uploaded_files || []).length})
                        </label>
                        
                        {(ai?.knowledge_sources?.uploaded_files || []).length > 0 ? (
                          <div className="space-y-2">
                            {(ai?.knowledge_sources?.uploaded_files || []).map((file, fileIdx) => (
                              <div
                                key={fileIdx}
                                className={`flex items-center justify-between p-3 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <RiFileTextLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${currentTheme.text} truncate`}>
                                      {file.original_name || file.filename || file.name || 'Unnamed File'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      {file.file_size && (
                                        <span className={`text-xs ${currentTheme.textSecondary}`}>
                                          {(file.file_size / 1024).toFixed(1)} KB
                                        </span>
                                      )}
                                      {file.file_type && (
                                        <span className={`text-xs ${currentTheme.textSecondary} bg-gray-100 px-2 py-0.5 rounded`}>
                                          {file.file_type}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleViewFile(file)}
                                    className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.textSecondary} hover:text-blue-600 transition-colors`}
                                    title="View File"
                                  >
                                    <RiEyeLine className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(file)}
                                    className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.textSecondary} hover:text-green-600 transition-colors`}
                                    title="Download File"
                                  >
                                    <RiDownloadLine className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      // Remove file from uploaded_files array
                                      setEditData(prev => ({
                                        ...prev,
                                        ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                          i === idx ? {
                                            ...emp,
                                            knowledge_sources: {
                                              ...emp.knowledge_sources,
                                              uploaded_files: (emp.knowledge_sources?.uploaded_files || []).filter((_, fIdx) => fIdx !== fileIdx)
                                            }
                                          } : emp
                                        )
                                      }));
                                    }}
                                    className={`p-2 rounded-lg ${currentTheme.hover} text-red-500 hover:bg-red-50 transition-colors`}
                                    title="Remove File"
                                  >
                                    <RiCloseLine className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className={`text-center py-6 border-2 border-dashed ${currentTheme.border} rounded-lg`}>
                            <RiFileTextLine className={`w-8 h-8 mx-auto mb-2 ${currentTheme.textSecondary} opacity-50`} />
                            <p className={`${currentTheme.textSecondary} text-sm`}>No files uploaded yet</p>
                            <p className={`${currentTheme.textSecondary} text-xs mt-1 opacity-75`}>Files will appear here when uploaded during onboarding</p>
                          </div>
                        )}
                        
                        {/* File Upload Input */}
                        <div className="mt-3">
                          <input
                            type="file"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 0) {
                                // For now, just add file info to the list (actual upload would happen on save)
                                const newFiles = files.map(file => ({
                                  name: file.name,
                                  original_name: file.name,
                                  file_size: file.size,
                                  file_type: file.type,
                                  // Mark as pending upload
                                  pending_upload: true
                                }));
                                
                                setEditData(prev => ({
                                  ...prev,
                                  ai_employees: (prev?.ai_employees || []).map((emp, i) => 
                                    i === idx ? {
                                      ...emp,
                                      knowledge_sources: {
                                        ...emp.knowledge_sources,
                                        uploaded_files: [
                                          ...(emp.knowledge_sources?.uploaded_files || []),
                                          ...newFiles
                                        ]
                                      }
                                    } : emp
                                  )
                                }));
                                
                                // Clear the input
                                e.target.value = '';
                              }
                            }}
                            className={`w-full px-3 py-2 text-sm border-2 border-dashed ${currentTheme.border} rounded-lg ${currentTheme.cardBg} ${currentTheme.text} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                            accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
                          />
                          <p className={`text-xs ${currentTheme.textSecondary} mt-2`}>
                            Supported formats: PDF, DOC, DOCX, TXT, CSV, XLSX
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Employee-specific sections */}
                  <div className="mt-8 space-y-6">
                   

                    {/* Instructions & Guidelines Section */}
                    <div className={`border-t ${currentTheme.border} pt-6`}>
                      <h4 className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}>
                        <RiListCheck2 className="w-4 h-4 text-green-600" />
                        Instructions & Guidelines
                        <span className={`text-xs ${currentTheme.textSecondary} font-normal`}>Set behavior guidelines</span>
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Do's and Don'ts
                          </label>
                          <textarea
                            value={ai?.instructions?.dos_donts || ""}
                            onChange={(e) => updateAIEmployee(idx, "instructions.dos_donts", e.target.value)}
                            rows={4}
                            placeholder="Be professional, Don't share personal information..."
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                        </div>
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Fallback Contacts
                          </label>
                          <input
                            type="text"
                            value={ai?.instructions?.fallback_contacts || ""}
                            onChange={(e) => updateAIEmployee(idx, "instructions.fallback_contacts", e.target.value)}
                            placeholder="atharkatheri@gmail.com"
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Success Targets Section */}
                    <div className={`border-t ${currentTheme.border} pt-6`}>
                      <h4 className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}>
                        <Target className="w-4 h-4 text-orange-600" />
                        Success Targets
                        <span className={`text-xs ${currentTheme.textSecondary} font-normal`}>Define success metrics</span>
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            What Success Looks Like
                          </label>
                          <textarea
                            value={ai?.success_targets?.description || ""}
                            onChange={(e) => updateAIEmployee(idx, "success_targets.description", e.target.value)}
                            rows={3}
                            placeholder="Lead qualification, booking appointments, FAQ deflection..."
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                        </div>
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Success Metrics
                          </label>
                          <div className="space-y-2">
                            {(ai?.success_targets?.metrics || [""]).map((metric, metricIdx) => (
                              <div key={metricIdx} className="flex gap-2">
                                <input
                                  type="text"
                                  value={metric}
                                  onChange={(e) => {
                                    const newMetrics = [...(ai?.success_targets?.metrics || [])];
                                    newMetrics[metricIdx] = e.target.value;
                                    updateAIEmployee(idx, "success_targets.metrics", newMetrics);
                                  }}
                                  placeholder="80% FAQ resolution rate"
                                  className={`flex-1 px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                />
                                <button
                                  onClick={() => {
                                    const newMetrics = (ai?.success_targets?.metrics || []).filter((_, i) => i !== metricIdx);
                                    updateAIEmployee(idx, "success_targets.metrics", newMetrics);
                                  }}
                                  className="px-2 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                  <RiCloseLine className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newMetrics = [...(ai?.success_targets?.metrics || []), ""];
                                updateAIEmployee(idx, "success_targets.metrics", newMetrics);
                              }}
                              className={`flex items-center gap-2 px-3 py-2 border-2 border-dashed ${currentTheme.border} rounded-lg ${currentTheme.text} hover:bg-opacity-50 transition-colors text-sm`}
                            >
                              <RiAddLine className="w-4 h-4" />
                              Add Metric
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deployment Configuration Section */}
                    <div className={`border-t ${currentTheme.border} pt-6`}>
                      <h4 className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}>
                        <RiRocketLine className="w-4 h-4 text-purple-600" />
                        Deployment Configuration
                        <span className={`text-xs ${currentTheme.textSecondary} font-normal`}>Choose deployment options</span>
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Service Type
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <label className={`flex items-center gap-3 p-3 border ${currentTheme.border} rounded-lg cursor-pointer transition-colors ${ai?.deployment?.service_type === 'shivai' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20' : ''}`}>
                              <input
                                type="radio"
                                name={`service_type_${idx}`}
                                checked={ai?.deployment?.service_type === 'shivai'}
                                onChange={(e) => updateAIEmployee(idx, "deployment.service_type", "shivai")}
                                className="w-4 h-4 text-blue-500"
                              />
                              <span className="text-sm">Shivai</span>
                            </label>
                            <label className={`flex items-center gap-3 p-3 border ${currentTheme.border} rounded-lg cursor-pointer transition-colors ${ai?.deployment?.service_type === 'self' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20' : ''}`}>
                              <input
                                type="radio"
                                name={`service_type_${idx}`}
                                checked={ai?.deployment?.service_type === 'self'}
                                onChange={(e) => updateAIEmployee(idx, "deployment.service_type", "self")}
                                className="w-4 h-4 text-blue-500"
                              />
                              <span className="text-sm">Self-managed</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Channels
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['Website', 'WhatsApp', 'Mobile App'].map((channel) => (
                              <label key={channel} className={`flex items-center gap-2 px-3 py-2 border ${currentTheme.border} rounded-full cursor-pointer text-sm transition-colors ${(ai?.deployment?.channels || []).includes(channel) ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20' : ''}`}>
                                <input
                                  type="checkbox"
                                  checked={(ai?.deployment?.channels || []).includes(channel)}
                                  onChange={(e) => {
                                    const channels = ai?.deployment?.channels || [];
                                    const newChannels = e.target.checked 
                                      ? [...channels, channel]
                                      : channels.filter(c => c !== channel);
                                    updateAIEmployee(idx, "deployment.channels", newChannels);
                                  }}
                                  className="w-3 h-3 text-blue-500"
                                />
                                {channel}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Deployment Notes
                          </label>
                          <textarea
                            value={ai?.deployment?.notes || ""}
                            onChange={(e) => updateAIEmployee(idx, "deployment.notes", e.target.value)}
                            rows={3}
                            placeholder="Phase 1: Website implementation..."
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Consent & Privacy Options Section */}
                    <div className={`border-t ${currentTheme.border} pt-6`}>
                      <h4 className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}>
                        <RiShieldCheckLine className="w-4 h-4 text-gray-600" />
                        Consent & Privacy Options
                        <span className={`text-xs ${currentTheme.textSecondary} font-normal`}>Privacy settings</span>
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={ai?.privacy_options?.recording_enabled || false}
                              onChange={(e) => updateAIEmployee(idx, "privacy_options.recording_enabled", e.target.checked)}
                              className="w-4 h-4 text-blue-500 rounded"
                            />
                            <span className="text-sm">Recording Enabled</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={ai?.privacy_options?.transcript_email || false}
                              onChange={(e) => updateAIEmployee(idx, "privacy_options.transcript_email", e.target.checked)}
                              className="w-4 h-4 text-blue-500 rounded"
                            />
                            <span className="text-sm">Transcript Email Opt-in</span>
                          </label>
                        </div>
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Privacy Notes
                          </label>
                          <input
                            type="text"
                            value={ai?.privacy_options?.privacy_notes || ""}
                            onChange={(e) => updateAIEmployee(idx, "privacy_options.privacy_notes", e.target.value)}
                            placeholder="Privacy enabled"
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
      {/* Stats Cards - Horizontal Scroll on Mobile */}
      <div className="relative -mx-2 sm:mx-0">
        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-2 sm:px-0 snap-x snap-mandatory">
          {/* Total Clients Card */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 md:p-6 shadow-lg min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0`}>
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}>
                <RiTeamLine className={`w-5 h-5 md:w-6 md:h-6 ${currentTheme.textSecondary}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-blue-500">Total</span>
            </div>
            <h3 className={`text-2xl md:text-3xl font-semibold ${currentTheme.text} mb-1 md:mb-2`}>
              {getCount("pending") + getCount("onboarded") + getCount("approved")}
            </h3>
            <p className={`text-xs md:text-sm font-medium ${currentTheme.text}`}>All Clients</p>
          </div>

          {/* Pending Clients Card */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 md:p-6 shadow-lg min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0`}>
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}>
                <RiTimeLine className={`w-5 h-5 md:w-6 md:h-6 ${currentTheme.textSecondary}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-yellow-500">Pending</span>
            </div>
            <h3 className={`text-2xl md:text-3xl font-semibold ${currentTheme.text} mb-1 md:mb-2`}>{getCount("pending")}</h3>
            <p className={`text-xs md:text-sm font-medium ${currentTheme.text}`}>Awaiting Review</p>
          </div>

          {/* Active Clients Card */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 md:p-6 shadow-lg min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0`}>
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}>
                <RiCheckLine className={`w-5 h-5 md:w-6 md:h-6 ${currentTheme.textSecondary}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-green-500">Active</span>
            </div>
            <h3 className={`text-2xl md:text-3xl font-semibold ${currentTheme.text} mb-1 md:mb-2`}>{getCount("approved")}</h3>
            <p className={`text-xs md:text-sm font-medium ${currentTheme.text}`}>Approved Clients</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 md:p-6 shadow-lg`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <h2 className={`text-lg md:text-xl font-semibold ${currentTheme.text} flex items-center gap-2`}>
              <RiTeamLine className="w-4 h-4 md:w-5 md:h-5" />
              Client Requests
            </h2>
            <p className={`${currentTheme.textSecondary} text-xs md:text-sm mt-1`}>
              ({getCount("pending") + getCount("onboarded")} total)
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
              <RiSearchLine className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full sm:w-48 md:w-64 pl-9 pr-3 py-2 text-sm rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 mb-4 md:mb-6 border-b ${currentTheme.border} overflow-x-auto scrollbar-hide -mx-3 sm:mx-0 px-3 sm:px-0`}>
          {["pending", "onboarded", "approved", "rejected"].map((tab) => (
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
                {tab === "pending" && <RiTimeLine className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                {tab === "onboarded" && <RiCheckLine className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                {tab === "approved" && <RiCheckDoubleLine className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                {tab === "rejected" && <RiCloseLine className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                <span className="capitalize text-sm md:text-base">{tab}</span>
                <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs ${
                  activeTab === tab
                    ? `${currentTheme.activeBg} ${currentTheme.text}`
                    : `${currentTheme.textSecondary}`
                }`}>
                  {getCount(tab)}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Client List */}
        <div className="space-y-3 md:space-y-4">
          {currentPageClients.length === 0 ? (
            <div className={`text-center py-8 md:py-12 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}>
              <RiUserLine className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 ${currentTheme.textSecondary}`} />
              <h3 className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-1 md:mb-2`}>
                {searchQuery ? "No matching clients" : "No client requests yet"}
              </h3>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                {searchQuery ? "Try adjusting your search criteria" : "No client requests available"}
              </p>
            </div>
          ) : (
            currentPageClients.map((client) => (
              <div
                key={client._id}
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4 hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${currentTheme.activeBg} flex items-center justify-center flex-shrink-0`}>
                      <RiBuildingLine className={`w-4 h-4 md:w-5 md:h-5 ${currentTheme.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold ${currentTheme.text} text-base md:text-lg truncate`}>
                        {client?.userData?.fullName || client?.company_basics?.name || "Unknown"}
                      </h4>
                      <p className={`text-xs md:text-sm ${currentTheme.textSecondary} truncate`}>
                        {client?.userData?.email || client?.company_basics?.company_email || "No email"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEditClient(client)}
                    className={`p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 transition-all duration-200`}
                    title="Edit Client"
                  >
                    <RiEditLine className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase mb-0.5`}>Plan</p>
                    <p className={`${currentTheme.text} font-medium text-xs md:text-sm truncate`}>
                      {client?.userData?.onboarding?.plan_type || client?.plan_details?.type || "No plan"}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase`}>Company</p>
                    <p className={`${currentTheme.text} font-medium text-sm`}>
                      {client?.userData?.onboarding?.company_name || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase`}>Email</p>
                    <p className={`${currentTheme.text} font-medium text-sm truncate`}>
                      {client?.userData?.onboarding?.company_email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${currentTheme.textSecondary} uppercase`}>AI Employees</p>
                    <p className={`${currentTheme.text} font-medium text-sm`}>
                      {client?.userData?.onboarding?.ai_employee_count || (client?.ai_employees || []).length}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3 mt-4 md:mt-6 p-3 md:p-4 rounded-lg ${currentTheme.searchBg}`}>
            <div className={`text-xs md:text-sm ${currentTheme.textSecondary} text-center sm:text-left`}>
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
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

              <span className={`mx-2 md:mx-3 text-xs md:text-sm ${currentTheme.text}`}>
                {currentPage}/{totalPages}
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
    </div>
  );
};

export default ClientManagement;