import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
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
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false; 
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
