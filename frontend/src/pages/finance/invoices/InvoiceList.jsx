// src/pages/finance/invoices/InvoiceList.jsx
import React, { useEffect, useState } from "react";
import { getInvoices } from "../../../services/invoiceService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";

const InvoiceList = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getInvoices();
      setInvoices(res.data.invoices || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const cols = [
    { key: "id", title: "ID" },
    { key: "customer_id", title: "Customer" },
    { key: "amount", title: "Amount", render: r => `₹${r.amount}` },
    { key: "status", title: "Status" },
    { key: "due_date", title: "Due date" },
  ];

  const filtered = invoices.filter(inv => String(inv.id).includes(q) || String(inv.customer_id).includes(q));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <div className="flex gap-2">
          <button onClick={() => (window.location.href = "/invoices/create")} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>
      </div>

      <SearchBar value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by id or customer..." />

      {loading ? <Loader /> : <Table columns={cols} data={filtered} renderRowExtra={(r) => <button className="text-blue-600" onClick={() => (window.location.href = `/invoices/${r.id}`)}>View</button>} />}
    </div>
  );
};

export default InvoiceList;
