import KpiCard from "../../components/KpiCard";
import LineChart from "../../components/LineChart";
import AlertList from "../../components/AlertList";
import RiskCard from "../../components/RiskCard";
import useDashboard from '../../hooks/useDashboard'
import Loader from "../../components/Loader";
const Dashboard = () =>{
    const {isLoading, kpis, cashflow, alerts, risk} = useDashboard()
    if(isLoading) return <Loader />

    return(
        <div className="p-6 space-y-6">
            {/* KPIs */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KpiCard title="Total Projects" value ={kpis?.projects?.total_projects} />
                <KpiCard title="Invoices" value={kpis?.invoices?.total_invoices} />
                <KpiCard title="Receivables" value={`₹${kpis?.receivable}`} />
                <KpiCard title="Cash Balance" value={`₹${kpis?.cash_balance}`} />
            </div>

            {/* CASH FLOW CHART */}
            <LineChart data={cashflow} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlertList alerts={alerts} />
                <RiskCard score ={risk?.risk_score} overdueAmount={risk?.data?.overdueAmount} payableAmount={risk?.data?.payableAmount} cashBalance={risk?.data?.cashBalance} />

            </div>
        </div>
    )
}

export default Dashboard