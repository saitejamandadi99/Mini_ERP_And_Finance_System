// src/pages/finance/invoices/InvoiceDetails.jsx
import React, { useEffect, useState } from "react";
import { getInvoice } from "../../../services/invoiceService";
import Loader from "../../../components/Loader";
import { getPaymentsForInvoice } from "../../../services/paymentService";

const InvoiceDetails = ({ params }) => {
  const id = (params && params.id) || window.location.pathname.split("/").pop();
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [invRes, payRes] = await Promise.all([getInvoice(id), getPaymentsForInvoice(id)]);
        setInvoice(invRes.data.invoice || invRes.data);
        setPayments(payRes.data.payments || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invoice #{invoice.id}</h2>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Customer:</strong> {invoice.customer_id}</p>
        <p><strong>Amount:</strong> ₹{invoice.amount} {invoice.currency}</p>
        <p><strong>Converted:</strong> ₹{invoice.converted_amount}</p>
        <p><strong>Status:</strong> {invoice.status}</p>
        <p className="mt-3 font-semibold">Payments</p>
        {payments.map(p => (
          <div key={p.id} className="flex justify-between py-2">
            <div>{p.method} — {p.note}</div>
            <div>₹{p.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceDetails;
