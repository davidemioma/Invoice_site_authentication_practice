import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import InvoicesPage from "./pages/Invoices/InvoicesPage";
import InvoicePage from "./pages/invoice/InvoicePage";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchInvoiceData, sendInvoiceData } from "./store/invoice-actions";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const dispatch = useDispatch();

  const invoices = useSelector((state) => state.allInvoice);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchInvoiceData());
  }, [dispatch]);

  useEffect(() => {
    if (invoices.changed) {
      dispatch(sendInvoiceData(invoices));
    }
  }, [dispatch, invoices]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}

      <Route
        path="/invoices"
        element={authCtx.isLoggedIn ? <InvoicesPage /> : <AuthPage />}
      />

      <Route
        path="/invoices/:invoiceId"
        element={authCtx.isLoggedIn ? <InvoicePage /> : <AuthPage />}
      />
    </Routes>
  );
}

export default App;
