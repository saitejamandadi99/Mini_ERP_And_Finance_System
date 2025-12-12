
import React, { useEffect, useState } from "react";
import { getPayableSummary } from "../../../services/invoiceService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";

const PayableSummary = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPayableSummary();
        setRows(res.data.payables || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  const cols = [
    { key: "vendor_id", title: "Vendor ID" },
    { key: "vendor_name", title: "Vendor" },
    { key: "payable_amount", title: "Payable", render: r => `₹${r.payable_amount}` },
  ];

  return <div>{loading ? <Loader /> : <Table columns={cols} data={rows} />}</div>;
};

export default PayableSummary;
