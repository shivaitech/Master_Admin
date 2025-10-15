import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  ArrowLeft,
  User,
  Building2,
  Calendar,
  Clock,
  MessageSquare,
  Phone,
  Activity,
  TrendingUp,
  Download,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Play,
  Pause,
  Volume2,
  FileText,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AIEmployeeDetail = ({ employee, onBack }) => {
  const { currentTheme, theme } = useTheme();
  const [activeTab, setActiveTab] = useState("sessions");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedSession, setSelectedSession] = useState(null);

  // Mock sessions data
  const [sessions, setSessions] = useState([
    {
      id: 1,
      sessionId: "SES-2024-001",
      clientName: "John Smith",
      type: "chat",
      startTime: "2024-01-15 14:30:00",
      endTime: "2024-01-15 14:33:15",
      duration: "3m 15s",
      status: "completed",
      rating: 5,
      sentiment: "positive",
      transcript: [
        {
          timestamp: "14:30:05",
          speaker: "user",
          message: "Hi, I need help with my account balance inquiry.",
        },
        {
          timestamp: "14:30:08",
          speaker: "ai",
          message: "Hello! I'd be happy to help you with your account balance. Can you please provide your account number?",
        },
        {
          timestamp: "14:30:25",
          speaker: "user",
          message: "Sure, it's 123456789",
        },
        {
          timestamp: "14:30:30",
          speaker: "ai",
          message: "Thank you. Let me check your account... I can see your current balance is $2,450.75. Is there anything specific you'd like to know about your account?",
        },
        {
          timestamp: "14:30:45",
          speaker: "user",
          message: "That's perfect, thank you so much for the quick help!",
        },
        {
          timestamp: "14:30:50",
          speaker: "ai",
          message: "You're very welcome! Is there anything else I can assist you with today?",
        },
        {
          timestamp: "14:30:55",
          speaker: "user",
          message: "No, that's all. Thanks again!",
        },
        {
          timestamp: "14:31:00",
          speaker: "ai",
          message: "Perfect! Have a wonderful day and thank you for choosing our service.",
        },
      ],
      resolution: "Account balance provided successfully",
      tags: ["account", "balance", "inquiry"],
    },
    {
      id: 2,
      sessionId: "SES-2024-002",
      clientName: "Sarah Johnson",
      type: "voice",
      startTime: "2024-01-15 13:45:00",
      endTime: "2024-01-15 13:51:30",
      duration: "6m 30s",
      status: "completed",
      rating: 4,
      sentiment: "neutral",
      transcript: [
        {
          timestamp: "13:45:05",
          speaker: "user",
          message: "Hello, I'm having trouble with my recent order",
        },
        {
          timestamp: "13:45:10",
          speaker: "ai",
          message: "Hi Sarah! I'm sorry to hear you're having issues with your order. Could you please provide me with your order number?",
        },
        {
          timestamp: "13:45:20",
          speaker: "user",
          message: "Yes, it's ORD-789123",
        },
        {
          timestamp: "13:45:25",
          speaker: "ai",
          message: "Let me look that up for you... I can see your order was placed on January 12th. What specific issue are you experiencing?",
        },
        {
          timestamp: "13:45:40",
          speaker: "user",
          message: "The delivery was supposed to be today but I haven't received it yet",
        },
        {
          timestamp: "13:45:45",
          speaker: "ai",
          message: "I understand your concern. Let me check the tracking information... It looks like there was a delay at the sorting facility. Your package is now scheduled for delivery tomorrow morning.",
        },
        {
          timestamp: "13:46:15",
          speaker: "user",
          message: "That's frustrating, but I appreciate you checking. Will I get any compensation for the delay?",
        },
        {
          timestamp: "13:46:20",
          speaker: "ai",
          message: "Absolutely, I can offer you a 10% discount on your next order and expedite shipping at no charge. Would that be acceptable?",
        },
        {
          timestamp: "13:46:35",
          speaker: "user",
          message: "Yes, that works for me. Thank you for resolving this quickly.",
        },
      ],
      resolution: "Delivery delay resolved with compensation offered",
      tags: ["order", "delivery", "delay", "compensation"],
    },
    {
      id: 3,
      sessionId: "SES-2024-003",
      clientName: "Mike Wilson",
      type: "chat",
      startTime: "2024-01-15 12:15:00",
      endTime: "2024-01-15 12:16:45",
      duration: "1m 45s",
      status: "escalated",
      rating: 2,
      sentiment: "negative",
      transcript: [
        {
          timestamp: "12:15:05",
          speaker: "user",
          message: "This is ridiculous! I've been trying to cancel my subscription for weeks!",
        },
        {
          timestamp: "12:15:10",
          speaker: "ai",
          message: "I sincerely apologize for the frustration you're experiencing with the cancellation process. I'm here to help you resolve this immediately. May I have your account email?",
        },
        {
          timestamp: "12:15:25",
          speaker: "user",
          message: "mike.wilson@email.com - and I want this fixed NOW",
        },
        {
          timestamp: "12:15:30",
          speaker: "ai",
          message: "I understand your urgency, Mike. I'm looking up your account now... I see there have been multiple cancellation attempts. This requires immediate attention from our billing specialist. I'm escalating this to our senior support team who will contact you within the next hour.",
        },
        {
          timestamp: "12:15:50",
          speaker: "user",
          message: "Fine, but this better be resolved today!",
        },
      ],
      resolution: "Escalated to senior support team",
      tags: ["subscription", "cancellation", "escalated", "urgent"],
    },
  ]);

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.sessionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || session.type === filterType;
    const matchesDate = filterDate === "all"; // Add date filtering logic here
    return matchesSearch && matchesType && matchesDate;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "escalated":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      escalated: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      ongoing: "bg-blue-100 text-blue-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSentimentBadge = (sentiment) => {
    const colors = {
      positive: "bg-green-100 text-green-800",
      neutral: "bg-gray-100 text-gray-800",
      negative: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${colors[sentiment]}`}
      >
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (!employee) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600">
          Employee not found
        </h3>
      </div>
    );
  }

  return (
    <div
      className={`${currentTheme.cardBg} backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6 shadow-lg`}
    >
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className={`p-2 hover:bg-gray-100 rounded-lg transition-colors`}
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
              {employee.name}
            </h2>
            <p className={`text-sm ${currentTheme.textSecondary}`}>
              Employee Details & Session History
            </p>
          </div>
        </div>
      </div>

      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xl font-bold ${currentTheme.text}`}>
                {employee.totalSessions}
              </p>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                Total Sessions
              </p>
            </div>
            <MessageSquare className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xl font-bold ${currentTheme.text}`}>
                {employee.performance}%
              </p>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                Performance Score
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xl font-bold ${currentTheme.text}`}>
                {employee.avgSessionDuration}
              </p>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                Avg Duration
              </p>
            </div>
            <Clock className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        <div
          className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xl font-bold ${currentTheme.text}`}>
                {employee.client}
              </p>
              <p className={`text-sm ${currentTheme.textSecondary}`}>Client</p>
            </div>
            <Building2 className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-lg">
        {[
          { id: "sessions", label: "Sessions & Transcripts", icon: MessageSquare },
          { id: "analytics", label: "Analytics", icon: Activity },
          { id: "settings", label: "Settings", icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "sessions" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Types</option>
                <option value="chat">Chat</option>
                <option value="voice">Voice</option>
              </select>

              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {session.type === "chat" ? (
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Phone className="w-5 h-5 text-green-500" />
                      )}
                      <span className={`font-medium ${currentTheme.text}`}>
                        {session.sessionId}
                      </span>
                    </div>
                    {getStatusBadge(session.status)}
                    {getSentimentBadge(session.sentiment)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{getRatingStars(session.rating)}</div>
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Transcript"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className={`${currentTheme.textSecondary} mb-1`}>
                      Client
                    </p>
                    <p className={currentTheme.text}>{session.clientName}</p>
                  </div>
                  <div>
                    <p className={`${currentTheme.textSecondary} mb-1`}>
                      Duration
                    </p>
                    <p className={currentTheme.text}>{session.duration}</p>
                  </div>
                  <div>
                    <p className={`${currentTheme.textSecondary} mb-1`}>
                      Start Time
                    </p>
                    <p className={currentTheme.text}>
                      {formatDate(session.startTime)}
                    </p>
                  </div>
                  <div>
                    <p className={`${currentTheme.textSecondary} mb-1`}>
                      Resolution
                    </p>
                    <p className={`${currentTheme.text} truncate`}>
                      {session.resolution}
                    </p>
                  </div>
                </div>

                {session.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {session.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="text-center py-12">
          <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>
            Analytics Coming Soon
          </h3>
          <p className={`text-sm ${currentTheme.textSecondary}`}>
            Detailed performance analytics and insights will be available here.
          </p>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>
            Employee Settings
          </h3>
          <p className={`text-sm ${currentTheme.textSecondary}`}>
            Configuration and management options will be available here.
          </p>
        </div>
      )}

      {/* Transcript Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">
                  Session Transcript - {selectedSession.sessionId}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedSession.clientName} • {selectedSession.duration}
                </p>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {selectedSession.transcript.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.speaker === "ai" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.speaker === "ai"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs opacity-70">
                          {message.speaker === "ai" ? "AI" : "User"}
                        </span>
                        <span className="text-xs opacity-70">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIEmployeeDetail;