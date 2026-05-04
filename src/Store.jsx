import customerReducer from "./features/customer/customerSlice";
import accountReducer from "./features/account/accountSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
