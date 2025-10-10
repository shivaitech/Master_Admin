import React, { useState } from "react";
import {
  RiAddLine,
  RiQuestionLine,
} from "react-icons/ri";
import {
  HelpCircle,
  CheckCircle,
  Clock,
  Award,
  MessageSquare,
  Eye,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const SupportTickets = () => {
  const { theme, currentTheme } = useTheme();

  return (
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
};

export default SupportTickets;