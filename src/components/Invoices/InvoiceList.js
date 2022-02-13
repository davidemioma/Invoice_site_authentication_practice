import "./InvoiceList.css";
import InvoiceItem from "./InvoiceItem";
import { getDueDate } from "../../utils/utils";
import EmptyInvoices from "./EmptyInvoices";

function InvoiceList(props) {
  if (props.invoices.length <= 0) {
    return (
      <EmptyInvoices
        header={"There is nothing here"}
        text={"Create on invoice by clicking the New button and get started"}
      />
    );
  }

  return (
    <div className=" list">
      {props.invoices.map((invoice) => {
        const amount = invoice.itemList.map((item) => item.price * item.qty);

        if (amount.length <= 0) {
          return;
        }

        const totalAmount = amount.reduce((a, b) => a + b);

        const dueDate = getDueDate(invoice.invoiceDate, invoice.terms);

        return (
          <InvoiceItem
            key={invoice.id}
            id={invoice.id}
            toName={invoice.to.name}
            dueDate={dueDate}
            totalAmount={`£${totalAmount}`}
            status={invoice.status}
          />
        );
      })}
    </div>
  );
}

export default InvoiceList;
