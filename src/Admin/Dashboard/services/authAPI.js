import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, // Increased timeout for file uploads
});

// Auth API service for onboarding operations
export const authAPI = {
  // Upload multiple files for onboarding
  uploadOnboardingFiles: async (files, accessToken) => {
    try {
      console.log(`📤 Uploading ${files.length} files...`);
      
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await apiClient.post("/v1/onboarding/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("✅ Files uploaded successfully:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error uploading files:", error);
      throw error;
    }
  },

  // Create new onboarding submission
  createOnboarding: async (onboardingData, accessToken) => {
    try {
      console.log("📝 Creating onboarding submission...");
      
      const response = await apiClient.post("/v1/onboarding", onboardingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("✅ Onboarding created successfully:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error creating onboarding:", error);
      throw error;
    }
  },

  // Save onboarding as draft
  saveDraftOnboarding: async (onboardingData, accessToken) => {
    try {
      console.log("💾 Saving onboarding draft...");
      
      const response = await apiClient.post("/v1/onboarding/draft", onboardingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("✅ Draft saved successfully:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error saving draft:", error);
      throw error;
    }
  },
};
