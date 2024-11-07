import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery(
    { baseUrl: 'https://assign-7-rho.vercel.app',
    // credentials: "include",
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    // tagTypes: ['donation', "supply", 'comment', 'testimonial', 'volunteer', "user", "contact"],
    endpoints: () => ({}),
  })