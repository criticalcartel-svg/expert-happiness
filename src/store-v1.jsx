import { combineReducers, createStore } from "redux";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const customerInitialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case "account/deposit":
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

function customerReducer(state = customerInitialState, action) {
  switch (action.type) {
    case "customer/createAccount":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

/*store.dispatch({ type: "account/deposite", payload: 500 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Get a new Gaming Pc" },
});
store.dispatch({ type: "account/withdraw", payload: 800 });

console.log(store.getState());
console.log("Hey i just refreshed");

store.dispatch({ type: "account/deposit", payload: 300 });
store.dispatch({ type: "account/payLoan" });*/

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

function createAccount(fullName, nationalID) {
  return {
    type: "customer/createAccount",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "updateName", payload: fullName };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(300));
store.dispatch(requestLoan(1000));
store.dispatch(createAccount("Reed.net", "255465"));
store.dispatch(updateName("Daniel Gray"));
store.dispatch(payLoan());
console.log(store.getState());
