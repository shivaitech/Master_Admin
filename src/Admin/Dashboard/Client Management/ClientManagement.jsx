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
  Users,
  Search,
  User,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  CreditCard,
  Download,
  Check,
  CheckCheck,
  X,
  Clock,
  ArrowLeft,
  Globe,
  Mail,
  Building2,
  Mic2,
  BookOpen,
  Rocket,
  FileText,
  HelpCircle,
  Bot,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  AlertCircle,
  Info,
  Send,
  Play,
  Mic,
  Calendar,
  ShoppingBag,
  Slack,
  Settings,
  Plus,
  ListChecks,
  ArrowDown,
  Settings2,
  DollarSign,
  Cpu,
  Activity,
  Repeat,
  Crown,
  BarChart3,
  Phone,
  MessageSquareOff,
  UserCircle2,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import {
  Target,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Pause,
  Loader2,
  XCircle,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  MessageSquare,
} from "lucide-react";

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

// Tab Components (exported for use in ClientDetailsPage)
const OnboardingDataTab = ({ client, currentTheme }) => {
  const [onboardingData, setOnboardingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch onboarding data using the API
  useEffect(() => {
    const fetchOnboardingData = async () => {
      const userId =
        client?.userData?._id ||
        client?._id ||
        client?.userData?.id ||
        client?.id;

      if (!userId) {
        console.warn("⚠️ No user ID found for fetching onboarding data");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("🔍 Fetching onboarding data for user ID:", userId);

        const response = await shivaiApiService.getOnboardingByUserId(userId);
        console.log("✅ Onboarding data fetched:", response);

        // Handle different response structures
        const data =
          response?.data?.onboarding ||
          response?.onboarding ||
          response?.data ||
          response;
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
        setLoading(false);
      }
    };

    fetchOnboardingData();
  }, [client]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div
            className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3`}
          ></div>
          <p className={`${currentTheme.textSecondary} text-sm`}>
            Loading onboarding data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`text-center py-8 rounded-lg border-2 border-dashed ${currentTheme.border} bg-red-50 dark:bg-red-900/10`}
      >
        <X className={`w-5 h-5 mx-auto mb-3 text-red-500 opacity-50`} />
        <p className={`text-red-600 dark:text-red-400 font-medium mb-2`}>
          Error loading onboarding data
        </p>
        <p className={`text-red-500 dark:text-red-300 text-sm opacity-75`}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
        Onboarding Information
      </h3>
      {!onboardingData ||
      onboardingData?.onboarding === null ||
      Object.keys(onboardingData).length === 0 ? (
        <div
          className={`text-center py-8 rounded-lg border-2 border-dashed ${currentTheme.border}`}
        >
          <FileText
            className={`w-5 h-5 mx-auto mb-3 ${currentTheme.textSecondary} opacity-50`}
          />
          <p className={`${currentTheme.textSecondary} font-medium mb-2`}>
            No onboarding data available
          </p>
          <p className={`${currentTheme.textSecondary} text-sm opacity-75`}>
            This client hasn't completed the onboarding process yet
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Company Basics */}
          {onboardingData.company_basics && (
            <div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-lg`}
            >
              <h4
                className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
              >
                <Building2 className="w-5 h-5" />
                Company Basics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {onboardingData.company_basics.name && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Company Name
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      {onboardingData.company_basics.name}
                    </p>
                  </div>
                )}
                {onboardingData.company_basics.company_email && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Company Email
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      {onboardingData.company_basics.company_email}
                    </p>
                  </div>
                )}
                {onboardingData.company_basics.company_phone && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Phone
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      {onboardingData.company_basics.company_phone}
                    </p>
                  </div>
                )}
                {onboardingData.company_basics.website && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Website
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      <a
                        href={onboardingData.company_basics.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {onboardingData.company_basics.website}
                      </a>
                    </p>
                  </div>
                )}
                {onboardingData.company_basics.company_size && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Company Size
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      {onboardingData.company_basics.company_size}
                    </p>
                  </div>
                )}
                {onboardingData.company_basics.linkedin_profile && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      LinkedIn
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      <a
                        href={onboardingData.company_basics.linkedin_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {onboardingData.company_basics.industry &&
                Array.isArray(onboardingData.company_basics.industry) &&
                onboardingData.company_basics.industry.length > 0 && (
                  <div className="mt-4">
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                    >
                      Industries
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {onboardingData.company_basics.industry.map(
                        (industry, index) => {
                          const industryLabel =
                            industryOptions.find(
                              (opt) => opt.value === industry
                            )?.label || industry;
                          return (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {industryLabel}
                            </span>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

              {onboardingData.company_basics.description && (
                <div className="mt-4">
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                  >
                    Description
                  </label>
                  <p className={`${currentTheme.text} leading-relaxed`}>
                    {onboardingData.company_basics.description}
                  </p>
                </div>
              )}

              {onboardingData.company_basics.address && (
                <div className="mt-4">
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                  >
                    Address
                  </label>
                  <p className={`${currentTheme.text} leading-relaxed`}>
                    {onboardingData.company_basics.address}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Plan Details */}
          {onboardingData.plan_details && (
            <div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-lg`}
            >
              <h4
                className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
              >
                <CreditCard className="w-5 h-5" />
                Plan Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {onboardingData.plan_details.type && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Plan Type
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      {onboardingData.plan_details.type}
                    </p>
                  </div>
                )}

                {onboardingData.plan_details.billing_contact && (
                  <div className="md:col-span-2">
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                    >
                      Billing Contact
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {onboardingData.plan_details.billing_contact.name && (
                        <div>
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                          >
                            Name
                          </label>
                          <p className={`${currentTheme.text} font-medium`}>
                            {onboardingData.plan_details.billing_contact.name}
                          </p>
                        </div>
                      )}
                      {onboardingData.plan_details.billing_contact.email && (
                        <div>
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                          >
                            Email
                          </label>
                          <p className={`${currentTheme.text} font-medium`}>
                            {onboardingData.plan_details.billing_contact.email}
                          </p>
                        </div>
                      )}
                      {onboardingData.plan_details.billing_contact.phone && (
                        <div>
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                          >
                            Phone
                          </label>
                          <p className={`${currentTheme.text} font-medium`}>
                            {onboardingData.plan_details.billing_contact.phone}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deployment Targets */}
          {onboardingData.deployment_targets && (
            <div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-lg`}
            >
              <h4
                className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
              >
                <Rocket className="w-5 h-5" />
                Deployment Targets
              </h4>

              {onboardingData.deployment_targets.channels &&
                Array.isArray(onboardingData.deployment_targets.channels) &&
                onboardingData.deployment_targets.channels.length > 0 && (
                  <div className="mb-3 md:mb-4">
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                    >
                      Deployment Channels
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {onboardingData.deployment_targets.channels.map(
                        (channel, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium capitalize"
                          >
                            {channel.replace("_", " ")}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {onboardingData.deployment_targets.website_url && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Website URL
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      <a
                        href={onboardingData.deployment_targets.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {onboardingData.deployment_targets.website_url}
                      </a>
                    </p>
                  </div>
                )}
                {onboardingData.deployment_targets.whatsapp_phone && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      WhatsApp Phone
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      {onboardingData.deployment_targets.whatsapp_phone}
                    </p>
                  </div>
                )}
                {onboardingData.deployment_targets.support_email && (
                  <div>
                    <label
                      className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                    >
                      Support Email
                    </label>
                    <p className={`${currentTheme.text} font-medium`}>
                      {onboardingData.deployment_targets.support_email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Employees */}
          {onboardingData.ai_employees &&
            Array.isArray(onboardingData.ai_employees) &&
            onboardingData.ai_employees.length > 0 && (
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 md:p-6 shadow-lg`}
              >
                <h4
                  className={`text-base md:text-lg font-semibold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
                >
                  <Bot className="w-5 h-5" />
                  AI Employees ({onboardingData.ai_employees.length})
                </h4>

                <div className="space-y-3 md:space-y-4">
                  {onboardingData.ai_employees.map((employee, idx) => (
                    <div
                      key={idx}
                      className={`border ${currentTheme.border} rounded-lg p-3 md:p-4 ${currentTheme.searchBg}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center`}
                        >
                          <Bot
                            className={`w-5 h-5 text-blue-600 dark:text-blue-400`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5
                            className={`font-medium ${currentTheme.text} truncate`}
                          >
                            {employee?.name || `AI Employee #${idx + 1}`}
                          </h5>
                          <p
                            className={`text-xs ${currentTheme.textSecondary} truncate`}
                          >
                            {employee?.template ||
                              employee?.type ||
                              "Custom Agent"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        {employee?.template && (
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                            >
                              Template
                            </label>
                            <p className={`${currentTheme.text}`}>
                              {templateOptions.find(
                                (t) => t.value === employee.template
                              )?.label || employee.template}
                            </p>
                          </div>
                        )}
                        {employee?.preferred_language && (
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                            >
                              Language
                            </label>
                            <p className={`${currentTheme.text}`}>
                              {employee.preferred_language}
                            </p>
                          </div>
                        )}
                        {employee?.agent_personality && (
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                            >
                              Personality
                            </label>
                            <p className={`${currentTheme.text} capitalize`}>
                              {employee.agent_personality}
                            </p>
                          </div>
                        )}
                        {employee?.voice_gender && (
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                            >
                              Voice
                            </label>
                            <p className={`${currentTheme.text}`}>
                              {employee.voice_gender} -{" "}
                              {employee.voice_style || "Default"}
                            </p>
                          </div>
                        )}
                      </div>

                      {employee?.special_instructions && (
                        <div className="mt-3">
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                          >
                            Special Instructions
                          </label>
                          <p
                            className={`${currentTheme.text} text-sm leading-relaxed`}
                          >
                            {employee.special_instructions}
                          </p>
                        </div>
                      )}

                      {employee?.targets?.success_metrics && (
                        <div className="mt-3">
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                          >
                            Success Metrics
                          </label>
                          <p
                            className={`${currentTheme.text} text-sm leading-relaxed`}
                          >
                            {employee.targets.success_metrics}
                          </p>
                        </div>
                      )}

                      {/* Knowledge Sources */}
                      {employee?.knowledge_sources && (
                        <div className="mt-3">
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                          >
                            Knowledge Sources
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            {employee.knowledge_sources.website_url && (
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                                >
                                  Website URL
                                </label>
                                <p className={`${currentTheme.text}`}>
                                  <a
                                    href={
                                      employee.knowledge_sources.website_url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    {employee.knowledge_sources.website_url}
                                  </a>
                                </p>
                              </div>
                            )}
                            {employee.knowledge_sources.faqs_text && (
                              <div>
                                <label
                                  className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                                >
                                  FAQs Text
                                </label>
                                <p className={`${currentTheme.text}`}>
                                  {employee.knowledge_sources.faqs_text.substring(
                                    0,
                                    100
                                  )}
                                  {employee.knowledge_sources.faqs_text.length >
                                  100
                                    ? "..."
                                    : ""}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Workflows */}
                      {employee?.workflows &&
                        Array.isArray(employee.workflows) &&
                        employee.workflows.length > 0 && (
                          <div className="mt-3">
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              Workflows
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {employee.workflows.map((workflow, wIdx) => (
                                <span
                                  key={wIdx}
                                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium"
                                >
                                  {workflow.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

const ClientDetailsTab = ({ client, currentTheme }) => {
  // Handle different data structures - client data can be nested in userData or directly on client
  const userData = client?.userData || client || {};
  const companyBasics =
    client?.company_basics ||
    client?.userData?.onboarding?.company_basics ||
    {};

  return (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
        Client Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Full Name
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.fullName || userData.name || companyBasics.name || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Email
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.email || companyBasics.company_email || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Phone
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.phone || companyBasics.company_phone || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Website
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.website || companyBasics.company_website || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Company Size
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.companySize || companyBasics.company_size || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Status
          </label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              client?.isApproved || userData?.isApproved
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : client?.isRejected || userData?.isRejected
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : userData?.isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {client?.isApproved || userData?.isApproved
              ? "approved"
              : client?.isRejected || userData?.isRejected
                ? "rejected"
                : userData?.isActive
                  ? "Active"
                  : "Pending"}
          </span>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Email Verified
          </label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              userData?.emailVerified
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {userData?.emailVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Onboarded
          </label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              userData?.isOnboarded
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {userData?.isOnboarded ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Created At
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Last Login
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData?.lastLoginAt
              ? new Date(userData.lastLoginAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Company Address */}
      {(userData?.address || companyBasics?.company_address) && (
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Company Address
          </label>
          <p className={`${currentTheme.text} leading-relaxed`}>
            {userData?.address || companyBasics?.company_address}
          </p>
        </div>
      )}
    </div>
  );
};

const AIEmployeesTab = ({ client, currentTheme, onViewAgent }) => {
  const [aiEmployees, setAiEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch AI agents data every time this tab is rendered
  useEffect(() => {
    const fetchAIEmployees = async () => {
      if (!client) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(
          "🔄 AIEmployeesTab mounted - fetching agents for client:",
          client?.id
        );
        console.log("📋 Client user ID:", client?.userData?.id);
        console.log("📋 Full client object:", client);

        // Get the user ID from the correct location
        const userId = client?.userData?.id || client?.id || client?._id;

        if (!userId) {
          console.error("❌ No user ID found in client object");
          setAiEmployees([]);
          setLoading(false);
          return;
        }

        console.log("✅ Using user ID:", userId);

        // Fetch all agents and filter by client
        const response = await shivaiApiService.getAgentsById(userId);
        console.log("🤖 AI Agents API Response:", response);

        // Don't check response.success, just check if we have data
        let agentsData = response?.data || response;

        console.log("📦 Raw agents data:", agentsData);

        // Handle different response structures
        if (agentsData?.agents && Array.isArray(agentsData.agents)) {
          agentsData = agentsData.agents;
        }

        if (Array.isArray(agentsData)) {
          console.log(
            "✅ Agents data is an array with length:",
            agentsData.length
          );
          if (agentsData.length > 0) {
            console.log("📊 Sample agent data:", agentsData[0]);
          }
          setAiEmployees(agentsData);
        } else if (agentsData && typeof agentsData === "object") {
          // If it's a single agent object, wrap it in an array
          console.log("📦 Single agent object, wrapping in array");
          setAiEmployees([agentsData]);
        } else {
          console.log(
            "📊 Response data is not an array or object:",
            typeof agentsData
          );
          setAiEmployees([]);
        }
      } catch (error) {
        console.error("❌ Error fetching AI employees:", error);
        console.error("❌ Error details:", error?.response?.data);
        // Don't set error state, just set empty array to avoid showing error UI
        setAiEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAIEmployees();
  }, [client]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
            AI Employees
          </h3>
        </div>
        <div
          className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`${currentTheme.textSecondary}`}>
            Loading AI Employees...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
            AI Employees
          </h3>
        </div>
        <div
          className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
        >
          <div className={`w-5 h-5 mx-auto mb-3 text-red-500`}>
            <AlertCircle className="w-full h-full" />
          </div>
          <h4 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>
            Error Loading Data
          </h4>
          <p className={`${currentTheme.textSecondary} mb-4`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
          AI Employees ({aiEmployees.length})
        </h3>
      </div>

      {aiEmployees.length === 0 ? (
        <div
          className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
        >
          <Bot
            className={`w-5 h-5 mx-auto mb-3 ${currentTheme.textSecondary}`}
          />
          <h4 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>
            No AI Employees
          </h4>
          <p className={`${currentTheme.textSecondary}`}>
            This client hasn't created any AI employees yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {aiEmployees.map((employee, index) => (
            <div
              key={employee._id || index}
              className={`${currentTheme.searchBg} rounded-lg p-4 border ${currentTheme.border}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} flex items-center justify-center`}
                  >
                    <Bot className={`w-5 h-5 ${currentTheme.text}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${currentTheme.text}`}>
                      {employee.name || "Unnamed Employee"}
                    </h4>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      {employee.type || "Assistant"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.is_active
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                    }`}
                  >
                    {employee.is_active ? "Active" : "Inactive"}
                  </span>
                  <button
                    onClick={() => onViewAgent && onViewAgent(employee)}
                    className={`px-3 py-1 ${currentTheme.searchBg} hover:${currentTheme.hover} ${currentTheme.text} border ${currentTheme.border} text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1`}
                    title="View Agent Details"
                  >
                    <Eye className="w-5 h-5" />
                    View
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Agent ID
                  </label>
                  <p className={`${currentTheme.text} text-sm font-mono`}>
                    {employee.id || "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Language
                  </label>
                  <p className={`${currentTheme.text} text-sm`}>
                    {employee.greeting?.language || "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Voice
                  </label>
                  <p className={`${currentTheme.text} text-sm`}>
                    {employee.voice || "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Created
                  </label>
                  <p className={`${currentTheme.text} text-sm`}>
                    {employee.created_at
                      ? new Date(employee.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// AgentDetailsView Component
const AgentDetailsView = ({ agent, onBack, currentTheme }) => {
  // Safety check for agent prop
  if (!agent) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No agent data available</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    );
  }

  // Agent testing state - based on test-client.html
  const [activeTab, setActiveTab] = useState("overview");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [isTestingAgent, setIsTestingAgent] = useState(false);
  const [testStatus, setTestStatus] = useState("");
  const [language, setLanguage] = useState("en");
  const [audioSettings, setAudioSettings] = useState({
    noiseSuppression: true,
    echoCancellation: true,
    autoGainControl: true,
  });
  const [room, setRoom] = useState(null);

  // Analytics/Sessions state
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [transcripts, setTranscripts] = useState([]);
  const [loadingTranscripts, setLoadingTranscripts] = useState(false);

  // Modal tab state
  const [modalActiveTab, setModalActiveTab] = useState("transcripts");

  // Call summary state
  const [callSummary, setCallSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Memoize tabs array to prevent re-renders
  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview", icon: Info },
      { id: "test", label: "Preview & Test", icon: MessageCircle },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "instructions", label: "Instructions", icon: FileText },
    ],
    []
  );

  // Fetch agent sessions when analytics tab is active
  useEffect(() => {
    const fetchAgentSessions = async () => {
      if (activeTab !== "analytics") return;

      try {
        setLoadingSessions(true);
        const agentId = agent?.id || agent?._id;

        if (!agentId) {
          console.error("No agent ID found");
          return;
        }

        console.log("📋 Fetching sessions for agent:", agentId);
        const response = await shivaiApiService.getAgentSessions(agentId);
        console.log("✅ Sessions response:", response);

        // Handle different response structures
        const sessionsData =
          response?.sessions || response?.data?.sessions || response;
        const sessionsArray = Array.isArray(sessionsData) ? sessionsData : [];

        setSessions(sessionsArray);
      } catch (error) {
        console.error("❌ Error fetching agent sessions:", error);
        toast.error("Failed to load sessions");
        setSessions([]);
      } finally {
        setLoadingSessions(false);
      }
    };

    fetchAgentSessions();
  }, [activeTab, agent]);

  // Fetch call summary
  const fetchCallSummary = async (agentId, callId) => {
    try {
      setSummaryLoading(true);
      setSummaryError(null);
      console.log(
        "📊 Fetching call summary for agent:",
        agentId,
        "callId:",
        callId
      );

      const response = await shivaiApiService.getCallSummary(agentId);
      console.log("✅ Call summary response:", response);

      setCallSummary(response);
    } catch (error) {
      console.error("❌ Error fetching call summary:", error);
      setSummaryError("Failed to load call summary");
      setCallSummary(null);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Handle viewing session transcripts
  const handleViewSession = useCallback(async (session) => {
    try {
      setSelectedSession(session);
      setModalActiveTab("transcripts"); // Reset to transcripts tab

      // Reset audio player state
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setPlaybackSpeed(1);
      setIsMuted(false);

      // Check if transcripts are already in the session object
      if (session?.transcripts && Array.isArray(session.transcripts)) {
        console.log(
          "📜 Using transcripts from session object:",
          session.transcripts
        );
        setTranscripts(session.transcripts);
      } else {
        // Otherwise fetch from API
        setLoadingTranscripts(true);
        const sessionId = session?.session_id || session?.id || session?._id;
        console.log("📜 Fetching transcripts for session:", sessionId);

        const response =
          await shivaiApiService.getSessionTranscripts(sessionId);
        console.log("✅ Transcripts response:", response);

        const transcriptsData =
          response?.transcripts || response?.data || response;
        const transcriptsArray = Array.isArray(transcriptsData)
          ? transcriptsData
          : [];

        setTranscripts(transcriptsArray);
        setLoadingTranscripts(false);
      }

      // Fetch call summary
      const agentId = session?.agentId || session?.agent_id;
      const callId = session?.callId || session?.session_id || session?.id;
      if (agentId && callId) {
        await fetchCallSummary(agentId, callId);
      }
    } catch (error) {
      console.error("❌ Error fetching session data:", error);
      toast.error("Failed to load session data");
      setTranscripts([]);
      setLoadingTranscripts(false);
    }
  }, []);

  // Close transcript view
  const handleCloseTranscript = useCallback(() => {
    setSelectedSession(null);
    setTranscripts([]);
    setCallSummary(null);
    setModalActiveTab("transcripts");
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Audio player handlers
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const changeSpeed = () => {
    if (!audioRef.current) return;
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    audioRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const skip = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(duration, currentTime + seconds)
    );
  };

  const formatTimeDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTranscriptTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

    async function getClientIP() {
    try {
      try {
        const response = await fetch("https://ipapi.co/json/", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("🌐 [IP] Retrieved via ipapi.co:", data.ip);
          return data.ip;
        }
      } catch (e) {
        console.warn("🌐 [IP] ipapi.co failed:", e.message);
      }
      try {
        const response = await fetch("https://api.ipify.org?format=json", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("🌐 [IP] Retrieved via ipify:", data.ip);
          return data.ip;
        }
      } catch (e) {
        console.warn("🌐 [IP] ipify failed:", e.message);
      }
      try {
        const response = await fetch("https://ipinfo.io/json", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("🌐 [IP] Retrieved via ipinfo.io:", data.ip);
          return data.ip;
        }
      } catch (e) {
        console.warn("🌐 [IP] ipinfo.io failed:", e.message);
      }
      return null;
    } catch (error) {
      console.error("🌐 [IP] All IP detection methods failed:", error);
      return null;
    }
  }

  // Agent Testing Functions - based on widget.js LiveKit implementation
  const startAgentCall = useCallback(async () => {
    try {
      setIsConnecting(true);
      setTestStatus("🎤 Requesting microphone access...");

      // Check if in secure context (HTTPS required for microphone)
      if (!window.isSecureContext) {
        throw new Error("HTTPS required for microphone access");
      }

      // Request microphone permission first (same as widget.js)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: false,
            channelCount: 1,
            sampleRate: 48000,
            sampleSize: 16,
            volume: 0.6,
            latency: 0.05,
          },
        });

        // Stop the stream - LiveKit will create its own
        stream.getTracks().forEach((track) => track.stop());
        setTestStatus("✅ Microphone access granted");
      } catch (micError) {
        throw new Error(`Microphone access denied: ${micError.message}`);
      }

      // Get agent ID from the agent data
      const agentId = agent?.id || agent?._id;
      if (!agentId) {
        throw new Error("Agent ID not found");
      }

      setTestStatus("🔗 Getting LiveKit token...");

      // Get LiveKit token from backend (exact same endpoint as widget)
      const callId = `admin_test_${Date.now()}`;
      const response = await fetch(
        "https://python.service.callshivai.com/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agent_id: agentId,
            language: language,
            call_id: callId,
            device: "desktop",
            user_agent: navigator.userAgent,
            ip: await getClientIP(),
            
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get LiveKit token: ${response.status}`);
      }

      const tokenData = await response.json();
      console.log("🎯 Token received for agent testing:", agentId, tokenData);

      setTestStatus("🔗 Connecting to LiveKit...");

      // Load LiveKit SDK if not available
      if (typeof window.LivekitClient === "undefined") {
        setTestStatus("📦 Loading LiveKit SDK...");

        const script = document.createElement("script");
        script.src =
          "https://unpkg.com/livekit-client@latest/dist/livekit-client.umd.js";
        script.onload = () => {
          console.log("✅ LiveKit SDK loaded");
          connectToLiveKit(tokenData, agentId);
        };
        script.onerror = () => {
          throw new Error("Failed to load LiveKit SDK");
        };
        document.head.appendChild(script);
      } else {
        await connectToLiveKit(tokenData, agentId);
      }
    } catch (error) {
      console.error("Failed to start agent test call:", error);
      setTestStatus(`❌ Error: ${error.message}`);
      setIsConnecting(false);
      setIsConnected(false);
    }
  }, [agent]);

  const connectToLiveKit = useCallback(
    async (tokenData, agentId) => {
      try {
        const LiveKit = window.LivekitClient;

        // Create LiveKit room with same config as widget.js
        const liveKitRoom = new LiveKit.Room({
          adaptiveStream: true,
          dynacast: true,
          audioCaptureDefaults: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            suppressLocalAudioPlayback: true,
          },
          publishDefaults: {
            audioPreset: LiveKit.AudioPresets.speech,
            dtx: true,
            red: false,
            simulcast: false,
          },
        });

        // Track remote audio (agent speaking) - same as widget.js
        liveKitRoom.on(
          LiveKit.RoomEvent.TrackSubscribed,
          (track, publication, participant) => {
            if (track.kind === LiveKit.Track.Kind.Audio) {
              const audioElement = track.attach();
              audioElement.volume = 0.4; // Same volume as widget for feedback prevention
              audioElement.autoplay = true;
              document.body.appendChild(audioElement);

              audioElement
                .play()
                .catch((err) => console.warn("Audio autoplay blocked:", err));
            }
          }
        );

        // Handle transcript from metadata - same as widget.js
        liveKitRoom.on(
          LiveKit.RoomEvent.ParticipantMetadataChanged,
          (metadata, participant) => {
            if (metadata) {
              try {
                const data = JSON.parse(metadata);
                if (data.transcript || data.text) {
                  setChatMessages((prev) => [
                    ...prev,
                    {
                      role: "agent",
                      text: data.transcript || data.text,
                      timestamp: new Date(),
                    },
                  ]);
                }
              } catch (e) {
                console.log("Metadata not JSON:", metadata);
              }
            }
          }
        );

        // Handle room metadata - same as widget.js
        liveKitRoom.on(LiveKit.RoomEvent.RoomMetadataChanged, (metadata) => {
          if (metadata) {
            try {
              const data = JSON.parse(metadata);
              if (data.transcript || data.text) {
                setChatMessages((prev) => [
                  ...prev,
                  {
                    role: "agent",
                    text: data.transcript || data.text,
                    timestamp: new Date(),
                  },
                ]);
              }
            } catch (e) {
              console.log("Room metadata not JSON:", metadata);
            }
          }
        });

        // Handle connection - same as widget.js
        liveKitRoom.on(LiveKit.RoomEvent.Connected, async () => {
          console.log("✅ Connected to LiveKit room for agent testing");
          setIsConnected(true);
          setIsConnecting(false);
          setTestStatus("🟢 Connected! You can now speak with the agent.");

          // Enable microphone with same settings as widget.js
          try {
            await liveKitRoom.localParticipant.setMicrophoneEnabled(true, {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            });

            // Add initial greeting
            setChatMessages([
              {
                role: "agent",
                text:
                  agent?.greeting?.en ||
                  `Hello! I'm ${agent?.name || "Agent"}, ready for testing. How can I help you?`,
                timestamp: new Date(),
              },
            ]);
          } catch (err) {
            console.error("Failed to enable microphone:", err);
          }
        });

        // Handle disconnection
        liveKitRoom.on(LiveKit.RoomEvent.Disconnected, () => {
          console.log("❌ Disconnected from LiveKit room");
          setIsConnected(false);
          setTestStatus("🔴 Disconnected");
          setRoom(null);
        });

        // Connect to room using token data
        await liveKitRoom.connect(tokenData.url, tokenData.token);
        setRoom(liveKitRoom);
      } catch (error) {
        console.error("LiveKit connection failed:", error);
        setTestStatus(`❌ Connection failed: ${error.message}`);
        setIsConnecting(false);
        setIsConnected(false);
      }
    },
    [agent]
  );

  const endAgentCall = useCallback(async () => {
    if (room) {
      try {
        await room.disconnect();
        console.log("✅ Disconnected from LiveKit room");
      } catch (error) {
        console.error("Error disconnecting from room:", error);
      }
    }

    setIsConnected(false);
    setIsConnecting(false);
    setTestStatus("📞 Call ended");
    setRoom(null);

    // Add disconnect message
    setChatMessages((prev) => [
      ...prev,
      {
        role: "system",
        text: "Call ended",
        timestamp: new Date(),
      },
    ]);
  }, [room]);

  const sendChatMessage = useCallback(() => {
    if (!chatInput.trim() || !isConnected) return;

    const userMessage = {
      role: "user",
      text: chatInput.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate agent response (in production, this would be via LiveKit data channel)
    setTimeout(
      () => {
        const responses = [
          `I received your message: "${userMessage.text}". How can I help you with this?`,
          `Thank you for your message. As ${agent?.name || "Agent"}, I'm here to assist you.`,
          `I understand you said: "${userMessage.text}". Let me help you with that.`,
          `Got it! ${userMessage.text}. What would you like to know more about?`,
        ];

        const agentResponse = {
          role: "agent",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: Date.now(),
        };
        setChatMessages((prev) => [...prev, agentResponse]);
      },
      1000 + Math.random() * 2000
    );
  }, [chatInput, isConnected, agent]);

  // Handle test message sending
  const handleTestAgent = useCallback(() => {
    if (!testMessage.trim()) return;

    setIsTestingAgent(true);

    const userMessage = {
      role: "user",
      text: testMessage.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setTestMessage("");

    // Simulate agent response
    setTimeout(
      () => {
        const responses = [
          `Thank you for testing! You said: "${userMessage.text}". I'm ${agent?.name || "Agent"} and I'm working correctly.`,
          `Test successful! As ${agent?.name || "Agent"}, I received your message: "${userMessage.text}". How can I assist you further?`,
          `Hello! This is ${agent?.name || "Agent"}. I got your test message: "${userMessage.text}". The agent is responding as expected.`,
          `Agent test complete! Your message: "${userMessage.text}" was processed successfully by ${agent?.name || "Agent"}.`,
        ];

        const agentResponse = {
          role: "agent",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, agentResponse]);
        setIsTestingAgent(false);
      },
      1500 + Math.random() * 1000
    );
  }, [testMessage, agent]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${currentTheme.text}`}>
              {agent?.name || "Unnamed Agent"}
            </h1>
            <p className={`text-sm ${currentTheme.textSecondary}`}>
              Agent ID: {agent?.id || agent?._id || "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                agent?.is_active
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
              }`}
            >
              {agent?.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : `border-transparent ${currentTheme.textSecondary} hover:text-gray-700 dark:hover:text-gray-300`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    Agent Type
                  </p>
                  <p className={`font-semibold ${currentTheme.text}`}>
                    AI Assistant
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    Voice
                  </p>
                  <p className={`font-semibold ${currentTheme.text}`}>
                    {agent?.voice || "Default"}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    Language
                  </p>
                  <p className={`font-semibold ${currentTheme.text}`}>
                    {agent?.greeting?.language || "English"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div
            className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
          >
            <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Agent Name
                </label>
                <p className={`${currentTheme.text}`}>{agent.name || "N/A"}</p>
              </div>
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Created By
                </label>
                <p className={`${currentTheme.text}`}>
                  {agent.created_by || "N/A"}
                </p>
              </div>
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Created Date
                </label>
                <p className={`${currentTheme.text}`}>
                  {agent.created_at
                    ? new Date(agent.created_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Knowledge Base URL
                </label>
                <p className={`${currentTheme.text} break-all`}>
                  {agent.knowledge_base_url || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "test" && (
        <div className="space-y-6">
          {/* Agent Information Card */}
          <div
            className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
          >
            <h3
              className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              <Info className="w-5 h-5" />
              Agent Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Agent Name
                </label>
                <p className={`${currentTheme.text} font-semibold`}>
                  {agent?.name || "Unnamed Agent"}
                </p>
              </div>
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Agent ID
                </label>
                <p
                  className={`${currentTheme.text} font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded`}
                >
                  {agent?.id || agent?._id || "N/A"}
                </p>
              </div>
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    agent.is_active
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  }`}
                >
                  {agent.is_active ? "🟢 Active" : "🔴 Inactive"}
                </span>
              </div>
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Model
                </label>
                <p className={`${currentTheme.text}`}>
                  {agent.model || "gpt-4o-realtime-preview"}
                </p>
              </div>
            </div>
          </div>

          {/* Voice Testing Interface */}
          <div
            className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
          >
            <h3
              className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              🎙️ Live Voice Testing
            </h3>

            {/* Test Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  disabled={isConnected}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                  <option value="zh">Chinese</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="ar">Arabic</option>
                  <option value="ru">Russian</option>
                  <option value="it">Italian</option>
                </select>
              </div>
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Audio Settings
                </label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      checked={audioSettings.noiseSuppression}
                      onChange={(e) =>
                        setAudioSettings((prev) => ({
                          ...prev,
                          noiseSuppression: e.target.checked,
                        }))
                      }
                      className="mr-1"
                      disabled={isConnected}
                    />
                    🎧 Noise Cancellation
                  </label>
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      checked={audioSettings.echoCancellation}
                      onChange={(e) =>
                        setAudioSettings((prev) => ({
                          ...prev,
                          echoCancellation: e.target.checked,
                        }))
                      }
                      className="mr-1"
                      disabled={isConnected}
                    />
                    🔊 Echo Cancellation
                  </label>
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      checked={audioSettings.autoGainControl}
                      onChange={(e) =>
                        setAudioSettings((prev) => ({
                          ...prev,
                          autoGainControl: e.target.checked,
                        }))
                      }
                      className="mr-1"
                      disabled={isConnected}
                    />
                    📊 Auto Gain
                  </label>
                </div>
              </div>
            </div>

            {/* Connection Controls */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={startAgentCall}
                disabled={isConnecting || isConnected}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isConnecting || isConnected
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isConnecting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Connecting...
                  </span>
                ) : isConnected ? (
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🎤 Start Voice Call
                  </span>
                )}
              </button>

              {isConnected && (
                <button
                  onClick={endAgentCall}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  📞 End Call
                </button>
              )}
            </div>

            {/* Status Display */}
            {testStatus && (
              <div
                className={`p-3 rounded-lg mb-4 text-sm ${
                  testStatus.includes("Error") || testStatus.includes("Failed")
                    ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                    : testStatus.includes("Connected") ||
                        testStatus.includes("🟢")
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                }`}
              >
                {testStatus}
              </div>
            )}

            {/* Live Chat Interface */}
            {isConnected && (
              <div
                className={`border ${currentTheme.border} rounded-lg overflow-hidden`}
              >
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium">
                    💬 Live Conversation with {agent.name}
                  </span>
                </div>

                {/* Chat Messages */}
                <div
                  className="h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-8">
                      🎙️ Start speaking or type a message to begin testing...
                    </div>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-3 flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-blue-500 text-white rounded-br-sm"
                              : msg.role === "agent"
                                ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm border"
                                : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-center rounded"
                          }`}
                        >
                          <div className="text-xs opacity-70 mb-1">
                            {msg.role === "user"
                              ? "👤 You"
                              : msg.role === "agent"
                                ? "🤖 " + agent.name
                                : "System"}
                          </div>
                          <div className="text-sm">{msg.text}</div>
                          <div className="text-xs opacity-50 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                      placeholder="Type a message to test text input..."
                      className={`flex-1 px-3 py-2 text-sm rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      disabled={!isConnected}
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!isConnected || !chatInput.trim()}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    💡 You can type messages here or speak directly for voice
                    testing
                  </div>
                </div>
              </div>
            )}

            {/* Voice Visualizer */}
            {isConnected && (
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: "1s",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Transcript Modal */}
          {selectedSession && (
            <div className="fixed inset-0 -top-8 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm overflow-y-auto">
              <div
                className={`${currentTheme.cardBg} rounded-lg sm:rounded-xl w-full max-w-3xl  max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl my-auto flex flex-col`}
              >
                {/* Header - Mobile Optimized */}
                <div className={`p-3 sm:p-4 border-b ${currentTheme.border}`}>
                  <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        className={`w-7 h-7 sm:w-10 sm:h-10 ${currentTheme.activeBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <MessageSquare
                          className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2
                          className={`text-sm sm:text-lg font-semibold ${currentTheme.text} truncate`}
                        >
                          Session Transcript
                        </h2>
                        <p
                          className={`text-xs ${currentTheme.textSecondary} truncate font-mono`}
                        >
                          {selectedSession.session_id || selectedSession.id}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseTranscript}
                      className={`p-1 sm:p-2 ${currentTheme.textSecondary} rounded-lg ${currentTheme.hover} transition-colors flex-shrink-0`}
                    >
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Session Info */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div
                      className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                    >
                      <Clock
                        className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                        >
                          Date & Time
                        </p>
                        <span
                          className={`text-xs font-medium ${currentTheme.text} truncate block`}
                        >
                          {formatDate(selectedSession.start_time)}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                    >
                      <MapPin
                        className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                        >
                          IP Address
                        </p>
                        <span
                          className={`text-xs font-medium ${currentTheme.text} truncate block`}
                        >
                          {selectedSession.ipAddress ||
                            selectedSession.ip_address ||
                            "unknown"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                    >
                      <Phone
                        className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                        >
                          Device • Duration
                        </p>
                        <span
                          className={`text-xs font-medium ${currentTheme.text} truncate block`}
                        >
                          {selectedSession.device?.deviceType ||
                            selectedSession.device?.device_type ||
                            "Unknown"}{" "}
                          • {selectedSession.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div
                    className={`flex gap-1 p-1 ${currentTheme.searchBg} rounded-lg`}
                  >
                    <button
                      onClick={() => setModalActiveTab("transcripts")}
                      className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                        modalActiveTab === "transcripts"
                          ? `${currentTheme.cardBg} ${currentTheme.text} shadow-sm`
                          : `${currentTheme.textSecondary} hover:${currentTheme.text}`
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1.5" />
                      Call Transcripts
                    </button>
                    <button
                      onClick={() => setModalActiveTab("summary")}
                      className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                        modalActiveTab === "summary"
                          ? `${currentTheme.cardBg} ${currentTheme.text} shadow-sm`
                          : `${currentTheme.textSecondary} hover:${currentTheme.text}`
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1.5" />
                      Recording & Summary
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                  {/* Tab Content: Call Transcripts */}
                  {modalActiveTab === "transcripts" && (
                    <>
                      {/* Token Usage - Mobile Optimized */}
                      {(selectedSession.token_usage ||
                        selectedSession.tokenUsage) && (
                        <div
                          className={`px-3 sm:px-4 py-3 mb-3 ${currentTheme.searchBg} rounded-lg`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Activity
                              className={`w-5 h-5 ${currentTheme.text}`}
                            />
                            <h4
                              className={`text-sm sm:text-base font-semibold ${currentTheme.text}`}
                            >
                              Token Usage
                            </h4>
                          </div>
                          <div className="grid grid-cols-3 gap-2 sm:gap-4">
                            <div
                              className={`${currentTheme.cardBg} rounded-lg p-2 sm:p-3 border ${currentTheme.border}`}
                            >
                              <p
                                className={`text-xs ${currentTheme.textSecondary} mb-1`}
                              >
                                Input
                              </p>
                              <p
                                className={`text-lg sm:text-xl font-bold ${currentTheme.text}`}
                              >
                                {(
                                  (
                                    selectedSession.token_usage ||
                                    selectedSession.tokenUsage
                                  )?.input_tokens ||
                                  (
                                    selectedSession.token_usage ||
                                    selectedSession.tokenUsage
                                  )?.inputTokens ||
                                  0
                                ).toLocaleString()}
                              </p>
                            </div>
                            <div
                              className={`${currentTheme.cardBg} rounded-lg p-2 sm:p-3 border ${currentTheme.border}`}
                            >
                              <p
                                className={`text-xs ${currentTheme.textSecondary} mb-1`}
                              >
                                Output
                              </p>
                              <p
                                className={`text-lg sm:text-xl font-bold ${currentTheme.text}`}
                              >
                                {(
                                  (
                                    selectedSession.token_usage ||
                                    selectedSession.tokenUsage
                                  )?.output_tokens ||
                                  (
                                    selectedSession.token_usage ||
                                    selectedSession.tokenUsage
                                  )?.outputTokens ||
                                  0
                                ).toLocaleString()}
                              </p>
                            </div>
                            <div
                              className={`${currentTheme.cardBg} rounded-lg p-2 sm:p-3 border ${currentTheme.border}`}
                            >
                              <p
                                className={`text-xs ${currentTheme.textSecondary} mb-1`}
                              >
                                Total
                              </p>
                              <p
                                className={`text-lg sm:text-xl font-bold text-blue-600`}
                              >
                                {(
                                  (
                                    selectedSession.token_usage ||
                                    selectedSession.tokenUsage
                                  )?.total_tokens ||
                                  (
                                    selectedSession.token_usage ||
                                    selectedSession.tokenUsage
                                  )?.totalTokens ||
                                  0
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Transcript Messages */}
                      <div
                        className={`${currentTheme.searchBg} p-3 sm:p-4 rounded-lg`}
                      >
                        <h3
                          className={`text-sm sm:text-base font-semibold ${currentTheme.text} mb-3`}
                        >
                          Conversation Transcript
                        </h3>
                        <div className="space-y-1 max-h-[250px] sm:max-h-[400px] overflow-y-auto">
                          {selectedSession.transcripts &&
                          selectedSession.transcripts.length > 0 ? (
                            <>
                              <p
                                className={`text-xs sm:text-sm ${currentTheme.textSecondary} mb-2`}
                              >
                                Conversation started at{" "}
                                {formatDate(selectedSession.start_time)}
                              </p>

                              {selectedSession.transcripts.map(
                                (message, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-1.5 py-1.5 sm:py-2"
                                  >
                                    {message.speaker === "ai" ||
                                    message.role === "agent" ? (
                                      <>
                                        <div className="flex justify-start mb-1">
                                          <span
                                            className={`text-xs ${currentTheme.textSecondary}`}
                                          >
                                            SHIVAI ASSISTANT •{" "}
                                            {formatTranscriptTimestamp(
                                              message.timestamp
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex items-start gap-1.5 sm:gap-2">
                                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                          </div>
                                          <div
                                            className={`max-w-[80%] ${currentTheme.cardBg} rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-3 border ${currentTheme.border}`}
                                          >
                                            <p
                                              className={`text-xs sm:text-sm ${currentTheme.text}`}
                                            >
                                              {message.message || message.text}
                                            </p>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="flex justify-end mb-1">
                                          <span
                                            className={`text-xs ${currentTheme.textSecondary}`}
                                          >
                                            CUSTOMER •{" "}
                                            {formatTranscriptTimestamp(
                                              message.timestamp
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex justify-end">
                                          <div className="flex flex-col items-end max-w-[80%]">
                                            <div className="rounded-2xl rounded-tr-sm px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-br from-blue-500 to-blue-600">
                                              <p className="text-xs sm:text-sm text-white">
                                                {message.message ||
                                                  message.text}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )
                              )}

                              <p
                                className={`text-xs ${currentTheme.textSecondary} mt-3 flex items-center gap-1`}
                              >
                                <Clock className="w-5 h-5" />
                                Session ended • Resolution:{" "}
                                {selectedSession.resolution}
                              </p>
                            </>
                          ) : (
                            <div className="text-center py-8">
                              <FileText
                                className={`w-10 h-10 sm:w-12 sm:h-12 ${currentTheme.textSecondary} mx-auto mb-3`}
                              />
                              <p
                                className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                              >
                                No transcripts available for this session
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Tab Content: Summary */}
                  {modalActiveTab === "summary" && (
                    <div className="space-y-3 sm:space-y-4">
                      {/* Call Recording Section */}
                      <div
                        className={`${currentTheme.searchBg} p-3 sm:p-4 rounded-lg`}
                      >
                        <h3
                          className={`text-sm sm:text-base font-semibold ${currentTheme.text} mb-3 flex items-center gap-2`}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                          Call Recording
                        </h3>

                        {/* Audio Player */}
                        <div
                          className={`${currentTheme.cardBg} p-4 rounded-xl border ${currentTheme.border}`}
                        >
                          {/* Hidden audio element */}
                          <audio
                            ref={audioRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={() => setIsPlaying(false)}
                            src={selectedSession.recordingUrl || "#"}
                          />

                          {/* Progress bar */}
                          <div
                            ref={progressRef}
                            onClick={handleProgressClick}
                            className={`relative h-1 ${currentTheme.border} rounded-full cursor-pointer mb-2`}
                            style={{
                              backgroundColor:
                                currentTheme === "dark" ? "#334155" : "#cbd5e1",
                            }}
                          >
                            <div
                              className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all"
                              style={{
                                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                              }}
                            />
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between gap-3">
                            {/* Time display */}
                            <span
                              className={`text-xs ${currentTheme.textSecondary} w-10`}
                            >
                              {formatTimeDisplay(currentTime)}
                            </span>

                            {/* Player controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => skip(-10)}
                                className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                title="Rewind 10s"
                              >
                                <SkipBack
                                  className={`w-5 h-5 ${currentTheme.textSecondary}`}
                                />
                              </button>

                              <button
                                onClick={togglePlayPause}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                                title={isPlaying ? "Pause" : "Play"}
                              >
                                {isPlaying ? (
                                  <Pause
                                    className="w-5 h-5"
                                    fill="currentColor"
                                  />
                                ) : (
                                  <Play
                                    className="w-4 h-4 ml-0.5"
                                    fill="currentColor"
                                  />
                                )}
                              </button>

                              <button
                                onClick={() => skip(10)}
                                className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                title="Forward 10s"
                              >
                                <SkipForward
                                  className={`w-5 h-5 ${currentTheme.textSecondary}`}
                                />
                              </button>

                              <button
                                onClick={changeSpeed}
                                className={`px-2 py-1 hover:${currentTheme.searchBg} rounded transition-colors text-xs ${currentTheme.textSecondary}`}
                                title="Playback speed"
                              >
                                {playbackSpeed}x
                              </button>

                              <button
                                onClick={toggleMute}
                                className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                title={isMuted ? "Unmute" : "Mute"}
                              >
                                {isMuted ? (
                                  <VolumeX
                                    className={`w-5 h-5 ${currentTheme.textSecondary}`}
                                  />
                                ) : (
                                  <Volume2
                                    className={`w-5 h-5 ${currentTheme.textSecondary}`}
                                  />
                                )}
                              </button>

                              <button
                                className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                title="Download recording"
                              >
                                <Download
                                  className={`w-5 h-5 ${currentTheme.textSecondary}`}
                                />
                              </button>
                            </div>

                            {/* Duration */}
                            <span
                              className={`text-xs ${currentTheme.textSecondary} w-10 text-right`}
                            >
                              {formatTimeDisplay(
                                duration || selectedSession.duration || 0
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Call Summary Section */}
                      <div
                        className={`${currentTheme.searchBg} p-3 sm:p-4 rounded-lg`}
                      >
                        <h3
                          className={`text-sm sm:text-base font-semibold ${currentTheme.text} mb-3 flex items-center gap-2`}
                        >
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                          Call Summary
                        </h3>

                        {summaryLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                          </div>
                        ) : summaryError ? (
                          <div className="text-center py-6">
                            <XCircle
                              className={`w-10 h-10 ${currentTheme.textSecondary} mx-auto mb-2`}
                            />
                            <p
                              className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                            >
                              {summaryError}
                            </p>
                          </div>
                        ) : callSummary?.data?.leads &&
                          callSummary.data.leads.length > 0 ? (
                          (() => {
                            const filteredLeads = callSummary.data.leads.filter(
                              (lead) =>
                                lead.callId ===
                                (selectedSession.callId ||
                                  selectedSession.session_id ||
                                  selectedSession.id)
                            );

                            console.log(
                              "🔍 Filtering leads. Looking for callId:",
                              selectedSession.callId ||
                                selectedSession.session_id ||
                                selectedSession.id
                            );
                            console.log(
                              "🔍 Available callIds:",
                              callSummary.data.leads.map((l) => l.callId)
                            );
                            console.log("🔍 Filtered leads:", filteredLeads);

                            return filteredLeads.length > 0 ? (
                              <div className="space-y-4">
                                {filteredLeads.map((lead, leadIndex) => (
                                  <div
                                    key={lead.id || leadIndex}
                                    className={`border ${currentTheme.border} rounded-lg p-3 sm:p-4 space-y-3`}
                                  >
                                    {/* Call ID and Date */}
                                    <div
                                      className={`flex items-center justify-between pb-2 border-b ${currentTheme.border}`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-blue-500" />
                                        <span
                                          className={`text-xs font-mono ${currentTheme.textSecondary}`}
                                        >
                                          {lead.callId || "N/A"}
                                        </span>
                                      </div>
                                      {lead.createdAt && (
                                        <span
                                          className={`text-xs ${currentTheme.textSecondary}`}
                                        >
                                          {new Date(
                                            lead.createdAt
                                          ).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })}
                                        </span>
                                      )}
                                    </div>

                                    {/* Intent Details */}
                                    {lead.intent && (
                                      <div className="space-y-2">
                                        {lead.intent.primary && (
                                          <div
                                            className={`bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700`}
                                          >
                                            <p
                                              className={`text-xs font-medium text-blue-700 dark:text-blue-300 mb-1`}
                                            >
                                              Primary Intent
                                            </p>
                                            <p
                                              className={`text-xs sm:text-sm ${currentTheme.text} leading-relaxed`}
                                            >
                                              {lead.intent.primary}
                                            </p>
                                          </div>
                                        )}

                                        {lead.intent.details && (
                                          <div
                                            className={`${currentTheme.cardBg} p-3 rounded-lg border ${currentTheme.border}`}
                                          >
                                            <p
                                              className={`text-xs font-medium ${currentTheme.textSecondary} mb-1`}
                                            >
                                              Details
                                            </p>
                                            <p
                                              className={`text-xs sm:text-sm ${currentTheme.text} leading-relaxed`}
                                            >
                                              {lead.intent.details}
                                            </p>
                                          </div>
                                        )}

                                        {/* Urgency */}
                                        {lead.urgency && (
                                          <div className="flex items-center gap-2">
                                            <span
                                              className={`text-xs ${currentTheme.textSecondary}`}
                                            >
                                              Urgency:
                                            </span>
                                            <span
                                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                lead.urgency === "high"
                                                  ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                                  : lead.urgency === "medium"
                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                                    : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                              }`}
                                            >
                                              {lead.urgency}
                                            </span>
                                          </div>
                                        )}

                                        {/* Tags */}
                                        {lead.tags && lead.tags.length > 0 && (
                                          <div>
                                            <p
                                              className={`text-xs font-medium ${currentTheme.textSecondary} mb-2`}
                                            >
                                              Tags
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                              {lead.tags.map(
                                                (tag, tagIndex) => (
                                                  <span
                                                    key={tagIndex}
                                                    className={`px-2 py-0.5 ${currentTheme.cardBg} ${currentTheme.text} rounded-full text-xs border ${currentTheme.border}`}
                                                  >
                                                    {tag}
                                                  </span>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Lead Contact Information */}
                                    {lead.leadData && (
                                      <div>
                                        <p
                                          className={`text-xs font-medium ${currentTheme.textSecondary} mb-2`}
                                        >
                                          Lead Information
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          {lead.leadData.name && (
                                            <div className="flex items-start gap-2">
                                              <Users
                                                className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                              />
                                              <div className="min-w-0">
                                                <p
                                                  className={`text-xs ${currentTheme.textSecondary}`}
                                                >
                                                  Name
                                                </p>
                                                <p
                                                  className={`text-sm font-medium ${currentTheme.text} truncate`}
                                                >
                                                  {lead.leadData.name}
                                                </p>
                                              </div>
                                            </div>
                                          )}

                                          {lead.leadData.email && (
                                            <div className="flex items-start gap-2">
                                              <Mail
                                                className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                              />
                                              <div className="min-w-0">
                                                <p
                                                  className={`text-xs ${currentTheme.textSecondary}`}
                                                >
                                                  Email
                                                </p>
                                                <p
                                                  className={`text-sm font-medium ${currentTheme.text} truncate`}
                                                >
                                                  {lead.leadData.email}
                                                </p>
                                              </div>
                                            </div>
                                          )}

                                          {lead.leadData.phone && (
                                            <div className="flex items-start gap-2">
                                              <Phone
                                                className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                              />
                                              <div className="min-w-0">
                                                <p
                                                  className={`text-xs ${currentTheme.textSecondary}`}
                                                >
                                                  Phone
                                                </p>
                                                <p
                                                  className={`text-sm font-medium ${currentTheme.text}`}
                                                >
                                                  {lead.leadData.phone}
                                                </p>
                                              </div>
                                            </div>
                                          )}

                                          {lead.leadData.status && (
                                            <div className="flex items-start gap-2">
                                              <TrendingUp
                                                className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                              />
                                              <div>
                                                <p
                                                  className={`text-xs ${currentTheme.textSecondary}`}
                                                >
                                                  Status
                                                </p>
                                                <span
                                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    lead.leadData.status ===
                                                    "qualified"
                                                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                      : lead.leadData.status ===
                                                          "interested"
                                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                        : lead.leadData
                                                              .status === "new"
                                                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                                                          : `${currentTheme.cardBg} ${currentTheme.text}`
                                                  }`}
                                                >
                                                  {lead.leadData.status ===
                                                    "qualified" && (
                                                    <CheckCircle className="w-5 h-5" />
                                                  )}
                                                  {lead.leadData.status}
                                                </span>
                                              </div>
                                            </div>
                                          )}

                                          {lead.leadData.group_size && (
                                            <div className="flex items-start gap-2">
                                              <Users
                                                className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                              />
                                              <div>
                                                <p
                                                  className={`text-xs ${currentTheme.textSecondary}`}
                                                >
                                                  Group Size
                                                </p>
                                                <p
                                                  className={`text-sm font-medium ${currentTheme.text}`}
                                                >
                                                  {lead.leadData.group_size}
                                                </p>
                                              </div>
                                            </div>
                                          )}

                                          {lead.leadData.dates && (
                                            <div className="flex items-start gap-2">
                                              <Calendar
                                                className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                              />
                                              <div>
                                                <p
                                                  className={`text-xs ${currentTheme.textSecondary}`}
                                                >
                                                  Travel Dates
                                                </p>
                                                <p
                                                  className={`text-sm font-medium ${currentTheme.text}`}
                                                >
                                                  {lead.leadData.dates}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <FileText
                                  className={`w-10 h-10 ${currentTheme.textSecondary} mx-auto mb-2`}
                                />
                                <p
                                  className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                                >
                                  No matching summary for this call
                                </p>
                                <p
                                  className={`text-xs ${currentTheme.textSecondary} mt-1`}
                                >
                                  Call ID:{" "}
                                  {selectedSession.callId ||
                                    selectedSession.session_id ||
                                    selectedSession.id}
                                </p>
                              </div>
                            );
                          })()
                        ) : (
                          <div className="text-center py-6">
                            <FileText
                              className={`w-10 h-10 ${currentTheme.textSecondary} mx-auto mb-2`}
                            />
                            <p
                              className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                            >
                              No call summary available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Session History */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
                Session History
              </h3>
              {loadingSessions && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              )}
            </div>

            {loadingSessions ? (
              <div
                className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className={`${currentTheme.textSecondary}`}>
                  Loading sessions...
                </p>
              </div>
            ) : sessions.length === 0 ? (
              <div
                className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
              >
                <Phone
                  className={`w-5 h-5 mx-auto mb-3 ${currentTheme.textSecondary}`}
                />
                <h4
                  className={`text-lg font-semibold ${currentTheme.text} mb-2`}
                >
                  No Sessions Yet
                </h4>
                <p className={`${currentTheme.textSecondary}`}>
                  This agent hasn't had any sessions yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sessions.map((session, index) => {
                  const sessionId =
                    session?.session_id ||
                    session?.id ||
                    `#${String(1000 + index).padStart(4, "0")}`;
                  const status = session?.status || "Completed";
                  const durationSeconds = session?.duration_seconds || 0;
                  const duration =
                    durationSeconds > 0
                      ? `${Math.floor(durationSeconds / 60)}m ${Math.floor(durationSeconds % 60)}s`
                      : "0s";
                  const messageCount = session?.total_messages || 0;
                  const startTime = session?.start_time || new Date();
                  const location = session?.location || {};
                  const tokenUsage = session?.token_usage || {};

                  return (
                    <div
                      key={session?.id || index}
                      className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 hover:shadow-lg transition-all duration-200`}
                    >
                      {/* Session ID and View Button */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Phone
                            className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                          />
                          <h4
                            className={`font-semibold ${currentTheme.text} text-sm truncate`}
                          >
                            {sessionId}
                          </h4>
                        </div>
                        <button
                          onClick={() => handleViewSession(session)}
                          className={`p-1.5 ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} ${currentTheme.hover} transition-all duration-200 hover:shadow-lg flex-shrink-0`}
                          title="View Session"
                        >
                          {loadingTranscripts &&
                          selectedSession?.id === session?.id ? (
                            <div className="w-3 h-3 border border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Status Badge */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            status === "Completed"
                              ? "bg-green-500/10 text-green-600 border border-green-500/20"
                              : status === "In Progress"
                                ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                                : "bg-gray-500/10 text-gray-600 border border-gray-500/20"
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      {/* Date & Time */}
                      <div className="mb-3">
                        <p
                          className={`text-xs font-medium ${currentTheme.textSecondary} mb-1`}
                        >
                          Date & Time
                        </p>
                        <p
                          className={`${currentTheme.text} text-sm font-medium`}
                        >
                          {new Date(startTime).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          {new Date(startTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="mb-3">
                        <p
                          className={`text-xs font-medium ${currentTheme.textSecondary} mb-1`}
                        >
                          Location
                        </p>
                        <p
                          className={`${currentTheme.text} text-sm font-medium truncate`}
                        >
                          {[location?.city, location?.country]
                            .filter((v) => v && v !== "unknown")
                            .join(", ") || "Unknown"}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p
                            className={`text-xs ${currentTheme.textSecondary}`}
                          >
                            Device
                          </p>
                          <p
                            className={`${currentTheme.text} text-sm font-medium truncate`}
                          >
                            {session?.device?.device_type &&
                            session.device.device_type !== "unknown"
                              ? session.device.device_type
                              : "Unknown"}
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-xs ${currentTheme.textSecondary}`}
                          >
                            Duration
                          </p>
                          <p
                            className={`${currentTheme.text} text-sm font-medium`}
                          >
                            {duration}
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-xs ${currentTheme.textSecondary}`}
                          >
                            Messages
                          </p>
                          <p
                            className={`${currentTheme.text} text-sm font-medium`}
                          >
                            {messageCount}
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-xs ${currentTheme.textSecondary}`}
                          >
                            Language
                          </p>
                          <p
                            className={`${currentTheme.text} text-sm font-medium uppercase`}
                          >
                            {session?.language || "EN"}
                          </p>
                        </div>
                      </div>

                      {/* Token Usage */}
                      <div className={`pt-2 border-t ${currentTheme.border}`}>
                        <p
                          className={`text-xs ${currentTheme.textSecondary} mb-1`}
                        >
                          Token Usage
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              In
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-semibold`}
                            >
                              {tokenUsage?.input_tokens?.toLocaleString() || 0}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Out
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-semibold`}
                            >
                              {tokenUsage?.output_tokens?.toLocaleString() || 0}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Total
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-semibold`}
                            >
                              {tokenUsage?.total_tokens?.toLocaleString() || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "instructions" && (
        <div className="space-y-6">
          {/* Greeting Instructions */}
          {agent.greeting && (
            <div
              className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
                Greeting Messages
              </h3>
              <div className="space-y-4">
                {Object.entries(agent.greeting).map(([lang, message]) => (
                  <div key={lang}>
                    <label
                      className={`text-sm ${currentTheme.textSecondary} block mb-2 uppercase`}
                    >
                      {lang}
                    </label>
                    <div
                      className={`p-3 rounded-lg ${currentTheme.searchBg} ${currentTheme.text}`}
                    >
                      {message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Instructions */}
          {agent.custom_instructions && (
            <div
              className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
                Custom Instructions
              </h3>
              <div
                className={`p-4 rounded-lg ${currentTheme.searchBg} ${currentTheme.text} whitespace-pre-wrap`}
              >
                {agent.custom_instructions}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "preview" && (
        <div className="space-y-6">
          {/* Agent Preview Information */}
          <div
            className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
          >
            <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
              Agent Configuration Preview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4
                  className={`text-md font-semibold ${currentTheme.text} mb-3`}
                >
                  Basic Settings
                </h4>
                <div className="space-y-3">
                  <div>
                    <label
                      className={`text-sm ${currentTheme.textSecondary} block mb-1`}
                    >
                      Model
                    </label>
                    <p className={`${currentTheme.text} font-mono text-sm`}>
                      {agent.model || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-sm ${currentTheme.textSecondary} block mb-1`}
                    >
                      Voice
                    </label>
                    <p className={`${currentTheme.text}`}>
                      {agent.voice || "Default"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-sm ${currentTheme.textSecondary} block mb-1`}
                    >
                      Temperature
                    </label>
                    <p className={`${currentTheme.text}`}>
                      {agent.temperature || "0.7"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4
                  className={`text-md font-semibold ${currentTheme.text} mb-3`}
                >
                  Voice Detection
                </h4>
                {agent.turn_detection && (
                  <div className="space-y-3">
                    <div>
                      <label
                        className={`text-sm ${currentTheme.textSecondary} block mb-1`}
                      >
                        Type
                      </label>
                      <p className={`${currentTheme.text}`}>
                        {agent.turn_detection.type}
                      </p>
                    </div>
                    <div>
                      <label
                        className={`text-sm ${currentTheme.textSecondary} block mb-1`}
                      >
                        Threshold
                      </label>
                      <p className={`${currentTheme.text}`}>
                        {agent.turn_detection.threshold}
                      </p>
                    </div>
                    <div>
                      <label
                        className={`text-sm ${currentTheme.textSecondary} block mb-1`}
                      >
                        Silence Duration
                      </label>
                      <p className={`${currentTheme.text}`}>
                        {agent.turn_detection.silence_duration_ms}ms
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Greeting Messages Preview */}
          {agent.greeting && (
            <div
              className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
                Greeting Messages
              </h3>
              <div className="space-y-4">
                {Object.entries(agent.greeting).map(([lang, message]) => (
                  <div key={lang}>
                    <label
                      className={`text-sm ${currentTheme.textSecondary} block mb-2 uppercase`}
                    >
                      {lang}
                    </label>
                    <div
                      className={`p-3 rounded-lg ${currentTheme.searchBg} ${currentTheme.text}`}
                    >
                      {message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Test Interface */}
          <div
            className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
          >
            <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
              Test Agent Interface
            </h3>

            {/* Chat History */}
            <div className="space-y-4 mb-6">
              <div
                className={`h-96 overflow-y-auto p-4 rounded-lg ${currentTheme.searchBg} border ${currentTheme.border}`}
              >
                {chatMessages.length === 0 ? (
                  <div
                    className={`text-center py-8 ${currentTheme.textSecondary}`}
                  >
                    <MessageCircle className="w-5 h-5 mx-auto mb-2 opacity-50" />
                    <p>Start a conversation to test the agent</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${(message.type || message.role) === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            (message.type || message.role) === "user"
                              ? "bg-blue-500 text-white"
                              : `${currentTheme.cardBg} ${currentTheme.text} border ${currentTheme.border}`
                          }`}
                        >
                          <p className="text-sm">
                            {message.content || message.text}
                          </p>
                          <p className={`text-xs mt-1 opacity-70`}>
                            {message.timestamp instanceof Date
                              ? message.timestamp.toLocaleTimeString()
                              : new Date(
                                  message.timestamp
                                ).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTestingAgent && (
                      <div className="flex justify-start">
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${currentTheme.cardBg} ${currentTheme.text} border ${currentTheme.border}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            <p className="text-sm">Agent is thinking...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTestAgent()}
                placeholder="Type your message to test the agent..."
                disabled={isTestingAgent}
                className={`flex-1 px-4 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50`}
              />
              <button
                onClick={handleTestAgent}
                disabled={isTestingAgent || !testMessage.trim()}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                {isTestingAgent ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send
                  </>
                )}
              </button>
            </div>

            {/* Test Controls */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setChatMessages([])}
                className={`px-4 py-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} text-sm font-medium transition-colors duration-200 flex items-center gap-2`}
              >
                <Trash2 className="w-5 h-5" />
                Clear Chat
              </button>
              <button
                onClick={() => {
                  const demoMessage = {
                    type: "user",
                    content: "Hello! Can you tell me about your capabilities?",
                    timestamp: new Date(),
                  };
                  setChatMessages((prev) => [...prev, demoMessage]);
                  setIsTestingAgent(true);
                  setTimeout(() => {
                    const response = {
                      type: "agent",
                      content: `Hi! I'm ${agent.name}. I can help you with various tasks using voice interactions. Feel free to ask me anything!`,
                      timestamp: new Date(),
                    };
                    setChatMessages((prev) => [...prev, response]);
                    setIsTestingAgent(false);
                  }, 1500);
                }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Demo Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "instructions" && (
        <div className="space-y-6">
          {/* Custom Instructions */}
          {agent.custom_instructions && (
            <div
              className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
                Custom Instructions
              </h3>
              <div
                className={`p-4 rounded-lg ${currentTheme.searchBg} ${currentTheme.text} whitespace-pre-wrap`}
              >
                {agent.custom_instructions}
              </div>
            </div>
          )}

          {/* System Prompts */}
          <div
            className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
          >
            <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
              System Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Agent ID
                </label>
                <div
                  className={`p-3 rounded-lg ${currentTheme.searchBg} ${currentTheme.text} font-mono text-sm`}
                >
                  {agent?.id || agent?._id || "N/A"}
                </div>
              </div>

              <div>
                <label
                  className={`text-sm ${currentTheme.textSecondary} block mb-2`}
                >
                  Model Configuration
                </label>
                <div
                  className={`p-3 rounded-lg ${currentTheme.searchBg} ${currentTheme.text}`}
                >
                  Model: {agent.model || "N/A"}
                  <br />
                  Temperature: {agent.temperature || "0.7"}
                  <br />
                  Max Tokens: {agent.max_tokens || "Not specified"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AnalyticsTab = ({ client, currentTheme }) => {
  const [timeRange, setTimeRange] = useState("7days");

  // Mock analytics data - replace with actual API calls
  const analyticsData = {
    callStats: {
      totalCalls: 1247,
      successfulCalls: 1156,
      failedCalls: 91,
      avgDuration: "3m 45s",
      peakHours: "2pm - 4pm",
    },
    tokenUsage: {
      total: 125000,
      inputTokens: 45000,
      outputTokens: 80000,
      avgPerCall: 100,
    },
    performance: {
      avgResponseTime: "1.2s",
      successRate: "92.7%",
      customerSatisfaction: "4.5/5",
      resolvedQueries: "87%",
    },
    revenue: {
      currentMonth: 2450.0,
      previousMonth: 2100.0,
      growth: "+16.7%",
    },
  };

  const timeRanges = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "12months", label: "Last 12 Months" },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
          Analytics Overview
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Call Statistics */}
      <div>
        <h4
          className={`text-md font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
        >
          <Mic2 className="w-5 h-5" />
          Call Statistics
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Total Calls
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              {analyticsData.callStats.totalCalls.toLocaleString()}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Successful
            </p>
            <p className={`text-2xl font-bold text-green-600`}>
              {analyticsData.callStats.successfulCalls.toLocaleString()}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Failed
            </p>
            <p className={`text-2xl font-bold text-red-600`}>
              {analyticsData.callStats.failedCalls}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Avg Duration
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              {analyticsData.callStats.avgDuration}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Peak Hours
            </p>
            <p className={`text-lg font-bold ${currentTheme.text}`}>
              {analyticsData.callStats.peakHours}
            </p>
          </div>
        </div>
      </div>

      {/* Token Usage */}
      <div>
        <h4
          className={`text-md font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
        >
          <Repeat className="w-5 h-5" />
          Token Usage
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Total Tokens
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              {analyticsData.tokenUsage.total.toLocaleString()}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Input Tokens
            </p>
            <p className={`text-2xl font-bold text-blue-600`}>
              {analyticsData.tokenUsage.inputTokens.toLocaleString()}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Output Tokens
            </p>
            <p className={`text-2xl font-bold text-purple-600`}>
              {analyticsData.tokenUsage.outputTokens.toLocaleString()}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Avg per Call
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              {analyticsData.tokenUsage.avgPerCall}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h4
          className={`text-md font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
        >
          <Activity className="w-5 h-5" />
          Performance Metrics
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Avg Response Time
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              {analyticsData.performance.avgResponseTime}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Success Rate
            </p>
            <p className={`text-2xl font-bold text-green-600`}>
              {analyticsData.performance.successRate}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Customer Satisfaction
            </p>
            <p className={`text-2xl font-bold text-yellow-600`}>
              {analyticsData.performance.customerSatisfaction}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Resolved Queries
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              {analyticsData.performance.resolvedQueries}
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div>
        <h4
          className={`text-md font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
        >
          <DollarSign className="w-5 h-5" />
          Revenue Analytics
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Current Month
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              ${analyticsData.revenue.currentMonth.toFixed(2)}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Previous Month
            </p>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              ${analyticsData.revenue.previousMonth.toFixed(2)}
            </p>
          </div>
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
          >
            <p className={`text-xs ${currentTheme.textSecondary} mb-1`}>
              Growth
            </p>
            <p className={`text-2xl font-bold text-green-600`}>
              {analyticsData.revenue.growth}
            </p>
          </div>
        </div>
      </div>

      {/* AI Employees Performance */}
      <div>
        <h4
          className={`text-md font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}
        >
          <Bot className="w-5 h-5" />
          AI Employees Performance
        </h4>
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${currentTheme.border}`}>
                  <th
                    className={`text-left py-3 px-4 text-sm font-semibold ${currentTheme.text}`}
                  >
                    AI Employee
                  </th>
                  <th
                    className={`text-left py-3 px-4 text-sm font-semibold ${currentTheme.text}`}
                  >
                    Calls
                  </th>
                  <th
                    className={`text-left py-3 px-4 text-sm font-semibold ${currentTheme.text}`}
                  >
                    Avg Duration
                  </th>
                  <th
                    className={`text-left py-3 px-4 text-sm font-semibold ${currentTheme.text}`}
                  >
                    Success Rate
                  </th>
                  <th
                    className={`text-left py-3 px-4 text-sm font-semibold ${currentTheme.text}`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {client?.ai_employees?.length > 0 ? (
                  client.ai_employees.map((employee, index) => (
                    <tr
                      key={index}
                      className={`border-b ${currentTheme.border} hover:${currentTheme.hover}`}
                    >
                      <td className={`py-3 px-4 text-sm ${currentTheme.text}`}>
                        {employee.agent_name || `AI Employee ${index + 1}`}
                      </td>
                      <td className={`py-3 px-4 text-sm ${currentTheme.text}`}>
                        {Math.floor(Math.random() * 500) + 100}
                      </td>
                      <td className={`py-3 px-4 text-sm ${currentTheme.text}`}>
                        {Math.floor(Math.random() * 5) + 2}m{" "}
                        {Math.floor(Math.random() * 60)}s
                      </td>
                      <td className={`py-3 px-4 text-sm`}>
                        <span className="text-green-600 font-semibold">
                          {(Math.random() * 10 + 85).toFixed(1)}%
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-sm`}>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === "active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {employee.status || "active"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className={`py-8 text-center text-sm ${currentTheme.textSecondary}`}
                    >
                      No AI employees configured yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionsTab = ({ client, currentTheme }) => {
  // Mock transaction data - replace with actual API call
  const transactions = [
    {
      id: 1,
      date: "2024-12-01",
      amount: 149.0,
      type: "subscription",
      status: "completed",
      description: "Monthly subscription",
    },
    {
      id: 2,
      date: "2024-11-01",
      amount: 149.0,
      type: "subscription",
      status: "completed",
      description: "Monthly subscription",
    },
    {
      id: 3,
      date: "2024-10-15",
      amount: 50.0,
      type: "usage",
      status: "completed",
      description: "Additional tokens",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
          Transaction History
        </h3>
      </div>

      {transactions.length === 0 ? (
        <div
          className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
        >
          <DollarSign
            className={`w-12 h-12 mx-auto mb-3 ${currentTheme.textSecondary}`}
          />
          <h4 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>
            No Transactions
          </h4>
          <p className={`${currentTheme.textSecondary}`}>
            No transaction history available for this client.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`${currentTheme.searchBg} rounded-lg p-4 border ${currentTheme.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center`}
                  >
                    <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${currentTheme.text}`}>
                      ${transaction.amount.toFixed(2)}
                    </h4>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {transaction.status}
                  </span>
                  <p className={`text-sm ${currentTheme.textSecondary} mt-1`}>
                    {transaction.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ClientManagement = () => {
  const { theme, currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Get initial tab from URL params or default to "all"
  const getInitialTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "all";
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
    const currentTabParam = params.get("tab");

    if (currentTabParam !== activeTab) {
      if (activeTab === "all") {
        params.delete("tab");
      } else {
        params.set("tab", activeTab);
      }

      const newSearch = params.toString();
      const newPath = newSearch
        ? `${location.pathname}?${newSearch}`
        : location.pathname;

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

  const handleEditClient = async (client) => {
    try {
      console.log("🔍 handleEditClient called with client:", client);
      setLoading(true);
      setSelectedClient(client);

      if (client?.id) {
        console.log(`🚀 Fetching onboarding data for user: ${client.id}`);
        const onboardingResponse = await shivaiApiService.getOnboardingByUserId(
          client.id
        );
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
            name:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.name ||
              clientWithDetails?.company_basics?.name ||
              "",
            description:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.description ||
              clientWithDetails?.company_basics?.description ||
              "",
            company_email:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.company_email ||
              clientWithDetails?.company_basics?.company_email ||
              "",
            company_phone:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.company_phone ||
              clientWithDetails?.company_basics?.company_phone ||
              "",
            website:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.website ||
              clientWithDetails?.company_basics?.website ||
              "",
            address:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.address ||
              clientWithDetails?.company_basics?.address ||
              "",
            company_size:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.company_size ||
              clientWithDetails?.company_basics?.company_size ||
              "",
            industry:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.industry ||
              clientWithDetails?.company_basics?.industry ||
              [],
            linkedin_profile:
              clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                ?.linkedin_profile ||
              clientWithDetails?.company_basics?.linkedin_profile ||
              "",
            primary_region: {
              countries:
                clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                  ?.primary_region?.countries || [],
              states:
                clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                  ?.primary_region?.states || [],
              cities:
                clientWithDetails?.onboardingDetails?.onboarding?.company_basics
                  ?.primary_region?.cities || [],
            },
          },
          ai_employees: (
            clientWithDetails?.onboardingDetails?.onboarding?.ai_employees ||
            clientWithDetails?.ai_employees ||
            []
          ).map((emp) => ({
            ...emp,
            knowledge_sources: {
              faqs_text: emp?.knowledge_sources?.faqs_text || "",
              uploaded_files: emp?.knowledge_sources?.uploaded_files || [],
              website_url: emp?.knowledge_sources?.website_url || "",
              social_links: emp?.knowledge_sources?.social_links || {},
              additional_sources: Array.isArray(emp?.knowledge_sources)
                ? emp.knowledge_sources
                : emp?.knowledge_sources?.additional_sources || [],
            },
          })),
          plan_details:
            clientWithDetails?.onboardingDetails?.onboarding?.plan_details ||
            clientWithDetails?.plan_details ||
            {},
          deployment_targets:
            clientWithDetails?.onboardingDetails?.onboarding
              ?.deployment_targets ||
            clientWithDetails?.deployment_targets ||
            {},
          deployment_service:
            clientWithDetails?.onboardingDetails?.onboarding
              ?.deployment_service ||
            clientWithDetails?.deployment_service ||
            {},
          consent_options:
            clientWithDetails?.onboardingDetails?.onboarding?.consent_options ||
            clientWithDetails?.consent_options ||
            {},
          instructions:
            clientWithDetails?.onboardingDetails?.onboarding?.instructions ||
            clientWithDetails?.instructions ||
            {},
          targets:
            clientWithDetails?.onboardingDetails?.onboarding?.targets ||
            clientWithDetails?.targets ||
            {},
          userData: clientWithDetails?.userData,
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

  const handleDeleteClient = async (client) => {
    try {
      const clientId = client?.id;
      const clientName = client?.fullName || client?.name || "this client";

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
        state: { client },
      });
    } catch (error) {
      console.error("❌ Error navigating to client details:", error);
      toast.error("Failed to navigate to client details");
    }
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Saving edited data:", editData);
      toast.loading("Saving client data...", { id: "save-toast" });

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
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      };

      // Helper function to format voice gender
      const formatVoiceGender = (gender) => {
        if (!gender) return "Gender Neutral";
        const lowerGender = gender.toLowerCase();
        if (lowerGender.includes("male") && !lowerGender.includes("female"))
          return "Male";
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
          const uploadResponse =
            await shivaiApiService.uploadOnboardingFiles(newFilesToUpload);
          uploadedFilesData = uploadResponse.uploaded_files || [];
          console.log("✅ Files uploaded:", uploadedFilesData);
        } catch (uploadError) {
          console.error("❌ Error uploading files:", uploadError);
          toast.error("Failed to upload files. Saving other data...", {
            id: "save-toast",
          });
        }
      }

      // Map frontend template to backend enum value
      const mapTemplate = (template) => {
        const templateMap = {
          "Sales & Business Development": "sales_business_development",
          "Customer Support & Service": "customer_support_service",
          "Appointment & Scheduling": "appointment_scheduling",
          "Order Management & Billing": "order_management_billing",
          "Product / Service Explainers": "product_service_explainers",
          "Feedback & Engagement": "feedback_engagement",
          "Custom Workflows": "custom_workflows",
        };
        const mapped = templateMap[template];
        if (mapped) return mapped;

        // Convert to snake_case as fallback
        return (template || "")
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "")
          .replace(/&/g, "and");
      };

      // Map frontend deployment target values to backend enum values
      const mapDeploymentTargets = (targets) => {
        const targetMap = {
          website: "Website",
          app: "Mobile App",
          whatsapp: "WhatsApp",
        };
        return (targets || []).map((target) => targetMap[target] || target);
      };

      // Map frontend deployment service value to backend enum value
      const mapDeploymentService = (service) => {
        const serviceMap = {
          managed: "Shivai",
          "self-service": "Client",
          shivai: "Shivai",
          client: "Client",
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
          linkedin_profile: ensureValidUrl(
            editData?.company_basics?.linkedin_profile || ""
          ),
          description: editData?.company_basics?.description || "",
          industry: Array.isArray(editData?.company_basics?.industry)
            ? editData.company_basics.industry
            : [editData?.company_basics?.industry || ""],
          primary_region: {
            countries:
              editData?.company_basics?.primary_region?.countries || [],
            states: editData?.company_basics?.primary_region?.states || [],
            cities: editData?.company_basics?.primary_region?.cities || [],
          },
        },

        plan_details: editData?.plan_details || {},

        ai_employees: (editData.ai_employees || []).map(
          (employee, empIndex) => {
            // Get files for this employee
            const agentFiles = (
              employee.knowledge_sources?.uploaded_files || []
            ).filter((f) => !f.pending_upload);

            // Start with existing server files for this employee
            const employeeFiles = [...(existingServerFiles[empIndex] || [])];

            // Add newly uploaded files for this employee
            const newFilesForThisEmployee = (
              employee.knowledge_sources?.uploaded_files || []
            ).filter((f) => f.pending_upload && f.fileObject).length;

            if (newFilesForThisEmployee > 0 && uploadedFilesData.length > 0) {
              const startIndex = Object.keys(existingServerFiles)
                .slice(0, empIndex)
                .reduce((sum, idx) => {
                  return (
                    sum +
                    (
                      editData.ai_employees[idx]?.knowledge_sources
                        ?.uploaded_files || []
                    ).filter((f) => f.pending_upload && f.fileObject).length
                  );
                }, 0);

              employeeFiles.push(
                ...uploadedFilesData.slice(
                  startIndex,
                  startIndex + newFilesForThisEmployee
                )
              );
            }

            // Build workflows array
            const workflows = (employee.workflows || []).map((workflow) => ({
              name: workflow.name || "",
              instruction: workflow.instruction || "",
            }));

            return {
              name: employee.name || `AI Employee ${empIndex + 1}`,
              type: capitalizeWords(employee.type || ""),
              template: mapTemplate(employee.template || ""),
              preferred_language: capitalizeWords(
                employee.preferred_language || "English"
              ),
              voice_gender: formatVoiceGender(
                employee.voice_gender || "Gender Neutral"
              ),
              agent_personality: employee.agent_personality || "",
              voice_style: employee.voice_style || "",
              special_instructions: employee.special_instructions || "",
              workflows: workflows,
              knowledge_sources: {
                website_url: ensureValidUrl(
                  employee.knowledge_sources?.website_url || ""
                ),
                social_links: employee.knowledge_sources?.social_links || {},
                faqs_text: employee.knowledge_sources?.faqs_text || "",
                uploaded_files: employeeFiles,
              },
              deployment_targets: {
                channels: mapDeploymentTargets(
                  employee?.deployment_targets?.channels || []
                ),
                deployment_notes:
                  employee.deployment_targets?.deployment_notes || "",
              },
              deployment_service: {
                service_type: mapDeploymentService(
                  employee.deployment_service?.service_type || ""
                ),
              },
              consent_options: {
                recording_enabled:
                  employee.consent_options?.recording_enabled || false,
                transcript_email_optin:
                  employee.consent_options?.transcript_email_optin || false,
                privacy_notes: employee.consent_options?.privacy_notes || "",
              },
              instructions: {
                dos_and_donts:
                  employee.instructions?.dos_donts ||
                  employee.instructions?.dos_and_donts ||
                  "",
                fallback_contacts:
                  employee.instructions?.fallback_contacts || "",
              },
              targets: {
                success_goals:
                  employee.success_targets?.description ||
                  employee.targets?.success_goals ||
                  "",
                success_metrics:
                  employee.success_targets?.metrics ||
                  employee.targets?.success_metrics ||
                  "",
              },
            };
          }
        ),
      };

      console.log("📤 Sending payload:", JSON.stringify(payloadData, null, 2));

      // Update client data with uploaded file references
      const updateResponse = await shivaiApiService.updateClientData(
        editData._id,
        payloadData
      );
      console.log("✅ Update response:", updateResponse);

      // Check if response is successful
      if (
        updateResponse &&
        (updateResponse.success === true || updateResponse.statusCode === 200)
      ) {
        // Update local state
        setClients((prev) =>
          prev.map((client) =>
            client._id === editData._id
              ? { ...client, ...editData, ...payloadData }
              : client
          )
        );

        toast.success(
          updateResponse.message || "Client data updated successfully!",
          { id: "save-toast" }
        );
        setIsEditing(false);
        handleBackToList();
      } else {
        throw new Error(updateResponse?.message || "Update failed");
      }
    } catch (error) {
      console.error("Error saving client data:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save client data";
      toast.error(errorMessage, { id: "save-toast" });
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
      toast.error("Client is already approved");
      return;
    }

    try {
      setActionLoading(true);
      toast.loading("Approving client...", { id: "approve-toast" });

      const result = await shivaiApiService.approveClient(client._id);

      if (result?.success) {
        toast.success(
          `${client?.company_basics?.name || "Client"} approved successfully!`,
          { id: "approve-toast" }
        );

        // Refresh the clients list
        await fetchClients(activeTab, currentPage);

        // If we're viewing this client, go back to list
        if (selectedClient?._id === client._id) {
          handleBackToList();
        }
      } else {
        throw new Error(result?.message || "Failed to approve client");
      }
    } catch (error) {
      console.error("Error approving client:", error);
      toast.error("Failed to approve client. Please try again.", {
        id: "approve-toast",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectClient = async (client) => {
    if (client?.isRejected) {
      toast.error("Client is already rejected");
      return;
    }

    const rejectionReason = "Application rejected by admin";

    try {
      setActionLoading(true);
      toast.loading("Rejecting client...", { id: "reject-toast" });

      const result = await shivaiApiService.rejectClient(
        client._id,
        rejectionReason.trim()
      );

      if (result?.success) {
        toast.success(
          `${client?.company_basics?.name || "Client"} rejected successfully!`,
          { id: "reject-toast" }
        );

        // Refresh the clients list
        await fetchClients(activeTab, currentPage);

        // If we're viewing this client, go back to list
        if (selectedClient && selectedClient._id === client._id) {
          handleBackToList();
        }
      } else {
        throw new Error(result?.message || "Failed to reject client");
      }
    } catch (error) {
      console.error("Error rejecting client:", error);
      toast.error("Failed to reject client. Please try again.", {
        id: "reject-toast",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // File handling functions
  const handleViewFile = async (file) => {
    try {
      const s3Key = file?.s3_key || file?.key;

      if (!s3Key) {
        toast.error("File key not found");
        return;
      }

      const response = await shivaiApiService.downloadFileByS3Key(s3Key);
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Error viewing file:", error);
      toast.error("Failed to view file");
    }
  };

  const handleDownloadFile = async (file) => {
    try {
      const s3Key = file?.s3_key || file?.key;
      const fileName = file?.name || file?.filename || "download";

      if (!s3Key) {
        toast.error("File key not found");
        return;
      }

      // Use shivaiApiService to download file with s3_key in body
      const response = await shivaiApiService.downloadFileByS3Key(s3Key);

      // Create object URL from blob response
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      window.URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
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
    console.log("updateIndustry called with:", industries);
    setEditData((prev) => {
      const newData = {
        ...prev,
        company_basics: {
          ...prev?.company_basics,
          industry: industries,
        },
      };
      console.log("Updated editData:", newData);
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
        channels: (prev?.deployment_targets?.channels || []).filter(
          (c) => c !== channel
        ),
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
            faqs_text: "",
            uploaded_files: [],
            website_url: "",
            social_links: {},
            additional_sources: [],
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
        if (field.includes(".")) {
          const keys = field.split(".");
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
  const FormField = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    rows,
    children,
    className = "",
  }) => {
    return (
      <div className={className}>
        <label
          className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
        >
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            disabled={!isEditing}
            className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-vertical ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
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
            className={`w-full px-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
          />
        )}
      </div>
    );
  };

  // Remove whole component loading - we'll show loading in the table instead

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
    navigate(
      `/dashboard/clients/${selectedClient._id || selectedClient.userData?._id}`,
      {
        state: { client: selectedClient },
      }
    );
    // Reset viewMode to prevent infinite loop
    setViewMode("list");
    return null;
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
                <ArrowLeft className="w-5 h-5" />
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
                  <Edit className="w-5 h-5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base`}
                  >
                    <X className="w-5 h-5" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 sm:flex-none admin-btn-primary px-3 sm:px-4 py-2 text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
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
              <Building2 className="w-5 h-5" />
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
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`} ${(editData?.company_basics?.industry || []).length >= 4 ? "cursor-not-allowed" : ""}`}
                    placeholder={
                      (editData?.company_basics?.industry || []).length >= 4
                        ? "Maximum 4 industries selected"
                        : "Search or select industries"
                    }
                  />
                  <ArrowDown
                    className={`absolute right-2.5 top-2.5 w-4 h-4 text-gray-400 transition-transform cursor-pointer ${showIndustryDropdown ? "rotate-180" : ""}`}
                    onClick={() =>
                      isEditing &&
                      setShowIndustryDropdown(!showIndustryDropdown)
                    }
                  />

                  {/* Selected Industries Display */}
                  {(editData?.company_basics?.industry || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editData?.company_basics?.industry || []).map(
                        (industry, index) => {
                          const industryLabel =
                            industryOptions.find(
                              (opt) => opt.value === industry
                            )?.label || industry;
                          return (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                            >
                              {industryLabel}
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newIndustries = (
                                      editData?.company_basics?.industry || []
                                    ).filter((_, i) => i !== index);
                                    updateIndustry(newIndustries);
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              )}
                            </span>
                          );
                        }
                      )}
                    </div>
                  )}

                  {/* Dropdown Options */}
                  {showIndustryDropdown && isEditing && (
                    <div
                      className={`absolute z-50 w-full mt-1 ${currentTheme.cardBg} border ${currentTheme.border} rounded-lg shadow-xl max-h-48 overflow-y-auto`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {industryOptions
                        .filter(
                          (option) =>
                            option.label
                              .toLowerCase()
                              .includes(industrySearch.toLowerCase()) &&
                            !(
                              editData?.company_basics?.industry || []
                            ).includes(option.value)
                        )
                        .map((option) => (
                          <div
                            key={option.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(
                                "Industry option clicked:",
                                option.value
                              );
                              const currentIndustries =
                                editData?.company_basics?.industry || [];
                              console.log(
                                "Current industries:",
                                currentIndustries
                              );
                              if (option.value === "other") {
                                setIndustrySearch("Add your industry type");
                              } else if (
                                currentIndustries.length < 4 &&
                                !currentIndustries.includes(option.value)
                              ) {
                                console.log("Adding industry:", option.value);
                                updateIndustry([
                                  ...currentIndustries,
                                  option.value,
                                ]);
                                setIndustrySearch("");
                                setTimeout(
                                  () => setShowIndustryDropdown(false),
                                  100
                                );
                              } else {
                                console.log(
                                  "Max industries reached or already selected"
                                );
                              }
                            }}
                            className={`px-3 py-2 border-b ${currentTheme.border} last:border-b-0 ${(editData?.company_basics?.industry || []).length >= 4 ? "cursor-not-allowed text-gray-400 bg-gray-50" : "hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"}`}
                          >
                            {option.label}
                            {(editData?.company_basics?.industry || [])
                              .length >= 4 && (
                              <span className="text-xs text-gray-400 ml-2">
                                (Max reached)
                              </span>
                            )}
                          </div>
                        ))}
                      {industrySearch &&
                        !industryOptions.some((opt) =>
                          opt.label
                            .toLowerCase()
                            .includes(industrySearch.toLowerCase())
                        ) &&
                        !(editData?.company_basics?.industry || []).includes(
                          industrySearch
                        ) && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(
                                "Custom industry add clicked:",
                                industrySearch
                              );
                              const currentIndustries =
                                editData?.company_basics?.industry || [];
                              if (
                                currentIndustries.length < 4 &&
                                !currentIndustries.includes(industrySearch)
                              ) {
                                console.log(
                                  "Adding custom industry:",
                                  industrySearch
                                );
                                updateIndustry([
                                  ...currentIndustries,
                                  industrySearch,
                                ]);
                                setIndustrySearch("");
                                setTimeout(
                                  () => setShowIndustryDropdown(false),
                                  100
                                );
                              }
                            }}
                            className={`px-3 py-2 font-medium ${(editData?.company_basics?.industry || []).length >= 4 ? "cursor-not-allowed text-gray-400 bg-gray-50" : "hover:bg-blue-50 cursor-pointer text-blue-600"}`}
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
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  value={(
                    editData?.company_basics?.primary_region?.countries || []
                  ).join(", ")}
                  onChange={(e) => {
                    const countries = e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter((c) => c);
                    updateEditData(
                      "company_basics.primary_region.countries",
                      countries
                    );
                  }}
                  placeholder="USA, Canada, UK (comma separated)"
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  value={(
                    editData?.company_basics?.primary_region?.states || []
                  ).join(", ")}
                  onChange={(e) => {
                    const states = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s);
                    updateEditData(
                      "company_basics.primary_region.states",
                      states
                    );
                  }}
                  placeholder="California, New York, Texas (comma separated)"
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  value={(
                    editData?.company_basics?.primary_region?.cities || []
                  ).join(", ")}
                  onChange={(e) => {
                    const cities = e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter((c) => c);
                    updateEditData(
                      "company_basics.primary_region.cities",
                      cities
                    );
                  }}
                  placeholder="New York, Los Angeles, Chicago (comma separated)"
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
              <CreditCard className="w-5 h-5" />
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
                    const selectedPlan = planOptions.find(
                      (p) => p.apiKey === e.target.value
                    );
                    updateEditData("plan_details.type", e.target.value);
                    if (selectedPlan) {
                      updateEditData(
                        "plan_details.ai_employee_limit",
                        selectedPlan.aiEmployees
                      );
                      updateEditData(
                        "plan_details.monthly_price",
                        selectedPlan.price === "Custom"
                          ? 0
                          : parseFloat(
                              selectedPlan.price.replace(/[$\/mo,]/g, "") || "0"
                            )
                      );
                    }
                  }}
                  disabled={!isEditing}
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={
                    !isEditing || editData?.plan_details?.type !== "Custom Plan"
                  }
                  placeholder={
                    editData?.plan_details?.type === "Custom Plan"
                      ? "Enter custom price"
                      : "Auto-populated from plan"
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing || editData?.plan_details?.type !== "Custom Plan" ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  disabled={
                    !isEditing || editData?.plan_details?.type !== "Custom Plan"
                  }
                  placeholder={
                    editData?.plan_details?.type === "Custom Plan"
                      ? "Enter custom limit"
                      : "Auto-populated from plan"
                  }
                  className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing || editData?.plan_details?.type !== "Custom Plan" ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                  />
                  <input
                    type="text"
                    value={
                      editData?.plan_details?.billing_contact?.company_name ||
                      ""
                    }
                    onChange={(e) =>
                      updateEditData(
                        "plan_details.billing_contact.company_name",
                        e.target.value
                      )
                    }
                    placeholder="Billing Company Name (if different)"
                    disabled={!isEditing}
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                    className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                      className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                  <Mic2 className="w-5 h-5" />
                </div>
                <div>
                  <span>AI Employees</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${currentTheme.searchBg} ${currentTheme.textSecondary}`}
                  >
                    {(editData?.ai_employees || []).length} configured
                  </span>
                </div>
              </h3>
              <button
                onClick={addAIEmployee}
                disabled={!isEditing}
                className={`admin-btn-primary px-4 py-2.5 text-sm w-full sm:w-auto flex items-center justify-center gap-2 font-medium ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <UserPlus className="w-5 h-5" />
                Add AI Employee
              </button>
            </div>
            <div className="space-y-6">
              {(editData?.ai_employees || []).length === 0 ? (
                <div
                  className={`text-center py-12 border-2 border-dashed ${currentTheme.border} rounded-xl`}
                >
                  <div
                    className={`p-3 rounded-full ${currentTheme.searchBg} w-16 h-16 mx-auto mb-4 flex items-center justify-center`}
                  >
                    <Mic2 className={`w-8 h-8 ${currentTheme.textSecondary}`} />
                  </div>
                  <h4
                    className={`text-lg font-medium ${currentTheme.text} mb-2`}
                  >
                    No AI Employees Yet
                  </h4>
                  <p className={`${currentTheme.textSecondary} text-sm mb-4`}>
                    Add your first AI employee to get started with automation
                  </p>
                  {isEditing && (
                    <button
                      onClick={addAIEmployee}
                      className="admin-btn-primary px-6 py-2.5 text-sm font-medium"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
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
                        <div
                          className={`p-2 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}
                        >
                          <Bot className={`w-5 h-5 ${currentTheme.text}`} />
                        </div>
                        <div>
                          <h4
                            className={`${currentTheme.text} font-bold text-lg`}
                          >
                            {ai?.name || `AI Employee #${idx + 1}`}
                          </h4>
                          <p
                            className={`${currentTheme.textSecondary} text-sm`}
                          >
                            {ai?.type || "Assistant"} •{" "}
                            {ai?.preferred_language || "English"}
                          </p>
                        </div>
                      </div>
                      {(editData?.ai_employees || []).length > 1 && (
                        <button
                          onClick={() => removeAIEmployee(idx)}
                          className={`p-2 rounded-lg ${currentTheme.hover} text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2`}
                          title="Remove AI Employee"
                        >
                          <X className="w-5 h-5" />
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
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                            updateAIEmployee(
                              idx,
                              "voice_gender",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                            updateAIEmployee(idx, "voice_style", e.target.value)
                          }
                          placeholder="e.g., Professional, Friendly, Energetic"
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                        />
                      </div>

                      {/* Workflows Section */}
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-3">
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block`}
                          >
                            <FileText className="w-4 h-4 inline mr-1" />
                            Workflow Integrations (
                            {(ai?.workflows || []).length})
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              // Add a new workflow integration
                              setEditData((prev) => ({
                                ...prev,
                                ai_employees: (prev?.ai_employees || []).map(
                                  (emp, i) =>
                                    i === idx
                                      ? {
                                          ...emp,
                                          workflows: [
                                            ...(emp.workflows || []),
                                            {
                                              name: "WhatsApp Business",
                                              instruction:
                                                "Configure WhatsApp Business integration",
                                            },
                                          ],
                                        }
                                      : emp
                                ),
                              }));
                            }}
                            className={`px-3 py-1 rounded-lg text-xs bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors flex items-center gap-1`}
                          >
                            <Plus className="w-5 h-5" />
                            Add Workflow
                          </button>
                        </div>

                        <div className="space-y-3">
                          {(ai?.workflows || []).length > 0 ? (
                            (ai?.workflows || []).map(
                              (workflow, workflowIdx) => (
                                <div
                                  key={workflowIdx}
                                  className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <h5
                                      className={`text-sm font-medium ${currentTheme.text} flex items-center gap-2`}
                                    >
                                      <Settings className="w-5 h-5" />
                                      Workflow #{workflowIdx + 1}
                                    </h5>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        // Remove this workflow
                                        setEditData((prev) => ({
                                          ...prev,
                                          ai_employees: (
                                            prev?.ai_employees || []
                                          ).map((emp, i) =>
                                            i === idx
                                              ? {
                                                  ...emp,
                                                  workflows: (
                                                    emp.workflows || []
                                                  ).filter(
                                                    (_, wIdx) =>
                                                      wIdx !== workflowIdx
                                                  ),
                                                }
                                              : emp
                                          ),
                                        }));
                                      }}
                                      className={`p-1 rounded ${currentTheme.hover} text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <label
                                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                                      >
                                        Integration Type
                                      </label>
                                      <select
                                        value={workflow?.name || ""}
                                        onChange={(e) => {
                                          setEditData((prev) => ({
                                            ...prev,
                                            ai_employees: (
                                              prev?.ai_employees || []
                                            ).map((emp, i) =>
                                              i === idx
                                                ? {
                                                    ...emp,
                                                    workflows: (
                                                      emp.workflows || []
                                                    ).map((w, wIdx) =>
                                                      wIdx === workflowIdx
                                                        ? {
                                                            ...w,
                                                            name: e.target
                                                              .value,
                                                          }
                                                        : w
                                                    ),
                                                  }
                                                : emp
                                            ),
                                          }));
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                                      >
                                        <option value="">
                                          Select Integration
                                        </option>
                                        <option value="WhatsApp Business">
                                          WhatsApp Business
                                        </option>
                                        <option value="Gmail">Gmail</option>
                                        <option value="Webhooks">
                                          Webhooks
                                        </option>
                                        <option value="Google Calendar">
                                          Google Calendar
                                        </option>
                                        <option value="Calendly">
                                          Calendly
                                        </option>
                                        <option value="Google Sheets">
                                          Google Sheets
                                        </option>
                                        <option value="Zoho CRM">
                                          Zoho CRM
                                        </option>
                                        <option value="Odoo">Odoo</option>
                                        <option value="HubSpot">HubSpot</option>
                                        <option value="Salesforce CRM">
                                          Salesforce CRM
                                        </option>
                                        <option value="Zendesk">Zendesk</option>
                                        <option value="Shopify">Shopify</option>
                                        <option value="Slack">Slack</option>
                                        <option value="Zapier">Zapier</option>
                                      </select>
                                    </div>

                                    <div>
                                      <label
                                        className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                                      >
                                        Integration Instructions
                                      </label>
                                      <textarea
                                        value={workflow?.instruction || ""}
                                        onChange={(e) => {
                                          setEditData((prev) => ({
                                            ...prev,
                                            ai_employees: (
                                              prev?.ai_employees || []
                                            ).map((emp, i) =>
                                              i === idx
                                                ? {
                                                    ...emp,
                                                    workflows: (
                                                      emp.workflows || []
                                                    ).map((w, wIdx) =>
                                                      wIdx === workflowIdx
                                                        ? {
                                                            ...w,
                                                            instruction:
                                                              e.target.value,
                                                          }
                                                        : w
                                                    ),
                                                  }
                                                : emp
                                            ),
                                          }));
                                        }}
                                        rows={3}
                                        placeholder="Enter specific instructions for this workflow integration..."
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                                      />
                                    </div>

                                    {workflow?.name && (
                                      <div
                                        className={`p-3 rounded-lg ${currentTheme.searchBg} border ${currentTheme.border}`}
                                      >
                                        <div className="flex items-start gap-3">
                                          <div
                                            className={`p-2 rounded-lg ${currentTheme.activeBg}`}
                                          >
                                            {workflow?.name ===
                                              "WhatsApp Business" && (
                                              <MessageCircle className="w-4 h-4 text-green-600" />
                                            )}
                                            {workflow?.name === "Gmail" && (
                                              <Mail className="w-4 h-4 text-blue-600" />
                                            )}
                                            {workflow?.name ===
                                              "Google Calendar" && (
                                              <Calendar className="w-4 h-4 text-blue-600" />
                                            )}
                                            {workflow?.name === "Shopify" && (
                                              <ShoppingBag className="w-4 h-4 text-green-600" />
                                            )}
                                            {workflow?.name === "Slack" && (
                                              <Slack className="w-4 h-4 text-purple-600" />
                                            )}
                                            {![
                                              "WhatsApp Business",
                                              "Gmail",
                                              "Google Calendar",
                                              "Shopify",
                                              "Slack",
                                            ].includes(workflow?.name) && (
                                              <Settings2 className="w-4 h-4 text-gray-600" />
                                            )}
                                          </div>
                                          <div className="flex-1">
                                            <h6
                                              className={`text-sm font-medium ${currentTheme.text} mb-1`}
                                            >
                                              {workflow?.name} Integration
                                            </h6>
                                            <p
                                              className={`text-xs ${currentTheme.textSecondary}`}
                                            >
                                              {workflow?.instruction ||
                                                "No instructions provided"}
                                            </p>
                                            <div className="mt-2">
                                              <span
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}
                                              >
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
                              )
                            )
                          ) : (
                            <div
                              className={`text-center py-6 border-2 border-dashed ${currentTheme.border} rounded-lg`}
                            >
                              <FileText
                                className={`w-8 h-8 mx-auto mb-2 ${currentTheme.textSecondary} opacity-50`}
                              />
                              <p
                                className={`${currentTheme.textSecondary} text-sm font-medium mb-1`}
                              >
                                No workflow integrations configured
                              </p>
                              <p
                                className={`${currentTheme.textSecondary} text-xs mb-3 opacity-75`}
                              >
                                Add integrations like WhatsApp, Gmail, CRM
                                systems to enhance this AI employee
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  // Add first workflow
                                  setEditData((prev) => ({
                                    ...prev,
                                    ai_employees: (
                                      prev?.ai_employees || []
                                    ).map((emp, i) =>
                                      i === idx
                                        ? {
                                            ...emp,
                                            workflows: [
                                              {
                                                name: "",
                                                instruction: "",
                                              },
                                            ],
                                          }
                                        : emp
                                    ),
                                  }));
                                }}
                                className={`px-4 py-2 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-2 mx-auto`}
                              >
                                <Plus className="w-5 h-5" />
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
                            <BookOpen className="w-4 h-4 inline mr-1" />
                            Knowledge Sources
                          </label>
                        </div>

                        {/* Website URL Section */}
                        <div className="mb-4 p-4 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg}">
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                          >
                            <Globe className="w-4 h-4 inline mr-1" />
                            Website URL
                          </label>
                          <input
                            type="url"
                            value={ai?.knowledge_sources?.website_url || ""}
                            onChange={(e) => {
                              setEditData((prev) => ({
                                ...prev,
                                ai_employees: (prev?.ai_employees || []).map(
                                  (emp, i) =>
                                    i === idx
                                      ? {
                                          ...emp,
                                          knowledge_sources: {
                                            ...emp.knowledge_sources,
                                            website_url: e.target.value,
                                          },
                                        }
                                      : emp
                                ),
                              }));
                            }}
                            placeholder="https://example.com"
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                          />
                        </div>

                        {/* FAQs Text Section */}
                        <div className="mb-4 p-4 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg}">
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                          >
                            <HelpCircle className="w-4 h-4 inline mr-1" />
                            FAQs / Knowledge Text
                          </label>
                          <textarea
                            value={ai?.knowledge_sources?.faqs_text || ""}
                            onChange={(e) => {
                              setEditData((prev) => ({
                                ...prev,
                                ai_employees: (prev?.ai_employees || []).map(
                                  (emp, i) =>
                                    i === idx
                                      ? {
                                          ...emp,
                                          knowledge_sources: {
                                            ...emp.knowledge_sources,
                                            faqs_text: e.target.value,
                                          },
                                        }
                                      : emp
                                ),
                              }));
                            }}
                            rows={4}
                            placeholder="Enter frequently asked questions and answers, or any text-based knowledge..."
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                          />
                        </div>

                        {/* Uploaded Files Section */}
                        <div className="mb-4 p-4 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg}">
                          <label
                            className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                          >
                            <FileText className="w-4 h-4 inline mr-1" />
                            Uploaded Files (
                            {
                              (ai?.knowledge_sources?.uploaded_files || [])
                                .length
                            }
                            )
                          </label>

                          {(ai?.knowledge_sources?.uploaded_files || [])
                            .length > 0 ? (
                            <div className="space-y-2">
                              {(
                                ai?.knowledge_sources?.uploaded_files || []
                              ).map((file, fileIdx) => (
                                <div
                                  key={fileIdx}
                                  className={`flex items-center justify-between p-3 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText
                                      className={`w-5 h-5 ${currentTheme.textSecondary}`}
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-sm font-medium ${currentTheme.text} truncate`}
                                      >
                                        {file.original_name ||
                                          file.filename ||
                                          file.name ||
                                          "Unnamed File"}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        {file.file_size && (
                                          <span
                                            className={`text-xs ${currentTheme.textSecondary}`}
                                          >
                                            {(file.file_size / 1024).toFixed(1)}{" "}
                                            KB
                                          </span>
                                        )}
                                        {file.file_type && (
                                          <span
                                            className={`text-xs ${currentTheme.textSecondary} bg-gray-100 px-2 py-0.5 rounded`}
                                          >
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
                                      <Eye className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => handleDownloadFile(file)}
                                      className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.textSecondary} hover:text-green-600 transition-colors`}
                                      title="Download File"
                                    >
                                      <Download className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        // Remove file from uploaded_files array
                                        setEditData((prev) => ({
                                          ...prev,
                                          ai_employees: (
                                            prev?.ai_employees || []
                                          ).map((emp, i) =>
                                            i === idx
                                              ? {
                                                  ...emp,
                                                  knowledge_sources: {
                                                    ...emp.knowledge_sources,
                                                    uploaded_files: (
                                                      emp.knowledge_sources
                                                        ?.uploaded_files || []
                                                    ).filter(
                                                      (_, fIdx) =>
                                                        fIdx !== fileIdx
                                                    ),
                                                  },
                                                }
                                              : emp
                                          ),
                                        }));
                                      }}
                                      className={`p-2 rounded-lg ${currentTheme.hover} text-red-500 hover:bg-red-50 transition-colors`}
                                      title="Remove File"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div
                              className={`text-center py-6 border-2 border-dashed ${currentTheme.border} rounded-lg`}
                            >
                              <FileText
                                className={`w-8 h-8 mx-auto mb-2 ${currentTheme.textSecondary} opacity-50`}
                              />
                              <p
                                className={`${currentTheme.textSecondary} text-sm`}
                              >
                                No files uploaded yet
                              </p>
                              <p
                                className={`${currentTheme.textSecondary} text-xs mt-1 opacity-75`}
                              >
                                Files will appear here when uploaded during
                                onboarding
                              </p>
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
                                  const newFiles = files.map((file) => ({
                                    name: file.name,
                                    original_name: file.name,
                                    file_size: file.size,
                                    file_type: file.type,
                                    // Mark as pending upload and store the actual File object
                                    pending_upload: true,
                                    fileObject: file, // Store the File object for later upload
                                  }));

                                  setEditData((prev) => ({
                                    ...prev,
                                    ai_employees: (
                                      prev?.ai_employees || []
                                    ).map((emp, i) =>
                                      i === idx
                                        ? {
                                            ...emp,
                                            knowledge_sources: {
                                              ...emp.knowledge_sources,
                                              uploaded_files: [
                                                ...(emp.knowledge_sources
                                                  ?.uploaded_files || []),
                                                ...newFiles,
                                              ],
                                            },
                                          }
                                        : emp
                                    ),
                                  }));

                                  // Clear the input
                                  e.target.value = "";
                                }
                              }}
                              className={`w-full px-3 py-2 text-sm border-2 border-dashed ${currentTheme.border} rounded-lg ${currentTheme.cardBg} ${currentTheme.text} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
                            />
                            <p
                              className={`text-xs ${currentTheme.textSecondary} mt-2`}
                            >
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
                        <h4
                          className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}
                        >
                          <ListChecks className="w-4 h-4 text-green-600" />
                          Instructions & Guidelines
                          <span
                            className={`text-xs ${currentTheme.textSecondary} font-normal`}
                          >
                            Set behavior guidelines
                          </span>
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              Do's and Don'ts
                            </label>
                            <textarea
                              value={ai?.instructions?.dos_and_donts || ""}
                              onChange={(e) =>
                                updateAIEmployee(
                                  idx,
                                  "instructions.dos_and_donts",
                                  e.target.value
                                )
                              }
                              rows={4}
                              placeholder="Be professional, Don't share personal information..."
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
                              value={ai?.instructions?.fallback_contacts || ""}
                              onChange={(e) =>
                                updateAIEmployee(
                                  idx,
                                  "instructions.fallback_contacts",
                                  e.target.value
                                )
                              }
                              placeholder="atharkatheri@gmail.com"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Success Targets Section */}
                      <div className={`border-t ${currentTheme.border} pt-6`}>
                        <h4
                          className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}
                        >
                          <Target className="w-4 h-4 text-orange-600" />
                          Success Targets
                          <span
                            className={`text-xs ${currentTheme.textSecondary} font-normal`}
                          >
                            Define success metrics
                          </span>
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              What Success Looks Like
                            </label>
                            <textarea
                              value={ai?.success_targets?.description || ""}
                              onChange={(e) =>
                                updateAIEmployee(
                                  idx,
                                  "success_targets.description",
                                  e.target.value
                                )
                              }
                              rows={3}
                              placeholder="Lead qualification, booking appointments, FAQ deflection..."
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                            />
                          </div>
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              Success Metrics
                            </label>
                            <div className="space-y-2">
                              {(ai?.success_targets?.metrics || [""]).map(
                                (metric, metricIdx) => (
                                  <div key={metricIdx} className="flex gap-2">
                                    <input
                                      type="text"
                                      value={metric}
                                      onChange={(e) => {
                                        const newMetrics = [
                                          ...(ai?.success_targets?.metrics ||
                                            []),
                                        ];
                                        newMetrics[metricIdx] = e.target.value;
                                        updateAIEmployee(
                                          idx,
                                          "success_targets.metrics",
                                          newMetrics
                                        );
                                      }}
                                      placeholder="80% FAQ resolution rate"
                                      disabled={!isEditing}
                                      className={`flex-1 px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                                    />
                                    <button
                                      onClick={() => {
                                        const newMetrics = (
                                          ai?.success_targets?.metrics || []
                                        ).filter((_, i) => i !== metricIdx);
                                        updateAIEmployee(
                                          idx,
                                          "success_targets.metrics",
                                          newMetrics
                                        );
                                      }}
                                      className="px-2 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                )
                              )}
                              <button
                                onClick={() => {
                                  const newMetrics = [
                                    ...(ai?.success_targets?.metrics || []),
                                    "",
                                  ];
                                  updateAIEmployee(
                                    idx,
                                    "success_targets.metrics",
                                    newMetrics
                                  );
                                }}
                                className={`flex items-center gap-2 px-3 py-2 border-2 border-dashed ${currentTheme.border} rounded-lg ${currentTheme.text} hover:bg-opacity-50 transition-colors text-sm`}
                              >
                                <Plus className="w-5 h-5" />
                                Add Metric
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Deployment Configuration Section */}
                      <div className={`border-t ${currentTheme.border} pt-6`}>
                        <h4
                          className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}
                        >
                          <Rocket className="w-4 h-4 text-purple-600" />
                          Deployment Configuration
                          <span
                            className={`text-xs ${currentTheme.textSecondary} font-normal`}
                          >
                            Choose deployment options
                          </span>
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              Service Type
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <label
                                className={`flex items-center gap-3 p-3 border ${currentTheme.border} rounded-lg cursor-pointer transition-colors ${ai?.deployment?.service_type === "shivai" ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20" : ""}`}
                              >
                                <input
                                  type="radio"
                                  name={`service_type_${idx}`}
                                  checked={
                                    ai?.deployment_service?.service_type ===
                                    "shivai"
                                  }
                                  onChange={(e) =>
                                    updateAIEmployee(
                                      idx,
                                      "deployment_service.service_type",
                                      "shivai"
                                    )
                                  }
                                  disabled={!isEditing}
                                  className={`w-5 h-5 text-blue-500 ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                                />
                                <span className="text-sm">Shivai</span>
                              </label>
                              <label
                                className={`flex items-center gap-3 p-3 border ${currentTheme.border} rounded-lg cursor-pointer transition-colors ${ai?.deployment?.service_type === "self" ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20" : ""}`}
                              >
                                <input
                                  type="radio"
                                  name={`service_type_${idx}`}
                                  checked={
                                    ai?.deployment_service?.service_type ===
                                    "self"
                                  }
                                  onChange={(e) =>
                                    updateAIEmployee(
                                      idx,
                                      "deployment_service.service_type",
                                      "self"
                                    )
                                  }
                                  disabled={!isEditing}
                                  className={`w-5 h-5 text-blue-500 ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                                />
                                <span className="text-sm">Self-managed</span>
                              </label>
                            </div>
                          </div>
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              Channels
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {["Website", "Mobile App"].map((channel) => (
                                <label
                                  key={channel}
                                  className={`flex items-center gap-2 px-3 py-2 border ${currentTheme.border} rounded-full cursor-pointer text-sm transition-colors ${(ai?.deployment?.channels || []).includes(channel) ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20" : ""}`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={(
                                      ai?.deployment?.channels || []
                                    ).includes(channel)}
                                    onChange={(e) => {
                                      const channels =
                                        ai?.deployment?.channels || [];
                                      const newChannels = e.target.checked
                                        ? [...channels, channel]
                                        : channels.filter((c) => c !== channel);
                                      updateAIEmployee(
                                        idx,
                                        "deployment.channels",
                                        newChannels
                                      );
                                    }}
                                    disabled={!isEditing}
                                    className={`w-5 h-5 text-blue-500 ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                                  />
                                  {channel}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              Deployment Notes
                            </label>
                            <textarea
                              value={
                                ai?.deployment_targets?.deployment_notes || ""
                              }
                              onChange={(e) =>
                                updateAIEmployee(
                                  idx,
                                  "deployment_targets.deployment_notes",
                                  e.target.value
                                )
                              }
                              rows={3}
                              placeholder="Phase 1: Website implementation..."
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Consent & Privacy Options Section */}
                      <div className={`border-t ${currentTheme.border} pt-6`}>
                        <h4
                          className={`text-md font-semibold ${currentTheme.text} flex items-center gap-2 mb-4`}
                        >
                          <ShieldCheck className="w-4 h-4 text-gray-600" />
                          Consent & Privacy Options
                          <span
                            className={`text-xs ${currentTheme.textSecondary} font-normal`}
                          >
                            Privacy settings
                          </span>
                        </h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  ai?.consent_options?.recording_enabled ||
                                  false
                                }
                                onChange={(e) =>
                                  updateAIEmployee(
                                    idx,
                                    "consent_options.recording_enabled",
                                    e.target.checked
                                  )
                                }
                                disabled={!isEditing}
                                className={`w-5 h-5 text-blue-500 rounded ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                              />
                              <span className="text-sm">Recording Enabled</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  ai?.consent_options?.transcript_email_optin ||
                                  false
                                }
                                onChange={(e) =>
                                  updateAIEmployee(
                                    idx,
                                    "consent_options.transcript_email_optin",
                                    e.target.checked
                                  )
                                }
                                disabled={!isEditing}
                                className={`w-5 h-5 text-blue-500 rounded ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                              />
                              <span className="text-sm">
                                Transcript Email Opt-in
                              </span>
                            </label>
                          </div>
                          <div>
                            <label
                              className={`text-xs ${currentTheme.textSecondary} uppercase block mb-2`}
                            >
                              Privacy Notes
                            </label>
                            <input
                              type="text"
                              value={ai?.consent_options?.privacy_notes || ""}
                              onChange={(e) =>
                                updateAIEmployee(
                                  idx,
                                  "consent_options.privacy_notes",
                                  e.target.value
                                )
                              }
                              placeholder="Privacy enabled"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!isEditing ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed" : `${currentTheme.cardBg} ${currentTheme.text}`}`}
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
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 md:p-6 shadow-lg min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0`}
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
              >
                <Users className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-blue-500">
                Total
              </span>
            </div>
            <h3
              className={`text-2xl md:text-3xl font-semibold ${currentTheme.text} mb-1 md:mb-2`}
            >
              {paginationMeta?.total || totalItems || getCount("all")}
            </h3>
            <p
              className={`text-xs md:text-sm font-medium ${currentTheme.text}`}
            >
              All Clients
            </p>
            {paginationMeta && (
              <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
                Page {paginationMeta.page || currentPage} of{" "}
                {paginationMeta.totalPages || totalPages}
              </p>
            )}
          </div>

          {/* Pending Clients Card */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 md:p-6 shadow-lg min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0`}
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
              >
                <Clock className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-yellow-500">
                Pending
              </span>
            </div>
            <h3
              className={`text-2xl md:text-3xl font-semibold ${currentTheme.text} mb-1 md:mb-2`}
            >
              {getCount("pending")}
            </h3>
            <p
              className={`text-xs md:text-sm font-medium ${currentTheme.text}`}
            >
              Awaiting Review
            </p>
          </div>

          {/* Active Clients Card */}
          <div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 md:p-6 shadow-lg min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0`}
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
              >
                <Check className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-green-500">
                Active
              </span>
            </div>
            <h3
              className={`text-2xl md:text-3xl font-semibold ${currentTheme.text} mb-1 md:mb-2`}
            >
              {getCount("approved")}
            </h3>
            <p
              className={`text-xs md:text-sm font-medium ${currentTheme.text}`}
            >
              Approved Clients
            </p>
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
              <Users className="w-5 h-5" />
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
              <RefreshCw className="w-5 h-5" />
            </button>

            <div className="relative flex-1 sm:flex-none">
              <Search
                className={`absolute left-[92%] lg:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
              />
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
              all: { icon: ListChecks, label: "All" },
              newlySignup: { icon: UserPlus, label: "Newly Signup" },
              pending: { icon: Clock, label: "Pending" },
              onboarded: { icon: Check, label: "Onboarded" },
              approved: { icon: CheckCheck, label: "Approved" },
              rejected: { icon: X, label: "Rejected" },
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
              <User
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
                      <Building2 className={`w-5 h-5 ${currentTheme.text}`} />
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
                      <Eye className="w-5 h-5" />
                    </button>
                    {/* Analytics button - only shown for onboarded clients */}
                    {(client?.userData?.isOnboarded || client?.isOnboarded) && (
                      <button
                        onClick={() => {
                          const clientId =
                            client?.id ||
                            client?._id ||
                            client?.userData?.id ||
                            client?.userData?._id;
                          navigate(
                            `/dashboard/clients/${clientId}?tab=employees`,
                            {
                              state: { client },
                            }
                          );
                        }}
                        className={`p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 transition-all duration-200`}
                        title="View AI Employee Analytics"
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEditClient(client?.userData)}
                      className={`p-2 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} hover:scale-105 transition-all duration-200`}
                      title="Edit Client"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client?.userData)}
                      className={`p-2 flex items-center justify-center text-red-500 rounded-lg hover:bg-red-50 hover:scale-105 transition-all duration-200`}
                      title="Delete Client"
                    >
                      <Trash2 className="w-5 h-5" />
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
