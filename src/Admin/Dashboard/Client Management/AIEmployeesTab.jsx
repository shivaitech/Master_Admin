import React, { useState, useEffect } from "react";
import { Bot, Eye } from "lucide-react";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import { languageOptions } from "./constants";

const AIEmployeesTab = ({ client, currentTheme, onViewAgent }) => {
  const [aiEmployees, setAiEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch AI agents data every time this tab is rendered
  useEffect(() => {
    const fetchAIEmployees = async () => {
      try {
        setLoading(true);
        setError(null);

        const clientId =
          client?._id ||
          client?.id ||
          client?.userData?._id ||
          client?.userData?.id;

        if (!clientId) {
          console.error("❌ No client ID found");
          setError("No client ID available");
          return;
        }

        console.log("🔍 Fetching AI employees for client:", clientId);

        // Try to fetch agents using the API
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
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-2 text-sm ${currentTheme.textSecondary}`}>
            Loading AI employees...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`text-center py-12 rounded-xl ${currentTheme.cardBg} border ${currentTheme.border}`}
      >
        <Bot
          className={`w-12 h-12 mx-auto mb-3 ${currentTheme.textSecondary} opacity-50`}
        />
        <h4 className={`text-lg font-medium ${currentTheme.text} mb-2`}>
          Error Loading AI Employees
        </h4>
        <p className={`${currentTheme.textSecondary} text-sm`}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {aiEmployees.length === 0 ? (
        <div
          className={`text-center py-12 rounded-xl ${currentTheme.cardBg} border ${currentTheme.border}`}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
            <Bot className={`w-8 h-8 ${currentTheme.textSecondary}`} />
          </div>
          <h4 className={`text-lg font-medium ${currentTheme.text} mb-2`}>
            No AI Employees
          </h4>
          <p className={`${currentTheme.textSecondary} text-sm`}>
            This client hasn't created any AI employees yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {aiEmployees.map((employee, index) => (
            <div
              key={employee._id || employee.id || index}
              className={`${currentTheme.cardBg} rounded-xl border ${currentTheme.border} p-4 hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`font-medium ${currentTheme.text} truncate`}>
                      {employee.name ||
                        employee.agent_name ||
                        `AI Employee #${index + 1}`}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className={`text-xs ${currentTheme.textSecondary}`}>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                {onViewAgent && (
                  <button
                    onClick={() => onViewAgent(employee)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="View Agent Details"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Language
                  </label>
                  <p className={`${currentTheme.text} text-sm font-medium`}>
                    {getLanguageDisplay(employee.greeting_message)}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Personality
                  </label>
                  <p
                    className={`${currentTheme.text} text-sm font-medium capitalize`}
                  >
                    {employee.personality || "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Voice
                  </label>
                  <p
                    className={`${currentTheme.text} text-sm font-medium capitalize`}
                  >
                    {employee.voice || "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-xs ${currentTheme.textSecondary} uppercase block mb-1`}
                  >
                    Gender
                  </label>
                  <p
                    className={`${currentTheme.text} text-sm font-medium capitalize`}
                  >
                    {employee.gender || "N/A"}
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
