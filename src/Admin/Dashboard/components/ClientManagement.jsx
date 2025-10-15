import React, { useState } from "react";
import {
  RiTeamLine,
  RiSearchLine,
  RiUserLine,
  RiEyeLine,
  RiEditLine,
  RiUserFollowLine,
  RiUserAddLine,
  RiBankCardLine,
  RiAlarmWarningLine,
  RiErrorWarningLine,
  RiDownloadLine,
} from "react-icons/ri";
import {
  Users,
  UserCheck,
  UserPlus,
  Crown,
  CreditCard,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ClientManagement = () => {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="space-y-4 md:space-y-6 lg:space-y-8  px-2 sm:px-0">
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                        <div className={`w-12 h-12 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}>
                          <RiUserLine className={`w-6 h-6 ${currentTheme.text}`} />
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
                                ? theme === "dark"
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-red-100 text-red-700"
                                : user.role === "Manager"
                                ? theme === "dark"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : "bg-blue-100 text-blue-700"
                                : user.role === "Designer"
                                ? theme === "dark"
                                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                  : "bg-purple-100 text-purple-700"
                                : theme === "dark"
                                ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                : "bg-gray-100 text-gray-700"
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
                            ? theme === "dark"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-green-100 text-green-700"
                            : user.status === "inactive"
                            ? theme === "dark"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-red-100 text-red-700"
                            : theme === "dark"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-lg ${currentTheme.hover} transition-all duration-300 cursor-pointer`}>
                          <RiEyeLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                        </button>
                        <button className={`p-2 rounded-lg ${currentTheme.hover} transition-all duration-300 cursor-pointer`}>
                          <RiEditLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
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
              <div className="flex gap-3 items-center flex-wrap">
                <button className="admin-btn-primary py-2 px-4">
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

export default ClientManagement;