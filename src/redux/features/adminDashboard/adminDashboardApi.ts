import { baseApi } from "@/redux/api/baseApi"

const adminDashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllEmployee: builder.query({
            query: (employeeInfo) =>({
                url: "/dashbroad/total",
                method: "GET",
                body: employeeInfo
            }),
            providesTags: ['dashboard'],
        }),
    })
})

export const {useGetAllEmployeeQuery, } = adminDashboardApi;