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

  // Simplified widget configuration using agent data
  const widgetConfig = {
    agentId: extractedAgentId || "NO_AGENT_ID_FOUND",
    agentName: extractedAgentName,
    language:
      agent?.preferred_language ||
      agent?.language ||
      agent?.userData?.preferred_language ||
      agent?.userData?.language ||
      "en",
    primaryColor:
      agent?.primary_color || agent?.userData?.primary_color || "#4b5563",
    secondaryColor:
      agent?.secondary_color || agent?.userData?.secondary_color || "#6b7280",
    accentColor:
      agent?.accent_color || agent?.userData?.accent_color || "#374151",
    position: "bottom-right",
    chatWidth: "380px",
    chatHeight: "520px",
    autoOpen: false,
    voiceEnabled: agent?.voice_enabled !== false,
    companyName:
      agent?.company_name ||
      agent?.companyName ||
      agent?.userData?.company_name ||
      agent?.userData?.companyName ||
      extractedAgentName ||
      "Your Company",
    companyDescription:
      agent?.description ||
      agent?.company_description ||
      agent?.userData?.description ||
      agent?.userData?.company_description ||
      "AI-Powered Support - We offer 24/7 voice support to handle your business calls efficiently and professionally.",
    welcomeMessage:
      agent?.welcome_message ||
      agent?.welcomeMessage ||
      agent?.userData?.welcome_message ||
      agent?.userData?.welcomeMessage ||
      `Hi! I'm ${extractedAgentName}. How can I help you today?`,
  };

  const iframeRef = useRef(null);

  // Generate widget script URL
  const generateWidgetUrl = () => {
    const baseUrl = "https://callshivai.com/widget2.js";
    const params = new URLSearchParams({
      agentId: widgetConfig.agentId,
      agentName: widgetConfig.agentName,
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
      welcomeMessage: widgetConfig.welcomeMessage,
      v: Date.now().toString(),
    });

    return `${baseUrl}?${params.toString()}`;
  };

  // Generate preview HTML content
  const generatePreviewHTML = () => {
    const widgetUrl = generateWidgetUrl();
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
            padding: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: #f8fafc;
            height: 100vh;
            color: #334155;
            overflow: hidden;
            box-sizing: border-box;
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
            padding: 16px;
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
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            height: 100%;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 16px;
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
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .info-item {
            background: #f8fafc;
            padding: 8px;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
        }
        .info-label {
            font-size: 0.7rem;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 2px;
        }
        .info-value {
            font-size: 0.85rem;
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
            .content {
                grid-template-columns: 1fr;
                grid-template-rows: auto auto;
            }
            .info-grid {
                grid-template-columns: 1fr;
                gap: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
      
        
        <div class="content">
            <div class="card">
                <h2 class="card-title">Configurations</h2>
                ${widgetConfig.agentName ? `<div class="description">${widgetConfig.agentName}</div>` : ""}
                ${widgetConfig.companyDescription ? `<div class="description">${widgetConfig.companyDescription}</div>` : ""}
                
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Status</div>
                        <div class="info-value">
                            <span class="status-badge ${agent?.is_active !== false ? "status-active" : "status-inactive"}">
                                ${agent?.is_active !== false ? "🟢 Active" : "🔴 Inactive"}
                            </span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Language</div>
                        <div class="info-value">${widgetConfig.language.toUpperCase()}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Voice</div>
                        <div class="info-value">${widgetConfig.voiceEnabled ? "🎙️ Enabled" : "🔇 Disabled"}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Auto Open</div>
                        <div class="info-value">${widgetConfig.autoOpen ? "✅ Yes" : "❌ No"}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Position</div>
                        <div class="info-value">${widgetConfig.position}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Size</div>
                        <div class="info-value">${widgetConfig.chatWidth} × ${widgetConfig.chatHeight}</div>
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
      <div className="flex-1 flex items-start justify-center ">
        <iframe
          ref={iframeRef}
          className="w-full h-[74vh] lg:h-[60vh] border-0 rounded-lg shadow-lg overflow-auto"
          title="Widget Preview"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};

export default AgentPreview;
