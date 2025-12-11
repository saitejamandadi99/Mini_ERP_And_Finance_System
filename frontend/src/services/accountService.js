import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const token = () => localStorage.getItem("token");

export const getAccounts = () =>
  axios.get(`${API}/api/accounts`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const createAccount = (data) =>
  axios.post(`${API}/api/accounts`, data, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const updateAccount = (id, data) =>
  axios.put(`${API}/api/accounts/${id}`, data, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const deleteAccount = (id) =>
  axios.delete(`${API}/api/accounts/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
