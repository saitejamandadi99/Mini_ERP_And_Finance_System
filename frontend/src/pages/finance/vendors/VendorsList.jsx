// src/pages/finance/vendors/VendorsList.jsx
import React, { useEffect, useState } from "react";
import { getVendors, deleteVendor } from "../../../services/vendorService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";

const VendorsList = () => {
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getVendors();
      setVendors(res.data.vendors || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const cols = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "phone", title: "Phone" },
  ];

  const filtered = vendors.filter(v => v.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Vendors</h2>
        <button onClick={() => (window.location.href = "/vendors/create")} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>

      <SearchBar value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search vendors..." />

      {loading ? <Loader /> : <Table columns={cols} data={filtered} renderRowExtra={(r) => (
        <div className="flex gap-2">
          <button className="text-blue-600" onClick={()=> (window.location.href = `/vendors/edit/${r.id}`)}>Edit</button>
          <button className="text-red-600" onClick={async ()=> { if(confirm("Delete vendor?")){ await deleteVendor(r.id); load(); }}}>Delete</button>
        </div>
      )} />}
    </div>
  );
};

export default VendorsList;
