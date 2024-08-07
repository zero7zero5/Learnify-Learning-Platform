import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  userDetails: {
    id: null,
    name: null,
    email: null,
    completedCourse: [],
    purchasedCourse: [],
    cart: [],
    role: null,
    date: null,
  },
  selectedLessonUrl:
    "https://player.vimeo.com/video/862451607?h=0c42376219&color=ffffff&title=0&byline=0&portrait=0",
  lessonIndex: null,
  sectionIndex: null,
  autoPlay: false,
};

export const userDataSlice = createSlice({
  name: "userdataslice",
  initialState,
  reducers: {
    setLoggedIn: (state, actions) => {
      state.isLoggedIn = true;
      state.accessToken = actions.payload.accessToken;
      state.userDetails = actions.payload.user;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.userDetails = {};
    },
    selectLessonUrl: (state, action) => {
      state.selectedLessonUrl = action.payload;
    },
    toggleAutoPlay: (state) => {
      state.autoPlay = !state.autoPlay;
    },
    selectlessonIndex: (state, action) => {
      state.lessonIndex = action.payload;
    },
    selectsectionIndex: (state, action) => {
      state.sectionIndex = action.payload;
    },
    setCart: (state, action) => {
      state.userDetails.cart = action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setLoggedOut,
  selectLessonUrl,
  toggleAutoPlay,
  selectlessonIndex,
  selectsectionIndex,
  setCart,
} = userDataSlice.actions;
export default userDataSlice.reducer;
