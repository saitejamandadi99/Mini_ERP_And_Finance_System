// src/pages/finance/payments/RecordPayment.jsx
import React, { useState } from "react";
import InputField from "../../../components/InputField";
import { recordPayment } from "../../../services/paymentService";
import Loader from "../../../components/Loader";

const RecordPayment = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const invoice_id = urlParams.get("invoice_id") || "";

  const [form, setForm] = useState({ invoice_id, amount: "", currency: "USD", method: "", note: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await recordPayment(form);
      window.location.href = "/payments";
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Record Payment</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <InputField label="Invoice ID" name="invoice_id" value={form.invoice_id} onChange={(e)=>setForm({...form, invoice_id:e.target.value})} />
        <InputField label="Amount" name="amount" value={form.amount} onChange={(e)=>setForm({...form, amount:e.target.value})} />
        <InputField label="Currency" name="currency" value={form.currency} onChange={(e)=>setForm({...form, currency:e.target.value})} />
        <InputField label="Method" name="method" value={form.method} onChange={(e)=>setForm({...form, method:e.target.value})} />
        <InputField label="Note" name="note" value={form.note} onChange={(e)=>setForm({...form, note:e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? <Loader small/> : "Record"}</button>
      </form>
    </div>
  );
};

export default RecordPayment;
