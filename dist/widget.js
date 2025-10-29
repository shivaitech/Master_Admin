/**
 * ShivAI Widget Loader Script
 * Embeddable widget for client websites
 * This script loads and mounts the React widget component
 */

(function () {
  "use strict";

  // Widget state variables
  let ws = null;
  let audioContext = null;
  let mediaStream = null;
  let audioWorkletNode = null;
  let isConnected = false;
  let isMuted = false;
  let currentAssistantTranscript = "";
  let currentUserTranscript = "";
  let lastUserMessageDiv = null;
  let visualizerInterval = null;
  let isWidgetOpen = false;
  let isConnecting = false; // Track if connection is in progress
  let loadingInterval = null; // Track loading animation interval

  // Playback processor variables for smooth audio
  let playbackProcessor = null;
  let playbackBufferQueue = [];
  let playbackBufferOffset = 0;
  let assistantSpeaking = false;

  // Bubble message variables
  let messageBubble = null;
  let liveMessages = [
    "📞 Call ShivAI!",
    "📞 Call ShivAI!",
    "📞 Call ShivAI!",
    "📞 Call ShivAI!",
  ];
  let currentMessageIndex = 0;
  let messageInterval = null;

  // DOM elements
  let triggerBtn = null;
  let widgetContainer = null;
  let landingView = null;
  let callView = null;
  let statusDiv = null;
  let connectBtn = null;
  let messagesDiv = null;
  let clearBtn = null;
  let muteBtn = null;
  let visualizerBars = null;
  let languageSelect = null;
  let currentView = "landing"; // 'landing' or 'call'

  // Call timer variables
  let callTimerElement = null;
  let callStartTime = null;
  let callTimerInterval = null;

  // Initialize widget
  function initWidget() {
    createWidgetUI();
    setupEventListeners();
  }

  // Create widget UI elements
  function createWidgetUI() {
    // Create floating trigger button with phone icon
    triggerBtn = document.createElement("button");
    triggerBtn.className = "shivai-trigger shivai-neon-pulse";
    triggerBtn.innerHTML = `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    `;
    triggerBtn.setAttribute("aria-label", "Open ShivAI Assistant");

    // Create widget container
    widgetContainer = document.createElement("div");
    widgetContainer.className = "shivai-widget";

    // Create Landing View
    landingView = document.createElement("div");
    landingView.className = "landing-view";
    landingView.innerHTML = `
      <div class="widget-header">
        <button class="widget-close" aria-label="Close widget">×</button>
        <div class="widget-avatar">
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
</svg>
        </div>
        <div class="widget-title">AI Employee</div>
        <div class="widget-subtitle">ShivAI offers 24/7 voice support to handle your business calls efficiently and professionally.</div>
        <button class="start-call-btn mx-auto mb-4" id="start-call-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Start Call
        </button>
        <div class="privacy-text">By using this service you agree to our <span class="privacy-link">T&C</span></div>
      </div>
      <div class="widget-footer">
        <div class="footer-text">Powered by <strong>ShivAI</strong></div>
      </div>
    `;

    // Create Call View (initially hidden)
    callView = document.createElement("div");
    callView.className = "call-view";
    callView.style.display = "none";
    callView.innerHTML = `
      <div class="call-header">
      <button class="back-btn" id="back-btn" aria-label="Back to landing">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      </button>
      <div class="call-info">
      <div class="call-info-name text-2xl">ShivAI Employee</div>
      <div class="call-info-status" id="shivai-status">
      <span class="status-text ">Online</span>
      </div>
      </div>
      <button class="widget-close" aria-label="Close widget">×</button>
      </div>
      <div class="call-body">
      <div class="language-section">
      <label class="language-label">Select preferred language:</label>
      <select id="shivai-language" class="language-select-styled">
      <option value="ar">🇸🇦 Arabic</option>
      <option value="zh">🇨🇳 Chinese</option>
      <option value="nl">🇳🇱 Dutch</option>
      <option value="en">🇬🇧 English (US)</option>
      <option value="en-IN">🇮🇳 English (India)</option>
      <option value="fr">🇫🇷 French</option>
      <option value="de">🇩🇪 German</option>
      <option value="hi">🇮🇳 Hindi</option>
      <option value="it">🇮🇹 Italian</option>
      <option value="ja">🇯🇵 Japanese</option>
      <option value="ko">🇰🇷 Korean</option>
      <option value="pt">🇵🇹 Portuguese</option>
      <option value="pl">🇵🇱 Polish</option>
      <option value="ru">🇷🇺 Russian</option>
      <option value="es">🇪🇸 Spanish</option>
      <option value="tr">🇹🇷 Turkish</option>
      </select>
      </div>
      
      <div class="messages-container" id="shivai-messages">
      <div class="empty-state">
      <div class="empty-state-icon">👋</div>
      <div class="empty-state-text">Start a conversation to see transcripts here</div>
      </div>
      </div>
      
      <div class="controls">
      <div class="call-timer" id="call-timer" style="display: none;">00:00</div>
      <button class="control-btn-icon mute" id="shivai-mute" style="display: none;" title="Mute Microphone">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
      </button>
      <button class="control-btn-icon connect" id="shivai-connect" title="Start Call">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      </button>
      </div>
       <div class="widget-footer relative top-3">
      <div class="footer-text">Powered by <strong>ShivAI</strong></div>
      </div>
      </div>
    `;

    widgetContainer.appendChild(landingView);
    widgetContainer.appendChild(callView);

    // Add styles
    addWidgetStyles();

    // Append to document
    document.body.appendChild(triggerBtn);
    document.body.appendChild(widgetContainer);

    // Create live message bubble
    createLiveMessageBubble();

    // Cache DOM references for call view
    statusDiv = document.getElementById("shivai-status");
    connectBtn = document.getElementById("shivai-connect");
    messagesDiv = document.getElementById("shivai-messages");
    clearBtn = document.getElementById("shivai-clear");
    muteBtn = document.getElementById("shivai-mute");
    visualizerBars = document.querySelectorAll(".visualizer-bar");
    languageSelect = document.getElementById("shivai-language");
    callTimerElement = document.getElementById("call-timer");

    // Set default language based on user's location/browser settings
    setDefaultLanguage();
  }

  // Function to detect and set default language based on user's location
  function setDefaultLanguage() {
    // Language mapping based on browser locale and country codes
    const languageMap = {
      ar: "ar", // Arabic
      zh: "zh", // Chinese
      "zh-CN": "zh", // Chinese (Simplified)
      "zh-TW": "zh", // Chinese (Traditional)
      en: "en", // English
      "en-US": "en", // English (US)
      "en-GB": "en", // English (UK)
      "en-IN": "en-IN", // English (India)
      fr: "fr", // French
      de: "de", // German
      hi: "hi", // Hindi
      it: "it", // Italian
      ja: "ja", // Japanese
      ko: "ko", // Korean
      pt: "pt", // Portuguese
      "pt-BR": "pt", // Portuguese (Brazil)
      es: "es", // Spanish
      "es-ES": "es", // Spanish (Spain)
      "es-MX": "es", // Spanish (Mexico)
    };

    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;

    // Try exact match first
    let detectedLang = languageMap[browserLang];

    // If no exact match, try the base language (e.g., 'en' from 'en-US')
    if (!detectedLang && browserLang.includes("-")) {
      const baseLang = browserLang.split("-")[0];
      detectedLang = languageMap[baseLang];
    }

    // Default to English if no match found
    const defaultLang = detectedLang || "en";

    // Set the language selector value
    if (languageSelect) {
      languageSelect.value = defaultLang;
      console.log(
        `Auto-detected language: ${defaultLang} (Browser locale: ${browserLang})`
      );
    }
  }

  // Create live message bubble
  function createLiveMessageBubble() {
    // Create the bubble container
    messageBubble = document.createElement("div");
    messageBubble.className = "shivai-message-bubble";
    messageBubble.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 90px;
      transform: translateY(0);
      background-color: #ffffff;
      color: #374151;
      padding: 8px 12px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 9999;
      border: 1px solid #e5e7eb;
      min-width: 60px;
      max-width: 250px;
      width: auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      cursor: pointer;
    `;

    // Create the bubble tail (pointing to the trigger button)
    const bubbleTail = document.createElement("div");
    bubbleTail.style.cssText = `
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid #ffffff;
    `;

    messageBubble.appendChild(bubbleTail);
    document.body.appendChild(messageBubble);

    // Add click event to bubble
    messageBubble.addEventListener("click", () => {
      toggleWidget();
    });

    // Add hover effects to bubble
    messageBubble.addEventListener("mouseover", () => {
      messageBubble.style.transform = "translateY(0) scale(1.05)";
      messageBubble.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
    });

    messageBubble.addEventListener("mouseout", () => {
      messageBubble.style.transform = "translateY(0) scale(1)";
      messageBubble.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
    });

    // Start the live message rotation
    startLiveMessages();
  }

  // Start rotating messages
  function startLiveMessages() {
    // Show first message after 3 seconds
    setTimeout(() => {
      showNextMessage();
    }, 3000);

    // Set interval to rotate messages
    messageInterval = setInterval(() => {
      showNextMessage();
    }, 8000); // Show new message every 8 seconds
  }

  // Show next message in rotation
  function showNextMessage() {
    if (!isWidgetOpen && messageBubble) {
      const message = liveMessages[currentMessageIndex];

      // Clear the bubble first
      messageBubble.innerHTML = "";

      // Create the bubble tail
      const bubbleTail = document.createElement("div");
      bubbleTail.style.cssText = `
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid #ffffff;
      `;

      // Create message container
      const messageEl = document.createElement("span");
      messageEl.style.opacity = "0";

      messageBubble.appendChild(messageEl);
      messageBubble.appendChild(bubbleTail);

      // Show bubble with slide-in animation
      messageBubble.style.visibility = "visible";
      messageBubble.style.animation = "bubbleSlideIn 0.4s ease-out forwards";

      // Start typing animation after bubble appears
      setTimeout(() => {
        typeMessage(message, messageEl);
      }, 400);

      // Hide bubble after 5 seconds
      setTimeout(() => {
        hideBubble();
      }, 5000);

      // Move to next message
      currentMessageIndex = (currentMessageIndex + 1) % liveMessages.length;
    }
  }

  // Type message with animation
  function typeMessage(message, messageEl) {
    let i = 0;
    messageEl.textContent = "";
    messageEl.style.opacity = "1";

    // Add typing cursor
    const cursor = document.createElement("span");
    cursor.style.cssText = `
      opacity: 1;
      animation: typingCursor 1s infinite;
      margin-left: 2px;
    `;
    cursor.textContent = "";
    messageEl.appendChild(cursor);

    const typeInterval = setInterval(() => {
      if (i < message.length) {
        const text = message.substring(0, i + 1);
        messageEl.textContent = text;
        messageEl.appendChild(cursor);
        i++;
      } else {
        clearInterval(typeInterval);
        // Remove cursor after typing completes
        setTimeout(() => {
          cursor.remove();
        }, 500);
      }
    }, 60);
  }

  // Hide bubble with animation
  function hideBubble() {
    if (messageBubble) {
      messageBubble.style.animation = "bubbleSlideOut 0.3s ease-in forwards";
      setTimeout(() => {
        messageBubble.style.visibility = "hidden";
        messageBubble.style.opacity = "0";
      }, 300);
    }
  }

  // Add widget styles
  function addWidgetStyles() {
    const styles = `
      /* Main trigger button with neon pulse effect */
      .shivai-trigger {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      color: #ffffff;
      font-size: 24px;
      transition: all 0.3s ease;
      background: linear-gradient(135deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .shivai-trigger:hover {
      transform: scale(1.1);
      background: linear-gradient(135deg, #6b7280 0%, #9ca3af 30%, #4b5563 70%, #374151 100%);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.25);
      }

      .shivai-trigger:active {
      transform: scale(0.95);
      background: linear-gradient(135deg, #374151 0%, #4b5563 30%, #1f2937 70%, #111827 100%);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.25);
      }

      /* Neon pulse animation */
      .shivai-neon-pulse {
      // position: relative;
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

      /* Bubble message animations */
      @keyframes bubbleSlideIn {
      0% {
        opacity: 0;
        transform: translateY(15px) scale(0.7);
      }
      60% {
        opacity: 0.8;
        transform: translateY(-2px) scale(1.05);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      }

      @keyframes bubbleSlideOut {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(10px) scale(0.8);
      }
      }

      @keyframes typingCursor {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
      }

      /* Shine animation for start call button */
      @keyframes shine {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
      }

      .start-call-btn {
      position: relative;
      overflow: hidden;
      }

      .start-call-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shine 2s infinite;
      }

      .start-call-btn:hover::before {
      animation: shine 1s infinite;
      }

      /* Message bubble styling */
      .shivai-message-bubble {
      cursor: pointer;
      }

      /* Mobile responsive button size */
      @media (max-width: 768px) {
      .shivai-trigger {
        width: 56px;
        height: 56px;
        font-size: 22px;
        bottom: 16px;
        right: 16px;
      }

      .shivai-message-bubble {
        bottom: 26px !important;
        right: 80px !important;
        font-size: 13px !important;
        padding: 6px 10px !important;
        max-width: 200px !important;
      }
      }

      @media (max-width: 420px) {
      .shivai-trigger {
        width: 52px;
        height: 52px;
        bottom: 12px;
        right: 12px;
      }

      .shivai-message-bubble {
        bottom: 22px !important;
        right: 70px !important;
        font-size: 12px !important;
        padding: 6px 8px !important;
        max-width: 180px !important;
      }
      }

      .shivai-widget {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 360px;
      max-height: 550px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
      z-index: 10000;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      border: 1px solid #e5e7eb;
      }

      .shivai-widget.active {
      display: flex;
      animation: slideUpWidget 0.3s ease-out;
      }

      @keyframes slideUpWidget {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
      }

      /* Landing View */
      .landing-view {
      display: flex;
      flex-direction: column;
      width: 100%;
      }

      .landing-view .widget-header {
      position: relative;
      text-align: center;
      padding: 14px 10px 16px;
      background: #ffffff;
      border-bottom: none;
      }

      .landing-view .widget-avatar {
      width: 64px;
      height: 64px;
      margin: 0 auto 8px;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111827;
      border: 1.5px solid #e5e7eb;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      padding: 8px;
      }

      .landing-view .widget-title {
      font-weight: 600;
      font-size: 16px;
      color: #111827;
      margin: 0 0 6px 0;
      letter-spacing: -0.01em;
      }

      .landing-view .widget-subtitle {
      font-size: 12px;
      color: #6b7280;
      margin: 0 0 14px 0;
      font-weight: 400;
      line-height: 1.5;
      padding: 0 6px;
      }

      .start-call-btn {
      width: 50%;
      padding: 10px 12px;
      border: 1px solid transparent;
      border-radius: 55px;
      font-size: 13px;
      background: linear-gradient(135deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%);
      color: white;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s ease;
      // margin: 0 0 12px 0;
      // border: 2px solid rgba(255, 255, 255, 0.15);
      }

      .start-call-btn:hover {
      background: linear-gradient(135deg, #6b7280 0%, #9ca3af 30%, #4b5563 70%, #374151 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .start-call-btn:active {
      transform: translateY(0);
      }

      .privacy-text {
      font-size: 11px;
      color: #9ca3af;
      text-align: center;
      margin: 0 0 6px 0;
      line-height: 1.1;
      }

      .privacy-link {
      color: #2563eb;
      cursor: pointer;
      text-decoration: underline;
      }

      .widget-footer {
      padding: 6px 8px;
      text-align: center;
      border-top: 1px solid #f3f4f6;
      }

      .footer-text {
      font-size: 11px;
      color: #9ca3af;
      }

      .footer-text strong {
      color: #111827;
      }

      /* Call View */
      .call-view {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 600px;
      }

      .call-header {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      gap: 10px;
      }

      .back-btn {
      background: transparent;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.2s ease;
      flex-shrink: 0;
      }

      .back-btn:hover {
      background: #f3f4f6;
      color: #111827;
      }

      .call-info {
      flex: 1;
      min-width: 0;
      }

      .call-info-name {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 2px;
      line-height: 1.2;
      }

      .call-info-status {
      font-size: 11px;
      display: flex;
      align-items: center;
      font-weight: 500;
      color: #10b981;
      }

      .call-info-status .status-text {
      font-size: 11px;
      line-height: 1;
      }

      /* Status color variants for header */
      .call-info-status.connecting {
      color: #d97706;
      }

      .call-info-status.connected {
      color: #2563eb;
      }

      .call-info-status.listening {
      color: #059669;
      }

      .call-info-status.speaking {
      color: #db2777;
      }

      .call-info-status.disconnected {
      color: #dc2626;
      }

      .call-view .widget-close {
      position: static;
      margin: 0;
      }

      .call-body {
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      background: #ffffff;
      }

      /* Language Section */
      .language-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 6px;
      }

      .language-label {
      font-size: 9px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
      }

      .language-select-styled {
      padding: 6px 10px !important;
      border-radius: 6px;
      border: 1px solid #d1d5db;
      background: white;
      font-size: 12px !important;
      color: #111827;
      cursor: pointer;
      transition: all 0.2s ease;
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center;
      padding-right: 32px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      }

      .language-select-styled:hover {
      border-color: #9ca3af;
      background-color: #f9fafb;
      }

      .language-select-styled:focus {
      outline: none;
      border-color: #6b7280;
      box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
      background-color: white;
      }

      /* Enhanced Controls Row */
      .call-controls-row {
      display: flex;
      align-items: stretch;
      gap: 8px;
      padding: 0;
      margin-bottom: 12px;
      }

      .audio-visualizer-enhanced {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;
      height: auto;
      background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
      border-radius: 8px;
      padding: 8px 10px;
      border: 1px solid #e5e7eb;
      }

      .audio-visualizer-enhanced .visualizer-bar {
      width: 3px;
      height: 16px;
      background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
      border-radius: 2px;
      transition: all 0.15s ease;
      }

      .audio-visualizer-enhanced .visualizer-bar.active {
      animation: visualizerPulseEnhanced 0.8s ease-in-out infinite;
      }

      .audio-visualizer-enhanced .visualizer-bar:nth-child(1) {
      animation-delay: 0s;
      }

      .audio-visualizer-enhanced .visualizer-bar:nth-child(2) {
      animation-delay: 0.1s;
      }

      .audio-visualizer-enhanced .visualizer-bar:nth-child(3) {
      animation-delay: 0.2s;
      }

      .audio-visualizer-enhanced .visualizer-bar:nth-child(4) {
      animation-delay: 0.3s;
      }

      .audio-visualizer-enhanced .visualizer-bar:nth-child(5) {
      animation-delay: 0.4s;
      }

      @keyframes visualizerPulseEnhanced {
      0%, 100% {
        height: 16px;
        opacity: 0.7;
        background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
      }
      50% {
        height: 24px;
        opacity: 1;
        background: linear-gradient(180deg, #4b5563 0%, #374151 100%);
      }
      }

      .widget-header {
      position: relative;
      text-align: center;
      padding: 20px 16px 24px;
      background: #ffffff;
      border-bottom: 1px solid #f3f4f6;
      }

      .widget-avatar {
      width: 64px;
      height: 64px;
      margin: 0 auto 12px;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111827;
      border: 2px solid #e5e7eb;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .widget-title {
      font-weight: 600;
      font-size: 18px;
      color: #111827;
      margin: 0 0 4px 0;
      letter-spacing: -0.01em;
      }

      .widget-subtitle {
      font-size: 13px;
      color: #6b7280;
      margin: 0;
      font-weight: 400;
      }

      .widget-close {
      position: absolute;
      top: 8px;
      right: 16px;
      background: transparent;
      border: none;
      color: #9ca3af;
      font-size: 24px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
      font-weight: 300;
      line-height: 1;
      }

      .widget-close:hover {
      background: #f3f4f6;
      color: #374151;
      }

      .widget-body {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
      background: #ffffff;
      }

      .language-selector {
      display: flex;
      flex-direction: column;
      gap: 6px;
      }

      .language-selector label {
      font-size: 12px;
      font-weight: 500;
      color: #374151;
      }

      .language-selector select {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      background: white;
      font-size: 13px;
      color: #111827;
      cursor: pointer;
      transition: all 0.2s ease;
      }

      .language-selector select:focus {
      outline: none;
      border-color: #6b7280;
      box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
      }

      .status {
      padding: 10px 12px;
      border-radius: 8px;
      text-align: center;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid transparent;
      }

      .status.connecting {
      background: #fef3c7;
      color: #92400e;
      border-color: #fde68a;
      }

      .status.connected {
      background: #dbeafe;
      color: #1e40af;
      border-color: #bfdbfe;
      }

      .status.listening {
      background: #d1fae5;
      color: #065f46;
      border-color: #a7f3d0;
      }

      .status.speaking {
      background: #fce7f3;
      color: #9f1239;
      border-color: #fbcfe8;
      }

      .status.disconnected {
      background: #fee2e2;
      color: #991b1b;
      border-color: #fecaca;
      }

      .audio-visualizer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      height: 40px;
      background: #f9fafb;
      border-radius: 8px;
      padding: 10px;
      }

      .visualizer-bar {
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
      border-radius: 2px;
      transition: height 0.15s ease;
      }

      .visualizer-bar.active {
      animation: visualizerPulse 0.8s ease-in-out infinite;
      }

      @keyframes visualizerPulse {
      0%, 100% {
        height: 20px;
        opacity: 0.8;
      }
      50% {
        height: 30px;
        opacity: 1;
      }
      }

      .messages-container {
      flex: 1;
      overflow-y: auto;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px;
      max-height: 180px;
      background: #f9fafb;
      min-height: 120px;
      }

      .messages-container::-webkit-scrollbar {
      width: 4px;
      }

      .messages-container::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 2px;
      }

      .messages-container::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 2px;
      }

      .messages-container::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
      }

      .empty-state {
      text-align: center;
      padding: 20px 10px;
      color: #6b7280;
      }

      .empty-state-icon {
      font-size: 36px;
      margin-bottom: 6px;
      opacity: 0.9;
      }

      .empty-state-text {
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.4;
      }

      .message {
      margin-bottom: 10px;
      padding: 8px 12px;
      border-radius: 10px;
      max-width: 85%;
      font-size: 13px;
      line-height: 1.4;
      word-wrap: break-word;
      }

      .message.user {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      margin-left: auto;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      }

      .message.assistant {
      background: #f3f4f6;
      margin-right: auto;
      color: #111827;
      border: 1px solid #e5e7eb;
      }
      border-bottom-right-radius: 4px;
      }

      .message.assistant {
      background: #f3f4f6;
      margin-right: auto;
      color: #111827;
      border: 1px solid #e5e7eb;
      }

      .message-label {
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      }

      .message-text {
      font-size: 14px;
      line-height: 1.5;
      color: inherit;
      }

      .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 2px;
      }

      .call-timer {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.5px;
      margin-right: auto;
      background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
      padding: 8px 14px;
      border-radius: 20px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      }

      .call-timer::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
      animation: timerShimmer 2s infinite;
      }

      @keyframes timerShimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
      }

      .control-btn-icon {
      width: 44px;
      height: 44px;
      padding: 0;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      }

      .control-btn-icon.connect {
      background: linear-gradient(135deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      animation: connectPulse 2s ease-in-out infinite;
      }

      @keyframes connectPulse {
      0%, 100% {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(107, 114, 128, 0.4);
      }
      50% {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 6px rgba(107, 114, 128, 0);
      }
      }

      .control-btn-icon.connect:hover {
      background: linear-gradient(135deg, #6b7280 0%, #9ca3af 30%, #4b5563 70%, #374151 100%);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .control-btn-icon.connect:active {
      transform: scale(0.95);
      }

      .control-btn-icon.connect.connected {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #dc2626 100%);
      animation: none;
      z-index: 1;
      }

      .control-btn-icon.connect.connected:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%);
      transform: scale(1.05);
      }

      .control-btn-icon.clear {
      background: #f3f4f6;
      color: #6b7280;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      .control-btn-icon.clear:hover {
      background: #e5e7eb;
      color: #374151;
      transform: scale(1.05);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .control-btn-icon.clear:active {
      transform: scale(0.95);
      }

      .control-btn-icon.mute {
      background: #f3f4f6;
      color: #10b981;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      .control-btn-icon.mute:hover {
      background: #d1fae5;
      color: #059669;
      transform: scale(1.05);
      box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
      }

      .control-btn-icon.mute:active {
      transform: scale(0.95);
      }

      .control-btn-icon.mute.muted {
      background: #fee2e2;
      color: #dc2626;
      }

      .control-btn-icon.mute.muted:hover {
      background: #fecaca;
      color: #b91c1c;
      box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
      }

      @media (max-width: 768px) {
      .shivai-widget {
        width: calc(100vw - 40px);
        right: 20px;
        bottom: 80px;
        max-height: 500px;
      }
      }

      @media (max-width: 480px) {
      .shivai-widget {
        width: calc(100vw - 24px);
        right: 12px;
        bottom: 70px;
        max-height: 450px;
      }

      .widget-header {
        padding: 16px 12px 20px;
      }

      .widget-body {
        padding: 16px;
      }

      .control-btn {
        padding: 12px 14px;
        font-size: 13px;
      }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  } // Setup event listeners
  function setupEventListeners() {
    // Trigger button click
    triggerBtn.addEventListener("click", toggleWidget);

    // Close button clicks (both in landing and call views)
    const closeButtons = widgetContainer.querySelectorAll(".widget-close");
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", closeWidget);
    });

    // Start Call button click
    const startCallBtn = document.getElementById("start-call-btn");
    if (startCallBtn) {
      startCallBtn.addEventListener("click", switchToCallView);
    }

    // Back button click
    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", switchToLandingView);
    }

    // Connect button click
    if (connectBtn) {
      connectBtn.addEventListener("click", handleConnectClick);
    }

    // Mute button click
    if (muteBtn) {
      muteBtn.addEventListener("click", handleMuteClick);
    }

    // Close widget when clicking outside
    document.addEventListener("click", (e) => {
      if (
        isWidgetOpen &&
        !widgetContainer.contains(e.target) &&
        !triggerBtn.contains(e.target)
      ) {
        closeWidget();
      }
    });

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isWidgetOpen) {
        closeWidget();
      }
    });
  }

  // Switch to call view
  function switchToCallView() {
    currentView = "call";
    landingView.style.display = "none";
    callView.style.display = "flex";
  }

  // Switch to landing view
  function switchToLandingView() {
    currentView = "landing";
    landingView.style.display = "flex";
    callView.style.display = "none";

    // If call was active, disconnect
    if (isConnected) {
      stopConversation();
    }
  }

  // Toggle widget visibility
  function toggleWidget() {
    if (isWidgetOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  }

  // Open widget
  function openWidget() {
    widgetContainer.classList.add("active");
    isWidgetOpen = true;
    // Hide trigger button when widget opens
    if (triggerBtn) {
      triggerBtn.style.display = "none";
    }
    // Hide bubble when widget opens
    hideBubble();
    if (messageInterval) {
      clearInterval(messageInterval);
      messageInterval = null;
    }
  }

  // Close widget
  function closeWidget() {
    widgetContainer.classList.remove("active");
    isWidgetOpen = false;
    // Show trigger button when widget closes
    if (triggerBtn) {
      triggerBtn.style.display = "flex";
    }
    // Return to landing view when closing
    switchToLandingView();
    // Restart messages when widget closes
    if (!messageInterval) {
      startLiveMessages();
    }
  }

  // Handle connect button click
  async function handleConnectClick(e) {
    // Prevent event from closing the widget
    if (e) {
      e.stopPropagation();
    }
    
    // Prevent button spam during connection
    if (isConnecting) {
      return;
    }

    if (isConnected) {
      stopConversation();
    } else {
      isConnecting = true;
      connectBtn.disabled = true; // Disable button during connection
      
      try {
        // Show hang-up button immediately
        connectBtn.innerHTML =
          '<svg width="26" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" transform="rotate(135 12 12)"></path></svg>';
        connectBtn.classList.add("connected");
        connectBtn.title = "Hang Up";
        
        await startConversation();
        
        // Re-enable button after connection succeeds
        connectBtn.disabled = false;
        isConnecting = false;
      } catch (error) {
        console.error("Failed to start conversation:", error);
        updateStatus("❌ Failed to connect", "disconnected");
        
        // Reset UI on error
        connectBtn.innerHTML =
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
        connectBtn.classList.remove("connected");
        connectBtn.title = "Start Call";
        connectBtn.disabled = false;
        isConnecting = false;
        
        if (muteBtn) {
          muteBtn.style.display = "none";
        }
        languageSelect.disabled = false;
      }
    }
  }

  // Handle mute button click
  function handleMuteClick(e) {
    e.stopPropagation();
    if (!isConnected || !mediaStream) return;

    isMuted = !isMuted;

    // Mute/unmute the microphone tracks
    mediaStream.getAudioTracks().forEach((track) => {
      track.enabled = !isMuted;
    });

    // Update button UI
    if (isMuted) {
      muteBtn.classList.add("muted");
      muteBtn.title = "Unmute Microphone";
      muteBtn.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
    } else {
      muteBtn.classList.remove("muted");
      muteBtn.title = "Mute Microphone";
      muteBtn.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
    }
  }

  // Update status
  function updateStatus(status, className) {
    const statusText = statusDiv.querySelector(".status-text");
    if (statusText) {
      statusText.textContent = status;
    } else {
      statusDiv.textContent = status;
    }
    statusDiv.className = `call-info-status ${className}`;
  }

  // Loading animation functions
  function showLoadingStatus(message) {
    clearLoadingStatus(); // Clear any existing animation
    let dots = '';
    loadingInterval = setInterval(() => {
      dots = dots.length >= 3 ? '' : dots + '.';
      const statusText = statusDiv.querySelector(".status-text");
      if (statusText) {
        statusText.textContent = `${message}${dots}`;
      } else {
        statusDiv.textContent = `${message}${dots}`;
      }
    }, 400); // 400ms for smooth dot animation
  }

  function clearLoadingStatus() {
    if (loadingInterval) {
      clearInterval(loadingInterval);
      loadingInterval = null;
    }
  }

  // Call timer functions
  function startCallTimer() {
    callStartTime = Date.now();
    if (callTimerElement) {
      callTimerElement.style.display = "block";
    }
    callTimerInterval = setInterval(updateCallTimer, 1000);
    updateCallTimer();
  }

  function stopCallTimer() {
    if (callTimerInterval) {
      clearInterval(callTimerInterval);
      callTimerInterval = null;
    }
    callStartTime = null;
    if (callTimerElement) {
      callTimerElement.style.display = "none";
      callTimerElement.textContent = "00:00";
    }
  }

  function updateCallTimer() {
    if (!callStartTime || !callTimerElement) return;

    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    callTimerElement.textContent = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  // Add message to transcript
  function addMessage(role, text) {
    // Remove empty state if exists
    const emptyState = messagesDiv.querySelector(".empty-state");
    if (emptyState) {
      emptyState.remove();
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;

    const labelDiv = document.createElement("div");
    labelDiv.className = "message-label";
    labelDiv.textContent = role === "user" ? "You" : "Assistant";

    const textDiv = document.createElement("div");
    textDiv.className = "message-text";
    textDiv.textContent = text;

    messageDiv.appendChild(labelDiv);
    messageDiv.appendChild(textDiv);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Show clear button when there are messages
    if (clearBtn) {
      clearBtn.style.display = "flex";
    }

    return messageDiv;
  }

  // Update existing message
  function updateMessage(messageDiv, text) {
    const textDiv = messageDiv.querySelector(".message-text");
    if (textDiv) {
      textDiv.textContent = text;
    }
  }

  // Visualizer animation
  function animateVisualizer(active) {
    if (!visualizerBars) return;

    visualizerBars.forEach((bar, index) => {
      if (active) {
        const randomHeight = Math.random() * 18 + 10;
        setTimeout(() => {
          bar.style.height = `${randomHeight}px`;
        }, index * 30);
      } else {
        bar.style.height = "14px";
      }
    });
  }

  // Start conversation
  async function startConversation() {
    try {
      updateStatus("Initializing...", "connecting");

      // Get selected language
      const selectedLanguage = languageSelect.value;

      // STEP 1: Request microphone access FIRST (instant permission prompt)
      // Check if microphone API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        updateStatus("❌ Microphone not supported", "disconnected");
        alert("Your browser doesn't support microphone access. Please use a modern browser like Chrome, Safari, or Firefox.");
        throw new Error("getUserMedia not supported");
      }

      // Get microphone access with iOS/mobile compatibility
      updateStatus("Requesting microphone...", "connecting");
      
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            sampleRate: 24000,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        console.log("Microphone access granted");
      } catch (micError) {
        console.error("Error accessing microphone:", micError);
        
        // Try with simpler constraints for iOS/mobile fallback
        try {
          console.log("Trying fallback microphone settings...");
          mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          console.log("Microphone access granted with fallback settings");
        } catch (fallbackError) {
          console.error("Fallback microphone access failed:", fallbackError);
          updateStatus("❌ Microphone access denied", "disconnected");
          
          // Provide helpful message based on error
          let errorMessage = "Microphone access is required for voice calls.";
          if (fallbackError.name === "NotAllowedError") {
            errorMessage += "\n\nPlease allow microphone permissions in your browser settings.";
          } else if (fallbackError.name === "NotFoundError") {
            errorMessage += "\n\nNo microphone found. Please check your device.";
          }
          
          alert(errorMessage);
          throw new Error("Microphone access denied");
        }
      }

      // STEP 2: Now call the API (after mic permission granted)
      statusDiv.className = "call-info-status connecting";
      showLoadingStatus("Connecting to server");
      const startCallResponse = await fetch(
        "https://shivai-com-backend.onrender.com/api/v1/calls/start-call",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            warmedUp: false,
          }),
          cache: "no-store",
        }
      );

      if (!startCallResponse.ok) {
        throw new Error(`Start call API failed: ${startCallResponse.status}`);
      }

      const startCallData = await startCallResponse.json();
      if (!startCallData.success || !startCallData.data) {
        throw new Error(startCallData.message || "Failed to start call");
      }

      const { callId, pythonServiceUrl } = startCallData.data;
      console.log("Call started:", callId, "URL:", pythonServiceUrl);

      // Store callId for later use
      window.currentCallId = callId;

      // STEP 3: Initialize audio context
      audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 24000,
        latencyHint: "interactive", // Optimize for low latency
      });

      // Resume audio context if suspended (browser autoplay policy)
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // Setup playback processor for smooth audio
      setupPlaybackProcessor();

      // Connect to Python WebSocket service
      ws = new WebSocket("wss://openai-shell.onrender.com/ws");

      ws.onopen = () => {
        console.log("🟢 [WEBSOCKET] Connected to server");
        isConnected = true;
        clearLoadingStatus(); // Stop loading animation
        updateStatus("Connected", "connected");
        connectBtn.innerHTML =
          '<svg width="26" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" transform="rotate(135 12 12)"></path></svg>';
        connectBtn.classList.add("connected");
        connectBtn.title = "End Call";
        if (muteBtn) {
          muteBtn.style.display = "flex";
          isMuted = false;
        }
        languageSelect.disabled = true;
        startCallTimer();
        console.log("Connected to server");

        // Send configuration to WebSocket server
        const configMessage = {
          type: "config",
          language: selectedLanguage,
          agent_id: "id123", // Use callId as agent_id
        };
        console.log("📤 [WEBSOCKET] Sending config:", configMessage);
        ws.send(JSON.stringify(configMessage));

        // Start continuous audio streaming
        console.log("🎤 [AUDIO] Starting audio streaming");
        startAudioStreaming();
      };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log("📥 [WEBSOCKET] Message received:", data.type, data);
        const eventType = data.type;

        // Handle different event types
        if (eventType === "input_audio_buffer.speech_started") {
          console.log("🎤 [USER] Speech started");
          updateStatus("🎤 Listening...", "listening");

          // PERFECT INTERRUPT: Stop AI audio when user starts speaking
          stopAllScheduledAudio({ preserveStatus: true });

          // Reset user transcript tracking
          currentUserTranscript = "";
          lastUserMessageDiv = null;

          if (!visualizerInterval) {
            visualizerInterval = setInterval(
              () => animateVisualizer(true),
              100
            );
          }
        } else if (eventType === "input_audio_buffer.speech_stopped") {
          console.log("🛑 [USER] Speech stopped");
          updateStatus("🤔 Processing...", "speaking");
          if (visualizerInterval) {
            clearInterval(visualizerInterval);
            visualizerInterval = null;
            animateVisualizer(false);
          }
        } else if (eventType === "deepgram.transcript") {
          // Deepgram transcript - more accurate than OpenAI
          const transcript = data.transcript;
          const isFinal = data.is_final;

          if (transcript && transcript.trim()) {
            console.log(`📝 [USER ${isFinal ? 'FINAL' : 'INTERIM'}]:`, transcript);
            
            if (!lastUserMessageDiv) {
              // Create new message for user
              lastUserMessageDiv = addMessage("user", transcript);
              currentUserTranscript = transcript;
            } else {
              // Update existing message with new interim or final transcript
              if (isFinal) {
                currentUserTranscript = transcript;
                updateMessage(lastUserMessageDiv, transcript);
                console.log("✅ [USER] Final transcript saved:", transcript);
                lastUserMessageDiv = null; // Reset for next utterance
              } else {
                // Update with interim result
                updateMessage(lastUserMessageDiv, transcript);
              }
            }
          }
        } else if (eventType === "response.audio_transcript.delta") {
          // AI transcript delta - accumulate
          console.log("📝 [AI DELTA]:", data.delta);
          currentAssistantTranscript += data.delta;
        } else if (eventType === "response.audio_transcript.done") {
          // AI transcript completed
          if (currentAssistantTranscript && currentAssistantTranscript.trim()) {
            console.log("✅ [AI RESPONSE]:", currentAssistantTranscript);
            addMessage("assistant", currentAssistantTranscript);
          }
          currentAssistantTranscript = "";
        } else if (eventType === "response.audio.delta") {
          // Perfect audio scheduling
          console.log("🔊 [AI AUDIO] Received audio chunk");
          scheduleAudioChunk(base64ToArrayBuffer(data.delta));
        } else if (eventType === "response.done") {
          console.log("✅ [AI] Response complete");
          if (!assistantSpeaking) {
            updateStatus("🟢 Connected - Speak naturally!", "connected");
          }
        } else if (eventType === "error") {
          console.error("❌ [ERROR] from server:", data);
          updateStatus("❌ Error occurred", "disconnected");
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        clearLoadingStatus(); // Stop loading animation on error
        updateStatus("❌ Connection error", "disconnected");
        stopConversation();
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        clearLoadingStatus(); // Stop loading animation on close
        stopConversation();
      };
    } catch (error) {
      console.error("Error:", error);
      clearLoadingStatus(); // Stop loading animation on catch
      alert(
        "Failed to access microphone or connect to server. Please ensure:\n1. Backend server is running\n2. Microphone permissions are granted"
      );
      stopConversation();
    }
  }

  // Stop conversation
  async function stopConversation() {
    isConnected = false;
    stopCallTimer();

    // Call end-call API if we have a callId
    if (window.currentCallId) {
      try {
        updateStatus("Disconnecting...", "connecting");

        const response = await fetch(
          "https://shivai-com-backend.onrender.com/api/v1/calls/end-call",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              callId: window.currentCallId,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Call ended successfully:", data);
        }
      } catch (error) {
        console.error("Error ending call:", error);
      } finally {
        window.currentCallId = null;
      }
    }

    // Perfect audio cleanup
    stopAllScheduledAudio();
    teardownPlaybackProcessor();

    // Stop audio streaming
    if (audioWorkletNode) {
      audioWorkletNode.disconnect();
      audioWorkletNode = null;
    }

    // Stop media stream and close microphone properly
    if (mediaStream) {
      console.log("Stopping microphone and closing media stream...");
      mediaStream.getTracks().forEach((track) => {
        console.log(`Stopping track: ${track.kind}, state: ${track.readyState}`);
        track.stop(); // Stop each track
        track.enabled = false; // Disable track
      });
      mediaStream = null;
      console.log("Microphone closed successfully");
    }

    // Close WebSocket
    if (ws) {
      ws.close();
      ws = null;
    }

    // Close audio context properly
    if (audioContext) {
      try {
        await audioContext.close();
      } catch (error) {
        console.error("Error closing audio context:", error);
      }
      audioContext = null;
    }

    // Stop visualizer
    if (visualizerInterval) {
      clearInterval(visualizerInterval);
      visualizerInterval = null;
      animateVisualizer(false);
    }

    // Reset UI
    updateStatus("Ready to connect", "disconnected");
    connectBtn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
    connectBtn.classList.remove("connected");
    connectBtn.title = "Start Call";
    if (muteBtn) {
      muteBtn.style.display = "none";
      muteBtn.classList.remove("muted");
      isMuted = false;
    }
    languageSelect.disabled = false;

    console.log("Conversation stopped");
  }

  // Start audio streaming - Perfect version with clean audio processing
  function startAudioStreaming() {
    const source = audioContext.createMediaStreamSource(mediaStream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (e) => {
      if (!isConnected || !ws || ws.readyState !== WebSocket.OPEN) return;

      const inputData = e.inputBuffer.getChannelData(0);
      const pcm16 = convertFloat32ToPCM16(inputData);
      const base64Audio = arrayBufferToBase64(pcm16);

      ws.send(
        JSON.stringify({
          type: "audio",
          audio: base64Audio,
        })
      );
    };

    source.connect(processor);
    processor.connect(audioContext.destination);
    audioWorkletNode = processor;
  }

  // Convert base64 to ArrayBuffer
  function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Convert PCM16 to WAV format
  // Set assistant speaking state
  function setAssistantSpeaking(isSpeaking, preserveStatus = false) {
    if (assistantSpeaking === isSpeaking) {
      return;
    }
    assistantSpeaking = isSpeaking;
    if (isSpeaking) {
      updateStatus("🔊 Speaking...", "speaking");
    } else if (!preserveStatus) {
      updateStatus("🟢 Connected - Speak naturally!", "connected");
    }
  }

  // Setup playback processor for smooth audio
  function setupPlaybackProcessor() {
    if (!audioContext) {
      return;
    }
    teardownPlaybackProcessor();
    playbackBufferQueue = [];
    playbackBufferOffset = 0;
    playbackProcessor = audioContext.createScriptProcessor(1024, 1, 1);
    playbackProcessor.onaudioprocess = handlePlaybackProcess;
    playbackProcessor.connect(audioContext.destination);
  }

  // Teardown playback processor
  function teardownPlaybackProcessor() {
    if (playbackProcessor) {
      playbackProcessor.disconnect();
      playbackProcessor = null;
    }
  }

  // Handle continuous playback process
  function handlePlaybackProcess(event) {
    const output = event.outputBuffer.getChannelData(0);
    let offset = 0;
    const volumeGain = 4.0; // Boost volume by 4x (max volume)

    while (offset < output.length) {
      if (playbackBufferQueue.length === 0) {
        for (; offset < output.length; offset++) {
          output[offset] = 0;
        }
        if (assistantSpeaking) {
          setAssistantSpeaking(false);
        }
        return;
      }

      const currentBuffer = playbackBufferQueue[0];
      const remaining = currentBuffer.length - playbackBufferOffset;
      const samplesToCopy = Math.min(remaining, output.length - offset);

      // Copy samples with volume boost
      for (let i = 0; i < samplesToCopy; i++) {
        output[offset + i] = Math.max(-1, Math.min(1, currentBuffer[playbackBufferOffset + i] * volumeGain));
      }

      offset += samplesToCopy;
      playbackBufferOffset += samplesToCopy;

      if (playbackBufferOffset >= currentBuffer.length) {
        playbackBufferQueue.shift();
        playbackBufferOffset = 0;
      }
    }
  }

  // Perfect audio scheduling system
  function scheduleAudioChunk(pcmBuffer) {
    if (!audioContext) {
      return;
    }

    if (!playbackProcessor) {
      setupPlaybackProcessor();
    }

    const float32 = pcm16ToFloat32(pcmBuffer);
    if (float32.length === 0) {
      return;
    }

    const wasBufferEmpty = playbackBufferQueue.length === 0;
    playbackBufferQueue.push(float32);
    if (wasBufferEmpty) {
      setAssistantSpeaking(true);
    }
  }

  // Perfect PCM16 to Float32 conversion
  function pcm16ToFloat32(pcmBuffer) {
    const pcm16 = new Int16Array(pcmBuffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 0x8000;
    }
    return float32;
  }

  // Perfect audio interruption system
  function stopAllScheduledAudio(options = {}) {
    const preserveStatus = options.preserveStatus === true;
    playbackBufferQueue = [];
    playbackBufferOffset = 0;
    setAssistantSpeaking(false, preserveStatus);
  }

  // Convert Float32Array to PCM16
  function convertFloat32ToPCM16(float32Array) {
    const pcm16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return pcm16.buffer;
  }

  // Convert ArrayBuffer to base64
  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Clean up on page unload
  window.addEventListener("beforeunload", () => {
    stopConversation();
  });

  // Initialize widget when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})(window, document);
