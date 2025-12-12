
import React, { useEffect, useState } from "react";
import { getJournalEntries, approveJournal } from "../../../services/journalService";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";

const JournalEntries = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getJournalEntries();
      setEntries(res.data || res.data?.results || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    if (!confirm("Approve this journal entry?")) return;
    await approveJournal(id);
    load();
  };

  const cols = [
    { key: "id", title: "ID" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    { key: "date", title: "Date" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Journal Entries</h2>
        <button onClick={() => (window.location.href = "/journal/create")} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>

      {loading ? <Loader /> : <Table columns={cols} data={entries} renderRowExtra={(r) => (
        <div className="flex gap-2">
          {r.status !== "Approved" && <button className="text-green-600" onClick={() => handleApprove(r.id)}>Approve</button>}
        </div>
      )} />}
    </div>
  );
};

export default JournalEntries;
