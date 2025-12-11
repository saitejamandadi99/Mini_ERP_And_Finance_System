import { useEffect, useState } from "react";
import { getAuditLogs } from "../../services/auditService";

const AuditLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const loadLogs = async () => {
        try {
            const res = await getAuditLogs(token);
            setLogs(res.data.logs);
        } catch (err) {
            console.error("Failed to fetch audit logs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading audit logs...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>

            <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">User</th>
                            <th className="p-3 text-left">Action</th>
                            <th className="p-3 text-left">Timestamp</th>
                        </tr>
                    </thead>

                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{log.performed_by || "Unknown"}</td>
                                <td className="p-3">{log.action}</td>
                                <td className="p-3 text-gray-600">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {logs.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">No audit logs available.</p>
                )}
            </div>
        </div>
    );
};

export default AuditLogsPage;
