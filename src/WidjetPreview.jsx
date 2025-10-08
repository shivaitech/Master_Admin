import React, { useEffect } from 'react';

const WidgetPreview = () => {
  useEffect(() => {
    // Clean up any existing widget instance
    if (window.ShivAIWidget) {
      const existingContainer = document.getElementById('shivai-widget-container');
      if (existingContainer) {
        existingContainer.remove();
      }
      delete window.ShivAIWidget;
    }

    // Set up widget configuration
    window.ShivAIConfig = {
      clientId: "demo-client-preview",
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
        welcomeMessage: "ShivAI offers 24/7 voice support to handle your business calls efficiently and professionally.",
        placeholderText: "Type your message...",
        voiceGreeting: "Hello! I'm your AI assistant. How can I help?",
        privacyPolicyUrl: "https://shivai.com/privacy",
        companyName: "ShivAI",
        subtitle: "AI-Powered Support",
      },
    };

    // Load and execute the widget script
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.setAttribute('data-client-id', 'demo-client-preview');
    script.onload = () => {
      console.log('ShivAI Widget loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load ShivAI Widget');
    };
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script
      const scriptElement = document.querySelector('script[src="/widget.js"]');
      if (scriptElement) {
        scriptElement.remove();
      }

      // Clean up widget instance
      if (window.ShivAIWidget) {
        const container = document.getElementById('shivai-widget-container');
        if (container) {
          container.remove();
        }
        delete window.ShivAIWidget;
      }

      // Clean up styles
      const styles = document.getElementById('shivai-widget-styles');
      if (styles) {
        styles.remove();
      }

      // Clean up global config
      delete window.ShivAIConfig;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  ShivAI Widget Preview
                </h1>
                <p className="text-sm text-gray-500">
                  Live preview of your widget.js implementation
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Widget
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Live Widget Demo
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              This is your actual widget.js running in a simulated website environment
            </p>
          </div>
          
          {/* Simulated Website */}
          <div className="relative">
            {/* Website mockup */}
            <div className="min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Your Website
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    This simulates how the ShivAI widget appears on your actual website. 
                    The widget should appear in the bottom-right corner.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">24/7 Chat Support</h3>
                    <p className="text-sm text-gray-600">Get instant help with our AI-powered chat system</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Voice Calls</h3>
                    <p className="text-sm text-gray-600">Start a voice conversation with our AI assistant</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instant Resolution</h3>
                    <p className="text-sm text-gray-600">Quick and accurate responses to your queries</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Try the Widget</h3>
                  <p className="text-gray-600 text-sm">
                    Look for the ShivAI widget button in the bottom-right corner. Click it to start chatting or make a voice call!
                  </p>
                </div>
              </div>
            </div>

            {/* Widget will be automatically injected here by widget.js */}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">How to Test</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Look for the widget button in the bottom-right corner</li>
                <li>• Click it to open the widget interface</li>
                <li>• Try switching between Chat and Voice Call modes</li>
                <li>• Test the chat functionality by typing a message</li>
                <li>• This is the exact same widget that will appear on your website</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPreview;
