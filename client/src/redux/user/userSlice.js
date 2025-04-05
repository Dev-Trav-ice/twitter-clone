import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: null,
  loading: false,
  error: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.loggedUser = action.payload;
    },
    signInFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    signOut: (state) => {
      (state.loading = false), (state.error = false), (state.loggedUser = null);
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      (state.loading = false), (state.loggedUser = action.payload);
    },
    updateUserFailure: (state) => {
      (state.loading = false), (state.error = true);
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signOut,
  updateStart,
  updateUserFailure,
  updateUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
