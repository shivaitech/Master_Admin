import React, { useState, useEffect } from "react";
import { Bot, Eye, ChevronRight } from "lucide-react";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import { languageOptions } from "./constants";

const AIEmployeesTab = ({ client, currentTheme, onViewAgent,clientId }) => {
  const [aiEmployees, setAiEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch AI agents data every time this tab is rendered
  useEffect(() => {
    const fetchAIEmployees = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await shivaiApiService.getAgentsById(clientId);
        console.log("✅ AI employees fetched:", response);

        // Handle different response structures
        let employeesData = [];
        if (response?.success && response?.data) {
          employeesData = response.data;
        } else if (Array.isArray(response)) {
          employeesData = response;
        } else if (response?.agents) {
          employeesData = response.agents;
        } else {
          // Fallback to client data
          employeesData =
            client?.ai_employees || client?.userData?.ai_employees || [];
        }

        // Ensure we have an array
        if (!Array.isArray(employeesData)) {
          employeesData = [];
        }

        console.log("📋 Processed AI employees data:", employeesData);
        setAiEmployees(employeesData);
      } catch (err) {
        console.error("❌ Error fetching AI employees:", err);
        setError(err.message || "Failed to load AI employees");

        // Fallback to client data on error
        const fallbackData =
          client?.ai_employees || client?.userData?.ai_employees || [];
        if (Array.isArray(fallbackData) && fallbackData.length > 0) {
          console.log("📋 Using fallback AI employees data");
          setAiEmployees(fallbackData);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAIEmployees();
  }, [client]);

  // Helper function to get language display from greeting message
  const getLanguageDisplay = (greeting) => {
    if (!greeting || typeof greeting !== "object") return "English";

    // Get the first language key that's not English
    const languages = Object.keys(greeting);
    if (languages.length === 1 && languages[0] === "en") return "English";
    if (languages.length > 1) return "Multilingual";

    // Find language from our options
    const langKey = languages[0];
    const langOption = languageOptions.find((opt) => opt.value === langKey);
    return langOption ? langOption.label : "English";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600 mx-auto"></div>
          <p className={`mt-3 text-sm ${currentTheme.textSecondary}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className={`${currentTheme.textSecondary} text-sm`}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-gray-500" />
          <span className={`text-sm font-medium ${currentTheme.text}`}>
            AI Employees ({aiEmployees.length})
          </span>
        </div>
      </div>

      {aiEmployees.length === 0 ? (
        <div className="text-center py-12">
          <Bot className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p className={`text-sm ${currentTheme.textSecondary}`}>
            No AI employees configured
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {aiEmployees.map((employee, index) => (
            <div
              key={employee._id || employee.id || index}
              className={`border ${currentTheme.border} rounded-lg p-4 hover:border-gray-300 transition-colors`}
            >
              {/* Employee Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium ${currentTheme.text}`}>
                      {employee.name ||
                        employee.agent_name ||
                        `AI Employee #${index + 1}`}
                    </h4>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      {employee.template || employee.type || "sales-business-development"}
                    </p>
                  </div>
                </div>
                
                {onViewAgent && (
                  <button
                    onClick={() => onViewAgent(employee)}
                    className={`flex items-center gap-1 text-xs ${currentTheme.textSecondary} hover:text-gray-700 transition-colors`}
                  >
                    <span>View</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Employee Details - Clean Table Style */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
                <div>
                  <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-0.5`}>
                    Template
                  </p>
                  <p className={`text-sm ${currentTheme.text}`}>
                    {employee.template || "Sales"}
                  </p>
                </div>
                <div>
                  <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-0.5`}>
                    Language
                  </p>
                  <p className={`text-sm ${currentTheme.text}`}>
                    {getLanguageDisplay(employee.greeting_message)}
                  </p>
                </div>
                <div>
                  <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-0.5`}>
                    Personality
                  </p>
                  <p className={`text-sm ${currentTheme.text} capitalize`}>
                    {employee.personality || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-0.5`}>
                    Voice
                  </p>
                  <p className={`text-sm ${currentTheme.text} capitalize`}>
                    {employee.voice || "—"}
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

export default AIEmployeesTab;
