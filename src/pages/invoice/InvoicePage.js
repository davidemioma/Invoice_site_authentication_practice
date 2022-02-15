import InvoiceDetail from "../../components/InvoiceDetail/InvoiceDetail";
import Nav from "../../components/Layout/Nav";
import classes from "./Invoice.module.css";
import { useNavigate } from "react-router";
import EditForm from "../../components/Form/EditForm";
import { Fragment, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function InvoicePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const { invoiceId } = useParams();

  const invoices = useSelector((state) => state.allInvoice.invoices);

  const invoiceData = invoices?.filter((invoice) => invoice.id === invoiceId);

  const invoice = invoiceData[0];

  const onGoBackHandler = () => {
    navigate("/invoices", { replace: true });
  };

  const openFormHandler = () => {
    setModalOpen(true);
  };

  const closeFormHandler = () => {
    setModalOpen(false);
  };

  return (
    <Fragment>
      {invoice && (
        <div className={classes.invoice}>
          <div className={classes.navBar}>
            <Nav />
          </div>

          <InvoiceDetail
            invoice={invoice}
            onGoBack={onGoBackHandler}
            openForm={openFormHandler}
          />

          <EditForm
            invoice={invoice}
            closeForm={closeFormHandler}
            show={modalOpen}
          />
        </div>
      )}
    </Fragment>
  );
}

export default InvoicePage;
