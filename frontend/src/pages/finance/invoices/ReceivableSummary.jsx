
import React, { useEffect, useState } from "react";
import { getReceivableSummary } from "../../../services/invoiceService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";

const ReceivableSummary = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getReceivableSummary();
        setRows(res.data.receivables || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  const cols = [
    { key: "customer_id", title: "Customer ID" },
    { key: "customer_name", title: "Customer" },
    { key: "receivable_amount", title: "Receivable", render: r => `₹${r.receivable_amount}` },
  ];

  return <div>{loading ? <Loader /> : <Table columns={cols} data={rows} />}</div>;
};

export default ReceivableSummary;
