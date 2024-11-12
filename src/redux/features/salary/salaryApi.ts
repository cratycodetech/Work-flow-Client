import { baseApi } from "@/redux/api/baseApi"

const salaryApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllSalary: builder.query({
            query: (salaryInfo) =>({
                url: "/salary/all",
                method: "GET",
                body: salaryInfo
            }),
            providesTags: ['salary'],
        }),
    })
})

export const { useGetAllSalaryQuery} = salaryApi;