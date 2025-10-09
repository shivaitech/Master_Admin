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
      chatHeight: "60vh",
      chatWidth: "380px",
      animationType: "slide",
    },
    content: {
      welcomeMessage:
        "ShivAI offers 24/7 voice support to handle your business calls efficiently and professionally.",
      placeholderText: "Type your message...",
      voiceGreeting: "Hello! I'm your AI Employee. How can I help?",
      privacyPolicyUrl: "https://shivai.com/privacy",
      companyName: "ShivAI Employee",
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

    async startCall() {
      try {
        const response = await fetch(
          `https://shivai-com-backend.onrender.com/api/v1/calls/start-call`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Start call API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.data) {
          return {
            callId: data.data.callId,
            status: data.data.status,
            startTime: data.data.startTime,
            pythonServiceUrl: data.data.pythonServiceUrl,
          };
        }
        throw new Error(data.message || "Failed to start call");
      } catch (error) {
        console.error("ShivAI Start Call API Error:", error);
        throw error;
      }
    }

    async endCall(callId) {
      try {
        if (!callId) {
          throw new Error("Call ID is required to end call");
        }

        const response = await fetch(
          `https://shivai-com-backend.onrender.com/api/v1/calls/end-call`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              callId: callId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`End call API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.data) {
          return {
            callId: data.data.callId,
            status: data.data.status,
            startTime: data.data.startTime,
            endTime: data.data.endTime,
            duration: data.data.duration,
          };
        }
        throw new Error(data.message || "Failed to end call");
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
      this.currentMode = "voice";
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
      this.currentCallId = null;
      this.pythonServiceUrl = null;
      this.webSocket = null;
      this.isWebSocketConnected = false;
      // Audio capture/streaming state (AudioContext + PCM16 pipeline)
      this.mediaStream = null; // getUserMedia stream
      this.audioContext = null; // Web Audio context
      this.audioProcessor = null; // ScriptProcessorNode
      this.audioSource = null; // MediaStreamAudioSourceNode
      this.hasStartedCapture = false; // guard to avoid duplicate start
      this.isPlayingAudio = false; // AI audio playback state
      this.audioChunksQueue = []; // queued AI audio chunks (base64)
      this.currentAudio = null; // currently playing Audio element
      this.currentAiTranscript = ""; // build up streamed AI text

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

    async connectToWebSocket(pythonServiceUrl) {

      try {
        console.log("Connecting to Python service:", pythonServiceUrl);

        // Close existing connection if any
        if (this.webSocket) {
          this.webSocket.close();
        }

        // Create new WebSocket connection
        this.webSocket = new WebSocket(pythonServiceUrl);
        // Prefer binary as Blob; we also handle strings
        try {
          this.webSocket.binaryType = "blob";
        } catch (_) {}

        // WebSocket event handlers
        this.webSocket.onopen = () => {
          console.log("✅ WebSocket connected to Python service");
          this.isWebSocketConnected = true;

          // Update UI to show connected state
          if (this.callStatus) {
            this.callStatus.textContent = "Connected to voice service";
            this.callStatus.style.color = "#10b981";
          }

          // Send initial handshake with call ID
          this.sendWebSocketMessage({
            type: "handshake",
            callId: this.currentCallId,
            timestamp: new Date().toISOString(),
          });
          // Wait for handshake_response before starting mic streaming
          // Fallback: if no handshake_response arrives, start capture after a short delay
          setTimeout(() => {
            if (this.isWebSocketConnected && !this.hasStartedCapture) {
              console.warn(
                "⏳ No handshake_response received, starting capture fallback"
              );
              this.startAudioCapture().catch((err) => {
                console.error(
                  "❌ Failed to start audio capture (fallback):",
                  err
                );
                if (this.callStatus) {
                  this.callStatus.textContent = "Mic streaming error";
                  this.callStatus.style.color = "#ef4444";
                }
              });
            }
          }, 1500);
        };

        this.webSocket.onmessage = (event) => {
          const payload = event.data;
          try {
            if (typeof payload === "string") {
              // Try to parse JSON; log raw preview
              const preview =
                payload.length > 200 ? payload.slice(0, 200) + "…" : payload;
              console.log("📩 Received (text) from Python service:", preview);
              try {
                const data = JSON.parse(payload);
                this.handleWebSocketMessage(data);
              } catch (e) {
                console.warn("⚠️ Non-JSON text message from server, ignoring.");
              }
            } else if (payload instanceof Blob) {
              console.log(
                "📩 Received (blob) from Python service:",
                payload.type || "unknown",
                payload.size,
                "bytes"
              );
              // If it's audio, queue it; else try to parse as text JSON
              if ((payload.type || "").startsWith("audio")) {
                payload
                  .arrayBuffer()
                  .then((buf) => {
                    const b64 = this.arrayBufferToBase64(buf);
                    this.audioChunksQueue.push(b64);
                    if (!this.isPlayingAudio) this.playQueuedAudio();
                  })
                  .catch((err) =>
                    console.error("❌ Error reading audio blob:", err)
                  );
              } else {
                payload.text().then((text) => {
                  try {
                    const data = JSON.parse(text);
                    this.handleWebSocketMessage(data);
                  } catch (_) {
                    console.warn("⚠️ Blob text not JSON, ignoring.");
                  }
                });
              }
            } else if (payload instanceof ArrayBuffer) {
              console.log(
                "📩 Received (arraybuffer) from Python service:",
                payload.byteLength,
                "bytes"
              );
              // Treat as audio binary
              const b64 = this.arrayBufferToBase64(payload);
              this.audioChunksQueue.push(b64);
              if (!this.isPlayingAudio) this.playQueuedAudio();
            } else {
              console.warn("⚠️ Unknown WS payload type:", typeof payload);
            }
          } catch (error) {
            console.error("❌ Error handling WebSocket message:", error);
          }
        };

        this.webSocket.onclose = (event) => {
          console.log(
            "🔌 WebSocket connection closed:",
            event.code,
            event.reason
          );
          this.isWebSocketConnected = false;

          // Update UI
          if (this.callStatus && this.isCallActive) {
            this.callStatus.textContent = "Voice service disconnected";
            this.callStatus.style.color = "#f59e0b";
          }
        };

        this.webSocket.onerror = (error) => {
          console.error("❌ WebSocket error:", error);
          this.isWebSocketConnected = false;

          // Update UI
          if (this.callStatus) {
            this.callStatus.textContent = "Voice service error";
            this.callStatus.style.color = "#ef4444";
          }
        };
      } catch (error) {
        console.error("❌ Failed to connect to WebSocket:", error);
        throw error;
      }
    }

    sendWebSocketMessage(data) {
      if (this.webSocket && this.isWebSocketConnected) {
        this.webSocket.send(JSON.stringify(data));
        console.log("📤 Sent to Python service:", data);
      } else {
        console.warn("⚠️ WebSocket not connected, message not sent:", data);
      }
    }

    handleWebSocketMessage(data) {
      switch (data.type) {
        case "handshake_response":
          console.log("🤝 Handshake confirmed with Python service");
          // Start audio capture now that backend is ready
          this.startAudioCapture().catch((err) => {
            console.error("❌ Failed to start audio capture:", err);
            if (this.callStatus) {
              this.callStatus.textContent = "Mic streaming error";
              this.callStatus.style.color = "#ef4444";
            }
          });
          break;

        // Legacy/alt type: WAV audio
        case "audio_data":
          console.log("🔊 Received audio data from AI (wav)");
          this.playAudioResponse(data.audio);
          break;

        // Streaming audio chunks (e.g., MPEG) per testCall.js
        case "audio_chunk":
          if (data.audio) {
            this.audioChunksQueue.push(data.audio);
            if (!this.isPlayingAudio) {
              this.playQueuedAudio();
            }
          }
          break;
        case "audio_complete":
          console.log("🎶 AI audio streaming completed");
          break;

        case "transcription":
          // Handle speech-to-text result
          console.log("📝 Transcription received:", data.text);
          this.handleTranscription(data.text);
          break;

        case "user_transcript":
          console.log("🗣️ User transcript:", data.text);
          this.handleTranscription(data.text);
          break;
        case "ai_transcript":
          console.log("🤖 AI transcript complete:", data.text);
          // Optionally display the final AI text somewhere
          break;
        case "ai_text_delta":
          this.currentAiTranscript += data.text || "";
          break;

        case "speech_started":
          if (this.callStatus) {
            this.callStatus.textContent = "Listening...";
            this.callStatus.style.color = "#10b981";
          }
          this.stopAudioPlayback();
          break;
        case "speech_stopped":
          if (this.callStatus) {
            this.callStatus.textContent = "Processing...";
            this.callStatus.style.color = "#f59e0b";
          }
          break;
        case "response_done":
          if (this.callStatus) {
            this.callStatus.textContent = "Connected - Speak now!";
            this.callStatus.style.color = "#10b981";
          }
          break;

        case "error":
          console.error("❌ Python service error:", data.message || data.error);
          if (this.callStatus) {
            this.callStatus.textContent = `Voice service error: ${
              data.message || data.error || ""
            }`.trim();
            this.callStatus.style.color = "#ef4444";
          }
          break;

        default:
          console.log("📩 Unknown message type:", data.type, data);
      }
    }

    disconnectWebSocket() {
      if (this.webSocket) {
        console.log("🔌 Disconnecting from Python service");
        this.webSocket.close();
        this.webSocket = null;
        this.isWebSocketConnected = false;
      }
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
          height: 60vh;
          max-height: 600px;
          min-height: 400px;
        }
        
        .shivai-widget-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
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
        
          .shivai-widget-messages {
            /* Fill available space equally with call interface */
            max-height: none !important;
            padding: 12px !important;
            -webkit-overflow-scrolling: touch !important;
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
        
        .shivai-neon-pulse {
          position: relative;
          overflow: visible;
        }
        
        .shivai-neon-pulse::before,
        .shivai-neon-pulse::after {
          content: "";
          position: absolute;
          inset: -4px;
          border: 2px solid rgba(107, 114, 128, 0.6);
          border-radius: 50%;
          animation: neonPulseOut 2s ease-out infinite;
          opacity: 0;
          pointer-events: none;
        }
        
        .shivai-neon-pulse::after {
          animation-delay: 1s;
        }
        
        @keyframes neonPulseOut {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes livePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
        }
        
        @keyframes bubbleSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-50%) translateX(15px) scale(0.7);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-50%) translateX(-2px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(-50%) translateX(0) scale(1);
          }
        }
        
        @keyframes bubbleSlideOut {
          0% {
            opacity: 1;
            transform: translateY(-50%) translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50%) translateX(10px) scale(0.8);
          }
        }
        
        .shivai-message-bubble {
          cursor: pointer;
        }
        
        @keyframes typingCursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @media (max-width: 768px) {
          .shivai-widget-chat {
            width: calc(100vw - 16px) !important;
            max-width: 400px !important;
            height: auto !important;
            max-height: 75vh !important;
            min-height: 300px !important;
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
            max-height: 25vh !important;
            padding: 12px !important;
          }
          
          .shivai-widget-message {
            margin-bottom: 12px !important;
          }
          
          .shivai-widget-header {
            padding: 20px 16px 16px !important;
            border-radius: 16px 16px 0 0 !important;
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
          
          /* Mobile call controls at bottom of unified interface */
          .shivai-widget-chat .shivai-call-button {
            width: 56px !important;
            height: 56px !important;
            touch-action: manipulation !important;
          }
          
          /* Mobile unified interface adjustments */
          .shivai-widget-messages {
            max-height: 30vh !important;
            padding: 12px !important;
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
        
        @media (max-width: 640px) and (min-width: 420px) {
          .shivai-widget-chat {
            width: calc(100vw - 16px) !important;
            max-width: 400px !important;
            height: auto !important;
            max-height: 80vh !important;
            min-height: 320px !important;
            bottom: 50px !important;
            border-radius: 16px !important;
          }
          
          .shivai-widget-button {
            width: 54px !important;
            height: 54px !important;
          }
          
          .shivai-widget-messages {
            max-height: none !important;
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
        
        /* iPhone and iOS specific optimizations */
        @supports (-webkit-touch-callout: none) {
          .shivai-widget-chat {
            -webkit-backdrop-filter: blur(10px) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-transform: translateZ(0) !important;
            transform: translateZ(0) !important;
          }
          
          .shivai-widget-input {
            -webkit-appearance: none !important;
            -webkit-border-radius: 12px !important;
          }
          
          .shivai-widget-button {
            -webkit-tap-highlight-color: transparent !important;
            -webkit-appearance: none !important;
          }
          
          .shivai-widget-chat * {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
          }
        }

        @media (max-width: 420px) {
          .shivai-widget-chat {
            width: calc(100vw - 16px) !important;
            max-width: 360px !important;
            
            height: auto !important;
            max-height: 70vh !important;
            min-height: 280px !important;
            left: 12px !important;
            right: 12px !important;
            bottom: 70px !important;
            border-radius: 16px !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          .shivai-widget-button {
            width: 52px !important;
            height: 52px !important;
            touch-action: manipulation !important;
          }
          
          .shivai-widget-messages {
            max-height: none !important;
            padding: 10px !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          .shivai-widget-header {
            padding: 16px 12px 12px !important;
            border-radius: 16px 16px 0 0 !important;
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
            font-size: 16px !important;
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
          class: "shivai-widget-button shivai-neon-pulse",
          style: {
            width: size,
            height: size,
            borderRadius: "50%",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            background:
              "linear-gradient(135deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%)",
            // border: "2px solid rgba(107, 114, 128, 0.3)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15)",
          },
        },
        [createIcon("phone", window.innerWidth <= 768 ? 26 : 24)]
      );

      // Create live message bubble
      this.createLiveMessageBubble();

      // Set trigger button position
      this.triggerButton.style.position = "relative";

      // Add hover and touch effects
      this.triggerButton.addEventListener("mouseover", () => {
        this.triggerButton.style.transform = "scale(1.1)";
        this.triggerButton.style.background =
          "linear-gradient(135deg, #6b7280 0%, #9ca3af 30%, #4b5563 70%, #374151 100%)";
        this.triggerButton.style.boxShadow =
          "0 12px 40px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.25)";
        this.triggerButton.style.borderColor = "rgba(107, 114, 128, 0.5)";
      });

      this.triggerButton.addEventListener("mouseout", () => {
        this.triggerButton.style.transform = "scale(1)";
        this.triggerButton.style.background =
          "linear-gradient(135deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%)";
        this.triggerButton.style.boxShadow =
          "0 8px 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15)";
        this.triggerButton.style.borderColor = "rgba(107, 114, 128, 0.3)";
      });

      this.triggerButton.addEventListener("touchstart", () => {
        this.triggerButton.style.transform = "scale(0.95)";
        this.triggerButton.style.background =
          "linear-gradient(135deg, #374151 0%, #4b5563 30%, #1f2937 70%, #111827 100%)";
        this.triggerButton.style.boxShadow =
          "0 4px 16px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.25)";
      });

      this.triggerButton.addEventListener("touchend", () => {
        setTimeout(() => {
          this.triggerButton.style.transform = "scale(1)";
          this.triggerButton.style.background =
            "linear-gradient(135deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%)";
          this.triggerButton.style.boxShadow =
            "0 8px 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15)";
        }, 100);
      });

      this.container.appendChild(this.triggerButton);
    }

    createLiveMessageBubble() {
      // Array of live messages
      this.liveMessages = [
        "👋 Welcome! Need instant support?",
        "💡 Ask me anything about your business.",
        "📞 Try our 24/7 AI-powered voice call!",
        "🤖 I'm your AI Employee. Ready to help!",
        "🚀 Fast answers, friendly service.",
        "🔔 Click to start a voice call now!",
        "💬 Prefer chat? I'm here for you.",
        "🌟 Trusted by businesses worldwide.",
        "🕒 Available anytime, anywhere.",
        "🙋 How can I assist you today?"
      ];
      
      this.currentMessageIndex = 0;
      
      // Create the bubble container
      this.messageBubble = createElement("div", {
        class: "shivai-message-bubble",
        style: {
          position: "absolute",
          right: "70px", // Position to the left of the trigger button
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#ffffff",
          color: "#374151",
          padding: "8px 12px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          opacity: "0",
          visibility: "hidden",
          transition: "all 0.3s ease",
          zIndex: "10000",
          border: "1px solid #e5e7eb",
          maxWidth: "160px",
        },
      });

      // Create the bubble tail (pointing to the trigger button)
      const bubbleTail = createElement("div", {
        style: {
          position: "absolute",
          right: "-6px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "0",
          height: "0",
          borderTop: "6px solid transparent",
          borderBottom: "6px solid transparent",
          borderLeft: "6px solid #ffffff",
        },
      });

      this.messageBubble.appendChild(bubbleTail);
      this.container.appendChild(this.messageBubble);

      // Add click event to bubble
      this.messageBubble.addEventListener("click", () => {
        this.toggleWidget();
      });

      // Add hover effects to bubble
      this.messageBubble.addEventListener("mouseover", () => {
        this.messageBubble.style.transform = "translateY(-50%) scale(1.05)";
        this.messageBubble.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
      });

      this.messageBubble.addEventListener("mouseout", () => {
        this.messageBubble.style.transform = "translateY(-50%) scale(1)";
        this.messageBubble.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
      });

      // Start the live message rotation
      this.startLiveMessages();
    }

    startLiveMessages() {
      // Show first message after 3 seconds
      setTimeout(() => {
        this.showNextMessage();
      }, 3000);

      // Set interval to rotate messages
      this.messageInterval = setInterval(() => {
        this.showNextMessage();
      }, 8000); // Show new message every 8 seconds
    }

    showNextMessage() {
      if (!this.isOpen) { // Only show if widget is closed
        const message = this.liveMessages[this.currentMessageIndex];
        
        // Clear the bubble first
        this.messageBubble.innerHTML = '';
        
        // Create the bubble tail
        const bubbleTail = createElement("div", {
          style: {
            position: "absolute",
            right: "-6px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "0",
            height: "0",
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "6px solid #ffffff",
          },
        });
        
        // Create empty message container
        const messageEl = createElement("span", {
          style: {
            opacity: "0",
          }
        });
        
        this.messageBubble.appendChild(messageEl);
        this.messageBubble.appendChild(bubbleTail);
        
        // Show bubble first with slide-in animation
        this.messageBubble.style.visibility = "visible";
        this.messageBubble.style.animation = "bubbleSlideIn 0.4s ease-out forwards";
        
        // Wait for bubble animation to complete, then start typing
        setTimeout(() => {
          messageEl.style.opacity = "1";
          this.typeMessage(message, messageEl);
        }, 400); // Start typing after bubble slide-in completes
        
        // Hide bubble after 5 seconds (increased to account for typing time)
        setTimeout(() => {
          this.hideBubble();
        }, 5000);
        
        // Move to next message
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.liveMessages.length;
      }
    }

    typeMessage(message, messageEl) {
      let i = 0;
      messageEl.textContent = ''; // Start with empty text
      
      // Add typing cursor effect
      const cursor = createElement("span", {
        style: {
          opacity: "1",
          animation: "typingCursor 1s infinite",
          marginLeft: "2px",
        }
      }, ['|']);
      
      messageEl.appendChild(cursor);
      
      const typeInterval = setInterval(() => {
        if (i < message.length) {
          // Remove cursor, add character, then re-add cursor
          messageEl.removeChild(cursor);
          messageEl.textContent = message.substring(0, i + 1);
          messageEl.appendChild(cursor);
          i++;
        } else {
          // Remove cursor when typing is done
          clearInterval(typeInterval);
          setTimeout(() => {
            if (messageEl.contains(cursor)) {
              messageEl.removeChild(cursor);
            }
          }, 500); // Keep cursor for a bit then remove
        }
      }, 60); // Slightly slower typing for better effect
    }

    hideBubble() {
      this.messageBubble.style.animation = "bubbleSlideOut 0.3s ease-in forwards";
      setTimeout(() => {
        this.messageBubble.style.visibility = "hidden";
      }, 300);
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
          padding: "16px 16px 20px",
          background: "#fff",
          borderRadius: "16px 16px 0 0",
        },
      });

      // Close button
      this.closeButton = createElement(
        "button",
        {
          style: {
            position: "absolute",
            top: "8px",
            right: "8px",
            fontSize: "1.2vw",
          },
        },
        ["×"]
      );

      this.closeButton.addEventListener("mouseover", () => {
        this.closeButton.style.background = "#f3f4f6";
        this.closeButton.style.color = "#374151";
      });

      this.closeButton.addEventListener("mouseout", () => {
        this.closeButton.style.background = "transparent";
        this.closeButton.style.color = "#9ca3af";
      });

      // Add touch events for better mobile responsiveness
      this.closeButton.addEventListener("touchstart", () => {
        this.closeButton.style.background = "rgba(239, 68, 68, 0.1)";
        this.closeButton.style.color = "#dc2626";
        this.closeButton.style.borderColor = "#fecaca";
      });

      this.closeButton.addEventListener("touchend", () => {
        setTimeout(() => {
          this.closeButton.style.background = "rgba(255, 255, 255, 0.9)";
          this.closeButton.style.color = "#6b7280";
          this.closeButton.style.borderColor = "#e5e7eb";
        }, 100);
      });

      // Avatar/Logo (no background)
      const avatar = createElement("div", {
        style: {
          width: "80px",
          height: "80px",
          margin: "0 auto 8px",
          borderRadius: "0",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#111827",
          border:"1.4px solid #e5e7eb",
          borderRadius:"50%",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          padding: "8px",
        },
      });

      // Insert ShivAI company logo as avatar
      avatar.innerHTML = `
        <svg viewBox="0 0 94 29" xmlns="http://www.w3.org/2000/svg" aria-label="ShivAI Logo" width="64" height="auto">
          <g clip-path="url(#clip0_302_587_avatar)">
            <path d="M19.9124 3.47757C19.1031 2.88384 15.8286 0.624395 11.3008 1.09206C9.13407 1.31573 7.41793 2.08839 6.23291 2.80494C5.06252 3.51254 4.04016 4.46008 3.35452 5.64348C2.36795 7.34578 2.05807 9.32381 2.57372 11.1579C2.90068 12.3193 3.50011 13.2148 4.08896 13.8663C4.65097 14.4885 5.32767 14.996 6.06129 15.4027C8.15725 16.5674 10.2532 17.7312 12.3492 18.8959C13.3235 19.5108 13.8693 20.599 13.7457 21.6889C13.7367 21.7711 13.7237 21.85 13.7074 21.9272C13.4756 23.0521 12.4549 23.8353 11.3081 23.902C10.607 23.9427 9.79856 23.9248 8.91609 23.7841C6.10277 23.3359 4.17111 21.9069 3.27237 21.1375C2.18657 22.8536 1.09996 24.5697 0.0141602 26.2859C1.14957 27.0789 2.68271 27.976 4.61112 28.6714C8.02956 29.9052 11.0674 29.9223 12.9315 29.7767C13.57 29.7019 16.6029 29.2781 18.8079 26.5762C18.912 26.4485 19.0104 26.32 19.1047 26.1915C21.3715 23.074 20.9868 18.7089 18.3003 15.946C18.2759 15.9208 18.2515 15.8955 18.2263 15.8703C16.8363 14.4657 15.3235 13.6247 14.0767 13.1172C12.4956 12.4747 10.982 11.6768 9.59767 10.678C9.53423 10.6325 9.47079 10.5869 9.40816 10.5414C8.62248 9.97447 8.40858 8.89762 8.91772 8.07372C9.51145 7.12374 10.7323 6.63737 12.0019 6.85209C12.6704 6.80898 13.7367 6.82281 14.9689 7.20101C16.2166 7.58409 17.1145 8.1827 17.6456 8.5975C18.402 6.89113 19.1584 5.18394 19.9148 3.47757H19.9124Z" fill="currentColor"/>
            <path d="M38.2895 14.2557C37.9755 13.893 37.6055 13.5327 37.1703 13.1943C35.7722 12.1093 34.2781 11.7067 33.1224 11.5742C31.8658 11.431 30.5856 11.636 29.4518 12.1947C29.4453 12.198 29.4388 12.2012 29.4315 12.2045C28.3628 12.7348 27.6088 13.4074 27.1273 13.9206V0.160645H21.251V29.3113H27.1273V18.7022C27.8992 16.9617 29.6389 15.9889 31.2355 16.2785C31.5242 16.3305 31.7869 16.4208 32.0252 16.5347C33.1736 17.0845 33.8536 18.2988 33.8536 19.5725V29.3121H39.8462V18.5721C39.8462 16.9958 39.3208 15.4481 38.2895 14.2565V14.2557Z" fill="currentColor"/>
            <path d="M46.9394 11.9143H40.8882V29.3115H46.9394V11.9143Z" fill="currentColor"/>
            <path d="M64.5132 21.1113C63.3941 23.8449 62.2749 26.5777 61.1558 29.3114H68.0219L70.1163 23.7839C69.3891 23.2512 68.4562 22.6591 67.3159 22.1264C66.283 21.6441 65.3249 21.326 64.5124 21.1113H64.5132Z" fill="currentColor"/>
            <path d="M90.3039 8.36483C92.3284 8.36483 93.9696 6.72364 93.9696 4.69914C93.9696 2.67463 92.3284 1.03345 90.3039 1.03345C88.2794 1.03345 86.6382 2.67463 86.6382 4.69914C86.6382 6.72364 88.2794 8.36483 90.3039 8.36483Z" fill="currentColor"/>
            <path d="M43.9137 8.36483C45.9382 8.36483 47.5794 6.72364 47.5794 4.69914C47.5794 2.67463 45.9382 1.03345 43.9137 1.03345C41.8892 1.03345 40.248 2.67463 40.248 4.69914C40.248 6.72364 41.8892 8.36483 43.9137 8.36483Z" fill="currentColor"/>
            <path d="M64.5994 20.9152L72.3748 1.80029H78.1601L85.8428 20.9152C84.7123 20.8713 81.4272 20.5907 78.8384 18.0767C76.7237 16.0231 76.1324 13.5074 75.9006 12.5208C75.8616 12.3533 75.8396 12.2337 75.7941 11.9971C75.4012 9.94339 75.3785 8.43953 75.3565 5.76692C75.3386 3.55221 75.3329 2.0817 75.3199 2.0817C75.3045 2.0817 75.2931 4.19718 75.2182 6.2541C75.1825 7.2358 75.1377 8.10932 75.1377 8.10932C75.1125 8.58105 75.0938 8.8405 75.0743 9.27401C74.9954 11.0259 75.0027 11.0471 74.9572 11.3252C74.7555 12.5688 73.8771 16.7738 70.2024 19.1959C67.956 20.6769 65.6933 20.8892 64.5969 20.9161L64.5994 20.9152Z" fill="currentColor"/>
            <path d="M85.8793 21.1699C85.3612 21.2048 84.7682 21.291 84.1298 21.4692C82.264 21.9905 80.9797 23.0283 80.2656 23.7213C80.8716 25.5472 81.4775 27.374 82.0834 29.1999H93.2375V20.9153L87.3132 21.169L87.3595 25.0568L85.8784 21.169L85.8793 21.1699Z" fill="currentColor"/>
            <path d="M87.3604 12.2607H93.2383V21.1114L87.3604 20.8731V12.2607Z" fill="currentColor"/>
            <path d="M57.9853 20.7748C59.795 20.8146 61.6038 20.8545 63.4135 20.8943C64.8945 17.9907 66.3748 15.0871 67.8559 12.1835L61.3395 11.9143L57.3826 21.3986H56.9174L52.7279 11.9143H46.8516V14.1835L54.8808 29.3115H59.128C60.5204 26.5779 61.9137 23.8451 63.3061 21.1115C61.5322 20.9992 59.7583 20.887 57.9845 20.7748H57.9853Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_302_587_avatar">
              <rect width="94" height="29" fill="white"/>
            </clipPath>
          </defs>
        </svg>`;

      // Title
      const title = createElement(
        "h3",
        {
          style: {
            fontSize: "18px",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 4px 0",
            letterSpacing: "-0.01em",
          },
        },
        ["AI Employee"]
      );

      // Description
      const description = createElement(
        "p",
        {
          style: {
            fontSize: "14px",
            color: "#6b7280",
            margin: "0 0 20px 0",
            lineHeight: "1.4",
          },
        },
        [
          "ShivAI offers 24/7 voice support to handle your business calls efficiently and professionally.",
        ]
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
        // class: "shivai-widget-button",
        style: {
          width: "100%",
          color: "white",
          fontWeight: "500",
          borderRadius: "50px",
          padding: "12px",
          marginBottom: "12px",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          transition: "all 0.2s",
          webkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          webkitUserSelect: "none",
          userSelect: "none",
          background:
            "linear-gradient(135deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          cursor: "pointer",
          borderColor: "rgba(255, 255, 255, 0.15)",
        },
      });

      this.updateStartButton();

      // Privacy text
      const privacyText = createElement("p", {
        style: {
          fontSize: "12px",
          color: "#9ca3af",
          margin: "0 0 16px 0",
          lineHeight: "1.4",
          textAlign: "center",
        },
      });

      const privacyContent = document.createTextNode(
        "By using this service you agree to our"
      );

      const privacyLink = createElement(
        "span",
        {
          style: {
            color: "#2563eb",
            cursor: "pointer",
            textDecoration: "underline",
          },
        },
        ["Privacy policy"]
      );

      const andText = document.createTextNode(" & ");

      const tcLink = createElement(
        "span",
        {
          style: {
            color: "#2563eb",
            cursor: "pointer",
            textDecoration: "underline",
          },
        },
        ["T&C"]
      );

      privacyText.appendChild(privacyContent);
      privacyText.appendChild(tcLink);

      // Bottom navigation (Chat/Voice Call selection)
      const bottomNav = createElement("div", {
        style: {
          display: "flex", // Show navigation for mode selection
          gap: "0px",
          padding: "0px",
          background: "transparent",
          margin: "8px 0 0px 0",
        },
      });

      this.chatNavButton = createElement("button", {
        style: {
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 12px 12px 12px",
          border: "none",
          cursor: "pointer",
          color: this.currentMode === "chat" ? "#111827" : "#6b7280",
          background: "transparent",
          borderBottom: this.currentMode === "chat" ? "2px solid #000" : "2px solid transparent",
          transition: "all 0.3s ease",
          fontWeight: this.currentMode === "chat" ? "600" : "400",
          fontSize: "14px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      });

      const chatIcon = createIcon("message-circle", 20);
      chatIcon.style.marginRight = "6px";
      chatIcon.style.strokeWidth = "2";

      const chatLabel = createElement(
        "span",
        {
          style: {
            fontSize: "14px",
            fontWeight: "inherit",
            lineHeight: "1.2",
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
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 12px 12px 12px",
          border: "none",
          cursor: "pointer",
          color: this.currentMode === "voice" ? "#111827" : "#6b7280",
          background: "transparent",
          borderBottom: this.currentMode === "voice" ? "2px solid #000" : "2px solid transparent",
          transition: "all 0.3s ease",
          fontWeight: this.currentMode === "voice" ? "600" : "400",
          fontSize: "14px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      });

      const voiceIcon = createIcon("phone", 20);
      voiceIcon.style.marginRight = "6px";
      voiceIcon.style.strokeWidth = "2";

      const voiceLabel = createElement(
        "span",
        {
          style: {
            fontSize: "14px",
            fontWeight: "inherit",
            lineHeight: "1.2",
          },
        },
        ["Voice Call"]
      );
      this.voiceNavButton.appendChild(voiceIcon);
      this.voiceNavButton.appendChild(voiceLabel);

      // Add event listeners for mode switching
      this.chatNavButton.addEventListener("click", () => {
        console.log(
          "💬 Chat nav button clicked! Current mode:",
          this.currentMode
        );
        if (this.currentMode !== "chat") {
          this.currentMode = "chat";
          console.log("💬 Switched to chat mode");
          this.updateNavigationButtons();
          this.updateStartButton();
        }
      });

      this.voiceNavButton.addEventListener("click", () => {
        console.log(
          "🔊 Voice nav button clicked! Current mode:",
          this.currentMode
        );
        if (this.currentMode !== "voice") {
          this.currentMode = "voice";
          console.log("🔊 Switched to voice mode");
          this.updateNavigationButtons();
          this.updateStartButton();
        }
      });

      bottomNav.appendChild(this.chatNavButton);
      bottomNav.appendChild(this.voiceNavButton);
      
      // Add divider line after navigation
      const divider = createElement("div", {
        style: {
          width: "100%",
          height: "1px",
          backgroundColor: "#e5e7eb",
          margin: "12px 0 1px 0",
        },
      });

      this.header.appendChild(this.startButton);
      this.header.appendChild(privacyText);
      this.header.appendChild(bottomNav);
      // this.header.appendChild(divider);
    }

    updateStartButton() {
      console.log(
        "🔄 updateStartButton() - currentMode:",
        this.currentMode,
        "isCallActive:",
        this.isCallActive
      );
      this.startButton.innerHTML = "";

      if (this.currentMode === "chat") {
        const icon = createIcon("message-circle", 20);
        icon.style.marginRight = "8px";
        this.startButton.appendChild(icon);
        this.startButton.appendChild(document.createTextNode("Start Chat"));
        console.log("🔄 Button text set to: Start Chat");
      } else {
        const icon = createIcon("phone", 20);
        icon.style.marginRight = "8px";
        this.startButton.appendChild(icon);
        const buttonText = this.isCallActive ? "End Call" : "Start Call";
        this.startButton.appendChild(document.createTextNode(buttonText));
        console.log("🔄 Button text set to:", buttonText);
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

      this.createUnifiedInterface();

      this.chatInterface.appendChild(this.body);
    }

    createUnifiedInterface() {
      // Create unified container that shows both call status and transcript
      this.unifiedMode = createElement("div", {
        style: {
          display: this.hasStarted ? "flex" : "none",
          flexDirection: "column",
          height: "100%",
        },
      });

      // Header with AI status (improved design)
      this.unifiedHeader = createElement("div", {
        style: {
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderRadius: "16px 16px 0 0",
        },
      });

      // Left side - AI info and status
      const aiInfo = createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
        },
      });

      const aiAvatar = createElement("div", {
        style: {
          width: "24px",
          height: "24px",
          borderRadius: "0",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#111827",
        },
      });
      
      aiAvatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-label="Avatar">
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z"/>
        </svg>`;

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
        ["ShivAI Employee"]
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
      this.aiStatus.appendChild(document.createTextNode("Call in Progress"));

      aiDetails.appendChild(aiName);
      aiDetails.appendChild(this.aiStatus);
      aiInfo.appendChild(aiAvatar);
      aiInfo.appendChild(aiDetails);

      // Right side - Call controls (speaker and end call icons)
      this.headerCallControls = createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
        },
      });

      // Speaker/Mute button in header
      this.headerMuteButton = createElement("button", {
        style: {
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          border: "1px solid #e5e7eb",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        },
      });

      // End call button in header
      this.headerEndCallButton = createElement("button", {
        style: {
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#dc2626",
          border: "1px solid #b91c1c",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          transition: "all 0.2s",
        },
      });

      // Add icons to header buttons
      this.updateHeaderMuteButton();
      const headerEndIcon = createIcon("phone", 14);
      headerEndIcon.style.transform = "rotate(135deg)";
      this.headerEndCallButton.appendChild(headerEndIcon);

      this.headerCallControls.appendChild(this.headerMuteButton);
      this.headerCallControls.appendChild(this.headerEndCallButton);

      this.unifiedHeader.appendChild(aiInfo);
      this.unifiedHeader.appendChild(this.headerCallControls);

      // Transcript/Messages container (improved spacing)
      this.messagesContainer = createElement("div", {
        class: "shivai-widget-messages",
        style: {
          flex: "1",
          padding: "12px 16px",
          backgroundColor: "#f9fafb",
          overflowY: "auto",
          minHeight: "200px",
        },
      });

      // Input container (hidden during call, shown after call ends)
      this.inputContainer = createElement("div", {
        class: "shivai-widget-input-container",
        style: {
          padding: "12px 16px",
          borderTop: "1px solid #e2e8f0",
          display: "none", // Hidden during call
          gap: "8px",
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
          style: {
            padding: "8px",
            width: "36px",
            height: "36px",
            color: "white",
            backgroundColor: "#3b82f6",
            borderRadius: "8px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: "0",
          },
        },
        [createIcon("send", 18)]
      );

      this.inputContainer.appendChild(this.messageInput);
      this.inputContainer.appendChild(this.sendButton);

      // Call timer at bottom center
      this.callTimerContainer = createElement("div", {
        style: {
          padding: "8px 16px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });

      this.callTimer = createElement("div", {
        style: {
          fontSize: "16px",
          color: "#111827",
          fontWeight: "600",
          fontFamily: "monospace",
        },
      });

      this.callTimerContainer.appendChild(this.callTimer);

      // Back to main UI button (in footer)
      this.backToMainContainer = createElement("div", {
        style: {
          padding: "8px 16px",
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Space between back button and powered by text
        },
      });

      this.backToMainButton = createElement("button", {
        style: {
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          display: "none", // Hidden by default, show only in call interface
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          transition: "all 0.2s ease",
          padding: "4px",
          width: "20px",
          height: "20px",
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
        },
      });

      // Add just the back arrow SVG (no text)
      this.backToMainButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4" 
                d="M44 40.836q-7.34-8.96-13.036-10.168t-10.846-.365V41L4 23.545L20.118 7v10.167q9.523.075 16.192 6.833q6.668 6.758 7.69 16.836Z" 
                clip-rule="evenodd"/>
        </svg>`;

      this.backToMainButton.addEventListener("mouseover", () => {
        this.backToMainButton.style.color = "#111827";
        this.backToMainButton.style.transform = "scale(1.1)";
      });

      this.backToMainButton.addEventListener("mouseout", () => {
        this.backToMainButton.style.color = "#6b7280";
        this.backToMainButton.style.transform = "scale(1)";
      });

      this.backToMainContainer.appendChild(this.backToMainButton);

      // Assemble unified interface
      this.unifiedMode.appendChild(this.unifiedHeader);
      this.unifiedMode.appendChild(this.messagesContainer);
      this.unifiedMode.appendChild(this.inputContainer);
      this.unifiedMode.appendChild(this.callTimerContainer);

      this.body.appendChild(this.unifiedMode);
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
          gap: "6px",
        },
      });

      const aiAvatar = createElement("div", {
        style: {
          width: "24px",
          height: "24px",
          borderRadius: "0",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#111827",
        },
      });
      // Inline sparkle SVG without background for chat header avatar
      aiAvatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-label="Avatar">
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z"/>
        </svg>`;

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
        ["ShivAI Employee"]
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
          class: "",
          style: {
            padding: "2px",
            width: "32px",
            height: "32px",
            color: "black",
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
          width: "24px",
          height: "24px",
          borderRadius: "0",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#111827",
        },
      });
      // Inline sparkle SVG without background for chat header avatar
      callAvatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-label="Avatar">
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z"/>
        </svg>`;

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
        ["ShivAI Employee"]
      );


      const phoneIcon = createIcon("phone", 16);
      callAvatar.appendChild(phoneIcon);

    
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

      // Calling interface icon (no background)
      const callIconWrapper = createElement("div", {
        style: {
          width: "auto",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "8px",
          color: "#111827",
        },
      });
      callIconWrapper.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="Calling">
          <path fill="currentColor" d="m20.713 7.128l-.246.566a.506.506 0 0 1-.934 0l-.246-.566a4.36 4.36 0 0 0-2.22-2.25l-.759-.339a.53.53 0 0 1 0-.963l.717-.319A4.37 4.37 0 0 0 19.276.931L19.53.32a.506.506 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.718.32a.53.53 0 0 1 0 .962l-.76.338a4.36 4.36 0 0 0-2.219 2.251M8.5 6h-2v12h2zM4 10H2v4h2zm9-8h-2v20h2zm4.5 6h-2v10h2zm4.5 2h-2v4h2z"/>
        </svg>`;
      const callIconSvg = callIconWrapper.querySelector('svg');
      if (callIconSvg) {
        callIconSvg.style.width = '56px';
        callIconSvg.style.height = '56px';
        callIconSvg.setAttribute('focusable', 'false');
        callIconSvg.setAttribute('role', 'img');
      }

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
        ["ShivAI Employee"]
      );

      this.callStatus = createElement(
        "p",
        {
          style: {
            margin: "0 0 8px 0",
            fontSize: "14px",
            color: "#6b7280",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease",
          },
        },
        ["Ready to call"]
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

  callContent.appendChild(callIconWrapper);
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
      const icon = createIcon(this.isMuted ? "volume-x" : "volume-2", 16);
      icon.style.color = this.isMuted ? "#dc2626" : "#6b7280";
      this.muteButton.appendChild(icon);
      this.muteButton.style.backgroundColor = this.isMuted
        ? "#fef2f2"
        : "#f3f4f6";
    }

    updateHeaderMuteButton() {
      this.headerMuteButton.innerHTML = "";
      const icon = createIcon(this.isMuted ? "volume-x" : "volume-2", 14);
      icon.style.color = this.isMuted ? "#dc2626" : "#6b7280";
      this.headerMuteButton.appendChild(icon);
      this.headerMuteButton.style.backgroundColor = this.isMuted
        ? "#fef2f2"
        : "#f3f4f6";
    }

    createFooter() {
      this.footer = createElement("div", {
        style: {
          // borderTop: "1px solid #e5e7eb",
          background: "#fff",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
      });

      if (this.config.features.showBranding) {
        const brandingContainer = createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
          },
        });

        const link = createElement(
          "a",
          {
            href: "https://shivai-calling-frontend-38ax.vercel.app/landing",
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
              const wrapper = document.createElement("span");
              wrapper.style.display = "inline-flex";
              wrapper.style.alignItems = "center";
              wrapper.style.marginLeft = "0px";
              wrapper.style.lineHeight = "0";
              // Inline SVG logo provided by user
              wrapper.innerHTML = `
                <svg viewBox="0 0 94 29" xmlns="http://www.w3.org/2000/svg" aria-label="ShivAI">
                  <g clip-path="url(#clip0_302_587)">
                    <path d="M19.9124 3.47757C19.1031 2.88384 15.8286 0.624395 11.3008 1.09206C9.13407 1.31573 7.41793 2.08839 6.23291 2.80494C5.06252 3.51254 4.04016 4.46008 3.35452 5.64348C2.36795 7.34578 2.05807 9.32381 2.57372 11.1579C2.90068 12.3193 3.50011 13.2148 4.08896 13.8663C4.65097 14.4885 5.32767 14.996 6.06129 15.4027C8.15725 16.5674 10.2532 17.7312 12.3492 18.8959C13.3235 19.5108 13.8693 20.599 13.7457 21.6889C13.7367 21.7711 13.7237 21.85 13.7074 21.9272C13.4756 23.0521 12.4549 23.8353 11.3081 23.902C10.607 23.9427 9.79856 23.9248 8.91609 23.7841C6.10277 23.3359 4.17111 21.9069 3.27237 21.1375C2.18657 22.8536 1.09996 24.5697 0.0141602 26.2859C1.14957 27.0789 2.68271 27.976 4.61112 28.6714C8.02956 29.9052 11.0674 29.9223 12.9315 29.7767C13.57 29.7019 16.6029 29.2781 18.8079 26.5762C18.912 26.4485 19.0104 26.32 19.1047 26.1915C21.3715 23.074 20.9868 18.7089 18.3003 15.946C18.2759 15.9208 18.2515 15.8955 18.2263 15.8703C16.8363 14.4657 15.3235 13.6247 14.0767 13.1172C12.4956 12.4747 10.982 11.6768 9.59767 10.678C9.53423 10.6325 9.47079 10.5869 9.40816 10.5414C8.62248 9.97447 8.40858 8.89762 8.91772 8.07372C9.51145 7.12374 10.7323 6.63737 12.0019 6.85209C12.6704 6.80898 13.7367 6.82281 14.9689 7.20101C16.2166 7.58409 17.1145 8.1827 17.6456 8.5975C18.402 6.89113 19.1584 5.18394 19.9148 3.47757H19.9124Z" fill="#333333"/>
                    <path d="M38.2895 14.2557C37.9755 13.893 37.6055 13.5327 37.1703 13.1943C35.7722 12.1093 34.2781 11.7067 33.1224 11.5742C31.8658 11.431 30.5856 11.636 29.4518 12.1947C29.4453 12.198 29.4388 12.2012 29.4315 12.2045C28.3628 12.7348 27.6088 13.4074 27.1273 13.9206V0.160645H21.251V29.3113H27.1273V18.7022C27.8992 16.9617 29.6389 15.9889 31.2355 16.2785C31.5242 16.3305 31.7869 16.4208 32.0252 16.5347C33.1736 17.0845 33.8536 18.2988 33.8536 19.5725V29.3121H39.8462V18.5721C39.8462 16.9958 39.3208 15.4481 38.2895 14.2565V14.2557Z" fill="#333333"/>
                    <path d="M46.9394 11.9143H40.8882V29.3115H46.9394V11.9143Z" fill="#333333"/>
                    <path d="M64.5132 21.1113C63.3941 23.8449 62.2749 26.5777 61.1558 29.3114H68.0219L70.1163 23.7839C69.3891 23.2512 68.4562 22.6591 67.3159 22.1264C66.283 21.6441 65.3249 21.326 64.5124 21.1113H64.5132Z" fill="#333333"/>
                    <path d="M90.3039 8.36483C92.3284 8.36483 93.9696 6.72364 93.9696 4.69914C93.9696 2.67463 92.3284 1.03345 90.3039 1.03345C88.2794 1.03345 86.6382 2.67463 86.6382 4.69914C86.6382 6.72364 88.2794 8.36483 90.3039 8.36483Z" fill="#333333"/>
                    <path d="M43.9137 8.36483C45.9382 8.36483 47.5794 6.72364 47.5794 4.69914C47.5794 2.67463 45.9382 1.03345 43.9137 1.03345C41.8892 1.03345 40.248 2.67463 40.248 4.69914C40.248 6.72364 41.8892 8.36483 43.9137 8.36483Z" fill="#333333"/>
                    <path d="M64.5994 20.9152L72.3748 1.80029H78.1601L85.8428 20.9152C84.7123 20.8713 81.4272 20.5907 78.8384 18.0767C76.7237 16.0231 76.1324 13.5074 75.9006 12.5208C75.8616 12.3533 75.8396 12.2337 75.7941 11.9971C75.4012 9.94339 75.3785 8.43953 75.3565 5.76692C75.3386 3.55221 75.3329 2.0817 75.3199 2.0817C75.3045 2.0817 75.2931 4.19718 75.2182 6.2541C75.1825 7.2358 75.1377 8.10932 75.1377 8.10932C75.1125 8.58105 75.0938 8.8405 75.0743 9.27401C74.9954 11.0259 75.0027 11.0471 74.9572 11.3252C74.7555 12.5688 73.8771 16.7738 70.2024 19.1959C67.956 20.6769 65.6933 20.8892 64.5969 20.9161L64.5994 20.9152Z" fill="#333333"/>
                    <path d="M85.8793 21.1699C85.3612 21.2048 84.7682 21.291 84.1298 21.4692C82.264 21.9905 80.9797 23.0283 80.2656 23.7213C80.8716 25.5472 81.4775 27.374 82.0834 29.1999H93.2375V20.9153L87.3132 21.169L87.3595 25.0568L85.8784 21.169L85.8793 21.1699Z" fill="#333333"/>
                    <path d="M87.3604 12.2607H93.2383V21.1114L87.3604 20.8731V12.2607Z" fill="#333333"/>
                    <path d="M57.9853 20.7748C59.795 20.8146 61.6038 20.8545 63.4135 20.8943C64.8945 17.9907 66.3748 15.0871 67.8559 12.1835L61.3395 11.9143L57.3826 21.3986H56.9174L52.7279 11.9143H46.8516V14.1835L54.8808 29.3115H59.128C60.5204 26.5779 61.9137 23.8451 63.3061 21.1115C61.5322 20.9992 59.7583 20.887 57.9845 20.7748H57.9853Z" fill="#333333"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_302_587">
                      <rect width="94" height="29" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>`;
              const svg = wrapper.querySelector('svg');
              if (svg) {
                svg.style.height = '11px';
                svg.style.width = 'auto';
                svg.setAttribute('focusable', 'false');
                svg.setAttribute('role', 'img');
              }
              return wrapper;
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
        
        // Add both back button and branding to footer
        this.footer.appendChild(this.backToMainButton);
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
      this.startButton.addEventListener("click", (e) => {
        console.log("🎯 Start button clicked!", e);
        console.log("🎯 Current mode:", this.currentMode);
        console.log("🎯 Button element:", this.startButton);
        e.preventDefault();
        this.handleStart();
      });

      // Add touch event for mobile debugging
      this.startButton.addEventListener("touchend", (e) => {
        console.log("📱 Start button touch end!", e);
        e.preventDefault();
        this.handleStart();
      });

      // Navigation buttons (not used in unified interface)
      if (this.chatNavButton && this.voiceNavButton) {
        this.chatNavButton.addEventListener("click", () => this.setMode("chat"));
        this.voiceNavButton.addEventListener("click", () => this.setMode("voice"));
      }

      // Send message (unified interface)
      if (this.sendButton) {
        this.sendButton.addEventListener("click", () => this.sendMessage());
      }
      if (this.messageInput) {
        this.messageInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
          }
        });
      }

      // Note: Bottom call controls removed - only header controls now

      // Header call controls
      if (this.headerMuteButton) {
        this.headerMuteButton.addEventListener("click", () => this.toggleMute());
      }
      if (this.headerEndCallButton) {
        this.headerEndCallButton.addEventListener("click", () =>
          this.endCurrentCall()
        );
      }

      // Back to main UI button
      if (this.backToMainButton) {
        this.backToMainButton.addEventListener("click", () => this.backToMainUI());
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
        
        // Hide message bubble when widget opens
        if (this.messageBubble) {
          this.hideBubble();
        }

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
      this.chatNavButton.style.fontWeight =
        this.currentMode === "chat" ? "600" : "400";
      this.voiceNavButton.style.color =
        this.currentMode === "voice" ? "#111827" : "#6b7280";
      this.voiceNavButton.style.borderBottom =
        this.currentMode === "voice" ? "2px solid #000" : "none";
      this.voiceNavButton.style.fontWeight =
        this.currentMode === "voice" ? "600" : "400";

      // Update start button
      this.updateStartButton();

      // Privacy text is now fixed and doesn't change based on mode
      // Removed dynamic privacy text updating to keep "Privacy policy & T&C" consistent
    }

    async handleStart() {
      console.log(
        "🔥 handleStart() called - currentMode:",
        this.currentMode,
        "isCallActive:",
        this.isCallActive
      );

      // Always start with call mode regardless of selection
      console.log("� Starting unified call + chat interface");
      if (this.isCallActive) {
        console.log("☎️ Ending current call");
        await this.endCurrentCall();
      } else {
        console.log("� Starting new call with chat transcript");
        this.startChat(); // Initialize chat for transcript display
        await this.startCurrentCall();
      }
    }

    startChat() {
      this.hasStarted = true;
      this.updateUI();

      // Add initial greeting message
      if (this.config.features.autoGreeting && !this.hasGreeted) {
        this.addMessage(
          "bot",
          "Hi! I'm your AI Employee. How can I help you today?"
        );
        this.hasGreeted = true;
      }
    }

    async startCurrentCall() {
      try {
        console.log("🚀 Starting call...");

        // Update UI to show connecting state
        if (this.callStatus) {
          this.callStatus.textContent = "Connecting...";
          this.callStatus.style.color = "#f59e0b";
        }

        // Call the new start-call API
        const callData = await this.api.startCall();
        console.log("✅ Call started successfully:", callData);

        // Store call information
        this.currentCallId = callData.callId;
        this.pythonServiceUrl = callData.pythonServiceUrl;
        this.isCallActive = true;
        this.callStartTime = new Date(callData.startTime);
        this.hasStarted = true;

        // Update UI
        this.updateModeUI();
        this.updateUI();
        this.startCallTimer();
        this.updateStartButton();

        // Request microphone early (still within user gesture Promise chain)
        try {
          await this.ensureMicrophoneAccess();
        } catch (micErr) {
          console.warn("🔇 Microphone not granted/available:", micErr);
          if (this.callStatus) {
            this.callStatus.textContent = "Microphone unavailable";
            this.callStatus.style.color = "#f59e0b";
          }
        }

        // Connect to Python WebSocket service
        if (this.pythonServiceUrl) {
          await this.connectToWebSocket(this.pythonServiceUrl);
        } else {
          console.warn("⚠️ No Python service URL provided");
          if (this.callStatus) {
            this.callStatus.textContent = "Connected (no voice service)";
            this.callStatus.style.color = "#f59e0b";
          }
        }

        console.log(
          "📞 Call interface activated with Call ID:",
          this.currentCallId
        );
      } catch (error) {
        console.error("❌ Failed to start call:", error);

        // Show error state
        if (this.callStatus) {
          this.callStatus.textContent = "Connection failed";
          this.callStatus.style.color = "#ef4444";
        }

        // Reset call state
        this.isCallActive = false;
        this.currentCallId = null;
        this.pythonServiceUrl = null;
        // Cleanup any partial mic resources
        try {
          this.stopAudioCapture();
        } catch (_) {}
        this.updateStartButton();

        // Optionally show error message to user
        this.showErrorMessage("Failed to start call. Please try again.");
      }
    }

    async endCurrentCall() {
      try {
        console.log("🛑 Ending call...");

        if (this.currentCallId) {
          // Update UI to show ending state
          if (this.callStatus) {
            this.callStatus.textContent = "Ending call...";
            this.callStatus.style.color = "#f59e0b";
          }

          // Call the new end-call API
          const endData = await this.api.endCall(this.currentCallId);
          console.log("✅ Call ended successfully:", endData);

          // Log call duration from API response
          if (endData.duration) {
            console.log(`📊 Total call duration: ${endData.duration} seconds`);
          }
        }

        // Stop audio streaming and release mic
        this.stopAudioCapture();

        // Disconnect WebSocket
        this.disconnectWebSocket();

        // Clear call timer
        if (this.callInterval) {
          clearInterval(this.callInterval);
          this.callInterval = null;
        }

        // Reset call state but keep session active
        this.isCallActive = false;
        // Keep hasStarted = true to maintain the unified interface
        this.callDuration = 0;
        this.callStartTime = null;
        this.currentCallId = null;
        this.pythonServiceUrl = null;

        // Reset UI elements
        if (this.callTimer) {
          this.callTimer.textContent = "00:00";
        }
        if (this.callStatus) {
          this.callStatus.textContent = "Call ended";
          this.callStatus.style.color = "#6b7280";
        }

        // Update UI
        this.updateStartButton();
        this.updateUI();

        console.log("📞 Call ended - returned to main interface");
      } catch (error) {
        console.error("❌ Failed to end call properly:", error);

        // Still reset the UI even if API call fails
        this.isCallActive = false;
        // Keep hasStarted = true to maintain the unified interface
        this.currentCallId = null;
        this.stopAudioCapture();

        if (this.callStatus) {
          this.callStatus.textContent = "Call ended";
          this.callStatus.style.color = "#6b7280";
        }

        this.updateStartButton();
        this.updateUI();
      }
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
      console.log(
        "updateUI - hasStarted:",
        this.hasStarted,
        "isCallActive:",
        this.isCallActive
      );

      // iOS specific handling
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        console.log("iOS device detected, applying iOS specific styles");
        // Force repaint on iOS
        this.chatInterface.style.transform = "translateZ(0)";
      }

      // Show/hide welcome screen vs unified interface
      this.header.style.display = this.hasStarted ? "none" : "block";
      this.body.style.display = this.hasStarted ? "flex" : "none";

      // Update back button visibility based on interface state
      if (this.backToMainButton) {
        this.backToMainButton.style.display = this.hasStarted ? "flex" : "none";
      }

      // Update start button
      this.updateStartButton();

      if (this.hasStarted && this.unifiedMode) {
        console.log("Showing unified interface");
        this.unifiedMode.style.display = "flex";
        
        // Update timer container visibility
        this.callTimerContainer.style.display = this.isCallActive ? "flex" : "none";
        
        // Update header call controls visibility
        if (this.headerCallControls) {
          this.headerCallControls.style.display = this.isCallActive ? "flex" : "none";
        }
        
        // Update back button visibility (show in both call interface and post-call chat)
        if (this.backToMainButton) {
          this.backToMainButton.style.display = "flex";
        }
        
        // Update input container visibility
        this.inputContainer.style.display = this.isCallActive ? "none" : "flex";
        
        // Update status text
        if (this.aiStatus) {
          const statusText = this.isCallActive ? "Call in Progress" : "Online";
          this.aiStatus.childNodes[1].textContent = statusText;
        }
        
        // Update call timer
        if (this.callTimer) {
          this.updateCallTimer();
        }
      }
    }

    updateCallTimer() {
      if (this.isCallActive && this.callStartTime) {
        const now = new Date();
        const duration = Math.floor((now - this.callStartTime) / 1000);
        const minutes = Math.floor(duration / 60).toString().padStart(2, '0');
        const seconds = (duration % 60).toString().padStart(2, '0');
        this.callTimer.textContent = `${minutes}:${seconds}`;
      } else {
        this.callTimer.textContent = "00:00";
      }
    }

    updateNavigationButtons() {
      if (this.chatNavButton && this.voiceNavButton) {
        // Update chat button - only bottom border as indicator
        this.chatNavButton.style.color =
          this.currentMode === "chat" ? "#111827" : "#6b7280";
        this.chatNavButton.style.borderBottom =
          this.currentMode === "chat" ? "2px solid #000" : "2px solid transparent";
        this.chatNavButton.style.fontWeight =
          this.currentMode === "chat" ? "600" : "400";

        // Update voice button - only bottom border as indicator
        this.voiceNavButton.style.color =
          this.currentMode === "voice" ? "#111827" : "#6b7280";
        this.voiceNavButton.style.borderBottom =
          this.currentMode === "voice" ? "2px solid #000" : "2px solid transparent";
        this.voiceNavButton.style.fontWeight =
          this.currentMode === "voice" ? "600" : "400";
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.updateMuteButton();
      if (this.headerMuteButton) {
        this.updateHeaderMuteButton();
      }
      if (this.callStatus) {
        if (this.isMuted) {
          this.callStatus.textContent = "Muted";
          this.callStatus.style.color = "#f59e0b";
        } else {
          this.callStatus.textContent = this.isWebSocketConnected
            ? "Streaming audio"
            : "Connecting...";
          this.callStatus.style.color = this.isWebSocketConnected
            ? "#10b981"
            : "#f59e0b";
        }
      }
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

    backToMainUI() {
      console.log("🔙 Going back to main UI - canceling all ongoing processes");
      
      // Cancel call and cleanup all background processes
      if (this.isCallActive) {
        console.log("📞 Ending active call");
        this.endCurrentCall();
      }
      
      // Stop audio capture if running
      if (this.hasStartedCapture) {
        console.log("🎤 Stopping audio capture");
        this.stopAudioCapture();
      }
      
      // Disconnect WebSocket if connected
      if (this.isWebSocketConnected) {
        console.log("🔌 Disconnecting WebSocket");
        this.disconnectWebSocket();
      }
      
      // Clear any ongoing timers
      if (this.callInterval) {
        clearInterval(this.callInterval);
        this.callInterval = null;
      }
      
      // Reset all states and return to welcome screen
      this.hasStarted = false;
      this.messages = [];
      this.isCallActive = false;
      this.callStartTime = null;
      this.currentCallId = null;
      this.pythonServiceUrl = null;
      this.hasStartedCapture = false;
      
      this.updateUI();
      console.log("✅ All processes stopped - returned to main screen");
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

      // Hide repetitive sender name row; we will show time inside bubble instead
      senderInfo.style.display = "none";

      // Time stamp
      // We will render timestamp inside the message bubble; no timestamp in senderInfo

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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            border: "1.4px solid #e3e3e3",
            background: "fff",
            borderRadius: "50%",
            padding: "4px",
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
            display: "flex",
            flexDirection: "column",
          },
        }
      );
      const contentSpan = createElement("span", {}, [message.content]);
      const timeInside = createElement(
        "span",
        {
          style: {
            fontSize: "11px",
            color: message.type === "user" ? "#e0e7ff" : "#9ca3af",
            alignSelf: "flex-end",
            marginTop: "6px",
          },
        },
        [this.formatTime(message.timestamp)]
      );
      bubble.appendChild(contentSpan);
      bubble.appendChild(timeInside);

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
        senderInfo.appendChild(document.createTextNode("ShivAI Employee"));

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

    playAudioResponse(audioData) {
      // Handle audio playback from AI response
      try {
        console.log("🔊 Playing AI audio response");

        // Convert base64 audio data to blob and play
        if (audioData) {
          const audioBlob = new Blob(
            [Uint8Array.from(atob(audioData), (c) => c.charCodeAt(0))],
            {
              type: "audio/wav",
            }
          );
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);

          audio
            .play()
            .then(() => {
              console.log("✅ Audio playback started");
            })
            .catch((error) => {
              console.error("❌ Audio playback failed:", error);
            });

          // Clean up URL after playing
          audio.addEventListener("ended", () => {
            URL.revokeObjectURL(audioUrl);
          });
        }
      } catch (error) {
        console.error("❌ Error playing audio response:", error);
      }
    }

    handleTranscription(text) {
      // Handle speech-to-text transcription from user
      try {
        console.log("📝 Processing transcription:", text);

        if (text && text.trim()) {
          // You can display the transcription in the UI or process it
          console.log("🗣️ User said:", text);

          // Optionally show the transcription in the call interface
          // This could be expanded to show live transcription
        }
      } catch (error) {
        console.error("❌ Error handling transcription:", error);
      }
    }

    showErrorMessage(message) {
      // Simple error notification - can be enhanced later
      console.error("Widget Error:", message);

      // Optionally show a temporary message in the UI
      if (this.callStatus) {
        const originalText = this.callStatus.textContent;
        this.callStatus.textContent = message;
        this.callStatus.style.color = "#ef4444";

        // Restore original text after 3 seconds
        setTimeout(() => {
          if (this.callStatus) {
            this.callStatus.textContent = originalText;
            this.callStatus.style.color = "#6b7280";
          }
        }, 3000);
      }
    }

    // ===== Microphone & Streaming Helpers (PCM16 over WS) =====
    async ensureMicrophoneAccess() {
      if (this.mediaStream) return this.mediaStream;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia not supported in this browser");
      }
      try {
        if (this.callStatus) {
          this.callStatus.textContent = "Requesting microphone...";
          this.callStatus.style.color = "#f59e0b";
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            sampleRate: 24000,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        this.mediaStream = stream;
        if (this.callStatus) {
          this.callStatus.textContent = "Microphone ready";
          this.callStatus.style.color = "#10b981";
        }
        return stream;
      } catch (err) {
        console.error("❌ Microphone access error:", err);
        throw err;
      }
    }

    async startAudioCapture() {
      // Ensure mic and WS
      await this.ensureMicrophoneAccess();
      if (!this.webSocket || !this.isWebSocketConnected) {
        console.warn("🔌 WebSocket not connected; cannot stream audio yet");
        return;
      }

      try {
        // Create/resume audio context
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)({ sampleRate: 24000 });
        }
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }

        // Create nodes if not already present
        if (!this.audioSource) {
          this.audioSource = this.audioContext.createMediaStreamSource(
            this.mediaStream
          );
        }
        if (!this.audioProcessor) {
          this.audioProcessor = this.audioContext.createScriptProcessor(
            4096,
            1,
            1
          );
          this.audioProcessor.onaudioprocess = (e) => {
            if (
              !this.isWebSocketConnected ||
              !this.webSocket ||
              this.webSocket.readyState !== WebSocket.OPEN
            )
              return;
            if (this.isMuted) return; // skip sending when muted

            const inputData = e.inputBuffer.getChannelData(0);
            // Float32 [-1,1] -> Int16 PCM
            const pcm16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              const s = Math.max(-1, Math.min(1, inputData[i]));
              pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
            }

            // Base64 encode
            const base64 = this.arrayBufferToBase64(pcm16.buffer);

            // Send to server
            this.sendWebSocketMessage({
              type: "audio",
              callId: this.currentCallId,
              audio: base64,
            });
          };
        }

        // Connect nodes
        this.audioSource.connect(this.audioProcessor);
        this.audioProcessor.connect(this.audioContext.destination);

        if (this.callStatus) {
          this.callStatus.textContent = "Streaming audio";
          this.callStatus.style.color = "#10b981";
        }
        console.log("🎙️ Audio capture started (PCM16)");
      } catch (err) {
        console.error("❌ Error starting audio capture:", err);
        if (this.callStatus) {
          this.callStatus.textContent = "Recorder error";
          this.callStatus.style.color = "#ef4444";
        }
      }
    }

    stopAudioCapture() {
      // Disconnect processor
      try {
        if (this.audioProcessor) {
          this.audioProcessor.disconnect();
          this.audioProcessor.onaudioprocess = null;
          this.audioProcessor = null;
        }
      } catch (err) {
        console.warn("⚠️ Error disconnecting processor:", err);
      }

      try {
        if (this.audioSource) {
          this.audioSource.disconnect();
          this.audioSource = null;
        }
      } catch (err) {
        console.warn("⚠️ Error disconnecting source:", err);
      }

      // Stop mic tracks
      try {
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach((t) => t.stop());
          this.mediaStream = null;
        }
      } catch (err) {
        console.warn("⚠️ Error stopping media tracks:", err);
      }

      // Close audio context
      try {
        if (this.audioContext && this.audioContext.state !== "closed") {
          this.audioContext.close();
        }
      } catch (err) {
        console.warn("⚠️ Error closing audio context:", err);
      }
      this.audioContext = null;

      // Stop any AI audio playback
      this.stopAudioPlayback();
    }

    // ===== AI Audio Playback & Transcript Handling =====
    async playQueuedAudio() {
      if (this.audioChunksQueue.length === 0) {
        this.isPlayingAudio = false;
        return;
      }

      this.isPlayingAudio = true;
      try {
        // Gather available chunks to reduce gaps
        const chunksToPlay = [];
        while (this.audioChunksQueue.length > 0) {
          chunksToPlay.push(this.audioChunksQueue.shift());
        }

        // Combine into single blob
        const audioBuffers = chunksToPlay.map((b64) =>
          this.base64ToArrayBuffer(b64)
        );
        const totalLength = audioBuffers.reduce(
          (acc, buf) => acc + buf.byteLength,
          0
        );
        const combined = new Uint8Array(totalLength);
        let offset = 0;
        for (const buffer of audioBuffers) {
          combined.set(new Uint8Array(buffer), offset);
          offset += buffer.byteLength;
        }

        const blob = new Blob([combined], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          if (this.audioChunksQueue.length > 0) {
            this.playQueuedAudio();
          } else {
            this.isPlayingAudio = false;
          }
        };

        audio.onerror = (error) => {
          console.error("Audio playback error:", error);
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          this.isPlayingAudio = false;
        };

        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
        this.isPlayingAudio = false;
        if (this.audioChunksQueue.length > 0) {
          setTimeout(() => this.playQueuedAudio(), 100);
        }
      }
    }

    stopAudioPlayback() {
      if (this.currentAudio) {
        try {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        } catch (_) {}
        this.currentAudio = null;
      }
      this.audioChunksQueue = [];
      this.isPlayingAudio = false;
      this.currentAiTranscript = "";
      // Tell backend to interrupt current TTS if needed
      if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
        this.sendWebSocketMessage({ type: "interrupt" });
      }
    }

    arrayBufferToBase64(buffer) {
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }

    base64ToArrayBuffer(base64) {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }

    // Clean up intervals and resources
    cleanup() {
      if (this.messageInterval) {
        clearInterval(this.messageInterval);
        this.messageInterval = null;
      }
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
