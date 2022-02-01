import "./Item.css";
import useInput from "../../hooks/use-input";
import { useState } from "react";

function Item(props) {
  const [btnClicked, setBtnClicked] = useState(false);

  const errorText = <p className="errorText">Input must not be empty</p>;

  const onClickHandler = (e) => {
    e.preventDefault();

    props.onDelete(props.id);
  };

  const {
    value: itemNameInput,
    isValid: entereditemNameIsValid,
    isInvalid: itemNameInputIsInvalid,
    onChangeHandler: itemNameChangeHandler,
    onBlurHandler: itemNameBlurHandler,
    reset: resetitemNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: qtyInput,
    isValid: enteredqtyIsValid,
    isInvalid: qtyInputIsInvalid,
    onChangeHandler: qtyChangeHandler,
    onBlurHandler: qtyBlurHandler,
    reset: resetqtyInput,
  } = useInput((value) => value > 0);

  const {
    value: priceInput,
    isValid: enteredpriceIsValid,
    isInvalid: priceInputIsInvalid,
    onChangeHandler: priceChangeHandler,
    onBlurHandler: priceBlurHandler,
    reset: resetpriceInput,
  } = useInput((value) => value > 0);

  const total = qtyInput * priceInput;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!entereditemNameIsValid && !enteredqtyIsValid && !enteredpriceIsValid) {
      return;
    }

    setBtnClicked(true);

    const invoiceItem = {
      itemName: itemNameInput,
      qty: qtyInput,
      price: priceInput,
      total: total,
      id: props.id,
    };

    props.onItemValue(invoiceItem, e);

    resetitemNameInput();
    resetqtyInput();
    resetpriceInput();
  };

  return (
    <form onSubmit={onSubmitHandler} className="item">
      <div className="formInput">
        <label htmlFor="itemName">Item Name</label>
        <input
          value={itemNameInput}
          type="text"
          id="itemName"
          onChange={itemNameChangeHandler}
          onBlur={itemNameBlurHandler}
        />
        {itemNameInputIsInvalid && errorText}
      </div>

      <div className="itemGrid">
        <div className="formInput">
          <label htmlFor="qty">Qty.</label>
          <input
            value={qtyInput}
            type="number"
            id="qty"
            onChange={qtyChangeHandler}
            onBlur={qtyBlurHandler}
          />
          {qtyInputIsInvalid && errorText}
        </div>

        <div className="formInput">
          <label htmlFor="price">Price</label>
          <input
            value={priceInput}
            type="number"
            id="price"
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
          />
          {priceInputIsInvalid && errorText}
        </div>

        <div className="total">
          <span>Total</span>
          <p>{total}</p>
        </div>

        <button className="removeItem">
          <img
            onClick={onClickHandler}
            src={"/static/images/icon-delete.svg"}
            alt=""
          />
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
    </form>
  );
}

export default Item;
