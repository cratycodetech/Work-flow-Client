import { baseApi } from "@/redux/api/baseApi"

const adminDashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllEmployee: builder.query({
            query: (employeeInfo) =>({
                url: "/employee/all",
                method: "GET",
                body: employeeInfo
            }),
            providesTags: ['employee'],
        }),
    })
})

export const {useGetAllEmployeeQuery, } = adminDashboardApi;