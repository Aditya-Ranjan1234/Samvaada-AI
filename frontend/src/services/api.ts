import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const initiateCall = async () => {
  const response = await api.post('/calls/initiate');
  return response.data;
};

export const getCallContext = async (callId: string) => {
  const response = await api.get(`/calls/${callId}/context`);
  return response.data;
};
