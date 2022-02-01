import classes from "./InvoicesPage.module.css";
import Nav from "../../components/Layout/Nav";
import Layout from "../../components/Layout/Layout";
import InvoiceList from "../../components/Invoices/InvoiceList";
import { useSelector } from "react-redux";
import { useState } from "react";
import NewForm from "../../components/Form/NewForm";

function InvoicesPage() {
  const [filterValue, setFilterValue] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const invoices = useSelector((state) => state.allInvoice.invoices);

  const getFilterValueHandler = (value) => {
    setFilterValue(value);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (filterValue === "all") {
      return invoice;
    } else {
      return invoice.status.toLowerCase().includes(filterValue);
    }
  });

  const openFormHandler = () => {
    setModalOpen(true);
  };

  const closeFormHandler = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.home}>
      <div className={classes.navBar}>
        <Nav />
      </div>

      <div>
        <Layout
          openForm={openFormHandler}
          getFilterValue={getFilterValueHandler}
        >
          <InvoiceList invoices={filteredInvoices} />
        </Layout>
      </div>

      <NewForm closeForm={closeFormHandler} show={modalOpen} />
    </div>
  );
}

export default InvoicesPage;
