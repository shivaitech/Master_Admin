import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Building2, 
  CreditCard, 
  Rocket, 
  Bot 
} from "lucide-react";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import { templateOptions } from "./constants";

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
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingData();
  }, [client]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-2 text-sm ${currentTheme.textSecondary}`}>
            Loading onboarding data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <FileText
          className={`w-5 h-5 mx-auto mb-3 ${currentTheme.textSecondary} opacity-50`}
        />
        <p className={`${currentTheme.textSecondary} font-medium mb-2`}>
          Error loading onboarding data
        </p>
        <p className={`${currentTheme.textSecondary} text-sm opacity-75`}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
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
                        (industry, index) => (
                          <span
                            key={index}
                            className={`border ${currentTheme.border} px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium capitalize ${currentTheme.text}`}
                          >
                            {industry.replace("_", " ")}
                          </span>
                        )
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
                            className={`border ${currentTheme.border} px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium capitalize ${currentTheme.text}`}
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
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg border ${currentTheme.border} flex items-center justify-center`}
                        >
                          <Bot
                            className={`w-5 h-5 ${currentTheme.textSecondary}`}
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
                                  className={`border ${currentTheme.border} px-2 py-1 rounded-md text-xs font-medium ${currentTheme.text}`}
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

export default OnboardingDataTab;