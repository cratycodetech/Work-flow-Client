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
        // getMonthlyLeaveCounts: builder.query({
        //     query: (leaveInfo) =>({
        //         url: "/leave/leave-counts",
        //         method: "GET",
        //         body: leaveInfo
        //     }),
        //     providesTags: ['leave'],
        // }),

        getMonthlyLeaveCounts: builder.query({
            query: ({ employeeId, year, month }) => {
                const params = new URLSearchParams({
                    employeeId: employeeId || '',
                    year: year || '',
                    month: month || '',
                });
                return `/leave/leave-counts?${params.toString()}`;
            },
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
        getTodayLeaveStatusCount: builder.query({
            query: (leaveInfo) =>({
                url: "/leave/today-leave-status-counts",
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
    useGetMonthlyLeaveCountsQuery,
    useGetSingleLeaveQuery,
    useGetCountLeaveTypeQuery,
    useCreateLeaveMutation,
    useUpdateLeaveMutation,
    useDeleteLeaveMutation,
    useGetTodayLeaveStatusCountQuery
} = leaveApi;