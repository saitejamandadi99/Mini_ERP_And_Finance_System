// src/services/paymentService.js
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const recordPayment = (payload) => axios.post(`${API}/api/payments`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const getPaymentsForInvoice = (invoice_id) => axios.get(`${API}/api/payments/${invoice_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
