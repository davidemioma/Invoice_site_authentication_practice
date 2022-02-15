import "./InvoiceDetail.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getDueDate } from "../../utils/utils";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { invoiceActions } from "../../store/index-redux";
import { useNavigate } from "react-router";

function InvoiceDetail(props) {
  const params = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { invoiceId } = params;

  const invoices = useSelector((state) => state.allInvoice.invoices);

  const invoiceData = invoices?.filter((invoice) => invoice.id === invoiceId);

  const invoice = invoiceData[0];

  const dueDate = getDueDate(invoice.invoiceDate, invoice.terms);

  const amount = invoice.itemList.map((item) => item.price * item.qty);

  if (amount.length <= 0) return;

  const totalAmount = amount.reduce((a, b) => a + b);

  const onDeleteHandler = () => {
    dispatch(invoiceActions.deleteInvoice(invoice.id));
    navigate("/invoices", { replace: true });
  };

  const onMarkAsPaidHandler = () => {
    dispatch(invoiceActions.markInvoiceAsPaid(invoice.id));
  };

  let color;

  if (invoice.status === "Paid") {
    color = "green";
  } else if (invoice.status === "Pending") {
    color = "orange";
  } else {
    color = "grey";
  }

  const isPaid = invoice.status === "Paid";

  return (
    <div className="container allDetails">
      <button onClick={props.onGoBack} className="backBtn">
        <img src={"/static/images/icon-arrow-left.svg"} alt="" />
        Go Back
      </button>

      <div className="btnDiv">
        <div className="statusDiv">
          <p>Status</p>

          <div className={`status ${color}`}>
            <span className="dot"></span>
            <span className="statusName">{invoice.status}</span>
          </div>
        </div>

        <div className="statusFunctions btnTop">
          {!isPaid && (
            <button onClick={props.openForm} className="editInvoiceBtn">
              Edit
            </button>
          )}
          <button onClick={onDeleteHandler} className="deleteBtn">
            Delete
          </button>
          {!isPaid && (
            <button onClick={onMarkAsPaidHandler} className="markBtn">
              Mark as paid
            </button>
          )}
        </div>
      </div>

      <div className="details">
        <div className="clientInfo">
          <span>
            <p>
              <span>#</span>
              {invoice.id}
            </p>
            <p>Landing Page Design</p>
          </span>

          <span className="clientShit">
            <p>{invoice.from.address}</p>
            <p>{invoice.from.city}</p>
            <p>{invoice.from.country}</p>
            <p>{invoice.from.postCode}</p>
          </span>
        </div>

        <div className="recieverInfo">
          <span>
            <p>Invoice Date</p>
            <p className="answer">{invoice.invoiceDate}</p>
          </span>
          <span>
            <p>Bill To</p>
            <p className="answer">{invoice.to.name}</p>
          </span>
          <span>
            <p>Payment Due</p>
            <p className="answer">{dueDate}</p>
          </span>
          <span>
            <p>{invoice.to.address}</p>
            <p>{invoice.to.city}</p>
            <p>{invoice.to.postCode}</p>
            <p className="countryName">{invoice.to.country}</p>
          </span>
          <span>
            <p>Send To</p>
            <p className="answer">{invoice.to.mail}</p>
          </span>
        </div>
      </div>

      <div className="checkout">
        {invoice.itemList.map((item) => (
          <Fragment key={item.id}>
            <div>
              <span>
                <p>{item.itemName}</p>
                <p className="checkoutAmount">
                  <span>{item.qty}</span>
                  <span>X</span>£{item.price}
                </p>
              </span>
              <p>£{item.price * item.qty}</p>
            </div>
          </Fragment>
        ))}

        <div className="grandTotal">
          <p>Grand Total</p>
          <p className="total">£{totalAmount}</p>
        </div>
      </div>

      <div className="checkout_desktop">
        {invoice.itemList.map((item) => (
          <div key={item.id} className="priceInfo">
            <span>
              <p>Item Name</p>
              <p>{item.itemName}</p>
            </span>
            <span>
              <p>QTY.</p>
              <p>{item.qty}</p>
            </span>
            <span>
              <p>Price</p>
              <p>£{item.price}</p>
            </span>
            <span>
              <p>Total</p>
              <p>£{item.price * item.qty}</p>
            </span>
          </div>
        ))}

        <div className="grandTotal">
          <p>Amount Due</p>
          <p className="total">£{totalAmount}</p>
        </div>
      </div>

      <div className="split">
        <div></div>
        <div className="statusFunctions btnBottom">
          <button onClick={props.openForm} className="editInvoiceBtn">
            Edit
          </button>
          <button onClick={onDeleteHandler} className="deleteBtn">
            Delete
          </button>
          {!isPaid && (
            <button onClick={onMarkAsPaidHandler} className="markBtn">
              Mark as paid
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
