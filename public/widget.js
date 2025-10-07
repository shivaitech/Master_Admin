/**
 * ShivAI Widget Loader Script
 * Embeddable widget for client websites
 * This script loads and mounts the React widget component
 */

(function () {
  "use strict";

  // Prevent multiple widget instances
  if (window.ShivAIWidget) {
    return;
  }

  // Default configuration
  const DEFAULT_CONFIG = {
    clientId: "",
    apiEndpoint: "https://api.shivai.com",
    theme: {
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      accentColor: "#3b82f6",
      borderRadius: "16px",
      fontFamily: "Inter, sans-serif",
      shadowIntensity: "medium",
    },
    features: {
      chatEnabled: true,
      voiceEnabled: true,
      showPrivacyPolicy: true,
      showBranding: true,
      autoGreeting: true,
      soundEffects: true,
      autoOpen: false,
    },
    ui: {
      position: "bottom-right",
      buttonSize: "medium",
      animationSpeed: "normal",
      chatHeight: "450px",
      chatWidth: "380px",
      animationType: "slide",
    },
    content: {
      welcomeMessage:
        "ShivAI offers 24/7 voice support to handle your business calls efficiently and professionally.",
      placeholderText: "Type your message...",
      voiceGreeting: "Hello! I'm your AI assistant. How can I help?",
      privacyPolicyUrl: "https://shivai.com/privacy",
      companyName: "ShivAI",
      subtitle: "AI-Powered Support",
    },
  };

  // Utility functions
  function mergeDeep(target, source) {
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (!target[key]) target[key] = {};
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "style" && typeof value === "object") {
        Object.assign(element.style, value);
      } else if (key.startsWith("data-") || key === "id" || key === "class") {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });

    return element;
  }

  function createIcon(name, size = 16) {
    const icons = {
      "message-circle": `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
      phone: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      mic: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
      send: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>`,
      x: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      minimize: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`,
      "volume-2": `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
      "volume-x": `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`,
      user: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      bot: `<img src="/assets/newImages/chatb.png" alt="img" style="width:${size}px;height:${size}px;border-radius:4px;" />`,
    };

    const iconSvg = icons[name] || icons["message-circle"];
    const div = document.createElement("div");
    div.innerHTML = iconSvg;
    return div.firstElementChild;
  }

  // API client
  class ShivAIAPI {
    constructor(config) {
      this.config = config;
      this.baseURL = config.apiEndpoint;
      this.clientId = config.clientId;
    }

    async sendMessage(message, conversationId = null) {
      try {
        const response = await fetch(`${this.baseURL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Client-ID": this.clientId,
          },
          body: JSON.stringify({
            message,
            conversationId,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return (
          data.response || "Sorry, I couldn't process your request right now."
        );
      } catch (error) {
        console.error("ShivAI API Error:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
      }
    }

    async processVoice(transcript, conversationId = null) {
      try {
        const response = await fetch(`${this.baseURL}/voice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Client-ID": this.clientId,
          },
          body: JSON.stringify({
            transcript,
            conversationId,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Voice API request failed: ${response.status}`);
        }

        const data = await response.json();
        return (
          data.response ||
          "Sorry, I couldn't process your voice message right now."
        );
      } catch (error) {
        console.error("ShivAI Voice API Error:", error);
        return "Sorry, I'm having trouble with voice processing right now. Please try typing your message.";
      }
    }

    async startCall(conversationId = null) {
      try {
        const response = await fetch(`${this.baseURL}/call/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Client-ID": this.clientId,
          },
          body: JSON.stringify({
            conversationId,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Start call API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("ShivAI Start Call API Error:", error);
        throw error;
      }
    }

    async endCall(conversationId = null, callDuration = 0) {
      try {
        const response = await fetch(`${this.baseURL}/call/end`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Client-ID": this.clientId,
          },
          body: JSON.stringify({
            conversationId,
            callDuration,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`End call API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("ShivAI End Call API Error:", error);
        throw error;
      }
    }
  }

  // Widget class
  class ShivAIWidget {
    constructor(config) {
      this.config = mergeDeep({}, DEFAULT_CONFIG, config);
      this.api = new ShivAIAPI(this.config);
      this.isOpen = false;
      this.currentMode = "chat";
      this.messages = [];
      this.isRecording = false;
      this.isLoading = false;
      this.hasGreeted = false;
      this.isMuted = false;
      this.conversationId = this.generateId();
      this.isCallActive = false;
      this.callStartTime = null;
      this.callDuration = 0;
      this.callInterval = null;
      this.hasStarted = false;

      this.recognition = null;
      this.synthesis = window.speechSynthesis;

      this.init();
    }

    generateId() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    }

    init() {
      this.injectStyles();
      this.createWidget();
      this.initSpeechRecognition();
      this.bindEvents();
    }

    injectStyles() {
      if (document.getElementById("shivai-widget-styles")) return;

      const styles = `
        .shivai-widget {
          font-family: ${this.config.theme.fontFamily};
          font-size: 14px;
          line-height: 1.4;
          * { box-sizing: border-box; }
        }
        
        .shivai-widget-button {
          border: none;
          cursor: pointer;
          outline: none;
          background: linear-gradient(0deg, #0a0a0a 0%, #000 100%);
          box-shadow: 0 1.688px 0.844px 0 #33332f inset,
                      0 3.797px 0.844px 0 #5e5e5e inset, 
                      0 -6.75px 10.126px 0 #171717 inset,
                      0 13.501px 20.251px -10.126px rgba(0, 0, 0, 0.25);
        }
        
        .shivai-widget-button:active {
          transform: scale(0.98);
        }
        
        .shivai-widget-chat {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: ${this.config.theme.borderRadius};
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        
        .shivai-widget-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          max-height: calc(${this.config.ui.chatHeight} - 180px);
          background-color: #f9fafb;
        }
        
        .shivai-widget-messages::-webkit-scrollbar {
          width: 4px;
        }
        
        .shivai-widget-messages::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .shivai-widget-messages::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
        
        .shivai-widget-message {
          margin-bottom: 12px;
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .shivai-widget-input {
          border: 1px solid #e2e8f0;
          border-radius: ${this.config.theme.borderRadius};
          padding: 8px 12px;
          outline: none;
          transition: border-color 0.2s;
        }
        
        .shivai-widget-input:focus {
          border-color: ${this.config.theme.accentColor};
          box-shadow: 0 0 0 3px ${this.config.theme.accentColor}20;
        }
        
        .shivai-recording {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .shivai-loading-dots {
          display: flex;
          gap: 4px;
        }
        
        .shivai-loading-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9ca3af;
          animation: loadingDot 1.4s ease-in-out infinite both;
        }
        
        .shivai-loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .shivai-loading-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes loadingDot {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes callPulse {
          0% { box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2), 0 0 0 8px rgba(16, 185, 129, 0.1), 0 8px 32px rgba(0, 0, 0, 0.15), 0 0 40px rgba(16, 185, 129, 0.2); }
          50% { box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3), 0 0 0 12px rgba(16, 185, 129, 0.2), 0 12px 40px rgba(0, 0, 0, 0.2), 0 0 60px rgba(16, 185, 129, 0.3); }
          100% { box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2), 0 0 0 8px rgba(16, 185, 129, 0.1), 0 8px 32px rgba(0, 0, 0, 0.15), 0 0 40px rgba(16, 185, 129, 0.2); }
        }
        
        @keyframes ringPulse {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        
        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @media (max-width: 768px) {
          .shivai-widget-chat {
            width: calc(100vw - 32px) !important;
            max-width: 350px;
            height: calc(100vh - 100px) !important;
            max-height: 500px;
          }
        }
      `;

      const styleSheet = createElement(
        "style",
        {
          id: "shivai-widget-styles",
          type: "text/css",
        },
        [styles]
      );

      document.head.appendChild(styleSheet);
    }

    createWidget() {
      this.container = createElement("div", {
        id: "shivai-widget-container",
        class: "shivai-widget",
        style: {
          position: "fixed",
          zIndex: "9999",
          ...this.getPositionStyles(),
        },
      });

      this.createTriggerButton();
      this.createChatInterface();

      document.body.appendChild(this.container);
    }

    getPositionStyles() {
      const positions = {
        "bottom-right": { bottom: "20px", right: "20px" },
        "bottom-left": { bottom: "20px", left: "20px" },
        "top-right": { top: "20px", right: "20px" },
        "top-left": { top: "20px", left: "20px" },
      };
      return positions[this.config.ui.position] || positions["bottom-right"];
    }

    createTriggerButton() {
      const size =
        this.config.ui.buttonSize === "small"
          ? "48px"
          : this.config.ui.buttonSize === "large"
          ? "64px"
          : "56px";

      this.triggerButton = createElement(
        "button",
        {
          class: "shivai-widget-button",
          style: {
            width: size,
            height: size,
            borderRadius: this.config.theme.borderRadius,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        [createIcon("message-circle", 24)]
      );

      this.container.appendChild(this.triggerButton);
    }

    createChatInterface() {
      this.chatInterface = createElement("div", {
        class: "shivai-widget-chat",
        style: {
          width: this.config.ui.chatWidth,
          height: this.config.ui.chatHeight,
          display: "none",
        },
      });

      this.createHeader();
      this.createBody();
      this.createFooter();

      this.container.appendChild(this.chatInterface);
    }

    createHeader() {
      this.header = createElement("div", {
        style: {
          position: "relative",
          textAlign: "center",
          borderBottom: "1px solid #e5e7eb",
          padding: "24px 16px",
        },
      });

      // Close button
      this.closeButton = createElement(
        "button",
        {
          style: {
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            background: "transparent",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "20px",
            transition: "color 0.2s",
          },
        },
        ["×"]
      );

      // Avatar/Logo
      const avatar = createElement("div", {
        style: {
          width: "64px",
          height: "64px",
          margin: "0 auto 16px",
          borderRadius: this.config.theme.borderRadius,
          // background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
          // boxShadow: `0 1.688px 0.844px 0 #33332f inset,
          //             0 3.797px 0.844px 0 #5e5e5e inset,
          //             0 -6.75px 10.126px 0 #171717 inset,
          //             0 13.501px 20.251px -10.126px rgba(0, 0, 0, 0.25)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });

      const botIconContainer = createElement(
        "div",
        {
          style: {
            width: "75%",
            height: "75%",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        [createIcon("bot", 36)]
      );
      botIconContainer.style.color = "white";

      avatar.appendChild(botIconContainer);

      // Title
      const title = createElement(
        "h3",
        {
          style: {
            fontSize: "20px",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 2px 0",
          },
        },
        ["ShivAI Support"]
      );

      // Description
      const description = createElement(
        "p",
        {
          style: {
            fontSize: "14px",
            color: "#6b7280",
            margin: "0 0 24px 0",
            lineHeight: "1.5",
            padding: "0 16px",
          },
        },
        [this.config.content.welcomeMessage]
      );

      this.header.appendChild(this.closeButton);
      this.header.appendChild(avatar);
      this.header.appendChild(title);
      this.header.appendChild(description);

      this.createModeButtons();
      this.chatInterface.appendChild(this.header);
    }

    createModeButtons() {
      // Start button (Chat or Call)
      this.startButton = createElement("button", {
        class: "shivai-widget-button",
        style: {
          width: "100%",
          color: "white",
          fontWeight: "600",
          borderRadius: "9999px",
          padding: "16px",
          marginBottom: "12px",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.3s",
        },
      });

      this.updateStartButton();

      // Privacy text
      const privacyText = createElement("p", {
        style: {
          fontSize: "12px",
          color: "#6b7280",
          margin: "0 0 24px 0",
          lineHeight: "1.5",
        },
      });

      const privacyContent = document.createTextNode("By starting ");
      const modeText = document.createTextNode(
        this.currentMode === "chat" ? "chat" : "call"
      );
      const privacyText2 = document.createTextNode(" you agree to ");

      const privacyLink = createElement(
        "span",
        {
          style: { color: "#3b82f6", cursor: "pointer" },
        },
        ["Privacy policy"]
      );

      const andText = document.createTextNode(" & ");

      const tcLink = createElement(
        "span",
        {
          style: { color: "#3b82f6", cursor: "pointer" },
        },
        ["T&C"]
      );

      privacyText.appendChild(privacyContent);
      privacyText.appendChild(modeText);
      privacyText.appendChild(privacyText2);
      privacyText.appendChild(privacyLink);
      privacyText.appendChild(andText);
      privacyText.appendChild(tcLink);

      // Bottom navigation
      const bottomNav = createElement("div", {
        style: {
          display: "flex",
          borderTop: "1px solid #f3f4f6",
        },
      });

      this.chatNavButton = createElement("button", {
        style: {
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 8px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: this.currentMode === "chat" ? "#111827" : "#6b7280",
          borderBottom: this.currentMode === "chat" ? "2px solid #000" : "none",
          transition: "color 0.2s",
        },
      });

      const chatIcon = createIcon("message-circle", 20);
      chatIcon.style.marginBottom = "4px";
      const chatLabel = createElement(
        "span",
        {
          style: {
            fontSize: "14px",
            fontWeight: this.currentMode === "chat" ? "600" : "400",
          },
        },
        ["Chat"]
      );

      this.chatNavButton.appendChild(chatIcon);
      this.chatNavButton.appendChild(chatLabel);

      this.voiceNavButton = createElement("button", {
        style: {
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 8px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: this.currentMode === "voice" ? "#111827" : "#6b7280",
          borderBottom:
            this.currentMode === "voice" ? "2px solid #000" : "none",
          transition: "color 0.2s",
        },
      });

      const voiceIcon = createIcon("phone", 20);
      voiceIcon.style.marginBottom = "4px";
      const voiceLabel = createElement(
        "span",
        {
          style: {
            fontSize: "14px",
            fontWeight: this.currentMode === "voice" ? "600" : "400",
          },
        },
        ["Voice Call"]
      );

      this.voiceNavButton.appendChild(voiceIcon);
      this.voiceNavButton.appendChild(voiceLabel);

      bottomNav.appendChild(this.chatNavButton);
      bottomNav.appendChild(this.voiceNavButton);

      this.header.appendChild(this.startButton);
      this.header.appendChild(privacyText);
      this.header.appendChild(bottomNav);
    }

    updateStartButton() {
      this.startButton.innerHTML = "";

      if (this.currentMode === "chat") {
        const icon = createIcon("message-circle", 20);
        icon.style.marginRight = "8px";
        this.startButton.appendChild(icon);
        this.startButton.appendChild(document.createTextNode("Start Chat"));
      } else {
        const icon = createIcon("phone", 20);
        icon.style.marginRight = "8px";
        this.startButton.appendChild(icon);
        this.startButton.appendChild(
          document.createTextNode(this.isCallActive ? "End Call" : "Start Call")
        );
      }
    }

    createBody() {
      this.body = createElement("div", {
        style: {
          flex: "1",
          display: "flex",
          flexDirection: "column",
          minHeight: "200px",
        },
      });

      this.createChatMode();
      this.createCallMode();

      this.chatInterface.appendChild(this.body);
    }

    createChatMode() {
      this.chatMode = createElement("div", {
        style: {
          display:
            this.currentMode === "chat" && this.hasStarted ? "flex" : "none",
          flexDirection: "column",
          height: "100%",
        },
      });

      // Chat header with AI status and call button
      this.chatHeader = createElement("div", {
        style: {
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9fafb",
        },
      });

      // Left side - AI info and status
      const aiInfo = createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
        },
      });

      const aiAvatar = createElement("div", {
        style: {
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });

      const botIcon = createIcon("bot", 16);
      aiAvatar.appendChild(botIcon);

      const aiDetails = createElement("div");
      const aiName = createElement(
        "div",
        {
          style: {
            fontSize: "14px",
            fontWeight: "600",
            color: "#111827",
          },
        },
        ["ShivAI"]
      );

      this.aiStatus = createElement("div", {
        style: {
          fontSize: "12px",
          color: "#10b981",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        },
      });

      const statusDot = createElement("div", {
        style: {
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#10b981",
        },
      });

      this.aiStatus.appendChild(statusDot);
      this.aiStatus.appendChild(document.createTextNode("Online"));

      aiDetails.appendChild(aiName);
      aiDetails.appendChild(this.aiStatus);

      aiInfo.appendChild(aiAvatar);
      aiInfo.appendChild(aiDetails);

      // Right side - Call button
      this.callSwitchButton = createElement("button", {
        style: {
          padding: "8px",
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
        },
      });

      const callIcon = createIcon("phone", 16);
      callIcon.style.stroke = "#6b7280";
      this.callSwitchButton.appendChild(callIcon);

      this.chatHeader.appendChild(aiInfo);
      this.chatHeader.appendChild(this.callSwitchButton);

      this.messagesContainer = createElement("div", {
        class: "shivai-widget-messages",
        style: {
          padding: "16px",
          backgroundColor: "#f9fafb",
        },
      });

      this.inputContainer = createElement("div", {
        style: {
          padding: "16px",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          gap: "8px",
          backgroundColor: "white",
        },
      });

      this.messageInput = createElement("input", {
        class: "shivai-widget-input",
        type: "text",
        placeholder: this.config.content.placeholderText,
        style: { flex: "1" },
      });

      this.sendButton = createElement(
        "button",
        {
          class: "shivai-widget-button",
          style: {
            padding: "8px 16px",
            backgroundColor: this.config.theme.accentColor,
            color: "white",
            borderRadius: this.config.theme.borderRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        [createIcon("send", 16)]
      );

      this.inputContainer.appendChild(this.messageInput);
      this.inputContainer.appendChild(this.sendButton);

      this.chatMode.appendChild(this.chatHeader);
      this.chatMode.appendChild(this.messagesContainer);
      this.chatMode.appendChild(this.inputContainer);
      this.body.appendChild(this.chatMode);
    }

    createCallMode() {
      this.callMode = createElement("div", {
        style: {
          display:
            this.currentMode === "voice" && this.hasStarted ? "flex" : "none",
          flexDirection: "column",
          height: "100%",
        },
      });

      // Call header with chat switch button
      this.callHeader = createElement("div", {
        style: {
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9fafb",
        },
      });

      // Left side - Call status
      const callInfo = createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
        },
      });

      const callAvatar = createElement("div", {
        style: {
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });

      const phoneIcon = createIcon("phone", 16);
      callAvatar.appendChild(phoneIcon);

      const callDetails = createElement("div");
      const callName = createElement(
        "div",
        {
          style: {
            fontSize: "14px",
            fontWeight: "600",
            color: "#111827",
          },
        },
        ["Voice Call"]
      );

      const callStatusText = createElement(
        "div",
        {
          style: {
            fontSize: "12px",
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          },
        },
        ["Active Call"]
      );

      callDetails.appendChild(callName);
      callDetails.appendChild(callStatusText);

      callInfo.appendChild(callAvatar);
      callInfo.appendChild(callDetails);

      // Right side - Chat button
      this.chatSwitchButton = createElement("button", {
        style: {
          padding: "8px",
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
        },
      });

      const chatIcon = createIcon("message-circle", 16);
      chatIcon.style.stroke = "#6b7280";
      this.chatSwitchButton.appendChild(chatIcon);

      this.callHeader.appendChild(callInfo);
      this.callHeader.appendChild(this.chatSwitchButton);

      // Call content container
      const callContent = createElement("div", {
        style: {
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          textAlign: "center",
          backgroundColor: "#f9fafb",
        },
      });

      // Call user avatar with enhanced design
      const callUserAvatar = createElement("div", {
        style: {
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          visibilty: "hidden",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
        },
      });



      // Call info with enhanced styling
      const callTitle = createElement(
        "h3",
        {
          style: {
            margin: "0 0 12px 0",
            fontSize: "24px",
            fontWeight: "700",
            color: "#0f172a",
            position: "relative",
            zIndex: "2",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          },
        },
        ["ShivAI"]
      );

      this.callStatus = createElement(
        "p",
        {
          style: {
            margin: "0 0 8px 0",
            fontSize: "14px",
            color: "#6b7280",
          },
        },
        ["Connecting..."]
      );

      this.callTimer = createElement(
        "p",
        {
          style: {
            margin: "0 0 32px 0",
            fontSize: "16px",
            color: "#111827",
            fontWeight: "500",
          },
        },
        ["00:00"]
      );

      // Call controls
      const controlsContainer = createElement("div", {
        style: {
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
        },
      });

      // Mute button
      this.muteButton = createElement("button", {
        style: {
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        },
      });

      this.updateMuteButton();

      // End call button
      this.endCallButton = createElement(
        "button",
        {
          style: {
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#dc2626",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            transition: "all 0.2s",
          },
        },
        [createIcon("phone", 20)]
      );

      controlsContainer.appendChild(this.muteButton);
      controlsContainer.appendChild(this.endCallButton);

      callContent.appendChild(callUserAvatar);
      callContent.appendChild(callTitle);
      callContent.appendChild(this.callStatus);
      callContent.appendChild(this.callTimer);
      callContent.appendChild(controlsContainer);

      this.callMode.appendChild(this.callHeader);
      this.callMode.appendChild(callContent);
      this.body.appendChild(this.callMode);
    }

    updateMuteButton() {
      this.muteButton.innerHTML = "";
      const icon = createIcon(this.isMuted ? "volume-x" : "volume-2", 20);
      icon.style.color = this.isMuted ? "#dc2626" : "#6b7280";
      this.muteButton.appendChild(icon);
      this.muteButton.style.backgroundColor = this.isMuted
        ? "#fef2f2"
        : "#f3f4f6";
    }

    createFooter() {
      this.footer = createElement("div", {
        style: { borderTop: "1px solid #f3f4f6" },
      });

      if (this.config.features.showPrivacyPolicy) {
        const privacyLink = createElement("div", {
          style: { textAlign: "center", padding: "8px" },
        });

        const link = createElement(
          "a",
          {
            href: this.config.content.privacyPolicyUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              fontSize: "12px",
              color: "#000000", // Black color for ShivAI
              textDecoration: "none",
              fontWeight: "bold",
            },
          },
          [
            "Powered by ",
            (() => {
              const span = document.createElement("span");
              span.textContent = "ShivAI";
              span.style.background = "linear-gradient(90deg,#000,#333)";
              span.style.color = "#fff";
              span.style.padding = "2px 6px";
              span.style.borderRadius = "4px";
              span.style.fontWeight = "bold";
              span.style.marginLeft = "2px";
              return span;
            })(),
          ]
        );

        privacyLink.appendChild(link);
        this.footer.appendChild(privacyLink);
      }



      this.chatInterface.appendChild(this.footer);
    }

    initSpeechRecognition() {
      if (
        this.config.features.voiceEnabled &&
        ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
      ) {
        const SpeechRecognition =
          window.webkitSpeechRecognition || window.SpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = "en-US";

        this.recognition.onstart = () => {
          this.isRecording = true;
          this.updateVoiceUI();
        };

        this.recognition.onresult = async (event) => {
          const transcript = event.results[0][0].transcript;
          this.isRecording = false;
          this.updateVoiceUI();

          await this.handleVoiceMessage(transcript);
        };

        this.recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          this.isRecording = false;
          this.updateVoiceUI();
        };

        this.recognition.onend = () => {
          this.isRecording = false;
          this.updateVoiceUI();
        };
      }
    }

    bindEvents() {
      // Trigger button
      this.triggerButton.addEventListener("click", () => this.toggleWidget());

      // Close button
      this.closeButton.addEventListener("click", () => this.toggleWidget());

      // Start button (Chat/Call)
      this.startButton.addEventListener("click", () => this.handleStart());

      // Navigation buttons
      this.chatNavButton.addEventListener("click", () => this.setMode("chat"));
      this.voiceNavButton.addEventListener("click", () =>
        this.setMode("voice")
      );

      // Send message
      this.sendButton.addEventListener("click", () => this.sendMessage());
      this.messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      // Call controls
      if (this.muteButton) {
        this.muteButton.addEventListener("click", () => this.toggleMute());
      }
      if (this.endCallButton) {
        this.endCallButton.addEventListener("click", () =>
          this.endCurrentCall()
        );
      }

      // Switch buttons
      if (this.callSwitchButton) {
        this.callSwitchButton.addEventListener("click", () =>
          this.switchToCall()
        );
      }
      if (this.chatSwitchButton) {
        this.chatSwitchButton.addEventListener("click", () =>
          this.switchToChat()
        );
      }

      // Outside click to close
      document.addEventListener("click", (e) => {
        if (this.isOpen && !this.container.contains(e.target)) {
          this.toggleWidget();
        }
      });

      // Escape key to close
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.toggleWidget();
        }
      });
    }

    toggleWidget() {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.triggerButton.style.display = "none";
        this.chatInterface.style.display = "flex";

        // Reset to welcome screen when opening
        this.hasStarted = false;
        this.updateUI();

        if (this.config.features.autoOpen && !this.hasGreeted) {
          setTimeout(() => {
            if (this.isOpen && !this.hasStarted) {
              this.handleStart();
            }
          }, 3000);
        }
      } else {
        this.triggerButton.style.display = "flex";
        this.chatInterface.style.display = "none";

        // End any active call when closing
        if (this.isCallActive) {
          this.endCurrentCall();
        }
      }
    }

    setMode(mode) {
      if (this.hasStarted) return; // Don't allow mode switching during active session

      this.currentMode = mode;
      this.updateModeUI();
    }

    updateModeUI() {
      // Update navigation buttons
      this.chatNavButton.style.color =
        this.currentMode === "chat" ? "#111827" : "#6b7280";
      this.chatNavButton.style.borderBottom =
        this.currentMode === "chat" ? "2px solid #000" : "none";
      this.chatNavButton.querySelector("span").style.fontWeight =
        this.currentMode === "chat" ? "600" : "400";

      this.voiceNavButton.style.color =
        this.currentMode === "voice" ? "#111827" : "#6b7280";
      this.voiceNavButton.style.borderBottom =
        this.currentMode === "voice" ? "2px solid #000" : "none";
      this.voiceNavButton.querySelector("span").style.fontWeight =
        this.currentMode === "voice" ? "600" : "400";

      // Update start button
      this.updateStartButton();

      // Update privacy text
      const privacyTextElements = this.header.querySelectorAll("p");
      if (privacyTextElements.length > 1) {
        const privacyElement = privacyTextElements[1];
        privacyElement.childNodes[1].textContent =
          this.currentMode === "chat" ? "chat" : "call";
      }
    }

    async handleStart() {
      if (this.currentMode === "chat") {
        this.startChat();
      } else {
        if (this.isCallActive) {
          await this.endCurrentCall();
        } else {
          await this.startCurrentCall();
        }
      }
    }

    startChat() {
      this.hasStarted = true;
      this.updateUI();

      // Add initial greeting message
      if (this.config.features.autoGreeting && !this.hasGreeted) {
        this.addMessage(
          "bot",
          "Hi! I'm your AI assistant. How can I help you today?"
        );
        this.hasGreeted = true;
      }
    }

    startCurrentCall() {
      // Switch to voice mode when starting a call
      this.currentMode = "voice";
      
      // Set hasStarted to true to show the call interface
      this.hasStarted = true;
      
      this.updateModeUI();
      this.updateUI();
      
      // Update call status
      if (this.callStatus) {
        this.callStatus.textContent = "Connecting...";
        
        // Simulate connection after 1 second
        setTimeout(() => {
          if (this.callStatus) {
            this.callStatus.textContent = "Connected";
          }
        }, 1000);
      }

      // Set call as active
      this.isCallActive = true;
      this.callStartTime = Date.now();
      this.startCallTimer();
      this.updateStartButton();

      console.log("Call started - switched to call interface");
    }

    endCurrentCall() {
      // Clear call timer if running
      if (this.callInterval) {
        clearInterval(this.callInterval);
        this.callInterval = null;
      }

      // Reset call state
      this.isCallActive = false;
      this.hasStarted = false;
      this.callDuration = 0;
      this.callStartTime = null;
      
      // Reset UI elements
      if (this.callTimer) {
        this.callTimer.textContent = "00:00";
      }
      if (this.callStatus) {
        this.callStatus.textContent = "Ready to call";
      }

      // Reset to the main interface (welcome screen)
      this.updateStartButton();
      this.updateUI();

      console.log("Call ended - returned to main interface");
    }

    startCallTimer() {
      this.callInterval = setInterval(() => {
        if (this.isCallActive) {
          const elapsed = Math.floor((Date.now() - this.callStartTime) / 1000);
          const minutes = Math.floor(elapsed / 60);
          const seconds = elapsed % 60;
          this.callTimer.textContent = `${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
      }, 1000);
    }

    updateUI() {
      // Show/hide welcome screen vs active session
      this.header.style.display = this.hasStarted ? "none" : "block";
      this.body.style.display = this.hasStarted ? "flex" : "none";

      if (this.hasStarted) {
        if (this.currentMode === "chat") {
          this.chatMode.style.display = "flex";
          this.callMode.style.display = "none";
        } else {
          this.chatMode.style.display = "none";
          this.callMode.style.display = "flex";
        }
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.updateMuteButton();
    }

    switchToCall() {
      this.currentMode = "voice";
      this.updateUI();
      if (!this.isCallActive) {
        this.startCurrentCall();
      }
    }

    switchToChat() {
      if (this.isCallActive) {
        // End call before switching to chat
        this.endCurrentCall().then(() => {
          this.currentMode = "chat";
          this.updateUI();
        });
      } else {
        this.currentMode = "chat";
        this.updateUI();
      }
    }

    updateAIStatus(status, color = "#10b981") {
      if (this.aiStatus) {
        const statusDot = this.aiStatus.querySelector("div");
        const statusText = this.aiStatus.childNodes[1];

        if (statusDot) {
          statusDot.style.backgroundColor = color;
        }
        if (statusText) {
          statusText.textContent = status;
        }
        this.aiStatus.style.color = color;
      }
    }

    async sendMessage() {
      const message = this.messageInput.value.trim();
      if (!message || this.isLoading) return;

      this.addMessage("user", message);
      this.messageInput.value = "";
      this.setLoading(true);
      this.updateAIStatus("Typing...", "#f59e0b");

      try {
        const response = await this.api.sendMessage(
          message,
          this.conversationId
        );
        this.addMessage("bot", response);
        this.updateAIStatus("Online", "#10b981");
      } catch (error) {
        this.addMessage(
          "bot",
          "Sorry, I encountered an error. Please try again."
        );
        this.updateAIStatus("Error", "#dc2626");
        setTimeout(() => {
          this.updateAIStatus("Online", "#10b981");
        }, 3000);
      } finally {
        this.setLoading(false);
      }
    }

    speakText(text) {
      if (this.synthesis && !this.isMuted) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        this.synthesis.speak(utterance);
      }
    }

    addMessage(type, content) {
      const messageId = this.generateId();
      const message = { id: messageId, type, content, timestamp: new Date() };
      this.messages.push(message);

      const messageElement = this.createMessageElement(message);
      this.messagesContainer.appendChild(messageElement);

      // Scroll to bottom
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    createMessageElement(message) {
      const messageDiv = createElement("div", {
        class: "shivai-widget-message",
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: message.type === "user" ? "flex-end" : "flex-start",
          marginBottom: "16px",
        },
      });

      // Sender info
      const senderInfo = createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "4px",
          fontSize: "12px",
          color: "#6b7280",
        },
      });

      if (message.type === "bot") {
        const aiAvatar = createElement("div", {
          style: {
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });

        const botIcon = createIcon("bot", 10);
        aiAvatar.appendChild(botIcon);
        senderInfo.appendChild(aiAvatar);
        senderInfo.appendChild(document.createTextNode("ShivAI"));
      } else {
        const userAvatar = createElement("div", {
          style: {
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });

        const userIcon = createIcon("user", 10);
        userAvatar.appendChild(userIcon);
        senderInfo.appendChild(userIcon);
        senderInfo.appendChild(document.createTextNode("You"));
      }

      // Time stamp
      const timeStamp = createElement(
        "span",
        {
          style: {
            fontSize: "11px",
            color: "#9ca3af",
            marginLeft: "auto",
          },
        },
        [this.formatTime(message.timestamp)]
      );

      if (message.type === "user") {
        senderInfo.appendChild(timeStamp);
      } else {
        senderInfo.insertBefore(timeStamp, senderInfo.firstChild);
      }

      // Message bubble
      const messageWrapper = createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          maxWidth: "85%",
        },
      });

      if (message.type === "bot") {
        const aiAvatar = createElement("div", {
          style: {
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
          },
        });

        const botIcon = createIcon("bot", 12);
        aiAvatar.appendChild(botIcon);
        messageWrapper.appendChild(aiAvatar);
      }

      const bubble = createElement(
        "div",
        {
          style: {
            padding: "12px 16px",
            borderRadius:
              message.type === "user"
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
            backgroundColor: message.type === "user" ? "#3b82f6" : "white",
            color: message.type === "user" ? "white" : "#1f2937",
            fontSize: "14px",
            lineHeight: "1.5",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            border: message.type === "bot" ? "1px solid #e5e7eb" : "none",
            maxWidth: "100%",
            wordWrap: "break-word",
          },
        },
        [message.content]
      );

      messageWrapper.appendChild(bubble);

      if (message.type === "user") {
        const userAvatar = createElement("div", {
          style: {
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
          },
        });

        const userIcon = createIcon("user", 12);
        userIcon.style.stroke = "white";
        userAvatar.appendChild(userIcon);
        messageWrapper.appendChild(userAvatar);
      }

      messageDiv.appendChild(senderInfo);
      messageDiv.appendChild(messageWrapper);
      return messageDiv;
    }

    formatTime(date) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }

    setLoading(loading) {
      this.isLoading = loading;

      if (loading && this.currentMode === "chat" && this.hasStarted) {
        const loadingMessage = createElement("div", {
          class: "shivai-widget-message",
          id: "shivai-loading-message",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "16px",
          },
        });

        // Sender info for loading message
        const senderInfo = createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "4px",
            fontSize: "12px",
            color: "#6b7280",
          },
        });

        const aiAvatar = createElement("div", {
          style: {
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });

        const botIcon = createIcon("bot", 10);
        aiAvatar.appendChild(botIcon);
        senderInfo.appendChild(aiAvatar);
        senderInfo.appendChild(document.createTextNode("ShivAI"));

        // Message wrapper
        const messageWrapper = createElement("div", {
          style: {
            display: "flex",
            alignItems: "flex-end",
            gap: "8px",
            maxWidth: "85%",
          },
        });

        const aiAvatarLarge = createElement("div", {
          style: {
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
          },
        });

        const botIconLarge = createIcon("bot", 12);
        aiAvatarLarge.appendChild(botIconLarge);

        const loadingBubble = createElement("div", {
          style: {
            padding: "12px 16px",
            borderRadius: "18px 18px 18px 4px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          },
        });

        const loadingDots = createElement("div", {
          class: "shivai-loading-dots",
        });
        for (let i = 0; i < 3; i++) {
          loadingDots.appendChild(
            createElement("div", { class: "shivai-loading-dot" })
          );
        }

        loadingBubble.appendChild(loadingDots);
        messageWrapper.appendChild(aiAvatarLarge);
        messageWrapper.appendChild(loadingBubble);
        loadingMessage.appendChild(senderInfo);
        loadingMessage.appendChild(messageWrapper);
        this.messagesContainer.appendChild(loadingMessage);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      } else {
        const loadingMessage = document.getElementById(
          "shivai-loading-message"
        );
        if (loadingMessage) {
          loadingMessage.remove();
        }
      }

      // Disable/enable inputs during loading
      if (this.messageInput) this.messageInput.disabled = loading;
      if (this.sendButton) this.sendButton.disabled = loading;
      if (this.startButton && !this.hasStarted)
        this.startButton.disabled = loading;
    }
  }

  // Initialize widget when DOM is ready
  function initWidget() {
    const script =
      document.currentScript ||
      document.querySelector('script[src*="widget.js"]') ||
      document.querySelector("script[data-client-id]");

    if (!script) {
      console.error("ShivAI Widget: Could not find script tag");
      return;
    }

    const clientId = script.getAttribute("data-client-id");
    if (!clientId) {
      console.error("ShivAI Widget: data-client-id attribute is required");
      return;
    }

    // Merge with global config if available
    const globalConfig = window.ShivAIConfig || {};
    const config = mergeDeep({}, DEFAULT_CONFIG, globalConfig, { clientId });

    // Create widget instance
    window.ShivAIWidget = new ShivAIWidget(config);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})(window, document);
