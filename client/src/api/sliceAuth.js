import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

// Define authApi using api.injectEndpoints
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Define login endpoint mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login", // Endpoint URL for login
        method: "POST", // HTTP method POST
        body: credentials, // Request body containing credentials
      }),
    }),
     // Define register endpoint mutation
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register", // Endpoint URL for register
        method: "POST", // HTTP method POST
        body: credentials, // Request body containing credentials
      }),
    }),
      // Define logout endpoint mutation
    logout: builder.mutation({
      queryFn: () => ({ data: {} }), // Empty query function for logout
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;

// Define initial state for authentication slice
const initialState = {
  token: localStorage.getItem("token") || null, // Initialize token
  userId: localStorage.getItem("userId") || null, // Initialize userId
  username: localStorage.getItem("username") || null, // Initialize username
};

// Create authSlice using createSlice from Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState, // Initial state defined above
  reducers: {
    // Reducer function to set token
    setToken: (state, action) => {
      state.token = action.payload; // Update token
      localStorage.setItem("token", action.payload); // Store token
    },
       // Reducer function to clear token
    clearToken: (state) => {
      state.token = null; // Set token
      localStorage.removeItem("token"); // Remove token 
    },
      // Reducer function to set username
    setUsername: (state, action) => {
      state.username = action.payload; // Update username 
      localStorage.setItem("username", action.payload); // Store username
    },
     // Reducer function to set userId
    setUserId: (state, action) => {
      state.userId = action.payload; // Update userId
      localStorage.setItem("userId", action.payload); // Store userId
    },
  },
});

export const { setToken, clearToken, setUsername, setUserId } =
  authSlice.actions;

export default authSlice.reducer;
