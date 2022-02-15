import Nav from "../../components/Layout/Nav";
import EmptyInvoices from "../../components/Invoices/EmptyInvoices";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/login", { push: true });
  };

  return (
    <div>
      <div>
        <Nav />
      </div>

      <EmptyInvoices
        header={"Welcome"}
        text={"Login or create an accout to add invoices"}
        display={"inline-flex"}
        task={"Login or Sign up"}
        handleClick={onClickHandler}
      />
    </div>
  );
}

export default HomePage;
