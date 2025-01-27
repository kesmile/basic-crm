import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  user: null | { id: string; name: string; email: string };
  token: string | null;
}

const tokenFromStorage = localStorage.getItem('token');
const userFromStorage = tokenFromStorage ? jwtDecode<{ id: string; name: string; email: string }>(tokenFromStorage) : null;

const initialState: AuthState = {
  user: userFromStorage,
  token: tokenFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: { id: string; name: string; email: string } }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

