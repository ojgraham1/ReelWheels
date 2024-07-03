import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const authApi = api.injectEndpoints ({
    endpoints: (builder) => ({
        login: builder.mutation ({
            query: (credentials) => {
                console.log("loginMut")
                console.log(credentials)
                return {
                url: "auth/login",
                method: "POST",
                body: credentials,
            }},
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
console.log(authApi)
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
      token: localStorage.getItem("token") || null ,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        clearToken: (state) => {
            state.token = "";
            localStorage.removeItem("token");
        },
    },
});

export const { setToken, clearToken } = AuthSlice.actions;

export default AuthSlice.reducer;