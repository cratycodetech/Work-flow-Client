import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for user and token
export type TUser = {
  adminId?: string;
  email?: string;
  password?: string;
  role?: "admin";
  status?: boolean;
}

export type TUserToken = {
  id: string;
  email: string;
  role: string;
}

// Define the initial state type
type AuthState = {
  user: TUser | null;
  token: TUserToken | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  token: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user?: TUser; token?: TUserToken }>) => {
      const { user, token } = action.payload;
      if(user) state.user = user;
      if(token) state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const useCurrentUser = (state: RootState): TUser | null => state.auth.user;
export const useCurrentUserToken = (state: RootState): TUserToken | null => state.auth.token;
