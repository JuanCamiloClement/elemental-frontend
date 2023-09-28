import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import feedSlice from "./slices/feedSlice";
import editProfileSlice from "./slices/editProfileSlice";

const makeStore = () => configureStore({
  reducer: {
    feed: feedSlice,
    editProfile: editProfileSlice,
  }
});

export const wrapper = createWrapper(makeStore);