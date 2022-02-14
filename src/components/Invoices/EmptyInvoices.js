import "./EmptyInvoices.css";

function EmptyInvoices(props) {
  return (
    <div className="emptyList">
      <img src={"/static/images/illustration-empty.svg"} alt="" />

      <span className="emptytitle">
        <h1>{props.header}</h1>
        <p>{props.text}</p>
      </span>

      <button style={{ display: props.display }} onClick={props.handleClick}>
        {props.task}
      </button>
    </div>
  );
}

export default EmptyInvoices;
