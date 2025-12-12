// src/pages/finance/accounts/EditAccount.jsx
import React, { useEffect, useState } from "react";
import { getAccounts, updateAccount } from "../../../services/accountService";
import InputField from "../../../components/InputField";
import Loader from "../../../components/Loader";

const EditAccount = ({ params }) => {
  // If using React Router, grab id from params or useLocation
  const id = (params && params.id) || window.location.pathname.split("/").pop();
  const [form, setForm] = useState({ name: "", type: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAccounts(); // small helper: fetch all and pick id
        const acc = res.data.accounts.find(a => String(a.id) === String(id));
        if (acc) setForm({ name: acc.name, type: acc.type });
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateAccount(id, form);
    window.location.href = "/accounts";
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Account</h2>
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
        <button className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default EditAccount;
