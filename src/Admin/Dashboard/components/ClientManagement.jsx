import React, { useState } from "react";
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
} from "react-icons/ri";
import {
  Users,
  UserCheck,
  UserPlus,
  Crown,
  CreditCard,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ClientManagement = () => {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); // approved, pending, rejected
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list or detail

  // Mock data based on API response
  const mockOnboardingData = {
    approved: [
      // Add approved clients here
    ],
    pending: [
      {
        _id: "691708638fa99f54974f55fb",
        userId: "68df9916a4a6ac7cd8a4a9a1",
        status: "pending",
        created_at: "2025-11-14T10:45:55.528Z",
        updated_at: "2025-11-14T10:45:55.528Z",
        company_basics: {
          phone: "+14155550123",
          name: "Acme Corporation",
          industry: ["Technology", "SaaS"],
          company_size: "51-200",
          company_email: "contact@acmecorp.com",
          company_phone: "+14155550100",
          website: "https://www.acmecorp.com",
          linkedin_profile: "https://www.linkedin.com/company/acmecorp",
          description: "Leading provider of AI solutions",
          primary_region: {
            countries: [],
            states: [],
            cities: [],
          },
        },
        plan_details: {
          type: "Advanced Plan",
          ai_employee_limit: 2,
          monthly_price: 299,
          billing_contact: {
            name: "John Smith",
            email: "billing@acmecorp.com",
            phone: "+15551234567",
            company_name: "Acme Corp",
          },
          billing_address: {
            street: "123 Main Street",
            city: "San Francisco",
            state: "CA",
            postal_code: "94105",
            country: "United States",
          },
          features: [],
        },
        ai_employees: [
          {
            name: "Sales AI Employee",
            type: "Sales",
            template: "Sales & Business Development",
            preferred_language: "English",
            voice_gender: "Gender Neutral",
            agent_personality: "Enthusiastic & Energetic",
            voice_style: "Energetic & Enthusiastic",
            special_instructions: "Focus on customer needs",
            _id: "691708638fa99f54974f55fc",
          },
          {
            name: "Support AI",
            type: "Support",
            preferred_language: "English",
            voice_gender: "Female",
            _id: "691708638fa99f54974f55fd",
          },
        ],
        knowledge_sources: {
          website_url: "https://www.acmecorp.com",
          social_links: {
            linkedin: "https://linkedin.com/company/acmecorp",
          },
          uploaded_files: [],
          faqs_text: "Q: Refund policy?\\nA: 30-day guarantee",
        },
        instructions: {
          dos_and_donts: "Be professional",
          fallback_contacts: "john@acmecorp.com",
        },
        targets: {
          success_goals: "Automate 70% interactions",
          success_metrics: "Reduce tickets by 40%",
        },
        deployment_targets: {
          channels: ["Website", "WhatsApp"],
          deployment_notes: "Phase 1: Website",
        },
        deployment_service: {
          service_type: "Shivai",
        },
        consent_options: {
          recording_enabled: true,
          transcript_email_optin: true,
          privacy_notes: "Privacy enabled",
        },
      },
    ],
    rejected: [
      // Add rejected clients here
    ],
  };

  const getClientsForTab = () => {
    return mockOnboardingData[activeTab] || [];
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setSelectedClient(null);
    setViewMode("list");
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

  // Render Detail View
  if (viewMode === "detail" && selectedClient) {
    return (
      <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
        {/* Back Button */}
        <button
          onClick={handleBackToList}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200`}
        >
          <RiArrowLeftLine className="w-5 h-5" />
          Back to List
        </button>

        {/* Client Details Header */}
        <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}>
                <RiBuildingLine className={`w-8 h-8 ${currentTheme.text}`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${currentTheme.text} mb-1`}>
                  {selectedClient.company_basics.name}
                </h2>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  {selectedClient.company_basics.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {selectedClient.company_basics.industry.map((ind, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded text-xs font-medium ${currentTheme.activeBg} ${currentTheme.text}`}
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${currentTheme.activeBg} ${currentTheme.text} border ${currentTheme.border}`}
              >
                {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="admin-btn-primary px-4 py-2">
              <RiCheckLine className="w-4 h-4" />
              Approve
            </button>
            <button className={`px-4 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 flex items-center gap-2`}>
              <RiCloseLine className="w-4 h-4" />
              Reject
            </button>
            <button className={`px-4 py-2 ${currentTheme.border} border rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 flex items-center gap-2`}>
              <RiEditLine className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Basics */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <RiBuildingLine className="w-5 h-5" />
              Company Basics
            </h3>
            <div className="space-y-3">
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Company Size</label>
                <p className={`${currentTheme.text} font-medium`}>{selectedClient.company_basics.company_size}</p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Website</label>
                <a href={selectedClient.company_basics.website} target="_blank" rel="noopener noreferrer" className={`${currentTheme.text} hover:underline flex items-center gap-1`}>
                  <RiGlobalLine className="w-4 h-4" />
                  {selectedClient.company_basics.website}
                </a>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Email</label>
                <p className={`${currentTheme.text} font-medium flex items-center gap-1`}>
                  <RiMailLine className="w-4 h-4" />
                  {selectedClient.company_basics.company_email}
                </p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Phone</label>
                <p className={`${currentTheme.text} font-medium flex items-center gap-1`}>
                  <RiPhoneLine className="w-4 h-4" />
                  {selectedClient.company_basics.company_phone}
                </p>
              </div>
              {selectedClient.company_basics.linkedin_profile && (
                <div>
                  <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>LinkedIn</label>
                  <a href={selectedClient.company_basics.linkedin_profile} target="_blank" rel="noopener noreferrer" className={`${currentTheme.text} hover:underline flex items-center gap-1`}>
                    <RiLinkedinLine className="w-4 h-4" />
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Plan Details */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <RiBankCardLine className="w-5 h-5" />
              Plan Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Plan Type</label>
                <p className={`${currentTheme.text} font-medium text-lg`}>{selectedClient.plan_details.type}</p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Monthly Price</label>
                <p className={`${currentTheme.text} font-bold text-2xl`}>${selectedClient.plan_details.monthly_price}/mo</p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>AI Employee Limit</label>
                <p className={`${currentTheme.text} font-medium`}>{selectedClient.plan_details.ai_employee_limit} AI Employees</p>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <label className={`text-xs ${currentTheme.textSecondary} uppercase mb-2 block`}>Billing Contact</label>
                <p className={`${currentTheme.text} font-medium`}>{selectedClient.plan_details.billing_contact.name}</p>
                <p className={`${currentTheme.textSecondary} text-sm`}>{selectedClient.plan_details.billing_contact.email}</p>
                <p className={`${currentTheme.textSecondary} text-sm`}>{selectedClient.plan_details.billing_contact.phone}</p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase mb-2 block`}>Billing Address</label>
                <p className={`${currentTheme.text} text-sm flex items-start gap-1`}>
                  <RiMapPinLine className="w-4 h-4 mt-0.5" />
                  <span>
                    {selectedClient.plan_details.billing_address.street}<br />
                    {selectedClient.plan_details.billing_address.city}, {selectedClient.plan_details.billing_address.state} {selectedClient.plan_details.billing_address.postal_code}<br />
                    {selectedClient.plan_details.billing_address.country}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* AI Employees */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl lg:col-span-2`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <RiUserVoiceLine className="w-5 h-5" />
              AI Employees ({selectedClient.ai_employees.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedClient.ai_employees.map((ai, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.hover}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className={`${currentTheme.text} font-bold text-lg`}>{ai.name}</h4>
                      <p className={`${currentTheme.textSecondary} text-sm`}>{ai.type}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${currentTheme.activeBg} ${currentTheme.text}`}
                    >
                      {ai.voice_gender}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {ai.template && (
                      <div>
                        <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Template</label>
                        <p className={`${currentTheme.text} text-sm`}>{ai.template}</p>
                      </div>
                    )}
                    <div>
                      <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Language</label>
                      <p className={`${currentTheme.text} text-sm`}>{ai.preferred_language}</p>
                    </div>
                    {ai.agent_personality && (
                      <div>
                        <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Personality</label>
                        <p className={`${currentTheme.text} text-sm`}>{ai.agent_personality}</p>
                      </div>
                    )}
                    {ai.voice_style && (
                      <div>
                        <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Voice Style</label>
                        <p className={`${currentTheme.text} text-sm`}>{ai.voice_style}</p>
                      </div>
                    )}
                    {ai.special_instructions && (
                      <div>
                        <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Special Instructions</label>
                        <p className={`${currentTheme.text} text-sm`}>{ai.special_instructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Sources */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <RiBookOpenLine className="w-5 h-5" />
              Knowledge Sources
            </h3>
            <div className="space-y-3">
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Website URL</label>
                <a href={selectedClient.knowledge_sources.website_url} target="_blank" rel="noopener noreferrer" className={`${currentTheme.text} hover:underline flex items-center gap-1`}>
                  <RiGlobalLine className="w-4 h-4" />
                  {selectedClient.knowledge_sources.website_url}
                </a>
              </div>
              {selectedClient.knowledge_sources.social_links?.linkedin && (
                <div>
                  <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>LinkedIn</label>
                  <a href={selectedClient.knowledge_sources.social_links.linkedin} target="_blank" rel="noopener noreferrer" className={`${currentTheme.text} hover:underline flex items-center gap-1`}>
                    <RiLinkedinLine className="w-4 h-4" />
                    Company LinkedIn
                  </a>
                </div>
              )}
              {selectedClient.knowledge_sources.faqs_text && (
                <div>
                  <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>FAQs</label>
                  <pre className={`${currentTheme.text} text-sm whitespace-pre-wrap ${currentTheme.cardBg} border ${currentTheme.border} p-3 rounded-lg`}>
                    {selectedClient.knowledge_sources.faqs_text}
                  </pre>
                </div>
              )}
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Uploaded Files</label>
                <p className={`${currentTheme.text} text-sm`}>
                  {selectedClient.knowledge_sources.uploaded_files.length > 0 
                    ? `${selectedClient.knowledge_sources.uploaded_files.length} files`
                    : "No files uploaded"}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions & Targets */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <RiLightbulbLine className="w-5 h-5" />
              Instructions & Targets
            </h3>
            <div className="space-y-3">
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Do's and Don'ts</label>
                <p className={`${currentTheme.text} text-sm`}>{selectedClient.instructions.dos_and_donts}</p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Fallback Contacts</label>
                <p className={`${currentTheme.text} text-sm`}>{selectedClient.instructions.fallback_contacts}</p>
              </div>
              <div className={`pt-3 border-t ${currentTheme.border}`}>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Success Goals</label>
                <p className={`${currentTheme.text} text-sm`}>{selectedClient.targets.success_goals}</p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Success Metrics</label>
                <p className={`${currentTheme.text} text-sm`}>{selectedClient.targets.success_metrics}</p>
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl lg:col-span-2`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <RiRocketLine className="w-5 h-5" />
              Deployment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase mb-2 block`}>Channels</label>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.deployment_targets.channels.map((channel, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${currentTheme.activeBg} ${currentTheme.text}`}
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Service Type</label>
                <p className={`${currentTheme.text} font-medium`}>{selectedClient.deployment_service.service_type}</p>
              </div>
              <div className="md:col-span-2">
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Deployment Notes</label>
                <p className={`${currentTheme.text} text-sm`}>{selectedClient.deployment_targets.deployment_notes}</p>
              </div>
            </div>
          </div>

          {/* Consent Options */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl lg:col-span-2`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4`}>Consent & Privacy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg ${currentTheme.hover} border ${currentTheme.border}`}>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}>Recording Enabled</label>
                <p className={`${currentTheme.text} font-medium flex items-center gap-2`}>
                  {selectedClient.consent_options.recording_enabled ? (
                    <><RiCheckLine className="w-5 h-5" /> Yes</>
                  ) : (
                    <><RiCloseLine className="w-5 h-5" /> No</>
                  )}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${currentTheme.hover} border ${currentTheme.border}`}>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}>Transcript Email Opt-in</label>
                <p className={`${currentTheme.text} font-medium flex items-center gap-2`}>
                  {selectedClient.consent_options.transcript_email_optin ? (
                    <><RiCheckLine className="w-5 h-5" /> Yes</>
                  ) : (
                    <><RiCloseLine className="w-5 h-5" /> No</>
                  )}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${currentTheme.hover} border ${currentTheme.border}`}>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase mb-1 block`}>Privacy Notes</label>
                <p className={`${currentTheme.text} text-sm`}>{selectedClient.consent_options.privacy_notes}</p>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-6 shadow-xl lg:col-span-2`}>
            <h3 className={`text-lg font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <RiTimeLine className="w-5 h-5" />
              Timestamps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Created At</label>
                <p className={`${currentTheme.text} font-medium`}>
                  {new Date(selectedClient.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <label className={`text-xs ${currentTheme.textSecondary} uppercase`}>Updated At</label>
                <p className={`${currentTheme.text} font-medium`}>
                  {new Date(selectedClient.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8  px-2 sm:px-0">
      {/* Client Stats Grid - Matching Dashboard Layout */}
      <div className="relative hidden">
        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
          {clientStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group">
                <div
                  className={`${currentTheme.cardBg} border ${
                    currentTheme.border
                  } rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${
                    theme === "light"
                      ? currentTheme.cardShadow || "shadow-lg"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentTheme.activeBg}`}
                    >
                      <Icon className={`w-5 h-5 ${currentTheme.text}`} />
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-medium ${
                          stat.change.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
                  >
                    {stat.value}
                  </h3>
                  <p
                    className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                  >
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet Sliding Cards */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-3 md:gap-4 pb-2"
            style={{ width: "max-content" }}
          >
            {clientStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group flex-shrink-0 w-44 md:w-52">
                  <div
                    className={`${currentTheme.cardBg} border ${
                      currentTheme.border
                    } rounded-lg p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${
                      theme === "light"
                        ? currentTheme.cardShadow || "shadow-lg"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${currentTheme.activeBg} flex items-center justify-center shadow-lg`}
                      >
                        <Icon
                          className={`w-4 h-4 md:w-5 md:h-5 ${currentTheme.text}`}
                        />
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-medium ${
                            stat.change.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`text-lg md:text-xl font-semibold ${currentTheme.text} mb-1`}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className={`text-xs md:text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                    >
                      {stat.label}
                    </p>
                    <p
                      className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                    >
                      {stat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid - Matching Dashboard Pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Client Management Activity */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="relative group">
            <div
              className={`absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-400/10 blur-xl group-hover:blur-2xl transition-all duration-300 ${
                theme === "light" ? "opacity-50" : ""
              }`}
            ></div>
            <div
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                currentTheme.border
              } p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                theme === "light"
                  ? "shadow-gray-200/50"
                  : "shadow-gray-900/50"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
                <h2
                  className={`text-lg md:text-xl font-bold ${currentTheme.text} flex items-center gap-2`}
                >
                  <RiTeamLine className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                  Client Onboarding
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <RiSearchLine
                      className={`absolute hidden lg:flex left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
                    />
                    <input
                      type="text"
                      placeholder="Search clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className={`flex gap-2 mb-4 md:mb-6 border-b ${currentTheme.border}`}>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === "pending"
                      ? `${currentTheme.activeBorder} ${currentTheme.text}`
                      : `border-transparent ${currentTheme.textSecondary} ${currentTheme.hover}`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RiTimeLine className="w-4 h-4" />
                    Pending
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === "pending"
                        ? `${currentTheme.activeBg} ${currentTheme.text}`
                        : `${currentTheme.textSecondary}`
                    }`}>
                      {mockOnboardingData.pending.length}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("approved")}
                  className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === "approved"
                      ? `${currentTheme.activeBorder} ${currentTheme.text}`
                      : `border-transparent ${currentTheme.textSecondary} ${currentTheme.hover}`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RiCheckLine className="w-4 h-4" />
                    Approved
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === "approved"
                        ? `${currentTheme.activeBg} ${currentTheme.text}`
                        : `${currentTheme.textSecondary}`
                    }`}>
                      {mockOnboardingData.approved.length}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === "rejected"
                      ? `${currentTheme.activeBorder} ${currentTheme.text}`
                      : `border-transparent ${currentTheme.textSecondary} ${currentTheme.hover}`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RiCloseLine className="w-4 h-4" />
                    Rejected
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === "rejected"
                        ? `${currentTheme.activeBg} ${currentTheme.text}`
                        : `${currentTheme.textSecondary}`
                    }`}>
                      {mockOnboardingData.rejected.length}
                    </span>
                  </div>
                </button>
              </div>

              {/* Desktop Grid - Quick Stats */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-3 mb-4 md:mb-6">
                <div
                  className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                    >
                      <RiUserFollowLine
                        className={`w-3 h-3 ${currentTheme.text}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${currentTheme.text}`}
                    >
                      New Clients
                    </span>
                  </div>
                  <p className={`text-xl font-bold ${currentTheme.text}`}>
                    12
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    This month
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                    >
                      <RiBankCardLine
                        className={`w-3 h-3 ${currentTheme.text}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${currentTheme.text}`}
                    >
                      Premium Plans
                    </span>
                  </div>
                  <p className={`text-xl font-bold ${currentTheme.text}`}>
                    247
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    Active subscriptions
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                    >
                      <RiAlarmWarningLine
                        className={`w-3 h-3 ${currentTheme.text}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${currentTheme.text}`}
                    >
                      Expiring Soon
                    </span>
                  </div>
                  <p className={`text-xl font-bold ${currentTheme.text}`}>
                    8
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    Next 7 days
                  </p>
                </div>
              </div>

              {/* Mobile Sliding Cards */}
              <div className="sm:hidden overflow-x-auto scrollbar-hide mb-4 md:mb-6">
                <div
                  className="flex gap-3 pb-2"
                  style={{ width: "max-content" }}
                >
                  <div
                    className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <UserCheck
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${currentTheme.text}`}
                      >
                        New Clients
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${currentTheme.text}`}>
                      12
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      This month
                    </p>
                  </div>

                  <div
                    className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <CreditCard
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${currentTheme.text}`}
                      >
                        Premium Plans
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${currentTheme.text}`}>
                      247
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      Active subscriptions
                    </p>
                  </div>

                  <div
                    className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <RiErrorWarningLine
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${currentTheme.text}`}
                      >
                        Expiring Soon
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${currentTheme.text}`}>
                      8
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      Next 7 days
                    </p>
                  </div>
                </div>
              </div>

              {/* Client List */}
              <div className="space-y-3">
                {getClientsForTab().length === 0 ? (
                  <div className={`text-center py-12 ${currentTheme.textSecondary}`}>
                    <p className="text-lg">No {activeTab} clients found</p>
                  </div>
                ) : (
                  getClientsForTab().map((client, index) => (
                    <div
                      key={client._id}
                      className={`flex items-center justify-between p-4 rounded-xl border ${currentTheme.border} ${currentTheme.hover} shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-12 h-12 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}>
                            <RiBuildingLine className={`w-6 h-6 ${currentTheme.text}`} />
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                              theme === "light"
                                ? "border-white"
                                : "border-gray-900"
                            } ${currentTheme.activeBg}`}
                          ></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`${currentTheme.text} font-semibold`}>
                              {client.company_basics.name}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${currentTheme.activeBg} ${currentTheme.text}`}
                            >
                              {client.plan_details.type}
                            </span>
                          </div>
                          <p className={`${currentTheme.textSecondary} text-sm`}>
                            {client.company_basics.company_email} • {client.company_basics.company_size}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <p className={`${currentTheme.textSecondary} text-xs`}>
                              {client.company_basics.industry.join(", ")}
                            </p>
                            <p className={`${currentTheme.textSecondary} text-xs`}>
                              AI Employees: {client.ai_employees.length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                       
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleViewClient(client)}
                            className={`p-2 rounded-lg ${currentTheme.hover} transition-all duration-300 cursor-pointer`}
                          >
                            <RiEyeLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                          </button>
                          <button className={`p-2 rounded-lg ${currentTheme.hover} transition-all duration-300 cursor-pointer`}>
                            <RiEditLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">
          {/* Client Activity */}
          <div className="relative group">
            <div
              className={`absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-400/10 blur-xl group-hover:blur-2xl transition-all duration-300 ${
                theme === "light" ? "opacity-50" : ""
              }`}
            ></div>
            <div
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                currentTheme.border
              } p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                theme === "light"
                  ? "shadow-green-200/30"
                  : "shadow-green-900/30"
              }`}
            >
              <h3
                className={`font-semibold ${currentTheme.text} mb-3 md:mb-4 text-sm md:text-base`}
              >
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  {
                    user: "John Smith",
                    action: "Updated profile",
                    time: "2 mins ago",
                    type: "update",
                  },
                  {
                    user: "Sarah Johnson",
                    action: "Created new task",
                    time: "15 mins ago",
                    type: "create",
                  },
                  {
                    user: "Mike Chen",
                    action: "Logged in",
                    time: "1 hour ago",
                    type: "login",
                  },
                  {
                    user: "Emily Davis",
                    action: "Account created",
                    time: "2 hours ago",
                    type: "signup",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "create"
                          ? "bg-green-500"
                          : activity.type === "update"
                          ? "bg-blue-500"
                          : activity.type === "login"
                          ? "bg-purple-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`${currentTheme.text} text-xs md:text-sm font-medium`}
                      >
                        {activity.user}
                      </p>
                      <p className={`${currentTheme.textSecondary} text-xs`}>
                        {activity.action}
                      </p>
                      <p className={`${currentTheme.textSecondary} text-xs`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="relative group">
            <div
              className={`absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-400/10 blur-xl group-hover:blur-2xl transition-all duration-300 ${
                theme === "light" ? "opacity-50" : ""
              }`}
            ></div>
            <div
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                currentTheme.border
              } p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                theme === "light"
                  ? "shadow-purple-200/30"
                  : "shadow-purple-900/30"
              }`}
            >
              <h3
                className={`font-semibold ${currentTheme.text} mb-3 md:mb-4 text-sm md:text-base`}
              >
                Quick Actions
              </h3>
              <div className="flex gap-3 items-center flex-wrap">
                <button className="admin-btn-primary py-2 px-4">
                  <RiUserAddLine className="w-4 h-4" />
                  Invite Client
                </button>

                <button className="admin-btn-primary px-4 py-2">
                  <RiDownloadLine className="w-4 h-4" />
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;