// src/pages/finance/statements/BalanceSheet.jsx
import React, { useEffect, useState } from "react";
import { getBalanceSheet } from "../../../services/financeService";
import Loader from "../../../components/Loader";

const BalanceSheet = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getBalanceSheet();
        setData(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Balance Sheet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Assets</h3>
          {data.assets.map(a => <div key={a.name} className="flex justify-between"><div>{a.name}</div><div>₹{a.balance}</div></div>)}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Liabilities</h3>
          {data.liabilities.map(a => <div key={a.name} className="flex justify-between"><div>{a.name}</div><div>₹{a.balance}</div></div>)}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Equity</h3>
          {data.equities.map(a => <div key={a.name} className="flex justify-between"><div>{a.name}</div><div>₹{a.balance}</div></div>)}
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <p>Total Assets: ₹{data.total.totalAssets}</p>
        <p>Total Liabilities: ₹{data.total.totalLiabilities}</p>
        <p>Total Equity: ₹{data.total.totalEquity}</p>
        <p className="text-sm text-gray-500">Balance check (should be 0): {data.total.balanceCheck}</p>
      </div>
    </div>
  );
};

export default BalanceSheet;
