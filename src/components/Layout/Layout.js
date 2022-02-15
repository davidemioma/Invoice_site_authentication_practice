import Filters from "./Filters";
import "./Layout.css";
import { useSelector } from "react-redux";
import { useAuth } from "../../store/auth-context";

function Layout(props) {
  const authCtx = useAuth();

  const noOfInvoices = useSelector((state) => state.allInvoice.totalInvoices);

  const getFilterValue = (value) => {
    props.getFilterValue(value);
  };

  const onLogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className="container layout ">
      <header className="header">
        <div className="invo">
          <span>Invoices</span>
          <span className="amount">{noOfInvoices} invoices</span>
        </div>

        <div className="options">
          <Filters onFilterValue={getFilterValue} />

          <button onClick={props.openForm}>
            <span>
              <img src={"/static/images/icon-plus.svg"} alt="" />
            </span>
            New
          </button>

          <button onClick={onLogoutHandler}>Logout</button>
        </div>
      </header>

      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
