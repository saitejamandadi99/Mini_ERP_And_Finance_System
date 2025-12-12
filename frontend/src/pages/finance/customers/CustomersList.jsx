// src/pages/finance/customers/CustomersList.jsx
import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../../../services/customerService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";

const CustomersList = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getCustomers();
        setRows(res.data.customers || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customers</h2>
        <button onClick={() => (window.location.href = "/customers/create")} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>

      <SearchBar value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search customers..." />

      {loading ? <Loader /> : <Table columns={[
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "phone", title: "Phone" },
      ]} data={rows.filter(r=>r.name.toLowerCase().includes(q.toLowerCase()))} renderRowExtra={(r)=>(
        <div className="flex gap-2">
          <button className="text-blue-600" onClick={()=>window.location.href=`/customers/edit/${r.id}`}>Edit</button>
          <button className="text-red-600" onClick={async ()=>{ if(confirm("Delete?")){ await deleteCustomer(r.id); window.location.reload(); }}}>Delete</button>
        </div>
      )} />}
    </div>
  );
};

export default CustomersList;
