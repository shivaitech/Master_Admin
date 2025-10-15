import React, { useState } from "react";
import {
  RiAddLine,
  RiBankCardLine,
} from "react-icons/ri";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Clock,
  Eye,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const TransactionManagement = () => {
  const { theme, currentTheme } = useTheme();

  return (
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
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.hover} transition-all duration-300 cursor-pointer text-sm font-medium ${currentTheme.text}`}>
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
                      <div className={`w-14 h-14 ${currentTheme.activeBg} rounded-full flex items-center justify-center`}>
                        <RiBankCardLine className={`w-7 h-7 ${currentTheme.text}`} />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 ${
                          theme === "dark" ? "border-gray-800" : "border-white"
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
                              ? theme === "dark"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-green-100 text-green-700"
                              : transaction.status === "pending"
                              ? theme === "dark"
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                : "bg-yellow-100 text-yellow-700"
                              : theme === "dark"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-red-100 text-red-700"
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
                      theme === "dark" ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "dark" ? "text-blue-400" : "text-blue-700"
                      }`}
                    >
                      {transaction.method}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-blue-500" : "text-blue-600"
                      }`}
                    >
                      Payment Method
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "dark" ? "bg-purple-500/10 border border-purple-500/20" : "bg-purple-50"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "dark"
                          ? "text-purple-400"
                          : "text-purple-700"
                      }`}
                    >
                      {transaction.date.split(" ")[0]}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "dark"
                          ? "text-purple-500"
                          : "text-purple-600"
                      }`}
                    >
                      Transaction Date
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "dark" ? "bg-green-500/10 border border-green-500/20" : "bg-green-50"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold ${
                        theme === "dark" ? "text-green-400" : "text-green-700"
                      }`}
                    >
                      {transaction.date.split(" ")[1]}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-green-500" : "text-green-600"
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
};

export default TransactionManagement;