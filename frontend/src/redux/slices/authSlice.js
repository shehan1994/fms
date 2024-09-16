import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false, // Add loading state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true; // Set loading to true when login starts
      state.error = null; // Clear any previous errors
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.loading = false; // Set loading to false after login success
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false; // Set loading to false after login failure
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false; // Reset loading state on logout
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setUserToken } = authSlice.actions;
export default authSlice.reducer;
