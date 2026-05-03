import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store.jsx";
import { Provider } from "react-redux";
import { createAccount } from "./features/customer/customerSlice.js";

store.dispatch(createAccount("Jonas", "338217"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
