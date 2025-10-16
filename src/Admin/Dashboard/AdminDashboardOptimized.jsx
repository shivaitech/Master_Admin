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
import ClientManagement from "./components/ClientManagement";
import TransactionManagement from "./components/TransactionManagement";
import SupportTickets from "./components/SupportTickets";
import SystemSettings from "./components/SystemSettings";
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
      className={`lg:hidden fixed top-0 left-0 mb-4 right-0 z-30 flex flex-col ${currentTheme.cardBg} backdrop-blur-md border-b ${currentTheme.border}`}
      style={{ minHeight: "px" }}
    >
      {/* Top row with theme toggle and menu tools */}
      <div className="flex items-center justify-between px-4 py-2 border-current">
        <div className="flex items-center ">
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`mr-2`}
          >
            {isMobileMenuOpen ? (
              <RiCloseLine className={`w-4 h-4 ${currentTheme.text}`} />
            ) : (
              <RiMenuLine className={`w-5 h-5 ${currentTheme.text}`} />
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
    <div className="space-y-2 md:space-y-6 lg:space-y-8">
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
                  <RiTeamLine className={`w-5 h-5 md:w-6 md:h-6 ${currentTheme.textSecondary}`} />
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
                          <button className={`p-1 ${currentTheme.hover} rounded transition-colors hidden sm:block`}>
                            <RiExternalLinkLine className={`w-3 h-3 md:w-4 md:h-4 ${currentTheme.textSecondary}`} />
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
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
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
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
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
                            <Icon className="w-4 h-4 text-white" />
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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "clients":
        return <ClientManagement />;
      case "ai-employees":
        return <AIEmployeeStatsContainer />;
      case "widgets":
        return <WidgetManagement />;
      case "transactions":
        return <TransactionManagement />;
      case "support":
        return <SupportTickets />;
      case "analytics":
        return <AnalyticsOptimized />;
      case "settings":
        return <SystemSettings />;
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
        className={`fixed left-0 top-0 h-full no-scrollbar border-r-1 ${currentTheme.bg} ${
          currentTheme.border
        } z-50 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isSidebarCollapsed ? "lg:w-16" : "lg:w-64"} w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-4 ${currentTheme.border} border-b`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={Shivlogo}
                  alt="ShivAi Logo"
                  className={`h-8 w-auto transition-opacity duration-300 ${
                    isSidebarCollapsed
                      ? "lg:opacity-0 lg:w-0"
                      : "lg:opacity-100"
                  }`}
                  style={theme === "dark" ? { filter: "brightness(0) invert(1)" } : {}}
                />
              </div>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`p-2 relative -left-2 rounded-lg ${
                  currentTheme.hover
                } transition-colors ${
                  isSidebarCollapsed ? "lg:block" : "lg:hidden  hidden"
                }`}
              >
                <RiArrowRightSLine className={`w-5 h-5 ${currentTheme.text}`} />
              </button>

              <div className="flex items-end  justify-end ">
                <div
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                  title={`Switch to ${
                    theme === "dark" ? "light" : "dark"
                  } mode`}
                >
                  {theme === "dark" ? (
                    <RiSunLine className={`w-5 h-5 ${currentTheme.text}`} />
                  ) : (
                    <RiMoonLine className={`w-5 h-5 ${currentTheme.text}`} />
                  )}
                </div>
                <div
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-lg ${currentTheme.hover} lg:hidden transition-colors`}
                >
                  <RiCloseLine className={`w-5 h-5 ${currentTheme.text}`} />
                </div>
                <div
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className={`p-2 rounded-lg ${currentTheme.hover} hidden lg:flex transition-colors`}
                  title={
                    isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  <RiArrowRightSLine
                    className={`w-5 h-5 ${
                      currentTheme.text
                    } transition-transform duration-300 ${
                      isSidebarCollapsed ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>
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
                className={`relative ${currentTheme.searchBg} rounded-lg ${currentTheme.border} focus-within:border-opacity-60 transition-all`}
              >
                <RiSearchLine
                  className={`absolute left-3 top-1/2 hidden lg:block transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-9 pr-3 py-1 md:py-3 bg-transparent ${currentTheme.text} placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none rounded-lg text-[9px] md:text-sm transition-all`}
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
                      ? `${currentTheme.activeBg} ${currentTheme.text} font-medium`
                      : `${currentTheme.textSecondary} ${currentTheme.hover}`
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-6 h-6 flex-shrink-0 transition-colors ${
                      isActive ? currentTheme.text : ""
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
          <div className={`p-4 ${currentTheme.border} border-t`}>
            {/* User Profile */}
            <div
              className={`${
                isSidebarCollapsed
                  ? `flex items-center justify-center p-3 rounded-xl ${currentTheme.hover} transition-colors cursor-pointer mb-3 group relative`
                  : `flex items-center gap-3 p-3 rounded-xl ${currentTheme.hover} transition-colors cursor-pointer mb-3`
              }`}
            >
              <div
                className={`w-10 h-10 ${currentTheme.bg} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <RiUserLine className={`w-5 h-5 ${currentTheme.text}`} />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${currentTheme.text} truncate`}
                  >
                    Admin User
                  </p>
                  <p
                    className={`text-xs ${currentTheme.textSecondary} truncate`}
                  >
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
                  ? "w-full flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 group relative"
                  : "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
              } ${currentTheme.textSecondary} ${currentTheme.hover}`}
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

      <MobileTabNavigation />
      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ease-in-out ml-0 ${
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        <div className={`min-h-screen ${currentTheme.bg}`}>
          {/* Top Bar - Hidden on mobile, visible on desktop */}
          <div className={`hidden lg:block ${currentTheme.topBarBg} border-b ${currentTheme.border} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-green-400'} capitalize`}>
                  {activeSection}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className={`p-2 ${currentTheme.hover} rounded-lg transition-colors relative`}>
                  <RiNotificationLine className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`p-2 pt-16  md:pt-16 lg:pt-6 md:p-4 lg:p-6 ${currentTheme.bg}`}>
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
