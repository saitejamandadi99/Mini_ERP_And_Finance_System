import { useEffect, useState } from "react";
import { getProfitLoss } from "../../services/financeService";
import Loader from "../../components/Loader";

const ProfitLoss = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfitLoss().then((res) => setData(res.data));
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Profit & Loss Statement</h2>

      <h3 className="font-semibold mt-4">Revenue</h3>
      {data.revenues.map(r => (
        <p key={r.name}>{r.name}: ₹{r.balance}</p>
      ))}
      <p className="font-bold">Total Revenue: ₹{data.total.totalRevenue}</p>

      <h3 className="font-semibold mt-4">Expenses</h3>
      {data.expenses.map(e => (
        <p key={e.name}>{e.name}: ₹{e.balance}</p>
      ))}
      <p className="font-bold">Total Expense: ₹{data.total.totalExpense}</p>

      <h3 className="text-xl mt-4 font-bold">
        Net Profit:
        <span className={data.total.netProfit >= 0 ? "text-green-600" : "text-red-600"}>
          ₹{data.total.netProfit}
        </span>
      </h3>
    </div>
  );
};

export default ProfitLoss;
