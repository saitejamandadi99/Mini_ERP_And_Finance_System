import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const token = () => localStorage.getItem("token");

export const getBalanceSheet = () =>
  axios.get(`${API}/api/finance/balance-sheet`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const getProfitLoss = () =>
  axios.get(`${API}/api/finance/profit-loss`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const getCashFlowStatement = () =>
  axios.get(`${API}/api/finance/cash-flow`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
