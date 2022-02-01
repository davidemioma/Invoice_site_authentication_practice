import "./InvoiceItem.css";
import { useNavigate } from "react-router";

function InvoiceItem(props) {
  let color;

  if (props.status === "Paid") {
    color = "green";
  } else if (props.status === "Pending") {
    color = "orange";
  } else {
    color = "grey";
  }

  const navigate = useNavigate();

  const openDetail = () => {
    navigate(`/invoices/${props.id}`);
  };

  return (
    <div onClick={openDetail} className="invoice">
      <p className="invoiceId">
        <span>#</span>
        {props.id}
      </p>

      <p className="name">{props.toName}</p>

      <div className="invoiceInfo">
        <p className="date">
          <span>Due</span> {props.dueDate}
        </p>
        <p className="amount">{props.totalAmount}</p>
      </div>

      <div className="invoiceStatus">
        <div className={`status ${color}`}>
          <span className="dot"></span>
          <span className="statusName">{props.status}</span>
        </div>

        <img
          onClick={openDetail}
          src={"/static/images/icon-arrow-right.svg"}
          alt=""
        />
      </div>
    </div>
  );
}

export default InvoiceItem;
