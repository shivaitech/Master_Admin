// Clean version of widget2.js with basic modal widget functionality

(function() {
  'use strict';

  // Widget state variables
  let isWidgetOpen = false;
  let modalOverlay = null;
  let widgetContainer = null;
  let modalContent = null;
  let landingView = null;
  let callView = null;

  // Widget configuration
  const config = {
    widgetId: 'shivai-widget-trigger',
    position: 'bottom-right'
  };

  function createWidgetUI() {
    console.log('🎨 Creating widget UI...');
    
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
    
    // Create landing view
    landingView = document.createElement("div");
    landingView.className = "landing-view";
    landingView.innerHTML = `
      <div class="modal-header">
        <div class="header-content">
          <button class="modal-close" aria-label="Close modal">×</button>
          <div class="header-info">
            <div class="widget-avatar">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1500" style="height: 60px; width: 60px;">
                <path d="m404.66,608.33c-9.95-7.3-50.21-35.08-105.88-29.33-26.64,2.75-47.74,12.25-62.31,21.06-14.39,8.7-26.96,20.35-35.39,34.9-12.13,20.93-15.94,45.25-9.6,67.8,4.02,14.28,11.39,25.29,18.63,33.3,6.91,7.65,15.23,13.89,24.25,18.89,25.77,14.32,51.54,28.63,77.31,42.95,11.98,7.56,18.69,20.94,17.17,34.34-.11,1.01-.27,1.98-.47,2.93-2.85,13.83-15.4,23.46-29.5,24.28-8.62.5-18.56.28-29.41-1.45-34.59-5.51-58.34-23.08-69.39-32.54-13.35,21.1-26.71,42.2-40.06,63.3,13.96,9.75,32.81,20.78,56.52,29.33,42.03,15.17,79.38,15.38,102.3,13.59,7.85-.92,45.14-6.13,72.25-39.35,1.28-1.57,2.49-3.15,3.65-4.73,27.87-38.33,23.14-92-9.89-125.97-.3-.31-.6-.62-.91-.93-17.09-17.27-35.69-27.61-51.02-33.85-19.44-7.9-38.05-17.71-55.07-29.99-.78-.56-1.56-1.12-2.33-1.68-9.66-6.97-12.29-20.21-6.03-30.34h0c7.3-11.68,22.31-17.66,37.92-15.02,8.22-.53,21.33-.36,36.48,4.29,15.34,4.71,26.38,12.07,32.91,17.17,9.3-20.98,18.6-41.97,27.9-62.95Z"/>
              </svg>
            </div>
            <div class="header-text">
              <div class="widget-title">AI Employee</div>
              <div class="widget-subtitle">ShivAI offers 24/7 voice support to handle your business calls efficiently and professionally.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="language-section-landing">
          <label class="language-label-landing">Choose your preferred language:</label>
          <select id="shivai-language-landing" class="language-select-landing">
            <option value="en-US">🇺🇸 English (US)</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="fr">🇫🇷 French</option>
            <option value="de">🇩🇪 German</option>
            <option value="it">🇮🇹 Italian</option>
          </select>
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
        <div class="powered-by">
          <span>Powered by</span>
          <a href="https://callshivai.com" target="_blank">ShivAI</a>
        </div>
      </div>
    `;
    
    // Create call view
    callView = document.createElement("div");
    callView.className = "call-view";
    callView.style.display = "none";
    callView.innerHTML = `<div class="call-content">Call interface content will go here</div>`;

    // Assemble the modal
    modalContent.appendChild(landingView);
    modalContent.appendChild(callView);
    widgetContainer.appendChild(modalContent);
    modalOverlay.appendChild(widgetContainer);

    // Add styles and append to document
    addWidgetStyles();
    document.body.appendChild(modalOverlay);
  }

  function addWidgetStyles() {
    if (document.getElementById('shivai-widget-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'shivai-widget-styles';
    styles.textContent = `
      .shivai-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999999;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
      }

      .shivai-widget-container {
        width: 90%;
        max-width: 400px;
        max-height: 90vh;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      }

      .modal-header {
        padding: 20px;
        background: linear-gradient(135deg, #3b82f6, #1e40af);
        color: white;
      }

      .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .widget-avatar svg {
        fill: white;
      }

      .widget-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .widget-subtitle {
        font-size: 14px;
        opacity: 0.9;
      }

      .modal-body {
        padding: 30px;
      }

      .language-section-landing {
        margin-bottom: 20px;
      }

      .language-label-landing {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .language-select-landing {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
      }

      .start-call-btn {
        width: 100%;
        padding: 15px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 15px;
      }

      .start-call-btn:hover {
        background: #2563eb;
      }

      .privacy-text {
        text-align: center;
        font-size: 12px;
        color: #666;
      }

      .modal-footer {
        padding: 15px;
        background: #f8f9fa;
        text-align: center;
      }

      .powered-by {
        font-size: 12px;
        color: #666;
      }

      .powered-by a {
        color: #3b82f6;
        text-decoration: none;
        margin-left: 5px;
      }

      .call-view {
        display: none;
      }

      .call-content {
        padding: 40px;
        text-align: center;
        color: #666;
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

    // Start call button
    const startCallBtn = document.getElementById('start-call-btn');
    if (startCallBtn) {
      startCallBtn.addEventListener('click', () => {
        console.log('Start call clicked');
        showCallView();
      });
    }
  }

  function showCallView() {
    if (landingView) landingView.style.display = 'none';
    if (callView) callView.style.display = 'block';
  }

  function showLandingView() {
    if (callView) callView.style.display = 'none';
    if (landingView) landingView.style.display = 'block';
  }

  function openWidget() {
    if (modalOverlay) {
      modalOverlay.style.display = 'flex';
      isWidgetOpen = true;
    }
  }

  function closeWidget() {
    if (modalOverlay) {
      modalOverlay.style.display = 'none';
      isWidgetOpen = false;
      showLandingView(); // Reset to landing view when closed
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  // Expose global function for opening widget
  window.openShivAIWidget = openWidget;
})();