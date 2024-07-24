import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api", //Where the API state will be stored
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // Specifies the base URL for API requests
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token; // Retrieves the authentication token 

      if (token) {
        headers.set("authorization", `Bearer ${token}`); // Sets the Authorization header with the Bearer token if available
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}), // Placeholder for defining API endpoints
});

//