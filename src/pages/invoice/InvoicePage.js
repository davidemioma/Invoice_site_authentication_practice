import InvoiceDetail from "../../components/InvoiceDetail/InvoiceDetail";
import Nav from "../../components/Layout/Nav";
import classes from "./Invoice.module.css";
import { useNavigate } from "react-router";
import EditForm from "../../components/Form/EditForm";
import { useState } from "react";

function InvoicePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const onGoBackHandler = () => {
    navigate("/invoices", { replace: true });
  };

  const openFormHandler = () => {
    setModalOpen(true);
  };

  const closeFormHandler = () => {
    setModalOpen(false);
  };

  window.onload = function () {
    window.location = "/invoices";
  };

  return (
    <div className={classes.invoice}>
      <div className={classes.navBar}>
        <Nav />
      </div>

      <InvoiceDetail onGoBack={onGoBackHandler} openForm={openFormHandler} />

      <EditForm closeForm={closeFormHandler} show={modalOpen} />
    </div>
  );
}

export default InvoicePage;
