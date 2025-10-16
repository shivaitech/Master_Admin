import apiService from "./apiService";

const getUser = async (payload) => {
  const data = await apiService.get("/user/getUser", payload);
  return data;
};

const getAllVendor = async (payload) => {
  const data = await apiService.post("/user/getVendorList", payload);
  return data;
};

const getAllSessionDemo = async (payload) => {
  const data = await apiService.get(`v1/sessions?${payload}`);
  return data;
};

const getSessionById = async (sessionId) => {
  const data = await apiService.get(`v1/sessions/${sessionId}`);
  return data;
}
 const getSessionTranscript = async (sessionId) => {
  const data = await apiService.get(`v1/sessions/${sessionId}/transcripts`);
  return data;
}
export default {
  getUser,
  getAllVendor,
  getAllSessionDemo,
  getSessionById,
  getSessionTranscript,
};
