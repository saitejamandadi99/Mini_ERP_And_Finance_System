import { useState,useEffect } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL
const useDashboard = () =>{
    const [isLoading, setIsLoading] = useState(true)
    const [kpis, setKpis] = useState({})
    const [cashflow, setCashflow] = useState(null)
    const [alerts, setAlerts] = useState([])
    const [risk, setRisk] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const fetchData = async (req , res)=>{
            try {
                const [kpiRes, cashRes, alertRes, riskRes] = await Promise.all([
                    axios.get(`${API}/api/dashboard/kpi`, { 
                        headers: { Authorization: `Bearer ${token}` }
                    }),

                    axios.get(`${API}/api/dashboard/cash-flow`, { 
                        headers: { Authorization: `Bearer ${token}` }
                    }),

                    axios.get(`${API}/api/dashboard/alerts`, { 
                        headers: { Authorization: `Bearer ${token}` }
                    }),

                    axios.get(`${API}/api/ai/risk-score`, { 
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                ]);

                setKpis(kpiRes.data.kpi);
                setCashflow(cashRes.data);
                setAlerts(alertRes.data.alerts);
                setRisk(riskRes.data);
            } catch (error) {
                console.error("Dashboard Fetch Error:", error);
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchData()
    },[])
    return {isLoading, kpis, cashflow, alerts, risk}
}

export default useDashboard