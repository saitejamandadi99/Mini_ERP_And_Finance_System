// src/pages/finance/vendors/EditVendor.jsx
import React, { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import { getVendors, updateVendor } from "../../../services/vendorService";
import Loader from "../../../components/Loader";

const EditVendor = ({ params }) => {
  const id = (params && params.id) || window.location.pathname.split("/").pop();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async()=> {
      try {
        const res = await getVendors();
        const v = res.data.vendors.find(x => String(x.id) === String(id));
        if (v) setForm(v);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateVendor(id, form);
    window.location.href = "/vendors";
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Vendor</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <InputField label="Name" name="name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
        <InputField label="Email" name="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
        <InputField label="Phone" name="phone" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} />
        <InputField label="Address" name="address" value={form.address} onChange={(e)=>setForm({...form, address: e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default EditVendor;
