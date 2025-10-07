import apiService from "./apiService";

const widgetService = {
  // Widget Management APIs
  getWidgets: () => apiService.get("/widgets"),
  
  getWidget: (widgetId) => apiService.get(`/widgets/${widgetId}`),
  
  createWidget: (widgetData) => apiService.post("/widgets", widgetData),
  
  updateWidget: (widgetId, widgetData) => apiService.put(`/widgets/${widgetId}`, widgetData),
  
  deleteWidget: (widgetId) => apiService.delete(`/widgets/${widgetId}`),
  
  toggleWidgetStatus: (widgetId, status) => 
    apiService.patch(`/widgets/${widgetId}/status`, { status }),

  // Chat APIs
  sendChatMessage: (clientId, messageData) => 
    apiService.post("/chat", messageData, {
      headers: { 'X-Client-ID': clientId }
    }),

  getChatHistory: (clientId, conversationId) => 
    apiService.get(`/chat/history/${conversationId}`, {
      headers: { 'X-Client-ID': clientId }
    }),

  // Voice APIs  
  processVoiceInput: (clientId, voiceData) =>
    apiService.post("/voice", voiceData, {
      headers: { 'X-Client-ID': clientId }
    }),

  // Analytics APIs
  getWidgetAnalytics: (widgetId, startDate, endDate) => 
    apiService.get(`/widgets/${widgetId}/analytics`, {
      start: startDate,
      end: endDate
    }),

  getWidgetUsage: (widgetId) => 
    apiService.get(widgetId ? `/widgets/${widgetId}/usage` : "/usage"),

  // Configuration APIs
  validateWidgetConfig: (config) => 
    apiService.post("/widgets/validate", config),

  testWidgetConfig: (config) => 
    apiService.post("/widgets/test", config),

  // Client Management APIs
  getClientAccount: () => apiService.get("/account"),

  updateClientAccount: (accountData) => 
    apiService.put("/account", accountData),

  // Performance APIs
  getPerformanceMetrics: (widgetId) => 
    apiService.get(`/widgets/${widgetId}/performance`),

  // Asset Management APIs
  uploadWidgetAsset: (widgetId, formData) => 
    apiService.post(`/widgets/${widgetId}/assets`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  // Export APIs
  exportWidgetData: (widgetId, format, startDate, endDate) => 
    apiService.get(`/widgets/${widgetId}/export`, {
      format,
      start: startDate,
      end: endDate
    }),

  // Voice Models API
  getVoiceModels: () => apiService.get("/voice/models"),

  // Text-to-Speech API
  getTextToSpeech: (text, options = {}) =>
    apiService.post("/voice/tts", { text, ...options }),

  // Event Tracking API
  trackEvent: (eventData) => 
    apiService.post("/events", eventData),
};

export default widgetService;