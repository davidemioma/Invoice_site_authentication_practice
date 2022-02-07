import { invoiceActions } from "./index-redux";

const axios = require("axios").default;

export const fetchInvoiceData = (page) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await axios.get(page);

      console.log(res.data);

      const result = [];

      for (const key in res.data) {
        result.push(res.data[key].invoices);
      }

      const invoices = result[0].map((invoice) => invoice);

      console.log(invoices);

      return invoices;
    };

    try {
      const invoiceData = await fetchData();

      dispatch(
        invoiceActions.replaceInvoices({
          invoices: invoiceData || [],
          totalInvoices: invoiceData.length,
        })
      );
    } catch (err) {
      console.log("Could not get invoice");
      console.error(err);
    }
  };
};

export const sendInvoiceData = (invoices, page) => {
  return async () => {
    const sendRequest = async () => {
      const res = axios.post(page, {
        invoices: invoices,
        totalInvoices: invoices.length,
      });

      console.log((await res).data);
    };

    try {
      await sendRequest();
    } catch (err) {
      console.log("Could not send invoice");
      console.log(err);
    }
  };
};
