const AlertList = ({ alerts }) => {
    if (!alerts) return null;

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold mb-3">System Alerts</h2>

            {/* Overdue invoices */}
            <div className="mb-3">
                <p className="font-medium text-red-600">Overdue Invoices</p>
                {alerts.overdue_invoices?.length === 0 && (
                    <p className="text-gray-500 text-sm">No overdue invoices.</p>
                )}
                {alerts.overdue_invoices?.map((inv) => (
                    <p key={inv.id} className="text-sm text-gray-700">
                        Invoice #{inv.id} → ₹{inv.amount}
                    </p>
                ))}
            </div>

            {/* Low cash */}
            {alerts.low_cash && (
                <p className="text-orange-600 font-medium">⚠ {alerts.low_cash}</p>
            )}

            {/* Risky projects */}
            <div className="mt-3">
                <p className="font-medium text-yellow-600">Risky Projects</p>
                {alerts.risky_projects?.map((p) => (
                    <p key={p.id} className="text-sm text-gray-700">
                        {p.name} — {p.progress}% progress
                    </p>
                ))}
            </div>
        </div>
    );
};

export default AlertList;
