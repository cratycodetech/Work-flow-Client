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
        GetSingleSalary: builder.query({
            query: (salaryId) =>({
                url: `/salary/single/${salaryId}`,
                method: "GET",
            }),
            providesTags: ['salary'],
        }),
        getCountDistributionSalary: builder.query({
            query: (salaryInfo) =>({
                url: "/salary/distribution",
                method: "GET",
                body: salaryInfo
            }),
            providesTags: ['salary'],
        }),
        getCountDeductionSalary: builder.query({
            query: (salaryInfo) =>({
                url: "/salary/deduction",
                method: "GET",
                body: salaryInfo
            }),
            providesTags: ['salary'],
        }),
        getCountPendingSalary: builder.query({
            query: (salaryInfo) =>({
                url: "/salary/pending",
                method: "GET",
                body: salaryInfo
            }),
            providesTags: ['salary'],
        }),
    })
})

export const {
     useGetAllSalaryQuery, 
     useGetSingleSalaryQuery,
     useGetCountDistributionSalaryQuery,
     useGetCountPendingSalaryQuery,
     useGetCountDeductionSalaryQuery
    } = salaryApi;