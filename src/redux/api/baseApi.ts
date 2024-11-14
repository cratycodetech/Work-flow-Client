import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// const baseQuery = fetchBaseQuery(
//     { baseUrl: 'http://localhost:7000/api/v1',
//     // credentials: "include",
// })

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:7000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; // Get token from auth slice
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Attach token if available
      }
      return headers;
    },
    // credentials: "include", // Uncomment if needed for cookies
  });

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ['employee', "dashboard", "attendance", "leave", "salary", "announcement", "geoFencing"],
    endpoints: () => ({}),
  })