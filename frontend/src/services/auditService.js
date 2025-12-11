import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAuditLogs = (token) => {
    return axios.get(`${API}/api/audit`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
