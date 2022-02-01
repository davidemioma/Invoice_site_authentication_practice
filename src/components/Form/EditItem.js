import { useRef, useState } from "react";
import "./Item.css";

function EditItem(props) {
  const [btnClicked, setBtnClicked] = useState(false);

  const total = props.price * props.qty;

  const nameInputRef = useRef();

  const qtyInputRef = useRef();

  const priceInputRef = useRef();

  const onSubmitHandler = () => {
    if (
      nameInputRef.current.value === "" &&
      qtyInputRef.current.value === "" &&
      priceInputRef.current.value === ""
    ) {
      return;
    }

    setBtnClicked(true);

    const invoiceItem = {
      itemName: nameInputRef.current.value,
      qty: qtyInputRef.current.value,
      price: priceInputRef.current.value,
      total: total,
      id: props.id,
    };

    props.onItemValue(invoiceItem);
  };

  return (
    <div className="item">
      <div className="formInput">
        <label htmlFor="itemName">Item Name</label>
        <input
          defaultValue={props.itemName}
          type="text"
          id="itemName"
          ref={nameInputRef}
        />
      </div>

      <div className="itemGrid">
        <div className="formInput">
          <label htmlFor="qty">Qty.</label>
          <input
            defaultValue={props.qty}
            type="number"
            id="qty"
            ref={qtyInputRef}
          />
        </div>

        <div className="formInput">
          <label htmlFor="price">Price</label>
          <input
            defaultValue={props.price}
            type="number"
            id="price"
            ref={priceInputRef}
          />
        </div>

        <div className="total">
          <span>Total</span>
          <p>{total}</p>
        </div>

        <button className="removeItem">
          <img src={"/static/images/icon-delete.svg"} alt="" />
        </button>

        <button
          className="btnAddToList"
          onClick={onSubmitHandler}
          disabled={btnClicked}
        >
          {!btnClicked && <img src="/static/images/icon-plus.svg" alt="" />}
          {btnClicked && <img src="/static/images/icon-check.svg" alt="" />}
        </button>
      </div>
    </div>
  );
}

export default EditItem;
