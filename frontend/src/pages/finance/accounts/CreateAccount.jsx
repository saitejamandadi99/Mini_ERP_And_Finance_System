// src/pages/finance/accounts/CreateAccount.jsx
import React, { useState } from "react";
import InputField from "../../../components/InputField";
import { createAccount } from "../../../services/accountService";
import Loader from "../../../components/Loader";

const CreateAccount = () => {
  const [form, setForm] = useState({ name: "", type: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAccount(form);
      window.location.href = "/accounts";
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Account</h2>
      <form onSubmit={submit} className="max-w-md bg-white p-4 rounded shadow">
        <InputField label="Name" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        <label className="block text-sm font-medium mb-1">Type</label>
        <select name="type" value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="w-full px-3 py-2 border rounded mb-4">
          <option value="">Select</option>
          <option>Asset</option>
          <option>Liability</option>
          <option>Equity</option>
          <option>Revenue</option>
          <option>Expense</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? <Loader small /> : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateAccount;
