
import React, { useEffect, useState } from "react";
import { getCashFlowStatement } from "../../../services/financeService";
import Loader from "../../../components/Loader";

const CashflowStatement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCashFlowStatement();
        setData(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cash Flow Statement</h2>
      <div className="bg-white p-4 rounded shadow">
        {data.cashAccounts.map(a => (
          <div key={a.name} className="flex justify-between py-2">
            <div>{a.name}</div>
            <div>₹{a.balance}</div>
          </div>
        ))}
        <div className="mt-4 font-semibold">Total Cash: ₹{data.totalCash}</div>
      </div>
    </div>
  );
};

export default CashflowStatement;
