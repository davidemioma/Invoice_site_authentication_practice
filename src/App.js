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

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const invoices = useSelector((state) => state.allInvoice);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    dispatch(
      fetchInvoiceData(
        `https://invoices-49204-default-rtdb.firebaseio.com/${authCtx.localId}.json`
      )
    );
  }, [dispatch, authCtx.localId]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (invoices.changed) {
      dispatch(
        sendInvoiceData(
          invoices,
          `https://invoices-49204-default-rtdb.firebaseio.com/${authCtx.localId}.json`
        )
      );
    }
  }, [dispatch, invoices, authCtx.localId]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}

      <Route
        path="/invoices"
        element={authCtx.isLoggedIn ? <InvoicesPage /> : <AuthPage />}
      />

      <Route path="/invoices/:invoiceId" element={<InvoicePage />} />
    </Routes>
  );
}

export default App;
