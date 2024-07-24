import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from "../api/sliceAuth";

// configure Redux store
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // define the reducer for the api slice using api.reducerPath
    auth: authReducer, // define the authReducer under the 'auth' key in the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // add API middleware to the store
});

export default store;
