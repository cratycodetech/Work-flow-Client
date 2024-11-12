import { baseApi } from "@/redux/api/baseApi"

const adminDashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getTotalEmployee: builder.query({
            query: (employeeInfo) =>({
                url: "/dashbroad/total",
                method: "GET",
                body: employeeInfo
            }),
            providesTags: ['dashboard'],
        }),
    })
})

export const {useGetTotalEmployeeQuery, } = adminDashboardApi;