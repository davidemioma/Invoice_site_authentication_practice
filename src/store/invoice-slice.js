import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    totalInvoices: 0,
    changed: false,
  },
  reducers: {
    replaceInvoices(state, action) {
      state.invoices = action.payload.invoices;
      state.totalInvoices = action.payload.totalInvoices;
    },

    addInvoice(state, action) {
      const newInvoice = action.payload;

      const existingInvoice = state.invoices.find(
        (invoice) => invoice.id === newInvoice.id
      );

      if (!existingInvoice) {
        state.invoices.push(newInvoice);
        state.totalInvoices++;
      }

      state.changed = true;
    },

    deleteInvoice(state, action) {
      const id = action.payload;

      const existingInvoice = state.invoices.find(
        (invoice) => invoice.id === id
      );

      if (existingInvoice) {
        state.invoices = state.invoices.filter((invoice) => invoice.id !== id);
        state.totalInvoices--;
      }

      state.changed = true;
    },

    markInvoiceAsPaid(state, action) {
      const id = action.payload;

      const existingInvoice = state.invoices.findIndex(
        (invoice) => invoice.id === id
      );

      if (state.invoices[existingInvoice]) {
        state.invoices[existingInvoice].status = "Paid";
      }

      state.changed = true;
    },

    updateInvoice(state, action) {
      const updatedInvoice = action.payload;

      const existingInvoice = state.invoices.findIndex(
        (invoice) => invoice.id === updatedInvoice.id
      );

      if (state.invoices[existingInvoice]) {
        state.invoices[existingInvoice] = updatedInvoice;
      }

      state.changed = true;
    },
  },
});

export default invoiceSlice;
