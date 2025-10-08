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
      chatHeight: "480px",
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
      bot: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="21" x2="8" y2="17"/><line x1="16" y1="21" x2="16" y2="17"/></svg>`,
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
          height: 480px; 
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
            max-width: 400px !important;
            height: auto !important;
            max-height: 70vh !important;
            position: fixed !important;
            bottom: 90px !important;
            right: 16px !important;
            left: 16px !important;
            transform: none !important;
            z-index: 10000 !important;
            margin: 0 auto !important;
            border-radius: 16px !important;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1) !important;
            animation: slideUpMobile 0.3s ease-out !important;
          }
          
          @keyframes slideUpMobile {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .shivai-widget-container {
            position: fixed !important;
            bottom: 16px !important;
            right: 16px !important;
          }
          
          .shivai-widget-button {
            width: 56px !important;
            height: 56px !important;
          }
          
          .shivai-widget-messages {
            max-height: 300px !important;
            padding: 12px !important;
          }
          
          .shivai-widget-message {
            margin-bottom: 12px !important;
          }
          
          .shivai-widget-header {
            padding: 20px 16px 16px !important;
          }
          
          .shivai-widget-input-container {
            padding: 12px !important;
            gap: 8px !important;
          }
          
          .shivai-widget-input {
            font-size: 16px !important;
            padding: 12px 16px !important;
            border-radius: 12px !important;
          }
          
          .shivai-widget-send-button {
            width: 48px !important;
            height: 48px !important;
            border-radius: 12px !important;
          }
          
          .shivai-call-controls {
            flex-direction: row !important;
            gap: 16px !important;
            justify-content: center !important;
            padding: 20px !important;
          }
          
          .shivai-call-button {
            width: 56px !important;
            height: 56px !important;
          }
          
          /* Mobile start button - make it full width */
          .shivai-widget-header .shivai-widget-button {
            width: 100% !important;
            max-width: none !important;
            margin: 0 0 16px 0 !important;
            padding: 16px 20px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
          }
          
          /* Mobile backdrop for better focus */
          .shivai-widget-chat::before {
            content: '' !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(0, 0, 0, 0.3) !important;
            z-index: -1 !important;
            backdrop-filter: blur(2px) !important;
          }
        }
        
        @media (max-width: 640px) and (min-width: 481px) {
          .shivai-widget-chat {
            width: calc(100vw - 40px) !important;
            max-width: 420px !important;
            height: auto !important;
            max-height: 75vh !important;
            bottom: 85px !important;
            right: 20px !important;
            left: 20px !important;
          }
          
          .shivai-widget-button {
            width: 54px !important;
            height: 54px !important;
          }
          
          .shivai-widget-messages {
            max-height: 320px !important;
          }
          
          /* Tablet start button - make it full width */
          .shivai-widget-header .shivai-widget-button {
            width: 100% !important;
            max-width: none !important;
            margin: 0 0 16px 0 !important;
            padding: 16px 20px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
          }
        }
        
        @media (max-width: 480px) {
          .shivai-widget-chat {
            width: calc(100vw - 24px) !important;
            max-width: 360px !important;
            height: auto !important;
            max-height: 65vh !important;
            left: 12px !important;
            right: 12px !important;
            bottom: 80px !important;
          }
          
          .shivai-widget-button {
            width: 52px !important;
            height: 52px !important;
            touch-action: manipulation !important;
          }
          
          .shivai-widget-messages {
            max-height: 250px !important;
            padding: 10px !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          .shivai-widget-header {
            padding: 16px 12px 12px !important;
          }
          
          .shivai-widget-input {
            -webkit-appearance: none !important;
            -webkit-user-select: text !important;
            font-size: 16px !important;
            padding: 10px 14px !important;
          }
          
          .shivai-widget-input-container {
            padding: 10px !important;
          }
          
          .shivai-widget-send-button {
            width: 44px !important;
            height: 44px !important;
          }
          
          /* Mobile navigation buttons */
          .shivai-widget-header button {
            padding: 12px 8px !important;
            font-size: 13px !important;
          }
          
          /* Mobile start button - make it full width */
          .shivai-widget-header .shivai-widget-button {
            width: 100% !important;
            max-width: none !important;
            margin: 0 0 16px 0 !important;
            padding: 16px 20px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
          }
          
          /* Enhanced touch targets for buttons */
          button, .shivai-call-button, .shivai-widget-send-button {
            min-width: 44px !important;
            min-height: 44px !important;
            touch-action: manipulation !important;
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
        class: "shivai-widget shivai-widget-container",
        style: {
          position: "fixed",
          zIndex: "9999",
          ...this.getPositionStyles(),
        },
      });

      // Create mobile overlay
      this.overlay = createElement("div", {
        class: "shivai-widget-overlay",
        style: {
          display: "none",
        },
      });

      this.createTriggerButton();
      this.createChatInterface();

      document.body.appendChild(this.overlay);
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
          ? "68px"
          : "60px";

      this.triggerButton = createElement(
        "button",
        {
          class: "shivai-widget-button",
          style: {
            width: size,
            height: size,
            borderRadius: "50%",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            // border: "3px solid rgba(255,255,255,0.2)",
          },
        },
        [createIcon("message-circle", window.innerWidth <= 768 ? 26 : 24)]
      );

      // Add hover and touch effects
      this.triggerButton.addEventListener("mouseover", () => {
        this.triggerButton.style.transform = "scale(1.1)";
        this.triggerButton.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
      });

      this.triggerButton.addEventListener("mouseout", () => {
        this.triggerButton.style.transform = "scale(1)";
        this.triggerButton.style.boxShadow = "";
      });

      this.triggerButton.addEventListener("touchstart", () => {
        this.triggerButton.style.transform = "scale(0.95)";
      });

      this.triggerButton.addEventListener("touchend", () => {
        this.triggerButton.style.transform = "scale(1)";
      });

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
        class: "shivai-widget-header",
        style: {
          position: "relative",
          textAlign: "center",
          borderBottom: "1px solid #e5e7eb",
          padding: "20px 16px",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        },
      });

      // Close button
      this.closeButton = createElement(
        "button",
        {
          style: {
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "500",
            transition: "all 0.2s",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        },
        ["×"]
      );

      this.closeButton.addEventListener("mouseover", () => {
        this.closeButton.style.background = "rgba(239, 68, 68, 0.1)";
        this.closeButton.style.color = "#dc2626";
        this.closeButton.style.borderColor = "#fecaca";
      });

      this.closeButton.addEventListener("mouseout", () => {
        this.closeButton.style.background = "rgba(255, 255, 255, 0.9)";
        this.closeButton.style.color = "#6b7280";
        this.closeButton.style.borderColor = "#e5e7eb";
      });

      // Avatar/Logo
      const avatar = createElement("div", {
        style: {
          width: "70px",
          height: "70px",
          margin: "0 auto 20px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow:
            "0 8px 32px rgba(102, 126, 234, 0.3), 0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
      });

      // Add a subtle pulse animation for the avatar
      avatar.style.animation = "avatarPulse 3s ease-in-out infinite";

      // Add pulse keyframes to styles if not already added
      if (!document.querySelector("#shivai-avatar-animation")) {
        const avatarStyle = createElement(
          "style",
          {
            id: "shivai-avatar-animation",
          },
          [
            `
          @keyframes avatarPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3), 0 2px 8px rgba(0,0,0,0.1); }
            50% { transform: scale(1.05); box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0,0,0,0.15); }
          }
        `,
          ]
        );
        document.head.appendChild(avatarStyle);
      }

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
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            margin: "0 0 8px 0",
            letterSpacing: "-0.025em",
          },
        },
        ["ShivAI Assistant"]
      );

      // Description
      const description = createElement(
        "p",
        {
          style: {
            fontSize: "15px",
            color: "#6b7280",
            margin: "0 0 28px 0",
            lineHeight: "1.6",
            padding: "0 20px",
            maxWidth: "280px",
            margin: "0 auto 28px auto",
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
          // background: "#f9fafb",
          borderRadius: "0 0 12px 12px",
          overflow: "hidden",
        },
      });

      this.chatNavButton = createElement("button", {
        style: {
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "14px 12px",
          border: "none",
          cursor: "pointer",
          color: this.currentMode === "chat" ? "#111827" : "#6b7280",
          borderBottom:
            this.currentMode === "chat"
              ? "3px solid #111827"
              : "3px solid transparent",
          transition: "all 0.2s ease",
          fontWeight: this.currentMode === "chat" ? "600" : "500",
          fontSize: "14px",
        },
      });

      const chatIcon = createIcon("message-circle", 20);
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
      // this.chatNavButton.appendChild(chatLabel);

      this.voiceNavButton = createElement("button", {
        style: {
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "14px 12px",
          border: "none",
          cursor: "pointer",
          color: this.currentMode === "voice" ? "#111827" : "#6b7280",
          borderBottom:
            this.currentMode === "voice"
              ? "3px solid #111827"
              : "3px solid transparent",
          transition: "all 0.2s ease",
          fontWeight: this.currentMode === "voice" ? "600" : "500",
          fontSize: "14px",
        },
      });

      const voiceIcon = createIcon("phone", 20);
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
      // this.voiceNavButton.appendChild(voiceLabel);

      // Add event listeners for mode switching
      this.chatNavButton.addEventListener("click", () => {
        if (this.currentMode !== "chat") {
          this.currentMode = "chat";
          this.updateNavigationButtons();
          this.updateStartButton();
        }
      });

      this.voiceNavButton.addEventListener("click", () => {
        if (this.currentMode !== "voice") {
          this.currentMode = "voice";
          this.updateNavigationButtons();
          this.updateStartButton();
        }
      });

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
        class: "shivai-widget-input-container",
        style: {
          padding: "16px",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          gap: "12px",
          backgroundColor: "white",
          alignItems: "flex-end",
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
          class: "shivai-widget-button shivai-widget-send-button",
          style: {
            padding: "12px",
            width: "52px",
            height: "52px",
            backgroundColor: this.config.theme.accentColor,
            color: "white",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: "0",
          },
        },
        [createIcon("send", 18)]
      );

      this.sendButton.addEventListener("mouseover", () => {
        this.sendButton.style.transform = "scale(1.05)";
        this.sendButton.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.4)";
      });

      this.sendButton.addEventListener("mouseout", () => {
        this.sendButton.style.transform = "scale(1)";
        this.sendButton.style.boxShadow = "";
      });

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
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
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
        class: "shivai-call-controls",
        style: {
          display: "flex",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
        },
      });

      // Mute button
      this.muteButton = createElement("button", {
        class: "shivai-call-button",
        style: {
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          border: "2px solid #e5e7eb",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      });

      this.updateMuteButton();

      // End call button
      this.endCallButton = createElement(
        "button",
        {
          class: "shivai-call-button",
          style: {
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#dc2626",
            border: "2px solid #b91c1c",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            transition: "all 0.3s",
            boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
          },
        },
        [createIcon("phone", 22)]
      );

      this.endCallButton.addEventListener("mouseover", () => {
        this.endCallButton.style.transform = "scale(1.1)";
        this.endCallButton.style.boxShadow =
          "0 8px 25px rgba(220, 38, 38, 0.4)";
      });

      this.endCallButton.addEventListener("mouseout", () => {
        this.endCallButton.style.transform = "scale(1)";
        this.endCallButton.style.boxShadow =
          "0 4px 12px rgba(220, 38, 38, 0.3)";
      });

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
        style: {
          borderTop: "1px solid #e5e7eb",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        },
      });

      if (this.config.features.showBranding) {
        const brandingContainer = createElement("div", {
          style: {
            textAlign: "center",
            padding: "12px 16px",
          },
        });

        const link = createElement(
          "a",
          {
            href: this.config.content.privacyPolicyUrl || "https://shivai.com",
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              fontSize: "13px",
              color: "#6b7280",
              textDecoration: "none",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            },
          },
          [
            "Powered by ",
            (() => {
              const span = document.createElement("span");
              span.textContent = "ShivAI";
              span.style.background =
                "linear-gradient(135deg, #000000 0%, #374151 100%)";
              span.style.color = "#fff";
              span.style.padding = "3px 8px";
              span.style.borderRadius = "6px";
              span.style.fontWeight = "600";
              span.style.marginLeft = "2px";
              span.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
              return span;
            })(),
          ]
        );

        // Add hover effects
        link.addEventListener("mouseenter", () => {
          link.style.color = "#374151";
          link.style.transform = "translateY(-1px)";
        });

        link.addEventListener("mouseleave", () => {
          link.style.color = "#6b7280";
          link.style.transform = "translateY(0)";
        });

        brandingContainer.appendChild(link);
        this.footer.appendChild(brandingContainer);
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

      // Mobile overlay click to close
      if (this.overlay) {
        this.overlay.addEventListener("click", (e) => {
          if (e.target === this.overlay && this.isOpen) {
            this.toggleWidget();
          }
        });
      }

      // Escape key to close
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.toggleWidget();
        }
      });
    }

    toggleWidget() {
      this.isOpen = !this.isOpen;
      const isMobile = window.innerWidth <= 768;

      if (this.isOpen) {
        this.triggerButton.style.display = "none";
        this.chatInterface.style.display = "flex";

        // Show overlay on mobile
        if (isMobile && this.overlay) {
          this.overlay.style.display = "block";
          document.body.style.overflow = "hidden";
        }

        // Add animation
        this.chatInterface.style.opacity = "0";
        this.chatInterface.style.transform = isMobile
          ? "translate(-50%, -40%)"
          : "translateY(20px)";

        setTimeout(() => {
          this.chatInterface.style.transition = "all 0.3s ease-out";
          this.chatInterface.style.opacity = "1";
          this.chatInterface.style.transform = isMobile
            ? "translate(-50%, -50%)"
            : "translateY(0)";
        }, 10);

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
        // Add closing animation
        this.chatInterface.style.transition = "all 0.2s ease-in";
        this.chatInterface.style.opacity = "0";
        this.chatInterface.style.transform = isMobile
          ? "translate(-50%, -40%)"
          : "translateY(20px)";

        setTimeout(() => {
          this.triggerButton.style.display = "flex";
          this.chatInterface.style.display = "none";

          // Hide overlay on mobile
          if (isMobile && this.overlay) {
            this.overlay.style.display = "none";
            document.body.style.overflow = "";
          }
        }, 200);

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

      // Update navigation button states
      this.updateNavigationButtons();
      this.updateStartButton();

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

    updateNavigationButtons() {
      if (this.chatNavButton && this.voiceNavButton) {
        // Update chat button
        this.chatNavButton.style.color =
          this.currentMode === "chat" ? "#111827" : "#6b7280";
        this.chatNavButton.style.borderBottom =
          this.currentMode === "chat"
            ? "2px solid #000"
            : "2px solid transparent";

        // Update voice button
        this.voiceNavButton.style.color =
          this.currentMode === "voice" ? "#111827" : "#6b7280";
        this.voiceNavButton.style.borderBottom =
          this.currentMode === "voice"
            ? "2px solid #000"
            : "2px solid transparent";
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
