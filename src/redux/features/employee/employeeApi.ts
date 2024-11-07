import { baseApi } from "@/redux/api/baseApi"

const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        addEmployee: builder.mutation({
            query: (employeeInfo) =>({
                url: "/employee/create",
                method: "POST",
                body: employeeInfo
            }),
            invalidatesTags: ['employee'],
        }),
        getAllEmployee: builder.query({
            query: (employeeInfo) =>({
                url: "/employee/all",
                method: "GET",
                body: employeeInfo
            }),
            providesTags: ['employee'],
        }),
        GetSingleEmployee: builder.query({
            query: (employeeId) =>({
                url: `/employee/single/${employeeId}`,
                method: "GET",
            }),
            providesTags: ['employee'],
        }),
        updateEmployee: builder.mutation({
            query: (options) =>({
                url: `/employee/update/${options.id}`,
                method: "PUT",
                body: options.data,
            }),
            invalidatesTags: ['employee'],
        }),
        deleteEmployee: builder.mutation({
            query: (id) =>({
                url: `/employee/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['employee'],
        }),
    })
})

export const {useAddEmployeeMutation, useGetAllEmployeeQuery, useGetSingleEmployeeQuery, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeeApi;