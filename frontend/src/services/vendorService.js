// src/services/vendorService.js
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getVendors = () => axios.get(`${API}/api/vendors`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const createVendor = (payload) => axios.post(`${API}/api/vendors`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const updateVendor = (id, payload) => axios.put(`${API}/api/vendors/${id}`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const deleteVendor = (id) => axios.delete(`${API}/api/vendors/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
