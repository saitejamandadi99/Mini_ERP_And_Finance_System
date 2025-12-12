// src/pages/finance/statements/ProfitLoss.jsx
import React, { useEffect, useState } from "react";
import { getProfitLoss } from "../../../services/financeService";
import Loader from "../../../components/Loader";

const ProfitLoss = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfitLoss();
        setData(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profit & Loss</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Revenues</h3>
          {data.revenues.map(r => <div key={r.name} className="flex justify-between"><div>{r.name}</div><div>₹{r.balance}</div></div>)}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Expenses</h3>
          {data.expenses.map(r => <div key={r.name} className="flex justify-between"><div>{r.name}</div><div>₹{r.balance}</div></div>)}
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <p>Total Revenue: ₹{data.total.totalRevenue}</p>
        <p>Total Expense: ₹{data.total.totalExpense}</p>
        <p className="font-semibold">Net Profit: ₹{data.total.netProfit}</p>
      </div>
    </div>
  );
};

export default ProfitLoss;
