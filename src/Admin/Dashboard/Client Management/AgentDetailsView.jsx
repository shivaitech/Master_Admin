import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  ArrowLeft,
  Bot,
  Mic,
  Globe,
  Info,
  MessageCircle,
  BarChart3,
  FileText,
  Phone,
  Eye,
  MessageSquare,
  XCircle,
  Clock,
  MapPin,
  Activity,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Loader2,
  Users,
  Mail,
  TrendingUp,
  CheckCircle,
  Calendar,
  Send,
  Trash2,
  Download,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";
import AgentPreview from "./AgentPreview"; // You'll need to create this component too

const AgentDetailsView = ({ agent, onBack, currentTheme }) => {
  // Safety check for agent prop
  if (!agent) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No agent data available</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    );
  }

  // Agent testing state
  const [activeTab, setActiveTab] = useState("overview");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [isTestingAgent, setIsTestingAgent] = useState(false);
  const [testStatus, setTestStatus] = useState("");
  const [language, setLanguage] = useState("en");
  const [room, setRoom] = useState(null);

  // Analytics/Sessions state
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [transcripts, setTranscripts] = useState([]);
  const [loadingTranscripts, setLoadingTranscripts] = useState(false);

  // Modal tab state
  const [modalActiveTab, setModalActiveTab] = useState("transcripts");

  // Call summary state
  const [callSummary, setCallSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // Audio settings state
  const [audioSettings, setAudioSettings] = useState({
    noiseSuppression: true,
    echoCancellation: true,
    autoGainControl: true,
  });

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Memoize tabs array to prevent re-renders
  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview", icon: Info },
      { id: "test", label: "Preview", icon: MessageCircle },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "instructions", label: "Instructions", icon: FileText },
    ],
    []
  );

  // Fetch agent sessions when analytics tab is active
  useEffect(() => {
    const fetchAgentSessions = async () => {
      if (activeTab !== "analytics") return;

      try {
        setLoadingSessions(true);
        const agentId = agent?.id || agent?._id;

        if (!agentId) {
          console.error("No agent ID found");
          return;
        }

        console.log("📋 Fetching sessions for agent:", agentId);
        const response = await shivaiApiService.getAgentSessions(agentId);
        console.log("✅ Sessions response:", response);

        // Handle different response structures
        const sessionsData =
          response?.sessions || response?.data?.sessions || response;
        const sessionsArray = Array.isArray(sessionsData) ? sessionsData : [];

        setSessions(sessionsArray);
      } catch (error) {
        console.error("❌ Error fetching agent sessions:", error);
        toast.error("Failed to load sessions");
        setSessions([]);
      } finally {
        setLoadingSessions(false);
      }
    };

    fetchAgentSessions();
  }, [activeTab, agent]);

  // Fetch call summary
  const fetchCallSummary = async (agentId, callId) => {
    try {
      setSummaryLoading(true);
      setSummaryError(null);
      console.log(
        "📊 Fetching call summary for agent:",
        agentId,
        "callId:",
        callId
      );

      const response = await shivaiApiService.getCallSummary(agentId);
      console.log("✅ Call summary response:", response);

      setCallSummary(response);
    } catch (error) {
      console.error("❌ Error fetching call summary:", error);
      setSummaryError("Failed to load call summary");
      setCallSummary(null);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Audio player helper functions
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
    if (progressRef.current && audioRef.current && duration > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const newSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const formatTranscriptTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle test message sending
  const handleTestAgent = useCallback(() => {
    if (!testMessage.trim()) return;

    setIsTestingAgent(true);

    const userMessage = {
      role: "user",
      text: testMessage.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setTestMessage("");

    // Simulate agent response
    setTimeout(
      () => {
        const responses = [
          `Thank you for testing! You said: "${userMessage.text}". I'm ${agent?.name || "Agent"} and I'm working correctly.`,
          `Test successful! As ${agent?.name || "Agent"}, I received your message: "${userMessage.text}". How can I assist you further?`,
          `Hello! This is ${agent?.name || "Agent"}. I got your test message: "${userMessage.text}". The agent is responding as expected.`,
          `Agent test complete! Your message: "${userMessage.text}" was processed successfully by ${agent?.name || "Agent"}.`,
        ];

        const agentResponse = {
          role: "agent",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, agentResponse]);
        setIsTestingAgent(false);
      },
      1500 + Math.random() * 1000
    );
  }, [testMessage, agent]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTimeDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownloadRecording = async () => {
    const recordingUrl = selectedSession?.recording?.url || selectedSession?.recordingUrl || selectedSession?.recording_url;
    
    if (!recordingUrl) {
      toast.error("No recording available to download");
      return;
    }

    try {
      toast.loading("Downloading...", { id: "download-recording" });
      
      const response = await fetch(recordingUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `recording_${selectedSession.sessionId || selectedSession.callId || selectedSession.id || "audio"}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Downloaded!", { id: "download-recording" });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download recording", { id: "download-recording" });
    }
  };

  const handleShareRecording = async () => {
    const recordingUrl = selectedSession?.recording?.url || selectedSession?.recordingUrl || selectedSession?.recording_url;
    
    if (!recordingUrl) {
      toast.error("No recording available to share");
      return;
    }

    const shareData = {
      title: `Call Recording - ${selectedSession.session_id || selectedSession.callId || selectedSession.id || "Session"}`,
      text: `Listen to this call recording from ${formatDate(selectedSession.start_time)}`,
      url: recordingUrl,
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(recordingUrl);
        toast.success("Recording link copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share error:", error);
        // Fallback to clipboard copy
        try {
          await navigator.clipboard.writeText(recordingUrl);
          toast.success("Recording link copied to clipboard!");
        } catch (clipboardError) {
          toast.error("Failed to share recording");
        }
      }
    }
  };

  const handleViewSession = useCallback(async (session) => {
    try {
      setSelectedSession(session);
      setModalActiveTab("transcripts"); // Reset to transcripts tab

      // Reset audio player state
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setPlaybackSpeed(1);
      setIsMuted(false);

      // Check if transcripts are already in the session object
      if (session?.transcripts && Array.isArray(session.transcripts)) {
        console.log(
          "📜 Using transcripts from session object:",
          session.transcripts
        );
        setTranscripts(session.transcripts);
      } else {
        // Otherwise fetch from API
        setLoadingTranscripts(true);
        const sessionId = session?.session_id || session?.id || session?._id;
        console.log("📜 Fetching transcripts for session:", sessionId);

        const response =
          await shivaiApiService.getSessionTranscripts(sessionId);
        console.log("✅ Transcripts response:", response);

        const transcriptsData =
          response?.transcripts || response?.data || response;
        const transcriptsArray = Array.isArray(transcriptsData)
          ? transcriptsData
          : [];

        setTranscripts(transcriptsArray);
        setLoadingTranscripts(false);
      }

      // Fetch call summary
      const agentId = session?.agentId || session?.agent_id;
      const callId = session?.callId || session?.session_id || session?.id;
      if (agentId && callId) {
        await fetchCallSummary(agentId, callId);
      }
    } catch (error) {
      console.error("❌ Error fetching session data:", error);
      toast.error("Failed to load session data");
      setTranscripts([]);
      setLoadingTranscripts(false);
    }
  }, []);

  // Close transcript view
  const handleCloseTranscript = useCallback(() => {
    setSelectedSession(null);
    setTranscripts([]);
    setCallSummary(null);
    setModalActiveTab("transcripts");
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div
        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-3 sm:p-4 md:p-6 shadow-lg`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 mt-1`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1
                  className={`text-xl md:text-2xl font-bold ${currentTheme.text} truncate`}
                >
                  {agent?.name || "Unnamed Agent"}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    Agent ID:{" "}
                    <span className="font-mono">
                      {agent?.id || agent?._id || "N/A"}
                    </span>
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border w-fit ${
                      agent?.is_active
                        ? `${currentTheme.activeBg} ${currentTheme.text} ${currentTheme.activeBorder}`
                        : `${currentTheme.searchBg} ${currentTheme.textSecondary} ${currentTheme.border}`
                    }`}
                  >
                    {agent?.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg shadow-lg`}>
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-700">
          {tabs?.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : `border-transparent ${currentTheme.textSecondary} hover:${currentTheme.text} hover:border-gray-300 dark:hover:border-gray-600`
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
          <div className="space-y-4 md:space-y-6">
            <div
              className={`${currentTheme.cardBg}  p-4 md:p-6 border ${currentTheme.border} shadow-lg`}
            >
              <h3
                className={`text-lg font-semibold ${currentTheme.text} mb-4 md:mb-6`}
              >
                Basic Information
              </h3>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    className={`text-sm ${currentTheme.textSecondary} block mb-2 font-medium`}
                  >
                    Agent Name
                  </label>
                  <p className={`${currentTheme.text} text-base`}>
                    {agent?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-sm ${currentTheme.textSecondary} block mb-2 font-medium`}
                  >
                    Created By
                  </label>
                  <p
                    className={`${currentTheme.text} text-base font-mono text-sm`}
                  >
                    {agent?.created_by || "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-sm ${currentTheme.textSecondary} block mb-2 font-medium`}
                  >
                    Created Date
                  </label>
                  <p className={`${currentTheme.text} text-base`}>
                    {agent?.created_at
                      ? new Date(agent.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <label
                    className={`text-sm ${currentTheme.textSecondary} block mb-2 font-medium`}
                  >
                    Knowledge Base URL
                  </label>
                  {agent?.knowledge_base_url ? (
                    <a
                      href={agent.knowledge_base_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${currentTheme.text} text-base text-blue-600 dark:text-blue-400 hover:underline break-all`}
                    >
                      {agent.knowledge_base_url}
                    </a>
                  ) : (
                    <p className={`${currentTheme.text} text-base`}>N/A</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "test" && (
          <AgentPreview agent={agent} currentTheme={currentTheme} />
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6 p-3">
            {/* Transcript Modal */}
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
                            {selectedSession.session_id || selectedSession.id}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleCloseTranscript}
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
                          className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
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
                            {formatDate(selectedSession.start_time)}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                      >
                        <MapPin
                          className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                          >
                            Location
                          </p>
                          <span
                            className={`text-xs font-medium ${currentTheme.text} truncate block`}
                          >
                            {(() => {
                              const location = selectedSession?.location || {};
                              return (
                                [location?.city, location?.country]
                                  .filter((v) => v && v !== "unknown")
                                  .join(", ") || "Unknown"
                              );
                            })()}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                      >
                        <Clock
                          className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                          >
                            Duration
                          </p>
                          <span
                            className={`text-xs font-medium ${currentTheme.text} truncate block`}
                          >
                            {(() => {
                              const durationSeconds =
                                selectedSession?.duration_seconds || 0;
                              return durationSeconds > 0
                                ? `${Math.floor(durationSeconds / 60)}m ${Math.floor(durationSeconds % 60)}s`
                                : selectedSession?.duration || "0s";
                            })()}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1.5 min-w-0 flex-1 min-w-[calc(50%-0.375rem)] sm:min-w-0 ${currentTheme.searchBg} px-2 py-1.5 rounded-md`}
                      >
                        <Phone
                          className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs ${currentTheme.textSecondary} hidden sm:block`}
                          >
                            Device
                          </p>
                          <span
                            className={`text-xs font-medium ${currentTheme.text} truncate block`}
                          >
                            {selectedSession.device?.deviceType ||
                              selectedSession.device?.device_type ||
                              "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div
                      className={`flex gap-1 p-1 ${currentTheme.searchBg} rounded-lg`}
                    >
                      <button
                        onClick={() => setModalActiveTab("transcripts")}
                        className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                          modalActiveTab === "transcripts"
                            ? `${currentTheme.cardBg} ${currentTheme.text} shadow-sm`
                            : `${currentTheme.textSecondary} hover:${currentTheme.text}`
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1.5" />
                        Call Transcripts
                      </button>
                      <button
                        onClick={() => setModalActiveTab("summary")}
                        className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                          modalActiveTab === "summary"
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
                    {modalActiveTab === "transcripts" && (
                      <>
                        {/* Token Usage - Mobile Optimized */}
                        {(selectedSession.token_usage ||
                          selectedSession.tokenUsage) && (
                          <div
                            className={`px-3 sm:px-4 py-3 mb-3 ${currentTheme.searchBg} rounded-lg`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Activity
                                className={`w-5 h-5 ${currentTheme.text}`}
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
                                  {formatDate(selectedSession.start_time)}
                                </p>

                                {selectedSession.transcripts.map(
                                  (message, index) => (
                                    <div
                                      key={index}
                                      className="flex flex-col gap-1.5 py-1.5 sm:py-2"
                                    >
                                      {message.speaker === "ai" ||
                                      message.role === "agent" ? (
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
                                                {message.message ||
                                                  message.text}
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
                                                  {message.message ||
                                                    message.text}
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
                                  <Clock className="w-5 h-5" />
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
                    {modalActiveTab === "summary" && (
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
                              src={selectedSession?.recording?.url || selectedSession?.recordingUrl || selectedSession?.recording_url || "#"}
                            />

                            {/* Progress bar */}
                            <div
                              ref={progressRef}
                              onClick={handleProgressClick}
                              className={`relative h-1 ${currentTheme.border} rounded-full cursor-pointer mb-2`}
                              style={{
                                backgroundColor:
                                  currentTheme === "dark"
                                    ? "#334155"
                                    : "#cbd5e1",
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
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                              {/* Time display - hidden on very small screens, shown inline on sm+ */}
                              <span
                                className={`hidden sm:block text-xs ${currentTheme.textSecondary} w-10`}
                              >
                                {formatTimeDisplay(currentTime)}
                              </span>

                              {/* Player controls - Main row */}
                              <div className="flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto">
                                {/* Time on mobile - inline with controls */}
                                <span
                                  className={`sm:hidden text-[10px] ${currentTheme.textSecondary} min-w-[32px]`}
                                >
                                  {formatTimeDisplay(currentTime)}
                                </span>

                                <button
                                  onClick={() => skip(-10)}
                                  className={`p-1 sm:p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                  title="Rewind 10s"
                                >
                                  <SkipBack
                                    className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
                                  />
                                </button>

                                <button
                                  onClick={togglePlayPause}
                                  className="p-1.5 sm:p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                                  title={isPlaying ? "Pause" : "Play"}
                                >
                                  {isPlaying ? (
                                    <Pause
                                      className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                                      fill="currentColor"
                                    />
                                  ) : (
                                    <Play
                                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5"
                                      fill="currentColor"
                                    />
                                  )}
                                </button>

                                <button
                                  onClick={() => skip(10)}
                                  className={`p-1 sm:p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                  title="Forward 10s"
                                >
                                  <SkipForward
                                    className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
                                  />
                                </button>

                                <button
                                  onClick={changeSpeed}
                                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 hover:${currentTheme.searchBg} rounded transition-colors text-[10px] sm:text-xs ${currentTheme.textSecondary}`}
                                  title="Playback speed"
                                >
                                  {playbackSpeed}x
                                </button>

                                <button
                                  onClick={toggleMute}
                                  className={`hidden xs:block p-1 sm:p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                  title={isMuted ? "Unmute" : "Mute"}
                                >
                                  {isMuted ? (
                                    <VolumeX
                                      className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
                                    />
                                  ) : (
                                    <Volume2
                                      className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${currentTheme.textSecondary}`}
                                    />
                                  )}
                                </button>

                                <button
                                  onClick={handleDownloadRecording}
                                  className={`p-1 sm:p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                  title="Download recording"
                                  disabled={!(selectedSession?.recording?.url || selectedSession?.recordingUrl || selectedSession?.recording_url)}
                                >
                                  <Download
                                    className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${(selectedSession?.recording?.url || selectedSession?.recordingUrl || selectedSession?.recording_url) ? currentTheme.textSecondary : 'opacity-50 cursor-not-allowed'}`}
                                  />
                                </button>

                                <button
                                  onClick={handleShareRecording}
                                  className={`p-1 sm:p-1.5 hover:${currentTheme.searchBg} rounded transition-colors`}
                                  title="Share recording"
                                  disabled={!(selectedSession?.recording?.url || selectedSession?.recordingUrl || selectedSession?.recording_url)}
                                >
                                  <Share2
                                    className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${(selectedSession?.recording?.url || selectedSession?.recordingUrl || selectedSession?.recording_url) ? currentTheme.textSecondary : 'opacity-50 cursor-not-allowed'}`}
                                  />
                                </button>

                                {/* Duration on mobile - inline with controls */}
                                <span
                                  className={`sm:hidden text-[10px] ${currentTheme.textSecondary} min-w-[32px] text-right`}
                                >
                                  {formatTimeDisplay(duration || 0)}
                                </span>
                              </div>

                              {/* Duration - hidden on very small screens, shown on sm+ */}
                              <span
                                className={`hidden sm:block text-xs ${currentTheme.textSecondary} w-10 text-right`}
                              >
                                {formatTimeDisplay(duration || 0)}
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
                              const filteredLeads =
                                callSummary.data.leads.filter(
                                  (lead) =>
                                    lead.callId ===
                                    (selectedSession.callId ||
                                      selectedSession.session_id ||
                                      selectedSession.id)
                                );

                              console.log(
                                "🔍 Filtering leads. Looking for callId:",
                                selectedSession.callId ||
                                  selectedSession.session_id ||
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
                                          {lead.tags &&
                                            lead.tags.length > 0 && (
                                              <div>
                                                <p
                                                  className={`text-xs font-medium ${currentTheme.textSecondary} mb-2`}
                                                >
                                                  Tags
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                  {lead.tags.map(
                                                    (tag, tagIndex) => (
                                                      <span
                                                        key={tagIndex}
                                                        className={`px-2 py-0.5 ${currentTheme.cardBg} ${currentTheme.text} rounded-full text-xs border ${currentTheme.border}`}
                                                      >
                                                        {tag}
                                                      </span>
                                                    )
                                                  )}
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
                                                  className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
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
                                                  className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
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
                                                  className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
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
                                                  className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
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
                                                        : lead.leadData
                                                              .status ===
                                                            "interested"
                                                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                          : lead.leadData
                                                                .status ===
                                                              "new"
                                                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                                                            : `${currentTheme.cardBg} ${currentTheme.text}`
                                                    }`}
                                                  >
                                                    {lead.leadData.status ===
                                                      "qualified" && (
                                                      <CheckCircle className="w-5 h-5" />
                                                    )}
                                                    {lead.leadData.status}
                                                  </span>
                                                </div>
                                              </div>
                                            )}

                                            {lead.leadData.group_size && (
                                              <div className="flex items-start gap-2">
                                                <Users
                                                  className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
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
                                                  className={`w-5 h-5 ${currentTheme.textSecondary} mt-0.5 flex-shrink-0`}
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
                                      selectedSession.session_id ||
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
            {/* Session History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
                  Session History
                </h3>
                {loadingSessions && (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                )}
              </div>

              {loadingSessions ? (
                <div
                  className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className={`${currentTheme.textSecondary}`}>
                    Loading sessions...
                  </p>
                </div>
              ) : sessions.length === 0 ? (
                <div
                  className={`text-center py-12 rounded-lg ${currentTheme.searchBg}`}
                >
                  <Phone
                    className={`w-5 h-5 mx-auto mb-3 ${currentTheme.textSecondary}`}
                  />
                  <h4
                    className={`text-lg font-semibold ${currentTheme.text} mb-2`}
                  >
                    No Sessions Yet
                  </h4>
                  <p className={`${currentTheme.textSecondary}`}>
                    This agent hasn't had any sessions yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sessions.map((session, index) => {
                    const sessionId =
                      session?.session_id ||
                      session?.id ||
                      `#${String(1000 + index).padStart(4, "0")}`;
                    const status = session?.status || "Completed";
                    const durationSeconds = session?.duration_seconds || 0;
                    const duration =
                      durationSeconds > 0
                        ? `${Math.floor(durationSeconds / 60)}m ${Math.floor(durationSeconds % 60)}s`
                        : "0s";
                    const messageCount = session?.total_messages || 0;
                    const startTime = session?.start_time || new Date();
                    const location = session?.location || {};
                    const tokenUsage = session?.token_usage || {};

                    return (
                      <div
                        key={session?.id || index}
                        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-lg p-4 hover:shadow-lg transition-all duration-200`}
                      >
                        {/* Session ID and View Button */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Phone
                              className={`w-5 h-5 ${currentTheme.textSecondary} flex-shrink-0`}
                            />
                            <h4
                              className={`font-semibold ${currentTheme.text} text-sm truncate`}
                            >
                              {sessionId}
                            </h4>
                          </div>
                          <button
                            onClick={() => handleViewSession(session)}
                            className={`p-1.5 ${currentTheme.textSecondary} rounded-lg ${currentTheme.activeBg} ${currentTheme.hover} transition-all duration-200 hover:shadow-lg flex-shrink-0`}
                            title="View Session"
                          >
                            {loadingTranscripts &&
                            selectedSession?.id === session?.id ? (
                              <div className="w-3 h-3 border border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        {/* Status Badge */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              status === "Completed"
                                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                                : status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                                  : "bg-gray-500/10 text-gray-600 border border-gray-500/20"
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        {/* Date & Time */}
                        <div className="mb-3">
                          <p
                            className={`text-xs font-medium ${currentTheme.textSecondary} mb-1`}
                          >
                            Date & Time
                          </p>
                          <p
                            className={`${currentTheme.text} text-sm font-medium`}
                          >
                            {new Date(startTime).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p
                            className={`text-xs ${currentTheme.textSecondary}`}
                          >
                            {new Date(startTime).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
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
                          >
                            {[location?.city, location?.country]
                              .filter((v) => v && v !== "unknown")
                              .join(", ") || "Unknown"}
                          </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Device
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-medium truncate`}
                            >
                              {session?.device?.device_type &&
                              session.device.device_type !== "unknown"
                                ? session.device.device_type
                                : "Unknown"}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Duration
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-medium`}
                            >
                              {duration}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Messages
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-medium`}
                            >
                              {messageCount}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs ${currentTheme.textSecondary}`}
                            >
                              Language
                            </p>
                            <p
                              className={`${currentTheme.text} text-sm font-medium uppercase`}
                            >
                              {session?.language || "EN"}
                            </p>
                          </div>
                        </div>

                        {/* Token Usage */}
                        <div className={`pt-2 border-t ${currentTheme.border}`}>
                          <p
                            className={`text-xs ${currentTheme.textSecondary} mb-1`}
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
                                {tokenUsage?.input_tokens?.toLocaleString() ||
                                  0}
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
                                {tokenUsage?.output_tokens?.toLocaleString() ||
                                  0}
                              </p>
                            </div>
                            <div>
                              <p
                                className={`text-xs ${currentTheme.textSecondary}`}
                              >
                                Total
                              </p>
                              <p
                                className={`${currentTheme.text} text-sm font-semibold`}
                              >
                                {tokenUsage?.total_tokens?.toLocaleString() ||
                                  0}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "instructions" && (
          <div className="space-y-3">
            {/* Greeting Instructions */}
            {agent.greeting && (
              <div
                className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
              >
                <h3
                  className={`text-lg font-semibold ${currentTheme.text} mb-4`}
                >
                  Greeting Messages
                </h3>
                <div className="space-y-4">
                  {Object.entries(agent.greeting).map(([lang, message]) => (
                    <div key={lang}>
                      <label
                        className={`text-sm ${currentTheme.textSecondary} block mb-2 uppercase`}
                      >
                        {lang}
                      </label>
                      <div
                        className={`p-3 rounded-lg ${currentTheme.searchBg} ${currentTheme.text}`}
                      >
                        {message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Instructions */}
            {agent.custom_instructions && (
              <div
                className={`${currentTheme.cardBg} rounded-lg p-6 border ${currentTheme.border}`}
              >
                <h3
                  className={`text-lg font-semibold ${currentTheme.text} mb-4`}
                >
                  Custom Instructions
                </h3>
                <div
                  className={`p-4 rounded-lg ${currentTheme.searchBg} ${currentTheme.text} whitespace-pre-wrap`}
                >
                  {agent.custom_instructions}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default AgentDetailsView;
