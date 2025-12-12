// src/services/invoiceService.js
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getInvoices = () => axios.get(`${API}/api/invoices`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const getInvoice = (id) => axios.get(`${API}/api/invoices/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const createInvoice = (payload) => axios.post(`${API}/api/invoices`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const getDueInvoices = () => axios.get(`${API}/api/invoices/due`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const getReceivableSummary = () => axios.get(`${API}/api/invoices/summary/receivable`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const getPayableSummary = () => axios.get(`${API}/api/invoices/summary/payable`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
