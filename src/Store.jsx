import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      if (state.balance >= state.loan) {
        return {
          ...state,
          loan: 0,
          loanPurpose: "",
          balance: state.balance - state.loan,
        };
      }
      return state;

    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "account/deposite", payload: 500 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Get a new Gaming Pc" },
});
store.dispatch({ type: "account/withdraw", payload: 800 });

console.log(store.getState());
console.log("Hey i just refreshed");

store.dispatch({ type: "account/deposite", payload: 300 });
store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
