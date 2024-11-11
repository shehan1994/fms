import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token); // Save token to localStorage
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('user'); // Remove user from localStorage
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to localStorage
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setUserToken } = authSlice.actions;
export default authSlice.reducer;
