import { useEffect, useState } from "react";
import { getBalanceSheet } from "../../services/financeService";
import Loader from "../../components/Loader";

const BalanceSheet = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getBalanceSheet().then((res) => setData(res.data));
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Balance Sheet</h2>

      <div className="grid grid-cols-3 gap-6">

        <div>
          <h3 className="font-semibold mb-2">Assets</h3>
          {data.assets.map(a => (
            <p key={a.name}>{a.name}: ₹{a.balance}</p>
          ))}
          <p className="font-bold mt-2">Total: ₹{data.total.totalAssets}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Liabilities</h3>
          {data.liabilities.map(l => (
            <p key={l.name}>{l.name}: ₹{l.balance}</p>
          ))}
          <p className="font-bold mt-2">Total: ₹{data.total.totalLiabilities}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Equity</h3>
          {data.equities.map(e => (
            <p key={e.name}>{e.name}: ₹{e.balance}</p>
          ))}
          <p className="font-bold mt-2">Total: ₹{data.total.totalEquity}</p>
        </div>

      </div>
    </div>
  );
};

export default BalanceSheet;
