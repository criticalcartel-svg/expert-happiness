import { createSlice } from "@reduxjs/toolkit";

const customerInitialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: customerInitialState,
  reducers: {
    createAccount: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;

export const { createAccount, updateName } = customerSlice.actions;

/* export default function customerReducer(state = customerInitialState, action) {
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

export function createAccount(fullName, nationalID) {
  return {
    type: "customer/createAccount",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: "updateName", payload: fullName };
} */
