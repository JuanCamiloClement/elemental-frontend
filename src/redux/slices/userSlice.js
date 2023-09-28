import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {},
  error: null,
  status: 'idle',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.user.error) {
        return state.error = action.payload.user.error;
      }

      state.user = action.payload.user.user;
    }
  }
});

export const { setUser } = userSlice.actions;

export const userState = (state) => state.user;

export const getUser = (userName) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/single/${userName}`);
    const fetchedUser = await response.json();
    dispatch(setUser(fetchedUser.user));
  } catch (error) {
    dispatch(userSlice.actions.setError(error.message));
  }
}

export default userSlice.reducer;