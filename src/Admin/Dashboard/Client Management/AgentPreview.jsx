import React, { useEffect, useRef } from "react";

const AgentPreview = ({ agent, onBack, currentTheme, onClose }) => {
  // Default theme fallback
  const defaultTheme = {
    cardBg: "bg-white dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
    text: "text-gray-900 dark:text-white",
    textSecondary: "text-gray-600 dark:text-gray-400",
    searchBg: "bg-gray-50 dark:bg-gray-900",
  };

  const theme = currentTheme || defaultTheme;

  // Log agent data to debug
  console.log("Agent/Client data:", agent);
  console.log("Agent ID fields from client:", {
    client_id: agent?.id || agent?._id,
    userData_id: agent?.userData?.id || agent?.userData?._id,
    agent_id_from_client: agent?.agent_id || agent?.agentId,
    userData_agent_id: agent?.userData?.agent_id || agent?.userData?.agentId,
    direct_fields: {
      id: agent?.id,
      _id: agent?._id,
      agent_id: agent?.agent_id,
      agentId: agent?.agentId,
    },
  });

  // Extract agent ID from client data structure
  const extractedAgentId =
    agent?.id ||
    agent?._id ||
    agent?.userData?.id ||
    agent?.userData?._id ||
    agent?.agent_id ||
    agent?.agentId ||
    agent?.userData?.agent_id ||
    agent?.userData?.agentId;
  console.log("Extracted Agent ID:", extractedAgentId);

  // Extract agent name from client data structure
  const extractedAgentName =
    agent?.name ||
    agent?.agent_name ||
    agent?.userData?.name ||
    agent?.userData?.agent_name ||
    agent?.company_name ||
    agent?.companyName ||
    "AI Assistant";
  console.log("Extracted Agent Name:", extractedAgentName);

  // Extract available languages from agent data
  const getLanguageDisplay = () => {
    const languages = new Set();

    // Check greeting_messages for language support
    if (
      agent?.greeting_messages &&
      typeof agent.greeting_messages === "object"
    ) {
      Object.keys(agent.greeting_messages).forEach((lang) => {
        if (
          lang !== "multilingual" &&
          agent.greeting_messages[lang] &&
          agent.greeting_messages[lang].trim() !== ""
        ) {
          languages.add(lang);
        }
      });
    }

    // Also check userData.greeting_messages
    if (
      agent?.userData?.greeting_messages &&
      typeof agent.userData.greeting_messages === "object"
    ) {
      Object.keys(agent.userData.greeting_messages).forEach((lang) => {
        if (
          lang !== "multilingual" &&
          agent.userData.greeting_messages[lang] &&
          agent.userData.greeting_messages[lang].trim() !== ""
        ) {
          languages.add(lang);
        }
      });
    }

    // Check if agent has multiple language codes directly
    const langFields = [
      agent?.language,
      agent?.preferred_language,
      agent?.userData?.language,
      agent?.userData?.preferred_language,
    ].filter(Boolean);

    langFields.forEach((lang) => languages.add(lang));

    // Check for languages arrays
    if (agent?.languages && Array.isArray(agent.languages)) {
      agent.languages.forEach((lang) => {
        if (lang) languages.add(lang);
      });
    }
    if (agent?.userData?.languages && Array.isArray(agent.userData.languages)) {
      agent.userData.languages.forEach((lang) => {
        if (lang) languages.add(lang);
      });
    }

    // Convert Set to Array and filter out empty values
    const validLanguages = Array.from(languages).filter(
      (lang) => lang && lang.trim() !== ""
    );

    if (validLanguages.length > 1) {
      return "Multi lingual";
    } else if (validLanguages.length === 1) {
      return validLanguages[0].toUpperCase();
    } else {
      return "EN"; // default
    }
  };

  // Simplified widget configuration using agent data
  const widgetConfig = {
    agentId: extractedAgentId || "NO_AGENT_ID_FOUND",
    agentName: extractedAgentName,
    language: getLanguageDisplay(),
    primaryColor:
      agent?.widget?.primary_color ||
      agent?.userData?.primary_color ||
      "#4b5563",
    secondaryColor:
      agent?.widget?.secondary_color ||
      agent?.userData?.secondary_color ||
      "#6b7280",
    accentColor:
      agent?.widget?.accent_color || agent?.userData?.accent_color || "#374151",
    position: "bottom-right",
    chatWidth: "380px",
    chatHeight: "520px",
    autoOpen: false,
    voiceEnabled: agent?.voice,
    companyName: agent?.widget?.company_name || extractedAgentName,
    companyDescription:
      agent?.description ||
      agent?.company_description ||
      agent?.userData?.description ||
      agent?.userData?.company_description ||
      "AI-Powered Support - We offer 24/7 voice support to handle your business calls efficiently and professionally.",
    allowedDomains: agent?.allowed_domains ||
      agent?.userData?.allowed_domains || ["*"],
  };

  const iframeRef = useRef(null);

  // Generate widget script URL
  const generateWidgetUrl = () => {
    const baseUrl = "https://callshivai.com/widget2.js";
    const params = new URLSearchParams({
      agentId: widgetConfig.agentId,
      language: widgetConfig.language,
      primaryColor: widgetConfig.primaryColor,
      secondaryColor: widgetConfig.secondaryColor,
      accentColor: widgetConfig.accentColor,
      position: widgetConfig.position,
      chatWidth: widgetConfig.chatWidth,
      chatHeight: widgetConfig.chatHeight,
      autoOpen: widgetConfig.autoOpen.toString(),
      voiceEnabled: widgetConfig.voiceEnabled.toString(),
      companyName: widgetConfig.companyName,
      companyDescription: widgetConfig.companyDescription,
      allowedDomains: widgetConfig.allowedDomains.join(","),
      v: Date.now().toString(),
    });

    return `${baseUrl}?${params.toString()}`;
  };
  console.log("Generated Widget URL:", widgetConfig, agent);

  // Generate preview HTML content
  const generatePreviewHTML = () => {
    const widgetUrl = generateWidgetUrl();
    const languageDisplay = getLanguageDisplay(); // Call the function here
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Preview</title>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            color: #334155;
            overflow: hidden;
        }
        * {
            box-sizing: border-box;
        }
        .dashboard {
            height: calc(100vh - 32px);
            display: grid;
            grid-template-rows: auto 1fr;
            gap: 12px;
        }
        .header {
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            text-align: center;
        }
        .agent-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4px;
        }
        .agent-id {
            font-size: 0.75rem;
            color: #64748b;
            font-family: 'Monaco', 'Menlo', monospace;
            background: #f1f5f9;
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
        }
        .content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
            height: 100%;
        }
        .card {
            background: white;
            border-radius: 6px;
            padding: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            overflow: auto;
        }
        .card-title {
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 8px;
            margin-top: 12px;
        }
        .info-item {
            background: #f8fafc;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
            text-align: left;
        }
        .info-label {
            font-size: 0.65rem;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 4px;
        }
        .info-value {
            font-size: 0.8rem;
            color: #1e293b;
            font-weight: 500;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 500;
        }
        .status-active {
            background: #dcfce7;
            color: #166534;
        }
        .status-inactive {
            background: #fee2e2;
            color: #991b1b;
        }
        .color-preview {
            width: 14px;
            height: 14px;
            border-radius: 2px;
            display: inline-block;
            margin-left: 6px;
            border: 1px solid #e2e8f0;
            vertical-align: middle;
        }
        .description {
            font-size: 0.85rem;
            line-height: 1.4;
            color: #475569;
            background: #f1f5f9;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 12px;
        }
        .message-box {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            padding: 12px;
        }
        .message-text {
            font-size: 0.85rem;
            color: #1e40af;
            line-height: 1.4;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
            .info-grid {
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 6px;
            }
            .info-item {
                padding: 6px;
            }
            .card {
                padding: 0px 8px;
                border: none;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
      
        
        <div class="content">
            <div class="card">
                ${widgetConfig.agentName ? `<div class="description">${widgetConfig.agentName}</div>` : ""}
                ${widgetConfig.companyDescription ? `<div class="description">${widgetConfig.companyDescription}</div>` : ""}
                
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Status</div>
                        <div class="info-value">
                            <span class="status-badge ${agent?.is_active !== false ? "status-active" : "status-inactive"}">
                                ${agent?.is_active !== false ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Language</div>
                        <div class="info-value">${languageDisplay}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Voice</div>
                        <div class="info-value">${widgetConfig.voiceEnabled ? "Enabled" : "Disabled"}</div>
                    </div>
                   
                    <div class="info-item">
                        <div class="info-label">Position</div>
                        <div class="info-value">${widgetConfig.position}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Dimensions</div>
                        <div class="info-value">${widgetConfig.chatWidth} × ${widgetConfig.chatHeight}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Primary Color</div>
                        <div class="info-value">
                            ${widgetConfig.primaryColor}
                            <span class="color-preview" style="background-color: ${widgetConfig.primaryColor}"></span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 16px;">
                    <h3 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; color: #1e293b;">Allowed Domains</h3>
                    <div class="message-box">
                        <div class="message-text">
                            ${
                              agent?.allowed_domains &&
                              agent.allowed_domains.length > 0
                                ? agent.allowed_domains.join(", ")
                                : agent?.userData?.allowed_domains &&
                                    agent.userData.allowed_domains.length > 0
                                  ? agent.userData.allowed_domains.join(", ")
                                  : "All domains allowed (*)"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="${widgetUrl}"></script>
</body>
</html>`;
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      const html = generatePreviewHTML();
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;

      iframeRef.current.onload = () => {
        URL.revokeObjectURL(url);
      };
    }
  };

  useEffect(() => {
    refreshPreview();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Configuration</h3>
        <button
          onClick={refreshPreview}
          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          title="Reload Widget Script"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          Load
        </button>
      </div>
      <div className="flex items-start justify-center flex-1 p-3">
        <iframe
          ref={iframeRef}
          className="w-full h-[60vh] lg:h-[60vh] border-0 overflow-auto"
          title="Widget Preview"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};

export default AgentPreview;
