import { Fragment, useState } from "react";
import "./NewForm.css";
import Item from "./Item";
import useInput from "../../hooks/use-input";
import { useDispatch } from "react-redux";
import { invoiceActions } from "../../store/index-redux";

function NewForm(props) {
  const dispatch = useDispatch();

  const randomId = Math.floor(100000 + Math.random() * 900000);

  const [component, setComponent] = useState(["sampleComponent"]);

  const [invoiceItemList, setInvoiceItemList] = useState([]);

  //To Get the term value from select Input
  const [termValue, setTermValue] = useState("1");

  const getTermValue = (e) => {
    if (e.target.value) {
      setTermValue(e.target.value);
    }
  };

  //Adding, Removing and getting the Invoice items
  const onAddItemHandler = (e) => {
    e.preventDefault();

    setComponent((prev) => [...prev, "sampleComponent"]);
  };

  const onDeleteHandler = (id) => {
    setComponent((prev) => prev.filter((item, i) => i !== id));
  };

  const getItemValue = (value) => {
    setInvoiceItemList((prev) => [...prev, value]);
  };

  //Input Validation
  const errorText = <p className="errorText">Input must not be empty</p>;

  const {
    value: addressInput,
    isValid: enteredAddressIsValid,
    isInvalid: addressInputIsInvalid,
    onChangeHandler: addressChangeHandler,
    onBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: cityInput,
    isValid: enteredCityIsValid,
    isInvalid: cityInputIsInvalid,
    onChangeHandler: cityChangeHandler,
    onBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: postCodeInput,
    isValid: enteredpostCodeIsValid,
    isInvalid: postCodeInputIsInvalid,
    onChangeHandler: postCodeChangeHandler,
    onBlurHandler: postCodeBlurHandler,
    reset: resetpostCodeInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: countryInput,
    isValid: enteredcountryIsValid,
    isInvalid: countryInputIsInvalid,
    onChangeHandler: countryChangeHandler,
    onBlurHandler: countryBlurHandler,
    reset: resetcountryInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: clientNameInput,
    isValid: enteredclientNameIsValid,
    isInvalid: clientNameInputIsInvalid,
    onChangeHandler: clientNameChangeHandler,
    onBlurHandler: clientNameBlurHandler,
    reset: resetclientNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: clientEmailInput,
    isValid: enteredclientEmailIsValid,
    isInvalid: clientEmailInputIsInvalid,
    onChangeHandler: clientEmailChangeHandler,
    onBlurHandler: clientEmailBlurHandler,
    reset: resetclientEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: clientAddressInput,
    isValid: enteredclientAddressIsValid,
    isInvalid: clientAddressInputIsInvalid,
    onChangeHandler: clientAddressChangeHandler,
    onBlurHandler: clientAddressBlurHandler,
    reset: resetclientAddressInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: clientCityInput,
    isValid: enteredclientCityIsValid,
    isInvalid: clientCityInputIsInvalid,
    onChangeHandler: clientCityChangeHandler,
    onBlurHandler: clientCityBlurHandler,
    reset: resetclientCityInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: clientPostCodeInput,
    isValid: enteredclientPostCodeIsValid,
    isInvalid: clientPostCodeInputIsInvalid,
    onChangeHandler: clientPostCodeChangeHandler,
    onBlurHandler: clientPostCodeBlurHandler,
    reset: resetclientPostCodeInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: clientCountryInput,
    isValid: enteredclientCountryIsValid,
    isInvalid: clientCountryInputIsInvalid,
    onChangeHandler: clientCountryChangeHandler,
    onBlurHandler: clientCountryBlurHandler,
    reset: resetclientCountryInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: invoiceDateInput,
    isValid: enteredinvoiceDateIsValid,
    isInvalid: invoiceDateInputIsInvalid,
    onChangeHandler: invoiceDateChangeHandler,
    onBlurHandler: invoiceDateBlurHandler,
    reset: resetinvoiceDateInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: descriptionInput,
    isValid: entereddescriptionIsValid,
    isInvalid: descriptionInputIsInvalid,
    onChangeHandler: descriptionChangeHandler,
    onBlurHandler: descriptionBlurHandler,
    reset: resetdescriptionInput,
  } = useInput((value) => value.trim() !== "");

  const resetForm = () => {
    resetAddressInput();
    resetCityInput();
    resetpostCodeInput();
    resetcountryInput();
    resetclientCountryInput();
    resetclientEmailInput();
    resetclientNameInput();
    resetclientAddressInput();
    resetclientCityInput();
    resetclientPostCodeInput();
    resetclientCountryInput();
    resetinvoiceDateInput();
    setTermValue("");
    resetdescriptionInput();
    setInvoiceItemList([]);

    props.closeForm();
  };

  //On Save and Send Button Clicked
  const onSaveAndSend = () => {
    if (
      !enteredAddressIsValid ||
      !enteredCityIsValid ||
      !enteredpostCodeIsValid ||
      !enteredcountryIsValid ||
      !enteredclientNameIsValid ||
      !enteredclientEmailIsValid ||
      !enteredclientAddressIsValid ||
      !enteredclientCityIsValid ||
      !enteredclientPostCodeIsValid ||
      !enteredclientCountryIsValid ||
      !enteredinvoiceDateIsValid ||
      !entereddescriptionIsValid ||
      termValue === "" ||
      invoiceItemList.length <= 0
    ) {
      return;
    }

    const invoice = {
      from: {
        address: addressInput,
        city: cityInput,
        postCode: postCodeInput,
        country: countryInput,
      },
      to: {
        mail: clientEmailInput,
        name: clientNameInput,
        address: clientAddressInput,
        city: clientCityInput,
        postCode: clientPostCodeInput,
        country: clientCountryInput,
      },
      invoiceDate: invoiceDateInput,
      terms: termValue,
      desc: descriptionInput,
      itemList: invoiceItemList,
      status: "Pending",
      id: randomId.toString(),
    };

    dispatch(invoiceActions.addInvoice(invoice));

    resetForm();
  };

  //On Save as draft Button Clicked
  const onSaveAsDraft = () => {
    if (
      !enteredAddressIsValid ||
      !enteredCityIsValid ||
      !enteredpostCodeIsValid ||
      !enteredcountryIsValid ||
      !enteredclientNameIsValid ||
      !enteredclientEmailIsValid ||
      !enteredclientAddressIsValid ||
      !enteredclientCityIsValid ||
      !enteredclientPostCodeIsValid ||
      !enteredclientCountryIsValid ||
      !enteredinvoiceDateIsValid ||
      !entereddescriptionIsValid ||
      termValue === "" ||
      invoiceItemList.length <= 0
    ) {
      return;
    }

    const invoice = {
      from: {
        address: addressInput,
        city: cityInput,
        postCode: postCodeInput,
        country: countryInput,
      },
      to: {
        mail: clientEmailInput,
        name: clientNameInput,
        address: clientAddressInput,
        city: clientCityInput,
        postCode: clientPostCodeInput,
        country: clientCountryInput,
      },
      invoiceDate: invoiceDateInput,
      terms: termValue,
      desc: descriptionInput,
      itemList: invoiceItemList,
      status: "Draft",
      id: randomId.toString(),
    };

    dispatch(invoiceActions.addInvoice(invoice));

    resetForm();
  };

  //On Discard Button Clicked
  const ondiscardHandler = (e) => {
    e.preventDefault();

    resetForm();
  };

  const backdropClasses = [
    "backdrop",
    props.show ? "BackdropOpen" : "BackdropClosed",
  ];

  const modalClasses = ["formModal", props.show ? "ModalOpen" : "ModalClosed"];

  return (
    <Fragment>
      {props.show && (
        <div
          onClick={props.closeForm}
          className={backdropClasses.join(" ")}
        ></div>
      )}

      {props.show && (
        <div className={modalClasses.join(" ")}>
          <button onClick={props.closeForm} className="backBtn">
            <img src={"/static/images/icon-arrow-left.svg"} alt="" />
            Go Back
          </button>

          <h2>New Invoice</h2>

          <div className="form">
            <p>Bill Form</p>

            <div className="formInput">
              <label htmlFor="address">Street Address</label>
              <input
                value={addressInput}
                type="text"
                id="address"
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
              />
              {addressInputIsInvalid && errorText}
            </div>

            <div className="formGrid">
              <div className="formInput">
                <label htmlFor="city">City</label>
                <input
                  value={cityInput}
                  type="text"
                  id="city"
                  onChange={cityChangeHandler}
                  onBlur={cityBlurHandler}
                />
                {cityInputIsInvalid && errorText}
              </div>

              <div className="formInput">
                <label htmlFor="postCode">Post Code</label>
                <input
                  value={postCodeInput}
                  type="text"
                  id="postCode"
                  onChange={postCodeChangeHandler}
                  onBlur={postCodeBlurHandler}
                />
                {postCodeInputIsInvalid && errorText}
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="country">Country</label>
              <input
                value={countryInput}
                type="text"
                id="country"
                onChange={countryChangeHandler}
                onBlur={countryBlurHandler}
              />
              {countryInputIsInvalid && errorText}
            </div>

            <p>Bill To</p>

            <div className="formInput">
              <label htmlFor="clientName">Client's Name</label>
              <input
                value={clientNameInput}
                type="text"
                id="clientName"
                onChange={clientNameChangeHandler}
                onBlur={clientNameBlurHandler}
              />
              {clientNameInputIsInvalid && errorText}
            </div>

            <div className="formInput">
              <label htmlFor="clientEmail">Client's Email</label>
              <input
                value={clientEmailInput}
                type="email"
                id="clientEmail"
                onChange={clientEmailChangeHandler}
                onBlur={clientEmailBlurHandler}
              />
              {clientEmailInputIsInvalid && errorText}
            </div>

            <div className="formInput">
              <label htmlFor="clientAddress">Street Address</label>
              <input
                value={clientAddressInput}
                type="text"
                id="clientAddress"
                onChange={clientAddressChangeHandler}
                onBlur={clientAddressBlurHandler}
              />
              {clientAddressInputIsInvalid && errorText}
            </div>

            <div className="formGrid">
              <div className="formInput">
                <label htmlFor="clientCity">City</label>
                <input
                  value={clientCityInput}
                  type="text"
                  id="clientCity"
                  onChange={clientCityChangeHandler}
                  onBlur={clientCityBlurHandler}
                />
                {clientCityInputIsInvalid && errorText}
              </div>

              <div className="formInput">
                <label htmlFor="clientPostCode">Post Code</label>
                <input
                  value={clientPostCodeInput}
                  type="text"
                  id="clientPostCode"
                  onChange={clientPostCodeChangeHandler}
                  onBlur={clientPostCodeBlurHandler}
                />
                {clientPostCodeInputIsInvalid && errorText}
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="clientCountry">Country</label>
              <input
                value={clientCountryInput}
                type="text"
                id="clientCountry"
                onChange={clientCountryChangeHandler}
                onBlur={clientCountryBlurHandler}
              />
              {clientCountryInputIsInvalid && errorText}
            </div>

            <div className="formGrid">
              <div className="formInput">
                <label htmlFor="invoiceDate">Invoice Date</label>
                <input
                  value={invoiceDateInput}
                  type="date"
                  id="invoiceDate"
                  onChange={invoiceDateChangeHandler}
                  onBlur={invoiceDateBlurHandler}
                />
                {invoiceDateInputIsInvalid && errorText}
              </div>

              <div className="formInput">
                <label htmlFor="paymentTerm">Payment Term</label>
                <select value={termValue} onChange={getTermValue}>
                  <option value="1">Net 1 day</option>
                  <option value="7">Net 7 days</option>
                  <option value="30">Net 30 days</option>
                </select>
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="description">Project Description</label>
              <input
                value={descriptionInput}
                type="text"
                id="description"
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
              />
              {descriptionInputIsInvalid && errorText}
            </div>

            <h2>Item List</h2>

            <div className="itemList">
              {component.map((item, i) => (
                <Item
                  key={i}
                  id={i}
                  onDelete={onDeleteHandler}
                  onItemValue={getItemValue}
                />
              ))}
            </div>

            <button onClick={onAddItemHandler} className="btnAdd">
              + Add New item
            </button>

            <div className="btnBox">
              <button onClick={ondiscardHandler} className="btnDiscard">
                Discard
              </button>

              <div>
                <button onClick={onSaveAsDraft} className="btnDraft">
                  Save as draft
                </button>
                <button onClick={onSaveAndSend} className="btnSend">
                  Save & Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default NewForm;
