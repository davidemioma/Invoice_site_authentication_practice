import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoice-slice";

const store = configureStore({
  reducer: { allInvoice: invoiceSlice.reducer },
});

export const invoiceActions = invoiceSlice.actions;

export default store;
