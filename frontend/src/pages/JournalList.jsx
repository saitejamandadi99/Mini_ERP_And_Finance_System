import { useEffect, useState } from "react";
import { getJournalEntries, approveJournalEntry } from "../../services/journalService";
import Loader from "../../components/Loader";

const JournalList = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  const fetchData = async () => {
    const res = await getJournalEntries();
    setEntries(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approve = async (id) => {
    await approveJournalEntry(id);
    fetchData();
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Journal Entries</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((e) => (
            <tr key={e.id} className="border">
              <td className="p-2">{e.id}</td>
              <td className="p-2">{e.description}</td>
              <td className="p-2">{e.status}</td>
              <td className="p-2">
                {e.status === "Pending" ? (
                  <button
                    onClick={() => approve(e.id)}
                    className="text-blue-600"
                  >
                    Approve
                  </button>
                ) : (
                  "Approved"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default JournalList;
