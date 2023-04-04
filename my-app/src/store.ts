import AdvertReducer from "./features/AdvertSlice";
import AuthReducer from "./features/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./features/Message";
import refreshReducer from "./features/refreshSlice";
import searchReducer from "./features/SearchSlice";

const store = configureStore({
  reducer: {
    advertisements: AdvertReducer,
    auth: AuthReducer,
    messages: messagesReducer,
    search: searchReducer,
    refresh: refreshReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
