import AdvertReducer from "./features/AdvertSlice";
import AuthReducer from "./features/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./features/Message";
import searchReducer from "./features/SearchSlice";

const store = configureStore({
  reducer: {
    advertisements: AdvertReducer,
    auth: AuthReducer,
    messages: messagesReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
