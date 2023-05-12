import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isSignedIn: boolean;
}

const initialState: AuthState = {
  isSignedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const { setSignedIn } = authSlice.actions;

export default authSlice.reducer;
