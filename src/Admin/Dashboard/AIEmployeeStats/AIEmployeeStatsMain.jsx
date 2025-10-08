import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import listingService from "../../../Redux-config/apisModel/lisitingService";
import {
  Users,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Clock,
  User,
  Building2,
  Activity,
  Calendar,
  MessageSquare,
  Phone,
  BarChart3,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  Volume2,
  FileText,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Bot,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

const AIEmployeeStatsMain = ({ onViewEmployee }) => {
  const { currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Employee selection state
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees] = useState([
    { id: "emp1", name: "Demo Employee" },
    { id: "emp2", name: "AI Assistant 2" },
    { id: "emp3", name: "Customer Support Bot" },
  ]);

  // Load sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Add styles for animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
      .spinner {
        border: 3px solid #f3f4f6;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Demo Employee Data - Now as state
  const [employee, setEmployee] = useState({
    id: 1,
    name: "Demo Employee",
    client: "ShivAI",
    status: "active",
    lastUpdate: "2024-01-15 14:30:00",
    totalSessions: 0,
    successfulSessions: 0,
    avgSessionDuration: "3.2 min",
    type: "chat",
    performance: 0,
    createdAt: "2024-01-01",
  });

  // API Functions
  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching sessions from API...");
      const response = await listingService.getAllSessionDemo();
      console.log("API Response:", response);

      if (response?.data?.statusCode === 200 && response.data) {
        const sessionsArray = Array.isArray(response.data?.data?.sessions)
          ? response.data?.data?.sessions
          : [response.data];
        console.log("Transformed Sessions:", sessionsArray);
        const transformedSessions = sessionsArray.map((session, index) => ({
          id: session.id || session.session_id || index + 1,
          sessionId:
            session.session_id ||
            session.id ||
            session._id ||
            `session-${index + 1}`,
          clientName:
            session.location && session.location.city
              ? session.location.city
              : `Client ${index + 1}`,
          type:
            session.config && session.config.agent
              ? session.config.agent
              : "chat",
          startTime:
            session.start_time ||
            session.created_at ||
            new Date().toISOString(),
          endTime:
            session.end_time || session.updated_at || new Date().toISOString(),
          duration: session.total_duration
            ? `${Math.floor(session.total_duration / 60)}m ${
                session.total_duration % 60
              }s`
            : calculateDuration(
                session.start_time || session.created_at,
                session.end_time || session.updated_at
              ),
          status: session.status || "completed",
          rating: session.rating || Math.floor(Math.random() * 5) + 1,
          sentiment: session.sentiment || "neutral",
          transcripts: session.transcripts || [],
          transcriptCount:
            session.message_count ||
            (session.transcripts ? session.transcripts.length : 0),
          resolution: session.resolution || "Session completed",
          tags: session.tags || [],
        }));
        setSessions(transformedSessions);
        updateEmployeeStats(transformedSessions);
      } else {
        setError("Failed to fetch sessions");
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setError("Error loading sessions data");
      // Fallback to mock data on error
    } finally {
      setLoading(false);
    }
  };

  const fetchTranscripts = async (sessionId) => {
    try {
      setLoadingTranscript(true);
      const response = await listingService.getSessionTranscript(sessionId);
      console.log("response:", response);

      if (response?.data?.statusCode === 200) {
        // Handle different response formats
        let transcripts = [];

        // Try different possible data structures
        if (
          response.data.data?.transcripts &&
          Array.isArray(response.data.data.transcripts)
        ) {
          transcripts = response.data.data.transcripts;
        }

        console.log("Transcripts:", transcripts);
        // Transform transcript format to match our component only if we have valid data
        if (transcripts && transcripts.length > 0) {
          return transcripts
            .map((transcript) => ({
              timestamp:
                transcript.timestamp ||
                transcript.created_at ||
                transcript.time ||
                new Date().toISOString(),
              speaker:
                transcript.speaker ||
                transcript.role ||
                transcript.sender ||
                transcript.type ||
                "user",
              message:
                transcript.message ||
                transcript.content ||
                transcript.text ||
                transcript.msg ||
                "",
            }))
            .filter((t) => t.message.trim() !== ""); // Filter out empty messages
        }
      }

      // Return empty array if no transcripts found
      return [];
    } catch (err) {
      console.error("Error fetching transcripts:", err);
      // Return empty array on error instead of mock data
      return [];
    } finally {
      setLoadingTranscript(false);
    }
  };

  // Helper function to calculate duration
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "N/A";
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    return `${diffMins}m ${diffSecs}s`;
  };

  // Update employee stats based on session data
  const updateEmployeeStats = (sessionsData) => {
    const totalSessions = sessionsData.length;
    const completedSessions = sessionsData.filter(
      (s) => s.status === "completed"
    ).length;
    const avgRating =
      sessionsData.reduce((sum, s) => sum + s.rating, 0) / totalSessions;

    setEmployee((prev) => ({
      ...prev,
      totalSessions,
      successfulSessions: completedSessions,
      performance: Math.round(avgRating * 20), // Convert 5-star to percentage
    }));
  };

  // Filter sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.sessionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || session.type === filterType;
    const matchesDate = filterDate === "all"; // Add date filtering logic here
    return matchesSearch && matchesType && matchesDate;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSessions = filteredSessions.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "inactive":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "maintenance":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      escalated: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      ongoing: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      maintenance: "bg-yellow-100 text-yellow-800",
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

  // Custom styled button component
  const StyledButton = ({ children, onClick, title, variant = "default" }) => {
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
        className="p-2 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
      >
        {children}
      </button>
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

  const formatTranscriptTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const handleViewEmployee = (employee) => {
    if (onViewEmployee) {
      onViewEmployee(employee);
    }
  };

  const handleViewSession = async (session) => {
    // Load transcripts for the session
    const transcripts = await fetchTranscripts(session.sessionId);
    const sessionWithTranscripts = {
      ...session,
      transcripts: transcripts,
    };
    console.log("Selected Session with Transcripts:", sessionWithTranscripts);
    setSelectedSession(sessionWithTranscripts);
  };

  const handleRefresh = () => {
    fetchSessions();
  };

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-6 pt-16 lg:pt-0 px-2 sm:px-0">
     

      {/* Employee Stats - Sliding Cards for Mobile */}
      <div className="relative">
        

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          <div className="group">
            <div
              className={`${currentTheme.cardBg} border ${
                currentTheme.border
              } rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${
                currentTheme.cardShadow || "shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                >
                  <MessageSquare
                    className={`w-5 h-5 ${currentTheme.textSecondary}`}
                  />
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-green-500">
                    +12.5%
                  </span>
                </div>
              </div>
              <h3
                className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
              >
                {employee.totalSessions}
              </h3>
              <p
                className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
              >
                Total Sessions
              </p>
              <p
                className={`text-xs ${currentTheme.textSecondary} leading-tight`}
              >
                All conversations
              </p>
            </div>
          </div>

          <div className="group">
            <div
              className={`${currentTheme.cardBg} border ${
                currentTheme.border
              } rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${
                currentTheme.cardShadow || "shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                >
                  <TrendingUp
                    className={`w-5 h-5 ${currentTheme.textSecondary}`}
                  />
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-green-500">
                    +8.2%
                  </span>
                </div>
              </div>
              <h3
                className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
              >
                {employee.performance}%
              </h3>
              <p
                className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
              >
                Performance Score
              </p>
              <p
                className={`text-xs ${currentTheme.textSecondary} leading-tight`}
              >
                Success rate
              </p>
            </div>
          </div>

          <div className="group">
            <div
              className={`${currentTheme.cardBg} border ${
                currentTheme.border
              } rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${
                currentTheme.cardShadow || "shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                >
                  <Clock className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-green-500">
                    +5.1%
                  </span>
                </div>
              </div>
              <h3
                className={`text-2xl font-semibold ${currentTheme.text} mb-1`}
              >
                {employee.avgSessionDuration}
              </h3>
              <p
                className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
              >
                Avg Duration
              </p>
              <p
                className={`text-xs ${currentTheme.textSecondary} leading-tight`}
              >
                Per session
              </p>
            </div>
          </div>

          <div className="group">
            <div
              className={`${currentTheme.cardBg} border ${
                currentTheme.border
              } rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${
                currentTheme.cardShadow || "shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                >
                  <Building2
                    className={`w-5 h-5 ${currentTheme.textSecondary}`}
                  />
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-blue-500">
                    Active
                  </span>
                </div>
              </div>
              <h3
                className={`text-xl font-semibold ${currentTheme.text} mb-1 truncate`}
              >
                {employee.client}
              </h3>
              <p
                className={`text-sm font-medium ${currentTheme.text} mb-1 leading-tight`}
              >
                Client
              </p>
              <p
                className={`text-xs ${currentTheme.textSecondary} leading-tight`}
              >
                Current assignment
              </p>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Sliding Cards */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-2 md:gap-3 pb-2 px-1"
            style={{ width: "max-content" }}
          >
            {/* Mobile Stat Card 1 */}
            <div className="group flex-shrink-0 w-32 sm:w-36 md:w-44">
              <div
                className={`${currentTheme.cardBg} border ${
                  currentTheme.border
                } rounded-lg p-2 sm:p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${
                  currentTheme.cardShadow || "shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                  >
                    <MessageSquare
                      className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${currentTheme.textSecondary}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-green-500">
                    +12%
                  </span>
                </div>
                <h3
                  className={`text-lg sm:text-xl md:text-2xl font-semibold ${currentTheme.text} mb-0.5 sm:mb-1`}
                >
                  {employee.totalSessions}
                </h3>
                <p
                  className={`text-xs sm:text-xs md:text-sm font-medium ${currentTheme.text} mb-0.5 leading-tight`}
                >
                  Sessions
                </p>
                <p
                  className={`text-xs ${currentTheme.textSecondary} leading-tight truncate`}
                >
                  Total
                </p>
              </div>
            </div>

            {/* Mobile Stat Card 2 */}
            <div className="group flex-shrink-0 w-32 sm:w-36 md:w-44">
              <div
                className={`${currentTheme.cardBg} border ${
                  currentTheme.border
                } rounded-lg p-2 sm:p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${
                  currentTheme.cardShadow || "shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                  >
                    <TrendingUp
                      className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${currentTheme.textSecondary}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-green-500">
                    +8%
                  </span>
                </div>
                <h3
                  className={`text-lg sm:text-xl md:text-2xl font-semibold ${currentTheme.text} mb-0.5 sm:mb-1`}
                >
                  {employee.performance}%
                </h3>
                <p
                  className={`text-xs sm:text-xs md:text-sm font-medium ${currentTheme.text} mb-0.5 leading-tight`}
                >
                  Performance
                </p>
                <p
                  className={`text-xs ${currentTheme.textSecondary} leading-tight truncate`}
                >
                  Score
                </p>
              </div>
            </div>

            {/* Mobile Stat Card 3 */}
            <div className="group flex-shrink-0 w-32 sm:w-36 md:w-44">
              <div
                className={`${currentTheme.cardBg} border ${
                  currentTheme.border
                } rounded-lg p-2 sm:p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${
                  currentTheme.cardShadow || "shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                  >
                    <Clock
                      className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${currentTheme.textSecondary}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-green-500">
                    +5%
                  </span>
                </div>
                <h3
                  className={`text-lg sm:text-xl md:text-2xl font-semibold ${currentTheme.text} mb-0.5 sm:mb-1`}
                >
                  {employee.avgSessionDuration}
                </h3>
                <p
                  className={`text-xs sm:text-xs md:text-sm font-medium ${currentTheme.text} mb-0.5 leading-tight`}
                >
                  Duration
                </p>
                <p
                  className={`text-xs ${currentTheme.textSecondary} leading-tight truncate`}
                >
                  Average
                </p>
              </div>
            </div>

            {/* Mobile Stat Card 4 */}
            <div className="group flex-shrink-0 w-32 sm:w-36 md:w-44">
              <div
                className={`${currentTheme.cardBg} border ${
                  currentTheme.border
                } rounded-lg p-2 sm:p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${
                  currentTheme.cardShadow || "shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg ${currentTheme.searchBg} flex items-center justify-center`}
                  >
                    <Building2
                      className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${currentTheme.textSecondary}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-blue-500">
                    Live
                  </span>
                </div>
                <h3
                  className={`text-sm sm:text-base md:text-lg font-semibold ${currentTheme.text} mb-0.5 sm:mb-1 truncate`}
                >
                  {employee.client}
                </h3>
                <p
                  className={`text-xs sm:text-xs md:text-sm font-medium ${currentTheme.text} mb-0.5 leading-tight`}
                >
                  Client
                </p>
                <p
                  className={`text-xs ${currentTheme.textSecondary} leading-tight truncate`}
                >
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div
        className={`${currentTheme.cardBg} border ${
          currentTheme.border
        } rounded-lg p-4 md:p-6 ${currentTheme.cardShadow || "shadow-lg"}`}
      >
        {loading ? (
          <div className="text-center py-12">
            <div
              className="spinner mx-auto mb-4"
              style={{ width: "40px", height: "40px" }}
            ></div>
            <h3 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>
              Loading Sessions...
            </h3>
            <p className={`text-sm ${currentTheme.textSecondary}`}>
              Please wait while we fetch your session data
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
                Session History
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-8 pr-3 py-2 text-sm rounded-md border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48`}
                  />
                </div>
                <button
                  className={`p-2 rounded-md ${currentTheme.hover} transition-colors`}
                  title="Filter sessions"
                >
                  <Filter className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                </button>
              </div>
            </div>
            {/* Sessions List - Mobile Optimized */}
            <div className="space-y-2 sm:space-y-3">
              {currentSessions?.map((session) => (
                <div
                  key={session.id}
                  className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-2 sm:p-3 md:p-4 hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        {session.type === "chat" ? (
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                        ) : (
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        )}
                        <span
                          className={`font-medium ${currentTheme.text} text-xs sm:text-sm truncate`}
                        >
                          {session.sessionId}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {getStatusBadge(session.status)}
                        {getSentimentBadge(session.sentiment)}
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                        <button
                          onClick={() => handleViewSession(session)}
                          className="p-1.5 sm:p-2 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
                          title="View"
                          style={{
                            background:
                              "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                            boxShadow:
                              "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {loadingTranscript ? (
                            <div className="w-3 h-3 sm:w-4 sm:h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="min-w-0">
                      <p
                        className={`${currentTheme.textSecondary} mb-0.5 sm:mb-1 text-xs`}
                      >
                        Client
                      </p>
                      <p className={`${currentTheme.text} truncate`}>
                        {session.clientName}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`${currentTheme.textSecondary} mb-0.5 sm:mb-1 text-xs`}
                      >
                        Duration
                      </p>
                      <p className={`${currentTheme.text} truncate`}>
                        {session.duration}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`${currentTheme.textSecondary} mb-0.5 sm:mb-1 text-xs`}
                      >
                        Time
                      </p>
                      <p className={`${currentTheme.text} truncate`}>
                        {formatDate(session.startTime)}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`${currentTheme.textSecondary} mb-0.5 sm:mb-1 text-xs`}
                      >
                        Messages
                      </p>
                      <p className={`${currentTheme.text} truncate`}>
                        {session.transcriptCount || session.transcripts.length}
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

            {/* Empty State */}
            {filteredSessions?.length === 0 && !loading && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3
                  className={`text-lg font-semibold ${currentTheme.text} mb-2`}
                >
                  No sessions found
                </h3>
                <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>
                  Try adjusting your search or filter criteria
                </p>
                <StyledButton
                  onClick={() => {
                    handleRefresh();
                    setSearchTerm("");
                    setFilterType("all");
                    setFilterDate("all");
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                </StyledButton>
              </div>
            )}
          </>
        )}{" "}
        {/* Transcript Modal - Mobile Optimized */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
            <div className="bg-[#f6f5f4] rounded-lg sm:rounded-xl w-full max-w-4xl  max-h-[95vh] sm:max-h-[85vh] overflow-hidden shadow-2xl">
              {/* Header - Mobile Optimized */}
              <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate">
                      Session Transcript
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                      <span className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                        ID: {selectedSession.sessionId}
                      </span>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="text-xs sm:text-sm text-gray-600 truncate">
                        {selectedSession.clientName}
                      </span>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {selectedSession.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-1.5 sm:p-2 text-white rounded-lg transition-all duration-200 hover:shadow-lg flex-shrink-0"
                  title="Close"
                  style={{
                    background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Session Details - Mobile Optimized */}

              {/* Transcript Messages - Mobile Optimized */}
              <div
                className="p-3 sm:p-4 lg:p-6 overflow-y-auto"
                style={{ maxHeight: "50vh" }}
              >
                {selectedSession.transcripts &&
                selectedSession.transcripts.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                        Conversation started at{" "}
                        {formatDate(selectedSession.startTime)}
                      </p>
                    </div>

                    {selectedSession.transcripts.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.speaker === "ai"
                            ? "justify-start"
                            : "justify-end"
                        } animate-fadeIn`}
                      >
                        <div
                          className={`flex w-full max-w-full sm:max-w-2xl ${
                            message.speaker === "ai"
                              ? "flex-row"
                              : "flex-row-reverse"
                          } items-start gap-2 sm:gap-3`}
                        >
                          {/* Avatar - Mobile Optimized */}
                          <div
                            className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.speaker === "ai"
                                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                                : "bg-gradient-to-br from-gray-600 to-gray-700 text-white"
                            }`}
                          >
                            {message.speaker === "ai" ? (
                              <Bot className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                            ) : (
                              <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                            )}
                          </div>

                          {/* Message Content - Mobile Optimized */}
                          <div
                            className={`rounded-lg sm:rounded-xl lg:rounded-2xl px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-3 shadow-sm flex-1 min-w-0 ${
                              message.speaker === "ai"
                                ? "bg-white border border-gray-200 text-gray-800"
                                : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                            }`}
                          >
                            <div
                              className={`flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 ${
                                message.speaker === "ai"
                                  ? "justify-start"
                                  : "justify-end"
                              }`}
                            >
                              <span
                                className={`text-xs sm:text-xs font-medium uppercase tracking-wide truncate ${
                                  message.speaker === "ai"
                                    ? "text-blue-600"
                                    : "text-blue-100"
                                }`}
                              >
                                {message.speaker === "ai"
                                  ? "ShivAI Assistant"
                                  : "Customer"}
                              </span>
                              <span
                                className={`text-xs ${
                                  message.speaker === "ai"
                                    ? "text-gray-500"
                                    : "text-blue-100"
                                } flex-shrink-0`}
                              >
                                {formatTranscriptTimestamp(message.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed break-words">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="text-center pt-3 sm:pt-4 border-t border-gray-100">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Session ended • Resolution: {selectedSession.resolution}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      No Messages Found
                    </h4>
                    <p className="text-sm sm:text-base text-gray-500 max-w-md">
                      This session doesn't have any transcript messages
                      available. The conversation might not have been recorded
                      or the data might not be available yet.
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-blue-600">
                        Session ID: {selectedSession.sessionId}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {selectedSession.tags && selectedSession.tags.length > 0 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSession.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Updated: {formatDate(selectedSession.startTime)}</span>
                </div>

                {/* <div className="flex items-center gap-3">
                      <StyledButton title="Export Transcript">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </StyledButton>
                      <StyledButton title="Share Session">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Share
                      </StyledButton>
                    </div> */}
              </div>
            </div>
          </div>
        )}

        {/* Pagination Footer - Mobile Optimized */}
        <div className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
          {/* Mobile-first responsive pagination info */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              {startIndex + 1}-{Math.min(endIndex, filteredSessions.length)} of{" "}
              {filteredSessions.length}
              {filteredSessions.length !== sessions.length &&
                ` (${sessions.length} total)`}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="p-1.5 sm:p-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
                  title="Previous page"
                  style={{
                    background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>

                {/* Page Numbers - Mobile responsive */}
                <div className="hidden sm:flex items-center gap-1">
                  {/* First page */}
                  {currentPage > 3 && (
                    <>
                      <button
                        onClick={() => goToPage(1)}
                        className="px-3 py-2 text-sm rounded-lg text-white transition-all duration-200 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                          boxShadow:
                            "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          opacity: "0.8",
                        }}
                      >
                        1
                      </button>
                      {currentPage > 4 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                    </>
                  )}

                  {/* Page range around current page */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page >= Math.max(1, currentPage - 2) &&
                        page <= Math.min(totalPages, currentPage + 2)
                    )
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className="px-3 py-2 text-sm rounded-lg text-white transition-all duration-200 hover:shadow-lg"
                        style={{
                          background:
                            page === currentPage
                              ? "linear-gradient(0deg, #1a1a1a 0%, #333 100%)"
                              : "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                          boxShadow:
                            "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          opacity: page === currentPage ? "1" : "0.8",
                        }}
                      >
                        {page}
                      </button>
                    ))}

                  {/* Last page */}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => goToPage(totalPages)}
                        className="px-3 py-2 text-sm rounded-lg text-white transition-all duration-200 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                          boxShadow:
                            "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          opacity: "0.8",
                        }}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                {/* Mobile: Simple page info */}
                <div className="sm:hidden px-2 py-1 text-xs text-gray-600 bg-gray-50 rounded">
                  {currentPage}/{totalPages}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-1.5 sm:p-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
                  title="Next page"
                  style={{
                    background: "linear-gradient(0deg, #0a0a0a 0%, #000 100%)",
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEmployeeStatsMain;
