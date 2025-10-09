import React, { useState } from "react";
import {
  RiHome4Line,
  RiTeamLine,
  RiSettingsLine,
  RiCloseLine,
  RiMenuLine,
  RiSearchLine,
  RiUserLine,
  RiEyeLine,
  RiEditLine,
  RiAddLine,
  RiLogoutBoxLine,
  RiNotificationLine,
  RiSunLine,
  RiMoonLine,
  RiRobotLine,
  RiPulseLine,
  RiFlashlightLine,
  RiUserFollowLine,
  RiUserAddLine,
  RiBankCardLine,
  RiAlarmWarningLine,
  RiErrorWarningLine,
  RiQuestionLine,
  RiExternalLinkLine,
  RiVipCrownLine,
  RiMailLine,
  RiDownloadLine,
  RiBarChartBoxLine,
  RiFileList3Line,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import AIEmployeeStatsContainer from "./AIEmployeeStats";
import AnalyticsOptimized from "./components/AnalyticsOptimized";
import WidgetManagement from "./Widget/WidgetManagementPlaceholder";
import Shivlogo from "/ShivaiLogo.svg";
import bg from "/assets/Hero/bg.svg";
import "./AdminDashboard.css";
import {
  Users,
  DollarSign,
  Bot,
  HelpCircle,
  Briefcase,
  Crown,
  UserPlus,
  Package,
  BarChart3,
  CreditCard,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  Eye,
  ExternalLink,
  MessageSquare,
  UserCheck,
} from "lucide-react";

const AdminDashboardContent = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, toggleTheme, currentTheme } = useTheme();
  const navigate = useNavigate();

  const navItems = [
    {
      id: "dashboard",
      icon: RiHome4Line,
      label: "Dashboard",
      section: "dashboard",
    },
    {
      id: "clients",
      icon: RiTeamLine,
      label: "Client Management",
      section: "clients",
      badge: 24,
    },
    {
      id: "ai-employees",
      icon: RiPulseLine,
      label: "AI Employee Stats",
      section: "ai-employees",
      badge: "NEW",
    },
    {
      id: "widgets",
      icon: RiRobotLine,
      label: "Widget Management",
      section: "widgets",
      badge: "NEW",
    },
    {
      id: "transactions",
      icon: RiBankCardLine,
      label: "Transactions",
      section: "transactions",
      badge: 12,
    },
    {
      id: "support",
      icon: RiQuestionLine,
      label: "Support Tickets",
      section: "support",
      badge: 5,
    },
    {
      id: "analytics",
      icon: RiBarChartBoxLine,
      label: "Analytics",
      section: "analytics",
    },
    {
      id: "settings",
      icon: RiSettingsLine,
      label: "Settings",
      section: "settings",
    },
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    navigate("/");
  };

  const stats = [
    {
      label: "Active Clients",
      value: "2,847",
      change: "+12.5%",
      color: "from-blue-500 to-cyan-500",
      icon: Users,
      subtitle: "Paying subscriber",
    },
    {
      label: "Monthly Revenue",
      value: "$45.2K",
      change: "+18.2%",
      color: "from-green-500 to-emerald-500",
      icon: DollarSign,
      subtitle: "Subscription revenue",
    },
    {
      label: "AI Employees Deployed",
      value: "8,456",
      change: "+25.8%",
      color: "from-purple-500 to-indigo-500",
      icon: Bot,
      subtitle: "Serving clients",
    },
    {
      label: "Support Tickets",
      value: "23",
      change: "-15.3%",
      color: "from-orange-500 to-red-500",
      icon: HelpCircle,
      subtitle: "Open tickets",
    },
  ];

  // Mobile tab navigation component with theme toggle and menu tools
  const MobileTabNavigation = () => (
    <div
      className={`lg:hidden fixed top-0 left-0 right-0 z-30 flex flex-col ${currentTheme.cardBg} backdrop-blur-md border-b ${currentTheme.border}`}
      style={{ minHeight: "52px" }}
    >
      {/* Top row with theme toggle and menu tools */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-opacity-50 border-current">
        <div className="flex items-center ">
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`mr-2`}
          >
            {isMobileMenuOpen ? (
              <RiCloseLine className={`w-4 h-4 ${currentTheme.text}`} />
            ) : (
              <RiMenuLine className={`w-4 h-4 ${currentTheme.text}`} />
            )}
          </div>
          <span className={`text-sm font-medium ${currentTheme.text}`}>
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4 justify-end">
          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className={` rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            {theme === "dark" ? (
              <RiSunLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
            ) : (
              <RiMoonLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
            )}
          </div>

          {/* Notifications */}
          <div
            className={`relative  rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            <RiNotificationLine
              className={`w-4 h-4 ${currentTheme.textSecondary}`}
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </div>

          {/* User Profile */}
          <div
            className={`p-2 rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            <RiUserLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className={` rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            <RiLogoutBoxLine
              className={`w-4 h-4 ${currentTheme.textSecondary}`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 pt-12 lg:pt-0">
      {/* Stats Grid - Sliding Cards for Mobile */}
      <div className="relative">
        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group">
                <div
                  className={`${currentTheme.cardBg} border ${
                    currentTheme.border
                  } rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${
                    theme === "light"
                      ? currentTheme.cardShadow || "shadow-lg"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentTheme.activeBg}`}
                    >
                      <Icon className={`w-5 h-5 ${currentTheme.text}`} />
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-medium ${
                          stat.change.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
                  >
                    {stat.value}
                  </h3>
                  <p
                    className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                  >
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet Sliding Cards */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-3 md:gap-4 pb-2"
            style={{ width: "max-content" }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group flex-shrink-0 w-44 md:w-52">
                  <div
                    className={`${currentTheme.cardBg} border ${
                      currentTheme.border
                    } rounded-lg p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${
                      theme === "light"
                        ? currentTheme.cardShadow || "shadow-lg"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${currentTheme.activeBg}`}
                      >
                        <Icon
                          className={`w-4 h-4 md:w-5 md:h-5 ${currentTheme.text}`}
                        />
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-medium ${
                            stat.change.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`text-lg md:text-xl font-semibold ${currentTheme.text} mb-1`}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className={`text-xs md:text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                    >
                      {stat.label}
                    </p>
                    <p
                      className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                    >
                      {stat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="relative group">
            <div
              className={`absolute inset-0 rounded-lg md:rounded-xl bg-blue-500/5 ${
                theme === "light" ? "opacity-50" : ""
              }`}
            ></div>
            <div
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                currentTheme.border
              } p-4 md:p-5 ${
                theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
                <h2
                  className={`text-lg md:text-xl font-bold ${currentTheme.text} flex items-center gap-2`}
                >
                  <RiTeamLine className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                  Recent Client Activity
                </h2>
                <button
                  className="hidden admin-btn-primary  py-2 px-4"
                  type="button"
                >
                  <RiEyeLine className="w-4 h-4" />
                  <span className="hidden md:inline">View All Clients</span>
                  <span className="md:hidden">View All</span>
                </button>
              </div>

              {/* Desktop Grid */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-3 mb-4 md:mb-6">
                <div
                  className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                    >
                      <RiUserFollowLine
                        className={`w-3 h-3 ${currentTheme.text}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${currentTheme.text}`}
                    >
                      New Clients
                    </span>
                  </div>
                  <p className={`text-xl font-bold ${currentTheme.text}`}>12</p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    This month
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                    >
                      <RiBankCardLine
                        className={`w-3 h-3 ${currentTheme.text}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${currentTheme.text}`}
                    >
                      Transactions
                    </span>
                  </div>
                  <p className={`text-xl font-bold ${currentTheme.text}`}>
                    156
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    This week
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                    >
                      <RiErrorWarningLine
                        className={`w-3 h-3 ${currentTheme.text}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${currentTheme.text}`}
                    >
                      Expiring Plans
                    </span>
                  </div>
                  <p className={`text-xl font-bold ${currentTheme.text}`}>8</p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    Next 7 days
                  </p>
                </div>
              </div>

              {/* Mobile Sliding Cards */}
              <div className="sm:hidden overflow-x-auto scrollbar-hide mb-4 md:mb-6">
                <div
                  className="flex gap-3 pb-2"
                  style={{ width: "max-content" }}
                >
                  <div
                    className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <RiUserFollowLine
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${currentTheme.text}`}
                      >
                        New Clients
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${currentTheme.text}`}>
                      12
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      This month
                    </p>
                  </div>

                  <div
                    className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <RiBankCardLine
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${currentTheme.text}`}
                      >
                        Transactions
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${currentTheme.text}`}>
                      156
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      This week
                    </p>
                  </div>

                  <div
                    className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <RiErrorWarningLine
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${currentTheme.text}`}
                      >
                        Expiring Plans
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${currentTheme.text}`}>
                      8
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      Next 7 days
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <h3
                  className={`text-sm md:text-base font-semibold ${currentTheme.text} mb-3`}
                >
                  Recent Client Activities
                </h3>

                {/* Desktop List View */}
                <div className="hidden md:block space-y-2">
                  {[
                    {
                      name: "TechCorp Solutions",
                      aiEmployees: 12,
                      activity: "Upgraded to Premium",
                      status: "active",
                      plan: "Premium Plan",
                      lastActive: "2 hours ago",
                      revenue: "$2,400/mo",
                    },
                    {
                      name: "Marketing Masters",
                      aiEmployees: 8,
                      activity: "Added 3 new AI Employees",
                      status: "active",
                      plan: "Business Plan",
                      lastActive: "5 hours ago",
                      revenue: "$1,600/mo",
                    },
                    {
                      name: "DataFlow Industries",
                      aiEmployees: 15,
                      activity: "Requested custom AI model",
                      status: "premium",
                      plan: "Enterprise Plan",
                      lastActive: "1 day ago",
                      revenue: "$4,200/mo",
                    },
                    {
                      name: "Creative Studios Inc",
                      aiEmployees: 5,
                      activity: "Payment processed successfully",
                      status: "active",
                      plan: "Starter Plan",
                      lastActive: "3 hours ago",
                      revenue: "$800/mo",
                    },
                  ].map((client, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 md:p-4 rounded-lg ${currentTheme.hover} transition-colors border ${currentTheme.border}`}
                    >
                      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 ${currentTheme.activeBg} rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                          <Briefcase
                            className={`w-4 h-4 md:w-5 md:h-5 ${currentTheme.text}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p
                              className={`${currentTheme.text} font-medium text-sm md:text-base truncate`}
                            >
                              {client.name}
                            </p>
                            {client.status === "premium" && (
                              <RiVipCrownLine className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <p
                            className={`${currentTheme.textSecondary} text-xs truncate`}
                          >
                            {client.activity}
                          </p>
                          <p
                            className={`${currentTheme.textSecondary} text-xs hidden sm:block`}
                          >
                            {client.aiEmployees} AI Employees • {client.plan}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p
                            className={`${currentTheme.text} font-medium text-xs md:text-sm`}
                          >
                            {client.revenue}
                          </p>
                          <p
                            className={`${currentTheme.textSecondary} text-xs`}
                          >
                            {client.lastActive}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-blue-500/20 rounded transition-colors">
                            <RiEyeLine className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-500/20 rounded transition-colors hidden sm:block">
                            <RiExternalLinkLine className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Sliding Cards */}
                <div className="md:hidden overflow-x-auto scrollbar-hide">
                  <div
                    className="flex gap-3 pb-2"
                    style={{ width: "max-content" }}
                  >
                    {[
                      {
                        name: "TechCorp Solutions",
                        aiEmployees: 12,
                        activity: "Upgraded to Premium",
                        status: "active",
                        plan: "Premium Plan",
                        lastActive: "2 hours ago",
                        revenue: "$2,400/mo",
                      },
                      {
                        name: "Marketing Masters",
                        aiEmployees: 8,
                        activity: "Added 3 new AI Employees",
                        status: "active",
                        plan: "Business Plan",
                        lastActive: "5 hours ago",
                        revenue: "$1,600/mo",
                      },
                      {
                        name: "DataFlow Industries",
                        aiEmployees: 15,
                        activity: "Requested custom AI model",
                        status: "premium",
                        plan: "Enterprise Plan",
                        lastActive: "1 day ago",
                        revenue: "$4,200/mo",
                      },
                      {
                        name: "Creative Studios Inc",
                        aiEmployees: 5,
                        activity: "Payment processed successfully",
                        status: "active",
                        plan: "Starter Plan",
                        lastActive: "3 hours ago",
                        revenue: "$800/mo",
                      },
                    ].map((client, index) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 w-64 p-3 rounded-lg ${
                          currentTheme.cardBg
                        } border ${currentTheme.border} ${
                          theme === "light"
                            ? currentTheme.cardShadow || "shadow-sm"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-8 h-8 ${currentTheme.activeBg} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <Briefcase
                              className={`w-4 h-4 ${currentTheme.text}`}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p
                                className={`${currentTheme.text} font-medium text-sm truncate`}
                              >
                                {client.name}
                              </p>
                              {client.status === "premium" && (
                                <Crown
                                  className={`w-3 h-3 ${currentTheme.textSecondary} flex-shrink-0`}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        <p
                          className={`${currentTheme.textSecondary} text-xs mb-2`}
                        >
                          {client.activity}
                        </p>

                        <div className="flex justify-between items-center mb-2">
                          <p
                            className={`${currentTheme.textSecondary} text-xs`}
                          >
                            {client.aiEmployees} AI Employees
                          </p>
                          <p
                            className={`${currentTheme.text} font-medium text-xs`}
                          >
                            {client.revenue}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <p
                            className={`${currentTheme.textSecondary} text-xs`}
                          >
                            {client.lastActive}
                          </p>
                          <button className="p-1 hover:bg-blue-500/20 rounded transition-colors">
                            <RiEyeLine className="w-3 h-3 text-blue-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-4 md:space-y-6">
          {/* Quick Actions */}
          <div className="relative group">
            <div
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                currentTheme.border
              } p-4 md:p-5 ${
                theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
              }`}
            >
              <h3
                className={`text-base md:text-lg font-bold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
              >
                <RiFlashlightLine className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                Quick Actions
              </h3>
              <div className="space-y-2 md:space-y-3">
                {[
                  {
                    icon: UserPlus,
                    label: "Add New Client",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Package,
                    label: "Create Service Plan",
                    color: "from-purple-500 to-indigo-500",
                  },
                  {
                    icon: BarChart3,
                    label: "Revenue Report",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: HelpCircle,
                    label: "Support Center",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg ${currentTheme.hover} transition-all duration-200 border ${currentTheme.border} group`}
                    >
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                      </div>
                      <span
                        className={`${currentTheme.text} text-sm md:text-base font-medium truncate`}
                      >
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="relative group">
            <div
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                currentTheme.border
              } p-4 md:p-5 ${
                theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
              }`}
            >
              <h3
                className={`text-base md:text-lg font-bold ${currentTheme.text} mb-3 md:mb-4 flex items-center gap-2`}
              >
                <RiPulseLine className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                Recent Transactions
              </h3>
              {/* Desktop List View */}
              <div className="hidden md:block space-y-2 md:space-y-3">
                {[
                  {
                    action: "Payment received",
                    user: "TechCorp Solutions",
                    amount: "$2,400",
                    time: "2 minutes ago",
                    type: "payment",
                    icon: CreditCard,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    action: "New client registered",
                    user: "DataFlow Industries",
                    amount: "Enterprise Plan",
                    time: "15 minutes ago",
                    type: "registration",
                    icon: UserPlus,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    action: "Plan upgraded",
                    user: "Creative Studios Inc",
                    amount: "+$400/mo",
                    time: "1 hour ago",
                    type: "upgrade",
                    icon: TrendingUp,
                    color: "from-purple-500 to-indigo-500",
                  },
                  {
                    action: "Support ticket resolved",
                    user: "Marketing Masters",
                    amount: "Ticket #2847",
                    time: "2 hours ago",
                    type: "support",
                    icon: CheckCircle,
                    color: "from-orange-500 to-red-500",
                  },
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg ${currentTheme.hover} transition-colors`}
                    >
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`${currentTheme.text} font-medium text-xs md:text-sm`}
                        >
                          {activity.action}
                        </p>
                        <p
                          className={`${currentTheme.textSecondary} text-xs truncate`}
                        >
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className={`${currentTheme.text} font-medium text-xs`}
                        >
                          {activity.amount}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Sliding Cards */}
              <div className="md:hidden overflow-x-auto scrollbar-hide">
                <div
                  className="flex gap-3 pb-2"
                  style={{ width: "max-content" }}
                >
                  {[
                    {
                      action: "Payment received",
                      user: "TechCorp Solutions",
                      amount: "$2,400",
                      time: "2 minutes ago",
                      type: "payment",
                      icon: CreditCard,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      action: "New client registered",
                      user: "DataFlow Industries",
                      amount: "Enterprise Plan",
                      time: "15 minutes ago",
                      type: "registration",
                      icon: UserPlus,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      action: "Plan upgraded",
                      user: "Creative Studios Inc",
                      amount: "+$400/mo",
                      time: "1 hour ago",
                      type: "upgrade",
                      icon: TrendingUp,
                      color: "from-purple-500 to-indigo-500",
                    },
                    {
                      action: "Support ticket resolved",
                      user: "Marketing Masters",
                      amount: "Ticket #2847",
                      time: "2 hours ago",
                      type: "support",
                      icon: CheckCircle,
                      color: "from-orange-500 to-red-500",
                    },
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={index}
                        className={`flex-shrink-0 w-56 p-3 rounded-lg ${
                          currentTheme.cardBg
                        } border ${currentTheme.border} ${
                          theme === "light"
                            ? currentTheme.cardShadow || "shadow-sm"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-8 h-8 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`${currentTheme.text} font-medium text-xs truncate`}
                            >
                              {activity.action}
                            </p>
                          </div>
                        </div>

                        <p
                          className={`${currentTheme.textSecondary} text-xs mb-2 truncate`}
                        >
                          {activity.user}
                        </p>

                        <div className="flex justify-between items-center">
                          <p
                            className={`${currentTheme.textSecondary} text-xs`}
                          >
                            {activity.time}
                          </p>
                          <p
                            className={`${currentTheme.text} font-medium text-xs`}
                          >
                            {activity.amount}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClients = () => {
    const clientStats = [
      {
        label: "Total Clients",
        value: "2,847",
        change: "+12%",
        subtitle: "Paying subscribers",
        icon: Users,
      },
      {
        label: "Active Clients",
        value: "2,423",
        change: "+5%",
        subtitle: "Currently active",
        icon: UserCheck,
      },
      {
        label: "New This Month",
        value: "156",
        change: "+23%",
        subtitle: "New registrations",
        icon: UserPlus,
      },
      {
        label: "Enterprise Clients",
        value: "247",
        change: "+18%",
        subtitle: "Enterprise plans",
        icon: Crown,
      },
    ];

    return (
      <div className="space-y-4 md:space-y-6 lg:space-y-8 pt-12 lg:pt-0 px-2 sm:px-0">
        {/* Client Stats Grid - Matching Dashboard Layout */}
        <div className="relative hidden">
          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
            {clientStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group">
                  <div
                    className={`${currentTheme.cardBg} border ${
                      currentTheme.border
                    } rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${
                      theme === "light"
                        ? currentTheme.cardShadow || "shadow-lg"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentTheme.activeBg}`}
                      >
                        <Icon className={`w-5 h-5 ${currentTheme.text}`} />
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-medium ${
                            stat.change.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                    >
                      {stat.label}
                    </p>
                    <p
                      className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                    >
                      {stat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet Sliding Cards */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div
              className="flex gap-3 md:gap-4 pb-2"
              style={{ width: "max-content" }}
            >
              {clientStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group flex-shrink-0 w-44 md:w-52">
                    <div
                      className={`${currentTheme.cardBg} border ${
                        currentTheme.border
                      } rounded-lg p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${
                        theme === "light"
                          ? currentTheme.cardShadow || "shadow-lg"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${currentTheme.activeBg} flex items-center justify-center shadow-lg`}
                        >
                          <Icon
                            className={`w-4 h-4 md:w-5 md:h-5 ${currentTheme.text}`}
                          />
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-medium ${
                              stat.change.startsWith("+")
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <h3
                        className={`text-lg md:text-xl font-semibold ${currentTheme.text} mb-1`}
                      >
                        {stat.value}
                      </h3>
                      <p
                        className={`text-xs md:text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
                      >
                        {stat.label}
                      </p>
                      <p
                        className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                      >
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Grid - Matching Dashboard Pattern */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Client Management Activity */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="relative group">
              <div
                className={`absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-400/10 blur-xl group-hover:blur-2xl transition-all duration-300 ${
                  theme === "light" ? "opacity-50" : ""
                }`}
              ></div>
              <div
                className={`relative ${
                  currentTheme.cardBg
                } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                  currentTheme.border
                } p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  theme === "light"
                    ? "shadow-gray-200/50"
                    : "shadow-gray-900/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
                  <h2
                    className={`text-lg md:text-xl font-bold ${currentTheme.text} flex items-center gap-2`}
                  >
                    <RiTeamLine className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                    Client Management
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <RiSearchLine
                        className={`absolute hidden lg:flex left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                      <input
                        type="text"
                        placeholder="Search clients..."
                        className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                  </div>
                </div>

                {/* Desktop Grid - Quick Stats */}
                <div className="hidden sm:grid sm:grid-cols-3 gap-3 mb-4 md:mb-6">
                  <div
                    className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <RiUserFollowLine
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${currentTheme.text}`}
                      >
                        New Clients
                      </span>
                    </div>
                    <p className={`text-xl font-bold ${currentTheme.text}`}>
                      12
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      This month
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <RiBankCardLine
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${currentTheme.text}`}
                      >
                        Premium Plans
                      </span>
                    </div>
                    <p className={`text-xl font-bold ${currentTheme.text}`}>
                      247
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      Active subscriptions
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 h-6 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                      >
                        <RiAlarmWarningLine
                          className={`w-3 h-3 ${currentTheme.text}`}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${currentTheme.text}`}
                      >
                        Expiring Soon
                      </span>
                    </div>
                    <p className={`text-xl font-bold ${currentTheme.text}`}>
                      8
                    </p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      Next 7 days
                    </p>
                  </div>
                </div>

                {/* Mobile Sliding Cards */}
                <div className="sm:hidden overflow-x-auto scrollbar-hide mb-4 md:mb-6">
                  <div
                    className="flex gap-3 pb-2"
                    style={{ width: "max-content" }}
                  >
                    <div
                      className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                        >
                          <UserCheck
                            className={`w-3 h-3 ${currentTheme.text}`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${currentTheme.text}`}
                        >
                          New Clients
                        </span>
                      </div>
                      <p className={`text-lg font-bold ${currentTheme.text}`}>
                        12
                      </p>
                      <p className={`text-xs ${currentTheme.textSecondary}`}>
                        This month
                      </p>
                    </div>

                    <div
                      className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                        >
                          <CreditCard
                            className={`w-3 h-3 ${currentTheme.text}`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${currentTheme.text}`}
                        >
                          Premium Plans
                        </span>
                      </div>
                      <p className={`text-lg font-bold ${currentTheme.text}`}>
                        247
                      </p>
                      <p className={`text-xs ${currentTheme.textSecondary}`}>
                        Active subscriptions
                      </p>
                    </div>

                    <div
                      className={`flex-shrink-0 w-44 p-3 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-5 h-5 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}
                        >
                          <RiErrorWarningLine
                            className={`w-3 h-3 ${currentTheme.text}`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${currentTheme.text}`}
                        >
                          Expiring Soon
                        </span>
                      </div>
                      <p className={`text-lg font-bold ${currentTheme.text}`}>
                        8
                      </p>
                      <p className={`text-xs ${currentTheme.textSecondary}`}>
                        Next 7 days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Client List */}
                <div className="space-y-3">
                  {[
                    {
                      name: "John Smith",
                      email: "john@techcorp.com",
                      company: "TechCorp Inc.",
                      role: "Admin",
                      status: "active",
                      lastSeen: "2 mins ago",
                      tasksCompleted: 145,
                    },
                    {
                      name: "Sarah Johnson",
                      email: "sarah@abc.com",
                      company: "ABC Solutions",
                      role: "Manager",
                      status: "active",
                      lastSeen: "1 hour ago",
                      tasksCompleted: 89,
                    },
                    {
                      name: "Mike Chen",
                      email: "mike@startup.com",
                      company: "Startup Co.",
                      role: "User",
                      status: "inactive",
                      lastSeen: "2 days ago",
                      tasksCompleted: 23,
                    },
                    {
                      name: "Emily Davis",
                      email: "emily@design.co",
                      company: "Design Co.",
                      role: "Designer",
                      status: "pending",
                      lastSeen: "Never",
                      tasksCompleted: 0,
                    },
                  ].map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl border ${currentTheme.border} ${currentTheme.hover} shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <RiUserLine className="w-6 h-6 text-gray-600" />
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                              theme === "light"
                                ? "border-white"
                                : "border-gray-900"
                            } ${
                              user.status === "active"
                                ? "bg-green-500"
                                : user.status === "inactive"
                                ? "bg-gray-400"
                                : "bg-yellow-500"
                            }`}
                          ></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`${currentTheme.text} font-semibold`}>
                              {user.name}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                user.role === "Admin"
                                  ? theme === "light"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-red-500/20 text-red-400"
                                  : user.role === "Manager"
                                  ? theme === "light"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-blue-500/20 text-blue-400"
                                  : user.role === "Designer"
                                  ? theme === "light"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-purple-500/20 text-purple-400"
                                  : theme === "light"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {user.role}
                            </span>
                          </div>
                          <p
                            className={`${currentTheme.textSecondary} text-sm`}
                          >
                            {user.email} • {user.company}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <p
                              className={`${currentTheme.textSecondary} text-xs`}
                            >
                              Last seen: {user.lastSeen}
                            </p>
                            <p
                              className={`${currentTheme.textSecondary} text-xs`}
                            >
                              Tasks: {user.tasksCompleted}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? theme === "light"
                                ? "bg-green-100 text-green-700"
                                : "bg-green-500/20 text-green-400"
                              : user.status === "inactive"
                              ? theme === "light"
                                ? "bg-red-100 text-red-700"
                                : "bg-red-500/20 text-red-400"
                              : theme === "light"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {user.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="p-2  rounded-lg transition-all duration-300 hover:bg-white cursor-pointer">
                            <RiEyeLine className="w-4 h-4" />
                          </button>
                          <button className="p-2  rounded-lg transition-all duration-300 hover:bg-white cursor-pointer">
                            <RiEditLine className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Client Activity */}
            <div className="relative group">
              <div
                className={`absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-400/10 blur-xl group-hover:blur-2xl transition-all duration-300 ${
                  theme === "light" ? "opacity-50" : ""
                }`}
              ></div>
              <div
                className={`relative ${
                  currentTheme.cardBg
                } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                  currentTheme.border
                } p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  theme === "light"
                    ? "shadow-green-200/30"
                    : "shadow-green-900/30"
                }`}
              >
                <h3
                  className={`font-semibold ${currentTheme.text} mb-3 md:mb-4 text-sm md:text-base`}
                >
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      user: "John Smith",
                      action: "Updated profile",
                      time: "2 mins ago",
                      type: "update",
                    },
                    {
                      user: "Sarah Johnson",
                      action: "Created new task",
                      time: "15 mins ago",
                      type: "create",
                    },
                    {
                      user: "Mike Chen",
                      action: "Logged in",
                      time: "1 hour ago",
                      type: "login",
                    },
                    {
                      user: "Emily Davis",
                      action: "Account created",
                      time: "2 hours ago",
                      type: "signup",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "create"
                            ? "bg-green-500"
                            : activity.type === "update"
                            ? "bg-blue-500"
                            : activity.type === "login"
                            ? "bg-purple-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`${currentTheme.text} text-xs md:text-sm font-medium`}
                        >
                          {activity.user}
                        </p>
                        <p className={`${currentTheme.textSecondary} text-xs`}>
                          {activity.action}
                        </p>
                        <p className={`${currentTheme.textSecondary} text-xs`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative group">
              <div
                className={`absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-400/10 blur-xl group-hover:blur-2xl transition-all duration-300 ${
                  theme === "light" ? "opacity-50" : ""
                }`}
              ></div>
              <div
                className={`relative ${
                  currentTheme.cardBg
                } backdrop-blur-lg rounded-lg md:rounded-xl border ${
                  currentTheme.border
                } p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  theme === "light"
                    ? "shadow-purple-200/30"
                    : "shadow-purple-900/30"
                }`}
              >
                <h3
                  className={`font-semibold ${currentTheme.text} mb-3 md:mb-4 text-sm md:text-base`}
                >
                  Quick Actions
                </h3>
                <div className="flex  gap-3 items-center flex-wrap">
                  <button className="admin-btn-primary  py-2 px-4">
                    <RiUserAddLine className="w-4 h-4" />
                    Invite Client
                  </button>

                  <button className="admin-btn-primary px-4 py-2">
                    <RiDownloadLine className="w-4 h-4" />
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: "$142.5K",
            change: "+18%",
            color: "from-green-500 to-emerald-500",
            icon: DollarSign,
          },
          {
            label: "This Month",
            value: "$45.2K",
            change: "+12%",
            color: "from-blue-500 to-cyan-500",
            icon: TrendingUp,
          },
          {
            label: "Transactions",
            value: "1,247",
            change: "+23%",
            color: "from-purple-500 to-indigo-500",
            icon: CreditCard,
          },
          {
            label: "Pending",
            value: "$8.3K",
            change: "-5%",
            color: "from-orange-500 to-red-500",
            icon: Clock,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-xl border ${currentTheme.border} p-4 ${
                theme === "light" ? currentTheme.cardShadow || "shadow-md" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentTheme.activeBg}`}
                >
                  <Icon className={`w-5 h-5 ${currentTheme.text}`} />
                </div>
                <span
                  className={`text-xs font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className={`text-xl font-bold ${currentTheme.text}`}>
                {stat.value}
              </h3>
              <p className={`${currentTheme.textSecondary} text-sm`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* AI Employee Management */}
      <div className="relative group">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-indigo-600/10 blur-xl ${
            theme === "light" ? "opacity-50" : ""
          }`}
        ></div>
        <div
          className={`relative ${
            currentTheme.cardBg
          } backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6 ${
            theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2
              className={`text-xl font-bold ${currentTheme.text} flex items-center gap-3`}
            >
              <RiBankCardLine className="w-6 h-6 text-green-500" />
              Transaction History
            </h2>
            <div className="flex items-center gap-3">
              <select
                className={`px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20`}
              >
                <option>All Transactions</option>
                <option>Successful</option>
                <option>Pending</option>
                <option>Failed</option>
                <option>Refunded</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2  rounded-lg transition-all duration-300 hover:bg-white cursor-pointer text-sm font-medium">
                <RiAddLine className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "TXN-2024-001",
                client: "TechCorp Solutions",
                amount: "$2,400.00",
                plan: "Premium Plan",
                status: "completed",
                method: "Credit Card",
                date: "2024-01-15 14:23:45",
                aiEmployees: 12,
                type: "subscription",
              },
              {
                id: "TXN-2024-002",
                client: "DataFlow Industries",
                amount: "$4,200.00",
                plan: "Enterprise Plan",
                status: "completed",
                method: "Bank Transfer",
                date: "2024-01-15 09:15:22",
                aiEmployees: 15,
                type: "subscription",
              },
              {
                id: "TXN-2024-003",
                client: "Creative Studios Inc",
                amount: "$800.00",
                plan: "Starter Plan",
                status: "pending",
                method: "Credit Card",
                date: "2024-01-15 11:45:12",
                aiEmployees: 5,
                type: "subscription",
              },
              {
                id: "TXN-2024-004",
                client: "Marketing Masters",
                amount: "$1,600.00",
                plan: "Business Plan",
                status: "completed",
                method: "PayPal",
                date: "2024-01-14 16:30:08",
                aiEmployees: 8,
                type: "upgrade",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-colors`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                        <RiBankCardLine className="w-7 h-7 text-gray-600" />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 ${
                          theme === "light" ? "border-white" : "border-gray-900"
                        } ${
                          transaction.status === "completed"
                            ? "bg-green-500"
                            : transaction.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className={`${currentTheme.text} font-bold text-lg`}
                        >
                          {transaction.id}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === "completed"
                              ? theme === "light"
                                ? "bg-green-100 text-green-700"
                                : "bg-green-500/20 text-green-400"
                              : transaction.status === "pending"
                              ? theme === "light"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-yellow-500/20 text-yellow-400"
                              : theme === "light"
                              ? "bg-red-100 text-red-700"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                      <p className={`${currentTheme.text} font-medium mb-1`}>
                        {transaction.client}
                      </p>
                      <p className={`${currentTheme.textSecondary} text-sm`}>
                        {transaction.plan} • {transaction.aiEmployees} AI
                        Employees
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${currentTheme.text} mb-1`}
                    >
                      {transaction.amount}
                    </div>
                    <div className={`${currentTheme.textSecondary} text-xs`}>
                      {transaction.type}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "light" ? "bg-blue-50" : "bg-blue-500/10"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "light" ? "text-blue-700" : "text-blue-400"
                      }`}
                    >
                      {transaction.method}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "light" ? "text-blue-600" : "text-blue-500"
                      }`}
                    >
                      Payment Method
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "light" ? "bg-purple-50" : "bg-purple-500/10"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "light"
                          ? "text-purple-700"
                          : "text-purple-400"
                      }`}
                    >
                      {transaction.date.split(" ")[0]}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "light"
                          ? "text-purple-600"
                          : "text-purple-500"
                      }`}
                    >
                      Transaction Date
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "light" ? "bg-green-50" : "bg-green-500/10"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "light" ? "text-green-700" : "text-green-400"
                      }`}
                    >
                      {transaction.date.split(" ")[1]}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "light" ? "text-green-600" : "text-green-500"
                      }`}
                    >
                      Time
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${currentTheme.textSecondary} text-sm mb-1`}>
                      Transaction Details:
                    </p>
                    <p className={`${currentTheme.text} font-medium text-sm`}>
                      Monthly subscription for {transaction.aiEmployees} AI
                      Employees
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-2 ${currentTheme.hover} rounded-lg transition-colors`}
                    >
                      <Eye
                        className={`w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                    </button>
                    <button
                      className={`p-2 ${currentTheme.hover} rounded-lg transition-colors`}
                    >
                      <ExternalLink
                        className={`w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-4 md:space-y-6 pt-16 lg:pt-0">
      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Open Tickets",
            value: "23",
            change: "-15%",
            color: "from-orange-500 to-red-500",
            icon: HelpCircle,
          },
          {
            label: "Resolved Today",
            value: "12",
            change: "+25%",
            color: "from-green-500 to-emerald-500",
            icon: CheckCircle,
          },
          {
            label: "Avg Response Time",
            value: "2.3h",
            change: "-18%",
            color: "from-blue-500 to-cyan-500",
            icon: Clock,
          },
          {
            label: "Satisfaction Score",
            value: "4.8/5",
            change: "+5%",
            color: "from-purple-500 to-indigo-500",
            icon: Award,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`relative ${
                currentTheme.cardBg
              } backdrop-blur-lg rounded-xl border ${currentTheme.border} p-4 ${
                theme === "light" ? currentTheme.cardShadow || "shadow-md" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentTheme.activeBg}`}
                >
                  <Icon className={`w-5 h-5 ${currentTheme.text}`} />
                </div>
                <span
                  className={`${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  } text-xs font-medium`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className={`text-xl font-bold ${currentTheme.text}`}>
                {stat.value}
              </h3>
              <p className={`${currentTheme.textSecondary} text-sm`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Support Tickets */}
      <div className="relative group">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-600/10 to-red-600/10 blur-xl ${
            theme === "light" ? "opacity-50" : ""
          }`}
        ></div>
        <div
          className={`relative ${
            currentTheme.cardBg
          } backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6 ${
            theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2
              className={`text-xl font-bold ${currentTheme.text} flex items-center gap-3`}
            >
              <RiQuestionLine className="w-6 h-6 text-orange-500" />
              Support Tickets
            </h2>
            <div className="flex items-center gap-3">
              <select
                className={`px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.searchBg} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
              >
                <option>All Tickets</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <button
                className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                style={{
                  background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                <RiAddLine className="w-4 h-4" />
                New Ticket
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "TICKET-2024-001",
                client: "TechCorp Solutions",
                subject: "AI Employee not responding to queries",
                priority: "high",
                status: "open",
                assignee: "Support Agent Sarah",
                created: "2024-01-15 14:23:45",
                category: "Technical Issue",
                messages: 3,
              },
              {
                id: "TICKET-2024-002",
                client: "DataFlow Industries",
                subject: "Request for additional AI Employee features",
                priority: "medium",
                status: "in_progress",
                assignee: "Support Agent Marcus",
                created: "2024-01-15 09:15:22",
                category: "Feature Request",
                messages: 7,
              },
              {
                id: "TICKET-2024-003",
                client: "Creative Studios Inc",
                subject: "Billing inquiry for January subscription",
                priority: "low",
                status: "resolved",
                assignee: "Support Agent Luna",
                created: "2024-01-14 16:30:08",
                category: "Billing",
                messages: 5,
              },
              {
                id: "TICKET-2024-004",
                client: "Marketing Masters",
                subject: "Performance optimization for content AI",
                priority: "medium",
                status: "open",
                assignee: "Support Agent Alex",
                created: "2024-01-14 11:45:12",
                category: "Performance",
                messages: 2,
              },
            ].map((ticket, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-colors`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          ticket.priority === "high"
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : ticket.priority === "medium"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-blue-500 to-cyan-500"
                        }`}
                      >
                        <RiQuestionLine className="w-7 h-7 text-gray-600" />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 ${
                          theme === "light" ? "border-white" : "border-gray-900"
                        } ${
                          ticket.status === "open"
                            ? "bg-red-500"
                            : ticket.status === "in_progress"
                            ? "bg-yellow-500"
                            : ticket.status === "resolved"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className={`${currentTheme.text} font-bold text-lg`}
                        >
                          {ticket.id}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.priority === "high"
                              ? theme === "light"
                                ? "bg-red-100 text-red-700"
                                : "bg-red-500/20 text-red-400"
                              : ticket.priority === "medium"
                              ? theme === "light"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-yellow-500/20 text-yellow-400"
                              : theme === "light"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                      <p className={`${currentTheme.text} font-medium mb-1`}>
                        {ticket.subject}
                      </p>
                      <p className={`${currentTheme.textSecondary} text-sm`}>
                        {ticket.client} • {ticket.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${currentTheme.text} mb-1`}
                    >
                      {ticket.messages}
                    </div>
                    <div className={`${currentTheme.textSecondary} text-xs`}>
                      Messages
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "light" ? "bg-blue-50" : "bg-blue-500/10"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "light" ? "text-blue-700" : "text-blue-400"
                      }`}
                    >
                      {ticket.assignee}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "light" ? "text-blue-600" : "text-blue-500"
                      }`}
                    >
                      Assigned To
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "light" ? "bg-purple-50" : "bg-purple-500/10"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "light"
                          ? "text-purple-700"
                          : "text-purple-400"
                      }`}
                    >
                      {ticket.created.split(" ")[0]}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "light"
                          ? "text-purple-600"
                          : "text-purple-500"
                      }`}
                    >
                      Created Date
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      ticket.status === "open"
                        ? theme === "light"
                          ? "bg-red-50"
                          : "bg-red-500/10"
                        : ticket.status === "in_progress"
                        ? theme === "light"
                          ? "bg-yellow-50"
                          : "bg-yellow-500/10"
                        : theme === "light"
                        ? "bg-green-50"
                        : "bg-green-500/10"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        ticket.status === "open"
                          ? theme === "light"
                            ? "text-red-700"
                            : "text-red-400"
                          : ticket.status === "in_progress"
                          ? theme === "light"
                            ? "text-yellow-700"
                            : "text-yellow-400"
                          : theme === "light"
                          ? "text-green-700"
                          : "text-green-400"
                      }`}
                    >
                      {ticket.status.replace("_", " ")}
                    </div>
                    <div
                      className={`text-xs ${
                        ticket.status === "open"
                          ? theme === "light"
                            ? "text-red-600"
                            : "text-red-500"
                          : ticket.status === "in_progress"
                          ? theme === "light"
                            ? "text-yellow-600"
                            : "text-yellow-500"
                          : theme === "light"
                          ? "text-green-600"
                          : "text-green-500"
                      }`}
                    >
                      Status
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${currentTheme.textSecondary} text-sm mb-1`}>
                      Last Activity:
                    </p>
                    <p className={`${currentTheme.text} font-medium text-sm`}>
                      {ticket.created.split(" ")[1]} - Ticket created
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-2 ${currentTheme.hover} rounded-lg transition-colors`}
                    >
                      <MessageSquare
                        className={`w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                    </button>
                    <button
                      className={`p-2 ${currentTheme.hover} rounded-lg transition-colors`}
                    >
                      <Eye
                        className={`w-4 h-4 ${currentTheme.textSecondary}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "clients":
        return renderClients();
      case "ai-employees":
        return <AIEmployeeStatsContainer />;
      case "widgets":
        return <WidgetManagement />;
      case "transactions":
        return renderTransactions();
      case "support":
        return renderSupport();
      case "analytics":
        return <AnalyticsOptimized />;
      case "settings":
        return (
          <div
            className={`${
              currentTheme.cardBg
            } backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6 ${
              theme === "light" ? currentTheme.cardShadow || "shadow-lg" : ""
            }`}
          >
            <h2
              className={`text-xl font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}
            >
              <RiSettingsLine className="w-6 h-6 text-gray-500" />
              System Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-4 rounded-xl border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className={`${currentTheme.text} font-semibold mb-2`}>
                  General Settings
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  Configure system-wide preferences and defaults
                </p>
              </div>
              <div
                className={`p-4 rounded-xl border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className={`${currentTheme.text} font-semibold mb-2`}>
                  Security Settings
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  Manage authentication and access controls
                </p>
              </div>
              <div
                className={`p-4 rounded-xl border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className={`${currentTheme.text} font-semibold mb-2`}>
                  AI Configuration
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  Configure AI employee deployment settings
                </p>
              </div>
              <div
                className={`p-4 rounded-xl border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className={`${currentTheme.text} font-semibold mb-2`}>
                  Integration Settings
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  Manage third-party integrations and APIs
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  const backgroundStyle =
    theme === "dark"
      ? {
          background: "#1a1a1a",
        }
      : {
          background: "#F0F0F0",
        };

  return (
    <div
      className={`min-h-screen ${currentTheme.text} relative overflow-hidden`}
      style={backgroundStyle}
    >
      {/* Background */}
      {theme === "dark" && (
        <>
          <div className="absolute inset-0">
            <img
              src={bg}
              alt="Background"
              className="object-cover w-full h-full opacity-50"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient}`}
            ></div>
          </div>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#004998] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          </div>
        </>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full no-scrollbar bg-white dark:bg-[#EEEDEB] border-r border-gray-200 dark:border-gray-800 z-50 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isSidebarCollapsed ? "lg:w-16" : "lg:w-64"} w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={Shivlogo}
                  alt="ShivAi Logo"
                  className={`h-8 w-auto transition-opacity duration-300 ${
                    isSidebarCollapsed
                      ? "lg:opacity-0 lg:w-0"
                      : "lg:opacity-100"
                  }`}
                />
              </div>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`p-2 relative -left-2 rounded-lg bg-[#EEEDEB] hover:bg-gray-100 dark:hover:bg-gray-800  transition-colors ${
                  isSidebarCollapsed ? "lg:block" : "lg:hidden"
                }`}
              >
                <RiCloseLine className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title={`Switch to ${
                    theme === "dark" ? "light" : "dark"
                  } mode`}
                >
                  {theme === "dark" ? (
                    <RiSunLine className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <RiMoonLine className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
                >
                  <RiCloseLine className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="p-2 rounded-lg bg-[#EEEDEB] hover:bg-gray-100 dark:hover:bg-gray-800 hidden lg:flex transition-colors"
                  title={
                    isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  <RiArrowRightSLine
                    className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                      isSidebarCollapsed ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Search */}
            <div
              className={`relative transition-all duration-300 ${
                isSidebarCollapsed
                  ? "lg:opacity-0 lg:h-0 lg:overflow-hidden"
                  : "lg:opacity-100"
              }`}
            >
              <div
                className={`relative ${currentTheme.searchBg} rounded-lg border ${currentTheme.border} focus-within:border-opacity-60 transition-all`}
              >
                <RiSearchLine
                  className={`absolute left-3 top-1/2 hidden lg:block transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-9 pr-3 py-1 md:py-3 bg-transparent ${currentTheme.text} placeholder-gray-400 focus:outline-none rounded-lg text-xs md:text-sm transition-all`}
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.section;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full flex items-center transition-all duration-200 group relative ${
                    isSidebarCollapsed
                      ? "justify-center px-2 py-3"
                      : "gap-3 px-4 py-3"
                  } rounded-xl ${
                    isActive
                      ? "bg-[#EEEDEB] dark:bg-white text-gray-600 dark:text-gray-900 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isActive ? "text-gray-600 dark:text-gray-900" : ""
                    }`}
                  />
                  <span
                    className={`text-sm flex-1 text-left truncate transition-all duration-300 ${
                      isSidebarCollapsed
                        ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                        : "lg:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isActive 
                        ? "bg-white/20 dark:bg-black/20 text-gray-600 dark:text-gray-900" 
                        : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    }`}>
                      {item.badge}
                    </span>
                  )} */}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            {/* User Profile */}
            <div
              className={`${
                isSidebarCollapsed
                  ? "flex items-center justify-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer mb-3 group relative"
                  : "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer mb-3"
              }`}
            >
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <RiUserLine className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-600 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    admin@shivai.com
                  </p>
                </div>
              )}

              {/* Tooltip for collapsed state */}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                  Admin User
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`${
                isSidebarCollapsed
                  ? "w-full flex items-center justify-center px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 group relative"
                  : "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 group"
              }`}
            >
              <RiLogoutBoxLine className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {!isSidebarCollapsed && (
                <span className="font-medium text-sm">Sign Out</span>
              )}

              {/* Tooltip for collapsed state */}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                  Sign Out
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <MobileTabNavigation />
      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ease-in-out ml-0 ${
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          {/* Top Bar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block bg-white dark:bg-[#EEEDEB] border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-600 capitalize">
                  {activeSection}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
                  <RiNotificationLine className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="p-2 sm:p-3 md:p-4 lg:p-6"
            style={{ paddingTop: "8px" }}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboardOptimized = () => {
  return (
    <ThemeProvider>
      <AdminDashboardContent />
    </ThemeProvider>
  );
};

export default AdminDashboardOptimized;
