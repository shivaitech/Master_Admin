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
        console.log("✅ Users fetched via fallback endpoint:", fallbackResponse.data);
        return fallbackResponse.data;
      } catch (fallbackError) {
        console.error("❌ Fallback endpoint also failed:", fallbackError);
        throw error;
      }
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
        const fallbackResponse = await apiClient.get(`/v1/onboarding/user/${userId}`);
        console.log("✅ Onboarding data fetched via fallback endpoint:", fallbackResponse.data);
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
      console.log("✅ All onboarding data fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching all onboarding data:", error);
      try {
        const fallbackResponse = await apiClient.get("/v1/onboarding");
        console.log("✅ Onboarding data fetched via fallback endpoint:", fallbackResponse.data);
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
        const fallbackResponse = await apiClient.get(`/v1/admin/files/${fileId}`);
        console.log("✅ File data fetched via fallback:", fallbackResponse.data);
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
        responseType: 'blob'
      });
      console.log("✅ File downloaded successfully");
      return response;
    } catch (error) {
      console.error("❌ Error downloading file:", error);
      // Try alternative endpoints
      try {
        const fallbackResponse = await apiClient.get(`/v1/admin/files/${fileId}/download`, {
          responseType: 'blob'
        });
        console.log("✅ File downloaded via fallback");
        return fallbackResponse;
      } catch (fallbackError) {
        console.error("❌ Fallback file download also failed:", fallbackError);
        throw error;
      }
    }
  }
};

export default apiService;
export { shivaiApiService };