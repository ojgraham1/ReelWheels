import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: {} }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;

const initialState = {
  token: localStorage.getItem("token") || null,
  Id: localStorage.getItem("userId") || null
};
  
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem ("username", action.payload);
    },
  },
});

export const { setToken, clearToken, setUsername } = authSlice.actions;

export default authSlice.reducer;
