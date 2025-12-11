import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = ({ data }) => {
    if (!data?.inflow || !data?.outflow) return null;

    const labels = data.inflow.map(item => item.month);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Inflow",
                data: data.inflow.map(item => item.total_inflow),
                borderColor: "green",
                tension: 0.3,
            },
            {
                label: "Outflow",
                data: data.outflow.map(item => item.total_outflow),
                borderColor: "red",
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="bg-white p-5 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Cash Flow Trend</h2>
            <Line data={chartData} />
        </div>
    );
};

export default LineChart;
