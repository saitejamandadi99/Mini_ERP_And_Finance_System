import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Finance Module Pages
import AccountsList from "./pages/finance/accounts/AccountsList";
import CreateAccount from "./pages/finance/accounts/CreateAccount";
import EditAccount from "./pages/finance/accounts/EditAccount";

import JournalEntries from "./pages/finance/journal/JournalEntries";
import CreateJournalEntry from "./pages/finance/journal/CreateJournalEntry";

import BalanceSheet from "./pages/finance/statements/BalanceSheet";
import ProfitLoss from "./pages/finance/statements/ProfitLoss";
import CashflowStatement from "./pages/finance/statements/CashflowStatement";

import InvoiceList from "./pages/finance/invoices/InvoiceList";
import CreateInvoice from "./pages/finance/invoices/CreateInvoice";
import InvoiceDetails from "./pages/finance/invoices/InvoiceDetails";
import ReceivableSummary from "./pages/finance/invoices/ReceivableSummary";
import PayableSummary from "./pages/finance/invoices/PayableSummary";

import PaymentTracking from "./pages/finance/payments/PaymentTracking";
import RecordPayment from "./pages/finance/payments/RecordPayment";

import VendorsList from "./pages/finance/vendors/VendorsList";
import CreateVendor from "./pages/finance/vendors/CreateVendor";
import EditVendor from "./pages/finance/vendors/EditVendor";

import CustomersList from "./pages/finance/customers/CustomersList";
import CreateCustomer from "./pages/finance/customers/CreateCustomer";
import EditCustomer from "./pages/finance/customers/EditCustomer.js";

// Components
import Loader from "./components/Loader";

// Layouts
function Layout({ children }) {
  return <div className="p-6">{children}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes Wrapped in Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/*FINANCE MODULE */}

        {/* Accounts */}
        <Route path="/accounts" element={<Layout><AccountsList /></Layout>} />
        <Route path="/accounts/create" element={<Layout><CreateAccount /></Layout>} />
        <Route path="/accounts/edit/:id" element={<Layout><EditAccount /></Layout>} />

        {/* Journal Entries */}
        <Route path="/journal" element={<Layout><JournalEntries /></Layout>} />
        <Route path="/journal/create" element={<Layout><CreateJournalEntry /></Layout>} />

        {/* Financial Statements */}
        <Route path="/statements/balance-sheet" element={<Layout><BalanceSheet /></Layout>} />
        <Route path="/statements/profit-loss" element={<Layout><ProfitLoss /></Layout>} />
        <Route path="/statements/cash-flow" element={<Layout><CashflowStatement /></Layout>} />

        {/* Invoices */}
        <Route path="/invoices" element={<Layout><InvoiceList /></Layout>} />
        <Route path="/invoices/create" element={<Layout><CreateInvoice /></Layout>} />
        <Route path="/invoices/:id" element={<Layout><InvoiceDetails /></Layout>} />
        <Route path="/invoices/receivable" element={<Layout><ReceivableSummary /></Layout>} />
        <Route path="/invoices/payable" element={<Layout><PayableSummary /></Layout>} />

        {/* Payments */}
        <Route path="/payments" element={<Layout><PaymentTracking /></Layout>} />
        <Route path="/payments/record" element={<Layout><RecordPayment /></Layout>} />

        {/* Vendors */}
        <Route path="/vendors" element={<Layout><VendorsList /></Layout>} />
        <Route path="/vendors/create" element={<Layout><CreateVendor /></Layout>} />
        <Route path="/vendors/edit/:id" element={<Layout><EditVendor /></Layout>} />

        {/* Customers */}
        <Route path="/customers" element={<Layout><CustomersList /></Layout>} />
        <Route path="/customers/create" element={<Layout><CreateCustomer /></Layout>} />
        <Route path="/customers/edit/:id" element={<Layout><EditCustomer /></Layout>} />

        {/* Misc */}
        <Route path="/loader" element={<Loader />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
