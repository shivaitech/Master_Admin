import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Bot,
  Settings,
  Palette,
  Code,
  Eye,
  Play,
  Monitor,
  Smartphone,
  Tablet,
  MessageSquare,
  Phone,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Download,
  ExternalLink,
  Copy,
  Check,
  BotIcon,
} from "lucide-react";

const WidgetManagementPlaceholder = () => {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("customize");
  const [previewDevice, setPreviewDevice] = useState("mobile");
  const [previewMode, setPreviewMode] = useState("chat");
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);

  // Styled Button Component matching your specifications
  const StyledButton = ({
    children,
    onClick,
    title,
    variant = "default",
    className = "",
  }) => {
    const baseStyle = {
      background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
      boxShadow: `0 1.688px 0.844px 0 #33332f inset,
        0 3.797px 0.844px 0 #5e5e5e inset, 0 -6.75px 10.126px 0 #171717 inset,
        0 13.501px 20.251px -10.126px rgba(0, 0, 0, 0.25)`,
    };

    return (
      <button
        onClick={onClick}
        title={title}
        style={baseStyle}
        className={`p-2 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:brightness-110 ${className}`}
      >
        {children}
      </button>
    );
  };
  const [widgetConfig, setWidgetConfig] = useState({
    theme: {
      primaryColor: "#2563eb",
      secondaryColor: "#ffffff",
      accentColor: "#3b82f6",
      borderRadius: "16px",
      fontFamily: "Inter, sans-serif",
      shadowIntensity: "medium",
    },
    ui: {
      position: "bottom-right",
      buttonSize: "medium",
      chatHeight: "450px",
      chatWidth: "380px",
      animationType: "slide",
    },
    content: {
      welcomeMessage: "Hi! I'm your AI assistant. How can I help you today?",
      placeholderText: "Type your message...",
      companyName: "ShivAI",
      subtitle: "AI-Powered Support",
    },
    features: {
      chatEnabled: true,
      voiceEnabled: true,
      soundEffects: true,
      showBranding: true,
      autoOpen: false,
    },
  });
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const previewRef = useRef(null);

  // Auto-set mobile preview on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPreviewDevice("mobile");
      } else if (window.innerWidth < 1024 && previewDevice === "desktop") {
        setPreviewDevice("tablet");
      }
    };

    // Set initial device based on screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [previewDevice]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDeviceStyles = () => {
    switch (previewDevice) {
      case "mobile":
        return { width: "375px", height: "667px" };
      case "tablet":
        return { width: "768px", height: "1024px" };
      default:
        return { width: "1200px", height: "700px" };
    }
  };

  const renderPreviewWidget = () => {
    // Dynamic widget sizing based on device
    const getWidgetSize = () => {
      if (previewDevice === "mobile") {
        return widgetConfig.ui.buttonSize === "small"
          ? "28px"
          : widgetConfig.ui.buttonSize === "large"
          ? "40px"
          : "32px";
      } else if (previewDevice === "tablet") {
        return widgetConfig.ui.buttonSize === "small"
          ? "36px"
          : widgetConfig.ui.buttonSize === "large"
          ? "52px"
          : "44px";
      } else {
        return widgetConfig.ui.buttonSize === "small"
          ? "40px"
          : widgetConfig.ui.buttonSize === "large"
          ? "56px"
          : "48px";
      }
    };

    const widgetSize = getWidgetSize();

    // Enhanced responsive scaling
    const getResponsiveScale = () => {
      if (isPreviewFullscreen) return 1;
      switch (previewDevice) {
        case "mobile":
          return 0.7;
        case "tablet":
          return 0.85;
        default:
          return 1;
      }
    };

    const scale = getResponsiveScale();

    // Mobile-optimized chat dimensions
    const getChatDimensions = () => {
      const baseWidth = parseInt(widgetConfig.ui.chatWidth);
      const baseHeight = parseInt(widgetConfig.ui.chatHeight);

      if (previewDevice === "mobile") {
        return {
          width: Math.min(baseWidth * scale, 320), // Max 320px for mobile
          height: Math.min(baseHeight * scale, 400), // Max 400px for mobile
        };
      } else if (previewDevice === "tablet") {
        return {
          width: Math.min(baseWidth * scale, 400), // Max 400px for tablet
          height: Math.min(baseHeight * scale, 500), // Max 500px for tablet
        };
      } else {
        return {
          width: baseWidth * scale,
          height: baseHeight * scale,
        };
      }
    };

    const { width: chatWidth, height: chatHeight } = getChatDimensions();

    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Responsive Widget Trigger Button */}
        {!isWidgetOpen && (
          <button
            onClick={() => setIsWidgetOpen(true)}
            className="absolute z-10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            style={{
              width: widgetSize,
              height: widgetSize,
              borderRadius: widgetConfig.theme.borderRadius,
              background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
              color: "#ffffff",
              bottom:
                previewDevice === "mobile"
                  ? "60px"
                  : previewDevice === "tablet"
                  ? "40px"
                  : "50px",
              right:
                previewDevice === "mobile"
                  ? "15px"
                  : previewDevice === "tablet"
                  ? "20px"
                  : "25px",
              boxShadow: `0 1.688px 0.844px 0 #33332f inset,
                0 3.797px 0.844px 0 #5e5e5e inset, 0 -6.75px 10.126px 0 #171717 inset,
                0 13.501px 20.251px -10.126px rgba(0, 0, 0, 0.25)`,
              border: "none",
              cursor: "pointer",
            }}
          >
            <MessageSquare
              size={parseInt(widgetSize) * 0.55}
              className={
                previewDevice === "mobile"
                  ? "w-4 h-4"
                  : previewDevice === "tablet"
                  ? "w-5 h-5"
                  : "w-6 h-6"
              }
            />
          </button>
        )}

        {/* Responsive Widget Chat Interface */}
        {isWidgetOpen && (
          <div
            className={`absolute z-10 bg-white shadow-2xl overflow-hidden transition-all duration-300 ${
              previewDevice === "mobile" ? "rounded-lg" : "rounded-2xl"
            }`}
            style={{
              width: chatWidth + "px",
              height: chatHeight + "px",
              bottom:
                previewDevice === "mobile"
                  ? "60px"
                  : previewDevice === "tablet"
                  ? "25px"
                  : "30px",
              right:
                previewDevice === "mobile"
                  ? "10px"
                  : previewDevice === "tablet"
                  ? "15px"
                  : "20px",
              borderRadius:
                previewDevice === "mobile"
                  ? "12px"
                  : widgetConfig.theme.borderRadius,
              fontSize:
                previewDevice === "mobile"
                  ? "12px"
                  : previewDevice === "tablet"
                  ? "14px"
                  : "16px",
              border: "1px solid #e5e7eb",
              boxShadow:
                previewDevice === "mobile"
                  ? "0 6px 25px rgba(0,0,0,0.2)"
                  : "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            {/* Responsive Header */}
            <div
              className={`relative text-center border-b border-gray-100 ${
                previewDevice === "mobile"
                  ? "p-3"
                  : previewDevice === "tablet"
                  ? "p-4"
                  : "p-6"
              }`}
            >
              <button
                onClick={() => setIsWidgetOpen(false)}
                className={`absolute flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors ${
                  previewDevice === "mobile"
                    ? "top-2 right-2 w-6 h-6 text-lg"
                    : previewDevice === "tablet"
                    ? "top-3 right-3 w-7 h-7 text-xl"
                    : "top-4 right-4 w-8 h-8 text-xl"
                }`}
              >
                ×
              </button>

              {/* Responsive Logo/Avatar - Shiv AI Style */}
              <div
                className={`mx-auto rounded-full flex items-center justify-center ${
                  previewDevice === "mobile"
                    ? "w-10 h-10 mb-2"
                    : previewDevice === "tablet"
                    ? "w-12 h-12 mb-3"
                    : "w-16 h-16 mb-4"
                }`}
                style={{
                  background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                  boxShadow: `0 1.688px 0.844px 0 #33332f inset,
                    0 3.797px 0.844px 0 #5e5e5e inset, 0 -6.75px 10.126px 0 #171717 inset,
                    0 13.501px 20.251px -10.126px rgba(0, 0, 0, 0.25)`,
                }}
              >
                <div className="w-8/12 h-8/12  rounded-sm flex items-center justify-center">
                  <Bot className="text-white" size={previewDevice === "mobile" ? 16 : 20} />
                </div>
              </div>

              {/* Responsive Title - Matching Shiv AI */}
              <h3
                className={`font-semibold text-gray-900 mb-2 ${
                  previewDevice === "mobile"
                    ? "text-sm"
                    : previewDevice === "tablet"
                    ? "text-base"
                    : "text-xl"
                }`}
              >
                ShivAI Support
              </h3>

              {previewMode === "voice" ? (
                <>
                  <p
                    className={`text-gray-600 leading-relaxed ${
                      previewDevice === "mobile"
                        ? "text-xs mb-3 px-2"
                        : previewDevice === "tablet"
                        ? "text-sm mb-4 px-3"
                        : "text-base mb-6 px-4"
                    }`}
                  >
                    ShivAI offers 24/7 voice support to handle your business
                    calls efficiently and professionally.
                  </p>

                  {/* Responsive Start Call Button - Matching Shiv AI Style */}
                  <button
                    className={`w-full text-white font-semibold rounded-full transition-all hover:opacity-90 ${
                      previewDevice === "mobile"
                        ? "py-3 mb-2 text-xs"
                        : previewDevice === "tablet"
                        ? "py-3 mb-3 text-sm"
                        : "py-4 mb-4 text-base"
                    }`}
                    style={{
                      background:
                        "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                      boxShadow: `0 1.688px 0.844px 0 #33332f inset,
                        0 3.797px 0.844px 0 #5e5e5e inset, 0 -6.75px 10.126px 0 #171717 inset,
                        0 13.501px 20.251px -10.126px rgba(0, 0, 0, 0.25)`,
                    }}
                  >
                    <Phone
                      size={
                        previewDevice === "mobile"
                          ? 14
                          : previewDevice === "tablet"
                          ? 16
                          : 20
                      }
                      className="inline mr-2"
                    />
                    Start Call
                  </button>

                  <p
                    className={`text-gray-500 leading-relaxed ${
                      previewDevice === "mobile"
                        ? "text-xs mb-3"
                        : previewDevice === "tablet"
                        ? "text-xs mb-4"
                        : "text-sm mb-6"
                    }`}
                  >
                    By starting call you agree to{" "}
                    <span className="text-blue-500 cursor-pointer">
                      Privacy policy
                    </span>{" "}
                    & <span className="text-blue-500 cursor-pointer">T&C</span>
                  </p>

                

                  {/* Responsive Bottom Navigation */}
                  <div className="flex">
                    <button
                      onClick={() => setPreviewMode("chat")}
                      className={`flex-1 flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors ${
                        previewDevice === "mobile" ? "py-2" : "py-3"
                      }`}
                    >
                      <MessageSquare
                        size={
                          previewDevice === "mobile"
                            ? 16
                            : previewDevice === "tablet"
                            ? 20
                            : 24
                        }
                      />
                      <span
                        className={`mt-1 ${
                          previewDevice === "mobile" ? "text-xs" : "text-sm"
                        }`}
                      >
                        Chat
                      </span>
                    </button>
                    <button
                      className={`flex-1 flex flex-col items-center text-gray-900 *:
                        border-b-2 border-dark  ${
                        previewDevice === "mobile" ? "py-2" : "py-3"
                      }`}
                    >
                      <Phone
                        size={
                          previewDevice === "mobile"
                            ? 16
                            : previewDevice === "tablet"
                            ? 20
                            : 24
                        }
                      />
                      <span
                        className={`font-medium mt-1 ${
                          previewDevice === "mobile" ? "text-xs" : "text-sm"
                        }`}
                      >
                        Voice Call
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Chat Mode - Responsive Layout */}
                  <p
                    className={`text-gray-600 leading-relaxed ${
                      previewDevice === "mobile"
                        ? "text-xs mb-3 px-2"
                        : previewDevice === "tablet"
                        ? "text-sm mb-4 px-3"
                        : "text-base mb-6 px-4"
                    }`}
                  >
                    ShivAI offers 24/7 voice support to handle your business
                    calls efficiently and professionally.
                  </p>

                  {/* Responsive Start Chat Button - Matching Shiv AI Style */}
                  <button
                    className={`w-full text-white font-semibold rounded-full transition-all hover:opacity-90 ${
                      previewDevice === "mobile"
                        ? "py-3 mb-2 text-xs"
                        : previewDevice === "tablet"
                        ? "py-3 mb-3 text-sm"
                        : "py-4 mb-4 text-base"
                    }`}
                    style={{
                      background:
                        "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                      boxShadow: `0 1.688px 0.844px 0 #33332f inset,
                        0 3.797px 0.844px 0 #5e5e5e inset, 0 -6.75px 10.126px 0 #171717 inset,
                        0 13.501px 20.251px -10.126px rgba(0, 0, 0, 0.25)`,
                    }}
                  >
                    <MessageSquare
                      size={
                        previewDevice === "mobile"
                          ? 14
                          : previewDevice === "tablet"
                          ? 18
                          : 24
                      }
                      className={
                        previewDevice === "mobile"
                          ? "inline mr-2 "
                          : "inline mr-4"
                      }
                    />
                    Start Chat
                  </button>

                  <p
                    className={`text-gray-500 leading-relaxed ${
                      previewDevice === "mobile"
                        ? "text-xs mb-3"
                        : previewDevice === "tablet"
                        ? "text-xs mb-4"
                        : "text-sm mb-6"
                    }`}
                  >
                    By starting chat you agree to{" "}
                    <span className="text-blue-500 cursor-pointer">
                      Privacy policy
                    </span>{" "}
                    & <span className="text-blue-500 cursor-pointer">T&C</span>
                  </p>

                  {/* Responsive Bottom Navigation */}
                  <div className="flex">
                    <button
                      className={`flex-1 flex flex-col items-center text-gray-900 bg-white border-b-2 border-dark ${
                        previewDevice === "mobile"
                          ? "py-2"
                          : previewDevice === "tablet"
                          ? "py-3"
                          : "py-4"
                      }`}
                    >
                      <MessageSquare
                        size={
                          previewDevice === "mobile"
                            ? 16
                            : previewDevice === "tablet"
                            ? 20
                            : 24
                        }
                      />
                      <span
                        className={`font-semibold mt-1 ${
                          previewDevice === "mobile" ? "text-xs" : "text-sm"
                        }`}
                      >
                        Chat
                      </span>
                    </button>
                    <button
                      onClick={() => setPreviewMode("voice")}
                      className={`flex-1 flex flex-col items-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors ${
                        previewDevice === "mobile"
                          ? "py-2"
                          : previewDevice === "tablet"
                          ? "py-3"
                          : "py-4"
                      }`}
                    >
                      <Phone
                        size={
                          previewDevice === "mobile"
                            ? 16
                            : previewDevice === "tablet"
                            ? 20
                            : 24
                        }
                      />
                      <span
                        className={`mt-1 ${
                          previewDevice === "mobile" ? "text-xs" : "text-sm"
                        }`}
                      >
                        Voice Call
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
            {/* Powered by ShivAI footer */}
            {widgetConfig.features.showBranding && (
              <div
                className={`w-full text-center py-2 border-t border-gray-100 bg-gray-50 ${
                  previewDevice === "mobile"
                    ? "text-[10px]"
                    : previewDevice === "tablet"
                    ? "text-xs"
                    : "text-sm"
                } text-gray-500 font-medium flex items-center justify-center gap-1`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 20,
                }}
              >
                <BotIcon
                  className="inline-block mr-1 text-black"
                  size={previewDevice === "mobile" ? 12 : 16}
                />
                Powered by{" "}
                <span className=" font-semibold text-black">ShivAI</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${currentTheme.cardBg} backdrop-blur-lg rounded-xl sm:rounded-2xl border ${currentTheme.border} p-3 sm:p-4 lg:p-6 shadow-lg w-full overflow-hidden`}
    >
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div
          className={`p-2 sm:p-3 ${currentTheme.activeBg} rounded-lg shrink-0`}
        >
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h2
            className={`text-xl sm:text-2xl font-bold ${currentTheme.text} leading-tight`}
          >
            Widget Management
          </h2>
          <p
            className={`text-xs sm:text-sm ${currentTheme.textSecondary} mt-1 leading-relaxed`}
          >
            Create and customize embeddable AI widgets with live preview
          </p>
        </div>
      </div>

      {/* Navigation Tabs - Mobile Responsive */}
      <div className="mb-4 sm:mb-6 overflow-x-auto">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg min-w-full">
          {[
            {
              id: "overview",
              label: "Overview",
              shortLabel: "Overview",
              icon: Eye,
            },
            {
              id: "customize",
              label: "Customize & Preview",
              shortLabel: "Customize",
              icon: Palette,
            },
            {
              id: "integration",
              label: "Integration",
              shortLabel: "Code",
              icon: Code,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-auto flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap min-w-0 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden min-[475px]:inline sm:hidden">
                  {tab.shortLabel}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="min-[475px]:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <>
            {/* Stats Grid - Mobile First Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg sm:text-xl lg:text-2xl font-bold ${currentTheme.text} leading-tight`}
                    >
                      12
                    </p>
                    <p
                      className={`text-xs sm:text-sm ${currentTheme.textSecondary} truncate`}
                    >
                      Active Widgets
                    </p>
                  </div>
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-500 shrink-0" />
                </div>
              </div>

              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg sm:text-xl lg:text-2xl font-bold ${currentTheme.text} leading-tight`}
                    >
                      2.4k
                    </p>
                    <p
                      className={`text-xs sm:text-sm ${currentTheme.textSecondary} truncate`}
                    >
                      Conversations
                    </p>
                  </div>
                  <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-500 shrink-0" />
                </div>
              </div>

              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg sm:text-xl lg:text-2xl font-bold ${currentTheme.text} leading-tight`}
                    >
                      8
                    </p>
                    <p
                      className={`text-xs sm:text-sm ${currentTheme.textSecondary} truncate`}
                    >
                      Custom Themes
                    </p>
                  </div>
                  <Palette className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-500 shrink-0" />
                </div>
              </div>

              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg sm:text-xl lg:text-2xl font-bold ${currentTheme.text} leading-tight`}
                    >
                      98%
                    </p>
                    <p
                      className={`text-xs sm:text-sm ${currentTheme.textSecondary} truncate`}
                    >
                      Uptime
                    </p>
                  </div>
                  <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-500 shrink-0" />
                </div>
              </div>
            </div>

            {/* Action Cards - Mobile Responsive Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Quick Actions Card */}
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 sm:p-6`}
              >
                <h3
                  className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-3 sm:mb-4`}
                >
                  Quick Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <StyledButton
                    onClick={() => setActiveTab("customize")}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 text-left touch-manipulation"
                    title="Customize & Preview Widget"
                  >
                    <Palette className="w-5 h-5 shrink-0" />
                    <span className="text-sm sm:text-base truncate">
                      Customize & Preview Widget
                    </span>
                  </StyledButton>
                  <StyledButton
                    onClick={() => setActiveTab("integration")}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 text-left touch-manipulation"
                    title="Get Embed Code"
                  >
                    <Code className="w-5 h-5 shrink-0" />
                    <span className="text-sm sm:text-base truncate">
                      Get Embed Code
                    </span>
                  </StyledButton>
                </div>
              </div>

              {/* Recent Widgets Card */}
              <div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 sm:p-6`}
              >
                <h3
                  className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-3 sm:mb-4`}
                >
                  Recent Widgets
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium ${currentTheme.text} text-sm sm:text-base truncate`}
                          >
                            Client Widget {i}
                          </p>
                          <p
                            className={`text-xs sm:text-sm ${currentTheme.textSecondary} truncate`}
                          >
                            Updated 2 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        <button
                          onClick={() => setActiveTab("customize")}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded touch-manipulation"
                          title="Customize Widget"
                        >
                          <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                        </button>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "customize" && (
          <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Customization Panel - Mobile First */}
            <div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 sm:p-6 order-2 xl:order-1`}
            >
              <h3
                className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-3 sm:mb-4`}
              >
                Widget Customization
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {/* Theme Colors - Mobile Optimized */}
                <div>
                  <h4
                    className={`text-sm font-semibold ${currentTheme.text} mb-2 sm:mb-3`}
                  >
                    Theme Colors
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                      >
                        Primary Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={widgetConfig.theme.primaryColor}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              theme: {
                                ...widgetConfig.theme,
                                primaryColor: e.target.value,
                              },
                            })
                          }
                          className="w-12 h-8 sm:h-10 rounded border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={widgetConfig.theme.primaryColor}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              theme: {
                                ...widgetConfig.theme,
                                primaryColor: e.target.value,
                              },
                            })
                          }
                          className="flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                      >
                        Accent Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={widgetConfig.theme.accentColor}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              theme: {
                                ...widgetConfig.theme,
                                accentColor: e.target.value,
                              },
                            })
                          }
                          className="w-12 h-8 sm:h-10 rounded border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={widgetConfig.theme.accentColor}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              theme: {
                                ...widgetConfig.theme,
                                accentColor: e.target.value,
                              },
                            })
                          }
                          className="flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* UI Settings - Mobile Enhanced */}
                <div>
                  <h4
                    className={`text-sm font-semibold ${currentTheme.text} mb-2 sm:mb-3`}
                  >
                    UI Settings
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label
                        className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                      >
                        Button Size
                      </label>
                      <select
                        value={widgetConfig.ui.buttonSize}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            ui: {
                              ...widgetConfig.ui,
                              buttonSize: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
                      >
                        <option value="small">Small (32px)</option>
                        <option value="medium">Medium (40px)</option>
                        <option value="large">Large (48px)</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                      >
                        Border Radius
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={parseInt(widgetConfig.theme.borderRadius)}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              theme: {
                                ...widgetConfig.theme,
                                borderRadius: `${e.target.value}px`,
                              },
                            })
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">0px</span>
                          <div className="text-xs text-gray-700 font-medium bg-gray-100 px-2 py-1 rounded">
                            {widgetConfig.theme.borderRadius}
                          </div>
                          <span className="text-xs text-gray-500">24px</span>
                        </div>
                      </div>
                    </div>
                    {/* Widget Dimensions - Enhanced */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                        >
                          Chat Width
                        </label>
                        <input
                          type="number"
                          min="280"
                          max="500"
                          step="10"
                          value={parseInt(widgetConfig.ui.chatWidth)}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              ui: {
                                ...widgetConfig.ui,
                                chatWidth: `${e.target.value}px`,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="380"
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                        >
                          Chat Height
                        </label>
                        <input
                          type="number"
                          min="300"
                          max="600"
                          step="10"
                          value={parseInt(widgetConfig.ui.chatHeight)}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              ui: {
                                ...widgetConfig.ui,
                                chatHeight: `${e.target.value}px`,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="450"
                        />
                      </div>
                    </div>

                    {/* New UI Settings */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                        >
                          Animation Style
                        </label>
                        <select
                          value={widgetConfig.ui.animationType}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              ui: {
                                ...widgetConfig.ui,
                                animationType: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
                        >
                          <option value="slide">Slide Up</option>
                          <option value="fade">Fade In</option>
                          <option value="none">No Animation</option>
                        </select>
                      </div>
                      <div>
                        <label
                          className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                        >
                          Shadow Intensity
                        </label>
                        <select
                          value={widgetConfig.theme.shadowIntensity}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              theme: {
                                ...widgetConfig.theme,
                                shadowIntensity: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
                        >
                          <option value="light">Light</option>
                          <option value="medium">Medium</option>
                          <option value="heavy">Heavy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content Settings */}
                <div>
                  <h4
                    className={`text-sm font-semibold ${currentTheme.text} mb-2 sm:mb-3`}
                  >
                    Content & Branding
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={widgetConfig.content.companyName}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              content: {
                                ...widgetConfig.content,
                                companyName: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your Company"
                          maxLength="30"
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                        >
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={widgetConfig.content.subtitle}
                          onChange={(e) =>
                            setWidgetConfig({
                              ...widgetConfig,
                              content: {
                                ...widgetConfig.content,
                                subtitle: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="AI-Powered Support"
                          maxLength="40"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                      >
                        Welcome Message
                      </label>
                      <textarea
                        value={widgetConfig.content.welcomeMessage}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            content: {
                              ...widgetConfig.content,
                              welcomeMessage: e.target.value,
                            },
                          })
                        }
                        rows="3"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Hi! I'm your AI assistant. How can I help you today?"
                        maxLength="150"
                      />
                      <div className="text-xs text-gray-400 mt-1 flex justify-between">
                        <span>
                          {widgetConfig.content.welcomeMessage.length}/150
                          characters
                        </span>
                        <span
                          className={`${
                            widgetConfig.content.welcomeMessage.length > 120
                              ? "text-orange-500"
                              : "text-gray-400"
                          }`}
                        >
                          {widgetConfig.content.welcomeMessage.length > 120
                            ? "Getting long"
                            : "Good length"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-xs ${currentTheme.textSecondary} mb-1.5`}
                      >
                        Input Placeholder
                      </label>
                      <input
                        type="text"
                        value={widgetConfig.content.placeholderText}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            content: {
                              ...widgetConfig.content,
                              placeholderText: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type your message..."
                        maxLength="50"
                      />
                    </div>
                  </div>
                </div>

                {/* Features - Mobile Enhanced */}
                <div>
                  <h4
                    className={`text-sm font-semibold ${currentTheme.text} mb-2 sm:mb-3`}
                  >
                    Widget Features
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-start sm:items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={widgetConfig.features.chatEnabled}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            features: {
                              ...widgetConfig.features,
                              chatEnabled: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <div className="flex-1">
                        <span
                          className={`text-sm font-medium ${currentTheme.text} block`}
                        >
                          Chat Mode
                        </span>
                        <span
                          className={`text-xs ${currentTheme.textSecondary} block mt-0.5`}
                        >
                          Enable text-based conversations with AI
                        </span>
                      </div>
                      <MessageSquare className="w-5 h-5 text-blue-500 shrink-0" />
                    </label>

                    <label className="flex items-start sm:items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={widgetConfig.features.voiceEnabled}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            features: {
                              ...widgetConfig.features,
                              voiceEnabled: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <div className="flex-1">
                        <span
                          className={`text-sm font-medium ${currentTheme.text} block`}
                        >
                          Voice Mode
                        </span>
                        <span
                          className={`text-xs ${currentTheme.textSecondary} block mt-0.5`}
                        >
                          Enable voice calls with AI assistant
                        </span>
                      </div>
                      <Phone className="w-5 h-5 text-green-500 shrink-0" />
                    </label>

                    <label className="flex items-start sm:items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={widgetConfig.features.soundEffects}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            features: {
                              ...widgetConfig.features,
                              soundEffects: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <div className="flex-1">
                        <span
                          className={`text-sm font-medium ${currentTheme.text} block`}
                        >
                          Sound Effects
                        </span>
                        <span
                          className={`text-xs ${currentTheme.textSecondary} block mt-0.5`}
                        >
                          Play notification sounds for interactions
                        </span>
                      </div>
                      <Volume2 className="w-5 h-5 text-purple-500 shrink-0" />
                    </label>

                    <label className="flex items-start sm:items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={widgetConfig.features.showBranding}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            features: {
                              ...widgetConfig.features,
                              showBranding: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <div className="flex-1">
                        <span
                          className={`text-sm font-medium ${currentTheme.text} block`}
                        >
                          Show Branding
                        </span>
                        <span
                          className={`text-xs ${currentTheme.textSecondary} block mt-0.5`}
                        >
                          Display "Powered by ShivAI" footer
                        </span>
                      </div>
                      <BotIcon className="w-5 h-5 text-indigo-500 shrink-0" />
                    </label>

                    <label className="flex items-start sm:items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={widgetConfig.features.autoOpen}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            features: {
                              ...widgetConfig.features,
                              autoOpen: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <div className="flex-1">
                        <span
                          className={`text-sm font-medium ${currentTheme.text} block`}
                        >
                          Auto Open
                        </span>
                        <span
                          className={`text-xs ${currentTheme.textSecondary} block mt-0.5`}
                        >
                          Automatically open widget after 3 seconds
                        </span>
                      </div>
                      <Play className="w-5 h-5 text-orange-500 shrink-0" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Panel - Mobile First Priority */}
            <div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 sm:p-6 order-1 xl:order-2`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-base sm:text-lg font-semibold ${currentTheme.text}`}
                  >
                    Live Preview
                  </h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    Real-time
                  </span>
                </div>

                {/* Enhanced Controls */}
                <div className="flex items-center gap-2">
                  {/* Responsive Device Toggle */}
                  <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setPreviewDevice("mobile")}
                      className={`p-2 rounded-md transition-colors touch-manipulation ${
                        previewDevice === "mobile"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Mobile Preview (375px)"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice("tablet")}
                      className={`hidden sm:flex p-2 rounded-md transition-colors touch-manipulation ${
                        previewDevice === "tablet"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Tablet Preview (768px)"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice("desktop")}
                      className={`hidden md:flex p-2 rounded-md transition-colors touch-manipulation ${
                        previewDevice === "desktop"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Desktop Preview (1200px)"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                    className={`p-2 rounded-md transition-colors touch-manipulation ${
                      isPreviewFullscreen
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                    title={
                      isPreviewFullscreen
                        ? "Exit Fullscreen"
                        : "Fullscreen Preview"
                    }
                  >
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div
                className={`relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                  isPreviewFullscreen
                    ? "fixed inset-4 z-50 rounded-2xl shadow-2xl"
                    : ""
                }`}
                style={{
                  height: isPreviewFullscreen
                    ? "calc(100vh - 2rem)"
                    : previewDevice === "mobile"
                    ? "90vh"
                    : previewDevice === "tablet"
                    ? "75vh"
                    : "70vh",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                  {/* Enhanced Preview Header */}
                  <div
                    className={`text-center mb-4 ${
                      isPreviewFullscreen ? "mb-8" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      {isPreviewFullscreen && (
                        <button
                          onClick={() => setIsPreviewFullscreen(false)}
                          className="px-3 py-1 bg-white/80 hover:bg-white text-gray-600 rounded-full text-xs font-medium transition-colors"
                        >
                          Exit Fullscreen
                        </button>
                      )}
                    </div>
                    <h4
                      className={`font-semibold text-gray-800 mb-1 ${
                        isPreviewFullscreen ? "text-lg" : "text-sm"
                      }`}
                    >
                      Client Website Preview (
                      {previewDevice === "mobile"
                        ? "375px"
                        : previewDevice === "tablet"
                        ? "768px"
                        : "1200px"}
                      )
                    </h4>
                    <p
                      className={`text-gray-600 ${
                        isPreviewFullscreen ? "text-sm" : "text-xs"
                      }`}
                    >
                      Real-time widget simulation •{" "}
                      {previewMode === "chat" ? "Chat Mode" : "Voice Mode"}
                    </p>
                  </div>

                  {/* Preview widget container */}
                  <div className="relative h-full">{renderPreviewWidget()}</div>
                </div>
              </div>
              {/* Preview Controls - Mobile Optimized */}
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
                <StyledButton
                  onClick={() => setIsWidgetOpen(!isWidgetOpen)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium touch-manipulation"
                  title={isWidgetOpen ? "Close Widget" : "Open Widget"}
                >
                  {isWidgetOpen ? <Eye size={16} /> : <Play size={16} />}
                  <span>{isWidgetOpen ? "Close Widget" : "Open Widget"}</span>
                </StyledButton>
                <StyledButton
                  onClick={() =>
                    setPreviewMode(previewMode === "chat" ? "voice" : "chat")
                  }
                  className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium touch-manipulation min-w-0 sm:w-auto"
                  title={`Switch to ${
                    previewMode === "chat" ? "Voice" : "Chat"
                  } Mode`}
                >
                  {previewMode === "chat" ? (
                    <Phone size={16} />
                  ) : (
                    <MessageSquare size={16} />
                  )}
                  <span className="hidden sm:inline">
                    {previewMode === "chat" ? "Voice" : "Chat"}
                  </span>
                </StyledButton>
                <StyledButton
                  onClick={() => setIsWidgetOpen(false)}
                  className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium touch-manipulation"
                  title="Reset Widget"
                >
                  <RotateCcw size={16} />
                  Reset
                </StyledButton>
              </div>
            </div>
          </div>
        )}

        {activeTab === "integration" && (
          <div className="space-y-4 sm:space-y-6">
            <div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 sm:p-6`}
            >
              <h3
                className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-3 sm:mb-4`}
              >
                Widget Integration
              </h3>

              {/* Embed Code - Mobile Responsive */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                  <label
                    className={`text-sm font-semibold ${currentTheme.text}`}
                  >
                    Embed Code
                  </label>
                  <StyledButton
                    onClick={() =>
                      copyToClipboard(
                        `<script src="https://cdn.shivai.com/widget.js" data-client-id="CLIENT_123"></script>`
                      )
                    }
                    className="flex items-center justify-center gap-2 px-3 py-2 sm:py-1 text-sm touch-manipulation"
                    title={copied ? "Copied!" : "Copy Code"}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy Code"}</span>
                  </StyledButton>
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto">
                    {`<script src="https://cdn.shivai.com/widget.js" data-client-id="CLIENT_123"></script>`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<script src="https://cdn.shivai.com/widget.js" data-client-id="CLIENT_123"></script>`
                      )
                    }
                    className="sm:hidden absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs"
                    title="Copy Code"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>

              {/* Advanced Configuration - Mobile Enhanced */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 sm:mb-3">
                  <label
                    className={`text-sm font-semibold ${currentTheme.text}`}
                  >
                    Advanced Configuration (Optional)
                  </label>
                  <StyledButton
                    onClick={() =>
                      copyToClipboard(`<script>
  window.ShivAIConfig = ${JSON.stringify(widgetConfig, null, 2)};
</script>
<script src="https://cdn.shivai.com/widget.js" data-client-id="CLIENT_123"></script>`)
                    }
                    className="flex items-center justify-center gap-2 px-3 py-2 sm:py-1 text-sm touch-manipulation"
                    title="Copy Configuration"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>Copy Config</span>
                  </StyledButton>
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto max-h-40 sm:max-h-60 overflow-y-auto">
                    {`<script>
  window.ShivAIConfig = ${JSON.stringify(widgetConfig, null, 2)};
</script>
<script src="https://cdn.shivai.com/widget.js" data-client-id="CLIENT_123"></script>`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(`<script>
  window.ShivAIConfig = ${JSON.stringify(widgetConfig, null, 2)};
</script>
<script src="https://cdn.shivai.com/widget.js" data-client-id="CLIENT_123"></script>`)
                    }
                    className="sm:hidden absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs"
                    title="Copy Configuration"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>

              {/* Action Buttons - Mobile Stack */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <StyledButton
                  className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium touch-manipulation"
                  title="Download Script"
                >
                  <Download size={16} />
                  <span>Download Script</span>
                </StyledButton>
                <StyledButton
                  className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium touch-manipulation"
                  title="View Documentation"
                >
                  <ExternalLink size={16} />
                  <span>View Documentation</span>
                </StyledButton>
              </div>
            </div>

            {/* Success Message - Mobile Optimized */}
            <div className="p-4 sm:p-6 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2 text-sm sm:text-base">
                ✅ Widget System Ready!
              </h4>
              <p className="text-xs sm:text-sm text-green-800 mb-3 leading-relaxed">
                Your embeddable widget system is fully functional with Redux
                integration, live preview, and theme customization capabilities.
              </p>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-green-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <div>
                    <strong>Redux Integration:</strong> widgetSlice.js &
                    widgetService.js created
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <div>
                    <strong>Embeddable Script:</strong> public/widget.js ready
                    for CDN
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <div>
                    <strong>Theme System:</strong> JSON-based configuration
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <div>
                    <strong>Dual Mode:</strong> Chat and Voice functionality
                    like Shiv AI
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <div>
                    <strong>Live Preview:</strong> Real-time customization and
                    testing
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetManagementPlaceholder;