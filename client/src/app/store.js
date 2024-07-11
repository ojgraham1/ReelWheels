import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from "../api/sliceAuth"

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export default store;

