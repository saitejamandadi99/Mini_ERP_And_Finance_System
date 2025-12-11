import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getUsers = (token) => {
    return axios.get(`${API}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateUserRole = (token, userId, role_id) => {
    return axios.put(
        `${API}/api/users/role`,
        { userId, role_id },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const deleteUser = (token, id) => {
    return axios.delete(`${API}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
