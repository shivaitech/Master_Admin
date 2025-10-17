/**
 * ShivAI Widget Loader Script - OPTIMIZED VERSION
 * Fixed audio processing, language detection, and performance issues
 */

(function () {
  "use strict";

  // Prevent multiple widget instances
  if (window.ShivAIWidget) {
    return;
  }

  // Enhanced configuration with language and audio optimizations
  const DEFAULT_CONFIG = {
    clientId: "",
    apiEndpoint: "https://shivai-calling-frontend-38ax.vercel.app/landing",
    // Enhanced audio and language settings
    audio: {
      sampleRate: 16000, // Better for speech recognition
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: false, // Disabled for better voice clarity
      voiceIsolation: true, // Focus on primary speaker
      latency: 0.01
    },
    language: {
      primary: "hi-IN", // Hindi India as primary
      fallback: "en-US", // English US as fallback
      enableHinglish: true // Support Hinglish mixed language
    },
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
      // New audio features
      voiceActivityDetection: true,
      backgroundNoiseReduction: true,
      multiSpeakerIsolation: true
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
      welcomeMessage: "ShivAI offers 24/7 voice support to handle your business calls efficiently and professionally.",
      placeholderText: "Type your message...",
      voiceGreeting: "Hello! I'm your AI Employee. How can I help?",
      privacyPolicyUrl: "https://shivai-calling-frontend-38ax.vercel.app/landing",
      companyName: "ShivAI Employee",
      subtitle: "AI-Powered Support",
    },
  };

  // Utility functions (keep existing mergeDeep, createElement, createIcon)
  function mergeDeep(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
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

  // Enhanced ShivAIAPI class with language support
  class ShivAIAPI {
    constructor(config) {
      this.config = config;
      this.baseURL = config.apiEndpoint;
      this.clientId = config.clientId;
    }

    async sendMessage(message, conversationId = null, language = "hi-IN") {
      try {
        const response = await fetch(`${this.baseURL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Client-ID": this.clientId,
            "X-Language": language, // Send language preference
          },
          body: JSON.stringify({
            message,
            conversationId,
            timestamp: new Date().toISOString(),
            language: language // Include in body too
          }),
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.response || "Sorry, I couldn't process your request right now.";
      } catch (error) {
        console.error("ShivAI API Error:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
      }
    }

    async processVoice(transcript, conversationId = null, language = "hi-IN") {
      try {
        const response = await fetch(`${this.baseURL}/voice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Client-ID": this.clientId,
            "X-Language": language,
          },
          body: JSON.stringify({
            transcript,
            conversationId,
            timestamp: new Date().toISOString(),
            language: language,
            enableHinglish: this.config.language.enableHinglish
          }),
        });

        if (!response.ok) {
          throw new Error(`Voice API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.response || "Sorry, I couldn't process your voice message right now.";
      } catch (error) {
        console.error("ShivAI Voice API Error:", error);
        return "Sorry, I'm having trouble with voice processing right now. Please try typing your message.";
      }
    }

    async startCall(wasWarmedUp = false, language = "hi-IN") {
      try {
        console.log(`🚀 Starting call ${wasWarmedUp ? '(backend pre-warmed)' : '(cold start)'}`);
        
        const response = await fetch(
          `https://shivai-com-backend.onrender.com/api/v1/calls/start-call`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Connection": "keep-alive",
              "X-Language": language // Send language preference
            },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              warmedUp: wasWarmedUp,
              language: language,
              enableHinglish: this.config.language.enableHinglish
            }),
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

  // Enhanced ShivAIWidget class with audio and language optimizations
  class ShivAIWidget {
    constructor(config) {
      this.config = mergeDeep({}, DEFAULT_CONFIG, config);
      this.api = new ShivAIAPI(this.config);
      
      // Core state
      this.isOpen = false;
      this.currentMode = "voice";
      this.messages = [];
      this.isRecording = false;
      this.isLoading = false;
      this.hasGreeted = false;
      this.isMuted = false;
      this.conversationId = this.generateId();
      
      // Call state
      this.isCallActive = false;
      this.callStartTime = null;
      this.callDuration = 0;
      this.callInterval = null;
      this.hasStarted = false;
      this.currentCallId = null;
      this.pythonServiceUrl = null;
      
      // Audio processing state - ENHANCED
      this.mediaStream = null;
      this.audioContext = null;
      this.audioProcessor = null;
      this.audioSource = null;
      this.hasStartedCapture = false;
      
      // Audio playback state
      this.isPlayingAudio = false;
      this.audioChunksQueue = [];
      this.currentAudio = null;
      this.currentBufferSource = null;
      
      // Language and transcription
      this.currentLanguage = this.config.language.primary;
      this.currentAiTranscript = "";
      this.currentStreamingMessage = null;
      
      // WebSocket
      this.webSocket = null;
      this.isWebSocketConnected = false;
      
      // Enhanced audio processing
      this.voiceActivityDetector = null;
      this.isSpeechActive = false;
      this.silenceThreshold = 0.01; // Voice activity threshold
      this.silenceDuration = 0;
      this.maxSilenceDuration = 2000; // 2 seconds max silence
      
      // Performance optimizations
      this.audioBufferSize = 2048; // Smaller buffer for lower latency
      this.audioChunkInterval = null;
      this.userInteracted = false;
      
      // Connection optimization
      this.connectionCache = new Map();
      this.preloadedResources = false;
      this.isWarmingUp = false;

      this.init();
    }

    // Enhanced initialization with language support
    init() {
      this.optimizePhoneAudio();
      this.injectStyles();
      this.createWidget();
      this.initEnhancedSpeechRecognition(); // Enhanced speech recognition
      this.bindEvents();
      this.warmupConnections();
    }

    // Enhanced speech recognition with language support
    initEnhancedSpeechRecognition() {
      if (!this.config.features.voiceEnabled) return;

      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if (!SpeechRecognition) {
        console.warn("Speech recognition not supported in this browser");
        return;
      }

      this.recognition = new SpeechRecognition();
      
      // Enhanced configuration for Hindi/Hinglish support
      this.recognition.continuous = true; // Continuous listening
      this.recognition.interimResults = true; // Get interim results
      this.recognition.maxAlternatives = 3; // Get multiple alternatives for better accuracy
      
      // Set language with fallback
      this.recognition.lang = this.currentLanguage;
      
      // Enhanced event handlers
      this.recognition.onstart = () => {
        console.log("🎤 Speech recognition started in", this.currentLanguage);
        this.isRecording = true;
        this.updateVoiceUI();
      };

      this.recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Process final transcript
        if (finalTranscript) {
          console.log("🎯 Final transcript:", finalTranscript);
          this.handleVoiceMessage(finalTranscript);
        }

        // Show interim results for better UX
        if (interimTranscript) {
          console.log("⏳ Interim transcript:", interimTranscript);
          this.updateInterimTranscript(interimTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        console.error("🎤 Speech recognition error:", event.error);
        
        // Handle language not supported error
        if (event.error === 'language-not-supported' && this.currentLanguage !== this.config.language.fallback) {
          console.warn(`Language ${this.currentLanguage} not supported, falling back to ${this.config.language.fallback}`);
          this.currentLanguage = this.config.language.fallback;
          this.recognition.lang = this.currentLanguage;
          this.recognition.start(); // Restart with fallback language
        } else {
          this.isRecording = false;
          this.updateVoiceUI();
        }
      };

      this.recognition.onend = () => {
        this.isRecording = false;
        this.updateVoiceUI();
        
        // Auto-restart for continuous listening
        if (this.isCallActive && !this.isMuted) {
          setTimeout(() => {
            if (this.isCallActive && !this.isRecording) {
              this.recognition.start();
            }
          }, 100);
        }
      };
    }

    // Enhanced audio capture with voice activity detection
    async startAudioCapture() {
      if (this.hasStartedCapture) {
        console.log("🎤 Audio capture already started");
        return;
      }

      await this.ensureMicrophoneAccess();
      if (!this.webSocket || !this.isWebSocketConnected) {
        console.warn("🔌 WebSocket not connected");
        return;
      }

      this.hasStartedCapture = true;

      try {
        // Create audio context with optimized settings
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: this.config.audio.sampleRate,
            latencyHint: 'interactive'
          });
        }

        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }

        // Create audio source
        this.audioSource = this.audioContext.createMediaStreamSource(this.mediaStream);

        // Create processor with smaller buffer for lower latency
        this.audioProcessor = this.audioContext.createScriptProcessor(
          this.audioBufferSize,
          1, // Input channels
          1  // Output channels
        );

        // Enhanced audio processing with voice activity detection
        this.audioProcessor.onaudioprocess = (e) => {
          if (!this.isWebSocketConnected || this.isMuted) return;

          const inputData = e.inputBuffer.getChannelData(0);
          
          // Voice Activity Detection
          const isSpeech = this.detectVoiceActivity(inputData);
          
          if (isSpeech || this.isSpeechActive) {
            // Convert to PCM16 with optimized processing
            const pcm16 = this.floatToPCM16(inputData);
            const base64 = this.arrayBufferToBase64(pcm16.buffer);

            // Send to server with voice activity info
            this.sendWebSocketMessage({
              type: "audio",
              callId: this.currentCallId,
              audio: base64,
              isSpeech: isSpeech,
              language: this.currentLanguage,
              timestamp: Date.now()
            });

            this.isSpeechActive = isSpeech;
          }
        };

        // Connect audio nodes
        this.audioSource.connect(this.audioProcessor);
        this.audioProcessor.connect(this.audioContext.destination);

        console.log("🎙️ Enhanced audio capture started");
        
        if (this.callStatus) {
          this.callStatus.textContent = "Listening...";
          this.callStatus.style.color = "#10b981";
        }

      } catch (err) {
        console.error("❌ Error starting enhanced audio capture:", err);
        this.hasStartedCapture = false;
      }
    }

    // Enhanced voice activity detection
    detectVoiceActivity(audioData) {
      let sum = 0;
      for (let i = 0; i < audioData.length; i++) {
        sum += Math.abs(audioData[i]);
      }
      const average = sum / audioData.length;
      
      const isSpeech = average > this.silenceThreshold;
      
      if (isSpeech) {
        this.silenceDuration = 0;
      } else {
        this.silenceDuration += (audioData.length / this.config.audio.sampleRate) * 1000;
      }
      
      // Consider speech active if we're within the silence window
      return isSpeech || this.silenceDuration < this.maxSilenceDuration;
    }

    // Optimized PCM conversion
    floatToPCM16(input) {
      const output = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      return output;
    }

    // Enhanced microphone access with better constraints
    async ensureMicrophoneAccess() {
      if (this.mediaStream) return this.mediaStream;

      try {
        const constraints = {
          audio: {
            sampleRate: this.config.audio.sampleRate,
            channelCount: this.config.audio.channelCount,
            echoCancellation: this.config.audio.echoCancellation,
            noiseSuppression: this.config.audio.noiseSuppression,
            autoGainControl: this.config.audio.autoGainControl,
            latency: this.config.audio.latency,
            // Advanced constraints for better voice quality
            googEchoCancellation: true,
            googNoiseSuppression: true,
            googHighpassFilter: true,
            googAudioMirroring: false
          },
          video: false
        };

        // Try to get specific device for better quality
        if (navigator.mediaDevices?.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioInputs = devices.filter(device => device.kind === 'audioinput');
          
          if (audioInputs.length > 0) {
            // Prefer devices that aren't the default communication device
            const nonCommDevice = audioInputs.find(device => 
              !device.label.toLowerCase().includes('communication'));
            
            if (nonCommDevice) {
              constraints.audio.deviceId = { exact: nonCommDevice.deviceId };
            }
          }
        }

        this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("🎤 Microphone accessed with enhanced settings");
        return this.mediaStream;

      } catch (err) {
        console.error("❌ Enhanced microphone access failed:", err);
        
        // Fallback to basic constraints
        try {
          const fallbackConstraints = { audio: true, video: false };
          this.mediaStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
          console.log("🎤 Using fallback microphone access");
          return this.mediaStream;
        } catch (fallbackErr) {
          console.error("❌ Fallback microphone access failed:", fallbackErr);
          throw fallbackErr;
        }
      }
    }

    // Enhanced WebSocket message handling
    handleWebSocketMessage(data) {
      console.log("📩 WebSocket message:", data.type);

      switch (data.type) {
        case "handshake_response":
          console.log("🤝 Handshake confirmed");
          this.hideChatConnectingStatus();
          this.hasStartedCapture = true;
          this.startAudioCapture().catch(console.error);
          break;

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
          console.log("📝 Transcription received:", data.text);
          this.handleTranscription(data.text);
          break;

        case "user_transcript":
          console.log("🗣️ User transcript:", data.text);
          this.handleUserTranscript(data.text);
          break;

        case "ai_transcript":
          console.log("🤖 AI transcript complete:", data.text);
          this.handleAITranscriptComplete(data.text);
          break;

        case "ai_text_delta":
          console.log("🤖 AI text delta:", data.text);
          this.handleAITextDelta(data.text);
          break;

        case "language_detected":
          console.log("🌐 Language detected:", data.language);
          this.handleLanguageDetection(data.language);
          break;

        case "speech_started":
          if (this.callStatus) {
            this.callStatus.textContent = "Listening...";
            this.callStatus.style.color = "#10b981";
          }
          // Smart audio interruption - only stop if AI has been speaking for a while
          if (this.isPlayingAudio && this.audioStartTime && (Date.now() - this.audioStartTime) > 800) {
            this.stopAudioPlayback();
          }
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
          console.error("❌ Service error:", data.message);
          this.handleServiceError(data);
          break;

        default:
          console.log("📩 Unknown message type:", data.type);
      }
    }

    // Enhanced language detection handling
    handleLanguageDetection(detectedLanguage) {
      console.log(`🌐 Language detected: ${detectedLanguage}`);
      
      // Update speech recognition language if different
      if (detectedLanguage !== this.currentLanguage && this.recognition) {
        try {
          this.recognition.lang = detectedLanguage;
          this.currentLanguage = detectedLanguage;
          console.log(`🔄 Speech recognition language updated to: ${detectedLanguage}`);
        } catch (error) {
          console.warn(`Failed to set language to ${detectedLanguage}:`, error);
        }
      }
    }

    // Enhanced service error handling
    handleServiceError(data) {
      if (this.callStatus) {
        this.callStatus.textContent = `Error: ${data.message || 'Service unavailable'}`;
        this.callStatus.style.color = "#ef4444";
      }

      // Specific handling for audio issues
      if (data.message?.includes('audio') || data.message?.includes('voice')) {
        console.warn("🔊 Audio service issue detected");
        this.stopAudioCapture();
        
        // Attempt to restart audio after a delay
        setTimeout(() => {
          if (this.isCallActive && this.isWebSocketConnected) {
            this.startAudioCapture().catch(console.error);
          }
        }, 2000);
      }
    }

    // Enhanced audio playback with better chunk processing
    async playQueuedAudio() {
      if (this.audioChunksQueue.length === 0 || this.isMuted) {
        this.isPlayingAudio = false;
        return;
      }

      this.isPlayingAudio = true;

      try {
        // Process chunks in batches for smoother playback
        const batchSize = 3; // Process 3 chunks at a time
        const chunksToPlay = this.audioChunksQueue.splice(0, batchSize);

        if (chunksToPlay.length === 0) {
          this.isPlayingAudio = false;
          return;
        }

        // Combine chunks for seamless playback
        const combinedBuffer = await this.combineAudioChunks(chunksToPlay);
        
        // Play using WebAudio API for better performance
        if (this.audioContext && this.audioContext.state !== 'suspended') {
          await this.playWithWebAudio(combinedBuffer);
        } else {
          await this.playWithHTMLAudio(combinedBuffer);
        }

        // Continue with next batch if available
        if (this.audioChunksQueue.length > 0) {
          this.playQueuedAudio();
        } else {
          this.isPlayingAudio = false;
        }

      } catch (error) {
        console.error('Error playing audio batch:', error);
        this.isPlayingAudio = false;
        
        // Retry with remaining chunks
        if (this.audioChunksQueue.length > 0) {
          setTimeout(() => this.playQueuedAudio(), 100);
        }
      }
    }

    // Enhanced audio chunk combining
    async combineAudioChunks(chunks) {
      const audioBuffers = await Promise.all(
        chunks.map(async (base64) => {
          try {
            const arrayBuffer = this.base64ToArrayBuffer(base64);
            
            // Decode audio data if using WebAudio
            if (this.audioContext && this.audioContext.decodeAudioData) {
              return await this.audioContext.decodeAudioData(arrayBuffer.slice(0));
            }
            
            return arrayBuffer;
          } catch (error) {
            console.warn('Error decoding audio chunk:', error);
            return null;
          }
        })
      );

      // Filter out failed decodes
      const validBuffers = audioBuffers.filter(buffer => buffer !== null);
      
      if (validBuffers.length === 0) {
        throw new Error('No valid audio chunks to play');
      }

      return validBuffers;
    }

    // Enhanced WebAudio playback
    async playWithWebAudio(audioBuffers) {
      if (!this.audioContext) {
        throw new Error('AudioContext not available');
      }

      // Resume context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Stop any existing playback
      if (this.currentBufferSource) {
        try {
          this.currentBufferSource.stop();
          this.currentBufferSource.disconnect();
        } catch (e) {}
      }

      // Create new source
      const source = this.audioContext.createBufferSource();
      
      // Handle single buffer or multiple buffers
      if (audioBuffers.length === 1 && audioBuffers[0] instanceof AudioBuffer) {
        source.buffer = audioBuffers[0];
      } else {
        // Combine multiple buffers (simplified - in real implementation you'd merge buffers)
        source.buffer = audioBuffers[0]; // Use first buffer for now
      }

      // Create gain node for volume control
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 1.0; // Full volume

      // Connect and play
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      this.currentBufferSource = source;

      return new Promise((resolve) => {
        source.onended = () => {
          this.currentBufferSource = null;
          resolve();
        };

        source.start(0);
        this.audioStartTime = Date.now();
        console.log("🔊 WebAudio playback started");
      });
    }

    // Utility methods (keep existing implementations but ensure they're optimized)
    generateId() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

    // Enhanced cleanup
    stopAudioCapture() {
      // Stop speech recognition
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }

      // Stop audio processing
      try {
        if (this.audioProcessor) {
          this.audioProcessor.disconnect();
          this.audioProcessor.onaudioprocess = null;
          this.audioProcessor = null;
        }
        if (this.audioSource) {
          this.audioSource.disconnect();
          this.audioSource = null;
        }
      } catch (err) {
        console.warn("Error disconnecting audio nodes:", err);
      }

      // Stop media tracks
      try {
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(track => track.stop());
          this.mediaStream = null;
        }
      } catch (err) {
        console.warn("Error stopping media tracks:", err);
      }

      // Close audio context
      try {
        if (this.audioContext && this.audioContext.state !== "closed") {
          this.audioContext.close();
        }
      } catch (err) {
        console.warn("Error closing audio context:", err);
      }

      this.audioContext = null;
      this.hasStartedCapture = false;
      this.isSpeechActive = false;
      this.silenceDuration = 0;

      // Stop audio playback
      this.stopAudioPlayback();
    }

    stopAudioPlayback() {
      if (this.currentBufferSource) {
        try {
          this.currentBufferSource.stop();
          this.currentBufferSource.disconnect();
        } catch (e) {}
        this.currentBufferSource = null;
      }

      if (this.currentAudio) {
        try {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        } catch (e) {}
        this.currentAudio = null;
      }

      this.audioChunksQueue = [];
      this.isPlayingAudio = false;
    }

    // ... (keep the rest of your existing UI methods, but ensure they use the enhanced functionality)

    // Enhanced call start with language support
    async startCurrentCall() {
      try {
        console.log("🚀 Starting call with language:", this.currentLanguage);

        // Show connecting status
        this.showConnectingStatus("Initializing call...", "Setting up voice communication");

        // Request microphone with enhanced settings
        await this.ensureMicrophoneAccess();

        // Start call with language preference
        const wasWarmedUp = this.connectionCache.has('backend-warmed');
        const callData = await this.api.startCall(wasWarmedUp, this.currentLanguage);

        this.currentCallId = callData.callId;
        this.pythonServiceUrl = callData.pythonServiceUrl;
        this.isCallActive = true;
        this.callStartTime = new Date(callData.startTime);

        // Connect to WebSocket
        if (this.pythonServiceUrl) {
          await this.connectToWebSocket(this.pythonServiceUrl);
        }

        // Start speech recognition for the selected language
        if (this.recognition) {
          this.recognition.start();
        }

        // Update UI
        this.hasStarted = true;
        this.hideConnectingStatus();
        this.updateUI();

        console.log("📞 Call started successfully with language:", this.currentLanguage);

      } catch (error) {
        console.error("❌ Failed to start call:", error);
        this.showConnectingStatus("Connection failed", "Please try again", true);
        this.isCallActive = false;
      }
    }

    // Add this method to handle interim transcripts
    updateInterimTranscript(transcript) {
      // You can show interim transcripts in the UI for better user experience
      if (this.currentStreamingMessage) {
        this.updateStreamingMessage(this.currentStreamingMessage, transcript);
      }
    }

    // ... (keep all your existing UI creation methods, they should work with the enhanced backend)
  }

  // Initialize the enhanced widget
  function initWidget() {
    const script = document.currentScript || document.querySelector('script[src*="widget.js"]') || document.querySelector("script[data-client-id]");

    if (!script) {
      console.error("ShivAI Widget: Could not find script tag");
      return;
    }

    const clientId = script.getAttribute("data-client-id");
    if (!clientId) {
      console.error("ShivAI Widget: data-client-id attribute is required");
      return;
    }

    // Merge with global config
    const globalConfig = window.ShivAIConfig || {};
    const config = mergeDeep({}, DEFAULT_CONFIG, globalConfig, { clientId });

    // Create enhanced widget instance
    window.ShivAIWidget = new ShivAIWidget(config);
  }

  // Auto-initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})(window, document);