import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for user and token
export type TUser = {
  name?: string,
  email: string;
  password: string;
}


// Define the initial state type
type AuthState = {
  user: TUser | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user?: TUser }>) => {
      const { user } = action.payload;
      if(user) state.user = user;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const useCurrentUser = (state: RootState): TUser | null => state.auth.user;
