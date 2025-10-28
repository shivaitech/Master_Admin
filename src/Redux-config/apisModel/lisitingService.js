import apiService from "./apiService";

const getUser = async (payload) => {
  const data = await apiService.get("v1/auth/me", payload);
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
const getAgentSessions = async (queryParams = '') => {
  const url = queryParams ? `/v1/agent-sessions?${queryParams}` : `/v1/agent-sessions`;
  const data = await apiService.get(url);
  return data;
}
export default {
  getUser,
  getAllSessionDemo,
  getSessionById,
  getSessionTranscript,
  getAgentSessions
};
