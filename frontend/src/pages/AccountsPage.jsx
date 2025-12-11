import { useEffect, useState } from "react";
import { getAccounts, createAccount, updateAccount, deleteAccount } from "../../services/accountService";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

const AccountsPage = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState({ id: null, name: "", type: "" });

  const fetchAccounts = async () => {
    const res = await getAccounts();
    setAccounts(res.data.accounts);
    setLoading(false);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const openCreate = () => {
    setEditMode(false);
    setCurrent({ id: null, name: "", type: "" });
    setModalOpen(true);
  };

  const openEdit = (acc) => {
    setEditMode(true);
    setCurrent(acc);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editMode) await updateAccount(current.id, current);
    else await createAccount(current);
    setModalOpen(false);
    fetchAccounts();
  };

  const handleDelete = async (id) => {
    await deleteAccount(id);
    fetchAccounts();
  };

  const filtered = accounts.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between">
        <input
          className="border p-2 rounded"
          placeholder="Search account..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Account
        </button>
      </div>

      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((acc) => (
            <tr key={acc.id} className="border">
              <td className="p-2">{acc.name}</td>
              <td className="p-2">{acc.type}</td>
              <td className="p-2">₹{acc.balance}</td>
              <td className="p-2 space-x-2">
                <button className="text-blue-600" onClick={() => openEdit(acc)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(acc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={modalOpen} title={editMode ? "Edit Account" : "Create Account"} onClose={() => setModalOpen(false)}>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Account name"
          value={current.name}
          onChange={(e) => setCurrent({ ...current, name: e.target.value })}
        />
        <select
          className="border p-2 w-full"
          value={current.type}
          onChange={(e) => setCurrent({ ...current, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
          <option value="Equity">Equity</option>
          <option value="Revenue">Revenue</option>
          <option value="Expense">Expense</option>
        </select>

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          Save
        </button>
      </Modal>

    </div>
  );
};

export default AccountsPage;
