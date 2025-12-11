import { useEffect, useState } from "react";
import { getCashFlowStatement } from "../../services/financeService";
import Loader from "../../components/Loader";

const CashFlowStatement = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCashFlowStatement().then((res) => setData(res.data));
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Cash Flow Statement</h2>

      {data.cashAccounts.map(a => (
        <p key={a.name}>{a.name}: ₹{a.balance}</p>
      ))}

      <h3 className="font-bold mt-4">Total Cash: ₹{data.totalCash}</h3>
    </div>
  );
};

export default CashFlowStatement;
