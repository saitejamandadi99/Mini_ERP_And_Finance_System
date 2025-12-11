const RiskCard = ({ score, overdueAmount, payableAmount, cashBalance }) => {
    return (
        <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-3">Financial Risk Score</h2>

            <div className="text-center">
                <div className="text-4xl font-bold text-red-600">{score}/100</div>
                <p className="text-gray-500 text-sm mt-1">Higher score means higher financial risk</p>
            </div>

            <div className="mt-4 space-y-2 text-gray-700 text-sm">
                <p>Overdue Amount: ₹{overdueAmount}</p>
                <p>Payables: ₹{payableAmount}</p>
                <p>Cash Balance: ₹{cashBalance}</p>
            </div>
        </div>
    );
};

export default RiskCard;
