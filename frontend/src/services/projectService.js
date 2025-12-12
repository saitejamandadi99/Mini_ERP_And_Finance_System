
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getProjectHealth = (project_id) => axios.get(`${API}/api/project-health/${project_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
