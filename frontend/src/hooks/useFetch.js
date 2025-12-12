// src/hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const useFetch = (url, opts = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(opts.initial || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");
    axios.get(`${API}${url}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => mounted && setData(res.data))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [url]);

  return { loading, data, error };
};
