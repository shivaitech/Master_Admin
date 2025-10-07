import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import widgetService from "../apisModel/widgetService";
import { toast } from "react-hot-toast";

const handleApiError = (error, defaultMessage) => {
  const errorMessage =
    error.response?.data?.message || error.message || defaultMessage;
  toast.error(errorMessage);
  return error.response?.data || { message: errorMessage, error: true };
};

// Widget Management Async Thunks
export const fetchWidgets = createAsyncThunk(
  "widget/fetchWidgets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await widgetService.getWidgets();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch widgets")
      );
    }
  }
);

export const fetchWidget = createAsyncThunk(
  "widget/fetchWidget",
  async (widgetId, { rejectWithValue }) => {
    try {
      const response = await widgetService.getWidget(widgetId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch widget")
      );
    }
  }
);

export const createWidget = createAsyncThunk(
  "widget/createWidget",
  async (widgetData, { rejectWithValue }) => {
    try {
      const response = await widgetService.createWidget(widgetData);
      
      if (response.data?.error) {
        toast.error(response.data?.message);
        return rejectWithValue(response);
      } else {
        toast.success("Widget created successfully!");
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to create widget")
      );
    }
  }
);

export const updateWidget = createAsyncThunk(
  "widget/updateWidget",
  async ({ widgetId, widgetData }, { rejectWithValue }) => {
    try {
      const response = await widgetService.updateWidget(widgetId, widgetData);
      
      if (response.data?.error) {
        toast.error(response.data?.message);
        return rejectWithValue(response);
      } else {
        toast.success("Widget updated successfully!");
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to update widget")
      );
    }
  }
);

export const deleteWidget = createAsyncThunk(
  "widget/deleteWidget",
  async (widgetId, { rejectWithValue }) => {
    try {
      await widgetService.deleteWidget(widgetId);
      toast.success("Widget deleted successfully!");
      return widgetId;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to delete widget")
      );
    }
  }
);

export const toggleWidgetStatus = createAsyncThunk(
  "widget/toggleWidgetStatus",
  async ({ widgetId, status }, { rejectWithValue }) => {
    try {
      const response = await widgetService.toggleWidgetStatus(widgetId, status);
      
      toast.success(`Widget ${status === 'active' ? 'activated' : 'deactivated'} successfully!`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to toggle widget status")
      );
    }
  }
);

// Chat Async Thunks
export const sendChatMessage = createAsyncThunk(
  "widget/sendChatMessage",
  async ({ clientId, messageData }, { rejectWithValue }) => {
    try {
      const response = await widgetService.sendChatMessage(clientId, messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to send message")
      );
    }
  }
);

export const fetchChatHistory = createAsyncThunk(
  "widget/fetchChatHistory",
  async ({ clientId, conversationId }, { rejectWithValue }) => {
    try {
      const response = await widgetService.getChatHistory(clientId, conversationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch chat history")
      );
    }
  }
);

// Voice Async Thunks
export const processVoiceInput = createAsyncThunk(
  "widget/processVoiceInput",
  async ({ clientId, voiceData }, { rejectWithValue }) => {
    try {
      const response = await widgetService.processVoiceInput(clientId, voiceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to process voice input")
      );
    }
  }
);

export const fetchVoiceModels = createAsyncThunk(
  "widget/fetchVoiceModels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await widgetService.getVoiceModels();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch voice models")
      );
    }
  }
);

// Analytics Async Thunks
export const fetchWidgetAnalytics = createAsyncThunk(
  "widget/fetchWidgetAnalytics",
  async ({ widgetId, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await widgetService.getWidgetAnalytics(widgetId, startDate, endDate);
      return { widgetId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch analytics")
      );
    }
  }
);

export const fetchWidgetUsage = createAsyncThunk(
  "widget/fetchWidgetUsage",
  async (widgetId, { rejectWithValue }) => {
    try {
      const response = await widgetService.getWidgetUsage(widgetId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch usage data")
      );
    }
  }
);

// Configuration Async Thunks
export const validateWidgetConfig = createAsyncThunk(
  "widget/validateWidgetConfig",
  async (config, { rejectWithValue }) => {
    try {
      const response = await widgetService.validateWidgetConfig(config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to validate configuration")
      );
    }
  }
);

export const testWidgetConfig = createAsyncThunk(
  "widget/testWidgetConfig",
  async (config, { rejectWithValue }) => {
    try {
      const response = await widgetService.testWidgetConfig(config);
      
      if (response.data?.success) {
        toast.success("Widget configuration test passed!");
      } else {
        toast.warning("Widget configuration test failed");
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to test configuration")
      );
    }
  }
);

// Performance Async Thunks
export const fetchPerformanceMetrics = createAsyncThunk(
  "widget/fetchPerformanceMetrics",
  async (widgetId, { rejectWithValue }) => {
    try {
      const response = await widgetService.getPerformanceMetrics(widgetId);
      return { widgetId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch performance metrics")
      );
    }
  }
);

// Asset Management Async Thunks
export const uploadWidgetAsset = createAsyncThunk(
  "widget/uploadWidgetAsset",
  async ({ widgetId, formData }, { rejectWithValue }) => {
    try {
      const response = await widgetService.uploadWidgetAsset(widgetId, formData);
      toast.success("Asset uploaded successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to upload asset")
      );
    }
  }
);

// Export Async Thunks
export const exportWidgetData = createAsyncThunk(
  "widget/exportWidgetData",
  async ({ widgetId, format, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await widgetService.exportWidgetData(widgetId, format, startDate, endDate);
      toast.success("Data export initiated!");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to export data")
      );
    }
  }
);

// Event Tracking Async Thunk
export const trackWidgetEvent = createAsyncThunk(
  "widget/trackWidgetEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      await widgetService.trackEvent(eventData);
      return eventData;
    } catch (error) {
      // Don't show error toast for tracking events
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  widgets: [],
  currentWidget: null,
  chatHistory: [],
  voiceModels: [],
  analytics: {},
  usage: null,
  performanceMetrics: {},
  configValidation: null,
  configTest: null,
  loading: false,
  error: null,
  message: null,
  
  // UI States
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFetching: false,
  isSendingMessage: false,
  isProcessingVoice: false,
  isUploadingAsset: false,
  isExporting: false,
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setCurrentWidget: (state, action) => {
      state.currentWidget = action.payload;
    },
    clearCurrentWidget: (state) => {
      state.currentWidget = null;
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    clearConfigValidation: (state) => {
      state.configValidation = null;
    },
    clearConfigTest: (state) => {
      state.configTest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Widgets
      .addCase(fetchWidgets.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchWidgets.fulfilled, (state, action) => {
        state.isFetching = false;
        state.widgets = action.payload;
      })
      .addCase(fetchWidgets.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload?.message || "Failed to fetch widgets";
      })

      // Fetch Single Widget
      .addCase(fetchWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWidget.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWidget = action.payload;
      })
      .addCase(fetchWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch widget";
      })

      // Create Widget
      .addCase(createWidget.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createWidget.fulfilled, (state, action) => {
        state.isCreating = false;
        state.widgets.push(action.payload);
        state.message = "Widget created successfully";
      })
      .addCase(createWidget.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload?.message || "Failed to create widget";
      })

      // Update Widget
      .addCase(updateWidget.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateWidget.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.widgets.findIndex(w => w.id === action.payload.id);
        if (index !== -1) {
          state.widgets[index] = action.payload;
        }
        if (state.currentWidget?.id === action.payload.id) {
          state.currentWidget = action.payload;
        }
        state.message = "Widget updated successfully";
      })
      .addCase(updateWidget.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload?.message || "Failed to update widget";
      })

      // Delete Widget
      .addCase(deleteWidget.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteWidget.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.widgets = state.widgets.filter(w => w.id !== action.payload);
        if (state.currentWidget?.id === action.payload) {
          state.currentWidget = null;
        }
        state.message = "Widget deleted successfully";
      })
      .addCase(deleteWidget.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload?.message || "Failed to delete widget";
      })

      // Toggle Widget Status
      .addCase(toggleWidgetStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWidgetStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.widgets.findIndex(w => w.id === action.payload.id);
        if (index !== -1) {
          state.widgets[index] = action.payload;
        }
        if (state.currentWidget?.id === action.payload.id) {
          state.currentWidget = action.payload;
        }
      })
      .addCase(toggleWidgetStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to toggle widget status";
      })

      // Send Chat Message
      .addCase(sendChatMessage.pending, (state) => {
        state.isSendingMessage = true;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isSendingMessage = false;
        state.chatHistory.push(action.payload);
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.error = action.payload?.message || "Failed to send message";
      })

      // Fetch Chat History
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.chatHistory = action.payload;
      })

      // Process Voice Input
      .addCase(processVoiceInput.pending, (state) => {
        state.isProcessingVoice = true;
      })
      .addCase(processVoiceInput.fulfilled, (state, action) => {
        state.isProcessingVoice = false;
        state.chatHistory.push(action.payload);
      })
      .addCase(processVoiceInput.rejected, (state, action) => {
        state.isProcessingVoice = false;
        state.error = action.payload?.message || "Failed to process voice input";
      })

      // Fetch Voice Models
      .addCase(fetchVoiceModels.fulfilled, (state, action) => {
        state.voiceModels = action.payload;
      })

      // Fetch Analytics
      .addCase(fetchWidgetAnalytics.fulfilled, (state, action) => {
        state.analytics[action.payload.widgetId] = action.payload.data;
      })

      // Fetch Usage
      .addCase(fetchWidgetUsage.fulfilled, (state, action) => {
        state.usage = action.payload;
      })

      // Validate Config
      .addCase(validateWidgetConfig.fulfilled, (state, action) => {
        state.configValidation = action.payload;
      })

      // Test Config
      .addCase(testWidgetConfig.fulfilled, (state, action) => {
        state.configTest = action.payload;
      })

      // Performance Metrics
      .addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
        state.performanceMetrics[action.payload.widgetId] = action.payload.data;
      })

      // Upload Asset
      .addCase(uploadWidgetAsset.pending, (state) => {
        state.isUploadingAsset = true;
      })
      .addCase(uploadWidgetAsset.fulfilled, (state, action) => {
        state.isUploadingAsset = false;
        state.message = "Asset uploaded successfully";
      })
      .addCase(uploadWidgetAsset.rejected, (state, action) => {
        state.isUploadingAsset = false;
        state.error = action.payload?.message || "Failed to upload asset";
      })

      // Export Data
      .addCase(exportWidgetData.pending, (state) => {
        state.isExporting = true;
      })
      .addCase(exportWidgetData.fulfilled, (state, action) => {
        state.isExporting = false;
        state.message = "Data export completed";
      })
      .addCase(exportWidgetData.rejected, (state, action) => {
        state.isExporting = false;
        state.error = action.payload?.message || "Failed to export data";
      });
  },
});

export const {
  clearError,
  clearMessage,
  setCurrentWidget,
  clearCurrentWidget,
  clearChatHistory,
  addChatMessage,
  clearConfigValidation,
  clearConfigTest,
} = widgetSlice.actions;

export default widgetSlice.reducer;