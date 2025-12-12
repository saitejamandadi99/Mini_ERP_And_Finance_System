import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const API = import.meta.env.VITE_API_URL;

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch customer details
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`${API}/api/customers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const customer = res.data.customers.find((c) => c.id == id);

        if (!customer) {
          setError("Customer not found");
          setLoading(false);
          return;
        }

        setForm({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        });
      } catch (err) {
        setError("Failed to load customer details");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`${API}/api/customers/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/customers");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Customer</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Customer"}
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
