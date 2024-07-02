import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Definitely need to check back in on this, second guessing myself majorly
export const api = createApi ({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery ({
        baseUrl: 'http://localhost:3000/',
        prepareHeaders: (headers, { getState }) => {
            console.log("prepareHeaders");
            console.log(getState());
            const token = getState().auth?.token;
            console.log("TOKEN", token);
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: ()=> ({})
});