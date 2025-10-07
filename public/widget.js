/**
 * ShivAI Widget Loader Script
 * Embeddable widget for client websites
 * This script loads and mounts the React widget component
 */

(function() {
  'use strict';

  // Prevent multiple widget instances
  if (window.ShivAIWidget) {
    return;
  }

  // Default configuration
  const DEFAULT_CONFIG = {
    clientId: '',
    apiEndpoint: 'https://api.shivai.com',
    theme: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      accentColor: '#3b82f6',
      borderRadius: '12px',
      fontFamily: 'Inter, sans-serif',
      shadowLevel: 'medium'
    },
    features: {
      chatEnabled: true,
      voiceEnabled: true,
      showPrivacyPolicy: true,
      showBranding: false,
      autoGreeting: true,
      soundEffects: true
    },
    ui: {
      position: 'bottom-right',
      buttonSize: 'medium',
      animationSpeed: 'normal',
      chatHeight: '400px',
      chatWidth: '350px'
    },
    content: {
      welcomeMessage: 'Hi! How can I help you today?',
      placeholderText: 'Type your message...',
      voiceGreeting: 'Hello! I\'m your AI assistant. How can I help?',
      privacyPolicyUrl: 'https://shivai.com/privacy'
    }
  };

  // Utility functions
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
      if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key.startsWith('data-') || key === 'id' || key === 'class') {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });
    
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
    
    return element;
  }

  function createIcon(name, size = 16) {
    const icons = {
      'message-circle': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
      'phone': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      'mic': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
      'send': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>`,
      'x': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      'minimize': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`,
      'volume-2': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
      'volume-x': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`,
      'user': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      'bot': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`
    };
    
    const iconSvg = icons[name] || icons['message-circle'];
    const div = document.createElement('div');
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Client-ID': this.clientId
          },
          body: JSON.stringify({
            message,
            conversationId,
            timestamp: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.response || 'Sorry, I couldn\'t process your request right now.';
      } catch (error) {
        console.error('ShivAI API Error:', error);
        return 'Sorry, I\'m having trouble connecting right now. Please try again later.';
      }
    }

    async processVoice(transcript, conversationId = null) {
      try {
        const response = await fetch(`${this.baseURL}/voice`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Client-ID': this.clientId
          },
          body: JSON.stringify({
            transcript,
            conversationId,
            timestamp: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error(`Voice API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.response || 'Sorry, I couldn\'t process your voice message right now.';
      } catch (error) {
        console.error('ShivAI Voice API Error:', error);
        return 'Sorry, I\'m having trouble with voice processing right now. Please try typing your message.';
      }
    }
  }

  // Widget class
  class ShivAIWidget {
    constructor(config) {
      this.config = mergeDeep({}, DEFAULT_CONFIG, config);
      this.api = new ShivAIAPI(this.config);
      this.isOpen = false;
      this.currentMode = 'chat';
      this.messages = [];
      this.isRecording = false;
      this.isLoading = false;
      this.hasGreeted = false;
      this.isMuted = false;
      this.conversationId = this.generateId();
      
      this.recognition = null;
      this.synthesis = window.speechSynthesis;
      
      this.init();
    }

    generateId() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    init() {
      this.injectStyles();
      this.createWidget();
      this.initSpeechRecognition();
      this.bindEvents();
    }

    injectStyles() {
      if (document.getElementById('shivai-widget-styles')) return;

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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .shivai-widget-button:hover {
          transform: scale(1.05);
        }
        
        .shivai-widget-button:active {
          transform: scale(0.95);
        }
        
        .shivai-widget-chat {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: ${this.config.theme.borderRadius};
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        
        .shivai-widget-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          max-height: calc(${this.config.ui.chatHeight} - 140px);
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
        
        @media (max-width: 768px) {
          .shivai-widget-chat {
            width: calc(100vw - 32px) !important;
            max-width: 350px;
            height: calc(100vh - 100px) !important;
            max-height: 500px;
          }
        }
      `;

      const styleSheet = createElement('style', { 
        id: 'shivai-widget-styles',
        type: 'text/css'
      }, [styles]);
      
      document.head.appendChild(styleSheet);
    }

    createWidget() {
      this.container = createElement('div', {
        id: 'shivai-widget-container',
        class: 'shivai-widget',
        style: {
          position: 'fixed',
          zIndex: '9999',
          ...this.getPositionStyles()
        }
      });

      this.createTriggerButton();
      this.createChatInterface();
      
      document.body.appendChild(this.container);
    }

    getPositionStyles() {
      const positions = {
        'bottom-right': { bottom: '20px', right: '20px' },
        'bottom-left': { bottom: '20px', left: '20px' },
        'top-right': { top: '20px', right: '20px' },
        'top-left': { top: '20px', left: '20px' }
      };
      return positions[this.config.ui.position] || positions['bottom-right'];
    }

    createTriggerButton() {
      const size = this.config.ui.buttonSize === 'small' ? '48px' : 
                   this.config.ui.buttonSize === 'large' ? '64px' : '56px';

      this.triggerButton = createElement('button', {
        class: 'shivai-widget-button',
        style: {
          width: size,
          height: size,
          borderRadius: this.config.theme.borderRadius,
          backgroundColor: this.config.theme.primaryColor,
          color: this.config.theme.secondaryColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
      }, [createIcon('message-circle', 24)]);

      this.container.appendChild(this.triggerButton);
    }

    createChatInterface() {
      this.chatInterface = createElement('div', {
        class: 'shivai-widget-chat',
        style: {
          width: this.config.ui.chatWidth,
          height: this.config.ui.chatHeight,
          display: 'none'
        }
      });

      this.createHeader();
      this.createBody();
      this.createFooter();
      
      this.container.appendChild(this.chatInterface);
    }

    createHeader() {
      this.header = createElement('div', {
        style: {
          backgroundColor: this.config.theme.primaryColor,
          color: this.config.theme.secondaryColor,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }
      });

      const leftSide = createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '12px' }
      });

      const avatar = createElement('div', {
        style: {
          width: '32px',
          height: '32px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: this.config.theme.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, [createIcon(this.currentMode === 'chat' ? 'message-circle' : 'phone', 16)]);

      const info = createElement('div');
      info.appendChild(createElement('div', { 
        style: { fontWeight: '500', fontSize: '14px' } 
      }, ['AI Assistant']));
      info.appendChild(createElement('div', { 
        style: { fontSize: '12px', opacity: '0.8' } 
      }, ['Online']));

      leftSide.appendChild(avatar);
      leftSide.appendChild(info);

      const rightSide = createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '4px' }
      });

      if (this.config.features.voiceEnabled) {
        this.modeToggle = createElement('button', {
          class: 'shivai-widget-button',
          style: {
            padding: '8px',
            backgroundColor: 'transparent',
            color: 'inherit',
            borderRadius: this.config.theme.borderRadius,
            opacity: '0.8'
          }
        }, [createIcon(this.currentMode === 'chat' ? 'phone' : 'message-circle', 16)]);
        
        rightSide.appendChild(this.modeToggle);
      }

      if (this.config.features.voiceEnabled) {
        this.muteToggle = createElement('button', {
          class: 'shivai-widget-button',
          style: {
            padding: '8px',
            backgroundColor: 'transparent',
            color: 'inherit',
            borderRadius: this.config.theme.borderRadius,
            opacity: '0.8',
            display: this.currentMode === 'voice' ? 'block' : 'none'
          }
        }, [createIcon(this.isMuted ? 'volume-x' : 'volume-2', 16)]);
        
        rightSide.appendChild(this.muteToggle);
      }

      this.closeButton = createElement('button', {
        class: 'shivai-widget-button',
        style: {
          padding: '8px',
          backgroundColor: 'transparent',
          color: 'inherit',
          borderRadius: this.config.theme.borderRadius,
          opacity: '0.8'
        }
      }, [createIcon('minimize', 16)]);
      
      rightSide.appendChild(this.closeButton);

      this.header.appendChild(leftSide);
      this.header.appendChild(rightSide);
      this.chatInterface.appendChild(this.header);
    }

    createBody() {
      this.body = createElement('div', {
        style: { flex: '1', display: 'flex', flexDirection: 'column' }
      });

      this.createChatMode();
      this.createVoiceMode();
      
      this.chatInterface.appendChild(this.body);
    }

    createChatMode() {
      this.chatMode = createElement('div', {
        style: { 
          display: this.currentMode === 'chat' ? 'flex' : 'none',
          flexDirection: 'column',
          height: '100%'
        }
      });

      this.messagesContainer = createElement('div', {
        class: 'shivai-widget-messages'
      });

      this.inputContainer = createElement('div', {
        style: {
          padding: '16px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '8px'
        }
      });

      this.messageInput = createElement('input', {
        class: 'shivai-widget-input',
        type: 'text',
        placeholder: this.config.content.placeholderText,
        style: { flex: '1' }
      });

      this.sendButton = createElement('button', {
        class: 'shivai-widget-button',
        style: {
          padding: '8px 16px',
          backgroundColor: this.config.theme.accentColor,
          color: 'white',
          borderRadius: this.config.theme.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, [createIcon('send', 16)]);

      this.inputContainer.appendChild(this.messageInput);
      this.inputContainer.appendChild(this.sendButton);

      this.chatMode.appendChild(this.messagesContainer);
      this.chatMode.appendChild(this.inputContainer);
      this.body.appendChild(this.chatMode);
    }

    createVoiceMode() {
      this.voiceMode = createElement('div', {
        style: {
          display: this.currentMode === 'voice' ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          textAlign: 'center',
          height: '100%'
        }
      });

      const micContainer = createElement('div', {
        style: {
          width: '80px',
          height: '80px',
          borderRadius: this.config.theme.borderRadius,
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }
      });
      
      this.micIcon = createIcon('mic', 32);
      micContainer.appendChild(this.micIcon);

      const title = createElement('h3', {
        style: { margin: '0 0 8px 0', fontSize: '16px', fontWeight: '500' }
      }, ['Voice Assistant']);

      this.voiceStatus = createElement('p', {
        style: { margin: '0 0 24px 0', fontSize: '14px', color: '#6b7280' }
      }, ['Tap to start speaking']);

      this.voiceButton = createElement('button', {
        class: 'shivai-widget-button',
        style: {
          padding: '12px 24px',
          backgroundColor: this.config.theme.accentColor,
          color: 'white',
          borderRadius: this.config.theme.borderRadius,
          fontSize: '14px',
          fontWeight: '500'
        }
      }, ['Start Recording']);

      this.voiceMode.appendChild(micContainer);
      this.voiceMode.appendChild(title);
      this.voiceMode.appendChild(this.voiceStatus);
      this.voiceMode.appendChild(this.voiceButton);
      this.body.appendChild(this.voiceMode);
    }

    createFooter() {
      this.footer = createElement('div', {
        style: { borderTop: '1px solid #f3f4f6' }
      });

      if (this.config.features.showPrivacyPolicy) {
        const privacyLink = createElement('div', {
          style: { textAlign: 'center', padding: '8px' }
        });

        const link = createElement('a', {
          href: this.config.content.privacyPolicyUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          style: {
            fontSize: '12px',
            color: '#6b7280',
            textDecoration: 'none'
          }
        }, ['Privacy Policy']);

        privacyLink.appendChild(link);
        this.footer.appendChild(privacyLink);
      }

      if (this.config.features.showBranding) {
        const branding = createElement('div', {
          style: {
            textAlign: 'center',
            padding: '4px 16px 8px',
            fontSize: '12px',
            color: '#9ca3af'
          }
        }, ['Powered by ShivAI']);

        this.footer.appendChild(branding);
      }

      this.chatInterface.appendChild(this.footer);
    }

    initSpeechRecognition() {
      if (this.config.features.voiceEnabled && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

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
          console.error('Speech recognition error:', event.error);
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
      this.triggerButton.addEventListener('click', () => this.toggleWidget());

      // Close button
      this.closeButton.addEventListener('click', () => this.toggleWidget());

      // Mode toggle
      if (this.modeToggle) {
        this.modeToggle.addEventListener('click', () => this.toggleMode());
      }

      // Mute toggle
      if (this.muteToggle) {
        this.muteToggle.addEventListener('click', () => this.toggleMute());
      }

      // Send message
      this.sendButton.addEventListener('click', () => this.sendMessage());
      this.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      // Voice button
      this.voiceButton.addEventListener('click', () => this.toggleRecording());

      // Outside click to close
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.container.contains(e.target)) {
          this.toggleWidget();
        }
      });

      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.toggleWidget();
        }
      });
    }

    toggleWidget() {
      this.isOpen = !this.isOpen;
      
      if (this.isOpen) {
        this.triggerButton.style.display = 'none';
        this.chatInterface.style.display = 'flex';
        
        if (this.config.features.autoGreeting && !this.hasGreeted) {
          this.addMessage('bot', this.config.content.welcomeMessage);
          this.hasGreeted = true;
        }
      } else {
        this.triggerButton.style.display = 'flex';
        this.chatInterface.style.display = 'none';
      }
    }

    toggleMode() {
      this.currentMode = this.currentMode === 'chat' ? 'voice' : 'chat';
      
      if (this.currentMode === 'chat') {
        this.chatMode.style.display = 'flex';
        this.voiceMode.style.display = 'none';
        this.muteToggle.style.display = 'none';
      } else {
        this.chatMode.style.display = 'none';
        this.voiceMode.style.display = 'flex';
        this.muteToggle.style.display = 'block';
      }
      
      // Update mode icon in header
      const headerAvatar = this.header.querySelector('div div');
      headerAvatar.innerHTML = '';
      headerAvatar.appendChild(createIcon(this.currentMode === 'chat' ? 'message-circle' : 'phone', 16));
      
      // Update toggle button icon
      this.modeToggle.innerHTML = '';
      this.modeToggle.appendChild(createIcon(this.currentMode === 'chat' ? 'phone' : 'message-circle', 16));
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.muteToggle.innerHTML = '';
      this.muteToggle.appendChild(createIcon(this.isMuted ? 'volume-x' : 'volume-2', 16));
    }

    toggleRecording() {
      if (!this.recognition) return;

      if (this.isRecording) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    }

    updateVoiceUI() {
      if (this.isRecording) {
        this.voiceStatus.textContent = 'Listening...';
        this.voiceButton.textContent = 'Stop Recording';
        this.voiceButton.style.backgroundColor = '#dc2626';
        this.micIcon.parentElement.classList.add('shivai-recording');
      } else if (this.isLoading) {
        this.voiceStatus.textContent = 'Processing...';
        this.voiceButton.textContent = 'Processing...';
        this.voiceButton.style.backgroundColor = '#6b7280';
        this.micIcon.parentElement.classList.remove('shivai-recording');
      } else {
        this.voiceStatus.textContent = 'Tap to start speaking';
        this.voiceButton.textContent = 'Start Recording';
        this.voiceButton.style.backgroundColor = this.config.theme.accentColor;
        this.micIcon.parentElement.classList.remove('shivai-recording');
      }
    }

    async sendMessage() {
      const message = this.messageInput.value.trim();
      if (!message || this.isLoading) return;

      this.addMessage('user', message);
      this.messageInput.value = '';
      this.setLoading(true);

      try {
        const response = await this.api.sendMessage(message, this.conversationId);
        this.addMessage('bot', response);
      } catch (error) {
        this.addMessage('bot', 'Sorry, I encountered an error. Please try again.');
      } finally {
        this.setLoading(false);
      }
    }

    async handleVoiceMessage(transcript) {
      this.addMessage('user', transcript);
      this.setLoading(true);

      try {
        const response = await this.api.processVoice(transcript, this.conversationId);
        this.addMessage('bot', response);
        
        if (!this.isMuted && this.synthesis) {
          this.speakText(response);
        }
      } catch (error) {
        this.addMessage('bot', 'Sorry, I had trouble processing your voice message.');
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
      const messageDiv = createElement('div', {
        class: 'shivai-widget-message',
        style: {
          display: 'flex',
          justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
          marginBottom: '12px'
        }
      });

      const bubble = createElement('div', {
        style: {
          maxWidth: '80%',
          padding: '8px 12px',
          borderRadius: this.config.theme.borderRadius,
          backgroundColor: message.type === 'user' ? this.config.theme.accentColor : '#f3f4f6',
          color: message.type === 'user' ? 'white' : '#1f2937',
          fontSize: '14px',
          lineHeight: '1.4'
        }
      }, [message.content]);

      messageDiv.appendChild(bubble);
      return messageDiv;
    }

    setLoading(loading) {
      this.isLoading = loading;
      
      if (loading && this.currentMode === 'chat') {
        const loadingMessage = createElement('div', {
          class: 'shivai-widget-message',
          id: 'shivai-loading-message',
          style: { display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }
        });

        const loadingBubble = createElement('div', {
          style: {
            padding: '8px 12px',
            borderRadius: this.config.theme.borderRadius,
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }
        });

        const loadingDots = createElement('div', { class: 'shivai-loading-dots' });
        for (let i = 0; i < 3; i++) {
          loadingDots.appendChild(createElement('div', { class: 'shivai-loading-dot' }));
        }

        loadingBubble.appendChild(loadingDots);
        loadingMessage.appendChild(loadingBubble);
        this.messagesContainer.appendChild(loadingMessage);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      } else {
        const loadingMessage = document.getElementById('shivai-loading-message');
        if (loadingMessage) {
          loadingMessage.remove();
        }
      }

      if (this.currentMode === 'voice') {
        this.updateVoiceUI();
      }

      // Disable/enable inputs
      this.messageInput.disabled = loading;
      this.sendButton.disabled = loading;
      if (this.voiceButton) {
        this.voiceButton.disabled = loading;
      }
    }
  }

  // Initialize widget when DOM is ready
  function initWidget() {
    const script = document.currentScript || 
                   document.querySelector('script[src*="widget.js"]') ||
                   document.querySelector('script[data-client-id]');
    
    if (!script) {
      console.error('ShivAI Widget: Could not find script tag');
      return;
    }

    const clientId = script.getAttribute('data-client-id');
    if (!clientId) {
      console.error('ShivAI Widget: data-client-id attribute is required');
      return;
    }

    // Merge with global config if available
    const globalConfig = window.ShivAIConfig || {};
    const config = mergeDeep({}, DEFAULT_CONFIG, globalConfig, { clientId });

    // Create widget instance
    window.ShivAIWidget = new ShivAIWidget(config);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

})(window, document);