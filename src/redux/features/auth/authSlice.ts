import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for user and token
export type TAdmin = {
  adminId?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
  role?: "admin";
  status?: boolean;
}

export type TAdminToken = {
  id: string;
  email: string;
  role: string;
}

// Define the initial state type
type AuthState = {
  admin: TAdmin | null;
  token: TAdminToken | null;
}

// Define the initial state
const initialState: AuthState = {
  admin: null,
  token: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<{ admin?: TAdmin; token?: TAdminToken }>) => {
      const { admin, token } = action.payload;
      if(admin) state.admin = admin;
      if(token) state.token = token;
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
    }
  },
});

export const { setAdmin, logout } = authSlice.actions;

export default authSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const useCurrentAdmin = (state: RootState): TAdmin | null => state.auth.admin;
export const useCurrentAdminToken = (state: RootState): TAdminToken | null => state.auth.token;
