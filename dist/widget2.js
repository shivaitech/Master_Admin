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
    apiEndpoint: "https://shivai-calling-frontend-38ax.vercel.app/landing",
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
      privacyPolicyUrl: "https://shivai-calling-frontend-38ax.vercel.app/landing",
      companyName: "ShivAI Employee",
      subtitle: "AI-Powered Support",
    },
  };

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
      "mic-off": `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12L9 9z"/><path d="M12 1a3 3 0 0 0-3 3v2l6 6V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-1.29 4.08L19 17.27V12z"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
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

    async startCall(wasWarmedUp = false) {
      try {
        console.log(`🚀 Starting call ${wasWarmedUp ? '(backend pre-warmed)' : '(cold start)'}`);
        
        const response = await fetch(
          `https://shivai-com-backend.onrender.com/api/v1/calls/start-call`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add keep-alive for connection reuse
              "Connection": "keep-alive",
            },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              warmedUp: wasWarmedUp, // Let backend know if it was pre-warmed
            }),
            // Use default fetch with connection pooling
            cache: "no-store",
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
        // Show loading spinner inside end call button
        this.isLoading = true;
        if (this.callStatus) {
          this.callStatus.textContent = "Disconnecting...";
          this.callStatus.style.color = "#6366f1";
        }
        // Ensure loading indicator exists and show it
        if (!this.loadingIndicator) {
          // Create a simple loading spinner if not present
          this.loadingIndicator = document.createElement("div");
          this.loadingIndicator.className = "shivai-loading-dots";
          for (let i = 0; i < 3; i++) {
            const dot = document.createElement("div");
            dot.className = "shivai-loading-dot";
            this.loadingIndicator.appendChild(dot);
          }
          // Insert into chat interface or main container
          if (this.chatInterface) {
            this.chatInterface.appendChild(this.loadingIndicator);
          } else {
            document.body.appendChild(this.loadingIndicator);
          }
        }
        if (this.endCallButtonLoader) {
          this.endCallButtonLoader.style.display = "block";
        }
        if (this.endCallButton) {
          this.endCallButton.disabled = true;
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
          // Hide loading spinner inside end call button
          this.isLoading = false;
          if (this.loadingIndicator) {
            this.loadingIndicator.style.display = "none";
          }
          if (this.callStatus) {
            this.callStatus.textContent = "Call ended";
            this.callStatus.style.color = "#ef4444";
          }
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
        this.isLoading = false;
        if (this.endCallButtonLoader) {
          this.endCallButtonLoader.style.display = "none";
        }
        if (this.endCallButton) {
          this.endCallButton.disabled = false;
        }
        if (this.callStatus) {
          this.callStatus.textContent = "Error disconnecting";
          this.callStatus.style.color = "#ef4444";
        }
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
      this.selectedLanguage = "en"; // Default language selection
      this.languageSelected = false; // Track if user has selected language
      this.conversationId = this.generateId();
      this.isCallActive = false;
      this.callStartTime = null;
      this.callDuration = 0;
      this.callInterval = null;
      this.hasStarted = false;
      this.isStarting = false; // Prevent double-click on start call button
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
      this.currentBufferSource = null; // WebAudio buffer source
      this.currentAiTranscript = ""; // build up streamed AI text
      this.userInteracted = false; // Track user interaction for iOS audio
      this.audioStartTime = null; // Track when audio playback started

      // Voice Activity Detection (VAD) and Noise Cancellation
      this.vadEnabled = true;
      this.vadThreshold = 0.015; // Optimized threshold for speech detection
      this.vadMinDuration = 150; // Minimum speech duration (ms)
      this.silenceDuration = 800; // Max silence duration before stopping capture (ms)
      this.noiseGateThreshold = 0.008; // Lower noise gate
      this.speechStart = null;
      this.silenceStart = null;
      this.analyser = null;
      this.frequencyData = null;
      this.noiseProfile = null;
      this.noiseProfileLocked = false;
      this.lastSpeechActivityTime = 0; // Track last speech activity for listening indicator
      this.isListening = false; // Track listening state for UI

      this.recognition = null;
      this.synthesis = window.speechSynthesis;
      
      // Sound effects audio context
      this.soundContext = null;
      this.soundsEnabled = this.config.features.soundEffects;
      
      // Connection optimization for first-time users
      this.connectionCache = new Map(); // Cache for DNS/connection warmup
      this.preloadedResources = false;
      this.isWarmingUp = false;

      this.init();
    }

    generateId() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    }

    // Sound Effects System
    initSoundContext() {
      if (!this.soundsEnabled) return;
      
      try {
        this.soundContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // iOS Safari requires user interaction to unlock audio context
        if (this.soundContext.state === 'suspended') {
          const unlockAudio = () => {
            // Mark user interaction for iOS
            this.userInteracted = true;
            
            // Resume sound context
            this.soundContext.resume().then(() => {
              console.log('🔊 Sound context resumed');
            }).catch(err => {
              console.warn('Failed to resume sound context:', err);
            });
            
            // Also resume voice audio context if available (iOS fix)
            if (this.audioContext && this.audioContext.state === 'suspended') {
              this.audioContext.resume().then(() => {
                console.log('🎤 Voice audio context resumed');
              }).catch(err => {
                console.warn('Failed to resume voice audio context:', err);
              });
            }
            
            // Clean up listeners after first user interaction
            document.removeEventListener('touchstart', unlockAudio);
            document.removeEventListener('click', unlockAudio);
          };
          document.addEventListener('touchstart', unlockAudio);
          document.addEventListener('click', unlockAudio);
        }
      } catch (error) {
        console.warn("Could not initialize audio context for sound effects:", error);
        this.soundsEnabled = false;
      }
    }

    playSound(type) {
      if (!this.soundsEnabled || !this.soundContext) {
        this.initSoundContext();
        if (!this.soundContext) return;
      }

      try {
        switch (type) {
          case 'connecting':
            this.playConnectingSound();
            break;
          case 'call-start':
            this.playCallStartSound();
            break;
          case 'call-end':
            this.playCallEndSound();
            break;
          default:
            console.warn('Unknown sound type:', type);
        }
      } catch (error) {
        console.warn('Error playing sound:', error);
      }
    }

    playConnectingSound() {
      // Generate ascending tone sequence for connecting
      const frequencies = [440, 554, 659]; // A, C#, E notes
      let delay = 0;

      frequencies.forEach((freq) => {
        setTimeout(() => {
          this.generateTone(freq, 0.15, 0.3); // frequency, duration, volume
        }, delay);
        delay += 120;
      });
    }

    playCallStartSound() {
      // Generate pleasant ascending chord for call start
      const frequencies = [261.63, 329.63, 392.00]; // C, E, G major chord
      
      frequencies.forEach((freq, idx) => {
        setTimeout(() => {
          this.generateTone(freq, 0.3, 0.25);
        }, idx * 50);
      });
    }

    playCallEndSound() {
      // Generate descending tone for call end
      const frequencies = [392.00, 329.63, 261.63]; // G, E, C descending
      let delay = 0;

      frequencies.forEach((freq) => {
        setTimeout(() => {
          this.generateTone(freq, 0.2, 0.2);
        }, delay);
        delay += 100;
      });
    }

    generateTone(frequency, duration, volume = 0.1) {
      if (!this.soundContext) return;

      const oscillator = this.soundContext.createOscillator();
      const gainNode = this.soundContext.createGain();

      // Connect oscillator to gain to speakers
      oscillator.connect(gainNode);
      gainNode.connect(this.soundContext.destination);

      // Configure oscillator
      oscillator.frequency.setValueAtTime(frequency, this.soundContext.currentTime);
      oscillator.type = 'sine'; // Smooth, pleasant tone

      // Configure gain envelope (fade in/out to avoid clicks)
      gainNode.gain.setValueAtTime(0, this.soundContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.soundContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.soundContext.currentTime + duration);

      // Start and stop the oscillator
      oscillator.start(this.soundContext.currentTime);
      oscillator.stop(this.soundContext.currentTime + duration);
    }

    async connectToWebSocket(pythonServiceUrl) {
      const startTime = Date.now();
      
      return new Promise((resolve, reject) => {
        try {
          console.log("🔌 Connecting to Python service:", pythonServiceUrl);

          // Validate WebSocket URL
          if (!pythonServiceUrl || !pythonServiceUrl.startsWith('ws')) {
            reject(new Error('Invalid WebSocket URL provided'));
            return;
          }

          // Close existing connection if any
          if (this.webSocket) {
            this.webSocket.close();
          }

          // Create new WebSocket connection with optimizations
          this.webSocket = new WebSocket(pythonServiceUrl);
        
        try {
          this.webSocket.binaryType = "blob";
          // Add connection timeout to fail fast instead of hanging
          const connectionTimeout = setTimeout(() => {
            if (this.webSocket.readyState === WebSocket.CONNECTING) {
              console.warn("⏰ WebSocket connection timeout, closing connection...");
              this.webSocket.close();
              this.isWebSocketConnected = false;
              
              // Update UI to show timeout
              if (this.callStatus) {
                this.callStatus.textContent = "Connection timeout - continuing without voice";
                this.callStatus.style.color = "#f59e0b";
              }
            }
          }, 10000); 
          
          // Clear timeout when connection opens or closes
          this.webSocket.addEventListener('open', () => {
            clearTimeout(connectionTimeout);
          }, { once: true });
          
          this.webSocket.addEventListener('close', () => {
            clearTimeout(connectionTimeout);
          }, { once: true });
          
          this.webSocket.addEventListener('error', () => {
            clearTimeout(connectionTimeout);
          }, { once: true });
          
        } catch (error) {
          console.warn("WebSocket optimization error:", error);
        }

        this.webSocket.onopen = () => {
          const connectionTime = Date.now() - startTime;
          console.log(`✅ WebSocket connected to Python service in ${connectionTime}ms`);
          this.isWebSocketConnected = true;
          
          this.connectionCache.set('last-successful-connection', {
            url: pythonServiceUrl,
            time: connectionTime,
            timestamp: Date.now()
          });

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
          }, 300); // Reduced from 1500ms to 300ms for faster connection
          
          resolve();
        };

        this.webSocket.onmessage = (event) => {
          const payload = event.data;
          try {
            if (typeof payload === "string") {
              const preview =
                payload.length > 200 ? payload.slice(0, 200) + "…" : payload;
              console.log("📩 Received (text) from Python service:", preview);
              try {
                const data = JSON.parse(payload);
                this.handleWebSocketMessage(data);
              } catch (parseError) {
                console.warn("⚠️ Non-JSON text message from server:", parseError.message);
              }
            } else if (payload instanceof Blob) {
              console.log(
                "📩 Received (blob) from Python service:",
                payload.type || "unknown",
                payload.size,
                "bytes"
              );
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
                  } catch (parseError) {
                    console.warn("⚠️ Blob text not JSON, ignoring:", parseError);
                  }
                });
              }
            } else if (payload instanceof ArrayBuffer) {
              console.log(
                "📩 Received (arraybuffer) from Python service:",
                payload.byteLength,
                "bytes"
              );
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
          
          // Reject promise if connection closed before opening
          if (this.webSocket.readyState !== WebSocket.OPEN) {
            reject(new Error(`WebSocket closed: ${event.code} ${event.reason}`));
          }
        };

        this.webSocket.onerror = (error) => {
          const connectionTime = Date.now() - startTime;
          console.error(`❌ WebSocket error after ${connectionTime}ms:`, error);
          this.isWebSocketConnected = false;
          
          // Cache failed connection for analysis
          this.connectionCache.set('last-failed-connection', {
            url: pythonServiceUrl,
            time: connectionTime,
            timestamp: Date.now(),
            error: error.message || 'Unknown error'
          });

          // Update UI with more helpful error message
          if (this.callStatus) {
            const errorMessage = connectionTime > 10000 ? 
              "Connection timeout - continuing without voice" : "Voice service error";
            this.callStatus.textContent = errorMessage;
            this.callStatus.style.color = "#ef4444";
          }
          
          // Reject the promise on error
          reject(error);
        };
        
        } catch (error) {
          console.error("❌ Failed to connect to WebSocket:", error);
          reject(error);
        }
      });
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
          // Start audio capture immediately when backend is ready
          this.hasStartedCapture = true; // Mark to prevent fallback timeout
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
          this.handleTranscription(data.text, false);
          break;

        case "user_transcript":
          console.log("🗣️ User transcript:", data.text);
          this.handleTranscription(data.text, false);
          break;
        case "ai_transcript":
          console.log("🤖 AI transcript complete:", data.text);
          // Stop AI updating flag before creating new message
          this.isUpdatingAI = false;
          // Reset accumulated text
          this.currentAiTranscript = "";
          // Create new AI message
          this.handleTranscription(data.text, true);
          break;
        case "ai_text_delta":
          // Accumulate text for streaming
          this.currentAiTranscript += data.text || "";
          // Only update if we're actively streaming (not creating duplicate messages)
          if (this.isUpdatingAI) {
            this.updateStreamingAIMessage(this.currentAiTranscript);
          }
          break;

        case "speech_started":
          if (this.callStatus) {
            this.callStatus.textContent = "Listening...";
            this.callStatus.style.color = "#10b981";
          }
          // Show user listening loader
          this.showUserLoader();
          
          // Less aggressive interruption - only stop if AI has been playing for more than 1 second
          if (this.isPlayingAudio && this.audioStartTime && (Date.now() - this.audioStartTime) > 1000) {
            console.log("🛑 User speech detected after 1s - stopping AI audio");
            this.stopAudioPlayback();
          }
          break;
        case "speech_stopped":
          if (this.callStatus) {
            this.callStatus.textContent = "Processing...";
            this.callStatus.style.color = "#f59e0b";
          }
          // User stopped speaking, remove user loader
          this.removeUserLoader();
          break;
        case "response_done":
          if (this.callStatus) {
            this.callStatus.textContent = "Connected - Speak now!";
            this.callStatus.style.color = "#10b981";
          }
          // AI finished responding, stop updating AI message
          this.isUpdatingAI = false;
          // Remove AI loader if still showing
          this.removeAILoader();
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
      this.optimizePhoneAudio(); // Optimize for phone audio first
      this.injectStyles();
      this.createWidget();
      this.initSpeechRecognition();
      this.bindEvents();
      
      // Preload and warm up connections for faster first-time experience
      this.warmupConnections();
    }

    // Warm up connections and preload resources for faster first connection
    async warmupConnections() {
      if (this.isWarmingUp || this.preloadedResources) return;
      this.isWarmingUp = true;
      
      try {
        console.log("🔥 Warming up connections for faster first-time experience...");
        
        // 1. DNS prefetch for backend services
        this.prefetchDNS([
          'https://shivai-com-backend.onrender.com',
          'wss://shivai.com',
          'wss://api.shivai.com'
        ]);
        
        // 2. Warm up the start-call API endpoint (non-blocking)
        setTimeout(() => {
          this.warmupStartCallAPI();
        }, 1000);
        
        // 3. Pre-initialize audio context in background
        setTimeout(() => {
          this.preinitializeAudio();
        }, 500);
        
        // 4. Cache microphone permissions check
        setTimeout(() => {
          this.cacheMicrophonePermissions();
        }, 2000);
        
        console.log("✅ Connection warmup initiated");
        this.preloadedResources = true;
        
      } catch (error) {
        console.warn("⚠️ Connection warmup failed (non-critical):", error);
      } finally {
        this.isWarmingUp = false;
      }
    }

    // DNS prefetch for faster domain resolution
    prefetchDNS(domains) {
      domains.forEach(domain => {
        try {
          const link = document.createElement('link');
          link.rel = 'dns-prefetch';
          link.href = domain;
          document.head.appendChild(link);
          console.log(`🌐 DNS prefetch added for: ${domain}`);
        } catch (e) {
          console.warn(`Failed to prefetch DNS for ${domain}:`, e);
        }
      });
    }

    // Warm up the start-call API to reduce cold start
    async warmupStartCallAPI() {
      try {
        // Make a lightweight request to warm up the backend
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
        
        await fetch(
          'https://shivai-com-backend.onrender.com/api/v1/health',
          {
            method: 'GET',
            mode: 'no-cors', // Avoid CORS issues for warmup
            cache: 'no-store',
            signal: controller.signal
          }
        );
        clearTimeout(timeoutId);
        console.log("🌡️ Backend warmup request sent");
        this.connectionCache.set('backend-warmed', Date.now());
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log("Backend warmup timeout (non-critical)");
        } else {
          console.log("Backend warmup failed (expected for no-cors):", error.message);
        }
      }
    }

    // Pre-initialize audio resources
    async preinitializeAudio() {
      try {
        // Pre-create audio context (suspended until user interaction)
        if (!this.audioContext && (window.AudioContext || window.webkitAudioContext)) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 24000,
            latencyHint: 'playback'
          });
          console.log("🎤 Audio context pre-initialized (suspended)");
        }
        
        // Pre-initialize sound context
        if (!this.soundContext && this.soundsEnabled) {
          this.initSoundContext();
        }
        
      } catch (error) {
        console.warn("Audio pre-initialization failed:", error);
      }
    }

    // Cache microphone permissions status
    async cacheMicrophonePermissions() {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const micPermission = await navigator.permissions.query({ name: 'microphone' });
          this.connectionCache.set('mic-permission', micPermission.state);
          console.log(`🎤 Microphone permission cached: ${micPermission.state}`);
          
          // Listen for permission changes
          micPermission.onchange = () => {
            this.connectionCache.set('mic-permission', micPermission.state);
            console.log(`🎤 Microphone permission updated: ${micPermission.state}`);
          };
        } else {
          console.log("🎤 Permission query API not available");
        }
      } catch (error) {
        console.warn("Could not cache microphone permissions:", error);
      }
    }

    // Optimize settings for maximum phone audio quality
    optimizePhoneAudio() {
      console.log("📱 Optimizing for phone audio...");
      
      // Force phone into speakerphone mode if possible
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'ShivAI Voice Call',
          artist: 'ShivAI Assistant',
          album: 'AI Communication'
        });
        
        // Set up media session for proper audio routing
        navigator.mediaSession.setActionHandler('play', () => {
          console.log("📱 Media session play activated");
        });
      }

      // Request wake lock to maintain audio performance
      if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').then(() => {
          console.log("🔒 Screen wake lock acquired for audio optimization");
        }).catch(e => {
          console.log("Wake lock not available:", e.message);
        });
      }

      // Set global audio optimization flags
      if (typeof window !== 'undefined') {
        window.shivaiPhoneMode = true;
        window.shivaiMaxVolume = true;
        console.log("✅ Phone audio optimization flags set");
      }
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
          height: 420px;
          max-height: 600px;
          min-height: 380px;
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
        
        @keyframes typingBounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes waveBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        
        @keyframes slideProgress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        
        @media (max-width: 768px) {
          .shivai-widget-chat {
            width: calc(100vw - 16px) !important;
            max-width: 400px !important;
            height: auto !important;
            max-height: 75vh !important;
            min-height: 300px !important;
            position: fixed !important;
            bottom: 40px !important;
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
            max-height: 30vh !important;
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
            max-height: 35vh !important;
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
            bottom: 30px !important;
            border-radius: 16px !important;
          }
          
          .shivai-widget-button {
            width: 54px !important;
            height: 54px !important;
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
            max-width: 93vw !important;
            
            height: auto !important;
            max-height: 70vh !important;
            min-height: 280px !important;
            left: 12px !important;
            right: 12px !important;
            bottom: 30px !important;
            border-radius: 16px !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          .shivai-widget-button {
            width: 52px !important;
            height: 52px !important;
            touch-action: manipulation !important;
          }
          
          .shivai-widget-messages {
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
      // Dynamic context-aware messages
      this.liveMessages = [
        "📞	Call ShivAI!",
        "📞	Call ShivAI!",
        "📞	Call ShivAI!",
        "📞	Call ShivAI!",
        
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
          minWidth: "60px",
          maxWidth: "250px",
          width: "auto",
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

    updateLiveMessagesForState(state) {
      // Update messages based on current state
      if (state === 'calling') {
        this.liveMessages = [
          "📞 Call in progress...",
          "🎤 I'm listening!",
          "🗣️ Speak freely",
          "💬 Having a conversation with ShivAI Employee"
        ];
      } else if (state === 'connected') {
        this.liveMessages = [
          "✅ Connected to ShivAI Employee",
          "🎯 Ready to help!",
          "💡 Ask me anything",
          "🚀 Let's get started"
        ];
      } else {
        // Default idle messages
        this.liveMessages = [
          "👋 Hi there! Need help?",
          "🤖 I'm ShivAI Employee, your AI assistant",
          "📞 Want to talk? Click for voice call!",
          "💬 I'm here to help you",
          "🚀 Getting quick answers is my thing",
          "🕒 Available 24/7 for you",
          "🎯 Let's solve this together",
          "✨ Ready when you are!",
          "🔥 I love helping people",
          "💡 Got questions? I have answers!"
        ];
      }
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
      }, ['']);
      
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

    showConnectingStatus(statusText, descriptionText, isError = false) {
      this.connectingStatus.style.display = "block";
      this.connectingStatusText.textContent = statusText;
      this.connectingStatusText.style.color = isError ? "#ef4444" : "#f59e0b";
      this.connectingStatusDescription.textContent = descriptionText;
      
      // Hide start button when connecting
      if (this.startButton) {
        this.startButton.style.display = "none";
      }
    }

    hideConnectingStatus() {
      this.connectingStatus.style.display = "none";
      // Show start button again
      if (this.startButton) {
        this.startButton.style.display = "flex";
      }
    }

    async showProgressiveConnectionStatesInWelcome() {
      // Optimize delays based on whether connections were pre-warmed
      const wasWarmedUp = this.connectionCache.has('backend-warmed');
      const hasPreloadedAudio = this.audioContext !== null;
      
      // Faster states if resources were pre-loaded
      const baseDelay = wasWarmedUp ? 150 : 300;
      
      const states = [
        { text: "Connecting to AI servers...", desc: wasWarmedUp ? "Using cached connection" : "Establishing secure connection", delay: baseDelay, sound: true },
        { text: "Setting up voice pipeline...", desc: hasPreloadedAudio ? "Audio pipeline ready" : "Configuring audio processing", delay: hasPreloadedAudio ? 100 : baseDelay, sound: false },
        { text: "Configuring audio streams...", desc: "Optimizing voice quality", delay: baseDelay, sound: true },
        { text: "Almost ready to talk...", desc: "Finalizing setup", delay: 150, sound: false },
        { text: "Connection established! 🎉", desc: "Ready to start your conversation", delay: 200, sound: false }
      ];

      for (const state of states) {
        this.showConnectingStatus(state.text, state.desc);
        if (state.sound) {
          this.playSound('connecting');
        }
        if (state.delay > 0) {
          await new Promise(resolve => setTimeout(resolve, state.delay));
        }
      }
    }

    async showProgressiveConnectionStates() {
      const states = [
        { text: "Initializing call session...", color: "#f59e0b", delay: 200 },
        { text: "Connecting to AI servers...", color: "#f59e0b", delay: 300 },
        { text: "Setting up voice pipeline...", color: "#f59e0b", delay: 200 },
        { text: "Configuring audio streams...", color: "#f59e0b", delay: 200 },
        { text: "Almost ready to talk...", color: "#10b981", delay: 200 },
  { text: "Connected! ShivAI Employee is listening 🎤", color: "#10b981", delay: 0 }
      ];

      for (const state of states) {
        if (this.callStatus) {
          this.callStatus.textContent = state.text;
          this.callStatus.style.color = state.color;
        }
        if (state.delay > 0) {
          await new Promise(resolve => setTimeout(resolve, state.delay));
        }
      }
    }

    async showTypingIndicator() {
      // Add typing indicator message
      const typingElement = this.createTypingElement();
      this.messagesContainer.appendChild(typingElement);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

      return typingElement;
    }

    createTypingElement() {
      const messageDiv = createElement("div", {
        class: "shivai-widget-message",
        id: "typing-indicator",
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: "16px",
        },
      });

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
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#10b981",
        },
      });

      aiAvatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z"/>
        </svg>`;

      senderInfo.appendChild(aiAvatar);
  senderInfo.appendChild(document.createTextNode("ShivAI Employee is responding..."));

      const messageBubble = createElement("div", {
        style: {
          backgroundColor: "#f3f4f6",
          padding: "12px 16px",
          borderRadius: "18px 18px 18px 4px",
          maxWidth: "80%",
          wordWrap: "break-word",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        },
      });

      // Create typing dots
      for (let i = 0; i < 3; i++) {
        const dot = createElement("div", {
          class: "shivai-typing-dot",
          style: {
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#9ca3af",
            animation: `typingBounce 1.4s ease-in-out infinite both`,
            animationDelay: `${i * 0.16}s`,
          },
        });
        messageBubble.appendChild(dot);
      }

      messageDiv.appendChild(senderInfo);
      messageDiv.appendChild(messageBubble);

      return messageDiv;
    }

    removeTypingIndicator() {
      const typingElement = document.getElementById("typing-indicator");
      if (typingElement) {
        typingElement.remove();
      }
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
      
      // Set initial compact height
      this.adjustModalHeight();
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
            top: "6px",
            right: "14px",
            fontSize: "20px",
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
          margin: "0 auto 12px",
          borderRadius: "50%",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#111827",
          border:"1.4px solid #e5e7eb",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "12px",
        },
      });

      // Insert ShivAI company logo as avatar
      avatar.innerHTML = `
       <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1500">
  <defs>
    <style>
      .cls-1 {
        stroke-width: 0px;
      }
    </style>
  </defs>
  <path class="cls-1" d="m404.66,608.33c-9.95-7.3-50.21-35.08-105.88-29.33-26.64,2.75-47.74,12.25-62.31,21.06-14.39,8.7-26.96,20.35-35.39,34.9-12.13,20.93-15.94,45.25-9.6,67.8,4.02,14.28,11.39,25.29,18.63,33.3,6.91,7.65,15.23,13.89,24.25,18.89,25.77,14.32,51.54,28.63,77.31,42.95,11.98,7.56,18.69,20.94,17.17,34.34-.11,1.01-.27,1.98-.47,2.93-2.85,13.83-15.4,23.46-29.5,24.28-8.62.5-18.56.28-29.41-1.45-34.59-5.51-58.34-23.08-69.39-32.54-13.35,21.1-26.71,42.2-40.06,63.3,13.96,9.75,32.81,20.78,56.52,29.33,42.03,15.17,79.38,15.38,102.3,13.59,7.85-.92,45.14-6.13,72.25-39.35,1.28-1.57,2.49-3.15,3.65-4.73,27.87-38.33,23.14-92-9.89-125.97-.3-.31-.6-.62-.91-.93-17.09-17.27-35.69-27.61-51.02-33.85-19.44-7.9-38.05-17.71-55.07-29.99-.78-.56-1.56-1.12-2.33-1.68-9.66-6.97-12.29-20.21-6.03-30.34h0c7.3-11.68,22.31-17.66,37.92-15.02,8.22-.53,21.33-.36,36.48,4.29,15.34,4.71,26.38,12.07,32.91,17.17,9.3-20.98,18.6-41.97,27.9-62.95Z"/>
  <path class="cls-1" d="m630.61,740.85c-3.86-4.46-8.41-8.89-13.76-13.05-17.19-13.34-35.56-18.29-49.77-19.92-15.45-1.76-31.19.76-45.13,7.63-.08.04-.16.08-.25.12-13.14,6.52-22.41,14.79-28.33,21.1v-169.18h-72.25v358.41h72.25v-130.44c9.49-21.4,30.88-33.36,50.51-29.8,3.55.64,6.78,1.75,9.71,3.15,14.12,6.76,22.48,21.69,22.48,37.35v119.75h73.68v-132.05c0-19.38-6.46-38.41-19.14-53.06Z"/>
  <rect class="cls-1" x="662.56" y="712.06" width="74.4" height="213.9"/>
  <path class="cls-1" d="m953.03,825.14c-13.76,33.61-27.52,67.21-41.28,100.82h84.42l25.75-67.96c-8.94-6.55-20.41-13.83-34.43-20.38-12.7-5.93-24.48-9.84-34.47-12.48Z"/>
  <circle class="cls-1" cx="1270.13" cy="623.35" r="45.07"/>
  <circle class="cls-1" cx="699.76" cy="623.35" r="45.07"/>
  <path class="cls-1" d="m954.09,822.73l95.6-235.02h71.13l94.46,235.02c-13.9-.54-54.29-3.99-86.12-34.9-26-25.25-33.27-56.18-36.12-68.31-.48-2.06-.75-3.53-1.31-6.44-4.83-25.25-5.11-43.74-5.38-76.6-.22-27.23-.29-45.31-.45-45.31-.19,0-.33,26.01-1.25,51.3-.44,12.07-.99,22.81-.99,22.81-.31,5.8-.54,8.99-.78,14.32-.97,21.54-.88,21.8-1.44,25.22-2.48,15.29-13.28,66.99-58.46,96.77-27.62,18.21-55.44,20.82-68.92,21.15Z"/>
  <path class="cls-1" d="m1215.73,825.86c-6.37.43-13.66,1.49-21.51,3.68-22.94,6.41-38.73,19.17-47.51,27.69,7.45,22.45,14.9,44.91,22.35,67.36h137.14v-101.86l-72.84,3.12.57,47.8-18.21-47.8Z"/>
  <polygon class="cls-1" points="1233.94 716.32 1306.21 716.32 1306.21 825.14 1233.94 822.21 1233.94 716.32"/>
  <path class="cls-1" d="m872.77,821c22.25.49,44.49.98,66.74,1.47,18.21-35.7,36.41-71.4,54.62-107.1l-80.12-3.31-48.65,116.61h-5.72l-51.51-116.61h-72.25v27.9l98.72,186h52.22c17.12-33.61,34.25-67.21,51.37-100.82-21.81-1.38-43.62-2.76-65.43-4.14Z"/>
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

      // Connecting status (hidden by default)
      this.connectingStatus = createElement("div", {
        style: {
          display: "none",
          textAlign: "center",
          padding: "16px",
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          margin: "16px 0",
          border: "1px solid #e5e7eb",
        },
      });

      this.connectingStatusText = createElement("p", {
        style: {
          fontSize: "14px",
          color: "#f59e0b",
          margin: "0 0 8px 0",
          fontWeight: "500",
        },
      });

      this.connectingStatusDescription = createElement("p", {
        style: {
          fontSize: "12px",
          color: "#6b7280",
          margin: "0",
          lineHeight: "1.4",
        },
      });

      this.connectingStatus.appendChild(this.connectingStatusText);
      this.connectingStatus.appendChild(this.connectingStatusDescription);

      this.header.appendChild(this.closeButton);
      this.header.appendChild(avatar);
      this.header.appendChild(title);
      this.header.appendChild(description);
      this.header.appendChild(this.connectingStatus);

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
        "By using this service you agree to our "
      );

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

      this.header.appendChild(this.startButton);
      this.header.appendChild(privacyText);
      this.header.appendChild(bottomNav);
    }

    updateStartButton() {
      console.log(
        "🔄 updateStartButton() - currentMode:",
        this.currentMode,
        "isCallActive:",
        this.isCallActive
      );
      this.startButton.innerHTML = "";
      
      // Re-enable button after call starts or ends
      this.startButton.disabled = false;
      this.startButton.style.opacity = "1";
      this.startButton.style.cursor = "pointer";

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

      // Right side - Call controls (language selector, speaker and end call icons)
      this.headerCallControls = createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
        },
      });

      // Language display button in header with language code in round circle
      this.languageButton = createElement("button", {
        style: {
          padding: "0",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "2px solid #d1d5db",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          transition: "all 0.2s",
          fontSize: "12px",
          fontWeight: "600",
          color: "#1f2937",
        },
      });

      // Language code text (En, Hi, Ar, etc.)
      this.languageCodeText = document.createElement("span");
      this.languageCodeText.textContent = "En";
      this.languageCodeText.style.fontSize = "12px";
      this.languageCodeText.style.fontWeight = "600";
      this.languageCodeText.style.color = "#1f2937";

      this.languageButton.appendChild(this.languageCodeText);

      // Language button hover effects
      this.languageButton.addEventListener("mouseover", () => {
        this.languageButton.style.backgroundColor = "#f3f4f6";
        this.languageButton.style.borderColor = "#3b82f6";
        this.languageButton.style.transform = "translateY(-1px)";
        this.languageButton.style.boxShadow = "0 2px 6px rgba(59, 130, 246, 0.15)";
      });

      this.languageButton.addEventListener("mouseout", () => {
        this.languageButton.style.backgroundColor = "white";
        this.languageButton.style.borderColor = "#d1d5db";
        this.languageButton.style.transform = "translateY(0)";
        this.languageButton.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.04)";
      });

      // Language button click - show language selector and mute mic
      this.languageButton.addEventListener("click", async () => {
        console.log("🌐 Language button clicked - showing selector");
        // Mute microphone
        this.isMuted = true;
        if (this.mediaStream) {
          const audioTracks = this.mediaStream.getAudioTracks();
          audioTracks.forEach(track => {
            track.enabled = false;
          });
        }
        this.updateAllMuteButtons();
        
        // Show language selection in chat
        const newLanguage = await this.showLanguageSelection();
        console.log(`🌐 New language selected: ${newLanguage}`);
        
        // Update language display
        this.updateLanguageDisplay(newLanguage);
        
        // Unmute microphone after language selected
        this.isMuted = false;
        if (this.mediaStream) {
          const audioTracks = this.mediaStream.getAudioTracks();
          audioTracks.forEach(track => {
            track.enabled = true;
          });
        }
        this.updateAllMuteButtons();
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

      this.headerCallControls.appendChild(this.languageButton);
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
          overflowX: "hidden",
          minHeight: "200px",
          maxHeight: "400px",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch", // iOS smooth scrolling
        },
      });

      // No static transcript container - transcripts will be added as chat messages dynamically

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
          width: "24px",
          height: "24px",
          position: "absolute",
          left: "16px",
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
          flex: "1",
          padding: "16px",
          backgroundColor: "#f9fafb",
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: "200px",
          maxHeight: "400px",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch", // iOS smooth scrolling
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

      // Add mute button event listener
      this.muteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.toggleMute();
      });

      // Add hover effects for mute button
      this.muteButton.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        this.muteButton.style.transform = "scale(1.05)";
        this.muteButton.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
      });

      this.muteButton.addEventListener("mouseout", (e) => {
        e.stopPropagation();
        this.muteButton.style.transform = "scale(1)";
        this.muteButton.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      });

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

      // Add end call button click handler
      this.endCallButton.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.endCurrentCall();
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
      if (!this.muteButton) {
        console.log("Mute button not found!");
        return;
      }
      
      this.muteButton.innerHTML = "";
      // Show mic-off icon only when actually muted, otherwise show mic icon
      const iconName = this.isMuted ? "mic-off" : "mic";
      console.log(`Updating mute button - isMuted: ${this.isMuted}, icon: ${iconName}`);
      const icon = createIcon(iconName, 16);
      icon.style.color = this.isMuted ? "#dc2626" : "#6b7280";
      this.muteButton.appendChild(icon);
      this.muteButton.style.backgroundColor = this.isMuted
        ? "#fef2f2"
        : "#f3f4f6";
    }

    updateHeaderMuteButton() {
      if (!this.headerMuteButton) {
        console.log("Header mute button not found!");
        return;
      }
      
      this.headerMuteButton.innerHTML = "";
      // Show mic-off icon only when actually muted, otherwise show mic icon
      const iconName = this.isMuted ? "mic-off" : "mic";
      console.log(`Updating header mute button - isMuted: ${this.isMuted}, icon: ${iconName}`);
      const icon = createIcon(iconName, 14);
      icon.style.color = this.isMuted ? "#dc2626" : "#6b7280";
      this.headerMuteButton.appendChild(icon);
      this.headerMuteButton.style.backgroundColor = this.isMuted
        ? "#fef2f2"
        : "#f3f4f6";
    }

    updateAllMuteButtons() {
      console.log("Updating all mute buttons");
      
      // Update main mute button if it exists
      if (this.muteButton) {
        console.log("Updating main mute button");
        this.updateMuteButton();
      } else {
        console.log("Main mute button not found");
      }
      
      // Update header mute button if it exists  
      if (this.headerMuteButton) {
        console.log("Updating header mute button");
        this.updateHeaderMuteButton();
      } else {
        console.log("Header mute button not found");
      }
    }

    updateListeningIndicator() {
      // Create or update listening indicator near the mic button
      if (!this.headerMuteButton) return;
      
      // Create indicator if it doesn't exist
      if (!this.listeningIndicator) {
        this.listeningIndicator = createElement("div", {
          style: {
            position: "absolute",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#10b981",
            bottom: "2px",
            right: "2px",
            animation: this.isListening ? "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
            opacity: this.isListening ? "1" : "0.3",
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          },
        });
        
        // Add indicator to header mute button container with relative positioning
        this.headerMuteButton.style.position = "relative";
        this.headerMuteButton.appendChild(this.listeningIndicator);
      }
      
      // Update indicator state
      if (this.isListening) {
        this.listeningIndicator.style.animation = "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite";
        this.listeningIndicator.style.opacity = "1";
        this.listeningIndicator.style.backgroundColor = "#10b981";
      } else {
        this.listeningIndicator.style.animation = "none";
        this.listeningIndicator.style.opacity = "0.3";
        this.listeningIndicator.style.backgroundColor = "#d1d5db";
      }
    }

    createFooter() {
      this.footer = createElement("div", {
        style: {
          // borderTop: "1px solid #e5e7eb",
          background: "#fff",
          padding: "10px 16px",
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
                svg.style.height = '12px';
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
        
        // Disable button immediately to prevent double-clicks
        this.startButton.disabled = true;
        this.startButton.style.opacity = "0.6";
        this.startButton.style.cursor = "not-allowed";
        
        e.preventDefault();
        this.handleStart();
      });

      // Add touch event for mobile debugging
      this.startButton.addEventListener("touchend", (e) => {
        console.log("📱 Start button touch end!", e);
        
        // Disable button immediately to prevent double-clicks
        this.startButton.disabled = true;
        this.startButton.style.opacity = "0.6";
        this.startButton.style.cursor = "not-allowed";
        
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
        this.headerMuteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.toggleMute();
        });
        
        // Add hover effects for header mute button
        this.headerMuteButton.addEventListener("mouseover", (e) => {
          e.stopPropagation();
          this.headerMuteButton.style.transform = "scale(1.1)";
          this.headerMuteButton.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        });

        this.headerMuteButton.addEventListener("mouseout", (e) => {
          e.stopPropagation();
          this.headerMuteButton.style.transform = "scale(1)";
          this.headerMuteButton.style.boxShadow = "none";
        });
      }
      if (this.headerEndCallButton) {
        this.headerEndCallButton.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.endCurrentCall();
        });
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
      // Prevent double-clicking on start call button
      if (this.isStarting) {
        console.log("⏸️ Call start already in progress, ignoring duplicate click");
        return;
      }

      // Mark user interaction for iOS audio permissions
      this.userInteracted = true;
      console.log("👤 User interaction detected for iOS audio permissions");
      
      // Set starting flag immediately to prevent double-clicks
      this.isStarting = true;
      console.log("🔥 handleStart() called - Set isStarting=true");
      
      console.log(
        "🔥 handleStart() called - currentMode:",
        this.currentMode,
        "isCallActive:",
        this.isCallActive
      );

      // Always start with call mode regardless of selection
      console.log("📞 Starting unified call + chat interface");
      try {
        if (this.isCallActive) {
          console.log("☎️ Ending current call");
          await this.endCurrentCall();
        } else {
          console.log("📞 Starting new call with chat transcript");
          await this.startChat(); // Initialize chat for transcript display
          await this.startCurrentCall();
        }
      } finally {
        // Reset starting flag when done
        this.isStarting = false;
        console.log("🔥 handleStart() completed - Set isStarting=false");
      }
    }

    async startChat() {
      // Don't set hasStarted = true yet, keep in welcome screen
      // this.hasStarted = true;
      // this.updateUI();

      // Show impressive loading animation
      if (!this.hasGreeted) {
        await this.showImpressioniveLoadingState();
        this.hasGreeted = true;
      }
    }

    async showImpressioniveLoadingState() {
      // Display an impressive loading animation while waiting for AI
      if (!this.messagesContainer) return;

      const loadingWrapper = createElement("div", {
        class: "shivai-impressive-loading",
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          animation: "slideIn 0.3s ease-out",
        },
      });

      // Animated loading dots container
      const dotsContainer = createElement("div", {
        style: {
          display: "flex",
          gap: "8px",
          alignItems: "flex-end",
          justifyContent: "center",
          marginBottom: "16px",
          height: "40px",
        },
      });

      // Create 5 animated dots with different delay for wave effect
      for (let i = 0; i < 5; i++) {
        const dot = createElement("div", {
          style: {
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            animation: `waveBounce 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          },
        });
        dotsContainer.appendChild(dot);
      }

      // Loading text
      const loadingText = createElement("p", {
        style: {
          fontSize: "14px",
          color: "#6b7280",
          margin: "0 0 8px 0",
          fontWeight: "500",
          textAlign: "center",
        },
      }, ["AI Employee is getting ready..."]);

      // Progress bar
      const progressContainer = createElement("div", {
        style: {
          width: "100%",
          maxWidth: "200px",
          height: "4px",
          backgroundColor: "#e5e7eb",
          borderRadius: "2px",
          overflow: "hidden",
          marginBottom: "16px",
        },
      });

      const progressBar = createElement("div", {
        style: {
          width: "0%",
          height: "100%",
          backgroundColor: "#3b82f6",
          animation: `slideProgress 2s ease-in-out infinite`,
          borderRadius: "2px",
        },
      });

      progressContainer.appendChild(progressBar);

      // Pulse effect circle - commented out
      // const pulseCircle = createElement("div", {
      //   style: {
      //     width: "60px",
      //     height: "60px",
      //     borderRadius: "50%",
      //     border: "3px solid #3b82f6",
      //     animation: `livePulse 1.5s ease-in-out infinite`,
      //     marginBottom: "16px",
      //     opacity: "0.6",
      //   },
      // });

      // loadingWrapper.appendChild(pulseCircle);
      loadingWrapper.appendChild(dotsContainer);
      loadingWrapper.appendChild(progressContainer);
      loadingWrapper.appendChild(loadingText);

      this.messagesContainer.appendChild(loadingWrapper);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

      // Simulate loading for 2-3 seconds
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Remove loading animation
      loadingWrapper.remove();
    }

    async showLanguageSelection() {
      return new Promise((resolve) => {
        // 10 main languages with country codes for flag API
        const languageOptions = [
          { code: "en", name: "English", country: "gb" },
          { code: "es", name: "Spanish", country: "es" },
          { code: "fr", name: "French", country: "fr" },
          { code: "de", name: "German", country: "de" },
          { code: "zh", name: "Chinese", country: "cn" },
          { code: "ja", name: "Japanese", country: "jp" },
          { code: "hi", name: "Hindi", country: "in" },
          { code: "ar", name: "Arabic", country: "sa" },
          { code: "pt", name: "Portuguese", country: "pt" },
          { code: "ru", name: "Russian", country: "ru" },
        ];

        // Create container - SMALLER UI
        const languageContainer = createElement("div", {
          class: "shivai-language-slider",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
            padding: "12px 12px",
            gap: "10px",
            // background: "linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%)",
            borderRadius: "8px",
            // boxShadow: "0 2px 8px rgba(59, 130, 246, 0.08)",
          },
        });

        // Title - SMALLER
        const title = createElement("p", {
          style: {
            fontSize: "12px",
            color: "#1f2937",
            margin: "0",
            textAlign: "center",
            fontWeight: "600",
            letterSpacing: "0.3px",
          },
        }, ["Select Language"]);

        // Slider container
        const sliderWrapper = createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            maxWidth: "340px",
          },
        });

        // Left arrow button - SMALLER
        const leftArrow = createElement("button", {
          style: {
            // background: "white",
            // border: "1px solid #d1d5db",
            // borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s ease",
            // boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
            padding: "0",
          },
        }, ["◀"]);

        // Slider track
        const sliderTrack = createElement("div", {
          style: {
            display: "flex",
            gap: "6px",
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            flex: "1",
            padding: "2px 2px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        });

        // Language buttons
        const languageButtons = [];

        languageOptions.forEach((lang) => {
          const langButton = createElement("button", {
            class: `lang-btn-${lang.code}`,
            style: {
              padding: "9px 8px",
              border: "1px solid #d1d5db",
              backgroundColor: "white",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              minWidth: "56px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
            },
          });

          // Flag image from flagcdn.com
          const flagImg = document.createElement("img");
          flagImg.src = `https://flagcdn.com/w40/${lang.country}.png`;
          flagImg.alt = `${lang.name} flag`;
          flagImg.style.width = "24px";
          flagImg.style.height = "16px";
          flagImg.style.borderRadius = "2px";
          flagImg.style.objectFit = "cover";
          flagImg.onerror = () => {
            flagImg.textContent = "🌍";
          };

          const nameSpan = createElement("span", {
            style: {
              fontSize: "9px",
              color: "#6b7280",
              fontWeight: "500",
              textAlign: "center",
              height: "14px",
              lineHeight: "14px",
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
          }, [lang.name]);

          langButton.appendChild(flagImg);
          langButton.appendChild(nameSpan);

          langButton.onmouseover = () => {
            if (!langButton.classList.contains("selected")) {
              langButton.style.borderColor = "#3b82f6";
              langButton.style.transform = "translateY(-1px)";
              langButton.style.boxShadow = "0 2px 6px rgba(59, 130, 246, 0.15)";
            }
          };

          langButton.onmouseout = () => {
            if (!langButton.classList.contains("selected")) {
              langButton.style.borderColor = "#d1d5db";
              langButton.style.transform = "translateY(0)";
              langButton.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.04)";
            }
          };

          langButton.onclick = async () => {
            console.log(`🌐 Language selected: ${lang.code}`);
            this.selectedLanguage = lang.code;

            // Update UI - mark as selected
            languageButtons.forEach(btn => {
              btn.classList.remove("selected");
              btn.style.borderColor = "#d1d5db";
              btn.style.backgroundColor = "white";
              btn.style.color = "#6b7280";
              const nameSpan = btn.querySelector("span:last-child");
              if (nameSpan) nameSpan.style.color = "#6b7280";
            });

            langButton.classList.add("selected");
            langButton.style.borderColor = "#3b82f6";
            langButton.style.backgroundColor = "#eff6ff";
            langButton.style.color = "#3b82f6";
            const nameSpan = langButton.querySelector("span:last-child");
            if (nameSpan) nameSpan.style.color = "#3b82f6";

            // Disable all buttons
            languageButtons.forEach(btn => {
              btn.disabled = true;
              btn.style.opacity = "0.6";
              btn.style.cursor = "not-allowed";
              btn.style.pointerEvents = "none";
            });

            // Smooth animation before removal
            setTimeout(() => {
              languageContainer.style.opacity = "0";
              languageContainer.style.transform = "translateY(-8px)";
              languageContainer.style.transition = "all 0.3s ease";
              setTimeout(() => {
                languageContainer.remove();
                // Mark language as selected and unmute after animation
                this.languageSelected = true;
                console.log("✅ Language selection complete - flag set to true");
                resolve(lang.code);
              }, 300);
            }, 500);
          };

          sliderTrack.appendChild(langButton);
          languageButtons.push(langButton);
        });

        // Right arrow button - SMALLER
        const rightArrow = createElement("button", {
          style: {
            // background: "white",
            // border: "1px solid #d1d5db",
            // borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s ease",
            // boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
            padding: "0",
          },
        }, ["▶"]);

        // Arrow button effects
        const setupArrowButton = (button, direction) => {
          button.onmouseover = () => {
            button.style.backgroundColor = "#f3f4f6";
            button.style.borderColor = "#3b82f6";
            button.style.transform = "scale(1.08)";
          };
          button.onmouseout = () => {
            button.style.backgroundColor = "white";
            button.style.borderColor = "#d1d5db";
            button.style.transform = "scale(1)";
          };
          button.onclick = () => {
            const scrollAmount = 70;
            if (direction === "left") {
              sliderTrack.scrollLeft -= scrollAmount;
            } else {
              sliderTrack.scrollLeft += scrollAmount;
            }
          };
        };

        setupArrowButton(leftArrow, "left");
        setupArrowButton(rightArrow, "right");

        // Assemble UI
        sliderWrapper.appendChild(leftArrow);
        sliderWrapper.appendChild(sliderTrack);
        sliderWrapper.appendChild(rightArrow);

        languageContainer.appendChild(title);
        languageContainer.appendChild(sliderWrapper);

        this.messagesContainer.appendChild(languageContainer);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // Add animation
        languageContainer.style.opacity = "0";
        languageContainer.style.transform = "translateY(8px)";
        setTimeout(() => {
          languageContainer.style.transition = "all 0.3s ease";
          languageContainer.style.opacity = "1";
          languageContainer.style.transform = "translateY(0)";
        }, 50);
      });
    }

    async startCurrentCall() {
      try {
        console.log("🚀 Starting call...");

        // Show connecting status in welcome screen
        this.showConnectingStatus("Initializing call...", "Please wait while we set up your connection");
        this.playSound('connecting');
        
        // Step 1: Request microphone permission FIRST (within user gesture)
        this.showConnectingStatus("Requesting microphone access...", "We need your permission to enable voice communication");
        
        try {
          await this.ensureMicrophoneAccess();
          this.showConnectingStatus("Microphone access granted! ✅", "Setting up audio pipeline...");
          this.playSound('connecting');
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (micErr) {
          console.warn("🔇 Microphone not granted/available:", micErr);
          this.showConnectingStatus("Microphone access denied ❌", "Voice call unavailable. Please grant microphone permission and try again.", true);
          return; // Exit if no microphone access
        }

        // Step 2: Progressive connection states with realistic delays
        await this.showProgressiveConnectionStatesInWelcome();

        // Step 3: Call the API to start call
        this.showConnectingStatus("Starting call session...", "Initializing with our servers");
        
        // Check if backend was warmed up from our cache
        const wasWarmedUp = this.connectionCache.has('backend-warmed');
        const callData = await this.api.startCall(wasWarmedUp);
        console.log("✅ Call started successfully:", callData);

        // Store call information
        this.currentCallId = callData.callId;
        this.pythonServiceUrl = callData.pythonServiceUrl;
        this.isCallActive = true;
        this.callStartTime = new Date(callData.startTime);
        
        // Clear previous transcripts for new call
        this.clearTranscripts();
        
        // Adjust modal height for call interface
        this.adjustModalHeight();
        
        // Step 4: Connect to voice service
        this.showConnectingStatus("Connecting to voice service...", "Establishing real-time communication");

        if (this.pythonServiceUrl) {
          try {
            await this.connectToWebSocket(this.pythonServiceUrl);
            this.showConnectingStatus("Voice service connected! 🎯", "Everything is ready!");
            this.playSound('call-start');
            
            // Log successful connection metrics for debugging
            const diagnostics = this.getConnectionDiagnostics();
            if (diagnostics.lastSuccessfulConnection) {
              console.log(`🎯 Connection established in ${diagnostics.lastSuccessfulConnection.time}ms`);
            }
            
          } catch (wsError) {
            console.warn("WebSocket connection failed, continuing in text mode:", wsError);
            
            // Log connection issues for debugging (non-blocking)
            setTimeout(() => this.logConnectionMetrics(), 100);
            
            // Continue without WebSocket (text mode) - don't wait
            this.showConnectingStatus("Call ready (text mode) ✅", "Voice service unavailable, text chat enabled");
            this.playSound('call-start');
          }
        } else {
          console.warn("⚠️ No Python service URL provided");
          this.showConnectingStatus("Call ready (text mode) ✅", "Voice service unavailable, text chat enabled");
          this.playSound('call-start');
        }

        await new Promise(resolve => setTimeout(resolve, 200));

        // Now transition to call interface
        this.hasStarted = true;
        this.hideConnectingStatus();
        this.updateModeUI();
        this.updateUI();
        // Only start timer if socket is connected and chat is open
        if (this.isWebSocketConnected && this.isOpen) {
          this.startCallTimer();
        }
        this.updateStartButton();

        // Update call status in the interface
        if (this.callStatus) {
          this.callStatus.textContent = "Connected! ShivAI Employee is listening 🎤";
          this.callStatus.style.color = "#10b981";
        }

        // Update live messages for calling state
        this.updateLiveMessagesForState('calling');

        // Show impressive loading animation
        await this.showImpressioniveLoadingState();

        // MUTE microphone initially (before greeting and language selection)
        console.log("🔇 Muting microphone before language selection");
        this.isMuted = true;
        if (this.mediaStream) {
          const audioTracks = this.mediaStream.getAudioTracks();
          audioTracks.forEach(track => {
            track.enabled = false;
            console.log(`🔇 Microphone muted - waiting for language selection`);
          });
        }
        this.updateAllMuteButtons();

        // Show language selection UI (no greeting message - skip to language selection)
        const selectedLanguage = await this.showLanguageSelection();
        console.log(`✅ User selected language: ${selectedLanguage}`);

        // Update language display in header
        this.updateLanguageDisplay(selectedLanguage);

        // UNMUTE microphone after language selection - now ready for user input
        console.log("🎤 Unmuting microphone after language selection");
        this.isMuted = false;
        if (this.mediaStream) {
          const audioTracks = this.mediaStream.getAudioTracks();
          audioTracks.forEach(track => {
            track.enabled = true;
            console.log(`✅ Microphone unmuted - Ready for user voice input`);
          });
        }
        
        // Add small delay to ensure media stream is fully updated before updating UI
        await new Promise(resolve => setTimeout(resolve, 100));
        
        this.updateAllMuteButtons();

        console.log("✅ Chat interface initialized - Ready for user response");

        console.log(
          "📞 Call interface activated with Call ID:",
          this.currentCallId
        );
      } catch (error) {
        console.error("❌ Failed to start call:", error);

        // Show error in welcome screen
        this.showConnectingStatus(
          "Connection failed ❌", 
          "Unable to establish connection. Please check your internet and try again.", 
          true
        );

        // Reset call state
        this.isCallActive = false;
        this.currentCallId = null;
        this.pythonServiceUrl = null;
        
        // Cleanup any partial mic resources
        try {
          this.stopAudioCapture();
        } catch (cleanupError) {
          console.warn("Cleanup error:", cleanupError.message);
        }

        // Show start button again after 3 seconds
        setTimeout(() => {
          this.hideConnectingStatus();
        }, 3000);
      }
    }

    async endCurrentCall() {
      try {
        console.log("🛑 Ending call...");
        
        // Play call end sound
        this.playSound('call-end');

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
        
        // Adjust modal height when call ends
        this.adjustModalHeight();
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

        // Ensure input container is visible for post-call messaging
        if (this.inputContainer) {
          this.inputContainer.style.display = "flex";
        }
        
        // Update UI
        this.updateStartButton();
        this.updateUI();
        
        // Add a helpful message for post-call interaction
        this.addMessage("System", "Call ended. You can continue the conversation by typing below.", "bot");

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
      // Only start timer if socket is connected and chat is open
      if (!this.isWebSocketConnected || !this.isOpen) return;
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
      
      // Adjust modal height based on content visibility
      this.adjustModalHeight();
    }

    adjustModalHeight() {
      if (!this.chatInterface) return;
      
      // Calculate dynamic height based on current state
      let targetHeight;
      
      if (!this.hasStarted) {
        // Welcome screen - need more space for all content
        targetHeight = 420; 
      } else if (this.isCallActive) {
        // Call active - larger for controls
        targetHeight = 480;
      } else {
        // Post-call chat mode
        targetHeight = 440;
      }
      
      // Ensure responsive height
      const maxHeight = Math.min(targetHeight + 50, window.innerHeight * 0.85);
      const minHeight = Math.max(380, targetHeight - 50);
      
      // Apply the calculated heights with smooth transition
      this.chatInterface.style.transition = "height 0.3s ease-in-out, min-height 0.3s ease-in-out";
      this.chatInterface.style.height = `${targetHeight}px`;
      this.chatInterface.style.minHeight = `${minHeight}px`;
      this.chatInterface.style.maxHeight = `${maxHeight}px`;
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
      console.log("Toggle mute called!");
      this.isMuted = !this.isMuted;
      console.log(`Mute toggled - isMuted: ${this.isMuted}`);
      
      // Control the actual microphone track
      if (this.mediaStream) {
        const audioTracks = this.mediaStream.getAudioTracks();
        audioTracks.forEach(track => {
          track.enabled = !this.isMuted;
          console.log(`Audio track enabled: ${track.enabled}`);
        });
      } else {
        console.log("No media stream found");
      }
      
      // Force update all mute buttons by recreating their content
      this.updateAllMuteButtons();
      
      // Adjust modal height when mute state changes
      this.adjustModalHeight();
      
      // Adjust modal height when mute state changes
      this.adjustModalHeight();
      
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

      await this.addMessage("user", message, { skipTyping: true });
      this.messageInput.value = "";
      this.setLoading(true);
      this.updateAIStatus("Thinking...", "#f59e0b");

      try {
        const response = await this.api.sendMessage(
          message,
          this.conversationId
        );
        await this.addMessage("bot", response);
        this.updateAIStatus("Online", "#10b981");
      } catch (apiError) {
        console.error("API error:", apiError);
        await this.addMessage(
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

    async addMessage(type, content, options = {}) {
      const messageId = this.generateId();
      const message = { id: messageId, type, content, timestamp: new Date() };

      // Show typing indicator for bot messages (unless it's the initial greeting)
      if (type === "bot" && !options.skipTyping && this.messages.length > 0) {
        await this.showTypingIndicator();
        
        // Simulate typing delay based on message length
        const typingDelay = Math.min(Math.max(content.length * 30, 800), 3000);
        await new Promise(resolve => setTimeout(resolve, typingDelay));
        
        this.removeTypingIndicator();
      }

      this.messages.push(message);
      const messageElement = this.createMessageElement(message);
      this.messagesContainer.appendChild(messageElement);

      // Scroll to bottom
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

      // Add slide-in animation
      messageElement.style.opacity = "0";
      messageElement.style.transform = "translateY(10px)";
      setTimeout(() => {
        messageElement.style.transition = "all 0.3s ease";
        messageElement.style.opacity = "1";
        messageElement.style.transform = "translateY(0)";
      }, 50);
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
      bubble.appendChild(contentSpan);

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
      // Handle audio playback from AI response with iOS optimizations
      if (!audioData || this.isMuted) {
        console.log("🔇 Audio muted or no data, skipping playback");
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        try {
          console.log("🔊 Playing AI audio response");

          // Stop any currently playing audio
          if (this.currentAudio) {
            if (this.currentAudio.pause) {
              this.currentAudio.pause();
              this.currentAudio.currentTime = 0;
            } else if (this.currentAudio.stop) {
              // WebAudio buffer source
              this.currentAudio.stop();
            }
          }

          // Try WebAudio API first (better for iOS)
          if (this.audioContext && this.audioContext.state !== 'suspended') {
            this.playWithWebAudio(audioData)
              .then(resolve)
              .catch(error => {
                console.warn("WebAudio playback failed, falling back to HTMLAudio:", error);
                this.playWithHTMLAudio(audioData).then(resolve).catch(reject);
              });
          } else {
            // Fallback to HTMLAudio
            this.playWithHTMLAudio(audioData).then(resolve).catch(reject);
          }
        } catch (error) {
          console.error("❌ Error in audio playback:", error);
          reject(error);
        }
      });
    }

    async playWithWebAudio(base64AudioData) {
      try {
        // Ensure AudioContext is resumed on iOS (requires user gesture)
        if (this.audioContext.state === 'suspended') {
          if (this.userInteracted) {
            try {
              await this.audioContext.resume();
              console.log('🎤 AudioContext resumed for playback');
            } catch (e) {
              console.warn('Could not resume AudioContext:', e);
              throw e;
            }
          } else {
            throw new Error('AudioContext suspended and no user interaction');
          }
        }

        // Convert base64 to ArrayBuffer
        const binaryString = atob(base64AudioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Stop any existing buffer source
        if (this.currentBufferSource) {
          try { 
            this.currentBufferSource.stop(0); 
          } catch (stopError) {
            console.warn("Buffer source stop error:", stopError.message);
          }
          try {
            this.currentBufferSource.disconnect();
          } catch (disconnectError) {
            console.warn("Buffer source disconnect error:", disconnectError.message);
          }
          this.currentBufferSource = null;
        }
        
        // Decode audio data (use slice to avoid transfer issues)
        const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer.slice(0));
        
        // Create buffer source
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        
        // Store reference for potential stopping
        this.currentBufferSource = source;
        this.currentAudio = source; // Keep both for compatibility
        this.isPlayingAudio = true;
        
        return new Promise((resolve, reject) => {
          source.onended = () => {
            console.log("✅ WebAudio playback finished");
            this.isPlayingAudio = false;
            this.currentBufferSource = null;
            this.currentAudio = null;
            resolve();
          };
          
          try {
            source.start(0);
            console.log("🔊 WebAudio playback started");
          } catch (error) {
            this.isPlayingAudio = false;
            this.currentBufferSource = null;
            this.currentAudio = null;
            reject(error);
          }
        });
      } catch (error) {
        this.isPlayingAudio = false;
        this.currentBufferSource = null;
        this.currentAudio = null;
        throw error;
      }
    }

    playWithHTMLAudio(base64AudioData) {
      return new Promise((resolve, reject) => {
        try {
          // Convert base64 audio data to blob
          const audioBlob = new Blob(
            [Uint8Array.from(atob(base64AudioData), (c) => c.charCodeAt(0))],
            { type: "audio/wav" }
          );
          const audioUrl = URL.createObjectURL(audioBlob);
          
          // Create new audio element with iOS optimizations
          const audio = new Audio(audioUrl);
          this.currentAudio = audio;

          // iOS-specific attributes for better performance
          audio.playsInline = true;
          audio.setAttribute('playsinline', 'true');
          audio.crossOrigin = 'anonymous';
          audio.preload = 'auto';
          
          // iOS performance optimizations
          if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            audio.setAttribute('webkit-playsinline', 'true');
            audio.muted = false; // Ensure not muted
            audio.volume = 1.0; // Full volume
          }

          // Set up event listeners
          audio.oncanplaythrough = () => {
            console.log("🔊 HTMLAudio ready to play");
            this.isPlayingAudio = true;
            
            // iOS requires immediate play after user gesture
            audio.play()
              .then(() => {
                console.log("✅ HTMLAudio playback started successfully");
              })
              .catch((error) => {
                console.error("❌ HTMLAudio play failed:", error);
                this.isPlayingAudio = false;
                URL.revokeObjectURL(audioUrl);
                reject(error);
              });
          };


          audio.onended = () => {
            console.log("✅ HTMLAudio playback finished");
            this.isPlayingAudio = false;
            this.currentAudio = null;
            URL.revokeObjectURL(audioUrl);
            resolve();
          };

          audio.onerror = (error) => {
            console.error("❌ HTMLAudio error:", error);
            this.isPlayingAudio = false;
            this.currentAudio = null;
            URL.revokeObjectURL(audioUrl);
            reject(error);
          };

          // Load the audio
          audio.load();
        } catch (error) {
          console.error("❌ Error creating HTMLAudio:", error);
          this.isPlayingAudio = false;
          this.currentAudio = null;
          reject(error);
        }
      });
    }

    handleTranscription(text, isAI = false) {
      // Handle speech-to-text transcription as chat messages
      try {
        console.log(`📝 Processing ${isAI ? 'AI' : 'user'} transcription:`, text);

        if (!text || !text.trim()) {
          return;
        }

        // Detect language with enhanced accuracy
        const language = this.detectLanguage(text);
        console.log(`🌐 Detected language: ${language}`);

        // Remove any existing loader for this type
        if (isAI) {
          this.removeAILoader();
        } else {
          this.removeUserLoader();
        }

        // Create or update transcript message
        if (isAI) {
          // For AI: Add a small delay to ensure user message is fully rendered first
          setTimeout(() => {
            this.addTranscriptMessage(text, true);
            this.isUpdatingAI = false; // Reset flag
            console.log("✅ AI message added to DOM");
            
            // Auto-scroll to show latest transcript
            if (this.messagesContainer) {
              this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }
          }, 100);
        } else {
          // Create new user message immediately
          this.addTranscriptMessage(text, false);
          console.log("✅ User message added to DOM");
          
          // Show AI loader after user speaks
          this.showAILoader();
          
          // Auto-scroll to show latest transcript
          if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
          }
        }

      } catch (error) {
        console.error("❌ Error handling transcription:", error);
      }
    }

    updateStreamingAIMessage(text) {
      // Update existing AI message for streaming (separate from handleTranscription)
      try {
        const existingAIMessage = document.querySelector('.shivai-transcript-ai:last-child');
        if (existingAIMessage) {
          const textElement = existingAIMessage.querySelector('.shivai-transcript-text');
          if (textElement) {
            textElement.textContent = text;
            // Update language for streaming content
            const language = this.detectLanguage(text);
            const langIndicator = existingAIMessage.querySelector('.shivai-lang-indicator');
            if (langIndicator) {
              langIndicator.textContent = this.getLanguageName(language);
            }
          }
        }
        
        // Auto-scroll
        if (this.messagesContainer) {
          this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
      } catch (error) {
        console.error("❌ Error updating streaming AI message:", error);
      }
    }

    addTranscriptMessage(text, isAI) {
      if (!this.messagesContainer) return;

      const messageWrapper = createElement("div", {
        class: `shivai-transcript-message ${isAI ? 'shivai-transcript-ai' : 'shivai-transcript-user'}`,
        style: {
          display: "flex",
          flexDirection: "column",
          marginBottom: "16px",
          animation: "slideIn 0.3s ease-out",
          opacity: "0",
          animationFillMode: "forwards",
        },
      });

      // Avatar and content container
      const messageContent = createElement("div", {
        style: {
          display: "flex",
          gap: "8px",
          alignItems: "flex-start",
          flexDirection: isAI ? "row" : "row-reverse",
        },
      });

      // Avatar
      const avatar = createElement("div", {
        style: {
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: isAI ? "#f0fdf4" : "#eff6ff",
          border: `2px solid ${isAI ? "#86efac" : "#93c5fd"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: "0",
          color: isAI ? "#16a34a" : "#2563eb",
        },
      });

      if (isAI) {
        avatar.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z"/>
          </svg>`;
      } else {
        avatar.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-width="2" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>`;
      }

      // Message bubble
      const bubble = createElement("div", {
        style: {
          maxWidth: "75%",
          backgroundColor: isAI ? "#ffffff" : "#3b82f6",
          color: isAI ? "#1f2937" : "#ffffff",
          padding: "10px 14px",
          borderRadius: isAI ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          border: isAI ? "1px solid #e5e7eb" : "none",
        },
      });

      // Header with name and language
      const header = createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "4px",
        },
      });

      const name = createElement("span", {
        style: {
          fontSize: "11px",
          fontWeight: "600",
          color: isAI ? "#6b7280" : "#dbeafe",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      }, [isAI ? "ShivAI" : "You"]);

      header.appendChild(name);

      // Transcript text
      const transcriptText = createElement("div", {
        class: "shivai-transcript-text",
        style: {
          fontSize: "14px",
          lineHeight: "1.5",
          wordWrap: "break-word",
          color: isAI ? "#1f2937" : "#ffffff",
        },
      }, [text]);

      bubble.appendChild(header);
      bubble.appendChild(transcriptText);

      messageContent.appendChild(avatar);
      messageContent.appendChild(bubble);
      messageWrapper.appendChild(messageContent);

      this.messagesContainer.appendChild(messageWrapper);

      // Trigger animation
      setTimeout(() => {
        messageWrapper.style.opacity = "1";
      }, 10);
    }

    showUserLoader() {
      if (!this.messagesContainer) return;

      // Remove existing loader if any
      this.removeUserLoader();

      const loaderWrapper = createElement("div", {
        class: "shivai-user-loader",
        style: {
          display: "flex",
          flexDirection: "column",
          marginBottom: "16px",
          animation: "slideIn 0.3s ease-out",
        },
      });

      const messageContent = createElement("div", {
        style: {
          display: "flex",
          gap: "8px",
          alignItems: "flex-start",
          flexDirection: "row-reverse",
        },
      });

      // Avatar
      const avatar = createElement("div", {
        style: {
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#eff6ff",
          border: "2px solid #93c5fd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: "0",
          color: "#2563eb",
        },
      });

      avatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path fill="none" stroke="currentColor" stroke-width="2" d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        </svg>`;

      // Loader bubble
      const bubble = createElement("div", {
        style: {
          backgroundColor: "#3b82f6",
          padding: "10px 14px",
          borderRadius: "16px 16px 4px 16px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        },
      });

      const loaderText = createElement("span", {
        style: {
          fontSize: "13px",
          color: "#ffffff",
          fontWeight: "500",
        },
      }, ["Listening"]);

      // Animated dots
      const dotsContainer = createElement("div", {
        style: {
          display: "flex",
          gap: "3px",
          alignItems: "center",
        },
      });

      for (let i = 0; i < 3; i++) {
        const dot = createElement("div", {
          style: {
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            animation: `typingBounce 1.4s ease-in-out infinite`,
            animationDelay: `${i * 0.16}s`,
          },
        });
        dotsContainer.appendChild(dot);
      }

      bubble.appendChild(loaderText);
      bubble.appendChild(dotsContainer);
      messageContent.appendChild(avatar);
      messageContent.appendChild(bubble);
      loaderWrapper.appendChild(messageContent);

      this.messagesContainer.appendChild(loaderWrapper);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    removeUserLoader() {
      const loader = document.querySelector('.shivai-user-loader');
      if (loader) {
        loader.remove();
      }
    }

    showAILoader() {
      if (!this.messagesContainer) return;

      // Remove existing loader if any
      this.removeAILoader();

      const loaderWrapper = createElement("div", {
        class: "shivai-ai-loader",
        style: {
          display: "flex",
          flexDirection: "column",
          marginBottom: "16px",
          animation: "slideIn 0.3s ease-out",
        },
      });

      const messageContent = createElement("div", {
        style: {
          display: "flex",
          gap: "8px",
          alignItems: "flex-start",
        },
      });

      // Avatar
      const avatar = createElement("div", {
        style: {
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#f0fdf4",
          border: "2px solid #86efac",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: "0",
          color: "#16a34a",
        },
      });

      avatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z"/>
        </svg>`;

      // Loader bubble
      const bubble = createElement("div", {
        style: {
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          padding: "10px 14px",
          borderRadius: "16px 16px 16px 4px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        },
      });

      const loaderText = createElement("span", {
        style: {
          fontSize: "13px",
          color: "#6b7280",
          fontWeight: "500",
        },
      }, ["Thinking"]);

      // Animated dots
      const dotsContainer = createElement("div", {
        style: {
          display: "flex",
          gap: "3px",
          alignItems: "center",
        },
      });

      for (let i = 0; i < 3; i++) {
        const dot = createElement("div", {
          style: {
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#9ca3af",
            animation: `typingBounce 1.4s ease-in-out infinite`,
            animationDelay: `${i * 0.16}s`,
          },
        });
        dotsContainer.appendChild(dot);
      }

      bubble.appendChild(loaderText);
      bubble.appendChild(dotsContainer);
      messageContent.appendChild(avatar);
      messageContent.appendChild(bubble);
      loaderWrapper.appendChild(messageContent);

      this.messagesContainer.appendChild(loaderWrapper);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    removeAILoader() {
      const loader = document.querySelector('.shivai-ai-loader');
      if (loader) {
        loader.remove();
      }
      this.isUpdatingAI = false;
    }

    formatTimestamp(date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${displayHours}:${displayMinutes} ${ampm}`;
    }

    getLanguageName(code) {
      const languages = {
        'ar': '🇸🇦 AR',
        'ru': '🇷🇺 RU',
        'zh': '🇨🇳 ZH',
        'hi': '🇮🇳 HI',
        'ko': '🇰🇷 KO',
        'he': '🇮🇱 HE',
        'th': '🇹🇭 TH',
        'ja': '🇯🇵 JA',
        'en': '🇺🇸 EN',
        'es': '🇪🇸 ES',
        'fr': '🇫🇷 FR',
        'de': '🇩🇪 DE',
        'pt': '🇵🇹 PT',
        'it': '🇮🇹 IT',
      };
      return languages[code] || '🌐 ' + code.toUpperCase();
    }

    updateLanguageDisplay(languageCode) {
      // Update the language button display with language code in round circle
      if (!this.languageCodeText) return;
      
      // Create a mapping of language codes to display codes
      const languageCodeMap = {
        'en': 'En',
        'es': 'Es',
        'fr': 'Fr',
        'de': 'De',
        'zh': 'Zh',
        'ja': 'Ja',
        'hi': 'Hi',
        'ar': 'Ar',
        'pt': 'Pt',
        'ru': 'Ru',
      };
      
      const displayCode = languageCodeMap[languageCode] || languageCode.toUpperCase();
      this.languageCodeText.textContent = displayCode;
      
      console.log(`✅ Language button updated to: ${displayCode}`);
    }

    detectLanguage(text) {
      // Enhanced language detection with better accuracy for mixed languages (Hinglish)
      if (!text || !text.trim()) return 'en';

      const trimmedText = text.trim();
      
      // Count different script types for better detection
      const scriptCounts = {
        arabic: (trimmedText.match(/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length,
        cyrillic: (trimmedText.match(/[\u0400-\u04FF]/g) || []).length,
        chinese: (trimmedText.match(/[\u4E00-\u9FFF\u3400-\u4DBF]/g) || []).length,
        devanagari: (trimmedText.match(/[\u0900-\u097F]/g) || []).length,
        korean: (trimmedText.match(/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g) || []).length,
        hebrew: (trimmedText.match(/[\u0590-\u05FF]/g) || []).length,
        thai: (trimmedText.match(/[\u0E00-\u0E7F]/g) || []).length,
        japanese: (trimmedText.match(/[\u3040-\u309F\u30A0-\u30FF]/g) || []).length,
        latin: (trimmedText.match(/[a-zA-Z]/g) || []).length,
      };
      
      const totalChars = trimmedText.length;
      
      // Calculate percentages
      const arabicPercent = (scriptCounts.arabic / totalChars) * 100;
      const cyrillicPercent = (scriptCounts.cyrillic / totalChars) * 100;
      const chinesePercent = (scriptCounts.chinese / totalChars) * 100;
      const devanagariPercent = (scriptCounts.devanagari / totalChars) * 100;
      const koreanPercent = (scriptCounts.korean / totalChars) * 100;
      const hebrewPercent = (scriptCounts.hebrew / totalChars) * 100;
      const thaiPercent = (scriptCounts.thai / totalChars) * 100;
      const japanesePercent = (scriptCounts.japanese / totalChars) * 100;
      const latinPercent = (scriptCounts.latin / totalChars) * 100;
      
      // If significant non-Latin script detected (>20%), use that language
      if (arabicPercent > 20) return 'ar';
      if (cyrillicPercent > 20) return 'ru';
      if (chinesePercent > 20) return 'zh';
      if (koreanPercent > 20) return 'ko';
      if (hebrewPercent > 20) return 'he';
      if (thaiPercent > 20) return 'th';
      if (japanesePercent > 20) return 'ja';
      
      // Special handling for Hinglish (Hindi + English mix)
      // If Devanagari is present but mixed with English, it's Hinglish
      if (devanagariPercent > 5 && devanagariPercent < 60 && latinPercent > 20) {
        return 'hi'; // Mark as Hindi for Hinglish
      }
      
      // If mostly Devanagari (>30%), it's pure Hindi
      if (devanagariPercent > 30) return 'hi';
      
      // For Latin script, check common words to identify European languages
      if (latinPercent > 50) {
        // Spanish (common words)
        if (/\b(el|la|los|las|un|una|de|del|y|es|en|que|por|para|con|no|se|su|al|lo|cómo|qué)\b/i.test(trimmedText)) {
          return 'es';
        }
        
        // French (accents and common words)
        if (/[àâäæçéèêëïîôùûü]/.test(trimmedText) || /\b(le|la|les|un|une|des|de|du|et|est|en|que|pour|dans|ce|il|elle|on|ne|se|au)\b/i.test(trimmedText)) {
          return 'fr';
        }
        
        // German (special characters and common words)
        if (/[äöüß]/.test(trimmedText) || /\b(der|die|das|den|dem|des|ein|eine|und|ist|in|zu|den|das|nicht|von|sie|mit|für|auf|er|es|auch|an|werden|aus)\b/i.test(trimmedText)) {
          return 'de';
        }
        
        // Portuguese (special characters and common words)
        if (/[ãõ]/.test(trimmedText) || /\b(o|a|os|as|um|uma|de|do|da|dos|das|e|é|em|que|por|para|com|não|se|no|na|ao|à)\b/i.test(trimmedText)) {
          return 'pt';
        }
        
        // Italian (common words)
        if (/\b(il|lo|la|i|gli|le|un|uno|una|di|del|dello|della|dei|degli|delle|e|è|in|che|per|con|non|si|da|nel|nella)\b/i.test(trimmedText)) {
          return 'it';
        }
      }
      
      // Default to English for Latin script
      return 'en';
    }

    clearTranscripts() {
      // Clear all transcript messages from chat
      try {
        console.log("🧹 Clearing transcripts");
        
        // Reset AI transcript accumulator
        this.currentAiTranscript = "";
        this.isUpdatingAI = false;
        
        // Remove all transcript messages
        if (this.messagesContainer) {
          const transcripts = this.messagesContainer.querySelectorAll('.shivai-transcript-message');
          transcripts.forEach(transcript => transcript.remove());
          
          // Remove any loaders
          this.removeUserLoader();
          this.removeAILoader();
        }
      } catch (error) {
        console.error("❌ Error clearing transcripts:", error);
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
      
      // Check cached permission status for faster flow
      const cachedPermission = this.connectionCache.get('mic-permission');
      if (cachedPermission === 'denied') {
        throw new Error("Microphone access was previously denied");
      }
      
      // Check for getUserMedia support with iOS Safari fallbacks
      const getUserMedia = navigator.mediaDevices?.getUserMedia || 
                          navigator.getUserMedia || 
                          navigator.webkitGetUserMedia || 
                          navigator.mozGetUserMedia;
                          
      if (!getUserMedia) {
        throw new Error("getUserMedia not supported in this browser");
      }
      
      try {
        if (this.callStatus) {
          const statusText = cachedPermission === 'granted' ? 
            "Accessing microphone..." : "Requesting microphone...";
          this.callStatus.textContent = statusText;
          this.callStatus.style.color = "#f59e0b";
        }
        
        // Enhanced high-quality audio constraints for clear AI transcription
        const constraints = {
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: false,  // Disabled for better quality control
            typingNoiseDetection: true,  // Detect typing noise
            experimentalEchoCancellation: true,
            experimentalNoiseSuppression: true,
            experimentalAutoGainControl: false,
            // High quality audio settings for rich audio
            sampleRate: { ideal: 48000, min: 16000 },  // Increased to 48kHz for richness
            channelCount: { ideal: 1, min: 1 },
            // Low latency for real-time
            latency: { ideal: 0.01, max: 0.1 },
            // Force use of device's primary microphone
            deviceId: 'default',
            // Enhanced audio processing
            googEchoCancellation: true,
            googNoiseSuppression: true,
            googAutoGainControl: false,
            googHighpassFilter: true  // Remove low frequency noise
          },
          video: false
        };
        
        let stream;
        if (navigator.mediaDevices?.getUserMedia) {
          // Modern browsers
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        } else {
          // Fallback for older browsers
          stream = await new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
        
        this.mediaStream = stream;
        
        // Immediately mute microphone after getting stream (will be unmuted only after language selection)
        console.log("🔇 Muting microphone immediately after access");
        this.isMuted = true;
        const audioTracks = stream.getAudioTracks();
        audioTracks.forEach(track => {
          track.enabled = false;
        });
        
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
      // Prevent multiple simultaneous capture attempts
      if (this.hasStartedCapture) {
        console.log("🎤 Audio capture already started, skipping");
        return;
      }

      // Ensure mic and WS
      await this.ensureMicrophoneAccess();
      if (!this.webSocket || !this.isWebSocketConnected) {
        console.warn("🔌 WebSocket not connected; cannot stream audio yet");
        return;
      }

      this.hasStartedCapture = true;

      try {
        // Create/resume audio context with high-quality settings
        if (!this.audioContext) {
          // Try to create context with 48kHz for rich audio quality
          try {
            this.audioContext = new (window.AudioContext ||
              window.webkitAudioContext)({ 
                sampleRate: 48000,  // High quality sample rate
                latencyHint: 'interactive' // Balanced latency
              });
          } catch (sampleRateError) {
            // Fallback to default sample rate if 48kHz not supported
            console.warn("48kHz not supported, using default sample rate:", sampleRateError.message);
            this.audioContext = new (window.AudioContext ||
              window.webkitAudioContext)({ 
                latencyHint: 'interactive'
              });
          }
            
          // Log audio capabilities for debugging
          console.log("🔊 AudioContext created for high-quality capture:");
          console.log("  - Sample Rate:", this.audioContext.sampleRate, "Hz");
          console.log("  - Max Channels:", this.audioContext.destination.maxChannelCount);
          console.log("  - State:", this.audioContext.state);
        }
        
        // iOS requires explicit resume after user gesture
        if (this.audioContext.state === "suspended") {
          try {
            await this.audioContext.resume();
            console.log('🎤 Audio context resumed for capture');
          } catch (error) {
            console.warn('⚠️ Failed to resume audio context - iOS may require user interaction first:', error);
            // Continue anyway - the unlockAudio handler will catch this
          }
        }

        // Create nodes if not already present
        if (!this.audioSource) {
          this.audioSource = this.audioContext.createMediaStreamSource(
            this.mediaStream
          );
        }
        
        // Create analyser for VAD and frequency analysis
        if (!this.analyser) {
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 2048;  // 2048-point FFT for detailed frequency analysis
          this.analyser.smoothingTimeConstant = 0.8;
          this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
          this.audioSource.connect(this.analyser);
        }
        
        if (!this.audioProcessor) {
          // Use larger buffer size for better audio quality (8192 samples)
          this.audioProcessor = this.audioContext.createScriptProcessor(
            8192,  // Larger buffer for better quality
            1,     // 1 input channel
            1      // 1 output channel
          );
          this.audioProcessor.onaudioprocess = (e) => {
            if (
              !this.isWebSocketConnected ||
              !this.webSocket ||
              this.webSocket.readyState !== WebSocket.OPEN
            )
              return;
            // Skip if muted OR if language hasn't been selected yet OR if not connected
            if (this.isMuted || !this.languageSelected || !this.isWebSocketConnected) return;

            const inputData = e.inputBuffer.getChannelData(0);
            
            // Calculate energy metrics
            let maxVolume = 0;
            let energySum = 0;
            
            for (let i = 0; i < inputData.length; i++) {
              const abs = Math.abs(inputData[i]);
              energySum += abs * abs;
              if (abs > maxVolume) maxVolume = abs;
            }
            
            const rmsEnergy = Math.sqrt(energySum / inputData.length);
            
            // Skip complete silence (below noise floor)
            if (maxVolume < 0.003) {
              this.isListening = false;
              this.updateListeningIndicator();
              return;
            }
            
            // Frequency analysis for speech patterns (300-3000Hz range for human voice)
            this.analyser.getByteFrequencyData(this.frequencyData);
            
            const speechStart = Math.floor((300 * this.analyser.fftSize) / this.audioContext.sampleRate);
            const speechEnd = Math.floor((3000 * this.analyser.fftSize) / this.audioContext.sampleRate);
            
            let speechEnergy = 0;
            let speechPeaks = 0;
            
            for (let i = speechStart; i < speechEnd && i < this.frequencyData.length; i++) {
              speechEnergy += this.frequencyData[i];
              if (this.frequencyData[i] > 100) speechPeaks++;
            }
            
            speechEnergy /= Math.max(1, speechEnd - speechStart);
            
            // Improved speech detection: check energy AND speech frequency content
            const hasEnergy = rmsEnergy > this.vadThreshold;
            const hasSpeechFreqs = speechEnergy > 25 && speechPeaks > 5;
            const isSpeech = (hasEnergy || hasSpeechFreqs) && rmsEnergy > 0.008;
            
            const now = Date.now();
            
            // Update listening state
            if (isSpeech) {
              this.isListening = true;
              this.lastSpeechActivityTime = now;
              
              if (!this.speechStart) {
                this.speechStart = now;
                console.log(`🎤 Speech detected - RMS: ${rmsEnergy.toFixed(4)}, freq: ${speechEnergy.toFixed(1)}, peaks: ${speechPeaks}`);
              }
              this.silenceStart = null;
            } else {
              if (this.speechStart && !this.silenceStart) {
                this.silenceStart = now;
              }
              
              // Check if enough time has passed since last speech activity
              if (now - this.lastSpeechActivityTime > 300) {
                this.isListening = false;
              }
            }
            
            // Update listening indicator
            this.updateListeningIndicator();
            
            // Only send if we're in an active speech window
            if (!this.speechStart) {
              return;
            }
            
            // Check for end of speech (sustained silence)
            if (this.silenceStart && (now - this.silenceStart) > this.silenceDuration) {
              console.log(`🤫 Speech ended - silence duration: ${now - this.silenceStart}ms`);
              this.speechStart = null;
              this.silenceStart = null;
              this.isListening = false;
              this.updateListeningIndicator();
              return;
            }
            
            // Audio processing: Light high-pass filter for noise reduction
            const processedData = new Float32Array(inputData.length);
            let prevValue = 0;
            
            for (let i = 0; i < inputData.length; i++) {
              let val = inputData[i];
              // High-pass filter to reduce low-frequency noise
              if (i > 0) {
                val = val - prevValue * 0.92;
                prevValue = inputData[i];
              }
              processedData[i] = Math.max(-1, Math.min(1, val)); // Clamp to [-1, 1]
            }
            
            // Convert to PCM16 (16-bit signed integer)
            const pcm16 = new Int16Array(processedData.length);
            for (let i = 0; i < processedData.length; i++) {
              const s = Math.max(-1, Math.min(1, processedData[i]));
              pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
            }

            // Base64 encode
            const base64 = this.arrayBufferToBase64(pcm16.buffer);

            // Send audio frame with enhanced VAD info
            this.sendWebSocketMessage({
              type: "audio",
              callId: this.currentCallId,
              audio: base64,
              sampleRate: this.audioContext.sampleRate,
              timestamp: now,
              vad: {
                isSpeech: isSpeech,
                energy: rmsEnergy,
                speechEnergy: speechEnergy,
                speechPeaks: speechPeaks,
                confidence: Math.min(1, (hasEnergy ? 0.5 : 0) + (hasSpeechFreqs ? 0.5 : 0))
              }
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
        console.warn("⚠️ Error disconnecting processor:", err.message);
      }

      try {
        if (this.audioSource) {
          this.audioSource.disconnect();
          this.audioSource = null;
        }
      } catch (err) {
        console.warn("⚠️ Error disconnecting source:", err.message);
      }

      // Stop mic tracks
      try {
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach((t) => t.stop());
          this.mediaStream = null;
        }
      } catch (err) {
        console.warn("⚠️ Error stopping media tracks:", err.message);
      }

      // Close audio context
      try {
        if (this.audioContext && this.audioContext.state !== "closed") {
          this.audioContext.close();
        }
      } catch (err) {
        console.warn("⚠️ Error closing audio context:", err.message);
      }
      this.audioContext = null;
      this.hasStartedCapture = false; // Reset capture flag

      // Stop any AI audio playback
      this.stopAudioPlayback();
    }

    // ===== AI Audio Playback & Transcript Handling (Working Version) =====
    async playQueuedAudio() {
      if (this.audioChunksQueue.length === 0) {
        this.isPlayingAudio = false;
        
        // Unmute microphone when AI finishes speaking
        console.log("🎤 AI finished speaking - Unmuting microphone");
        this.isMuted = false;
        if (this.mediaStream) {
          const audioTracks = this.mediaStream.getAudioTracks();
          audioTracks.forEach(track => {
            track.enabled = true;
            console.log("✅ Microphone unmuted - User can now speak");
          });
        }
        this.updateAllMuteButtons();
        return;
      }

      this.isPlayingAudio = true;

      // MUTE microphone when AI starts speaking
      console.log("🔇 AI is speaking - Muting microphone");
      this.isMuted = true;
      if (this.mediaStream) {
        const audioTracks = this.mediaStream.getAudioTracks();
        audioTracks.forEach(track => {
          track.enabled = false;
          console.log("🤐 Microphone muted during AI playback");
        });
      }
      this.updateAllMuteButtons();

      try {
        // Collect all available chunks to reduce gaps (like working app.js)
        const chunksToPlay = [];
        while (this.audioChunksQueue.length > 0) {
          chunksToPlay.push(this.audioChunksQueue.shift());
        }

        // Combine chunks into single blob
        const audioBuffers = chunksToPlay.map(base64 => this.base64ToArrayBuffer(base64));
        const totalLength = audioBuffers.reduce((acc, buf) => acc + buf.byteLength, 0);
        const combined = new Uint8Array(totalLength);
        
        let offset = 0;
        for (const buffer of audioBuffers) {
          combined.set(new Uint8Array(buffer), offset);
          offset += buffer.byteLength;
        }

        // Create blob (we assume server sends mp3/mpeg format)
        const blob = new Blob([combined], { type: 'audio/mpeg' });
        const arrayBuffer = await blob.arrayBuffer();

        console.log(`🎵 Playing ${chunksToPlay.length} audio chunks, total size: ${totalLength} bytes`);

        // Ensure AudioContext is resumed on iOS (requires user gesture)
        if (this.audioContext && this.audioContext.state === 'suspended') {
          if (this.userInteracted) {
            try {
              await this.audioContext.resume();
              console.log('🎤 AudioContext resumed for playback');
            } catch (e) {
              console.warn('Could not resume AudioContext:', e);
            }
          }
        }

        // Prefer decoding/playback via AudioContext for lower latency and better control
        if (this.audioContext && this.audioContext.decodeAudioData) {
          try {
            const decoded = await this.audioContext.decodeAudioData(arrayBuffer.slice(0));

            // Stop any existing buffer source
            if (this.currentBufferSource) {
              try { 
                this.currentBufferSource.stop(0); 
              } catch (stopError) {
                console.warn("Buffer source stop error:", stopError.message);
              }
              this.currentBufferSource.disconnect();
              this.currentBufferSource = null;
            }

            const source = this.audioContext.createBufferSource();
            source.buffer = decoded;
            
            // Create gain node for MAXIMUM volume
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = 3.0; // Maximum safe amplification
            
            // Connect: source -> gain -> destination (MAXIMUM VOLUME)
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            this.currentBufferSource = source;

            source.onended = () => {
              console.log("✅ WebAudio playback finished");
              this.currentBufferSource = null;
              // Continue playing if more chunks arrived, otherwise unmute
              if (this.audioChunksQueue.length > 0) {
                this.playQueuedAudio();
              } else {
                // Unmute microphone when audio finishes
                console.log("🎤 Audio finished - Unmuting microphone");
                this.isMuted = false;
                if (this.mediaStream) {
                  const audioTracks = this.mediaStream.getAudioTracks();
                  audioTracks.forEach(track => {
                    track.enabled = true;
                    console.log("✅ Microphone unmuted after audio finished");
                  });
                }
                this.updateAllMuteButtons();
                this.isPlayingAudio = false;
              }
            };

            source.start(0);
            this.audioStartTime = Date.now(); // Track when audio started
            console.log("🔊 WebAudio playback started with MAXIMUM VOLUME");

          } catch (e) {
            console.warn('decodeAudioData failed, falling back to HTMLAudioElement:', e);

            // Fallback to HTMLAudio element for playback with MAXIMUM VOLUME
            this.playHTMLAudioMaxVolume(blob);
          }

        } else {
          // No AudioContext available - plain HTMLAudio with MAXIMUM VOLUME
          this.playHTMLAudioMaxVolume(blob);
        }

      } catch (error) {
        console.error('Error playing audio:', error);
        this.isPlayingAudio = false;
        
        // Retry if there are more chunks
        if (this.audioChunksQueue.length > 0) {
          setTimeout(() => this.playQueuedAudio(), 100);
        }
      }
    }

    playHTMLAudioMaxVolume(blob) {
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio();
      audio.src = audioUrl;
      
      // MAXIMUM VOLUME SETTINGS
      audio.playsInline = true;
      audio.setAttribute('playsinline', 'true');
      audio.crossOrigin = 'anonymous';
      audio.volume = 1.0; // Maximum HTML5 audio volume
      audio.muted = false;
      
      // Force use of phone's main speaker (not earpiece)
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        audio.setAttribute('webkit-playsinline', 'true');
      }

      this.currentAudio = audio;

      audio.onended = () => {
        console.log("✅ HTMLAudio playback finished");
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
        if (this.audioChunksQueue.length > 0) {
          this.playQueuedAudio();
        } else {
          // Unmute microphone when audio finishes
          console.log("🎤 Audio finished - Unmuting microphone");
          this.isMuted = false;
          if (this.mediaStream) {
            const audioTracks = this.mediaStream.getAudioTracks();
            audioTracks.forEach(track => {
              track.enabled = true;
              console.log("✅ Microphone unmuted after audio finished");
            });
          }
          this.updateAllMuteButtons();
          this.isPlayingAudio = false;
        }
      };

      audio.onerror = (error) => {
        console.error('HTMLAudio playback error:', error);
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
        this.isPlayingAudio = false;
      };

      try {
        audio.play().then(() => {
          this.audioStartTime = Date.now(); // Track when audio started
          console.log("🔊 HTMLAudio MAXIMUM VOLUME playbook started");
        });
      } catch (playErr) {
        console.error('Playback failed:', playErr);
        this.isPlayingAudio = false;
      }
    }

    async playBatchedChunksWebAudio(chunks) {
      if (!this.audioContext) {
        throw new Error("AudioContext not available");
      }

      // Ensure AudioContext is resumed on iOS (requires user gesture)
      if (this.audioContext.state === 'suspended') {
        if (this.userInteracted) {
          try {
            await this.audioContext.resume();
            console.log('🎤 AudioContext resumed for batch playback');
          } catch (e) {
            console.warn('Could not resume AudioContext:', e);
            throw new Error("AudioContext suspended and could not resume");
          }
        } else {
          throw new Error("AudioContext suspended and no user interaction");
        }
      }

      // Combine chunks into single buffer for seamless playback
      const combinedBase64 = chunks.join('');
      const binaryString = atob(combinedBase64);
      const bytes = new Uint8Array(binaryString.length);
      
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Stop any existing buffer source
      if (this.currentBufferSource) {
        try { 
          this.currentBufferSource.stop(0); 
        } catch (stopError) {
          console.warn("Buffer stop error:", stopError.message);
        }
        try { 
          this.currentBufferSource.disconnect(); 
        } catch (disconnectError) {
          console.warn("Buffer disconnect error:", disconnectError.message);
        }
        this.currentBufferSource = null;
      }

      const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer.slice(0));
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      this.currentBufferSource = source;
      this.currentAudio = source; // Keep both for compatibility

      return new Promise((resolve, reject) => {
        source.onended = () => {
          console.log("✅ WebAudio batch playback finished");
          this.currentBufferSource = null;
          this.currentAudio = null;
          // Continue with remaining chunks
          if (this.audioChunksQueue.length > 0) {
            this.playQueuedAudio().then(resolve).catch(reject);
          } else {
            // Unmute microphone when audio finishes
            console.log("🎤 Batch audio finished - Unmuting microphone");
            this.isMuted = false;
            if (this.mediaStream) {
              const audioTracks = this.mediaStream.getAudioTracks();
              audioTracks.forEach(track => {
                track.enabled = true;
                console.log("✅ Microphone unmuted after batch audio finished");
              });
            }
            this.updateAllMuteButtons();
            this.isPlayingAudio = false;
            resolve();
          }
        };

        try {
          source.start(0);
          console.log("🔊 WebAudio batch playback started");
        } catch (error) {
          this.currentBufferSource = null;
          this.currentAudio = null;
          reject(error);
        }
      });
    }

    async playBatchedChunksHTMLAudio(chunks) {
      // Combine chunks for HTMLAudio playback with iOS optimizations
      const audioBuffers = chunks.map((b64) => this.base64ToArrayBuffer(b64));
      const totalLength = audioBuffers.reduce((acc, buf) => acc + buf.byteLength, 0);
      const combined = new Uint8Array(totalLength);
      
      let offset = 0;
      for (const buffer of audioBuffers) {
        combined.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
      }

      const blob = new Blob([combined], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      
      // Apply iOS optimizations
      audio.playsInline = true;
      audio.setAttribute('playsinline', 'true');
      audio.crossOrigin = 'anonymous';
      audio.preload = 'auto';
      
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        audio.setAttribute('webkit-playsinline', 'true');
        audio.muted = false;
        audio.volume = 1.0;
      }
      
      this.currentAudio = audio;

      return new Promise((resolve, reject) => {
        audio.onended = () => {
          console.log("✅ HTMLAudio batch playback finished");
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          // Continue with remaining chunks
          if (this.audioChunksQueue.length > 0) {
            this.playQueuedAudio().then(resolve).catch(reject);
          } else {
            // Unmute microphone when audio finishes
            console.log("🎤 HTMLAudio batch finished - Unmuting microphone");
            this.isMuted = false;
            if (this.mediaStream) {
              const audioTracks = this.mediaStream.getAudioTracks();
              audioTracks.forEach(track => {
                track.enabled = true;
                console.log("✅ Microphone unmuted after HTMLAudio batch finished");
              });
            }
            this.updateAllMuteButtons();
            this.isPlayingAudio = false;
            resolve();
          }
        };

        audio.onerror = (error) => {
          console.error("HTMLAudio batch error:", error);
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          this.isPlayingAudio = false;
          reject(error);
        };

        audio.oncanplaythrough = () => {
          audio.play()
            .then(() => console.log("🔊 HTMLAudio batch playback started"))
            .catch(reject);
        };

        audio.load();
      });
    }

    stopAudioPlayback() {
      // Stop HTMLAudio element
      if (this.currentAudio) {
        try {
          if (this.currentAudio.pause) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
          }
        } catch (audioError) {
          console.warn("Audio pause error:", audioError.message);
        }
        this.currentAudio = null;
      }

      // Stop WebAudio buffer source
      if (this.currentBufferSource) {
        try { 
          this.currentBufferSource.stop(0); 
        } catch (stopError) {
          console.warn("Buffer source stop error:", stopError.message);
        }
        try { 
          this.currentBufferSource.disconnect(); 
        } catch (disconnectError) {
          console.warn("Buffer source disconnect error:", disconnectError.message);
        }
        this.currentBufferSource = null;
      }
      
      // Clear queue and state
      this.audioChunksQueue = [];
      this.isPlayingAudio = false;
      this.currentAiTranscript = "";
      
      // Send interrupt signal to backend if connected
      if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
        try {
          this.webSocket.send(JSON.stringify({
            type: 'interrupt'
          }));
        } catch (sendError) {
          console.warn('Failed to send interrupt signal:', sendError.message);
        }
      }
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

    // Get connection diagnostics for debugging
    getConnectionDiagnostics() {
      const lastSuccessful = this.connectionCache.get('last-successful-connection');
      const lastFailed = this.connectionCache.get('last-failed-connection');
      const currentPermission = this.connectionCache.get('mic-permission');
      
      return {
        preloadedResources: this.preloadedResources,
        audioContextReady: this.audioContext !== null,
        microphonePermission: currentPermission,
        lastSuccessfulConnection: lastSuccessful,
        lastFailedConnection: lastFailed,
        currentConnectionState: this.isWebSocketConnected,
        cacheSize: this.connectionCache.size
      };
    }

    // Log connection performance metrics
    logConnectionMetrics() {
      const diagnostics = this.getConnectionDiagnostics();
      console.group("🔍 ShivAI Connection Diagnostics");
      console.table(diagnostics);
      console.groupEnd();
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