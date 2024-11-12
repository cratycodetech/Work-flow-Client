import { baseApi } from "@/redux/api/baseApi"

const announcementApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        addAnnouncement: builder.mutation({
            query: (announcementInfo) =>({
                url: "/announcement/create",
                method: "POST",
                body: announcementInfo
            }),
            invalidatesTags: ['announcement'],
        }),
        getAllEmployee: builder.query({
            query: (employeeInfo) =>({
                url: "/announcement/all",
                method: "GET",
                body: employeeInfo
            }),
            providesTags: ['employee'],
        }),
        GetSingleEmployee: builder.query({
            query: (employeeId) =>({
                url: `/announcement/single/${employeeId}`,
                method: "GET",
            }),
            providesTags: ['employee'],
        }),
        updateEmployee: builder.mutation({
            query: (options) =>({
                url: `/announcement/update/${options.id}`,
                method: "PUT",
                body: options.data,
            }),
            invalidatesTags: ['employee'],
        }),
        deleteEmployee: builder.mutation({
            query: (id) =>({
                url: `/announcement/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['employee'],
        }),
    })
})

export const {useAddEmployeeMutation, useGetAllEmployeeQuery, useGetSingleEmployeeQuery, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = announcementApi;