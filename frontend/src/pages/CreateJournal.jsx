import { useEffect, useState } from "react";
import { getAccounts } from "../../services/accountService";
import { createJournalEntry } from "../../services/journalService";
import Loader from "../../components/Loader";

const CreateJournal = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  const [description, setDescription] = useState("");
  const [lines, setLines] = useState([
    { account_id: "", debit: 0, credit: 0 },
    { account_id: "", debit: 0, credit: 0 },
  ]);

  useEffect(() => {
    getAccounts().then((res) => {
      setAccounts(res.data.accounts);
      setLoading(false);
    });
  }, []);

  const addLine = () => {
    setLines([...lines, { account_id: "", debit: 0, credit: 0 }]);
  };

  const updateLine = (idx, key, value) => {
    const copy = [...lines];
    copy[idx][key] = value;
    setLines(copy);
  };

  const handleSubmit = async () => {
    await createJournalEntry({ description, lines });
    alert("Journal Entry Created");
    setDescription("");
    setLines([{ account_id: "", debit: 0, credit: 0 }]);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-xl font-semibold">Create Journal Entry</h2>

      <input
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="space-y-4">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-2">

            <select
              className="border p-2 flex-1"
              value={line.account_id}
              onChange={(e) => updateLine(idx, "account_id", e.target.value)}
            >
              <option value="">Select Account</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="border p-2 w-32"
              placeholder="Debit"
              value={line.debit}
              onChange={(e) => updateLine(idx, "debit", e.target.value)}
            />

            <input
              type="number"
              className="border p-2 w-32"
              placeholder="Credit"
              value={line.credit}
              onChange={(e) => updateLine(idx, "credit", e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={addLine} className="bg-gray-700 text-white px-4 py-2 rounded">
        + Add Line
      </button>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit Journal Entry
      </button>

    </div>
  );
};

export default CreateJournal;
