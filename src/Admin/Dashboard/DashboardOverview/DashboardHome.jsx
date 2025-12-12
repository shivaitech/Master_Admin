import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  RiTeamLine,
  RiEyeLine,
  RiUserFollowLine,
  RiBankCardLine,
  RiErrorWarningLine,
  RiExternalLinkLine,
  RiVipCrownLine,
  RiFlashlightLine,
  RiPulseLine,
} from "react-icons/ri";
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
} from "lucide-react";

const DashboardHome = () => {
  const { currentTheme, theme } = useTheme();

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

  const recentClients = [
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
  ];

  const recentActivities = [
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
  ];

  const quickActions = [
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
  ];

  return (
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
                  <RiTeamLine
                    className={`w-5 h-5 md:w-6 md:h-6 ${currentTheme.textSecondary}`}
                  />
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

              {/* Recent Client Activities */}
              <div className="space-y-2 md:space-y-3">
                <h3
                  className={`text-sm md:text-base font-semibold ${currentTheme.text} mb-3`}
                >
                  Recent Client Activities
                </h3>

                {/* Desktop List View */}
                <div className="hidden md:block space-y-2">
                  {recentClients.map((client, index) => (
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
                          <button
                            className={`p-1 ${currentTheme.hover} rounded transition-colors hidden sm:block`}
                          >
                            <RiExternalLinkLine
                              className={`w-3 h-3 md:w-4 md:h-4 ${currentTheme.textSecondary}`}
                            />
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
                    {recentClients.map((client, index) => (
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
                {quickActions.map((action, index) => {
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
                {recentActivities.map((activity, index) => {
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
                  {recentActivities.map((activity, index) => {
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
                              className={`${currentTheme.text} font-medium text-xs leading-tight`}
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
};

export default DashboardHome;