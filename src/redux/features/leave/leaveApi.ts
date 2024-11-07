import { baseApi } from "@/redux/api/baseApi"

const leaveApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllLeave: builder.query({
            query: (leaveInfo) =>({
                url: "/leave/all",
                method: "GET",
                body: leaveInfo
            }),
            providesTags: ['leave'],
        }),
        GetSingleLeave: builder.query({
            query: (leaveId) =>({
                url: `/leave/single/${leaveId}`,
                method: "GET",
            }),
            providesTags: ['leave'],
        }),
        getCountLeaveType: builder.query({
            query: (leaveInfo) =>({
                url: "/leave/type",
                method: "GET",
                body: leaveInfo
            }),
            providesTags: ['leave'],
        }),
        createLeave: builder.mutation({
            query: (leaveInfo) =>({
                url: "/leave/create",
                method: "POST",
                body: leaveInfo
            }),
            invalidatesTags: ['leave'],
        }),
        updateLeave: builder.mutation({
            query: (options) =>({
                url: `/leave/update/${options.id}`,
                method: "PUT",
                body: options.data,
            }),
            invalidatesTags: ['leave'],
        }),
        deleteLeave: builder.mutation({
            query: (id) =>({
                url: `/leave/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['leave'],
        }),
    })
})

export const { 
    useGetAllLeaveQuery,
    useGetSingleLeaveQuery,
    useGetCountLeaveTypeQuery,
    useCreateLeaveMutation,
    useUpdateLeaveMutation,
    useDeleteLeaveMutation} = leaveApi;