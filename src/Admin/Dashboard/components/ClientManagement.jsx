import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  RiArrowDownLine,
  RiSettings4Line,
} from "react-icons/ri";
import { useTheme } from "../contexts/ThemeContext";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import { Target } from "lucide-react";

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
  { value: "food-beverage", label: "Food & Beverage (Restaurants, Cafes, Catering)" },
  { value: "automotive-transportation", label: "Automotive & Transportation" },
  { value: "legal-professional", label: "Legal & Professional Services" },
  { value: "manufacturing-industrial", label: "Manufacturing & Industrial" },
  { value: "consulting-business", label: "Consulting & Business Services" },
  { value: "marketing-advertising", label: "Marketing & Advertising" },
  { value: "construction-home", label: "Construction & Home Services" },
  { value: "logistics-supply", label: "Logistics & Supply Chain" },
  { value: "media-entertainment", label: "Media & Entertainment" },
  { value: "beauty-wellness", label: "Beauty, Wellness & Personal Care" },
  { value: "nonprofit-community", label: "Nonprofit & Community Organizations" },
  { value: "other", label: "Other" }
];

// Agent configuration options from Step 3
const agentTypeOptions = [
  { value: "sales", label: "Sales & Business Development" },
  { value: "support", label: "Customer Support & Service" },
  { value: "appointment", label: "Appointment & Scheduling" },
  { value: "order", label: "Order Management & Billing" },
  { value: "product", label: "Product / Service Explainers" },
  { value: "feedback", label: "Feedback & Engagement" },
  { value: "custom", label: "Custom Workflows" }
];

const templateOptions = [
  { value: "sales-business-development", label: "Sales & Business Development" },
  { value: "customer-support-service", label: "Customer Support & Service" },
  { value: "appointment-scheduling", label: "Appointment & Scheduling" },
  { value: "order-billing", label: "Order Management & Billing" },
  { value: "product-service-explainers", label: "Product / Service Explainers" },
  { value: "feedback-engagement", label: "Feedback & Engagement" },
  { value: "custom-workflows", label: "Custom Workflows" }
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
  { value: "tr", label: "🇹🇷 Turkish" }
];

const voiceGenderOptions = [
  { value: "neutral", label: "Gender Neutral" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
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
    price: "$49/mo"
  },
  {
    id: "professional", 
    name: "Professional",
    apiKey: "Professional Plan",
    description: "For Growing Teams & Small Businesses",
    maxAgents: 5,
    aiEmployees: 5,
    price: "$149/mo"
  },
  {
    id: "business",
    name: "Business", 
    apiKey: "Business Plan",
    description: "For Scaling Companies & Mid-Sized Teams",
    maxAgents: 15,
    aiEmployees: 15,
    price: "$299/mo"
  },
  {
    id: "custom",
    name: "Custom",
    apiKey: "Custom Plan", 
    description: "For Large Organizations & Enterprises",
    maxAgents: 999,
    aiEmployees: 999,
    price: "Custom"
  }
];

const ClientManagement = () => {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list or edit
  const [editData, setEditData] = useState(null);
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

  // Click outside handler for industry dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('[data-industry-dropdown]')) {
        console.log('Clicking outside industry dropdown');
        setShowIndustryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      const tabs = ['all', 'newlySignup', 'pending', 'onboarded', 'approved', 'rejected'];
      const countPromises = tabs.map(async (tab) => {
        try {
          // For counts, just get page 1 with limit 1 and read the meta.total
          const baseParams = { page: 1, limit: 1 };
          let params = baseParams;
          
          switch (tab) {
            case 'all':
              params = baseParams;
              break;
            case 'newlySignup':
              params = { ...baseParams, isVerified: false };
              break;
            case 'pending':
              params = { ...baseParams, isVerified: true, isOnboarded: false };
              break;
            case 'onboarded':
              params = { ...baseParams, isVerified: true, isOnboarded: true };
              break;
            case 'approved':
              params = { ...baseParams, status: 'Approved' };
              break;
            case 'rejected':
              params = { ...baseParams, status: 'Rejected' };
              break;
          }
          
          const response = await shivaiApiService.get('/v1/users', params);
          const responseData = response.data || response;
          const meta = responseData?.meta || {};
          // Use meta.total for accurate count
          const count = meta.total !== undefined ? meta.total : 0;
          console.log(`📊 Count for ${tab}:`, count, 'from meta:', meta);
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
      console.log('✅ All counts fetched:', newCounts);
      setCounts(newCounts);
    } catch (error) {
      console.error('Error fetching counts:', error);
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
      case 'all':
        return baseParams;
      case 'newlySignup':
        return { ...baseParams, isVerified: false };
      case 'pending':
        return { ...baseParams, isVerified: true, isOnboarded: false };
      case 'onboarded':
        return { ...baseParams, isVerified: true, isOnboarded: true };
      case 'approved':
        return { ...baseParams, status: 'Approved' };
      case 'rejected':
        return { ...baseParams, status: 'Rejected' };
      default:
        return baseParams;
    }
  };

  // Fetch data from API based on active tab
  useEffect(() => {
    const fetchData = async () => {
      // Prevent duplicate calls
      if (fetchInProgressRef.current) {
        console.log('⏭️ Skipping fetch - already in progress');
        return;
      }

      try {
        fetchInProgressRef.current = true;
        setLoading(true);
        setError(null);

        // Mark this tab as visited
        visitedTabsRef.current.add(activeTab);

        const params = getQueryParams(activeTab);
        console.log(`📡 Fetching data for tab: ${activeTab} with params:`, params);

        const response = await shivaiApiService.get('/v1/users', params);
        console.log(`✅ Raw response for ${activeTab}:`, response);
        console.log(`✅ Response data:`, response.data);

        // Handle response data structure - transform to client format
        const responseData = response.data || response;
        const users = responseData?.data?.users || responseData?.users || responseData || [];
        const meta = responseData?.meta || {};
        const pagination = responseData?.data?.meta?.pagination || meta?.pagination || {};
        console.log(`📊 Extracted users (${users.length}):`, users.length > 0 ? users.slice(0, 2) : 'No users');
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
            type: user?.userData?.onboarding?.plan_type || user?.onboarding?.plan_type || user?.plan_type || "Selected",
            ai_employee_limit: user?.onboarding?.ai_employee_count || user?.ai_employee_count || 1,
            monthly_price: (() => {
              const planType = user?.userData?.onboarding?.plan_type || user?.onboarding?.plan_type;
              const plan = planOptions.find(p => p.apiKey === planType);
              return plan?.price === "Custom" ? 0 : parseFloat(plan?.price?.replace(/[$\/mo,]/g, "") || "0");
            })()
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
          setTotalPages(totalPagesFromMeta || Math.ceil(totalFromMeta / itemsPerPage));
          
          // Also update the count for current active tab immediately
          setCounts(prevCounts => ({
            ...prevCounts,
            [activeTab]: totalFromMeta
          }));
          console.log(`✅ Set count for ${activeTab}:`, totalFromMeta);
        }

      } catch (error) {
        console.error('❌ Error fetching data:', error);
        setError(error.message);
        setClients([]);
      } finally {
        setLoading(false);
        fetchInProgressRef.current = false;
      }
    };

    fetchData();
  }, [activeTab, currentPage]);

  // Memoized calculations
  const getClientsForTab = useMemo(() => {
    let filteredClients = clients;

    if (searchQuery) {
      filteredClients = clients.filter((client) => {
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
        setIsEditing(false);
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
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Saving edited data:", editData);
      toast.loading('Saving client data...', { id: 'save-toast' });

      // Helper function to ensure URL has protocol
      const ensureValidUrl = (url) => {
        if (!url) return "";
        if (!url.match(/^https?:\/\//i)) {
          return `https://${url}`;
        }
        return url;
      };

      // Helper function to capitalize first letter of each word
      const capitalizeWords = (str) => {
        if (!str) return "";
        return str
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
      };

      // Helper function to format voice gender
      const formatVoiceGender = (gender) => {
        if (!gender) return "Gender Neutral";
        const lowerGender = gender.toLowerCase();
        if (lowerGender.includes("male") && !lowerGender.includes("female")) return "Male";
        if (lowerGender.includes("female")) return "Female";
        return "Gender Neutral";
      };

      // Separate new files from server files
      const newFilesToUpload = [];
      const existingServerFiles = {};
      
      (editData.ai_employees || []).forEach((employee, empIndex) => {
        existingServerFiles[empIndex] = [];
        
        (employee.knowledge_sources?.uploaded_files || []).forEach((file) => {
          if (file.pending_upload && file.fileObject) {
            // This is a new file that needs to be uploaded
            newFilesToUpload.push(file.fileObject);
          } else if (!file.pending_upload) {
            // This file is already uploaded, keep its server data
            existingServerFiles[empIndex].push(file);
          }
        });
      });

      // Upload NEW files only (if there are any)
      let uploadedFilesData = [];
      if (newFilesToUpload.length > 0) {
        try {
          console.log(`📤 Uploading ${newFilesToUpload.length} files...`);
          const uploadResponse = await shivaiApiService.uploadOnboardingFiles(newFilesToUpload);
          uploadedFilesData = uploadResponse.uploaded_files || [];
          console.log('✅ Files uploaded:', uploadedFilesData);
        } catch (uploadError) {
          console.error("❌ Error uploading files:", uploadError);
          toast.error("Failed to upload files. Saving other data...", { id: 'save-toast' });
        }
      }

      // Map frontend template to backend enum value
      const mapTemplate = (template) => {
        const templateMap = {
          'Sales & Business Development': 'sales_business_development',
          'Customer Support & Service': 'customer_support_service',
          'Appointment & Scheduling': 'appointment_scheduling',
          'Order Management & Billing': 'order_management_billing',
          'Product / Service Explainers': 'product_service_explainers',
          'Feedback & Engagement': 'feedback_engagement',
          'Custom Workflows': 'custom_workflows'
        };
        const mapped = templateMap[template];
        if (mapped) return mapped;
        
        // Convert to snake_case as fallback
        return (template || "").toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '')
          .replace(/&/g, 'and');
      };

      // Map frontend deployment target values to backend enum values
      const mapDeploymentTargets = (targets) => {
        const targetMap = {
          'website': 'Website',
          'app': 'Mobile App',
          'whatsapp': 'WhatsApp'
        };
        return (targets || []).map(target => targetMap[target] || target);
      };

      // Map frontend deployment service value to backend enum value  
      const mapDeploymentService = (service) => {
        const serviceMap = {
          'managed': 'Shivai',
          'self-service': 'Client',
          'shivai': 'Shivai',
          'client': 'Client'
        };
        return serviceMap[service] || service || "Shivai";
      };

      // Construct payload matching API structure
      const payloadData = {
        // Company basics
        company_basics: {
          name: editData?.company_basics?.name || "",
          website: ensureValidUrl(editData?.company_basics?.website || ""),
          company_size: editData?.company_basics?.company_size || "",
          company_email: editData?.company_basics?.company_email || "",
          company_phone: editData?.company_basics?.company_phone || "",
          linkedin_profile: ensureValidUrl(editData?.company_basics?.linkedin_profile || ""),
          description: editData?.company_basics?.description || "",
          industry: Array.isArray(editData?.company_basics?.industry) 
            ? editData.company_basics.industry 
            : [editData?.company_basics?.industry || ""],
          primary_region: {
            countries: editData?.company_basics?.primary_region?.countries || [],
            states: editData?.company_basics?.primary_region?.states || [],
            cities: editData?.company_basics?.primary_region?.cities || [],
          },
        },

        plan_details: editData?.plan_details || {},

        ai_employees: (editData.ai_employees || []).map((employee, empIndex) => {
          // Get files for this employee
          const agentFiles = (employee.knowledge_sources?.uploaded_files || []).filter(f => !f.pending_upload);
          
          // Start with existing server files for this employee
          const employeeFiles = [...(existingServerFiles[empIndex] || [])];
          
          // Add newly uploaded files for this employee
          const newFilesForThisEmployee = (employee.knowledge_sources?.uploaded_files || [])
            .filter((f) => f.pending_upload && f.fileObject).length;
          
          if (newFilesForThisEmployee > 0 && uploadedFilesData.length > 0) {
            const startIndex = Object.keys(existingServerFiles)
              .slice(0, empIndex)
              .reduce((sum, idx) => {
                return sum + ((editData.ai_employees[idx]?.knowledge_sources?.uploaded_files || [])
                  .filter(f => f.pending_upload && f.fileObject).length);
              }, 0);
            
            employeeFiles.push(...uploadedFilesData.slice(startIndex, startIndex + newFilesForThisEmployee));
          }

          // Build workflows array
          const workflows = (employee.workflows || []).map((workflow) => ({
            name: workflow.name || "",
            instruction: workflow.instruction || ""
          }));

          return {
            name: employee.name || `AI Employee ${empIndex + 1}`,
            type: capitalizeWords(employee.type || ""),
            template: mapTemplate(employee.template || ""),
            preferred_language: capitalizeWords(employee.preferred_language || "English"),
            voice_gender: formatVoiceGender(employee.voice_gender || "Gender Neutral"),
            agent_personality: employee.agent_personality || "",
            voice_style: employee.voice_style || "",
            special_instructions: employee.special_instructions || "",
            workflows: workflows,
            knowledge_sources: {
              website_url: ensureValidUrl(employee.knowledge_sources?.website_url || ""),
              social_links: employee.knowledge_sources?.social_links || {},
              faqs_text: employee.knowledge_sources?.faqs_text || "",
              uploaded_files: employeeFiles,
            },
            deployment_targets: {
              channels: mapDeploymentTargets(employee?.deployment_targets?.channels || []),
              deployment_notes: employee.deployment_targets?.deployment_notes || "",
            },
            deployment_service: {
              service_type: mapDeploymentService(employee.deployment_service?.service_type || ""),
            },
            consent_options: {
              recording_enabled: employee.consent_options?.recording_enabled || false,
              transcript_email_optin: employee.consent_options?.transcript_email_optin || false,
              privacy_notes: employee.consent_options?.privacy_notes || "",
            },
            instructions: {
              dos_and_donts: employee.instructions?.dos_donts || employee.instructions?.dos_and_donts || "",
              fallback_contacts: employee.instructions?.fallback_contacts || "",
            },
            targets: {
              success_goals: employee.success_targets?.description || employee.targets?.success_goals || "",
              success_metrics: employee.success_targets?.metrics || employee.targets?.success_metrics || "",
            },
          };
        }),
      };

      console.log('📤 Sending payload:', JSON.stringify(payloadData, null, 2));

      // Update client data with uploaded file references
      const updateResponse = await shivaiApiService.updateClientData(editData._id, payloadData);
      console.log('✅ Update response:', updateResponse);

      // Check if response is successful
      if (updateResponse && (updateResponse.success === true || updateResponse.statusCode === 200)) {
        // Update local state
        setClients((prev) => 
          prev.map((client) =>
            client._id === editData._id ? { ...client, ...editData, ...payloadData } : client
          )
        );

        toast.success(updateResponse.message || "Client data updated successfully!", { id: 'save-toast' });
        setIsEditing(false);
        handleBackToList();
      } else {
        throw new Error(updateResponse?.message || 'Update failed');
      }
    } catch (error) {
      console.error("Error saving client data:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to save client data";
      toast.error(errorMessage, { id: 'save-toast' });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    handleBackToList();
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
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

  // File handling functions
  const handleViewFile = async (file) => {
    try {
      const s3Key = file?.s3_key || file?.key;
      
      if (!s3Key) {
        toast.error('File key not found');
        return;
      }

      const response = await shivaiApiService.downloadFileByS3Key(s3Key);
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
    } catch (error) {
      console.error('Error viewing file:', error);
      toast.error('Failed to view file');
    }
  };

  const handleDownloadFile = async (file) => {
    try {
      const s3Key = file?.s3_key || file?.key;
      const fileName = file?.name || file?.filename || 'download';
      
      if (!s3Key) {
        toast.error('File key not found');
        return;
      }

      // Use shivaiApiService to download file with s3_key in body
      const response = await shivaiApiService.downloadFileByS3Key(s3Key);
      
      // Create object URL from blob response
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the object URL
      window.URL.revokeObjectURL(url);
      
      toast.success('Download started');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const handleViewFAQ = (faqText) => {
    // Create a modal or alert to display FAQ text
    alert(faqText);
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
    console.log('updateIndustry called with:', industries);
    setEditData((prev) => {
      const newData = {
        ...prev,
        company_basics: {
          ...prev?.company_basics,
          industry: industries,
        },
      };
      console.log('Updated editData:', newData);
      return newData;
    });
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
      ai_employees: (prev?.ai_employees || []).map((emp, i) => {
        if (i !== index) return emp;
        
        const newEmp = { ...emp };
        
        // Handle nested field paths like "instructions.dos_donts"
        if (field.includes('.')) {
          const keys = field.split('.');
          let current = newEmp;
          
          // Navigate to the parent object
          for (let j = 0; j < keys.length - 1; j++) {
            if (!current[keys[j]]) current[keys[j]] = {};
            current = current[keys[j]];
          }
          
          // Set the final value
          current[keys[keys.length - 1]] = value;
        } else {
          // Simple field update
          newEmp[field] = value;
        }
        
        return newEmp;
      }),
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
            disabled={!isEditing}
            className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-vertical ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        ) : type === "select" ? (
          children
        ) : (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={!isEditing}
            className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        )}
      </div>
    );
  };

  // Remove whole component loading - we'll show loading in the table instead

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
              {!isEditing ? (
                <button
                  onClick={handleToggleEdit}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg admin-btn-primary transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base`}
                >
                  <RiEditLine className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base`}
                  >
                    <RiCloseLine className="w-4 h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 sm:flex-none admin-btn-primary px-3 sm:px-4 py-2 text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <RiCheckLine className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                </>
              )}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
              <div className="relative">
                <label
                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                >
                  Industry (select up to 4)
                </label>
                <div className="relative" data-industry-dropdown>
                  <input
                    type="text"
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    onFocus={() => setShowIndustryDropdown(true)}
                    onClick={() => isEditing && setShowIndustryDropdown(true)}
                    disabled={!isEditing}
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`} ${(editData?.company_basics?.industry || []).length >= 4 ? 'cursor-not-allowed' : ''}`}
                    placeholder={(editData?.company_basics?.industry || []).length >= 4 ? "Maximum 4 industries selected" : "Search or select industries"}
                  />
                  <RiArrowDownLine
                    className={`absolute right-2.5 top-2.5 w-4 h-4 text-gray-400 transition-transform cursor-pointer ${showIndustryDropdown ? "rotate-180" : ""}`}
                    onClick={() => isEditing && setShowIndustryDropdown(!showIndustryDropdown)}
                  />

                  {/* Selected Industries Display */}
                  {(editData?.company_basics?.industry || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editData?.company_basics?.industry || []).map((industry, index) => {
                        const industryLabel = industryOptions.find(opt => opt.value === industry)?.label || industry;
                        return (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                            {industryLabel}
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newIndustries = (editData?.company_basics?.industry || []).filter((_, i) => i !== index);
                                  updateIndustry(newIndustries);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <RiCloseLine className="w-3 h-3" />
                              </button>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Dropdown Options */}
                  {showIndustryDropdown && isEditing && (
                    <div 
                      className={`absolute z-50 w-full mt-1 ${currentTheme.cardBg} border ${currentTheme.border} rounded-lg shadow-xl max-h-48 overflow-y-auto`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {industryOptions
                        .filter(option =>
                          option.label.toLowerCase().includes(industrySearch.toLowerCase()) &&
                          !(editData?.company_basics?.industry || []).includes(option.value)
                        )
                        .map((option) => (
                          <div
                            key={option.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Industry option clicked:', option.value);
                              const currentIndustries = editData?.company_basics?.industry || [];
                              console.log('Current industries:', currentIndustries);
                              if (option.value === "other") {
                                setIndustrySearch("Add your industry type");
                              } else if (currentIndustries.length < 4 && !currentIndustries.includes(option.value)) {
                                console.log('Adding industry:', option.value);
                                updateIndustry([...currentIndustries, option.value]);
                                setIndustrySearch("");
                                setTimeout(() => setShowIndustryDropdown(false), 100);
                              } else {
                                console.log('Max industries reached or already selected');
                              }
                            }}
                            className={`px-3 py-2 border-b ${currentTheme.border} last:border-b-0 ${(editData?.company_basics?.industry || []).length >= 4 ? 'cursor-not-allowed text-gray-400 bg-gray-50' : 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'}`}
                          >
                            {option.label}
                            {(editData?.company_basics?.industry || []).length >= 4 && (
                              <span className="text-xs text-gray-400 ml-2">(Max reached)</span>
                            )}
                          </div>
                        ))}
                      {industrySearch &&
                        !industryOptions.some(opt => opt.label.toLowerCase().includes(industrySearch.toLowerCase())) &&
                        !(editData?.company_basics?.industry || []).includes(industrySearch) && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Custom industry add clicked:', industrySearch);
                              const currentIndustries = editData?.company_basics?.industry || [];
                              if (currentIndustries.length < 4 && !currentIndustries.includes(industrySearch)) {
                                console.log('Adding custom industry:', industrySearch);
                                updateIndustry([...currentIndustries, industrySearch]);
                                setIndustrySearch("");
                                setTimeout(() => setShowIndustryDropdown(false), 100);
                              }
                            }}
                            className={`px-3 py-2 font-medium ${(editData?.company_basics?.industry || []).length >= 4 ? 'cursor-not-allowed text-gray-400 bg-gray-50' : 'hover:bg-blue-50 cursor-pointer text-blue-600'}`}
                          >
                            + Add "{industrySearch}"
                          </div>
                        )}
                    </div>
                  )}
                </div>
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  onChange={(e) => {
                    const selectedPlan = planOptions.find(p => p.apiKey === e.target.value);
                    updateEditData("plan_details.type", e.target.value);
                    if (selectedPlan) {
                      updateEditData("plan_details.ai_employee_limit", selectedPlan.aiEmployees);
                      updateEditData("plan_details.monthly_price", 
                        selectedPlan.price === "Custom" ? 0 : 
                        parseFloat(selectedPlan.price.replace(/[$\/mo,]/g, "") || "0")
                      );
                    }
                  }}
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                >
                  <option value="">Select Plan</option>
                  {planOptions.map((option) => (
                    <option key={option.id} value={option.apiKey}>
                      {option.name} - {option.price}
                    </option>
                  ))}
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
                  disabled={!isEditing || editData?.plan_details?.type !== "Custom Plan"}
                  placeholder={editData?.plan_details?.type === "Custom Plan" ? "Enter custom price" : "Auto-populated from plan"}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${(!isEditing || editData?.plan_details?.type !== "Custom Plan") ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={!isEditing || editData?.plan_details?.type !== "Custom Plan"}
                  placeholder={editData?.plan_details?.type === "Custom Plan" ? "Enter custom limit" : "Auto-populated from plan"}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${(!isEditing || editData?.plan_details?.type !== "Custom Plan") ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    disabled={!isEditing}
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    disabled={!isEditing}
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    disabled={!isEditing}
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    disabled={!isEditing}
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    disabled={!isEditing}
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      disabled={!isEditing}
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      disabled={!isEditing}
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      disabled={!isEditing}
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      disabled={!isEditing}
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                disabled={!isEditing}
                className={`admin-btn-primary px-4 py-2.5 text-sm w-full sm:w-auto flex items-center justify-center gap-2 font-medium ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
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
                  {isEditing && (
                    <button
                      onClick={addAIEmployee}
                      className="admin-btn-primary px-6 py-2.5 text-sm font-medium"
                    >
                      <RiUserAddLine className="w-4 h-4 mr-2" />
                      Create First AI Employee
                    </button>
                  )}
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
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Type
                      </label>
                      <select
                        value={ai?.type || ""}
                        onChange={(e) =>
                          updateAIEmployee(idx, "type", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                      >
                        <option value="">Select type</option>
                        {agentTypeOptions.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Template
                      </label>
                      <select
                        value={ai?.template || ""}
                        onChange={(e) =>
                          updateAIEmployee(idx, "template", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                      >
                        <option value="">Select template</option>
                        {templateOptions.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                      >
                        Language
                      </label>
                      <select
                        value={ai?.preferred_language || ""}
                        onChange={(e) =>
                          updateAIEmployee(
                            idx,
                            "preferred_language",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                      >
                        <option value="">Select language</option>
                        {languageOptions.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
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
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                      >
                        <option value="">Select voice gender</option>
                        {voiceGenderOptions.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}

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
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                            disabled={!isEditing}
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 0) {
                                // Add file objects for upload on save
                                const newFiles = files.map(file => ({
                                  name: file.name,
                                  original_name: file.name,
                                  file_size: file.size,
                                  file_type: file.type,
                                  // Mark as pending upload and store the actual File object
                                  pending_upload: true,
                                  fileObject: file // Store the File object for later upload
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
                            value={ai?.instructions?.dos_and_donts || ""}
                            onChange={(e) => updateAIEmployee(idx, "instructions.dos_and_donts", e.target.value)}
                            rows={4}
                            placeholder="Be professional, Don't share personal information..."
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                                  disabled={!isEditing}
                                  className={`flex-1 px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                                checked={ai?.deployment_service?.service_type === 'shivai'}
                                onChange={(e) => updateAIEmployee(idx, "deployment_service.service_type", "shivai")}
                                disabled={!isEditing}
                                className={`w-4 h-4 text-blue-500 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                              />
                              <span className="text-sm">Shivai</span>
                            </label>
                            <label className={`flex items-center gap-3 p-3 border ${currentTheme.border} rounded-lg cursor-pointer transition-colors ${ai?.deployment?.service_type === 'self' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20' : ''}`}>
                              <input
                                type="radio"
                                name={`service_type_${idx}`}
                                checked={ai?.deployment_service?.service_type === 'self'}
                                onChange={(e) => updateAIEmployee(idx, "deployment_service.service_type", "self")}
                                disabled={!isEditing}
                                className={`w-4 h-4 text-blue-500 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
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
                            {['Website', 'Mobile App'].map((channel) => (
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
                                  disabled={!isEditing}
                                  className={`w-3 h-3 text-blue-500 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
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
                            value={ai?.deployment_targets?.deployment_notes || ""}
                            onChange={(e) => updateAIEmployee(idx, "deployment_targets.deployment_notes", e.target.value)}
                            rows={3}
                            placeholder="Phase 1: Website implementation..."
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                              checked={ai?.consent_options?.recording_enabled || false}
                              onChange={(e) => updateAIEmployee(idx, "consent_options.recording_enabled", e.target.checked)}
                              disabled={!isEditing}
                              className={`w-4 h-4 text-blue-500 rounded ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                            <span className="text-sm">Recording Enabled</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={ai?.consent_options?.transcript_email_optin || false}
                              onChange={(e) => updateAIEmployee(idx, "consent_options.transcript_email_optin", e.target.checked)}
                              disabled={!isEditing}
                              className={`w-4 h-4 text-blue-500 rounded ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            value={ai?.consent_options?.privacy_notes || ""}
                            onChange={(e) => updateAIEmployee(idx, "consent_options.privacy_notes", e.target.value)}
                            placeholder="Privacy enabled"
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
              {paginationMeta?.total || totalItems || getCount("all")}
            </h3>
            <p className={`text-xs md:text-sm font-medium ${currentTheme.text}`}>All Clients</p>
            {paginationMeta && (
              <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
                Page {paginationMeta.page || currentPage} of {paginationMeta.totalPages || totalPages}
              </p>
            )}
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
          {["all", "newlySignup", "pending", "onboarded", "approved", "rejected"].map((tab) => {
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
            <div className={`text-center py-12 md:py-16 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}>
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
              <h3 className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-2`}>
                Loading clients...
              </h3>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                Please wait while we fetch the data
              </p>
            </div>
          ) : currentPageClients.length === 0 ? (
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
                      {(() => {
                        const planType = client?.userData?.onboarding?.plan_type || client?.plan_details?.type;
                        const plan = planOptions.find(p => p.apiKey === planType);
                        return plan ? `${plan.name} (${plan.price})` : planType || "No plan";
                      })()}
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
              Showing {((paginationMeta?.page || currentPage) - 1) * (paginationMeta?.limit || itemsPerPage) + 1} to {Math.min((paginationMeta?.page || currentPage) * (paginationMeta?.limit || itemsPerPage), paginationMeta?.total || totalItems)} of {paginationMeta?.total || totalItems}
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
                {paginationMeta?.page || currentPage}/{paginationMeta?.totalPages || totalPages}
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

