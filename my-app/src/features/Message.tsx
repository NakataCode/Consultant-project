import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "./storeTypes";

const initialStateValue: Message[] = [];

export const userSlice = createSlice({
  name: "messages",
  initialState: { value: initialStateValue },
  reducers: {
    sendMessage: (state, action: PayloadAction<Message[]>) => {
      state.value = action.payload;
    },

    clearMessages: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { sendMessage, clearMessages } = userSlice.actions;
export default userSlice.reducer;
