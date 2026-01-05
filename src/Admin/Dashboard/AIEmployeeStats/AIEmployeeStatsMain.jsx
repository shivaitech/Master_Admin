import React, { useState, useEffect, useCallback, useRef } from "react";
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
  VolumeX,
  SkipBack,
  SkipForward,
  Download,
  FileText,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Bot,
  ExternalLink,
  ChevronDown,
  Grid3X3,
  List,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";

const AIEmployeeStatsMain = ({ onViewEmployee }) => {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState(""); // For input value only
  const [searchQuery, setSearchQuery] = useState(""); // For API calls
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Standard page size
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Tab state for modal
  const [activeTab, setActiveTab] = useState("transcripts");

  // Call summary state
  const [callSummary, setCallSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"

  // IP Location cache state
  const [ipLocationCache, setIpLocationCache] = useState({}); // Cache for IP to location mapping

  // API Filter states
  const [deviceTypeFilter, setDeviceTypeFilter] = useState("all"); // all, mobile, desktop, tablet
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
    preset: "all", // all, today, week, month, custom
  });

  // Employee selection state
  const [selectedEmployee, setSelectedEmployee] = useState("emp1"); // Pre-select Demo Employee
  const [employees] = useState([
    { id: "emp1", name: "Shivai Widget" },
    { id: "emp2", name: "Demo Employee" },
  ]);

  // Debounced search effect - separate from API calls
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(searchTerm);
      if (currentPage !== 1) {
        setCurrentPage(1); // Reset to first page for new search
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Reset to first page when filters change (but not search - handled above)
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [deviceTypeFilter, dateRange]);

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

  // Function to resolve IP to location
  const resolveIPLocation = async (ip) => {
    // Check if IP is valid
    if (!ip || ip === "Unknown" || ip === "N/A") {
      return {
        city: "Unknown",
        region: "",
        country: "Unknown",
        countryCode: "",
        isp: "Unknown ISP",
        lat: null,
        lon: null,
        timezone: "",
      };
    }

    // Check cache first
    if (ipLocationCache[ip]) {
      return ipLocationCache[ip];
    }

    try {
      // Use ip-api.com for free IP geolocation (no API key required)
      const response = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`
      );
      const data = await response.json();

      if (data.status === "success") {
        const locationData = {
          city: data.city || "Unknown",
          region: data.regionName || data.region || "",
          country: data.country || "Unknown",
          countryCode: data.countryCode || "",
          zip: data.zip || "",
          isp: data.isp || data.org || "Unknown ISP",
          lat: data.lat || null,
          lon: data.lon || null,
          timezone: data.timezone || "",
          as: data.as || "",
        };

        // Cache the result
        setIpLocationCache((prev) => ({
          ...prev,
          [ip]: locationData,
        }));

        return locationData;
      } else {
        console.warn(`IP geolocation failed for ${ip}:`, data.message);
        return {
          city: "Unknown",
          region: "",
          country: "Unknown",
          countryCode: "",
          isp: "Unknown ISP",
          lat: null,
          lon: null,
          timezone: "",
        };
      }
    } catch (error) {
      console.error(`Error resolving IP location for ${ip}:`, error);
      return {
        city: "Unknown",
        region: "",
        country: "Unknown",
        countryCode: "",
        isp: "Unknown ISP",
        lat: null,
        lon: null,
        timezone: "",
      };
    }
  };

  // Demo Employee Data - Now as state
  const [employee, setEmployee] = useState({
    id: 1,
    name: "Demo Employee",
    client: "Demo Employee", // Updated to match selected employee
    status: "active",
    lastUpdate: "2024-01-15 14:30:00",
    totalSessions: 0,
    successfulSessions: 0,
    avgSessionDuration: "3m 12s",
    type: "chat",
    performance: 0,
    createdAt: "2024-01-01",
  });

  // API Functions
  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build API query parameters - same for both APIs
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });

      // Add device type filter
      if (deviceTypeFilter !== "all") {
        queryParams.append("deviceType", deviceTypeFilter);
      }

      // Add date range filters
      if (dateRange.startDate) {
        queryParams.append("startDate", dateRange.startDate);
      }
      if (dateRange.endDate) {
        queryParams.append("endDate", dateRange.endDate);
      }

      // Add search term if exists
      if (searchQuery.trim()) {
        queryParams.append("q", searchQuery.trim());
      }

      console.log(
        `Fetching sessions for ${selectedEmployee === "emp1" ? "Demo Employee" : "ShivAI Widget Employee"} with params:`,
        queryParams.toString()
      );
      let payload = queryParams.toString();

      // Call different API based on selected employee - but with same filters and pagination
      let response;
      if (selectedEmployee === "emp1") {
        // Demo Employee - call getAgentSessions with filters
        response = await listingService.getAgentSessions(payload);
      } else {
        // ShivAI Widget Employee - call getAllSessionDemo with filters
        response = await listingService.getAllSessionDemo(payload);
      }

      console.log("API Raw Response:", response);

      // Extract data - handle nested structure
      const responseData =
        response?.data?.data?.data ||
        response?.data?.data ||
        response?.data?.sessions;

      if (response?.data?.success && responseData?.sessions) {
        // Sessions array is directly in responseData.sessions
        const sessionsArray = Array.isArray(responseData.sessions)
          ? responseData.sessions
          : [];

        // Extract pagination data - it's at the same level as sessions
        const paginationData = responseData.pagination || {};
        const total =
          paginationData.total ||
          paginationData.totalItems ||
          sessionsArray.length;
        const totalPagesCount =
          paginationData.totalPages || Math.ceil(total / itemsPerPage);

        console.log("Pagination Data:", paginationData);
        console.log("Total Items:", total, "Total Pages:", totalPagesCount);
        console.log("Sessions Array Length:", sessionsArray.length);

        // Update pagination info from API response
        setTotalItems(total);
        setTotalPages(totalPagesCount);

        // Resolve IP locations for all sessions
        const sessionsWithResolvedIP = await Promise.all(
          sessionsArray.map(async (session, index) => {
            const userIP =
              session.user_ip || session.userIP || session.ip || "Unknown";
            const resolvedLocation = await resolveIPLocation(userIP);

            // Merge resolved location with existing location data (resolved takes priority)
            const finalLocation = {
              city:
                resolvedLocation.city !== "Unknown"
                  ? resolvedLocation.city
                  : session.location?.city || "Unknown",
              region: resolvedLocation.region || session.location?.region || "",
              country:
                resolvedLocation.country !== "Unknown"
                  ? resolvedLocation.country
                  : session.location?.country || "Unknown",
              countryCode:
                resolvedLocation.countryCode ||
                session.location?.countryCode ||
                "",
              zip: resolvedLocation.zip || session.location?.zip || "",
              isp:
                resolvedLocation.isp !== "Unknown ISP"
                  ? resolvedLocation.isp
                  : session.location?.isp || "Unknown ISP",
              lat: resolvedLocation.lat || session.location?.lat || null,
              lon: resolvedLocation.lon || session.location?.lon || null,
              timezone:
                resolvedLocation.timezone || session.location?.timezone || "",
            };

            return {
              ...session,
              userIP,
              resolvedLocation: finalLocation,
            };
          })
        );

        const transformedSessions = sessionsWithResolvedIP.map(
          (session, index) => ({
            id: session.id || session.session_id || `session-${index + 1}`,
            sessionId:
              session.session_id ||
              session.id ||
              session._id ||
              `SES-${Date.now()}-${index}`,
            clientName:
              session.resolvedLocation?.city !== "Unknown"
                ? `${session.resolvedLocation.city}${
                    session.resolvedLocation.region
                      ? `, ${session.resolvedLocation.region}`
                      : ""
                  }${
                    session.resolvedLocation.country
                      ? ` (${session.resolvedLocation.country})`
                      : ""
                  }`
                : session.client_name ||
                  session.clientName ||
                  `Client ${index + 1}`,
            type: session.config?.agent || session.type || "chat",
            startTime:
              session.start_time ||
              session.startTime ||
              session.created_at ||
              new Date().toISOString(),
            endTime:
              session.end_time ||
              session.endTime ||
              session.updated_at ||
              new Date().toISOString(),
            duration: session.total_duration
              ? `${Math.floor(session.total_duration / 60)}m ${Math.floor(
                  session.total_duration % 60
                )}s`
              : session.duration ||
                calculateDuration(
                  session.start_time || session.created_at,
                  session.end_time || session.updated_at
                ),
            status: session.status || "completed",
            rating: session.rating || null,
            sentiment: session.sentiment || "neutral",
            transcripts: Array.isArray(session.transcripts)
              ? session.transcripts
              : [],
            transcriptCount:
              session.message_count ||
              session.messageCount ||
              (Array.isArray(session.transcripts)
                ? session.transcripts.length
                : 0),
            resolution: session.resolution || "Session completed",
            tags: Array.isArray(session.tags) ? session.tags : [],
            // Enhanced session data with fallbacks - using resolved location
            location: session.resolvedLocation || {
              city: "Unknown",
              country: "Unknown",
              region: "",
              zip: "",
              lat: null,
              lon: null,
              isp: "Unknown ISP",
              timezone: "",
            },
            device: {
              browser: session.device?.browser || "Unknown Browser",
              deviceType:
                session.device?.device_type ||
                session.device?.deviceType ||
                "Unknown",
              raw: session.device?.raw || "",
            },
            userIP:
              session.user_ip || session.userIP || session.ip || "Unknown",
            messageCount: (() => {
              const total =
                session.message_count ||
                session.messageCount?.total ||
                (Array.isArray(session.transcripts)
                  ? session.transcripts.length
                  : 0);
              const user =
                session.user_messages ||
                session.messageCount?.user ||
                0;
              const ai = total - user;
              return {
                ai: Math.max(0, ai),
                user: user,
                total: total,
              };
            })(),
            config: {
              language: session.config?.language || "en-US",
              gender: session.config?.gender || "female",
              agent: session.config?.agent || "support",
            },
            // Agent ID and Call ID for summary API
            agentId: session.agent_id || session.agentId || session.id,
            callId:
              session.call_id ||
              session.callId ||
              session.session_id ||
              session.id,
            // Recording URL for playback
            recordingUrl: session.recording_url || session.recordingUrl || null,
            // Token usage data
            tokenUsage: session.token_usage || session.tokenUsage || null,
          })
        );

        console.log("Transformed Sessions:", transformedSessions);
        setSessions(transformedSessions);
        updateEmployeeStats(transformedSessions);
      } else {
        // Handle API error or empty response
        const errorMessage =
          response?.data?.message ||
          responseData?.message ||
          "No sessions data available";
        console.warn("API Response Issue:", errorMessage);
        setError(errorMessage);
        setSessions([]);
        setTotalItems(0);
        setTotalPages(0);
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to load sessions";
      setError(`Error loading sessions: ${errorMsg}`);
      setSessions([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    deviceTypeFilter,
    dateRange,
    searchQuery,
    selectedEmployee,
  ]);

  // Load sessions on component mount and when filters change
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const fetchTranscripts = async (sessionId) => {
    console.log("Fetching transcripts for session:", sessionId);

    try {
      setLoadingTranscript(true);

      // Use different API based on selected employee
      let response;
      if (selectedEmployee === "emp1") {
        // For Demo Employee (Shivai Widget) - use getAgentSessionsTranscript
        response = await listingService.getAgentSessionsTranscript(sessionId);
        console.log("getAgentSessionsTranscript response:", response);
      } else {
        // For other employees - use getSessionTranscript
        response = await listingService.getSessionTranscript(sessionId);
        console.log("getSessionTranscript response:", response);
      }

      if (response?.data?.statusCode === 200 || response?.data?.success) {
        // Handle different response formats
        let allTranscripts = [];

        if (selectedEmployee === "emp1") {
          // Handle getAgentSessionsTranscript response format
          const responseData = response.data?.data?.session || response.data;
          console.log("Agent Sessions Response Data:", responseData);

          // Try different possible structures based on the API response
          let agentTranscripts = [];
          let userTranscripts = [];

          // Extract agent transcripts - map "agent" speaker to "ai" for UI compatibility
          if (
            responseData.transcripts &&
            Array.isArray(responseData.transcripts)
          ) {
            agentTranscripts = responseData.transcripts.map((t) => ({
              ...t,
              speaker: "ai", // Always set to "ai" for agent messages (UI expects "ai")
            }));
          }

          // Extract user transcripts
          if (
            responseData.user_transcripts &&
            Array.isArray(responseData.user_transcripts)
          ) {
            userTranscripts = responseData.user_transcripts.map((t) => ({
              ...t,
              speaker: "user", // Always set to "user" for user messages
            }));
          }

          // Combine both arrays
          allTranscripts = [...agentTranscripts, ...userTranscripts];

          // Sort by timestamp to maintain conversation order
          allTranscripts.sort((a, b) => {
            const timeA = new Date(a.timestamp || a.created_at || 0);
            const timeB = new Date(b.timestamp || b.created_at || 0);
            return timeA - timeB;
          });
        } else {
          // Handle getSessionTranscript response format (existing logic)
          if (
            response.data.data?.transcripts &&
            Array.isArray(response.data.data.transcripts)
          ) {
            allTranscripts = response.data.data.transcripts;
          }
        }

        console.log("All Transcripts (combined):", allTranscripts);

        // Transform transcript format to match our component only if we have valid data
        if (allTranscripts && allTranscripts.length > 0) {
          return allTranscripts
            .map((transcript) => {
              // Determine speaker - check multiple possible field names
              let speaker = transcript.role || transcript.speaker;

              console.log("📝 Processing transcript:", {
                original: transcript,
                speakerField: speaker,
                allFields: Object.keys(transcript),
              });

              // Map common speaker variations to our expected format
              if (
                speaker === "user" ||
                speaker === "customer" ||
                speaker === "client"
              ) {
                speaker = "user";
              } else if (
                speaker === "agent" ||
                speaker === "assistant" ||
                speaker === "bot" ||
                speaker === "ai"
              ) {
                speaker = "ai";
              } else {
                // If we can't determine, check the message content or default to user
                speaker = "user";
              }

              const processedMessage = {
                timestamp:
                  transcript.timestamp ||
                  transcript.created_at ||
                  transcript.time ||
                  new Date().toISOString(),
                speaker: speaker,
                message:
                  transcript.message ||
                  transcript.content ||
                  transcript.text ||
                  transcript.msg ||
                  "",
              };

              console.log("✅ Processed message:", processedMessage);

              return processedMessage;
            })
            .filter((t) => t.message && t.message.trim() !== ""); // Filter out empty messages
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

  // API-managed filtering - sessions are already filtered by the backend
  const filteredSessions = sessions; // Sessions come pre-filtered from API
  const currentSessions = sessions; // All sessions on current page

  // Pagination calculations for display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Pagination functions - now triggers API calls
  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
    // API call will be triggered by useEffect dependency on currentPage
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
    const colors =
      theme === "dark"
        ? {
            completed:
              "bg-green-500/20 text-green-400 border border-green-500/30",
            escalated:
              "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            failed: "bg-red-500/20 text-red-400 border border-red-500/30",
            ongoing: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
            active: "bg-green-500/20 text-green-400 border border-green-500/30",
            inactive: "bg-red-500/20 text-red-400 border border-red-500/30",
            maintenance:
              "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
          }
        : {
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
    const colors =
      theme === "dark"
        ? {
            positive:
              "bg-green-500/20 text-green-400 border border-green-500/30",
            neutral: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
            negative: "bg-red-500/20 text-red-400 border border-red-500/30",
          }
        : {
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
    const transcripts = await fetchTranscripts(session.sessionId || session.id);
    const sessionWithTranscripts = {
      ...session,
      transcripts: transcripts,
    };
    console.log("Selected Session with Transcripts:", sessionWithTranscripts);
    console.log("Token Usage Data:", session.token_usage);
    setSelectedSession(sessionWithTranscripts);

    // Reset tab to transcripts
    setActiveTab("transcripts");

    // Fetch call summary using agentId and filter by callId
    const agentId = session.agentId || session.agent_id;
    const callId = session.callId || session.call_id || session.sessionId;
    console.log(
      "🔍 Fetching call summary for agent ID:",
      agentId,
      "and call ID:",
      callId
    );
    fetchCallSummary(agentId, callId);
  };

  const fetchCallSummary = async (agentId, callId) => {
    if (!agentId) {
      console.warn("⚠️ No agent ID provided for call summary");
      return;
    }

    console.log(
      "📡 Fetching call summary for agent:",
      agentId,
      "callId to filter:",
      callId
    );
    setSummaryLoading(true);
    setSummaryError(null);

    try {
      const response = await shivaiApiService.getCallSummary(agentId);
      console.log("✅ Call summary response:", response);

      // Store the entire response - filtering will happen in the render
      setCallSummary(response);
    } catch (err) {
      console.error("❌ Failed to fetch call summary:", err);
      setSummaryError(err.message || "Failed to load call summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchSessions();
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSearchQuery(""); // Reset query too
    setDeviceTypeFilter("all");
    setDateRange({
      startDate: "",
      endDate: "",
      preset: "all",
    });
    setCurrentPage(1);
  };

  // Filter handlers
  const handleDeviceTypeFilter = (deviceType) => {
    setDeviceTypeFilter(deviceType);
  };

  const handleDatePresetFilter = (preset) => {
    const today = new Date();
    let startDate = "";
    let endDate = "";

    switch (preset) {
      case "today":
        startDate = today.toISOString().split("T")[0];
        endDate = startDate;
        break;
      case "week":
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        startDate = weekAgo.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "month":
        const monthAgo = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        startDate = monthAgo.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "all":
      default:
        startDate = "";
        endDate = "";
        break;
    }

    setDateRange({
      startDate,
      endDate,
      preset,
    });
  };

  const handleCustomDateRange = (start, end) => {
    setDateRange({
      startDate: start,
      endDate: end,
      preset: "custom",
    });
  };

  // Audio player handlers
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const changeSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const skip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(duration, audioRef.current.currentTime + seconds)
      );
    }
  };

  const formatTimeDisplay = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-6  px-2 sm:px-0">
      {/* Employee Stats - Sliding Cards for Mobile */}
      <div className="relative">
        {/* Employee Selector - Mobile Responsive - Enhanced UI */}
        <div className="flex items-center justify-start mb-4 px-2 sm:px-0">
          <div className="relative w-full sm:w-auto">
            <select
              id="employee-select"
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                const emp = employees.find((emp) => emp.id === e.target.value);
                if (emp) {
                  setEmployee((prev) => ({
                    ...prev,
                    name: emp.name,
                    client: emp.name,
                  }));
                }
                // Reset pagination when switching employees
                setCurrentPage(1);
                // Clear any existing sessions while loading new ones
                setSessions([]);
              }}
              className={`
                  appearance-none px-3 py-2 pr-8 sm:px-4 sm:py-2 sm:pr-10 
                  rounded-lg border-2 border-gray-300
                  bg-white ${currentTheme.text} font-medium text-sm sm:text-base
                  focus:outline-none focus:ring-1 focus:ring-black focus:border-blue-500
                  hover:border-gray-400 transition-all duration-200
                  shadow-sm w-full sm:min-w-[200px] cursor-pointer
                `}
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id} className="py-2">
                  {emp.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
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
                {totalItems}
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
                Internal AI Employees
              </p>
              <p
                className={`text-xs ${currentTheme.textSecondary} leading-tight`}
              >
                Current assignment
              </p>
            </div>
          </div>
        </div>

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
                  {totalItems}
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
        <div className="space-y-3 flex flex-col md:flex-row md:items-center md:justify-between ">
          <h3 className={`text-lg  font-semibold ${currentTheme.text}`}>
            Session History
            <span
              className={`ml-2 text-sm font-normal ${currentTheme.textSecondary}`}
            >
              ({totalItems} {totalItems === 1 ? "session" : "sessions"})
            </span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-0">
              <Search
                className={`absolute hidden lg:flex left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
              />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-md border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            {/* Filters Group */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Device Type Filter */}
              <select
                value={deviceTypeFilter}
                onChange={(e) => handleDeviceTypeFilter(e.target.value)}
                className={`px-3 py-2 text-sm rounded-md border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0`}
                title="Filter by device type"
              >
                <option value="all">All Devices</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
                <option value="tablet">Tablet</option>
              </select>

              {/* Date Range Filter */}
              <select
                value={dateRange.preset}
                onChange={(e) => handleDatePresetFilter(e.target.value)}
                className={`px-3 py-2 text-sm rounded-md border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0`}
                title="Filter by date range"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>

              {/* Action Buttons Group */}
              <div className="flex items-center gap-2">
                {/* Clear Filters Button - Icon */}
                {(searchTerm ||
                  deviceTypeFilter !== "all" ||
                  dateRange.preset !== "all") && (
                  <button
                    onClick={handleResetFilters}
                    className={`p-2 rounded-md  ${currentTheme.border} ${currentTheme.text} hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors`}
                    title="Clear all filters"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className={`p-2 rounded-md  ${currentTheme.border} ${currentTheme.text} ${currentTheme.hover} transition-colors disabled:opacity-50`}
                  title="Refresh sessions"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
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
            {/* Header - Mobile Responsive */}
            <div className="flex flex-col gap-3 mb-2">
              {/* Title Row */}
              <div className="flex items-center justify-between">
                {/* View Toggle - Desktop Only */}
                <div
                  className={`hidden lg:flex items-center border ${currentTheme.border} rounded-lg p-1`}
                >
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-all duration-200 ${
                      viewMode === "list"
                        ? `${currentTheme.activeBg} ${currentTheme.text} shadow-sm`
                        : `${currentTheme.textSecondary} hover:${currentTheme.hover}`
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-all duration-200 ${
                      viewMode === "grid"
                        ? `${currentTheme.activeBg} ${currentTheme.text} shadow-sm`
                        : `${currentTheme.textSecondary} hover:${currentTheme.hover}`
                    }`}
                    title="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search and Filters Row */}
            </div>
            {/* Sessions List/Grid View */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "space-y-3"
              }
            >
              {currentSessions?.map((session) =>
                viewMode === "list" ? (
                  // List View - Mobile Optimized
                  <div
                    key={session.id}
                    className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-gray-50 to-white-50`}
                  >
                    {/* Header Row - Mobile Optimized */}
                    <div className="flex items-start sm:items-center justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {session.type === "chat" ? (
                          <MessageSquare className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        ) : (
                          <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-semibold ${currentTheme.text} text-sm truncate`}
                          >
                            {session.sessionId}
                          </h4>
                          <p
                            className={`text-xs ${currentTheme.textSecondary} truncate`}
                          >
                            {[
                              session.location?.city,
                              session.location?.region,
                              session.location?.country,
                            ]
                              .filter(Boolean)
                              .join(", ") || "Unknown Location"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewSession(session)}
                        className={`p-1 flex items-center justify-center ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} ${currentTheme.hover} transition-all duration-200 flex-shrink-0 `}
                        title="View Session"
                      >
                        {loadingTranscript ? (
                          <div className="w-4 h-4 border border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Status Badges - Mobile Optimized */}
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusBadge(session.status)}
                      {getSentimentBadge(session.sentiment)}
                    </div>

                    {/* Data Grid - Mobile Optimized */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="space-y-1">
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Device
                        </p>

                        <p
                          className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                        >
                          {session.device?.deviceType || "Unknown Device"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Duration
                        </p>
                        <p
                          className={`${currentTheme.text} font-medium text-sm leading-tight`}
                        >
                          {session.duration}
                        </p>
                        <p
                          className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                        >
                          Session time
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Date & Time
                        </p>
                        <p
                          className={`${currentTheme.text} font-medium text-sm leading-tight`}
                        >
                          {new Date(session.startTime).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "2-digit",
                            }
                          )}
                        </p>
                        <p
                          className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                        >
                          {new Date(session.startTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Messages
                        </p>
                        <p
                          className={`${currentTheme.text} font-medium text-sm leading-tight`}
                        >
                          {session.messageCount?.total ||
                            session.transcriptCount ||
                            session.transcripts.length ||
                            0}
                        </p>
                        <p
                          className={`text-xs ${currentTheme.textSecondary} leading-tight`}
                        >
                          AI: {session.messageCount?.ai || 0} • User:{" "}
                          {session.messageCount?.user || 0}
                        </p>
                      </div>
                    </div>

                    {/* Token Usage - Mobile Optimized */}
                    {session.tokenUsage && (
                      <div
                        className={`mt-3 pt-3 border-t ${currentTheme.border}`}
                      >
                        <p
                          className={`text-xs ${currentTheme.textSecondary} mb-2`}
                        >
                          Token Usage
                        </p>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                          <div
                            className={`${currentTheme.searchBg} rounded-lg p-2 text-center`}
                          >
                            <p
                              className={`text-xs ${currentTheme.textSecondary} mb-1`}
                            >
                              Input
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-bold`}
                            >
                              {(
                                session.tokenUsage.input_tokens ||
                                session.tokenUsage.inputTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div
                            className={`${currentTheme.searchBg} rounded-lg p-2 text-center`}
                          >
                            <p
                              className={`text-xs ${currentTheme.textSecondary} mb-1`}
                            >
                              Output
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-bold`}
                            >
                              {(
                                session.tokenUsage.output_tokens ||
                                session.tokenUsage.outputTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div
                            className={`${currentTheme.searchBg} rounded-lg p-2 text-center`}
                          >
                            <p
                              className={`text-xs ${currentTheme.textSecondary} mb-1`}
                            >
                              Total
                            </p>
                            <p className="text-blue-600 text-sm font-bold">
                              {(
                                session.tokenUsage.total_tokens ||
                                session.tokenUsage.totalTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ISP & Location Details - Mobile Optimized */}
                    <div
                      className={`mt-3 pt-3 border-t ${currentTheme.border}`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span
                          className={`${currentTheme.textSecondary} truncate flex-1`}
                          title={session.location?.isp}
                        >
                          ISP: {session.location?.isp || "Unknown"}
                        </span>
                        {session.location?.zip && (
                          <span
                            className={`${currentTheme.textSecondary} ml-2 flex-shrink-0`}
                          >
                            ZIP: {session.location.zip}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    {session.tags && session.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {session.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 ${
                              theme === "dark"
                                ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                : "bg-gray-100 text-gray-700"
                            } text-xs rounded-full`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Grid View - Card Layout
                  <div
                    key={session.id}
                    className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 hover:shadow-lg transition-all duration-200 h-fit`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {session.type === "chat" ? (
                          <MessageSquare className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        ) : (
                          <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <h4
                            className={`font-semibold ${currentTheme.text} text-sm truncate`}
                          >
                            {session.sessionId}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewSession(session)}
                        className={`p-1.5 ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} ${currentTheme.hover} transition-all duration-200 hover:shadow-lg flex-shrink-0`}
                        title="View Session"
                      >
                        {loadingTranscript ? (
                          <div className="w-3 h-3 border border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {getStatusBadge(session.status)}
                      {getSentimentBadge(session.sentiment)}
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                      <p
                        className={`text-xs font-medium ${currentTheme.textSecondary} mb-1`}
                      >
                        Location
                      </p>
                      <p
                        className={`${currentTheme.text} text-sm font-medium truncate`}
                        title={`${[
                          session.location?.city,
                          session.location?.region,
                          session.location?.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}`}
                      >
                        {[
                          session.location?.city,
                          session.location?.region,
                          session.location?.country,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Unknown Location"}
                      </p>
                      <p
                        className={`text-xs ${currentTheme.textSecondary} truncate`}
                      >
                        {session.location?.isp || "Unknown ISP"}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Device
                        </p>
                        <p
                          className={`${currentTheme.text} text-sm font-medium truncate`}
                        >
                          {session.device?.browser || "Unknown"}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Duration
                        </p>
                        <p
                          className={`${currentTheme.text} text-sm font-medium`}
                        >
                          {session.duration}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Date
                        </p>
                        <p
                          className={`${currentTheme.text} text-sm font-medium`}
                        >
                          {new Date(session.startTime).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          Messages
                        </p>
                        <p
                          className={`${currentTheme.text} text-sm font-medium`}
                        >
                          {session.messageCount?.total ||
                            session.transcriptCount ||
                            session.transcripts.length ||
                            0}
                        </p>
                      </div>
                    </div>

                    {/* Token Usage */}
                    {session.tokenUsage && (
                      <div className={`pt-3 border-t ${currentTheme.border}`}>
                        <p
                          className={`text-xs ${currentTheme.textSecondary} mb-2`}
                        >
                          Token Usage
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              In
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-semibold`}
                            >
                              {(
                                session.tokenUsage.input_tokens ||
                                session.tokenUsage.inputTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Out
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-semibold`}
                            >
                              {(
                                session.tokenUsage.output_tokens ||
                                session.tokenUsage.outputTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Total
                            </p>
                            <p
                              className={`text-blue-600 text-sm font-semibold`}
                            >
                              {(
                                session.tokenUsage.total_tokens ||
                                session.tokenUsage.totalTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Time */}
                    <div
                      className={`pt-2 border-t ${currentTheme.border} text-center`}
                    >
                      <p className={`text-xs ${currentTheme.textSecondary}`}>
                        {new Date(session.startTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                    </div>

                    {/* Tags */}
                    {session.tags && session.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {session.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 ${
                              theme === "dark"
                                ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                : "bg-gray-100 text-gray-700"
                            } text-xs rounded-full`}
                          >
                            {tag}
                          </span>
                        ))}
                        {session.tags.length > 2 && (
                          <span
                            className={`text-xs ${currentTheme.textSecondary} px-1 py-1`}
                          >
                            +{session.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
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
                <StyledButton onClick={handleResetFilters}>
                  <RefreshCw className="w-4 h-4" />
                </StyledButton>
              </div>
            )}
          </>
        )}{" "}
        {/* Transcript Modal - Mobile Optimized */}
        {selectedSession && (
          <div className="fixed inset-0 -top-8 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm overflow-y-auto">
            <div
              className={`${currentTheme.cardBg} rounded-lg sm:rounded-xl w-full max-w-3xl  max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl my-auto flex flex-col`}
            >
              {/* Header - Mobile Optimized */}
              <div className={`p-3 sm:p-4 border-b ${currentTheme.border}`}>
                <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-7 h-7 sm:w-10 sm:h-10 ${currentTheme.activeBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <MessageSquare
                        className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2
                        className={`text-sm sm:text-lg font-semibold ${currentTheme.text} truncate`}
                      >
                        Session Transcript
                      </h2>
                      <p
                        className={`text-xs ${currentTheme.textSecondary} truncate font-mono`}
                      >
                        {selectedSession.sessionId || selectedSession.id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSession(null)}
                    className={`p-1 sm:p-2 ${currentTheme.textSecondary} rounded-lg ${currentTheme.hover} transition-colors flex-shrink-0`}
                  >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Session Info */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div
                    className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                  >
                    <Clock
                      className={`w-3 h-3 ${currentTheme.textSecondary} flex-shrink-0`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                      >
                        Date & Time
                      </p>
                      <span
                        className={`text-xs font-medium ${currentTheme.text} truncate block`}
                      >
                        {formatDate(selectedSession.startTime)}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                  >
                    <MapPin
                      className={`w-3 h-3 ${currentTheme.textSecondary} flex-shrink-0`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                      >
                        Location & IP
                      </p>
                      <span
                        className={`text-xs font-medium ${currentTheme.text} truncate block`}
                        title={`${selectedSession.location?.city || "Unknown"}, ${selectedSession.location?.region || ""} ${selectedSession.location?.country || "Unknown"} • IP: ${selectedSession.userIP || "Unknown"} • ISP: ${selectedSession.location?.isp || "Unknown"}`}
                      >
                        {selectedSession.location?.city || "Unknown"},{" "}
                        {selectedSession.location?.country || "Unknown"} •{" "}
                        {selectedSession.userIP || "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                  >
                    <Phone
                      className={`w-3 h-3 ${currentTheme.textSecondary} flex-shrink-0`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                      >
                        Device • Duration
                      </p>
                      <span
                        className={`text-xs font-medium ${currentTheme.text} truncate block`}
                      >
                        {selectedSession.device?.deviceType ||
                          selectedSession.device?.device_type ||
                          "Unknown"}{" "}
                        • {selectedSession.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div
                  className={`flex gap-1 p-1 ${currentTheme.searchBg} rounded-lg`}
                >
                  <button
                    onClick={() => setActiveTab("transcripts")}
                    className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === "transcripts"
                        ? `${currentTheme.cardBg} ${currentTheme.text} shadow-sm`
                        : `${currentTheme.textSecondary} hover:${currentTheme.text}`
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1.5" />
                    Call Transcripts
                  </button>
                  <button
                    onClick={() => setActiveTab("summary")}
                    className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === "summary"
                        ? `${currentTheme.cardBg} ${currentTheme.text} shadow-sm`
                        : `${currentTheme.textSecondary} hover:${currentTheme.text}`
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1.5" />
                    Recording & Summary
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                {/* Tab Content: Call Transcripts */}
                {activeTab === "transcripts" && (
                  <>
                    {/* Token Usage - Mobile Optimized */}
                    {(selectedSession.token_usage ||
                      selectedSession.tokenUsage) && (
                      <div
                        className={`px-3 sm:px-4 py-3 mb-3 ${currentTheme.searchBg} rounded-lg`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Activity
                            className={`w-4 h-4 ${currentTheme.text}`}
                          />
                          <h4
                            className={`text-sm sm:text-base font-semibold ${currentTheme.text}`}
                          >
                            Token Usage
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                          <div
                            className={`${currentTheme.cardBg} rounded-lg p-2 sm:p-3 border ${currentTheme.border}`}
                          >
                            <p
                              className={`text-xs ${currentTheme.textSecondary} mb-1`}
                            >
                              Input
                            </p>
                            <p
                              className={`text-lg sm:text-xl font-bold ${currentTheme.text}`}
                            >
                              {(
                                (
                                  selectedSession.token_usage ||
                                  selectedSession.tokenUsage
                                )?.input_tokens ||
                                (
                                  selectedSession.token_usage ||
                                  selectedSession.tokenUsage
                                )?.inputTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div
                            className={`${currentTheme.cardBg} rounded-lg p-2 sm:p-3 border ${currentTheme.border}`}
                          >
                            <p
                              className={`text-xs ${currentTheme.textSecondary} mb-1`}
                            >
                              Output
                            </p>
                            <p
                              className={`text-lg sm:text-xl font-bold ${currentTheme.text}`}
                            >
                              {(
                                (
                                  selectedSession.token_usage ||
                                  selectedSession.tokenUsage
                                )?.output_tokens ||
                                (
                                  selectedSession.token_usage ||
                                  selectedSession.tokenUsage
                                )?.outputTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div
                            className={`${currentTheme.cardBg} rounded-lg p-2 sm:p-3 border ${currentTheme.border}`}
                          >
                            <p
                              className={`text-xs ${currentTheme.textSecondary} mb-1`}
                            >
                              Total
                            </p>
                            <p
                              className={`text-lg sm:text-xl font-bold text-blue-600`}
                            >
                              {(
                                (
                                  selectedSession.token_usage ||
                                  selectedSession.tokenUsage
                                )?.total_tokens ||
                                (
                                  selectedSession.token_usage ||
                                  selectedSession.tokenUsage
                                )?.totalTokens ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Transcript Messages */}
                    <div
                      className={`${currentTheme.searchBg} p-3 sm:p-4 rounded-lg`}
                    >
                      <h3
                        className={`text-sm sm:text-base font-semibold ${currentTheme.text} mb-3`}
                      >
                        Conversation Transcript
                      </h3>
                      <div className="space-y-1 max-h-[250px] sm:max-h-[400px] overflow-y-auto">
                        {selectedSession.transcripts &&
                        selectedSession.transcripts.length > 0 ? (
                          <>
                            <p
                              className={`text-xs sm:text-sm ${currentTheme.textSecondary} mb-2`}
                            >
                              Conversation started at{" "}
                              {formatDate(selectedSession.startTime)}
                            </p>

                            {selectedSession.transcripts.map(
                              (message, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col gap-1.5 py-1.5 sm:py-2"
                                >
                                  {message.speaker === "ai" ? (
                                    <>
                                      <div className="flex justify-start mb-1">
                                        <span
                                          className={`text-xs ${currentTheme.textSecondary}`}
                                        >
                                          SHIVAI ASSISTANT •{" "}
                                          {formatTranscriptTimestamp(
                                            message.timestamp
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex items-start gap-1.5 sm:gap-2">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                          <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <div
                                          className={`max-w-[80%] ${currentTheme.cardBg} rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-3 border ${currentTheme.border}`}
                                        >
                                          <p
                                            className={`text-xs sm:text-sm ${currentTheme.text}`}
                                          >
                                            {message.message}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex justify-end mb-1">
                                        <span
                                          className={`text-xs ${currentTheme.textSecondary}`}
                                        >
                                          CUSTOMER •{" "}
                                          {formatTranscriptTimestamp(
                                            message.timestamp
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex justify-end">
                                        <div className="flex flex-col items-end max-w-[80%]">
                                          <div className="rounded-2xl rounded-tr-sm px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-br from-blue-500 to-blue-600">
                                            <p className="text-xs sm:text-sm text-white">
                                              {message.message}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )
                            )}

                            <p
                              className={`text-xs ${currentTheme.textSecondary} mt-3 flex items-center gap-1`}
                            >
                              <Clock className="w-3 h-3" />
                              Session ended • Resolution:{" "}
                              {selectedSession.resolution}
                            </p>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <FileText
                              className={`w-10 h-10 sm:w-12 sm:h-12 ${currentTheme.textSecondary} mx-auto mb-3`}
                            />
                            <p
                              className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                            >
                              No transcripts available for this session
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Tab Content: Summary */}
                {activeTab === "summary" && (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Call Recording Section */}
                    <div
                      className={`${currentTheme.searchBg} p-3 sm:p-4 rounded-lg`}
                    >
                      <h3
                        className={`text-sm sm:text-base font-semibold ${currentTheme.text} mb-3 flex items-center gap-2`}
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                        Call Recording
                      </h3>

                      {/* Audio Player */}
                      <div
                        className={`${currentTheme.cardBg} p-4 rounded-xl border ${currentTheme.border}`}
                      >
                        {/* Hidden audio element */}
                        <audio
                          ref={audioRef}
                          onTimeUpdate={handleTimeUpdate}
                          onLoadedMetadata={handleLoadedMetadata}
                          onEnded={() => setIsPlaying(false)}
                          src={selectedSession.recordingUrl || "#"}
                        />

                        {/* Progress bar */}
                        <div
                          ref={progressRef}
                          onClick={handleProgressClick}
                          className={`relative h-1 ${currentTheme.border} rounded-full cursor-pointer mb-2`}
                          style={{
                            backgroundColor:
                              currentTheme === "dark" ? "#334155" : "#cbd5e1",
                          }}
                        >
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all"
                            style={{
                              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                            }}
                          />
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between gap-3">
                          {/* Time display */}
                          <span
                            className={`text-xs ${currentTheme.textSecondary} w-10`}
                          >
                            {formatTimeDisplay(currentTime)}
                          </span>

                          {/* Player controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => skip(-10)}
                              className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                              title="Rewind 10s"
                            >
                              <SkipBack
                                className={`w-4 h-4 ${currentTheme.textSecondary}`}
                              />
                            </button>

                            <button
                              onClick={togglePlayPause}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                              title={isPlaying ? "Pause" : "Play"}
                            >
                              {isPlaying ? (
                                <Pause
                                  className="w-4 h-4"
                                  fill="currentColor"
                                />
                              ) : (
                                <Play
                                  className="w-4 h-4 ml-0.5"
                                  fill="currentColor"
                                />
                              )}
                            </button>

                            <button
                              onClick={() => skip(10)}
                              className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                              title="Forward 10s"
                            >
                              <SkipForward
                                className={`w-4 h-4 ${currentTheme.textSecondary}`}
                              />
                            </button>

                            <button
                              onClick={changeSpeed}
                              className={`px-2 py-1 hover:${currentTheme.searchBg} rounded transition-colors text-xs ${currentTheme.textSecondary}`}
                              title="Playback speed"
                            >
                              {playbackSpeed}x
                            </button>

                            <button
                              onClick={toggleMute}
                              className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                              title={isMuted ? "Unmute" : "Mute"}
                            >
                              {isMuted ? (
                                <VolumeX
                                  className={`w-4 h-4 ${currentTheme.textSecondary}`}
                                />
                              ) : (
                                <Volume2
                                  className={`w-4 h-4 ${currentTheme.textSecondary}`}
                                />
                              )}
                            </button>

                            <button
                              className={`p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                              title="Download recording"
                            >
                              <Download
                                className={`w-4 h-4 ${currentTheme.textSecondary}`}
                              />
                            </button>
                          </div>

                          {/* Duration */}
                          <span
                            className={`text-xs ${currentTheme.textSecondary} w-10 text-right`}
                          >
                            {formatTimeDisplay(
                              duration || selectedSession.duration || 0
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Call Summary Section */}
                    <div
                      className={`${currentTheme.searchBg} p-3 sm:p-4 rounded-lg`}
                    >
                      <h3
                        className={`text-sm sm:text-base font-semibold ${currentTheme.text} mb-3 flex items-center gap-2`}
                      >
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        Call Summary
                      </h3>

                      {summaryLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        </div>
                      ) : summaryError ? (
                        <div className="text-center py-6">
                          <XCircle
                            className={`w-10 h-10 ${currentTheme.textSecondary} mx-auto mb-2`}
                          />
                          <p
                            className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                          >
                            {summaryError}
                          </p>
                        </div>
                      ) : callSummary?.data?.leads &&
                        callSummary.data.leads.length > 0 ? (
                        (() => {
                          const filteredLeads = callSummary.data.leads.filter(
                            (lead) =>
                              lead.callId ===
                              (selectedSession.callId ||
                                selectedSession.sessionId ||
                                selectedSession.id)
                          );

                          console.log(
                            "🔍 Filtering leads. Looking for callId:",
                            selectedSession.callId ||
                              selectedSession.sessionId ||
                              selectedSession.id
                          );
                          console.log(
                            "🔍 Available callIds:",
                            callSummary.data.leads.map((l) => l.callId)
                          );
                          console.log("🔍 Filtered leads:", filteredLeads);

                          return filteredLeads.length > 0 ? (
                            <div className="space-y-4">
                              {filteredLeads.map((lead, leadIndex) => (
                                <div
                                  key={lead.id || leadIndex}
                                  className={`border ${currentTheme.border} rounded-lg p-3 sm:p-4 space-y-3`}
                                >
                                  {/* Call ID and Date */}
                                  <div
                                    className={`flex items-center justify-between pb-2 border-b ${currentTheme.border}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                                      <span
                                        className={`text-xs font-mono ${currentTheme.textSecondary}`}
                                      >
                                        {lead.callId || "N/A"}
                                      </span>
                                    </div>
                                    {lead.createdAt && (
                                      <span
                                        className={`text-xs ${currentTheme.textSecondary}`}
                                      >
                                        {new Date(
                                          lead.createdAt
                                        ).toLocaleString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    )}
                                  </div>

                                  {/* Intent Details */}
                                  {lead.intent && (
                                    <div className="space-y-2">
                                      {lead.intent.primary && (
                                        <div
                                          className={`bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700`}
                                        >
                                          <p
                                            className={`text-xs font-medium text-blue-700 dark:text-blue-300 mb-1`}
                                          >
                                            Primary Intent
                                          </p>
                                          <p
                                            className={`text-xs sm:text-sm ${currentTheme.text} leading-relaxed`}
                                          >
                                            {lead.intent.primary}
                                          </p>
                                        </div>
                                      )}

                                      {lead.intent.details && (
                                        <div
                                          className={`${currentTheme.cardBg} p-3 rounded-lg border ${currentTheme.border}`}
                                        >
                                          <p
                                            className={`text-xs font-medium ${currentTheme.textSecondary} mb-1`}
                                          >
                                            Details
                                          </p>
                                          <p
                                            className={`text-xs sm:text-sm ${currentTheme.text} leading-relaxed`}
                                          >
                                            {lead.intent.details}
                                          </p>
                                        </div>
                                      )}

                                      {/* Urgency */}
                                      {lead.urgency && (
                                        <div className="flex items-center gap-2">
                                          <span
                                            className={`text-xs ${currentTheme.textSecondary}`}
                                          >
                                            Urgency:
                                          </span>
                                          <span
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                              lead.urgency === "high"
                                                ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                                : lead.urgency === "medium"
                                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                                  : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                            }`}
                                          >
                                            {lead.urgency}
                                          </span>
                                        </div>
                                      )}

                                      {/* Tags */}
                                      {lead.tags && lead.tags.length > 0 && (
                                        <div>
                                          <p
                                            className={`text-xs font-medium ${currentTheme.textSecondary} mb-2`}
                                          >
                                            Tags
                                          </p>
                                          <div className="flex flex-wrap gap-1.5">
                                            {lead.tags.map((tag, tagIndex) => (
                                              <span
                                                key={tagIndex}
                                                className={`px-2 py-0.5 ${currentTheme.cardBg} ${currentTheme.text} rounded-full text-xs border ${currentTheme.border}`}
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Lead Contact Information */}
                                  {lead.leadData && (
                                    <div>
                                      <p
                                        className={`text-xs font-medium ${currentTheme.textSecondary} mb-2`}
                                      >
                                        Lead Information
                                      </p>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {lead.leadData.name && (
                                          <div className="flex items-start gap-2">
                                            <Users
                                              className={`w-4 h-4 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                            />
                                            <div className="min-w-0">
                                              <p
                                                className={`text-xs ${currentTheme.textSecondary}`}
                                              >
                                                Name
                                              </p>
                                              <p
                                                className={`text-sm font-medium ${currentTheme.text} truncate`}
                                              >
                                                {lead.leadData.name}
                                              </p>
                                            </div>
                                          </div>
                                        )}

                                        {lead.leadData.email && (
                                          <div className="flex items-start gap-2">
                                            <Mail
                                              className={`w-4 h-4 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                            />
                                            <div className="min-w-0">
                                              <p
                                                className={`text-xs ${currentTheme.textSecondary}`}
                                              >
                                                Email
                                              </p>
                                              <p
                                                className={`text-sm font-medium ${currentTheme.text} truncate`}
                                              >
                                                {lead.leadData.email}
                                              </p>
                                            </div>
                                          </div>
                                        )}

                                        {lead.leadData.phone && (
                                          <div className="flex items-start gap-2">
                                            <Phone
                                              className={`w-4 h-4 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                            />
                                            <div className="min-w-0">
                                              <p
                                                className={`text-xs ${currentTheme.textSecondary}`}
                                              >
                                                Phone
                                              </p>
                                              <p
                                                className={`text-sm font-medium ${currentTheme.text}`}
                                              >
                                                {lead.leadData.phone}
                                              </p>
                                            </div>
                                          </div>
                                        )}

                                        {lead.leadData.status && (
                                          <div className="flex items-start gap-2">
                                            <TrendingUp
                                              className={`w-4 h-4 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                            />
                                            <div>
                                              <p
                                                className={`text-xs ${currentTheme.textSecondary}`}
                                              >
                                                Status
                                              </p>
                                              <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                  lead.leadData.status ===
                                                  "qualified"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                    : lead.leadData.status ===
                                                        "interested"
                                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                      : lead.leadData.status ===
                                                          "new"
                                                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                                                        : `${currentTheme.cardBg} ${currentTheme.text}`
                                                }`}
                                              >
                                                {lead.leadData.status ===
                                                  "qualified" && (
                                                  <CheckCircle className="w-3 h-3" />
                                                )}
                                                {lead.leadData.status}
                                              </span>
                                            </div>
                                          </div>
                                        )}

                                        {lead.leadData.group_size && (
                                          <div className="flex items-start gap-2">
                                            <Users
                                              className={`w-4 h-4 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                            />
                                            <div>
                                              <p
                                                className={`text-xs ${currentTheme.textSecondary}`}
                                              >
                                                Group Size
                                              </p>
                                              <p
                                                className={`text-sm font-medium ${currentTheme.text}`}
                                              >
                                                {lead.leadData.group_size}
                                              </p>
                                            </div>
                                          </div>
                                        )}

                                        {lead.leadData.dates && (
                                          <div className="flex items-start gap-2">
                                            <Calendar
                                              className={`w-4 h-4 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
                                            />
                                            <div>
                                              <p
                                                className={`text-xs ${currentTheme.textSecondary}`}
                                              >
                                                Travel Dates
                                              </p>
                                              <p
                                                className={`text-sm font-medium ${currentTheme.text}`}
                                              >
                                                {lead.leadData.dates}
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6">
                              <FileText
                                className={`w-10 h-10 ${currentTheme.textSecondary} mx-auto mb-2`}
                              />
                              <p
                                className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                              >
                                No matching summary for this call
                              </p>
                              <p
                                className={`text-xs ${currentTheme.textSecondary} mt-1`}
                              >
                                Call ID:{" "}
                                {selectedSession.callId ||
                                  selectedSession.sessionId ||
                                  selectedSession.id}
                              </p>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center py-6">
                          <FileText
                            className={`w-10 h-10 ${currentTheme.textSecondary} mx-auto mb-2`}
                          />
                          <p
                            className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}
                          >
                            No call summary available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Pagination Footer - Professional & Modern */}
        <div
          className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t ${currentTheme.border}`}
        >
          {/* Results Summary */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              className={`text-sm ${currentTheme.textSecondary} text-center sm:text-left`}
            >
              Showing{" "}
              <span className={`font-medium ${currentTheme.text}`}>
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className={`font-medium ${currentTheme.text}`}>
                {Math.min(endIndex, totalItems)}
              </span>{" "}
              of{" "}
              <span className={`font-medium ${currentTheme.text}`}>
                {totalItems}
              </span>{" "}
              results
              <span className="block sm:inline sm:ml-1 text-xs">
                (Page {currentPage} of {totalPages})
              </span>
            </div>

            {/* Pagination Controls - Modern Design - Hidden on mobile */}
            {totalPages > 1 && (
              <nav
                className="hidden sm:flex items-center justify-end space-x-1"
                aria-label="Pagination"
              >
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`
                      inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
                      border ${currentTheme.border} ${currentTheme.text}
                      hover:${currentTheme.hover} 
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      transition-all duration-200
                    `}
                  title="Previous page"
                  aria-label="Go to previous page"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {/* First Page */}
                  {currentPage > 3 && (
                    <>
                      <button
                        onClick={() => goToPage(1)}
                        className={`
                            inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg
                            border ${currentTheme.border} ${currentTheme.text}
                            hover:${currentTheme.hover}
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            transition-all duration-200 min-w-[40px]
                          `}
                        aria-label="Go to page 1"
                      >
                        1
                      </button>
                      {currentPage > 4 && (
                        <span
                          className={`px-2 py-2 text-sm ${currentTheme.textSecondary}`}
                          aria-hidden="true"
                        >
                          ⋯
                        </span>
                      )}
                    </>
                  )}

                  {/* Visible Page Range */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page >= Math.max(1, currentPage - 1) &&
                        page <= Math.min(totalPages, currentPage + 1)
                    )
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`
                            inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg
                            border transition-all duration-200 min-w-[40px]
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            ${
                              page === currentPage
                                ? `${currentTheme.activeBg} ${currentTheme.text} border-blue-500 shadow-sm`
                                : `${currentTheme.border} ${currentTheme.text} hover:${currentTheme.hover}`
                            }
                          `}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === currentPage ? "page" : undefined}
                      >
                        {page}
                      </button>
                    ))}

                  {/* Last Page */}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <span
                          className={`px-2 py-2 text-sm ${currentTheme.textSecondary}`}
                          aria-hidden="true"
                        >
                          ⋯
                        </span>
                      )}
                      <button
                        onClick={() => goToPage(totalPages)}
                        className={`
                            inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg
                            border ${currentTheme.border} ${currentTheme.text}
                            hover:${currentTheme.hover}
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            transition-all duration-200 min-w-[40px]
                          `}
                        aria-label={`Go to page ${totalPages}`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`
                      inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
                      border ${currentTheme.border} ${currentTheme.text}
                      hover:${currentTheme.hover}
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      transition-all duration-200
                    `}
                  title="Next page"
                  aria-label="Go to next page"
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </nav>
            )}
          </div>

          {/* Mobile Compact View */}
          {totalPages > 1 && (
            <div className="flex sm:hidden items-center justify-center mt-4 space-x-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`
                    p-2 rounded-lg border ${currentTheme.border} ${currentTheme.text}
                    hover:${currentTheme.hover} disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-all duration-200
                  `}
                aria-label="Previous page"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div
                className={`px-4 py-2 text-sm font-medium ${currentTheme.text} border ${currentTheme.border} rounded-lg`}
              >
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`
                    p-2 rounded-lg border ${currentTheme.border} ${currentTheme.text}
                    hover:${currentTheme.hover} disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-all duration-200
                  `}
                aria-label="Next page"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIEmployeeStatsMain;
