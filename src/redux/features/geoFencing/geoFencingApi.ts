import { baseApi } from "@/redux/api/baseApi"

const geoFencingApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllGeoCodeLocation: builder.query({
            query: (geoInfo) =>({
                url: "/geofancing/all",
                method: "GET",
                body: geoInfo
            }),
            providesTags: ['geoFencing'],
        }),
        // getSingleEmployeeLocation: builder.query({
        //     query: (geoInfo) =>({
        //         url: "/geofancing/single-employee",
        //         method: "GET",
        //         body: geoInfo
        //     }),
        //     providesTags: ['geoFencing'],
        // }),
        getSingleEmployeeLocation: builder.query({
            query: ({ employeeId, employeeName, location }) => {
                const params = new URLSearchParams({
                    employeeId: employeeId || '',
                    employeeName: employeeName || '',
                    location: location || '',
                });
                
                return `/geofancing/single-employee?${params.toString()}`;
            },
        }),
    })
})

export const { useGetAllGeoCodeLocationQuery, useGetSingleEmployeeLocationQuery } = geoFencingApi;