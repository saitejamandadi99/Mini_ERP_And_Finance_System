
import React, { useEffect, useState } from "react";
import { getAccounts, deleteAccount } from "../../../services/accountService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";

const AccountsList = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [q, setQ] = useState("");

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAccounts();
      setAccounts(res.data.accounts || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete account?")) return;
    await deleteAccount(id);
    fetch();
  };

  const cols = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "type", title: "Type" },
    { key: "balance", title: "Balance", render: (r) => `₹${r.balance ?? 0}` },
  ];

  const filtered = accounts.filter(a => a.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chart of Accounts</h2>
        <button onClick={() => (window.location.href = "/accounts/create")} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>

      <SearchBar value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search accounts..." />

      {loading ? <Loader /> : <Table columns={cols} data={filtered} renderRowExtra={(r) => (
        <div className="flex gap-2">
          <button className="text-sm text-blue-600" onClick={() => (window.location.href = `/accounts/edit/${r.id}`)}>Edit</button>
          <button className="text-sm text-red-600" onClick={() => handleDelete(r.id)}>Delete</button>
        </div>
      )} />}
    </div>
  );
};

export default AccountsList;
