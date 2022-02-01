import "./NewForm.css";
import Item from "./Item";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { invoiceActions } from "../../store/index-redux";
import EditItem from "./EditItem";
import { useState, Fragment } from "react";
import { formatEditDate } from "../../utils/utils";

function EditForm(props) {
  const params = useParams();

  const dispatch = useDispatch();

  const { invoiceId } = params;

  const invoices = useSelector((state) => state.allInvoice.invoices);

  const invoiceData = invoices.filter((invoice) => invoice.id === invoiceId);

  const invoice = invoiceData[0];

  //This is all the invoice item Function
  const [invoiceItemList, setInvoiceItemList] = useState([]);

  const [component, setComponent] = useState(["sampleComponent"]);

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

  const getEditItemValue = (value) => {
    setInvoiceItemList((prev) => [...prev, value]);
  };

  //This formats the date input
  const date = formatEditDate(invoice.invoiceDate);

  //The input Ref
  const [addressInput, setAddressInput] = useState(invoice.from.address);

  const onChangeAddressValue = (e) => {
    setAddressInput(e.target.value);
  };

  const [cityInput, setCityInput] = useState(invoice.from.city);

  const onChangeCityValue = (e) => {
    setCityInput(e.target.value);
  };

  const [postcodeInput, setPostcodeInput] = useState(invoice.from.postCode);

  const onChangePostCodeValue = (e) => {
    setPostcodeInput(e.target.value);
  };

  const [countryInput, setCountryInput] = useState(invoice.from.country);

  const onChangeCountryValue = (e) => {
    setCountryInput(e.target.value);
  };

  const [clientNameInput, setClientNameInput] = useState(invoice.to.name);

  const onChangeclientNameValue = (e) => {
    setClientNameInput(e.target.value);
  };

  const [clientMailInput, setClientMailInput] = useState(invoice.to.mail);

  const onChangeclientMailValue = (e) => {
    setClientMailInput(e.target.value);
  };

  const [clientAddressInput, setClientAddressInput] = useState(
    invoice.to.address
  );

  const onChangeclientAddressValue = (e) => {
    setClientAddressInput(e.target.value);
  };

  const [clientCityInput, setClientCityInput] = useState(invoice.to.city);

  const onChangeclientCityValue = (e) => {
    setClientCityInput(e.target.value);
  };

  const [clientPostCodeInput, setClientPostCodeInput] = useState(
    invoice.to.postCode
  );

  const onChangeclientPostCodeValue = (e) => {
    setClientPostCodeInput(e.target.value);
  };

  const [clientCountryInput, setClientCountryInput] = useState(
    invoice.to.country
  );

  const onChangeclientCountryValue = (e) => {
    setClientCountryInput(e.target.value);
  };

  const [invoiceDateInput, setInvoiceDateInput] = useState(date);

  const onChangeInvoiceDateValue = (e) => {
    setInvoiceDateInput(e.target.value);
  };

  const [termValue, setTermValue] = useState(invoice.terms);

  const getTermValue = (e) => {
    if (e.target.value) {
      setTermValue(e.target.value);
    }
  };

  const [descriptionInput, setDescriptionInput] = useState(invoice.desc);

  const onChangeDescriptionValue = (e) => {
    setDescriptionInput(e.target.value);
  };

  const onSubmitHandler = () => {
    if (
      addressInput === "" &&
      cityInput === "" &&
      postcodeInput === "" &&
      countryInput === "" &&
      clientNameInput === "" &&
      clientMailInput === "" &&
      clientAddressInput === "" &&
      clientCityInput === "" &&
      clientPostCodeInput === "" &&
      clientCountryInput === "" &&
      invoiceDateInput === "" &&
      descriptionInput === "" &&
      termValue === "" &&
      invoiceItemList.length <= 0
    ) {
      return;
    }

    const updatedInvoice = {
      from: {
        address: addressInput,
        city: cityInput,
        postCode: postcodeInput,
        country: countryInput,
      },
      to: {
        mail: clientMailInput,
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
      status: invoice.status,
      id: invoice.id,
    };

    dispatch(invoiceActions.updateInvoice(updatedInvoice));

    props.closeForm();
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
          <button className="backBtn">
            <img src={"/static/images/icon-arrow-left.svg"} alt="" />
            Go Back
          </button>

          <h2>Edit #{invoice.id}</h2>

          <div className="form">
            <p>Bill Form</p>

            <div className="formInput">
              <label htmlFor="address">Street Address</label>
              <input
                defaultValue={addressInput}
                type="text"
                id="address"
                onChange={onChangeAddressValue}
              />
            </div>

            <div className="formGrid">
              <div className="formInput">
                <label htmlFor="city">City</label>
                <input
                  defaultValue={cityInput}
                  type="text"
                  id="city"
                  onChange={onChangeCityValue}
                />
              </div>

              <div className="formInput">
                <label htmlFor="postCode">Post Code</label>
                <input
                  defaultValue={postcodeInput}
                  type="text"
                  id="postCode"
                  onChange={onChangePostCodeValue}
                />
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="country">Country</label>
              <input
                defaultValue={countryInput}
                type="text"
                id="country"
                onChange={onChangeCountryValue}
              />
            </div>

            <p>Bill To</p>

            <div className="formInput">
              <label htmlFor="clientName">Client's Name</label>
              <input
                defaultValue={clientNameInput}
                type="text"
                id="clientName"
                onChange={onChangeclientNameValue}
              />
            </div>

            <div className="formInput">
              <label htmlFor="clientEmail">Client's Email</label>
              <input
                defaultValue={clientMailInput}
                type="email"
                id="clientEmail"
                onChange={onChangeclientMailValue}
              />
            </div>

            <div className="formInput">
              <label htmlFor="clientAddress">Street Address</label>
              <input
                defaultValue={clientAddressInput}
                type="text"
                id="clientAddress"
                onChange={onChangeclientAddressValue}
              />
            </div>

            <div className="formGrid">
              <div className="formInput">
                <label htmlFor="clientCity">City</label>
                <input
                  defaultValue={clientCityInput}
                  type="text"
                  id="clientCity"
                  onChange={onChangeclientCityValue}
                />
              </div>

              <div className="formInput">
                <label htmlFor="clientPostCode">Post Code</label>
                <input
                  defaultValue={clientPostCodeInput}
                  type="text"
                  id="clientPostCode"
                  onChange={onChangeclientPostCodeValue}
                />
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="clientCountry">Country</label>
              <input
                defaultValue={clientCountryInput}
                type="text"
                id="clientCountry"
                onChange={onChangeclientCountryValue}
              />
            </div>

            <div className="formGrid">
              <div className="formInput">
                <label htmlFor="invoiceDate">Invoice Date</label>
                <input
                  type="date"
                  id="invoiceDate"
                  defaultValue={invoiceDateInput}
                  onChange={onChangeInvoiceDateValue}
                />
              </div>

              <div className="formInput">
                <label htmlFor="paymentTerm">Payment Term</label>
                <select onClick={getTermValue} defaultValue={termValue}>
                  <option value="1">Net 1 day</option>
                  <option value="7">Net 7 days</option>
                  <option value="30">Net 30 days</option>
                </select>
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="description">Project Description</label>
              <input
                defaultValue={descriptionInput}
                type="text"
                id="description"
                onChange={onChangeDescriptionValue}
              />
            </div>

            <h2>Item List</h2>

            <div className="itemList">
              {invoice.itemList.map((item, i) => (
                <EditItem
                  key={i}
                  itemName={item.itemName}
                  qty={item.qty}
                  price={item.price}
                  onItemValue={getEditItemValue}
                />
              ))}

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
              <div></div>

              <div>
                <button onClick={props.closeForm} className="btnCancel">
                  Cancel
                </button>
                <button
                  disabled={invoiceItemList.length <= 0}
                  onClick={onSubmitHandler}
                  className="btnSaveChanges"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default EditForm;
