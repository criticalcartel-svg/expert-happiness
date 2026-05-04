import { createSlice } from "@reduxjs/toolkit";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: {
    deposit(state, action) {
      if (action.payload <= 0) return;

      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (state.balance < action.payload || action.payload < 1) return;

      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan < 0 || action.payload < 1) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      if (state.balance >= state.loan) {
        state.balance -= state.loan;
        state.loan = 0;
        state.loanPurpose = "";
      }
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency == "USD") return { type: "account/deposit", payload: amount };

  return async function convertCurrency(dispatch) {
    dispatch({ type: "account/convertingCurrency" });

    const api = "https://api.frankfurter.dev";
    const res = await fetch(`${api}/v2/rate/${"USD"}/${currency}`);
    const data = await res.json();
    const converted = await Number((amount * data.rate).toFixed(2));

    dispatch({ type: "account/deposit", payload: converted });
  };
}

/* export default function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case "account/deposit":
      if (action.payload <= 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      if (state.balance < action.payload || action.payload < 1) return state;
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0 || action.payload.amount <= 1) return state;
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

    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency == "USD") return { type: "account/deposit", payload: amount };

  return async function convertCurrency(dispatch) {
    dispatch({ type: "account/convertingCurrency" });

    const api = "https://api.frankfurter.dev";
    const res = await fetch(`${api}/v2/rate/${"USD"}/${currency}`);
    const data = await res.json();
    const converted = await Number((amount * data.rate).toFixed(2));

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
} */
