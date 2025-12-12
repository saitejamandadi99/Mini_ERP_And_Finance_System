// src/pages/finance/payments/PaymentTracking.jsx
import React, { useEffect, useState } from "react";
import { getDueInvoices } from "../../../services/invoiceService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";

const PaymentTracking = () => {
  const [loading, setLoading] = useState(true);
  const [due, setDue] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDueInvoices();
        setDue(res.data.due_invoices || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  const cols = [
    { key: "id", title: "ID" },
    { key: "customer_id", title: "Customer" },
    { key: "amount", title: "Amount", render: r => `₹${r.amount}` },
    { key: "outstanding_amount", title: "Outstanding", render: r => `₹${r.outstanding_amount}` },
    { key: "due_date", title: "Due Date" },
  ];

  return <div>{loading ? <Loader /> : <Table columns={cols} data={due} renderRowExtra={(r) => <button className="text-blue-600" onClick={() => (window.location.href = `/payments/record?invoice_id=${r.id}`)}>Record Payment</button>} />}</div>;
};

export default PaymentTracking;
