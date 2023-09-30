import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: [],
  error: null,
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action) => {
      const postsToRender = [];
      action.payload.map(({ user }) => {
        user.posts.map(({ _id, url, likes, comments, createdAt }) => {
          postsToRender.push({
            _id,
            url,
            user,
            likes,
            comments,
            createdAt,
          });
        });
      });
      state.feed = postsToRender;
    }
  }
});

export const { setFeed } = feedSlice.actions;

export const feedState = (state) => state.feed; // this feed is the name of the slice

// async petition

export default feedSlice.reducer;