// src/pages/finance/journal/CreateJournalEntry.jsx
import React, { useState, useEffect } from "react";
import InputField from "../../../components/InputField";
import Loader from "../../../components/Loader";
import { createJournalEntry } from "../../../services/journalService";
import { getAccounts } from "../../../services/accountService";

const CreateJournalEntry = () => {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ description: "", lines: [ { account_id: "", debit: "", credit: "" }, { account_id: "", debit: "", credit: "" } ] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getAccounts();
      setAccounts(res.data.accounts || []);
    })();
  }, []);

  const addLine = () => setForm(f => ({ ...f, lines: [...f.lines, { account_id: "", debit: "", credit: "" }] }));

  const changeLine = (i, key, val) => {
    const newLines = [...form.lines];
    newLines[i][key] = val;
    setForm({ ...form, lines: newLines });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJournalEntry(form);
      window.location.href = "/journal";
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Journal Entry</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-2xl">
        <InputField label="Description" name="description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        <div className="space-y-3">
          {form.lines.map((l, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Account</label>
                <select value={l.account_id} onChange={(e) => changeLine(i, "account_id", e.target.value)} className="w-full px-2 py-2 border rounded">
                  <option value="">Select</option>
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <InputField label="Debit" value={l.debit} onChange={(e) => changeLine(i, "debit", e.target.value)} />
              <InputField label="Credit" value={l.credit} onChange={(e) => changeLine(i, "credit", e.target.value)} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={addLine} className="px-3 py-2 bg-gray-100 rounded">Add line</button>
          <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? <Loader small /> : "Save"}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateJournalEntry;
