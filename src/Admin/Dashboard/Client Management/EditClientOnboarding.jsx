import React from "react";
import {
  RiArrowLeftLine,
  RiEditLine,
  RiCloseLine,
  RiCheckLine,
  RiBuildingLine,
  RiGlobalLine,
  RiMailLine,
  RiUserVoiceLine,
  RiBookOpenLine,
  RiRocketLine,
  RiFileTextLine,
  RiQuestionLine,
  RiRobotLine,
  RiShieldCheckLine,
  RiWhatsappLine,
  RiCalendarLine,
  RiShoppingBagLine,
  RiSlackLine,
  RiSettingsLine,
  RiAddLine,
  RiArrowDownLine,
  RiSettings4Line,
  RiMoneyDollarCircleLine,
  RiCpuLine,
  RiPulseLine,
  RiTokenSwapLine,
  RiVipCrownLine,
  RiShoppingBag3Line,
  RiExchangeDollarLine,
} from "react-icons/ri";
import { Target } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

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
  { value: "fr", label: "🇫🇷 French" },
  { value: "de", label: "🇩🇪 German" },
  { value: "hi", label: "🇮🇳 Hindi" },
  { value: "it", label: "🇮🇹 Italian" },
  { value: "ja", label: "🇯🇵 Japanese" },
  { value: "ko", label: "🇰🇷 Korean" },
  { value: "pt", label: "🇧🇷 Portuguese" },
  { value: "ru", label: "🇷🇺 Russian" },
  { value: "es", label: "🇪🇸 Spanish" },
  { value: "sv", label: "🇸🇪 Swedish" },
  { value: "tr", label: "🇹🇷 Turkish" },
];

const deploymentChannels = [
  { value: "website", label: "Website", icon: RiGlobalLine },
  { value: "whatsapp", label: "WhatsApp", icon: RiWhatsappLine },
  { value: "phone", label: "Phone", icon: RiUserVoiceLine },
  { value: "email", label: "Email", icon: RiMailLine },
  { value: "slack", label: "Slack", icon: RiSlackLine },
  { value: "appointment", label: "Appointment", icon: RiCalendarLine },
  { value: "crm", label: "CRM", icon: RiShoppingBagLine },
];

const planOptions = [
  { name: "Basic Plan", price: "$99/month", apiKey: "basic" },
  { name: "Professional", price: "$299/month", apiKey: "professional" },
  { name: "Business", price: "$599/month", apiKey: "business" },
  { name: "Enterprise", price: "$999/month", apiKey: "enterprise" },
];

const EditClientOnboarding = ({
  editData,
  setEditData,
  isEditing,
  onSave,
  onCancel,
  onToggleEdit,
}) => {
  const { currentTheme, theme } = useTheme();

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
      setEditData(prev => ({
        ...prev,
        deployment_targets: {
          ...prev?.deployment_targets,
          channels: [...(prev?.deployment_targets?.channels || []), channel]
        }
      }));
    }
  };

  const removeChannel = (channelToRemove) => {
    setEditData(prev => ({
      ...prev,
      deployment_targets: {
        ...prev?.deployment_targets,
        channels: (prev?.deployment_targets?.channels || []).filter(channel => channel !== channelToRemove)
      }
    }));
  };

  // AI Employee update functions
  const updateAIEmployee = (index, field, value) => {
    setEditData(prev => ({
      ...prev,
      ai_employees: (prev?.ai_employees || []).map((emp, i) => {
        if (i !== index) return emp;
        
        const newEmp = { ...emp };
        
        // Handle nested updates
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

  return (
    <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
      {/* Header with Actions */}
      <div
        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onCancel}
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
                onClick={onToggleEdit}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg admin-btn-primary transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base`}
              >
                <RiEditLine className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            ) : (
              <>
                <button
                  onClick={onCancel}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base`}
                >
                  <RiCloseLine className="w-4 h-4" />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={onSave}
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
                Website URL
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
                Address
              </label>
              <textarea
                value={editData?.company_basics?.address || ""}
                onChange={(e) =>
                  updateEditData("company_basics.address", e.target.value)
                }
                rows={2}
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
                  updateEditData("company_basics.company_size", e.target.value)
                }
                disabled={!isEditing}
                className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            {/* Industry Selection */}
            <div>
              <label
                className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
              >
                Industry
              </label>
              <div className="flex flex-wrap gap-1.5">
                {industryOptions.map((industry) => {
                  const isSelected = editData?.company_basics?.industry?.includes(industry.value);
                  return (
                    <button
                      key={industry.value}
                      type="button"
                      disabled={!isEditing}
                      onClick={() => {
                        if (!isEditing) return;
                        
                        const currentIndustries = editData?.company_basics?.industry || [];
                        if (isSelected) {
                          // Remove industry
                          updateIndustry(currentIndustries.filter(i => i !== industry.value));
                        } else {
                          // Add industry
                          updateIndustry([...currentIndustries, industry.value]);
                        }
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500"
                          : `${currentTheme.border} ${currentTheme.text} ${isEditing ? currentTheme.hover : 'opacity-50 cursor-not-allowed'}`
                      } ${!isEditing ? 'pointer-events-none' : ''}`}
                    >
                      {industry.label}
                    </button>
                  );
                })}
              </div>
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
            <RiVipCrownLine className="w-4 h-4 md:w-5 md:h-5" />
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
                disabled={!isEditing}
                className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : `${currentTheme.cardBg} ${currentTheme.text}`}`}
              >
                <option value="">Select plan</option>
                {planOptions.map(plan => (
                  <option key={plan.apiKey} value={plan.apiKey}>
                    {plan.name} - {plan.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Billing Contact */}
            <div>
              <label
                className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
              >
                Billing Contact
              </label>
              <div className="space-y-2">
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

            {/* Billing Address */}
            <div>
              <label
                className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
              >
                Billing Address
              </label>
              <div className="space-y-2">
                <textarea
                  value={editData?.plan_details?.billing_address?.address || ""}
                  onChange={(e) =>
                    updateEditData(
                      "plan_details.billing_address.address",
                      e.target.value
                    )
                  }
                  placeholder="Street Address"
                  rows={2}
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
                <input
                  type="text"
                  value={
                    editData?.plan_details?.billing_address?.postal_code || ""
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
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Targets */}
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl`}
        >
          <h3
            className={`text-base md:text-lg font-bold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
          >
            <RiRocketLine className="w-4 h-4 md:w-5 md:h-5" />
            Deployment Targets
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label
                className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
              >
                Deployment Channels
              </label>
              
              {/* Available Channels */}
              {isEditing && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {deploymentChannels.map((channel) => {
                    const Icon = channel.icon;
                    const isSelected = editData?.deployment_targets?.channels?.includes(channel.value);
                    
                    return (
                      <button
                        key={channel.value}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            removeChannel(channel.value);
                          } else {
                            addChannel(channel.value);
                          }
                        }}
                        className={`p-2 text-xs rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                          isSelected
                            ? "bg-blue-500 text-white border-blue-500"
                            : `${currentTheme.border} ${currentTheme.text} ${currentTheme.hover}`
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {channel.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Selected Channels Display */}
              <div className="flex flex-wrap gap-2">
                {(editData?.deployment_targets?.channels || []).map((channel) => {
                  const channelConfig = deploymentChannels.find(c => c.value === channel);
                  const Icon = channelConfig?.icon || RiGlobalLine;
                  
                  return (
                    <div
                      key={channel}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg bg-blue-100 text-blue-800 border border-blue-200`}
                    >
                      <Icon className="w-3 h-3" />
                      {channelConfig?.label || channel}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeChannel(channel)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <RiCloseLine className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <FormField
              label="Website URL"
              value={editData?.deployment_targets?.website_url}
              onChange={(value) => updateEditData("deployment_targets.website_url", value)}
              type="url"
              placeholder="https://example.com"
            />

            <FormField
              label="WhatsApp Business Phone"
              value={editData?.deployment_targets?.whatsapp_phone}
              onChange={(value) => updateEditData("deployment_targets.whatsapp_phone", value)}
              type="tel"
              placeholder="+1234567890"
            />

            <FormField
              label="Support Email"
              value={editData?.deployment_targets?.support_email}
              onChange={(value) => updateEditData("deployment_targets.support_email", value)}
              type="email"
              placeholder="support@company.com"
            />
          </div>
        </div>

        {/* AI Employees */}
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-xl lg:col-span-2`}
        >
          <h3
            className={`text-base md:text-lg font-bold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
          >
            <RiRobotLine className="w-4 h-4 md:w-5 md:h-5" />
            AI Employees ({(editData?.ai_employees || []).length})
          </h3>

          {(editData?.ai_employees || []).length === 0 ? (
            <div className={`text-center py-8 rounded-lg border-2 border-dashed ${currentTheme.border}`}>
              <RiRobotLine className={`w-12 h-12 mx-auto mb-3 ${currentTheme.textSecondary} opacity-50`} />
              <p className={`${currentTheme.textSecondary} font-medium mb-2`}>No AI Employees configured</p>
              <p className={`${currentTheme.textSecondary} text-sm opacity-75`}>
                AI Employees will appear here when configured during onboarding
              </p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {editData?.ai_employees?.map((employee, idx) => (
                <div
                  key={idx}
                  className={`border ${currentTheme.border} rounded-lg p-4 ${currentTheme.searchBg}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${currentTheme.activeBg} flex items-center justify-center`}>
                      <RiRobotLine className={`w-5 h-5 ${currentTheme.text}`} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${currentTheme.text}`}>
                        AI Employee #{idx + 1}
                      </h4>
                      <p className={`text-xs ${currentTheme.textSecondary}`}>
                        {employee?.template || employee?.type || "Custom Agent"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Employee Name"
                      value={employee?.name}
                      onChange={(value) => updateAIEmployee(idx, "name", value)}
                      placeholder="AI Assistant Name"
                    />

                    <FormField
                      label="Template Type"
                      value={employee?.template}
                      onChange={(value) => updateAIEmployee(idx, "template", value)}
                      type="select"
                    >
                      <select
                        value={employee?.template || ""}
                        onChange={(e) => updateAIEmployee(idx, "template", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        <option value="">Select template</option>
                        {templateOptions.map(template => (
                          <option key={template.value} value={template.value}>
                            {template.label}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField
                      label="Languages"
                      value={Array.isArray(employee?.languages) ? employee.languages.join(", ") : (employee?.languages || "")}
                      onChange={(value) => updateAIEmployee(idx, "languages", value.split(",").map(lang => lang.trim()))}
                      placeholder="English, Spanish, French"
                    />

                    <FormField
                      label="Response Tone"
                      value={employee?.response_tone}
                      onChange={(value) => updateAIEmployee(idx, "response_tone", value)}
                      placeholder="Professional, Friendly, Casual"
                    />

                    <div className="md:col-span-2">
                      <FormField
                        label="Instructions"
                        value={employee?.instructions}
                        onChange={(value) => updateAIEmployee(idx, "instructions", value)}
                        type="textarea"
                        rows={3}
                        placeholder="Specific instructions for this AI employee..."
                      />
                    </div>

                    {/* Knowledge Sources */}
                    <div className="md:col-span-2">
                      <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                        Knowledge Sources
                      </label>
                      
                      <div className="space-y-3">
                        <FormField
                          label="FAQs Text"
                          value={employee?.knowledge_sources?.faqs_text}
                          onChange={(value) => updateAIEmployee(idx, "knowledge_sources.faqs_text", value)}
                          type="textarea"
                          rows={3}
                          placeholder="Frequently asked questions and answers..."
                        />

                        <FormField
                          label="Website URL"
                          value={employee?.knowledge_sources?.website_url}
                          onChange={(value) => updateAIEmployee(idx, "knowledge_sources.website_url", value)}
                          type="url"
                          placeholder="https://company.com"
                        />

                        {/* Uploaded Files Display */}
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}>
                            Uploaded Files
                          </label>
                          
                          {(!employee?.knowledge_sources?.uploaded_files || employee.knowledge_sources.uploaded_files.length === 0) ? (
                            <div className={`text-center py-6 rounded-lg border-2 border-dashed ${currentTheme.border}`}>
                              <RiFileTextLine className={`w-8 h-8 mx-auto mb-2 ${currentTheme.textSecondary} opacity-50`} />
                              <p className={`${currentTheme.textSecondary} text-sm font-medium mb-1`}>No files uploaded</p>
                              <p className={`${currentTheme.textSecondary} text-xs mb-3 opacity-75`}>
                                Upload documents, PDFs, or text files to enhance the AI's knowledge
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {employee.knowledge_sources.uploaded_files.map((file, fileIdx) => (
                                <div
                                  key={fileIdx}
                                  className={`flex items-center justify-between p-3 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <RiFileTextLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                    <div>
                                      <p className={`text-sm font-medium ${currentTheme.text}`}>
                                        {file.original_name || file.name}
                                      </p>
                                      <p className={`text-xs ${currentTheme.textSecondary}`}>
                                        {file.file_size ? `${Math.round(file.file_size / 1024)} KB` : 'Unknown size'}
                                      </p>
                                    </div>
                                  </div>
                                  {file.pending_upload && (
                                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-lg">
                                      Pending Upload
                                    </span>
                                  )}
                                </div>
                              ))}
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
                                }
                              }}
                              className={`w-full text-sm ${currentTheme.text} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                              accept=".pdf,.doc,.docx,.txt,.md"
                            />
                            <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
                              Supported formats: PDF, DOC, DOCX, TXT, MD
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Success Targets */}
                    <div className="md:col-span-2">
                      <label className={`text-xs ${currentTheme.textSecondary} uppercase block mb-3`}>
                        Success Targets
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          label="Success Goals"
                          value={employee?.success_targets?.description || employee?.targets?.success_goals}
                          onChange={(value) => updateAIEmployee(idx, "success_targets.description", value)}
                          type="textarea"
                          rows={3}
                          placeholder="What should this AI employee achieve?"
                        />

                        <FormField
                          label="Success Metrics"
                          value={employee?.success_targets?.metrics || employee?.targets?.success_metrics}
                          onChange={(value) => updateAIEmployee(idx, "success_targets.metrics", value)}
                          type="textarea"
                          rows={3}
                          placeholder="How will success be measured?"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditClientOnboarding;
