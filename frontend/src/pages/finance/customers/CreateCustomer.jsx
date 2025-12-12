// src/pages/finance/customers/CreateCustomer.jsx
import React, { useState } from "react";
import InputField from "../../../components/InputField";
import { createCustomer } from "../../../services/customerService";
import Loader from "../../../components/Loader";

const CreateCustomer = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createCustomer(form);
    window.location.href = "/customers";
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Customer</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <InputField label="Name" name="name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
        <InputField label="Email" name="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
        <InputField label="Phone" name="phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
        <InputField label="Address" name="address" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">{loading ? <Loader small /> : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
