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

export default apiService;
