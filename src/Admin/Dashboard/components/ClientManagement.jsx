import React, { useState, useEffect } from "react";
import {
  RiTeamLine,
  RiSearchLine,
  RiUserLine,
  RiEyeLine,
  RiEditLine,
  RiUserFollowLine,
  RiUserAddLine,
  RiBankCardLine,
  RiAlarmWarningLine,
  RiErrorWarningLine,
  RiDownloadLine,
  RiCheckLine,
  RiCheckDoubleLine,
  RiCloseLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiGlobalLine,
  RiPhoneLine,
  RiMailLine,
  RiLinkedinLine,
  RiBuildingLine,
  RiMapPinLine,
  RiUserVoiceLine,
  RiBookOpenLine,
  RiLightbulbLine,
  RiRocketLine,
  RiFileTextLine,
  RiQuestionLine,
  RiRobotLine,
  RiShieldCheckLine,
  RiCloudLine,
  RiBookLine,
  RiPriceTag3Line,
  RiInformationLine,
  RiCodeLine,
} from "react-icons/ri";
import {
  Users,
  UserCheck,
  UserPlus,
  Crown,
  CreditCard,
  Target,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";

const ClientManagement = () => {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); // onboarded, pending, approved
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list, detail, or edit
  const [editData, setEditData] = useState(null);
  const [onboardingData, setOnboardingData] = useState({
    onboarded: [],
    pending: [],
    approved: [],
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          // Fetch all users from the API
          console.log("🚀 Starting to fetch all users...");
          const usersResponse = await shivaiApiService.getAllUsers();
          console.log("✅ Raw users response:", usersResponse);

          const userData = usersResponse.data || usersResponse || [];
          const allUsers = userData?.users || [];
          console.log("📊 Processed users data:", {
            userData,
            allUsers: allUsers.length > 0 ? allUsers.slice(0, 3) : "No users found",
            totalCount: allUsers.length
          });

          // Ensure allUsers is an array before processing
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
            pending: [], // isOnBoarded: false - users who haven't completed onboarding
            onboarded: [], // isOnBoarded: true but not approved - users who completed onboarding
            approved: [], // isApproved: true - users who are approved
          };
 
          console.log("Starting user categorization...",allUsers);
          allUsers?.forEach((user) => {
            // Check approval status first, then onboarding status
            if (user?.isApproved) {
              // User is approved - goes to approved
              categorizedData.approved.push({
                _id: user?.id,
                userData: user, // Keep original user data
                company_basics: {
                  name: user?.onboarding?.company_name || user?.fullName || "Unknown",
                  company_email: user?.onboarding?.company_email || user?.email,
                  company_size: user?.onboarding?.address || user?.address || "Unknown",
                  industry: [user?.onboarding?.region || "Not specified"],
                },
                plan_details: {
                  type: user?.onboarding?.plan_type || user?.plan_type || "Selected",
                },
                ai_employees: user?.onboarding?.ai_employees || Array.from({ length: user?.onboarding?.ai_employee_count || 0 }, (_, i) => ({
                  id: `ai_${i + 1}`,
                  name: `AI Employee ${i + 1}`,
                  type: "Assistant",
                  status: "Active"
                })),
                isOnBoarded: user?.isOnBoarded || true,
                isApproved: user?.isApproved || true,
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
                userData: user, // Keep original user data for reference
              });
            } else if (!user?.isOnboarded) {
              // User hasn't completed onboarding - goes to pending
              categorizedData.pending.push({
                _id: user?.id,
                userData: user, // Keep original user data
                company_basics: {
                  name: user?.fullName || user?.company_name || "Unknown",
                  company_email: user?.email,
                  company_size: user?.address || "Unknown",
                  industry: ["Not specified"],
                },
                plan_details: {
                  type: user?.plan_type || "Not selected",
                },
                ai_employees: [],
                isOnBoarded: user?.isOnBoarded || false,
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
                isOnBoarded: user?.isOnBoarded,
                createdAt: user?.createdAt,
                userData: user, // Keep original user data for reference
              });
            } else {
              // User has completed onboarding - goes to onboarded
              categorizedData.onboarded.push({
                _id: user?.id,
                userData: user, // Keep original user data
                company_basics: {
                  name: user?.onboarding?.company_name || user?.fullName || "Unknown",
                  company_email: user?.onboarding?.company_email || user?.email,
                  company_size: user?.onboarding?.address || user?.address || "Unknown",
                  industry: [user?.onboarding?.region || "Not specified"],
                },
                plan_details: {
                  type: user?.onboarding?.plan_type || user?.plan_type || "Selected",
                },
                ai_employees: user?.onboarding?.ai_employees || Array.from({ length: user?.onboarding?.ai_employee_count || 0 }, (_, i) => ({
                  id: `ai_${i + 1}`,
                  name: `AI Employee ${i + 1}`,
                  type: "Assistant",
                  status: "Active"
                })),
                isOnBoarded: user?.isOnBoarded || true,
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
                isOnBoarded: user?.isOnBoarded,
                createdAt: user?.createdAt,
                userData: user, // Keep original user data for reference
              });
            }
          });

          console.log("Categorized data:", categorizedData);

          // Update state with categorized data
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

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-[400px] ${currentTheme.bg}`}
      >
        <div className={`${currentTheme.text} text-lg flex items-center gap-3`}>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          Loading client data...
        </div>
      </div>
    );
  }

  const getClientsForTab = () => {
    const onboardingClients = onboardingData[activeTab] || [];

    // Apply search filter if search term exists
    if (searchTerm) {
      return onboardingClients.filter((client) => {
        const searchLower = searchTerm.toLowerCase();
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

    // Return all clients for the active tab
    return onboardingClients;
  };

  // Helper function to safely get counts
  const getCount = (status) => {
    return (onboardingData[status] || []).length;
  };

  const getTotalOnboardingCount = () => {
    return (
      (onboardingData.pending || []).length +
      (onboardingData.onboarded || []).length +
      (onboardingData.approved || []).length
    );
  };

  const getTotalCount = () => {
    return getTotalOnboardingCount();
  };

  const handleViewClient = async (client) => {
    try {
      console.log("🔍 handleViewClient called with client:", client);
      setLoading(true);
      setSelectedClient(client);
      setViewMode("detail");

      if (client._id) {
        console.log(`🚀 Fetching onboarding data for user: ${client._id}`);
        console.log("📊 Client data available:", {
          id: client._id,
          email: client.userData?.email || client.company_basics?.company_email,
          name: client.userData?.fullName || client.company_basics?.name
        });
        
        const onboardingResponse = await shivaiApiService.getOnboardingByUserId(
          client._id
        );
        console.log("✅ Onboarding data response:", onboardingResponse);

        // Update the selected client with detailed onboarding data
        if (onboardingResponse?.data) {
          const updatedClient = {
            ...client,
            onboardingDetails: onboardingResponse.data,
          };
          console.log("📝 Updated client with onboarding details:", updatedClient);
          setSelectedClient(updatedClient);
        } else {
          console.warn("⚠️ No onboarding data found in response");
          setSelectedClient({
            ...client,
            onboardingDetails: { onboarding: null }
          });
        }
      } else {
        console.error("❌ No client._id available:", client);
        setError("Client ID not found");
      }
    } catch (error) {
      console.error("❌ Error fetching onboarding data:", error);
      console.error("❌ Error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      setError(`Failed to fetch detailed client data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedClient(null);
    setViewMode("list");
    setEditData(null);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setEditData(JSON.parse(JSON.stringify(client))); // Deep copy
    setViewMode("edit");
  };

  const handleSaveEdit = async () => {
    try {
      // Here you would call your API to save the edited data
      console.log("Saving edited data:", editData);

      // TODO: Add API call to update onboarding data
      // await shivaiApiService.updateOnboardingData(editData._id, editData);

      // For now, just update the local state
      setOnboardingData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((client) =>
          client._id === editData?._id ? editData : client
        ),
      }));

      // After successful save, go back to detail view
      setSelectedClient(editData);
      setViewMode("detail");
      // Show success message
      alert("Client data updated successfully!");
    } catch (error) {
      console.error("Error saving client data:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditData(null);
    setViewMode("detail");
  };

  // File handling functions for knowledge sources
  const handleViewFile = async (file) => {
    try {
      if (file.url || file.fileUrl) {
        // If file has a direct URL, open it in a new tab
        window.open(file.url || file.fileUrl, '_blank', 'noopener,noreferrer');
      } else if (file.id || file.fileId) {
        // If file has an ID, fetch it from the API and open
        const response = await shivaiApiService.getFile(file.id || file.fileId);
        if (response.data && response.data.url) {
          window.open(response.data.url, '_blank', 'noopener,noreferrer');
        } else {
          alert('File URL not available');
        }
      } else {
        alert('Cannot view file: No URL or ID available');
      }
    } catch (error) {
      console.error('Error viewing file:', error);
      alert('Failed to view file. Please try again.');
    }
  };

  const handleDownloadFile = async (file) => {
    try {
      if (file.url || file.fileUrl) {
        // Create a download link
        const link = document.createElement('a');
        link.href = file.url || file.fileUrl;
        link.download = file.name || file.filename || 'downloaded_file';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (file.id || file.fileId) {
        // Fetch file from API and download
        const response = await shivaiApiService.downloadFile(file.id || file.fileId);
        if (response.data) {
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = file.name || file.filename || 'downloaded_file';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      } else {
        alert('Cannot download file: No URL or ID available');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const handleViewFAQ = (faqText) => {
    // Create a modal-like window or use a simple alert/confirm for now
    const faqWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    if (faqWindow) {
      faqWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>FAQ Text</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background: #f8fafc;
            }
            .header {
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              margin-bottom: 20px;
            }
            .content {
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            h1 { margin: 0; color: #1f2937; }
            .close-btn {
              background: #3b82f6;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              float: right;
            }
            .close-btn:hover { background: #2563eb; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>FAQ Text</h1>
            <button class="close-btn" onclick="window.close()">Close</button>
            <div style="clear: both;"></div>
          </div>
          <div class="content">${faqText.replace(/\n/g, '<br>')}</div>
        </body>
        </html>
      `);
      faqWindow.document.close();
    } else {
      // Fallback if popup is blocked
      alert(faqText);
    }
  };

  const handleApproveClient = async (client) => {
    if (client?.isApproved) {
      alert('This client is already approved.');
      return;
    }

    const confirmApprove = window.confirm(
      `Are you sure you want to approve ${client?.company_basics?.name || 'this client'}? This action will move them to the approved tab.`
    );

    if (!confirmApprove) return;

    try {
      // Update the client's approval status
      const updatedClient = { ...client, isApproved: true };
      
      // Call API to update approval status
      if (client._id) {
        await shivaiApiService.updateOnboardingData(client._id, updatedClient);
      }

      // Update local state
      setOnboardingData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(c => c._id !== client._id),
        approved: [...(prev.approved || []), updatedClient]
      }));

      // Update selected client if it's currently being viewed
      if (selectedClient?._id === client._id) {
        setSelectedClient(updatedClient);
      }

      alert('Client has been successfully approved!');
    } catch (error) {
      console.error('Error approving client:', error);
      alert('Failed to approve client. Please try again.');
    }
  };

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

  const addAIEmployee = () => {
    setEditData((prev) => ({
      ...prev,
      ai_employees: [
        ...(prev?.ai_employees || []),
        {
          name: "",
          type: "",
          template: "",
          preferred_language: "English",
          voice_gender: "Gender Neutral",
          agent_personality: "",
          voice_style: "",
          special_instructions: "",
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
        channels: (prev?.deployment_targets?.channels || []).filter(
          (c) => c !== channel
        ),
      },
    }));
  };

  const clientStats = [
    {
      label: "Total Clients",
      value: "2,847",
      change: "+12%",
      subtitle: "Paying subscribers",
      icon: Users,
    },
    {
      label: "Active Clients",
      value: "2,423",
      change: "+5%",
      subtitle: "Currently active",
      icon: UserCheck,
    },
    {
      label: "New This Month",
      value: "156",
      change: "+23%",
      subtitle: "New registrations",
      icon: UserPlus,
    },
    {
      label: "Enterprise Clients",
      value: "247",
      change: "+18%",
      subtitle: "Enterprise plans",
      icon: Crown,
    },
  ];

  // Render Edit View
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

          {/* AI Employees */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl lg:col-span-2`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3
                className={`text-base md:text-lg font-bold ${currentTheme.text} flex items-center gap-2`}
              >
                <RiUserVoiceLine className="w-4 h-4 md:w-5 md:h-5" />
                AI Employees ({(editData?.ai_employees || []).length})
              </h3>
              <button
                onClick={addAIEmployee}
                className="admin-btn-primary px-3 sm:px-4 py-2 text-sm w-full sm:w-auto"
              >
                <RiUserAddLine className="w-4 h-4" />
                <span className="ml-2">Add AI Employee</span>
              </button>
            </div>
            <div className="space-y-4">
              {(editData?.ai_employees || []).map((ai, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.hover}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`${currentTheme.text} font-bold`}>
                      AI Employee #{idx + 1}
                    </h4>
                    {(editData?.ai_employees || []).length > 1 && (
                      <button
                        onClick={() => removeAIEmployee(idx)}
                        className={`px-3 py-1 rounded-lg ${currentTheme.hover} ${currentTheme.text} text-sm`}
                      >
                        <RiCloseLine className="w-4 h-4" />
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
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                      >
                        Workflows
                      </label>
                      <div className="space-y-2">
                        {(ai?.workflows || []).length > 0 ? (
                          (ai?.workflows || []).map((workflow, workflowIdx) => (
                            <div
                              key={workflowIdx}
                              className={`p-3 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <h5 className={`font-semibold ${currentTheme.text} text-sm mb-1`}>
                                    {workflow?.name || "Unnamed Workflow"}
                                  </h5>
                                  <p className={`${currentTheme.textSecondary} text-xs leading-relaxed`}>
                                    {workflow?.instruction || "No instruction provided"}
                                  </p>
                                  {workflow?._id && (
                                    <p className={`${currentTheme.textSecondary} text-xs mt-1 font-mono`}>
                                      ID: {workflow._id}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200`}>
                                    Active
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className={`p-3 rounded-lg border-2 border-dashed ${currentTheme.border} text-center`}>
                            <RiFileTextLine className={`w-6 h-6 mx-auto mb-2 ${currentTheme.textSecondary}`} />
                            <p className={`${currentTheme.textSecondary} text-sm`}>
                              No workflows configured
                            </p>
                            <p className={`${currentTheme.textSecondary} text-xs mt-1`}>
                              Workflows will appear here when configured
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Sources */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl`}
          >
            <h3
              className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              <RiBookOpenLine className="w-5 h-5" />
              Knowledge Sources
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Website URL
                </label>
                <input
                  type="url"
                  value={editData?.knowledge_sources?.website_url || ""}
                  onChange={(e) =>
                    updateEditData(
                      "knowledge_sources.website_url",
                      e.target.value
                    )
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={
                    editData?.knowledge_sources?.social_links?.linkedin || ""
                  }
                  onChange={(e) =>
                    updateEditData(
                      "knowledge_sources.social_links.linkedin",
                      e.target.value
                    )
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  FAQs
                </label>
                <textarea
                  value={editData?.knowledge_sources?.faqs_text || ""}
                  onChange={(e) =>
                    updateEditData(
                      "knowledge_sources.faqs_text",
                      e.target.value
                    )
                  }
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Q: Question?\nA: Answer"
                />
              </div>
            </div>
          </div>

          {/* Instructions & Targets */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl`}
          >
            <h3
              className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              <RiLightbulbLine className="w-5 h-5" />
              Instructions & Targets
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Do's and Don'ts
                </label>
                <textarea
                  value={editData?.instructions?.dos_and_donts || ""}
                  onChange={(e) =>
                    updateEditData("instructions.dos_and_donts", e.target.value)
                  }
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Fallback Contacts
                </label>
                <input
                  type="text"
                  value={editData?.instructions?.fallback_contacts || ""}
                  onChange={(e) =>
                    updateEditData(
                      "instructions.fallback_contacts",
                      e.target.value
                    )
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Success Goals
                </label>
                <textarea
                  value={editData?.targets?.success_goals || ""}
                  onChange={(e) =>
                    updateEditData("targets.success_goals", e.target.value)
                  }
                  rows={2}
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Success Metrics
                </label>
                <textarea
                  value={editData?.targets?.success_metrics || ""}
                  onChange={(e) =>
                    updateEditData("targets.success_metrics", e.target.value)
                  }
                  rows={2}
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl lg:col-span-2`}
          >
            <h3
              className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              <RiRocketLine className="w-5 h-5" />
              Deployment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Channels
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editData?.deployment_targets?.channels || []).map(
                    (channel, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${currentTheme.activeBg} ${currentTheme.text} flex items-center gap-2`}
                      >
                        {channel}
                        <button onClick={() => removeChannel(channel)}>
                          <RiCloseLine className="w-4 h-4" />
                        </button>
                      </span>
                    )
                  )}
                </div>
                <select
                  onChange={(e) => {
                    addChannel(e.target.value);
                    e.target.value = "";
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="">Add Channel...</option>
                  <option value="Website">Website</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Service Type
                </label>
                <input
                  type="text"
                  value={editData?.deployment_service?.service_type || ""}
                  onChange={(e) =>
                    updateEditData(
                      "deployment_service.service_type",
                      e.target.value
                    )
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Deployment Notes
                </label>
                <textarea
                  value={editData?.deployment_targets?.deployment_notes || ""}
                  onChange={(e) =>
                    updateEditData(
                      "deployment_targets.deployment_notes",
                      e.target.value
                    )
                  }
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>
          </div>

          {/* Admin Settings */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl lg:col-span-2`}
          >
            <h3
              className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              <RiShieldCheckLine className="w-5 h-5" />
              Admin Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                  >
                    Approval Status
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editData?.isApproved || false}
                        onChange={(e) => updateEditData("isApproved", e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className={`${currentTheme.text} text-sm`}>Approved</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                  >
                    Onboarding Status
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editData?.isOnBoarded || false}
                        onChange={(e) => updateEditData("isOnBoarded", e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className={`${currentTheme.text} text-sm`}>Onboarded</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Admin Notes
                </label>
                <textarea
                  value={editData?.adminNotes || ""}
                  onChange={(e) => updateEditData("adminNotes", e.target.value)}
                  rows={4}
                  placeholder="Internal notes about this client..."
                  className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>
          </div>
         
        </div>

        {/* Sticky Save Bar */}
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-3 md:p-4 shadow-xl sticky bottom-4 z-10`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p
              className={`${currentTheme.textSecondary} text-xs sm:text-sm text-center sm:text-left`}
            >
              Make sure all required fields are filled before saving
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleCancelEdit}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 text-sm`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 sm:flex-none admin-btn-primary px-4 sm:px-6 py-2 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Detail View
  if (viewMode === "detail" && selectedClient) {
    return (
      <div className="space-y-3 md:space-y-4">
        {/* Compact Header with Back Button and Company Info */}
        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 md:p-4 shadow-sm`}>
          {/* Top Row: Back Button and Status */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBackToList}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 text-sm font-medium`}
            >
              <RiArrowLeftLine className="w-4 h-4" />
              Back to List
            </button>
            
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedClient?.isOnBoarded
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-yellow-100 text-yellow-800 border border-yellow-200"
              }`}
            >
              {selectedClient?.isOnBoarded ? "Onboarded" : "Pending"}
            </span>
          </div>

          {/* Compact Company Header */}
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 ${currentTheme.activeBg} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <RiBuildingLine
                className={`w-5 h-5 ${currentTheme.text}`}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h1
                className={`text-lg md:text-xl font-bold ${currentTheme.text} mb-1 truncate`}
              >
                {selectedClient?.onboardingDetails?.onboarding?.company_basics?.name || "Unknown Company"}
              </h1>
              
              <p className={`${currentTheme.textSecondary} text-sm mb-2 overflow-hidden`} style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                maxHeight: '2.5rem'
              }}>
                {selectedClient?.onboardingDetails?.onboarding?.company_basics?.description ||
                  "No description available"}
              </p>
              
              {/* Compact Company Info Pills */}
              <div className="flex flex-wrap items-center gap-1">
                {(selectedClient?.onboardingDetails?.onboarding?.company_basics?.industry || []).slice(0, 2).map(
                  (ind, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${currentTheme.activeBg} ${currentTheme.text} border ${currentTheme.border}`}
                    >
                      {ind}
                    </span>
                  )
                )}
                {selectedClient?.onboardingDetails?.onboarding?.company_basics?.company_size && (
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200`}
                  >
                    {selectedClient.onboardingDetails.onboarding.company_basics.company_size}
                  </span>
                )}
                {(selectedClient?.onboardingDetails?.onboarding?.company_basics?.industry || []).length > 2 && (
                  <span className={`text-xs ${currentTheme.textSecondary}`}>
                    +{(selectedClient?.onboardingDetails?.onboarding?.company_basics?.industry || []).length - 2} more
                  </span>
                )}
              </div>
            </div>
            
            {/* Compact Action Buttons */}
            <div className="flex items-center gap-2 ml-2">
              <button 
                onClick={() => handleApproveClient(selectedClient)}
                className={`px-3 py-1.5 flex items-center gap-1.5 text-sm transition-all duration-200 ${
                  selectedClient?.isApproved 
                    ? 'bg-green-100 text-green-800 border border-green-200 cursor-default' 
                    : 'admin-btn-primary hover:bg-blue-600'
                }`}
                disabled={selectedClient?.isApproved}
              >
                <RiCheckLine className="w-4 h-4" />
                {selectedClient?.isApproved ? 'Approved' : 'Approve'}
              </button>
              <button
                onClick={() => handleEditClient(selectedClient)}
                className={`px-3 py-1.5 border ${currentTheme.border} rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 flex items-center gap-1.5 text-sm`}
              >
                <RiEditLine className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Loading and Error states */}

        {/* Loading indicator for onboarding data */}
        {loading && (
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
          >
            <div className={`flex items-center justify-center py-8`}>
              <div
                className={`${currentTheme.text} text-sm flex items-center gap-3`}
              >
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                Loading detailed client data...
              </div>
            </div>
          </div>
        )}

        {/* Error indicator for onboarding data */}
        {error && (
          <div
            className={`${currentTheme.cardBg} border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-xl p-4 md:p-6`}
          >
            <div
              className={`flex items-center gap-3 text-red-600 dark:text-red-400`}
            >
              <RiAlarmWarningLine className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {console.log("Rendering detail view for client:", selectedClient)}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Company Basics */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
          >
            <h3
              className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              <RiBuildingLine className="w-4 h-4 md:w-5 md:h-5" />
              Company Basics
            </h3>
            <div className="space-y-3">

               <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase`}
                >
                  Company Name
                </label>
                <p className={`${currentTheme.text} font-medium`}>
                  {selectedClient?.onboardingDetails?.onboarding?.company_basics?.name ||
                    "Not specified"}
                </p>
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase`}
                >
                  Company Size
                </label>
                <p className={`${currentTheme.text} font-medium`}>
                  {selectedClient?.onboardingDetails?.onboarding?.company_basics?.company_size ||
                    "Not s"}
                </p>
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase`}
                >
                  Website
                </label>
                {selectedClient?.onboardingDetails?.onboarding?.company_basics?.website ? (
                  <a
                    href={selectedClient?.company_basics?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${currentTheme.text} hover:underline flex items-center gap-1`}
                  >
                    <RiGlobalLine className="w-4 h-4" />
                    {selectedClient?.company_basics?.website}
                  </a>
                ) : (
                  <p className={`${currentTheme.textSecondary}`}>
                    Not provided
                  </p>
                )}
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase`}
                >
                  Email
                </label>
                <p
                  className={`${currentTheme.text} font-medium flex items-center gap-1`}
                >
                  <RiMailLine className="w-4 h-4" />
                  {selectedClient?.onboardingDetails?.onboarding?.company_basics?.company_email ||
                    "Not provided"}
                </p>
              </div>
              <div>
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase`}
                >
                  Phone
                </label>
                <p
                  className={`${currentTheme.text} font-medium flex items-center gap-1`}
                >
                  <RiPhoneLine className="w-4 h-4" />
                  {selectedClient?.onboardingDetails?.onboarding?.company_basics?.company_phone ||
                    "Not provided"}
                </p>
              </div>
              {selectedClient?.onboardingDetails?.onboarding?.company_basics?.linkedin_profile && (
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase`}
                  >
                    LinkedIn
                  </label>
                  <a
                    href={selectedClient?.company_basics?.linkedin_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${currentTheme.text} hover:underline flex items-center gap-1`}
                  >
                    <RiLinkedinLine className="w-4 h-4" />
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>

       

          {/* Comprehensive Onboarding Details Section */}
          {selectedClient?.onboardingDetails && (
            <div className="space-y-6">
              {/* AI Employees Section */}
              {selectedClient.onboardingDetails.onboarding?.ai_employees &&
                selectedClient.onboardingDetails.onboarding.ai_employees
                  .length > 0 && (
                  <div
                    className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
                  >
                    <h3
                      className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
                    >
                      <RiRobotLine className="w-5 h-5" />
                      AI Employees (
                      {
                        selectedClient.onboardingDetails.onboarding.ai_employees
                          .length
                      }
                      )
                    </h3>
                    <div className="space-y-4">
                      {selectedClient.onboardingDetails.onboarding.ai_employees.map(
                        (employee, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${currentTheme.searchBg} border ${currentTheme.border}`}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                                >
                                  Name
                                </label>
                                <p
                                  className={`${currentTheme.text} font-medium`}
                                >
                                  {employee.name || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                                >
                                  Type
                                </label>
                                <p
                                  className={`${currentTheme.text} font-medium`}
                                >
                                  {employee.type || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                                >
                                  Template
                                </label>
                                <p
                                  className={`${currentTheme.text} font-medium`}
                                >
                                  {employee.template || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                                >
                                  Language
                                </label>
                                <p
                                  className={`${currentTheme.text} font-medium`}
                                >
                                  {employee.preferred_language ||
                                    "Not specified"}
                                </p>
                              </div>
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                                >
                                  Voice Gender
                                </label>
                                <p
                                  className={`${currentTheme.text} font-medium`}
                                >
                                  {employee.voice_gender || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                                >
                                  Personality
                                </label>
                                <p
                                  className={`${currentTheme.text} font-medium`}
                                >
                                  {employee.agent_personality ||
                                    "Not specified"}
                                </p>
                              </div>
                            </div>
                            {employee.special_instructions && (
                              <div className="mt-3">
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                                >
                                  Special Instructions
                                </label>
                                <p
                                  className={`${currentTheme.text} text-sm p-2 rounded ${currentTheme.cardBg}`}
                                >
                                  {employee.special_instructions}
                                </p>
                              </div>
                            )}
                            
                            {/* Workflows Section */}
                            {employee.workflows && employee.workflows.length > 0 && (
                              <div className="mt-3">
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-2 block`}
                                >
                                  Workflows ({employee.workflows.length})
                                </label>
                                <div className="space-y-2">
                                  {employee.workflows.map((workflow, workflowIdx) => (
                                    <div
                                      key={workflowIdx}
                                      className={`p-3 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <RiFileTextLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                            <h6 className={`font-semibold ${currentTheme.text} text-sm`}>
                                              {workflow?.name || "Unnamed Workflow"}
                                            </h6>
                                          </div>
                                          <p className={`${currentTheme.textSecondary} text-xs leading-relaxed mb-2`}>
                                            {workflow?.instruction || "No instruction provided"}
                                          </p>
                                          {workflow?._id && (
                                            <div className="flex items-center gap-1">
                                              <span className={`${currentTheme.textSecondary} text-xs`}>ID:</span>
                                              <code className={`${currentTheme.textSecondary} text-xs font-mono bg-gray-100 px-1 py-0.5 rounded`}>
                                                {workflow._id}
                                              </code>
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className={`px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200`}>
                                            Active
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Knowledge Sources Section */}
                            {employee.knowledge_sources && (
                              <div className="mt-3">
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase mb-2 block`}
                                >
                                  Knowledge Sources
                                </label>
                                <div className="space-y-2">
                                  {employee.knowledge_sources.website_url && (
                                    <div className={`p-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}>
                                      <div className="flex items-center gap-2 mb-1">
                                        <RiGlobalLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                        <span className={`font-medium ${currentTheme.text} text-sm`}>Website</span>
                                      </div>
                                      <a 
                                        href={employee.knowledge_sources.website_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`${currentTheme.textSecondary} text-xs hover:text-blue-600 underline`}
                                      >
                                        {employee.knowledge_sources.website_url}
                                      </a>
                                    </div>
                                  )}
                                  {employee.knowledge_sources.uploaded_files && employee.knowledge_sources.uploaded_files.length > 0 && (
                                    <div className={`p-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}>
                                      <div className="flex items-center gap-2 mb-1">
                                        <RiFileTextLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                        <span className={`font-medium ${currentTheme.text} text-sm`}>
                                          Uploaded Files ({employee.knowledge_sources.uploaded_files.length})
                                        </span>
                                      </div>
                                      <div className="space-y-2">
                                        {employee.knowledge_sources.uploaded_files.map((file, fileIdx) => (
                                          <div key={fileIdx} className={`flex items-center justify-between p-2 rounded border ${currentTheme.border} ${currentTheme.searchBg}`}>
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                              <RiFileTextLine className={`w-3 h-3 ${currentTheme.textSecondary}`} />
                                              <span className={`${currentTheme.text} text-xs font-medium truncate`}>
                                                {file.name || file.filename || file}
                                              </span>
                                              {file.size && (
                                                <span className={`${currentTheme.textSecondary} text-xs`}>
                                                  ({(file.size / 1024).toFixed(1)}KB)
                                                </span>
                                              )}
                                            </div>
                                            <div className="flex items-center gap-1 ml-2">
                                              {/* View Button */}
                                              <button
                                                onClick={() => handleViewFile(file)}
                                                className={`p-1 rounded transition-all duration-200 ${currentTheme.textSecondary} hover:${currentTheme.text} hover:bg-blue-50 active:scale-95`}
                                                title="View File"
                                              >
                                                <RiEyeLine className="w-3 h-3" />
                                              </button>
                                              {/* Download Button */}
                                              <button
                                                onClick={() => handleDownloadFile(file)}
                                                className={`p-1 rounded transition-all duration-200 ${currentTheme.textSecondary} hover:${currentTheme.text} hover:bg-green-50 active:scale-95`}
                                                title="Download File"
                                              >
                                                <RiDownloadLine className="w-3 h-3" />
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {employee.knowledge_sources.faqs_text && (
                                    <div className={`p-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}>
                                      <div className="flex items-center justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-2">
                                          <RiQuestionLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                          <span className={`font-medium ${currentTheme.text} text-sm`}>FAQ Text</span>
                                        </div>
                                        <button
                                          onClick={() => handleViewFAQ(employee.knowledge_sources.faqs_text)}
                                          className={`p-1 rounded transition-all duration-200 ${currentTheme.textSecondary} hover:${currentTheme.text} hover:bg-blue-50 active:scale-95`}
                                          title="View Full FAQ Text"
                                        >
                                          <RiEyeLine className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <p className={`${currentTheme.textSecondary} text-xs leading-relaxed`}>
                                        {employee.knowledge_sources.faqs_text.length > 150
                                          ? `${employee.knowledge_sources.faqs_text.substring(0, 150)}...`
                                          : employee.knowledge_sources.faqs_text
                                        }
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Consent Options Section */}
              {selectedClient.onboardingDetails.onboarding?.consent_options && (
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
                >
                  <h3
                    className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
                  >
                    <RiShieldCheckLine className="w-5 h-5" />
                    Consent & Privacy Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                      >
                        Recording Enabled
                      </label>
                      <p className={`${currentTheme.text} font-medium`}>
                        {selectedClient.onboardingDetails.onboarding
                          .consent_options.recording_enabled
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                      >
                        Transcript Email Opt-in
                      </label>
                      <p className={`${currentTheme.text} font-medium`}>
                        {selectedClient.onboardingDetails.onboarding
                          .consent_options.transcript_email_optin
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                    {selectedClient.onboardingDetails.onboarding.consent_options
                      .privacy_notes && (
                      <div className="md:col-span-2">
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                        >
                          Privacy Notes
                        </label>
                        <p
                          className={`${currentTheme.text} text-sm p-2 rounded ${currentTheme.searchBg}`}
                        >
                          {
                            selectedClient.onboardingDetails.onboarding
                              .consent_options.privacy_notes
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Deployment Configuration */}
              {selectedClient.onboardingDetails.onboarding
                ?.deployment_service && (
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
                >
                  <h3
                    className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
                  >
                    <RiCloudLine className="w-5 h-5" />
                    Deployment Configuration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                      >
                        Service Type
                      </label>
                      <p className={`${currentTheme.text} font-medium`}>
                        {selectedClient.onboardingDetails.onboarding
                          .deployment_service.service_type || "Not specified"}
                      </p>
                    </div>

                    {selectedClient.onboardingDetails.onboarding
                      .deployment_targets && (
                      <>
                        {selectedClient.onboardingDetails.onboarding
                          .deployment_targets.channels && (
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase mb-2 block`}
                            >
                              Channels
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {selectedClient.onboardingDetails.onboarding.deployment_targets.channels.map(
                                (channel, idx) => (
                                  <span
                                    key={idx}
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${currentTheme.activeBg} ${currentTheme.text}`}
                                  >
                                    {channel}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {selectedClient.onboardingDetails.onboarding
                          .deployment_targets.deployment_notes && (
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                            >
                              Deployment Notes
                            </label>
                            <p
                              className={`${currentTheme.text} text-sm p-2 rounded ${currentTheme.searchBg}`}
                            >
                              {
                                selectedClient.onboardingDetails.onboarding
                                  .deployment_targets.deployment_notes
                              }
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Instructions & Guidelines */}
              {selectedClient.onboardingDetails.onboarding?.instructions && (
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
                >
                  <h3
                    className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
                  >
                    <RiFileTextLine className="w-5 h-5" />
                    Instructions & Guidelines
                  </h3>
                  <div className="space-y-4">
                    {selectedClient.onboardingDetails.onboarding.instructions
                      .dos_and_donts && (
                      <div>
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                        >
                          Do's and Don'ts
                        </label>
                        <p
                          className={`${currentTheme.text} text-sm p-3 rounded ${currentTheme.searchBg}`}
                        >
                          {
                            selectedClient.onboardingDetails.onboarding
                              .instructions.dos_and_donts
                          }
                        </p>
                      </div>
                    )}
                    {selectedClient.onboardingDetails.onboarding.instructions
                      .fallback_contacts && (
                      <div>
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                        >
                          Fallback Contacts
                        </label>
                        <p
                          className={`${currentTheme.text} text-sm p-3 rounded ${currentTheme.searchBg}`}
                        >
                          {
                            selectedClient.onboardingDetails.onboarding
                              .instructions.fallback_contacts
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

           
              {/* Plan Details */}
              {selectedClient.onboardingDetails.onboarding?.plan_details && (
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
                >
                  <h3
                    className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
                  >
                    <RiPriceTag3Line className="w-5 h-5" />
                    Plan & Billing Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                      >
                        Monthly Price
                      </label>
                      <p className={`${currentTheme.text} font-medium text-lg`}>
                        $
                        {selectedClient.onboardingDetails.onboarding
                          .plan_details.monthly_price || 0}
                        /month
                      </p>
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                      >
                        AI Employee Limit
                      </label>
                      <p className={`${currentTheme.text} font-medium`}>
                        {selectedClient.onboardingDetails.onboarding
                          .plan_details.ai_employee_limit || 0}{" "}
                        employees
                      </p>
                    </div>

                    {selectedClient.onboardingDetails.onboarding.plan_details
                      .billing_contact && (
                      <div className="md:col-span-2">
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase mb-2 block`}
                        >
                          Billing Contact
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded ${currentTheme.searchBg}">
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                            >
                              Name
                            </label>
                            <p className={`${currentTheme.text} font-medium`}>
                              {selectedClient.onboardingDetails.onboarding
                                .plan_details.billing_contact.name ||
                                "Not provided"}
                            </p>
                          </div>
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                            >
                              Email
                            </label>
                            <p className={`${currentTheme.text} font-medium`}>
                              {selectedClient.onboardingDetails.onboarding
                                .plan_details.billing_contact.email ||
                                "Not provided"}
                            </p>
                          </div>
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                            >
                              Phone
                            </label>
                            <p className={`${currentTheme.text} font-medium`}>
                              {selectedClient.onboardingDetails.onboarding
                                .plan_details.billing_contact.phone ||
                                "Not provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Success Targets */}
              {selectedClient.onboardingDetails.onboarding?.targets && (
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
                >
                  <h3
                    className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
                  >
                    <Target className="w-5 h-5" />
                    Success Targets
                  </h3>
                  <div className="space-y-4">
                    {selectedClient.onboardingDetails.onboarding.targets
                      .success_goals && (
                      <div>
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                        >
                          Success Goals
                        </label>
                        <p
                          className={`${currentTheme.text} text-sm p-3 rounded ${currentTheme.searchBg}`}
                        >
                          {
                            selectedClient.onboardingDetails.onboarding.targets
                              .success_goals
                          }
                        </p>
                      </div>
                    )}
                    {selectedClient.onboardingDetails.onboarding.targets
                      .success_metrics && (
                      <div>
                        <label
                          className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                        >
                          Success Metrics
                        </label>
                        <p
                          className={`${currentTheme.text} text-sm p-3 rounded ${currentTheme.searchBg}`}
                        >
                          {
                            selectedClient.onboardingDetails.onboarding.targets
                              .success_metrics
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Meta Information */}
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
              >
                <h3
                  className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
                >
                  <RiInformationLine className="w-5 h-5" />
                  Onboarding Metadata
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                    >
                      User ID
                    </label>
                    <p className={`${currentTheme.text} font-mono text-sm`}>
                      {selectedClient.onboardingDetails.onboarding?.userId ||
                        "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                    >
                      Status
                    </label>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        selectedClient.onboardingDetails.onboarding?.status ===
                        "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedClient.onboardingDetails.onboarding?.status ||
                        "Unknown"}
                    </span>
                  </div>
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                    >
                      Created At
                    </label>
                    <p className={`${currentTheme.text} text-sm`}>
                      {selectedClient.onboardingDetails.onboarding?.created_at
                        ? new Date(
                            selectedClient.onboardingDetails.onboarding.created_at
                          ).toLocaleDateString()
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}
                    >
                      Updated At
                    </label>
                    <p className={`${currentTheme.text} text-sm`}>
                      {selectedClient.onboardingDetails.onboarding?.updated_at
                        ? new Date(
                            selectedClient.onboardingDetails.onboarding.updated_at
                          ).toLocaleDateString()
                        : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

          
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-6">
      {viewMode === "list" && (
        <>
          <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-2 px-2">
            <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>

              <div className="group flex-shrink-0 w-36 sm:w-40">
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 hover:scale-[1.02] transition-all duration-200 shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                    >
                      <RiTeamLine
                        className={`w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                    </div>
                    <span className="text-xs font-medium text-blue-500">
                      Total
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold ${currentTheme.text} mb-0.5`}
                  >
                    {getCount("pending") + getCount("onboarded")}
                  </h3>
                  <p
                    className={`text-xs font-medium ${currentTheme.text} leading-tight`}
                  >
                    All Clients
                  </p>
                </div>
              </div>

              <div className="group flex-shrink-0 w-36 sm:w-40">
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 hover:scale-[1.02] transition-all duration-200 shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                    >
                      <RiTimeLine
                        className={`w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                    </div>
                    <span className="text-xs font-medium text-yellow-500">
                      Pending
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold ${currentTheme.text} mb-0.5`}
                  >
                    {getCount("pending")}
                  </h3>
                  <p
                    className={`text-xs font-medium ${currentTheme.text} leading-tight`}
                  >
                    Awaiting Review
                  </p>
                </div>
              </div>

              {/* Approved Card */}
              <div className="group flex-shrink-0 w-36 sm:w-40">
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 hover:scale-[1.02] transition-all duration-200 shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                    >
                      <RiCheckLine
                        className={`w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                    </div>
                    <span className="text-xs font-medium text-green-500">
                      Active
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold ${currentTheme.text} mb-0.5`}
                  >
                    {getCount("approved")}
                  </h3>
                  <p
                    className={`text-xs font-medium ${currentTheme.text} leading-tight`}
                  >
                    Approved
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4">
            {/* Pending Clients Card */}

            <div className="group">
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${currentTheme.cardShadow || "shadow-lg"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                  >
                    <RiTeamLine
                      className={`w-5 h-5 ${currentTheme.textSecondary}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-blue-500">
                    Total
                  </span>
                </div>
                <h3
                  className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
                >
                  {getCount("pending") + getCount("onboarded")}
                </h3>
                <p
                  className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                >
                  All Clients
                </p>
                <p
                  className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                >
                  Total submissions
                </p>
              </div>
            </div>

            <div className="group">
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${currentTheme.cardShadow || "shadow-lg"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                  >
                    <RiTimeLine
                      className={`w-5 h-5 ${currentTheme.textSecondary}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-yellow-500">
                    Pending
                  </span>
                </div>
                <h3
                  className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
                >
                  {getCount("pending")}
                </h3>
                <p
                  className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                >
                  Awaiting Review
                </p>
                <p
                  className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                >
                  Needs approval
                </p>
              </div>
            </div>

            {/* Approved Clients Card */}
            <div className="group">
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${currentTheme.cardShadow || "shadow-lg"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                  >
                    <RiCheckLine
                      className={`w-5 h-5 ${currentTheme.textSecondary}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-green-500">
                    Active
                  </span>
                </div>
                <h3
                  className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
                >
                  {getCount("approved")}
                </h3>
                <p
                  className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                >
                  Approved Clients
                </p>
                <p
                  className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                >
                  Active accounts
                </p>
              </div>
            </div>

          </div>

          {/* Main Content Card - Mobile Optimized */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 md:p-6 ${currentTheme.cardShadow || "shadow-lg"}`}
          >
            {/* Header with Search - Mobile Optimized */}
            <div className="flex flex-col gap-3 mb-3 sm:mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className={`text-base sm:text-lg md:text-xl font-semibold ${currentTheme.text} flex items-center gap-2`}
                  >
                    <RiTeamLine className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Client Requests</span>
                    <span className="sm:hidden">Clients</span>
                  </h2>
                  <p className={`${currentTheme.textSecondary} text-xs mt-0.5`}>
                    ({getCount("pending") + getCount("onboarded")} total)
                  </p>
                </div>
              </div>

              {/* Search Bar - Mobile Optimized */}
              <div className="relative">
                <RiSearchLine
                  className={`hidden lg:absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
                />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>

            {/* Tabs - Mobile Optimized with Icons */}
            <div
              className={`flex gap-1 mb-3 sm:mb-4 border-b ${currentTheme.border} overflow-x-auto scrollbar-hide`}
            >
              <button
                onClick={() => setActiveTab("pending")}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
                  activeTab === "pending"
                    ? `${currentTheme.activeBorder} ${currentTheme.text}`
                    : `border-transparent ${currentTheme.textSecondary} ${currentTheme.hover}`
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <RiTimeLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Pending</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === "pending"
                        ? `${currentTheme.activeBg} ${currentTheme.text}`
                        : `${currentTheme.textSecondary}`
                    }`}
                  >
                    {getCount("pending")}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("onboarded")}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
                  activeTab === "onboarded"
                    ? `${currentTheme.activeBorder} ${currentTheme.text}`
                    : `border-transparent ${currentTheme.textSecondary} ${currentTheme.hover}`
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <RiCheckLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Onboarded</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === "onboarded"
                        ? `${currentTheme.activeBg} ${currentTheme.text}`
                        : `${currentTheme.textSecondary}`
                    }`}
                  >
                    {getCount("onboarded")}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
                  activeTab === "approved"
                    ? `${currentTheme.activeBorder} ${currentTheme.text}`
                    : `border-transparent ${currentTheme.textSecondary} ${currentTheme.hover}`
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <RiCheckDoubleLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Approved</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === "approved"
                        ? `${currentTheme.activeBg} ${currentTheme.text}`
                        : `${currentTheme.textSecondary}`
                    }`}
                  >
                    {getCount("approved")}
                  </span>
                </div>
              </button>
            </div>

            {/* Client List - Mobile App-like Cards */}
            <div className="space-y-2 sm:space-y-3">
              {getClientsForTab().length === 0 ? (
                <div
                  className={`text-center py-8 sm:py-12 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}
                >
                  <RiUserLine
                    className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${currentTheme.textSecondary}`}
                  />
                  <h3
                    className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-1 sm:mb-2`}
                  >
                    {searchTerm
                      ? "No matching clients"
                      : (users || []).length > 0
                        ? "No client requests yet"
                        : "No data available"}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                  >
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : (users || []).length > 0
                        ? `${(users || []).length} registered users but no ${activeTab} client requests`
                        : `No ${activeTab} client requests available`}
                  </p>
                  {/* Debug info */}
                  <div
                    className={`mt-2 text-xs ${currentTheme.textSecondary} opacity-60`}
                  >
                    Debug: {(users || []).length} users,{" "}
                    {getTotalOnboardingCount()} onboarding records
                  </div>
                </div>
              ) : (
                getClientsForTab().map((client, index) => {
                  // Debug: log client data to see what's available
                  if (index === 0) {
                    console.log("Sample client data:", client);
                    console.log("AI employee count from onboarding:", client?.userData?.onboarding?.ai_employee_count);
                    console.log("AI employees array length:", (client?.ai_employees || []).length);
                  }
                  return (
                  <div
                    key={client._id}
                    className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 active:scale-[0.98]`}
                  >
                    {/* Header Row - Compact on Mobile */}
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${currentTheme.activeBg} flex items-center justify-center flex-shrink-0`}
                        >
                          <RiBuildingLine
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme.text}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-semibold ${currentTheme.text} text-sm sm:text-base truncate`}
                          >
                            {client?.userData?.fullName || client?.company_basics?.name || "Unknown"}
                          </h4>
                          <p
                            className={`text-xs ${currentTheme.textSecondary} truncate`}
                          >
                            {client?.userData?.email || client?.company_basics?.company_email ||
                              "No email"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-2">
                        <button
                          onClick={() => handleViewClient(client)}
                          className={`p-1.5 sm:p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 active:scale-95 transition-all duration-200`}
                          title="View Details"
                        >
                          <RiEyeLine className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditClient(client)}
                          className={`p-1.5 sm:p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 active:scale-95 transition-all duration-200`}
                          title="Edit Client"
                        >
                          <RiEditLine className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Info Grid - Responsive Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      <div className="space-y-0.5">
                        <p
                          className={`text-xs ${currentTheme.textSecondary} uppercase`}
                        >
                          Plan
                        </p>
                        <p
                          className={`${currentTheme.text} font-medium text-xs sm:text-sm leading-tight truncate`}
                        >
                          {client?.userData?.onboarding?.plan_type || client?.plan_details?.type || "No plan"}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <p
                          className={`text-xs ${currentTheme.textSecondary} uppercase`}
                        >
                          Company Name
                        </p>
                        <p
                          className={`${currentTheme.text} font-medium text-xs sm:text-sm leading-tight`}
                        >
                          {client?.userData?.onboarding?.company_name || "Unknown"}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <p
                          className={`text-xs ${currentTheme.textSecondary} uppercase`}
                        >
                          Company Email
                        </p>
                        <p
                          className={`${currentTheme.text} font-medium text-xs sm:text-sm leading-tight truncate`}
                        >
                          {client?.userData?.onboarding?.company_email ||  "N/A"}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <p
                          className={`text-xs ${currentTheme.textSecondary} uppercase`}
                        >
                          AI
                        </p>
                        <p
                          className={`${currentTheme.text} font-medium text-xs sm:text-sm leading-tight`}
                        >
                          {client?.userData?.onboarding?.ai_employee_count || (client?.ai_employees || []).length}{" "}
                          {(client?.userData?.onboarding?.ai_employee_count || (client?.ai_employees || []).length) === 1
                            ? "employee"
                            : "employees"}
                        </p>
                      </div>
                    </div>
                  </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientManagement;




















