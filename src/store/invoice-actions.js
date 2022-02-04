import { invoiceActions } from "./index-redux";

export const fetchInvoiceData = (page) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(page);

      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();

      console.log(data);

      const result = [];

      for (const key in data) {
        result.push(data[key].invoices);
      }

      const invoices = result[0].map((invoice) => invoice);

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
      const res = await fetch(page, {
        method: "PUT",
        body: JSON.stringify({
          invoices: invoices,
          totalInvoices: invoices.length,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong...");
      }
    };

    try {
      await sendRequest();
    } catch (err) {
      console.log("Could not send invoice");
      console.log(err);
    }
  };
};
