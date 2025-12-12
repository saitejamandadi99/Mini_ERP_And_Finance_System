// src/pages/finance/invoices/CreateInvoice.jsx
import React, { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import { createInvoice } from "../../../services/invoiceService";
import { getCustomers } from "../../../services/customerService";
import { getVendors } from "../../../services/vendorService";
import Loader from "../../../components/Loader";

const CreateInvoice = () => {
  const [form, setForm] = useState({ customer_id: "", vendor_id: "", project_id: "", amount: "", currency: "USD", due_date: "" });
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    (async () => {
      const c = await getCustomers(); setCustomers(c.data.customers || []);
      const v = await getVendors(); setVendors(v.data.vendors || []);
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInvoice(form);
      window.location.href = "/invoices";
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-lg">
        <label className="block text-sm mb-1">Customer</label>
        <select value={form.customer_id} onChange={(e) => setForm({...form, customer_id: e.target.value})} className="w-full mb-3 p-2 border rounded">
          <option value="">Choose Customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <label className="block text-sm mb-1">Vendor (optional)</label>
        <select value={form.vendor_id} onChange={(e) => setForm({...form, vendor_id: e.target.value})} className="w-full mb-3 p-2 border rounded">
          <option value="">None</option>
          {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>

        <InputField label="Amount" name="amount" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} />
        <InputField label="Currency" name="currency" value={form.currency} onChange={(e) => setForm({...form, currency: e.target.value})} />
        <label className="block text-sm mb-1">Due Date</label>
        <input type="date" value={form.due_date} onChange={(e) => setForm({...form, due_date: e.target.value})} className="w-full mb-4 p-2 border rounded" />

        <button className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? <Loader small /> : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
