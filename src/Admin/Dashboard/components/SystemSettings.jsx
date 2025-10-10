import React, { useState } from "react";
import {
  RiSettingsLine,
  RiShieldLine,
  RiNotificationLine,
  RiPaletteLine,
  RiGlobalLine,
  RiSaveLine,
  RiRefreshLine,
} from "react-icons/ri";
import {
  Settings,
  Shield,
  Bell,
  Bot,
  Globe,
  Palette,
  User,
  Lock,
  Database,
  Key,
  Mail,
  Smartphone,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const SystemSettings = () => {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "ShivAI Technologies",
    companyEmail: "admin@shivai.com",
    timezone: "UTC-5 (Eastern Time)",
    language: "English",
    dateFormat: "MM/DD/YYYY",
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: "strong",
    auditLogging: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    
    // AI Configuration
    aiModelVersion: "v4.2.1",
    maxEmployeesPerClient: 50,
    autoScaling: true,
    
    // Integration Settings
    apiRateLimit: 1000,
    webhookRetries: 3,
    ssoEnabled: false,
  });

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "ai", label: "AI Config", icon: Bot },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // Add actual save logic here
  };

  const handleReset = () => {
    // Reset to default settings
    console.log("Settings reset");
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Company Name
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Company Email
          </label>
          <input
            type="email"
            value={settings.companyEmail}
            onChange={(e) => handleInputChange("companyEmail", e.target.value)}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Timezone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleInputChange("timezone", e.target.value)}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
            <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
            <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
            <option value="UTC+1 (CET)">UTC+1 (CET)</option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-4 border ${currentTheme.border} rounded-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              <div>
                <h3 className={`font-medium ${currentTheme.text}`}>Two-Factor Authentication</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <button
              onClick={() => handleInputChange("twoFactorAuth", !settings.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Password Policy
          </label>
          <select
            value={settings.passwordPolicy}
            onChange={(e) => handleInputChange("passwordPolicy", e.target.value)}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="basic">Basic</option>
            <option value="medium">Medium</option>
            <option value="strong">Strong</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div className={`p-4 border ${currentTheme.border} rounded-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              <div>
                <h3 className={`font-medium ${currentTheme.text}`}>Audit Logging</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Track all administrative actions
                </p>
              </div>
            </div>
            <button
              onClick={() => handleInputChange("auditLogging", !settings.auditLogging)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.auditLogging ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.auditLogging ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: "emailNotifications", title: "Email Notifications", desc: "Receive updates via email", icon: Mail },
          { key: "pushNotifications", title: "Push Notifications", desc: "Browser push notifications", icon: Bell },
          { key: "smsNotifications", title: "SMS Notifications", desc: "Critical alerts via SMS", icon: Smartphone },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className={`p-4 border ${currentTheme.border} rounded-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                  <div>
                    <h3 className={`font-medium ${currentTheme.text}`}>{item.title}</h3>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>{item.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleInputChange(item.key, !settings[item.key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[item.key] ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[item.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAISettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            AI Model Version
          </label>
          <select
            value={settings.aiModelVersion}
            onChange={(e) => handleInputChange("aiModelVersion", e.target.value)}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="v4.2.1">v4.2.1 (Latest)</option>
            <option value="v4.1.8">v4.1.8 (Stable)</option>
            <option value="v4.0.5">v4.0.5 (Legacy)</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Max AI Employees per Client
          </label>
          <input
            type="number"
            value={settings.maxEmployeesPerClient}
            onChange={(e) => handleInputChange("maxEmployeesPerClient", parseInt(e.target.value))}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>

        <div className={`p-4 border ${currentTheme.border} rounded-lg col-span-1 md:col-span-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              <div>
                <h3 className={`font-medium ${currentTheme.text}`}>Auto Scaling</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Automatically scale AI resources based on demand
                </p>
              </div>
            </div>
            <button
              onClick={() => handleInputChange("autoScaling", !settings.autoScaling)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoScaling ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoScaling ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            API Rate Limit (requests/hour)
          </label>
          <input
            type="number"
            value={settings.apiRateLimit}
            onChange={(e) => handleInputChange("apiRateLimit", parseInt(e.target.value))}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
            Webhook Retry Attempts
          </label>
          <input
            type="number"
            value={settings.webhookRetries}
            onChange={(e) => handleInputChange("webhookRetries", parseInt(e.target.value))}
            className={`w-full px-3 py-2 border ${currentTheme.border} rounded-lg ${currentTheme.searchBg} ${currentTheme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>

        <div className={`p-4 border ${currentTheme.border} rounded-lg col-span-1 md:col-span-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              <div>
                <h3 className={`font-medium ${currentTheme.text}`}>Single Sign-On (SSO)</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Enable SSO integration for user authentication
                </p>
              </div>
            </div>
            <button
              onClick={() => handleInputChange("ssoEnabled", !settings.ssoEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ssoEnabled ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.ssoEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-4 border ${currentTheme.border} rounded-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              <div>
                <h3 className={`font-medium ${currentTheme.text}`}>Dark Mode</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === "dark" ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className={`p-4 border ${currentTheme.border} rounded-lg`}>
          <div>
            <h3 className={`font-medium ${currentTheme.text} mb-2`}>Current Theme</h3>
            <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>
              Currently using {theme === "dark" ? "Dark" : "Light"} theme
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "notifications":
        return renderNotificationSettings();
      case "ai":
        return renderAISettings();
      case "integrations":
        return renderIntegrationSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 pt-12 lg:pt-0">
      {/* Settings Header */}
      <div
        className={`${
          currentTheme.cardBg
        } backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6 ${
          theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2
            className={`text-xl font-bold ${currentTheme.text} flex items-center gap-3`}
          >
            <RiSettingsLine className="w-6 h-6 text-gray-500" />
            System Settings
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50"
            >
              <RiRefreshLine className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <RiSaveLine className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${currentTheme.activeBg} ${currentTheme.text} shadow-lg`
                    : `${currentTheme.hover} ${currentTheme.textSecondary} hover:${currentTheme.text}`
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div
        className={`${
          currentTheme.cardBg
        } backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6 ${
          theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
        }`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SystemSettings;