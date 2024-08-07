import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  adminDetails: {
    id: null,
    name: null,
    email: null,
    completedCourse: [],
    purchasedCourse: [],
    cart: [],
    role: "admin",
  },
};

export const adminDataSlice = createSlice({
  name: "admindataslice",
  initialState,
  reducers: {
    setAdminDetails: (state, actions) => {
      state.adminDetails = actions.payload;
    },
    setLoggedIn: (state, actions) => {
      state.isLoggedIn = true;
      state.accessToken = actions.payload.accessToken;
      state.adminDetails = actions.payload.admin;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

export const {setAdminDetails, setLoggedIn, setLoggedOut} = adminDataSlice.actions;
export default adminDataSlice.reducer;