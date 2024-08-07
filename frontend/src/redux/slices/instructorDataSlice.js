import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  instructorDetails: {
    id: null,
    name: null,
    email: null,
    aboutInstructor: "",
    courseCreated: [],
    role: "instructor",
  },
};

export const instructorDataSlice = createSlice({
  name: "instructordataslice",
  initialState,
  reducers: {
    setInstructorDetails: (state, action) => {
      state.instructorDetails = action.payload;
    },
    setInstructorLoggedIn: (state, actions) => {
      state.isLoggedIn = true;
      state.accessToken = actions.payload.accessToken;
      state.instructorDetails = actions.payload.user;
    },
    setInstructorLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.instructorDetails = {};
    },
  },
});

export const {
  setInstructorDetails,
  setInstructorLoggedIn,
  setInstructorLoggedOut,
} = instructorDataSlice.actions;
export default instructorDataSlice.reducer;
