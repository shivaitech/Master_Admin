import apiService from "./apiService";

const login = async (credentials) => {
  const data = await apiService.post("v1/auth/login", credentials);
  console.log(data);

  if (data?.results?.token) {
    localStorage.setItem("Authorization", data?.results?.token);
  }
  return data;
};

const signup = async (userData) => {
  const data = await apiService.post("/user/signup", userData);
  return data;
};

const forgotPass = async (payload) => {
  const data = await apiService.post("/auth/forgetPassword", payload);
  return data;
};
const sendOTP = async (payload) => {
  const data = await apiService.post("/auth/sendOtp", payload);
  return data;
};

const resetPasswords = async (payload) => {
  const data = await apiService.post(`/auth/resetPassword`, payload);
  return data;
};

const verifyOTP = async (payload) => {
  const data = await apiService.post("/auth/verifyOtp", payload);
  return data;
};

const logout = () => {
  localStorage.removeItem("token-admin");
};


export default {
  login,
  signup,
  forgotPass,
  resetPasswords,
  verifyOTP,
  logout,
  sendOTP,
};
