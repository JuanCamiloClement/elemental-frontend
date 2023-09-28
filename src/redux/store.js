import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import feedSlice from "./slices/feedSlice";
import editProfileSlice from "./slices/editProfileSlice";
import userSlice from "./slices/userSlice";

const makeStore = () => configureStore({
  reducer: {
    feed: feedSlice,
    editProfile: editProfileSlice,
    user: userSlice,
  }
});

export const wrapper = createWrapper(makeStore);