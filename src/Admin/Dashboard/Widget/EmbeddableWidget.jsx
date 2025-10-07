import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Minimize2, 
  Volume2, 
  VolumeX,
  User,
  Bot
} from 'lucide-react';

const EmbeddableWidget = ({ 
  config, 
  onMessage,
  onVoiceStart,
  onVoiceEnd 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (config.features.voiceEnabled && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        
        // Add user message
        const userMessage = {
          id: Date.now().toString(),
          type: 'user',
          content: transcript,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        
        // Get AI response
        if (onVoiceEnd) {
          setIsLoading(true);
          try {
            const response = await onVoiceEnd(transcript);
            const botMessage = {
              id: (Date.now() + 1).toString(),
              type: 'bot',
              content: response,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            
            // Speak the response if not muted
            if (!isMuted && config.features.soundEffects) {
              speakText(response);
            }
          } catch (error) {
            console.error('Voice processing error:', error);
          } finally {
            setIsLoading(false);
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [config.features.voiceEnabled, config.features.soundEffects, isMuted, onVoiceEnd]);

  // Auto greeting
  useEffect(() => {
    if (config.features.autoGreeting && !hasGreeted && isOpen) {
      const welcomeMessage = {
        id: 'welcome',
        type: 'bot',
        content: config.content.welcomeMessage,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setHasGreeted(true);

      // Speak welcome message if in voice mode and not muted
      if (currentMode === 'voice' && !isMuted && config.features.soundEffects) {
        speakText(config.content.voiceGreeting || config.content.welcomeMessage);
      }
    }
  }, [isOpen, hasGreeted, config.features.autoGreeting, config.content.welcomeMessage, config.content.voiceGreeting, currentMode, isMuted, config.features.soundEffects]);

  const speakText = (text) => {
    if (synthRef.current && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthRef.current.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    if (onMessage) {
      setIsLoading(true);
      try {
        const response = await onMessage(inputValue);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Message processing error:', error);
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setIsRecording(true);
      if (onVoiceStart) {
        onVoiceStart();
      }
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const getButtonSize = () => {
    switch (config.ui.buttonSize) {
      case 'small': return 'w-12 h-12';
      case 'medium': return 'w-14 h-14';
      case 'large': return 'w-16 h-16';
      default: return 'w-14 h-14';
    }
  };

  const getAnimationClass = () => {
    switch (config.ui.animationSpeed) {
      case 'slow': return 'duration-500';
      case 'normal': return 'duration-300';
      case 'fast': return 'duration-150';
      default: return 'duration-300';
    }
  };

  const getPositionClasses = () => {
    switch (config.ui.position) {
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      default: return 'bottom-4 right-4';
    }
  };

  return (
    <div 
      className={`fixed ${getPositionClasses()} z-[9999]`}
      style={{ fontFamily: config.theme.fontFamily }}
    >
      {!isOpen ? (
        // Widget Trigger Button
        <button
          onClick={() => setIsOpen(true)}
          className={`${getButtonSize()} rounded-full shadow-lg flex items-center justify-center transition-all ${getAnimationClass()} hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-50`}
          style={{
            backgroundColor: config.theme.primaryColor,
            color: config.theme.secondaryColor,
            borderRadius: config.theme.borderRadius,
            boxShadow: config.theme.shadowLevel === 'high' ? '0 10px 25px rgba(0,0,0,0.2)' : 
                      config.theme.shadowLevel === 'medium' ? '0 4px 12px rgba(0,0,0,0.15)' : 
                      '0 2px 8px rgba(0,0,0,0.1)'
          }}
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        // Widget Chat Interface
        <div
          className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all ${getAnimationClass()}`}
          style={{
            width: config.ui.chatWidth,
            height: config.ui.chatHeight,
            borderRadius: config.theme.borderRadius,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ backgroundColor: config.theme.primaryColor, color: config.theme.secondaryColor }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                style={{ borderRadius: config.theme.borderRadius }}
              >
                {currentMode === 'chat' ? (
                  <MessageCircle className="w-4 h-4" />
                ) : (
                  <Phone className="w-4 h-4" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-sm">AI Assistant</h4>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {config.features.voiceEnabled && (
                <button
                  onClick={() => setCurrentMode(currentMode === 'chat' ? 'voice' : 'chat')}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  style={{ borderRadius: config.theme.borderRadius }}
                  aria-label={`Switch to ${currentMode === 'chat' ? 'voice' : 'chat'} mode`}
                >
                  {currentMode === 'chat' ? <Phone className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                </button>
              )}
              {currentMode === 'voice' && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  style={{ borderRadius: config.theme.borderRadius }}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                style={{ borderRadius: config.theme.borderRadius }}
                aria-label="Minimize widget"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {currentMode === 'chat' ? (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg flex items-start gap-2 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white flex-row-reverse'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      style={{
                        backgroundColor: message.type === 'user' ? config.theme.accentColor : undefined,
                        borderRadius: config.theme.borderRadius
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        message.type === 'user' ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                      }`}>
                        {message.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div 
                      className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg flex items-center gap-2"
                      style={{ borderRadius: config.theme.borderRadius }}
                    >
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={config.content.placeholderText}
                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    style={{ borderRadius: config.theme.borderRadius }}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center"
                    style={{ 
                      backgroundColor: config.theme.accentColor,
                      borderRadius: config.theme.borderRadius 
                    }}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Voice Mode
            <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ height: 'calc(100% - 60px)' }}>
              <div className="text-center mb-8">
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${
                    isRecording ? 'bg-red-100 animate-pulse' : 'bg-gray-100'
                  }`}
                  style={{ borderRadius: config.theme.borderRadius }}
                >
                  <Mic className={`w-8 h-8 ${isRecording ? 'text-red-600' : 'text-gray-600'}`} />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Voice Assistant</h3>
                <p className="text-sm text-gray-600">
                  {isLoading ? 'Processing...' : isRecording ? 'Listening...' : 'Tap to start speaking'}
                </p>
              </div>
              
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'text-white hover:opacity-90'
                }`}
                style={{ 
                  backgroundColor: isRecording ? undefined : config.theme.accentColor,
                  borderRadius: config.theme.borderRadius 
                }}
              >
                {isLoading ? 'Processing...' : isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              
              {messages.length > 0 && (
                <div className="mt-6 w-full max-h-32 overflow-y-auto">
                  <div className="text-sm text-gray-600 space-y-2">
                    {messages.slice(-3).map((message) => (
                      <div key={message.id} className={`${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block px-3 py-1 rounded-lg ${
                          message.type === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="px-4 pb-2 border-t border-gray-100">
            {config.features.showPrivacyPolicy && (
              <div className="text-center mb-2">
                <a
                  href={config.content.privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            )}
            
            {config.features.showBranding && (
              <div className="text-center py-1">
                <span className="text-xs text-gray-400">
                  Powered by <span className="font-medium">ShivAI</span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbeddableWidget;