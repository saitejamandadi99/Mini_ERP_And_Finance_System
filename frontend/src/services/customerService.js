
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getCustomers = () => axios.get(`${API}/api/customers`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const createCustomer = (payload) => axios.post(`${API}/api/customers`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const updateCustomer = (id, payload) => axios.put(`${API}/api/customers/${id}`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
export const deleteCustomer = (id) => axios.delete(`${API}/api/customers/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
