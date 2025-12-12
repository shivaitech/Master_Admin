import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

const setAuthHeaders = (config) => {
  const token = localStorage.getItem("Authorization");
  const userType = localStorage.getItem("user-type");
  console.log(userType, "userType in apiService");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

apiClient.interceptors.request.use(setAuthHeaders);

const errorCallBack = (error) => {
  const status = error?.response?.status;
  const errorData = error?.response?.data;

  console.log("Error Status:", status);
  console.log("Error Data:", errorData);

  if (!error.response) {
    console.error("🚨 Network error:", error.message);
  } else if (
    status === 401 &&
    errorData?.message === "Access Denied. No token provided."
  ) {
    console.warn("🔐 Unauthorized, redirecting to homepage...");
  } else if (status >= 400 && status < 500) {
    console.warn("⚠️ Client error:", status, error.response.data.message);
  } else {
    console.error(
      "❌ Server error:",
      status,
      error.response?.data?.message || error.message
    );
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use((res) => res, errorCallBack);

// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
//   patch: axios.patch,
// };
const apiService = {
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, data) => apiClient.post(url, data),
  put: (url, data) => apiClient.put(url, data),
  delete: (url) => apiClient.delete(url),
  patch: (url, data) => apiClient.patch(url, data),
};

// Extended API service with specific methods for user and onboarding management
const shivaiApiService = {
  // Basic API methods
  ...apiService,

  // User management methods
  getAllUsers: async () => {
    try {
      console.log("🔍 Fetching all users...");
      const response = await apiClient.get("/v1/users");
      console.log("✅ Users fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      // Fallback to alternative endpoint if needed
      try {
        const fallbackResponse = await apiClient.get("/v1/admin/users");
        console.log(
          "✅ Users fetched via fallback endpoint:",
          fallbackResponse.data
        );
        return fallbackResponse.data;
      } catch (fallbackError) {
        console.error("❌ Fallback endpoint also failed:", fallbackError);
        throw error;
      }
    }
  },

  // Delete user method
  deleteUser: async (userId) => {
    try {
      console.log(`🗑️ Deleting user with ID: ${userId}`);
      const response = await apiClient.delete(`/v1/users/${userId}`);
      console.log("✅ User deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw error;
    }
  },

  // Onboarding data methods
  getOnboardingByUserId: async (userId) => {
    try {
      console.log(`🔍 Fetching onboarding data for user: ${userId}`);
      const response = await apiClient.get(`/v1/admin/onboarding/${userId}`);
      console.log("✅ Onboarding data fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching onboarding data:", error);
      // Try alternative endpoint patterns
      try {
        const fallbackResponse = await apiClient.get(
          `/v1/onboarding/user/${userId}`
        );
        console.log(
          "✅ Onboarding data fetched via fallback endpoint:",
          fallbackResponse.data
        );
        return fallbackResponse.data;
      } catch (fallbackError) {
        console.error("❌ Fallback endpoint also failed:", fallbackError);
        throw error;
      }
    }
  },

  getAllOnboarding: async () => {
    try {
      console.log("🔍 Fetching all onboarding data...");
      const response = await apiClient.get("/v1/admin/onboarding");
      console.log(
        "✅ All onboarding data fetched successfully:",
        response.data
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching all onboarding data:", error);
      try {
        const fallbackResponse = await apiClient.get("/v1/onboarding");
        console.log(
          "✅ Onboarding data fetched via fallback endpoint:",
          fallbackResponse.data
        );
        return fallbackResponse.data;
      } catch (fallbackError) {
        console.error("❌ Fallback endpoint also failed:", fallbackError);
        throw error;
      }
    }
  },

  updateOnboardingData: async (id, data) => {
    try {
      console.log(`🔄 Updating onboarding data for ID: ${id}`);
      const response = await apiClient.put(`/v1/admin/onboarding/${id}`, data);
      console.log("✅ Onboarding data updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error updating onboarding data:", error);
      throw error;
    }
  },

  // File handling methods
  getFile: async (fileId) => {
    try {
      console.log(`📁 Fetching file with ID: ${fileId}`);
      const response = await apiClient.get(`/v1/files/${fileId}`);
      console.log("✅ File data fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching file:", error);
      // Try alternative endpoints
      try {
        const fallbackResponse = await apiClient.get(
          `/v1/admin/files/${fileId}`
        );
        console.log(
          "✅ File data fetched via fallback:",
          fallbackResponse.data
        );
        return fallbackResponse.data;
      } catch (fallbackError) {
        console.error("❌ Fallback file fetch also failed:", fallbackError);
        throw error;
      }
    }
  },

  downloadFile: async (fileId) => {
    try {
      console.log(`⬇️ Downloading file with ID: ${fileId}`);
      const response = await apiClient.get(`/v1/files/${fileId}/download`, {
        responseType: "blob",
      });
      console.log("✅ File downloaded successfully");
      return response;
    } catch (error) {
      console.error("❌ Error downloading file:", error);
      // Try alternative endpoints
      try {
        const fallbackResponse = await apiClient.get(
          `/v1/admin/files/${fileId}/download`,
          {
            responseType: "blob",
          }
        );
        console.log("✅ File downloaded via fallback");
        return fallbackResponse;
      } catch (fallbackError) {
        console.error("❌ Fallback file download also failed:", fallbackError);
        throw error;
      }
    }
  },

  // Download file by S3 key
  downloadFileByS3Key: async (s3Key) => {
    try {
      console.log(`⬇️ Downloading file with S3 key: ${s3Key}`);
      const response = await apiClient.post(
        "/v1/onboarding/download",
        {
          s3_key: s3Key,
        },
        {
          responseType: "blob",
        }
      );
      console.log("✅ File downloaded successfully");
      return response;
    } catch (error) {
      console.error("❌ Error downloading file by S3 key:", error);
      throw error;
    }
  },

  // Onboarding status management methods
  approveClient: async (clientId) => {
    try {
      console.log(`✅ Approving client with ID: ${clientId}`);
      const response = await apiClient.patch(
        `/v1/onboarding/${clientId}/status`,
        {
          status: "approved",
        }
      );
      console.log("✅ Client approved successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error approving client:", error);
      throw error;
    }
  },

  rejectClient: async (clientId, reason = "Application rejected by admin") => {
    try {
      console.log(`❌ Rejecting client with ID: ${clientId}`);
      const response = await apiClient.patch(
        `/v1/onboarding/${clientId}/status`,
        {
          status: "rejected",
          rejectionReason: reason,
        }
      );
      console.log("✅ Client rejected successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error rejecting client:", error);
      throw error;
    }
  },

  updateClientStatus: async (clientId, status, reason = null) => {
    try {
      console.log(`🔄 Updating client status to ${status} for ID: ${clientId}`);
      const payload = { status };
      if (reason) {
        payload.rejectionReason = reason;
      }
      const response = await apiClient.patch(
        `/v1/onboarding/${clientId}/status`,
        payload
      );
      console.log("✅ Client status updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error updating client status:", error);
      throw error;
    }
  },

  updateClientData: async (clientId, data) => {
    try {
      console.log(`🔄 Updating client data for ID: ${clientId}`);
      const response = await apiClient.put(
        `/v1/onboarding/${clientId}`,
        data
      );
      console.log("✅ Client data updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error updating client data:", error);
      throw error;
    }
  },

  // Upload multiple files for onboarding
  uploadOnboardingFiles: async (files) => {
    try {
      console.log(`📤 Uploading ${files.length} files...`);
      
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await apiClient.post("/v1/onboarding/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Files uploaded successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error uploading files:", error);
      throw error;
    }
  },

  // AI Agents management methods
  getAllAgents: async () => {
    try {
      console.log("🤖 Fetching all AI agents...");
      const response = await apiClient.get("/v1/agents/all");
      console.log("✅ AI agents fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching AI agents:", error);
      throw error;
    }
  },
};

export default apiService;
export { shivaiApiService };
