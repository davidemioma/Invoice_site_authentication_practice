import Filters from "./Filters";
import "./Layout.css";
import { useSelector } from "react-redux";
import { useAuth } from "../../store/auth-context";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";

function Layout(props) {
  const authCtx = useAuth();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const noOfInvoices = useSelector((state) => state.allInvoice.totalInvoices);

  const getFilterValue = (value) => {
    props.getFilterValue(value);
  };

  const onLogoutHandler = async () => {
    try {
      await authCtx.logout();

      navigate("/login", { replace: true });
    } catch (err) {
      setError("Failed to log out");
    }
  };

  return (
    <div className="container layout ">
      <header className="header">
        <div className="invo">
          <span>Invoices</span>
          <span className="amount">{noOfInvoices} invoices</span>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

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
