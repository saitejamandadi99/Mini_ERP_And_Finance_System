import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const token = () => localStorage.getItem("token");

export const getJournalEntries = () =>
  axios.get(`${API}/api/journal`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const createJournalEntry = (data) =>
  axios.post(`${API}/api/journal`, data, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const approveJournalEntry = (id) =>
  axios.put(`${API}/api/journal/approve/${id}`, {}, {
    headers: { Authorization: `Bearer ${token()}` },
  });
