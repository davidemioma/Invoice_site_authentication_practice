import HomePage from "./pages/HomePage/HomePage";
import InvoicesPage from "./pages/Invoices/InvoicesPage";
import InvoicePage from "./pages/invoice/InvoicePage";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import { Routes, Route, Navigate } from "react-router";
import PrivateRoutes from "./components/Auth/PrivateRoutes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchInvoiceData, sendInvoiceData } from "./store/invoice-actions";
import { useEffect } from "react";
import AuthContext, { useAuth } from "./store/auth-context";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const invoices = useSelector((state) => state.allInvoice);

  const authCtx = useAuth();

  // useEffect(() => {
  //   dispatch(
  //     fetchInvoiceData(
  //       `https://invoices-49204-default-rtdb.firebaseio.com/${authCtx.localId}.json`
  //     )
  //   );
  // }, [dispatch, authCtx.localId]);

  // useEffect(() => {
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   if (invoices.changed) {
  //     dispatch(
  //       sendInvoiceData(
  //         invoices,
  //         `https://invoices-49204-default-rtdb.firebaseio.com/${authCtx.localId}.json`
  //       )
  //     );
  //   }
  // }, [dispatch, invoices, authCtx.localId]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/invoices"
        element={
          <PrivateRoutes>
            <InvoicesPage />
          </PrivateRoutes>
        }
      />

      <Route
        path="/invoices/:invoiceId"
        element={
          <PrivateRoutes>
            <InvoicePage />
          </PrivateRoutes>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<SignUp />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
