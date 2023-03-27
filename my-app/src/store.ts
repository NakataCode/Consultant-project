import AuthReducer from "./features/AuthSlice";
import AdvertReducer from "./features/AdvertSlice";
import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./features/Message";
import searchReducer from "./features/SearchSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    search: searchReducer,
    advertisements: AdvertReducer,
    auth: AuthReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
