import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./slices/userDataSlice";
// import lessonDataSlice from "./slices/lessonDataSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import instructorDataSlice from "./slices/instructorDataSlice";
import sectionDataSlice from "./slices/sectionDataSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import adminDataSlice from "./slices/adminDataSlice";

const userConfig = {
  key: "user",
  storage,
};
const InstructorConfig = {
  key: "instructor",
  storage,
};
const AdminConfig = {
  key: "admin",
  storage,
};
const SectionConfig = {
  key: "section",
  storage,
};

const persistReducers = persistReducer(userConfig, userDataSlice);
const persistInstructorReducers = persistReducer(
  InstructorConfig,
  instructorDataSlice
);
const persistSectionReducers = persistReducer(SectionConfig, sectionDataSlice);
const persistAdminReducers = persistReducer(AdminConfig, adminDataSlice);

export const store = configureStore({
  reducer: {
    userReducer: persistReducers,
    instructorReducer: persistInstructorReducers,
    sectionReducer: persistSectionReducers,
    adminReducer: persistAdminReducers,
    // lessonReducer: lessonDataSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
