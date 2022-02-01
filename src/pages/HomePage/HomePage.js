import Nav from "../../components/Layout/Nav";
import EmptyInvoices from "../../components/Invoices/EmptyInvoices";

function HomePage() {
  return (
    <div>
      <div>
        <Nav />
      </div>

      <EmptyInvoices
        header={"Click the avatar icon"}
        text={"Login or create an accout to add invoices"}
      />
    </div>
  );
}

export default HomePage;
