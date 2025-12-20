// Clean version of widget2.js with basic modal widget functionality

(function() {
  'use strict';

  // Widget state variables
  let isWidgetOpen = false;
  let modalOverlay = null;
  let widgetContainer = null;
  let modalContent = null;
  let agentSelectionView = null;
  let landingView = null;
  let callView = null;
  let triggerButton = null;
  
  // Chat interface variables
  let messagesDiv = null;
  let messageInputContainer = null;
  let lastSentMessage = null;
  let currentUserTranscript = "";
  let currentAssistantTranscript = "";
  let hasReceivedFirstAIResponse = false;
  
  // Call functionality variables
  let room = null;
  let localAudioTrack = null;
  let isConnected = false;
  let isConnecting = false;
  let selectedLanguage = 'en-US';
  let deviceType = 'web';
  let connectionTimeout = null;
  const CONNECTION_TIMEOUT = 15000;

  // Widget configuration
  const config = {
    widgetId: 'shivai-widget-trigger',
    position: 'bottom-right'
  };

  function createWidgetUI() {
    console.log('🎨 Creating widget UI...');
    
    // Prevent multiple widget creation
    if (document.getElementById('shivai-modal-overlay')) {
      return;
    }
    
    // Create floating trigger button
    createTriggerButton();
    
    // Create main modal overlay
    modalOverlay = document.createElement("div");
    modalOverlay.id = "shivai-modal-overlay";
    modalOverlay.className = "shivai-modal-overlay";

    // Create widget container
    widgetContainer = document.createElement("div");
    widgetContainer.className = "shivai-widget-container";

    // Create modal content container
    modalContent = document.createElement("div");
    modalContent.className = "shivai-modal-content";
    
    // Create agent selection view
    agentSelectionView = document.createElement("div");
    agentSelectionView.className = "agent-selection-view";
    agentSelectionView.innerHTML = `
      <div class="modal-header">
        <div class="header-content">
          <button class="modal-close" aria-label="Close modal">×</button>
          <div class="header-info">
            <div class="widget-avatar">
             <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1500" style="height: 48px; width: 48px; fill: #3b82f6;">
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
            <div class="header-text">
              <div class="widget-title">ShivAI</div>
              <div class="widget-subtitle">AI-powered voice employees for your business - Choose your assistant type</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="agent-type-section">
          <label class="section-label">Choose Agent Type</label>
          <div class="agent-options">
            <div class="agent-option" data-agent="sales">
              <div class="agent-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  <path d="M12 5v6m3-3l-3-3-3 3"></path>
                </svg>
              </div>
              <div class="agent-info">
                <div class="agent-name">Sales Expert</div>
                <div class="agent-desc">Recommends the right plans and assists you with pricing and purchases.</div>
              </div>
            </div>
            <div class="agent-option" data-agent="support">
              <div class="agent-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 11v3a1 1 0 0 0 1 1h1v-4H4a1 1 0 0 0-1 1Z"></path>
                  <path d="M21 11v3a1 1 0 0 1-1 1h-1v-4h1a1 1 0 0 1 1 1Z"></path>
                  <path d="M7 4a4 4 0 0 1 8 0v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4Z"></path>
                  <path d="M12 19v2"></path>
                </svg>
              </div>
              <div class="agent-info">
                <div class="agent-name">Support Expert</div>
                <div class="agent-desc">Solves issues, answers questions, and guides you whenever you need help.</div>
              </div>
            </div>
            <div class="agent-option" data-agent="scheduler">
              <div class="agent-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <circle cx="9" cy="15" r="1" fill="currentColor"></circle>
                  <circle cx="15" cy="15" r="1" fill="currentColor"></circle>
                </svg>
              </div>
              <div class="agent-info">
                <div class="agent-name">Appointment Scheduler</div>
                <div class="agent-desc">Quickly books virtual or on-site meetings at a time that works for you.</div>
              </div>
            </div>
            <div class="agent-option" data-agent="product">
              <div class="agent-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 8v13H3V8"></path>
                  <path d="M1 3h22v5H1z"></path>
                  <path d="M10 12h4"></path>
                  <circle cx="7" cy="8" r="1" fill="currentColor"></circle>
                  <circle cx="17" cy="8" r="1" fill="currentColor"></circle>
                </svg>
              </div>
              <div class="agent-info">
                <div class="agent-name">Product Expert</div>
                <div class="agent-desc">Helps you explore every service, feature, and benefit in simple terms.</div>
              </div>
            </div>
          </div>
          <div class="agent-scroll-indicator" style="display: none;">
            <div class="agent-scroll-dots">
              <div class="agent-dot active"></div>
              <div class="agent-dot"></div>
              <div class="agent-dot"></div>
              <div class="agent-dot"></div>
            </div>
            <div class="agent-scroll-text">Swipe to see more agents</div>
          </div>
        </div>
        <div class="agent-gender-section">
          <label class="section-label">Select Agent Gender</label>
          <div class="gender-options">
            <div class="gender-option" data-gender="male">
              <div class="gender-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="10" cy="14" r="6"></circle>
                  <path d="M17 7l-3 3"></path>
                  <path d="M21 3l-6 6"></path>
                  <path d="M15 3h6v6"></path>
                </svg>
              </div>
              <span>Male Voice</span>
              <div class="voice-desc">Professional tone</div>
            </div>
            <div class="gender-option" data-gender="female">
              <div class="gender-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M12 14v7"></path>
                  <path d="M8 18h8"></path>
                </svg>
              </div>
              <span>Female Voice</span>
              <div class="voice-desc">Friendly tone</div>
            </div>
          </div>
        </div>
        <button class="next-btn" id="agent-next-btn" disabled>
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;
    
    // Create landing view
    landingView = document.createElement("div");
    landingView.className = "landing-view";
    landingView.innerHTML = `
      <div class="modal-header">
        <div class="header-content">
          <button class="back-btn" id="language-back-btn" aria-label="Back to agent selection">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button class="modal-close" aria-label="Close modal">×</button>
          <div class="header-info">
            <div class="widget-avatar">
             <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1500" style="height: 48px; width: 48px; fill: #3b82f6;">
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
            <div class="header-text">
              <div class="widget-title">ShivAI</div>
              <div class="widget-subtitle">Select your preferred language for the conversation</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="language-section-landing">
          <div class="language-header">
            <div class="language-icon">🌐</div>
            <h3>Select Agent Language</h3>
          </div>
          <!-- Mobile Language Dropdown -->
          <div class="mobile-language-section">
            <div class="custom-dropdown" id="custom-language-dropdown">
              <div class="dropdown-selected" id="dropdown-selected">
                <span class="selected-text">🇺🇸 English (US)</span>
                <span class="dropdown-arrow">▼</span>
              </div>
              <div class="dropdown-options" id="dropdown-options">
                <div class="dropdown-option selected" data-value="en-US">🇺🇸 English (US)</div>
                <div class="dropdown-option" data-value="en-IN">🇮🇳 English (India)</div>
                <div class="dropdown-option" data-value="hi">🇮🇳 Hindi</div>
                <div class="dropdown-option" data-value="ar">🇸🇦 Arabic</div>
                <div class="dropdown-option" data-value="es">🇪🇸 Spanish</div>
                <div class="dropdown-option" data-value="fr">🇫🇷 French</div>
                <div class="dropdown-option" data-value="de">🇩🇪 German</div>
                <div class="dropdown-option" data-value="it">🇮🇹 Italian</div>
                <div class="dropdown-option" data-value="pt">🇵🇹 Portuguese</div>
                <div class="dropdown-option" data-value="zh">🇨🇳 Chinese</div>
                <div class="dropdown-option" data-value="ja">🇯🇵 Japanese</div>
                <div class="dropdown-option" data-value="ko">🇰🇷 Korean</div>
                <div class="dropdown-option" data-value="ru">🇷🇺 Russian</div>
                <div class="dropdown-option" data-value="tr">🇹🇷 Turkish</div>
              </div>
            </div>
          </div>
          <!-- Desktop Language Grid -->
          <div class="language-grid">
            <div class="language-scroll-container">
              <div class="language-option selected" data-language="en-US">
                <div class="language-code">🇺🇸</div>
                <div class="language-name">English (US)</div>
              </div>
              <div class="language-option" data-language="en-IN">
                <div class="language-code">🇮🇳</div>
                <div class="language-name">English (India)</div>
              </div>
              <div class="language-option" data-language="hi">
                <div class="language-code">🇮🇳</div>
                <div class="language-name">Hindi</div>
              </div>
              <div class="language-option" data-language="ar">
                <div class="language-code">🇸🇦</div>
                <div class="language-name">Arabic</div>
              </div>
              <div class="language-option" data-language="es">
                <div class="language-code">🇪🇸</div>
                <div class="language-name">Spanish</div>
              </div>
              <div class="language-option" data-language="fr">
                <div class="language-code">🇫🇷</div>
                <div class="language-name">French</div>
              </div>
              <div class="language-option" data-language="de">
                <div class="language-code">🇩🇪</div>
                <div class="language-name">German</div>
              </div>
              <div class="language-option" data-language="it">
                <div class="language-code">🇮🇹</div>
                <div class="language-name">Italian</div>
              </div>
              <div class="language-option" data-language="pt">
                <div class="language-code">🇵🇹</div>
                <div class="language-name">Portuguese</div>
              </div>
              <div class="language-option" data-language="zh">
                <div class="language-code">🇨🇳</div>
                <div class="language-name">Chinese</div>
              </div>
              <div class="language-option" data-language="ja">
                <div class="language-code">🇯🇵</div>
                <div class="language-name">Japanese</div>
              </div>
              <div class="language-option" data-language="ko">
                <div class="language-code">🇰🇷</div>
                <div class="language-name">Korean</div>
              </div>
              <div class="language-option" data-language="ru">
                <div class="language-code">🇷🇺</div>
                <div class="language-name">Russian</div>
              </div>
              <div class="language-option" data-language="tr">
                <div class="language-code">🇹🇷</div>
                <div class="language-name">Turkish</div>
              </div>
              <div class="language-option" data-language="nl">
                <div class="language-code">NL</div>
                <div class="language-name">Dutch</div>
              </div>
            </div>
          </div>
        </div>
        <button class="start-call-btn" id="start-call-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Start Call
        </button>
        <div class="privacy-text">By using this service you agree to our T&C</div>
      </div>
      <div class="modal-footer">
        <div class="footer-text" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; color: #6b7280; flex-wrap: nowrap; line-height: 1;">
          <span>Powered by</span>
          <a href="https://callshivai.com" target="_blank" rel="noopener noreferrer" class="footer-logo-link" style="display: inline-flex; align-items: center; text-decoration: none; cursor: pointer; transition: all 0.2s ease; vertical-align: middle;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1500" class="footer-logo" style="height: 42px; width: 42px; fill: #3b82f6; display: inline-block; vertical-align: middle; margin-left: -5px;">
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
            </a></div>
      </div>
    `;
    
    // Create call view
    callView = document.createElement("div");
    callView.className = "call-view";
    callView.style.display = "none";
    callView.innerHTML = `
      <div class="call-visualizer" id="call-visualizer">
        <div class="call-header">
          <button class="back-btn" id="back-btn" aria-label="Back to landing">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="call-info">
            <div class="call-info-name">ShivAI Employee</div>
            <div class="call-info-status" id="shivai-status">
              <span class="status-text">Online</span>
            </div>
          </div>
          <button class="modal-close" aria-label="Close modal">×</button>
        </div>
        <div class="call-body">
          <div class="messages-container" id="shivai-messages">
            <div class="empty-state">
              <div class="empty-state-icon">�</div>
              <div class="empty-state-text">Start a conversation to see transcripts here</div>
            </div>
          </div>
          
          <!-- Modern Message Input Interface -->
          <div class="message-input-container">
            <!-- Attachment Button -->
            <div>
              <button id="shivai-attach-btn" class="attach-btn" title="Coming soon..." disabled>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>
              
              <!-- Hidden file inputs -->
              <input type="file" id="shivai-file-input" accept="image/*,video/*,.pdf,.doc,.docx,.txt" style="display: none !important;" multiple>
              <input type="file" id="shivai-image-input" accept="image/*" style="display: none !important;" multiple>
            </div>

            <!-- Input Field Container -->
            <div class="input-field-container">
              <!-- Input Field -->
              <input type="text" id="shivai-message-input" class="message-input" placeholder="Type a message..." />
              
              <!-- Send Button (Hidden initially, shows when typing) -->
              <button id="shivai-send-btn" class="send-btn" title="Send Message" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Attachment Menu Popup -->
          <div id="shivai-attachment-menu" class="attachment-menu">
            <div class="attachment-option" id="shivai-attach-image">
              <div class="attachment-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
              </div>
              <span>Photos & Videos</span>
            </div>
            
            <div class="attachment-option" id="shivai-attach-document">
              <div class="attachment-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <span>Documents</span>
            </div>
          </div>
          
          <div class="controls">
            <div class="call-timer" id="call-timer">00:00</div>
            <button class="control-btn-icon call-btn" id="shivai-call-btn" title="Start Call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </button>
            <button class="control-btn-icon hangup-btn" id="shivai-hangup-btn" title="End Call" style="display: none;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <button class="control-btn-icon mute" id="shivai-mute" title="Mute Microphone" style="display: none;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="widget-footer" style="padding: 0; margin: 0; background-color: #f9fafb;">
          <div class="footer-text" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; color: #6b7280; flex-wrap: nowrap; line-height: 1;">
            <span>Powered by</span>
            <a href="https://callshivai.com" target="_blank" rel="noopener noreferrer" class="footer-logo-link" style="display: inline-flex; align-items: center; text-decoration: none; cursor: pointer; transition: all 0.2s ease; vertical-align: middle;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1500" class="footer-logo" style="height: 42px; width: 42px; fill: #3b82f6; vertical-align: middle; line-height: 1; margin-left: -5px;">
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
            </a>
          </div>
        </div>
      </div>
    `;

    // Assemble the modal
    modalContent.appendChild(agentSelectionView);
    modalContent.appendChild(landingView);
    modalContent.appendChild(callView);
    
    // Initialize view states - ensure only agent selection is visible
    agentSelectionView.style.display = 'block';
    landingView.style.display = 'none';
    landingView.classList.add('hide');
    callView.style.display = 'none';
    callView.classList.remove('show');
    
    widgetContainer.appendChild(modalContent);
    modalOverlay.appendChild(widgetContainer);

    // Add styles and append to document
    addWidgetStyles();
    
    // Initially hide the modal overlay
    modalOverlay.style.display = 'none';
    
    document.body.appendChild(modalOverlay);
  }

  function createTriggerButton() {
    // Prevent multiple trigger buttons
    if (document.getElementById('shivai-trigger-btn')) {
      return;
    }
    
    // Create floating trigger button
    triggerButton = document.createElement('button');
    triggerButton.id = 'shivai-trigger-btn';
    triggerButton.className = 'shivai-trigger shivai-neon-pulse';
    triggerButton.innerHTML = `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    `;
    triggerButton.setAttribute('aria-label', 'Open ShivAI Assistant');
    
    // Add click event listener with immediate response
    triggerButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openWidget();
    });
    
    // Append to body
    document.body.appendChild(triggerButton);
    
    // Make trigger button draggable
    makeTriggerBtnDraggable(triggerButton);
  }

  function makeTriggerBtnDraggable(btnElement) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let dragTimeout;
    btnElement.addEventListener("mousedown", startDrag);
    btnElement.addEventListener("touchstart", startDrag, { passive: false });
    function startDrag(e) {
      if (dragTimeout) {
        clearTimeout(dragTimeout);
      }
      dragTimeout = setTimeout(() => {
        isDragging = true;
        btnElement.style.transition = "none";
        if (e.type === "mousedown") {
          startX = e.clientX;
          startY = e.clientY;
        } else {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }
        const rect = btnElement.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchmove", drag, { passive: false });
        document.addEventListener("touchend", stopDrag);
        btnElement.classList.add("dragging");
      }, 100);
    }
    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      let currentX, currentY;
      if (e.type === "mousemove") {
        currentX = e.clientX;
        currentY = e.clientY;
      } else {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      }
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      let newX = initialX + deltaX;
      let newY = initialY + deltaY;
      const elementRect = btnElement.getBoundingClientRect();
      const maxX = window.innerWidth - elementRect.width;
      const maxY = window.innerHeight - elementRect.height;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      btnElement.style.position = "fixed";
      btnElement.style.left = newX + "px";
      btnElement.style.top = newY + "px";
      btnElement.style.bottom = "auto";
      btnElement.style.right = "auto";
    }
    function stopDrag(e) {
      if (dragTimeout) {
        clearTimeout(dragTimeout);
        dragTimeout = null;
      }
      if (isDragging) {
        isDragging = false;
        btnElement.style.transition = "";
        btnElement.classList.remove("dragging");
      }
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", drag);
      document.removeEventListener("touchend", stopDrag);
    }
  }

  function addWidgetStyles() {
    if (document.getElementById('shivai-widget-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'shivai-widget-styles';
    styles.textContent = `
      .shivai-trigger {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        cursor: move;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2147483647;
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

      .shivai-trigger.dragging {
        transform: scale(1.05);
        opacity: 0.8;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        transition: none !important;
      }

      .shivai-neon-pulse {
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

      @media (max-width: 768px) {
        .shivai-trigger {
          bottom: 16px;
          right: 16px;
          width: 60px;
          height: 60px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }
        
        .shivai-trigger svg {
          width: 26px;
          height: 26px;
        }
      }

      @media (max-width: 480px) {
        .shivai-trigger {
          bottom: 12px;
          right: 12px;
          width: 56px;
          height: 56px;
        }
        
        .shivai-trigger svg {
          width: 24px;
          height: 24px;
        }
      }

      .agent-selection-view {
        display: block;
        opacity: 1;
        transform: translateX(0);
        transition: all 0.3s ease-in-out;
        height: auto;
        overflow: visible;
      }

      .agent-selection-view.hide {
        opacity: 0;
        transform: translateX(-100%);
      }

      .agent-scroll-indicator {
        text-align: center;
        margin-top: 8px;
      }

      .agent-scroll-dots {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin-bottom: 4px;
      }

      .agent-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #d1d5db;
        transition: all 0.2s ease;
      }

      .agent-dot.active {
        background: #4a5568;
        transform: scale(1.2);
      }

      .agent-scroll-text {
        font-size: 10px;
        color: #9ca3af;
        font-weight: 500;
      }

      @media (min-width: 769px) {
        .agent-scroll-indicator {
          display: none !important;
        }
      }

      .agent-scroll-indicator {
        text-align: center;
        margin-top: 8px;
      }

      .agent-scroll-dots {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin-bottom: 4px;
      }

      .agent-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #d1d5db;
        transition: all 0.2s ease;
      }

      .agent-dot.active {
        background: #4a5568;
        transform: scale(1.2);
      }

      .agent-scroll-text {
        font-size: 10px;
        color: #9ca3af;
        font-weight: 500;
      }

      @media (min-width: 769px) {
        .agent-scroll-indicator {
          display: none !important;
        }
      }

      .agent-type-section {
        margin-bottom: 20px;
        flex-shrink: 0;
      }

      .section-label {
        display: block;
        margin-bottom: 12px;
        font-weight: 600;
        color: #374151;
        font-size: 15px;
      }

      .agent-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 20px;
      }

      @media (max-width: 768px) {
        .agent-options {
          display: flex;
          overflow-x: auto;
          gap: 12px;
          margin-bottom: 16px;
          padding: 0 4px 8px 4px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        
        .agent-options::-webkit-scrollbar {
          display: none;
        }
      }

      @media (max-width: 480px) {
        .agent-options {
          gap: 8px;
          margin-bottom: 12px;
          padding: 0 2px 6px 2px;
        }
      }

      .agent-option {
        padding: 14px 10px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
        text-align: center;
        min-height: 85px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        position: relative;
        -webkit-tap-highlight-color: transparent;
      }

      @media (max-width: 768px) {
        .agent-option {
          padding: 14px 10px;
          min-height: 95px;
          border-radius: 10px;
          min-width: 160px;
          max-width: 160px;
          flex-shrink: 0;
          scroll-snap-align: center;
        }
        
        .agent-icon {
          width: 30px;
          height: 30px;
        }
        
        .agent-name {
          font-size: 13px !important;
          font-weight: 600;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;
          text-align: center;
          width: 100%;
        }
        
        .agent-desc {
          font-size: 10.5px !important;
          line-height: 1.35;
          margin-top: 3px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      }

      @media (max-width: 480px) {
        .agent-option {
          padding: 12px 8px;
          min-height: 90px;
          border-radius: 9px;
          gap: 5px;
          min-width: 145px;
          max-width: 145px;
        }
        
        .agent-icon {
          width: 28px;
          height: 28px;
        }
        
        .agent-name {
          font-size: 12.5px !important;
          font-weight: 600;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;
          text-align: center;
          width: 100%;
        }
        
        .agent-desc {
          font-size: 10px !important;
          line-height: 1.3;
          margin-top: 2px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      }

      .agent-option:hover {
        border-color: #4a5568;
        background: #f7fafc;
      }

      .agent-option.selected {
        border-color: #4a5568;
        background: #edf2f7;
      }

      .agent-icon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 6px;
        color: #4a5568;
        transition: all 0.2s;
        flex-shrink: 0;
      }

      .agent-option.selected .agent-icon {
        color: #3b82f6;
        transform: scale(1.1);
      }

      .agent-name {
        font-size: 13px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 3px;
        line-height: 1.2;
      }

      .agent-desc {
        font-size: 10px;
        color: #6b7280;
        line-height: 1.3;
        text-align: center;
        margin: 0;
      }

      .agent-name {
        font-weight: 600;
        color: #374151;
        margin-bottom: 3px;
        font-size: 13px;
      }

      .agent-desc {
        font-size: 11px;
        color: #6b7280;
        line-height: 1.2;
      }

      .agent-gender-section {
        margin-bottom: 20px;
        flex-shrink: 0;
      }

      .gender-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 15px;
      }

      @media (max-width: 768px) {
        .gender-options {
          gap: 10px;
          margin-bottom: 12px;
        }
      }

      @media (max-width: 480px) {
        .gender-options {
          gap: 8px;
          margin-bottom: 10px;
        }
      }

      .gender-option {
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        min-height: 70px;
        justify-content: center;
      }

      @media (max-width: 768px) {
        .gender-option {
          padding: 10px 8px;
          min-height: 60px;
          border-radius: 8px;
          gap: 4px;
        }
      }

      @media (max-width: 480px) {
        .gender-option {
          padding: 8px 6px;
          min-height: 55px;
          border-radius: 6px;
          gap: 3px;
        }
      }

      .gender-icon {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 4px;
        color: #4a5568;
        transition: all 0.2s;
        flex-shrink: 0;
      }

      @media (max-width: 768px) {
        .gender-icon {
          width: 24px;
          height: 24px;
          margin-bottom: 3px;
        }
      }

      @media (max-width: 480px) {
        .gender-icon {
          width: 20px;
          height: 20px;
          margin-bottom: 2px;
        }
      }

      .gender-name {
        font-size: 13px;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.2;
      }

      @media (max-width: 768px) {
        .gender-name {
          font-size: 12px;
        }
      }

      @media (max-width: 480px) {
        .gender-name {
          font-size: 11px;
        }
      }

      .gender-option:hover {
        border-color: #4a5568;
        background: #f7fafc;
      }

      .gender-option.selected {
        border-color: #4a5568;
        background: #edf2f7;
        box-shadow: 0 4px 12px rgba(74, 85, 104, 0.15);
      }

      .gender-option.selected .gender-icon {
        color: #3b82f6;
        transform: scale(1.1);
      }

      .gender-option span {
        font-weight: 600;
        color: #374151;
        font-size: 13px;
      }

      @media (max-width: 768px) {
        .gender-option span {
          font-size: 12px;
        }
      }

      @media (max-width: 480px) {
        .gender-option span {
          font-size: 11px;
        }
      }

      .voice-desc {
        font-size: 11px;
        color: #6b7280;
      }

      .next-btn {
        width: 100%;
        padding: 12px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s;
      }

      .next-btn:enabled {
        background: #4a5568;
      }

      .next-btn:enabled:hover {
        background: #2d3748;
      }

      .next-btn:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      @media (max-width: 768px) {
        .modal-body {
          padding: 16px 14px;
        }
        
        .section-label {
          font-size: 15px;
          margin-bottom: 10px;
        }
        
        .next-btn {
          padding: 12px 20px;
          font-size: 14px;
        }
        
        .agent-scroll-indicator {
          display: block !important;
        }
      }

      @media (max-width: 480px) {
        .modal-body {
          padding: 12px 10px;
        }
        
        .section-label {
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .next-btn {
          padding: 12px 18px;
          font-size: 14px;
          border-radius: 8px;
        }
        
        .agent-name {
          font-size: 15px !important;
          font-weight: 600;
        }
        
        .agent-desc {
          font-size: 12px !important;
          line-height: 1.4;
          margin-top: 4px;
        }
      }

      .shivai-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0);
        z-index: 999999;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(0px);
        transition: all 0.3s ease-in-out;
        padding: 20px;
        box-sizing: border-box;
      }

      .shivai-modal-overlay.show {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
      }

      .shivai-widget-container {
        width: 95%;
        max-width: 420px;
        background: white;
        border-radius: 16px;
        overflow: visible;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        transform: scale(0.9);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        align-self: center;
        min-height: auto;
        height: auto;
        max-height: 85vh;
      }

      @media (max-width: 768px) {
        .shivai-modal-overlay {
          padding: 12px;
          align-items: flex-start;
          padding-top: 3vh;
        }
        
        .shivai-widget-container {
          width: 96%;
          max-width: 450px;
          border-radius: 12px;
          max-height: 90vh;
        }

        .shivai-modal-overlay.show {
          backdrop-filter: blur(4px);
        }
      }

      @media (max-width: 480px) {
        .shivai-modal-overlay {
          padding: 8px;
        }
        
        .shivai-widget-container {
          width: 98%;
          max-width: none;
          border-radius: 10px;
          max-height: 92vh;
        }
      }

      .shivai-widget-container.show {
        transform: scale(1);
        opacity: 1;
      }

      .modal-header {
        padding: 16px 20px;
        background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        color: #2d3748;
        border-bottom: 1px solid #e2e8f0;
        flex-shrink: 0;
        position: relative;
        display: flex;
        align-items: center;
      }

      @media (max-width: 768px) {
        .modal-header {
          padding: 14px 16px;
        }
      }

      @media (max-width: 480px) {
        .modal-header {
          padding: 12px 14px;
        }
      }

      .modal-body {
        padding: 24px 20px;
        overflow: visible;
        -webkit-overflow-scrolling: touch;
        position: relative;
      }

      .mobile-language-section {
        display: none;
        margin-bottom: 20px;
        position: relative;
        z-index: 100;
        overflow: visible;
      }

      .language-section-landing {
        position: relative;
        overflow: visible;
      }

      @media (max-width: 768px) {
        .modal-body {
          padding: 20px;
        }
      }

      @media (max-width: 480px) {
        .modal-body {
          padding: 18px 16px;
        }
      }

      .modal-close {
        position: absolute;
        top: 12px;
        right: 16px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: #2d3748;
        font-size: 18px;
        cursor: pointer;
        line-height: 1;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
        backdrop-filter: blur(4px);
      }

      .modal-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
      }

      @media (max-width: 480px) {
        .modal-close {
          top: 10px;
          right: 12px;
          width: 28px;
          height: 28px;
          font-size: 16px;
        }
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
      }
      .header-info{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 8px;
        padding: 4px;
      }

      .widget-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        padding: 6px;
        backdrop-filter: blur(10px);
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border: 1px solid #000;
      }

      .widget-avatar svg {
        fill: white;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        width: 24px;
        height: 24px;
      }

      .header-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .widget-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        line-height: 1.2;
      }

      .widget-subtitle {
        font-size: 11px;
        opacity: 0.85;
        line-height: 1.2;
        margin: 0;
      }

      @media (max-width: 480px) {
        .widget-title {
          font-size: 15px;
        }

        .widget-subtitle {
          font-size: 10.5px;
          line-height: 1.3;
        }
      }

      .modal-body {
        padding: 20px;
      }

      .language-section-landing {
        margin-bottom: 20px;
      }

      .language-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 20px;
      }

      .language-header .language-icon {
        font-size: 20px;
      }

      .language-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #374151;
      }

      .language-grid {
        display: block;
        margin-bottom: 20px;
      }

      .custom-dropdown {
        position: relative;
        width: 100%;
      }

      .dropdown-selected {
        width: 100%;
        padding: 16px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        background: white;
        font-size: 16px;
        color: #374151;
        font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiOne', sans-serif;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 52px;
        box-sizing: border-box;
        transition: all 0.2s ease;
      }

      .dropdown-selected:hover {
        border-color: #3b82f6;
      }

      .dropdown-selected.active {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .dropdown-arrow {
        font-size: 12px;
        transition: transform 0.2s ease;
        color: #6b7280;
      }

      .dropdown-selected.active .dropdown-arrow {
        transform: rotate(180deg);
      }

      .dropdown-options {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 2px solid #e5e7eb;
        border-top: none;
        border-radius: 0 0 8px 8px;
        max-height: 160px;
        overflow-y: auto;
        z-index: 999999;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .dropdown-options.show {
        display: block;
      }

      .dropdown-options.dropup {
        top: auto;
        bottom: 100%;
        border-top: 2px solid #e5e7eb;
        border-bottom: none;
        border-radius: 8px 8px 0 0;
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
      }

      .dropdown-option {
        padding: 12px 20px;
        font-size: 16px;
        color: #374151;
        cursor: pointer;
        transition: background-color 0.2s ease;
        font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiOne', sans-serif;
        border-bottom: 1px solid #f3f4f6;
      }

      .dropdown-option:last-child {
        border-bottom: none;
      }

      .dropdown-option:hover {
        background-color: #f8fafc;
      }

      .dropdown-option.selected {
        background-color: #eff6ff;
        color: #2563eb;
      }

      .language-scroll-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        padding: 10px 5px;
        max-height: 320px;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
      }
      
      .language-scroll-container::-webkit-scrollbar {
        width: 6px;
      }
      
      .language-scroll-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }
      
      .language-scroll-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
      }
      
      .language-scroll-container::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      /* Scroll indicators removed - using grid layout instead */

      .language-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        background: white;
        text-align: center;
        justify-content: center;
        height: 80px;
        width: 100%;
      }

      .language-option:hover {
        border-color: #4a5568;
        background: #f7fafc;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .language-option.selected {
        border-color: #4a5568;
        background: #edf2f7;
        box-shadow: 0 4px 12px rgba(74, 85, 104, 0.15);
      }

      .language-flag {
        font-size: 32px;
        margin-bottom: 8px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .language-code {
        font-size: 20px;
        font-weight: 400;
        color: #374151;
        margin-bottom: 4px;
        font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiOne', sans-serif;
        letter-spacing: 0;
        line-height: 1;
        text-align: center;
        display: block;
      }

      .language-name {
        font-size: 11px;
        font-weight: 600;
        color: #374151;
        line-height: 1.1;
      }

      @media (max-width: 768px) {
        .language-grid {
          display: none;
        }

        .mobile-language-section {
          display: block;
        }

        .language-scroll-container {
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 10px 6px;
          max-height: 280px;
          overflow-y: auto;
        }
        
        .language-option {
          padding: 14px 8px;
          height: 70px;
          border-radius: 8px;
        }
        
        .language-code {
          font-size: 16px;
          margin-bottom: 3px;
          font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiOne', sans-serif;
          line-height: 1;
          text-align: center;
          display: block;
        }
        
        .language-name {
          font-size: 9px;
        }
      }

      @media (max-width: 480px) {
        .language-scroll-container {
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          padding: 8px 4px;
          max-height: 250px;
          overflow-y: auto;
        }
        
        .language-option {
          padding: 12px 6px;
          height: 65px;
          border-radius: 6px;
        }
        
        .language-code {
          font-size: 14px;
          margin-bottom: 2px;
          font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiOne', sans-serif;
          line-height: 1;
          text-align: center;
          display: block;
        }
        
        .language-name {
          font-size: 8px;
          line-height: 1.1;
        }
        
        .scroll-indicator {
          margin-top: 6px;
          gap: 4px;
        }
        
        .scroll-arrow {
          width: 28px;
          height: 28px;
          font-size: 14px;
        }
        
        .call-view {
          max-height: 500px;
          padding: 12px 8px;
        }
        
        .control-btn-icon {
          width: 40px;
          height: 40px;
        }
        
        .call-timer {
          font-size: 13px;
          padding: 6px 10px;
        }
      }

      .start-call-btn {
        width: 100%;
        padding: 18px 20px;
        background: #4a5568;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 16px;
        transition: all 0.2s ease;
        letter-spacing: 0.25px;
        text-transform: none;
        box-shadow: 0 4px 12px rgba(74, 85, 104, 0.2);
      }

      .start-call-btn:hover:not(:disabled) {
        background: #2d3748;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(74, 85, 104, 0.3);
      }

      .start-call-btn:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(74, 85, 104, 0.2);
      }

      .start-call-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        opacity: 0.6;
        box-shadow: none;
      }

      @media (max-width: 768px) {
        .start-call-btn {
          padding: 16px 18px;
          font-size: 15px;
          border-radius: 10px;
          margin-bottom: 16px;
        }
      }

      @media (max-width: 480px) {
        .start-call-btn {
          padding: 14px 16px;
          font-size: 14px;
          border-radius: 8px;
          margin-bottom: 12px;
        }
      }

      .privacy-text {
        text-align: center;
        font-size: 12px;
        color: #666;
      }

      .modal-footer {
        padding: 12px;
        background: #f8f9fa;
        text-align: center;
      }

      .powered-by {
        font-size: 12px;
        color: #666;
      }

      .powered-by a {
        color: #4a5568;
        text-decoration: none;
        margin-left: 5px;
      }

      /* Mobile touch interaction improvements */
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      .agent-option, .gender-option, .language-option, button {
        -webkit-tap-highlight-color: rgba(0,0,0,0.1);
        -webkit-touch-callout: none;
      }

      /* Improved scrollbar styling for mobile */
      .messages-container::-webkit-scrollbar {
        width: 4px;
      }

      .messages-container::-webkit-scrollbar-track {
        background: transparent;
      }

      .messages-container::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.2);
        border-radius: 2px;
      }

      .language-scroll-container::-webkit-scrollbar {
        height: 4px;
      }

      .language-scroll-container::-webkit-scrollbar-track {
        background: transparent;
      }

      .language-scroll-container::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.2);
        border-radius: 2px;
      }

      /* Modal overlay improvements for mobile */

      .call-view {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: 600px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease-in-out;
      }

      .call-view.show {
        opacity: 1;
        transform: translateX(0);
      }

      .call-visualizer {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .call-header {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        background: #ffffff;
        border-bottom: 1px solid #e5e7eb;
        gap: 10px;
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

      .call-body {
        padding: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
        background: #ffffff;
      }

      .language-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 6px;
      }

      .language-label {
        font-size: 11px;
        font-weight: 400;
        color: #000;
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

      .messages-container {
        flex: 1;
        background: #f9fafb;
        border-radius: 12px;
        padding: 16px;
        overflow-y: auto;
        border: 1px solid #e5e7eb;
        margin-bottom: 16px;
        -webkit-overflow-scrolling: touch;
        height: 300px;
        max-height: 300px;
        min-height: 200px;
      }

      @media (max-width: 768px) {
        .messages-container {
          padding: 12px;
          border-radius: 8px;
          height: 280px;
          max-height: 280px;
          min-height: 180px;
        }
      }

      @media (max-width: 480px) {
        .messages-container {
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 10px;
          height: 250px;
          max-height: 250px;
          min-height: 150px;
        }
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        color: #6b7280;
      }

      .empty-state-icon {
        font-size: 32px;
        margin-bottom: 12px;
      }

      .empty-state-text {
        font-size: 14px;
        font-weight: 500;
      }

      .message-input-container {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 12px;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
      }

      @media (max-width: 768px) {
        .message-input-container {
          padding: 10px;
          gap: 10px;
          border-radius: 10px;
        }
      }

      @media (max-width: 480px) {
        .message-input-container {
          padding: 8px;
          gap: 8px;
          border-radius: 8px;
        }
      }

      .attach-btn {
        color: #ccc;
        cursor: not-allowed;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        opacity: 0.5;
      }

      .input-field-container {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        background: white;
        border-radius: 8px;
        border: 1px solid #e1e5ea;
        padding: 8px 16px;
        min-height: 30px;
        max-height: 120px;
        height: 36px;
      }

      .message-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-size: 12px;
        line-height: 20px;
        color: #111b21;
        font-family: inherit;
        padding: 4px 0;
      }

      .message-input::placeholder {
        color: #9ca3af;
      }

      .send-btn {
        background: #4a5568;
        color: white;
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;
      }

      .send-btn:hover {
        background: #2d3748;
      }

      .attachment-menu {
        position: absolute;
        bottom: 70px;
        left: 16px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 8px;
        display: none;
        z-index: 1000;
        min-width: 180px;
      }

      .attachment-option {
        display: flex;
        align-items: center;
        padding: 12px;
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.2s ease;
      }

      .attachment-option:hover {
        background: #f3f4f6;
      }

      .attachment-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        transition: all 0.2s;
      }

      .attachment-option span {
        font-size: 14px;
        color: #111b21;
        font-weight: 500;
      }

      .controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        padding: 12px;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
      }

      .call-timer {
        font-size: 16px;
        font-weight: 600;
        color: #4a5568;
        font-family: 'Courier New', monospace;
      }

      .control-btn-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .control-btn-icon.mute {
        background: #6b7280;
        color: white;
      }

      .control-btn-icon.mute:hover {
        background: #4b5563;
        transform: translateY(-2px);
      }

      .control-btn-icon.mute.muted {
        background: #ef4444;
      }

      .control-btn-icon.connect {
        background: #10b981;
        color: white;
      }

      .control-btn-icon.connect:hover {
        background: #059669;
        transform: translateY(-2px);
      }

      .control-btn-icon.connect.disconnecting {
        background: #ef4444;
      }

      .call-btn, .hangup-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        font-size: 18px;
        color: white;
      }

      .call-btn {
        background: linear-gradient(135deg, #10b981, #059669);
        animation: pulse-green 2s infinite;
      }

      .call-btn:hover {
        background: linear-gradient(135deg, #059669, #047857);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      }

      .hangup-btn {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        animation: pulse-red 2s infinite;
      }

      .hangup-btn:hover {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }

      @keyframes pulse-green {
        0% { box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15); }
        50% { box-shadow: 0 2px 16px rgba(16, 185, 129, 0.3); }
        100% { box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15); }
      }

      @keyframes pulse-red {
        0% { box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15); }
        50% { box-shadow: 0 2px 16px rgba(239, 68, 68, 0.3); }
        100% { box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15); }
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

      .widget-footer {
        padding: 8px;
        background-color: #f9fafb;
        border-top: 1px solid #e5e7eb;
      }

      .footer-text {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-size: 13px;
        color: #6b7280;
        flex-wrap: nowrap;
        line-height: 1;
      }

      .footer-logo-link {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .footer-logo {
        height: 20px;
        width: 20px;
        fill: #3b82f6;
        vertical-align: middle;
        line-height: 1;
        margin-left: 4px;
      }
    `;
    document.head.appendChild(styles);
  }

  function initWidget() {
    console.log('🚀 Initializing ShivAI Widget...');
    
    createWidgetUI();
    
    // Add event listeners
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          closeWidget();
        }
      });
    }

    // Close button
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeWidget);
    }

    // Language selection interactions
    const languageOptions = document.querySelectorAll('.language-option');
    const customDropdown = document.getElementById('custom-language-dropdown');
    const dropdownSelected = document.getElementById('dropdown-selected');
    const dropdownOptions = document.getElementById('dropdown-options');
    const dropdownOptionElements = document.querySelectorAll('.dropdown-option');
    const startCallBtn = document.getElementById('start-call-btn');
    
    let selectedLanguage = 'en-US'; // Default selection

    // Desktop language grid selection
    languageOptions.forEach(option => {
      option.addEventListener('click', () => {
        languageOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedLanguage = option.dataset.language;
        
        // Store selected language
        selectedLanguage = option.dataset.language || 'en-US';
        console.log('Selected language:', selectedLanguage);
      });
    });

    // Custom dropdown functionality
    if (customDropdown && dropdownSelected && dropdownOptions) {
      // Toggle dropdown
      dropdownSelected.addEventListener('click', () => {
        const isOpen = dropdownOptions.classList.contains('show');
        
        if (!isOpen) {
          // Get the modal body element to check bounds
          const modalBody = dropdownSelected.closest('.modal-body');
          const modalRect = modalBody ? modalBody.getBoundingClientRect() : null;
          const rect = dropdownSelected.getBoundingClientRect();
          
          // Calculate available space
          const spaceBelow = modalRect ? modalRect.bottom - rect.bottom : window.innerHeight - rect.bottom;
          const spaceAbove = modalRect ? rect.top - modalRect.top : rect.top;
          const dropdownHeight = 160; // max-height of dropdown
          
          // Show upward if not enough space below OR if we're in the bottom half
          if (spaceBelow < dropdownHeight || (modalRect && rect.bottom > modalRect.top + modalRect.height / 2)) {
            dropdownOptions.classList.add('dropup');
          } else {
            dropdownOptions.classList.remove('dropup');
          }
        }
        
        dropdownSelected.classList.toggle('active');
        dropdownOptions.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!customDropdown.contains(e.target)) {
          dropdownSelected.classList.remove('active');
          dropdownOptions.classList.remove('show');
          dropdownOptions.classList.remove('dropup');
        }
      });

      // Handle option selection
      dropdownOptionElements.forEach(option => {
        option.addEventListener('click', (e) => {
          const value = e.target.getAttribute('data-value');
          const text = e.target.textContent;
          
          // Update selected display
          dropdownSelected.querySelector('.selected-text').textContent = text;
          
          // Remove previous selection
          dropdownOptionElements.forEach(opt => opt.classList.remove('selected'));
          
          // Mark current as selected
          e.target.classList.add('selected');
          
          // Close dropdown
          dropdownSelected.classList.remove('active');
          dropdownOptions.classList.remove('show');
          dropdownOptions.classList.remove('dropup');
          
          // Store selected language
          selectedLanguage = value;
          console.log('Custom dropdown language selected:', selectedLanguage);
        });
      });
    }

    // Start call button
    if (startCallBtn) {
      startCallBtn.addEventListener('click', async () => {
        if (selectedLanguage) {
          console.log('Start call clicked with language:', selectedLanguage);
          showCallView();
          await startCall();
        }
      });
    }

    // Agent selection interactions
    const agentOptions = document.querySelectorAll('.agent-option');
    const genderOptions = document.querySelectorAll('.gender-option');
    const agentNextBtn = document.getElementById('agent-next-btn');
    
    let selectedAgent = null;
    let selectedGender = null;

    agentOptions.forEach(option => {
      option.addEventListener('click', () => {
        agentOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedAgent = option.dataset.agent;
        updateNextButton();
      });
    });

    genderOptions.forEach(option => {
      option.addEventListener('click', () => {
        genderOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedGender = option.dataset.gender;
        updateNextButton();
      });
    });

    function updateNextButton() {
      if (selectedAgent && selectedGender) {
        agentNextBtn.disabled = false;
      } else {
        agentNextBtn.disabled = true;
      }
    }

    if (agentNextBtn) {
      agentNextBtn.addEventListener('click', () => {
        showLanguageView();
      });
    }

    // Language back button
    const languageBackBtn = document.getElementById('language-back-btn');
    if (languageBackBtn) {
      languageBackBtn.addEventListener('click', () => {
        showAgentSelectionView();
      });
    }

    // Back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        showLandingView();
      });
    }

    // Note: Using dedicated call-btn and hangup-btn for better UX

    // Call button - starts the call
    const callBtn = document.getElementById('shivai-call-btn');
    if (callBtn) {
      callBtn.addEventListener('click', async () => {
        console.log('📞 Call button clicked');
        
        // Disable button during connection attempt
        callBtn.disabled = true;
        callBtn.style.opacity = '0.6';
        
        try {
          await startCall();
        } catch (error) {
          // Re-enable button if call fails
          callBtn.disabled = false;
          callBtn.style.opacity = '1';
          console.error('Call failed:', error);
        }
      });
    }

    // Hangup button - ends the call
    const hangupBtn = document.getElementById('shivai-hangup-btn');
    if (hangupBtn) {
      hangupBtn.addEventListener('click', () => {
        console.log('🔚 Hangup button clicked');
        endCall('User hung up');
        
        // Update button visibility and timer
        hangupBtn.style.display = 'none';
        const callBtn = document.getElementById('shivai-call-btn');
        const muteBtn = document.getElementById('shivai-mute');
        const callTimer = document.getElementById('call-timer');
        
        if (callBtn) callBtn.style.display = 'flex';
        if (muteBtn) muteBtn.style.display = 'none';
        if (callTimer) callTimer.style.display = 'none';
        
        stopCallTimer();
      });
    }

    // Mute button
    const muteBtn = document.getElementById('shivai-mute');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        muteBtn.classList.toggle('muted');
        console.log('Mute toggled');
      });
    }

    // Language grid layout - no scroll functionality needed

    // Agent scroll functionality for mobile
    const agentContainer = document.querySelector('.agent-options');
    const agentDots = document.querySelectorAll('.agent-dot');
    
    if (agentContainer && window.innerWidth <= 768) {
      let agentScrollPosition = 0;
      
      agentContainer.addEventListener('scroll', () => {
        const maxScroll = agentContainer.scrollWidth - agentContainer.clientWidth;
        const scrollProgress = maxScroll > 0 ? agentContainer.scrollLeft / maxScroll : 0;
        
        // Update dots based on scroll progress
        agentDots.forEach((dot, index) => {
          const progress = index / Math.max(agentDots.length - 1, 1);
          dot.classList.toggle('active', Math.abs(scrollProgress - progress) < 0.4);
        });
      });
      
      // Show scroll indicator on mobile
      const agentScrollIndicator = document.querySelector('.agent-scroll-indicator');
      if (agentScrollIndicator) {
        agentScrollIndicator.style.display = 'block';
      }
    }
    
    // Setup message handling
    setupMessageHandling();
  }
  
  function setupMessageHandling() {
    // Get message elements
    messagesDiv = document.getElementById('shivai-messages');
    messageInputContainer = document.querySelector('.message-input-container');
    
    const messageInput = document.getElementById('shivai-message-input');
    const sendBtn = document.getElementById('shivai-send-btn');
    
    if (messageInput && sendBtn) {
      // Show/hide send button based on input
      messageInput.addEventListener('input', () => {
        const hasText = messageInput.value.trim().length > 0;
        sendBtn.style.display = hasText ? 'flex' : 'none';
      });
      
      // Send message on Enter key
      messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
      
      // Send message on button click
      sendBtn.addEventListener('click', sendMessage);
    }
    
    console.log('📱 Message handling setup complete');
  }

  // Comprehensive view state management
  function hideAllViews() {
    if (agentSelectionView) {
      agentSelectionView.style.display = 'none';
      agentSelectionView.classList.add('hide');
    }
    if (landingView) {
      landingView.style.display = 'none';
      landingView.classList.add('hide');
    }
    if (callView) {
      callView.style.display = 'none';
      callView.classList.remove('show');
    }
    stopCallTimer();
  }

  function showAgentSelectionView() {
    hideAllViews();
    if (agentSelectionView) {
      agentSelectionView.style.display = 'block';
      agentSelectionView.classList.remove('hide');
    }
  }

  function showLanguageView() {
    hideAllViews();
    if (landingView) {
      landingView.style.display = 'block';
      landingView.classList.remove('hide');
    }
  }

  function showCallView() {
    hideAllViews();
    if (callView) {
      callView.style.display = 'block';
      requestAnimationFrame(() => {
        callView.classList.add('show');
      });
      startCallTimer();
    }
  }

  function showLandingView() {
    hideAllViews();
    if (landingView) {
      landingView.style.display = 'block';
      landingView.classList.remove('hide');
    }
  }

  function openWidget() {
    if (modalOverlay) {
      // Hide trigger button
      if (triggerButton) {
        triggerButton.style.display = "none";
      }
      
      modalOverlay.style.display = 'flex';
      // Trigger animation
      requestAnimationFrame(() => {
        modalOverlay.classList.add('show');
        widgetContainer.classList.add('show');
      });
      isWidgetOpen = true;
    }
  }

  function closeWidget() {
    // Disconnect any active call when closing widget
    if (isConnected || isConnecting) {
      console.log('🔚 Disconnecting call due to widget close');
      endCall('Widget closed');
      
      // Reset call button states
      const callBtn = document.getElementById('shivai-call-btn');
      const hangupBtn = document.getElementById('shivai-hangup-btn');
      const muteBtn = document.getElementById('shivai-mute');
      const callTimer = document.getElementById('call-timer');
      
      if (callBtn) callBtn.style.display = 'flex';
      if (hangupBtn) hangupBtn.style.display = 'none';
      if (muteBtn) muteBtn.style.display = 'none';
      if (callTimer) callTimer.style.display = 'none';
    }

    if (modalOverlay) {
      modalOverlay.classList.remove('show');
      widgetContainer.classList.remove('show');
      
      setTimeout(() => {
        modalOverlay.style.display = 'none';
        showAgentSelectionView(); // Reset to agent selection view when closed
        
        // Show trigger button again
        if (triggerButton) {
          triggerButton.style.display = "flex";
        }
      }, 300);
      
      isWidgetOpen = false;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    // DOM is already loaded, run immediately
    setTimeout(initWidget, 0);
  }

  // Call timer functionality
  let callStartTime = null;
  let callTimerInterval = null;

  function startCallTimer() {
    callStartTime = Date.now();
    callTimerInterval = setInterval(updateCallTimer, 1000);
  }

  function stopCallTimer() {
    if (callTimerInterval) {
      clearInterval(callTimerInterval);
      callTimerInterval = null;
    }
    const timerElement = document.getElementById('call-timer');
    if (timerElement) {
      timerElement.textContent = '00:00';
    }
  }

  function updateCallTimer() {
    if (!callStartTime) return;
    
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timerElement = document.getElementById('call-timer');
    if (timerElement) {
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  // Chat message handling functions
  function addMessage(role, text, options = {}) {
    console.log('🔍 addMessage called:', { role, text, options });
    
    if (!messagesDiv) {
      messagesDiv = document.getElementById('shivai-messages');
    }
    
    if (!messagesDiv) {
      console.warn('Messages container not found');
      return;
    }

    // Remove empty state if it exists
    const emptyState = messagesDiv.querySelector('.empty-state');
    if (emptyState) {
      emptyState.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const labelDiv = document.createElement('div');
    labelDiv.className = 'message-label';
    labelDiv.textContent = role === 'user' ? 'You' : 'AI Employee';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;
    
    messageDiv.appendChild(labelDiv);
    messageDiv.appendChild(textDiv);
    messagesDiv.appendChild(messageDiv);
    
    // Auto-scroll to latest message
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    return messageDiv;
  }

  function updateMessage(messageDiv, text) {
    const textDiv = messageDiv.querySelector('.message-text');
    if (textDiv) {
      textDiv.textContent = text;
    }
  }

  // Call functionality
  async function startCall() {
    if (isConnecting || isConnected) {
      console.log('Call already in progress or connecting');
      return;
    }
    
    try {
      isConnecting = true;
      updateCallStatus('Connecting...', 'connecting');
      
      // Set connection timeout
      connectionTimeout = setTimeout(() => {
        if (isConnecting) {
          console.error('❌ Connection timeout');
          endCall('Connection timeout');
        }
      }, CONNECTION_TIMEOUT);
      
      // Request microphone permission
      console.log('🎤 Requesting microphone permission...');
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API not available. Please use a modern browser with HTTPS.');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
          channelCount: 1,
          sampleRate: 48000
        }
      });
      
      console.log('✅ Microphone permission granted');
      
      // Get LiveKit token
      const callId = `call_${Date.now()}`;
      window.currentCallId = callId;
      
      console.log('🔄 Getting LiveKit token...');
      const response = await fetch('https://python.service.callshivai.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: '6937bff1222bfd06ebdf0194',
          language: selectedLanguage,
          call_id: callId,
          device: deviceType,
          user_agent: navigator.userAgent
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get LiveKit token: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ LiveKit token received');
      
      // Clear connection timeout
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
        connectionTimeout = null;
      }
      
      // Connect to LiveKit room
      if (typeof LivekitClient === 'undefined') {
        await loadLiveKitSDK();
      }
      
      room = new LivekitClient.Room({
        adaptiveStream: true,
        dynacast: true,
        audioCaptureDefaults: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      // Set up room event listeners
      setupRoomEvents();
      
      // Connect to room
      await room.connect(data.url, data.token);
      
      // Publish audio track
      localAudioTrack = await LivekitClient.createLocalAudioTrack({
        source: LivekitClient.Track.Source.Microphone
      });
      
      await room.localParticipant.publishTrack(localAudioTrack);
      
      isConnected = true;
      isConnecting = false;
      updateCallStatus('Connected', 'connected');
      
      // Update button visibility when call is actually connected
      const callBtn = document.getElementById('shivai-call-btn');
      const hangupBtn = document.getElementById('shivai-hangup-btn');
      const muteBtn = document.getElementById('shivai-mute');
      const callTimer = document.getElementById('call-timer');
      
      if (callBtn) callBtn.style.display = 'none';
      if (hangupBtn) hangupBtn.style.display = 'flex';
      if (muteBtn) muteBtn.style.display = 'flex';
      if (callTimer) callTimer.style.display = 'block';
      
      startCallTimer();
      
      console.log('✅ Call connected successfully');
      
    } catch (error) {
      console.error('❌ Call connection failed:', error);
      endCall(error.message);
    }
  }
  
  function setupRoomEvents() {
    if (!room) return;
    
    room.on('participantConnected', (participant) => {
      console.log('👤 Participant connected:', participant.identity);
    });
    
    room.on('trackSubscribed', (track, publication, participant) => {
      if (track.kind === 'audio') {
        console.log('🔊 Audio track received');
        track.attach();
      }
    });

    // Register handler for transcription streams
    room.registerTextStreamHandler(
      "lk.transcription",
      async (reader, participantInfo) => {
        console.log("🎯 Transcription stream from:", participantInfo.identity);
        try {
          const text = await reader.readAll();
          const isUser = participantInfo.identity === room.localParticipant?.identity;
          
          if (text && text.trim()) {
            const senderName = isUser ? "user" : "assistant";
            console.log(`📝 [${senderName.toUpperCase()}]:`, text);
            
            // Don't add empty or very short messages
            if (text.length < 3) {
              console.log("🚫 Skipping very short message:", text);
              return;
            }
            
            // Add transcriptions
            addMessage(senderName, text);
            console.log("✅ Transcription added:", {
              sender: senderName,
              text,
            });
          }
        } catch (error) {
          console.error("❌ Error processing transcription stream:", error);
        }
      }
    );

    // Register handler for chat messages - THIS IS KEY FOR AI RESPONSES
    room.registerTextStreamHandler(
      "lk.chat",
      async (reader, participantInfo) => {
        console.log("💬 Chat stream from:", participantInfo.identity);
        try {
          const text = await reader.readAll();
          const isUser = participantInfo.identity === room.localParticipant?.identity;

          if (!isUser && text && text.trim()) {
            console.log("💬 AI Chat response received:", text);
            addMessage("assistant", text, { source: "chat" });
            console.log("💬 Chat message added:", {
              sender: participantInfo.identity,
              text,
            });
          }
        } catch (error) {
          console.error("❌ Error processing chat stream:", error);
        }
      }
    );

    // Register handler for general data messages
    room.registerTextStreamHandler(
      "lk.data",
      async (reader, participantInfo) => {
        console.log("📊 Data stream from:", participantInfo.identity);
        try {
          const text = await reader.readAll();
          const isUser = participantInfo.identity === room.localParticipant?.identity;
          
          if (text && text.trim()) {
            // Try to parse as JSON first
            try {
              const jsonData = JSON.parse(text);
              
              // Handle different JSON message types
              if (jsonData.type === "transcript" && jsonData.text) {
                const role = jsonData.role === "user" ? "user" : "assistant";
                addMessage(role, jsonData.text);
                console.log("✅ Added JSON transcript:", jsonData);
                return;
              }
              
              if (jsonData.text && !isUser) {
                addMessage("assistant", jsonData.text);
                console.log("✅ Added JSON message:", jsonData);
                return;
              }
              
            } catch (e) {
              // Not JSON, treat as plain text
              if (!isUser && text.length > 3) {
                addMessage("assistant", text);
                console.log("✅ Added plain text message:", text);
              }
            }
          }
        } catch (error) {
          console.error("❌ Error processing data stream:", error);
        }
      }
    );
    
    room.on('dataReceived', (payload, participant) => {
      try {
        const decoder = new TextDecoder();
        const message = JSON.parse(decoder.decode(payload));
        
        if (message.type === 'transcript') {
          if (message.role === 'assistant') {
            addMessage('assistant', message.text);
          }
        }
      } catch (error) {
        console.error('Error processing received data:', error);
      }
    });
    
    room.on('disconnected', () => {
      console.log('🔌 Room disconnected');
      endCall();
    });
    
    room.on('reconnecting', () => {
      console.log('🔄 Reconnecting...');
      updateCallStatus('Reconnecting...', 'connecting');
    });
    
    room.on('reconnected', () => {
      console.log('✅ Reconnected');
      updateCallStatus('Connected', 'connected');
    });
  }
  
  function endCall(reason = 'Call ended') {
    console.log('🔚 Ending call:', reason);
    
    isConnecting = false;
    isConnected = false;
    
    // Clear timeout
    if (connectionTimeout) {
      clearTimeout(connectionTimeout);
      connectionTimeout = null;
    }
    
    // Clean up room
    if (room) {
      room.disconnect();
      room = null;
    }
    
    // Clean up audio track
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack = null;
    }
    
    updateCallStatus('Call ended', 'disconnected');
    stopCallTimer();
    
    // Reset button states
    const callBtn = document.getElementById('shivai-call-btn');
    const hangupBtn = document.getElementById('shivai-hangup-btn');
    const muteBtn = document.getElementById('shivai-mute');
    const callTimer = document.getElementById('call-timer');
    
    if (callBtn) {
      callBtn.style.display = 'flex';
      callBtn.disabled = false;
      callBtn.style.opacity = '1';
    }
    if (hangupBtn) hangupBtn.style.display = 'none';
    if (muteBtn) {
      muteBtn.style.display = 'none';
      muteBtn.classList.remove('muted');
    }
    if (callTimer) callTimer.style.display = 'none';
    
    // Reset connect button
    const connectBtn = document.getElementById('shivai-connect');
    if (connectBtn) {
      connectBtn.classList.remove('disconnecting');
      connectBtn.title = 'Start Call';
    }
  }
  
  function updateCallStatus(message, state) {
    console.log(`📞 Call status: ${message} (${state})`);
    
    // Update status in UI
    const statusElement = document.getElementById('shivai-status');
    if (statusElement) {
      const statusText = statusElement.querySelector('.status-text');
      if (statusText) {
        statusText.textContent = message;
      }
    }
    
    // Add status message to chat
    if (state === 'connected') {
      addMessage('assistant', 'Hello! I\'m your AI assistant. How can I help you today?');
    } else if (state === 'disconnected' && message !== 'Call ended') {
      addMessage('assistant', `Connection issue: ${message}`);
    }
  }
  
  async function loadLiveKitSDK() {
    return new Promise((resolve, reject) => {
      if (typeof LivekitClient !== 'undefined') {
        console.log('✅ LiveKit already loaded');
        resolve();
        return;
      }
      
      console.log('📦 Loading LiveKit SDK...');
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/livekit-client@latest/dist/livekit-client.umd.js';
      script.onload = () => {
        console.log('✅ LiveKit client loaded successfully');
        resolve();
      };
      script.onerror = () => {
        console.error('❌ Failed to load LiveKit client');
        reject(new Error('Failed to load LiveKit client'));
      };
      document.head.appendChild(script);
    });
  }

  // Message sending functionality
  function sendMessage() {
    const messageInput = document.getElementById('shivai-message-input');
    if (!messageInput) return;

    const message = messageInput.value.trim();

    if (message) {
      console.log('📤 Sending message:', message);
      
      // Add message to UI immediately
      addMessage('user', message, { source: 'typed' });
      
      // Track this message to prevent duplicates
      lastSentMessage = message;
      
      // Clear input
      messageInput.value = '';
      
      // Hide send button
      const sendBtn = document.getElementById('shivai-send-btn');
      if (sendBtn) {
        sendBtn.style.display = 'none';
      }
      
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const responses = [
          'Hello! How can I help you today?',
          'I understand. Let me assist you with that.',
          'That is a great question. Here is what I can tell you...',
          'Thank you for reaching out. I am here to help.',
          'I would be happy to provide more information about that.'
        ];
      }, 1000 + Math.random() * 2000);

      
      // Send message through LiveKit if connected
      if (room && isConnected) {
        try {
          const chatMessage = {
            type: 'chat',
            text: message,
            timestamp: Date.now(),
            source: 'typed'
          };
          const encoder = new TextEncoder();
          const data = encoder.encode(JSON.stringify(chatMessage));
          
          room.localParticipant.publishData(data, {
            reliable: true,
            destinationIdentities: []
          });
          
          console.log('💬 Message sent via LiveKit:', message);
        } catch (error) {
          console.error('❌ Failed to send message via LiveKit:', error);
          // Fallback to simulated response
          setTimeout(() => {
            const responses = [
              'I understand your message. Let me help you with that.',
              'Thank you for your message. How else can I assist?'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage('assistant', randomResponse);
          }, 1000);
        }
      } else {
        // Simulate AI response when not connected
        setTimeout(() => {
          const responses = [
            'Hello! How can I help you today?',
            'I understand. Let me assist you with that.',
            'That is a great question. Here is what I can tell you...',
            'Thank you for reaching out. I am here to help.',
            'I would be happy to provide more information about that.'
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage('assistant', randomResponse);
        }, 1000 + Math.random() * 2000);
      }
      
      console.log('💬 Message processed:', message);
    }
  }

  // Add transcript message function for compatibility
  function addTranscriptMessage(type, text, time) {
    // Convert to standard message format and add to chat
    const role = type === 'ai' ? 'assistant' : 'user';
    addMessage(role, text);
  }

  function getCurrentTime() {
    if (!callStartTime) return '00:00';
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  window.openShivAIWidget = openWidget;
  window.addTranscriptMessage = addTranscriptMessage;
})()
