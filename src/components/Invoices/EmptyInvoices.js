import "./EmptyInvoices.css";

function EmptyInvoices(props) {
  return (
    <div className="emptyList">
      <img src={"/static/images/illustration-empty.svg"} alt="" />

      <span>
        <h1>{props.header}</h1>
        <p>{props.text}</p>
      </span>
    </div>
  );
}

export default EmptyInvoices;
