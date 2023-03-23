import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./features/Message";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
