import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  currentUser: null,
  userToken: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    currentUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.userToken = action.payload.token;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.userToken = null;
    },
  },
});

export const userReducer = userSlice.reducer;

export default userSlice;
