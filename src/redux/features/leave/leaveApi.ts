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
        // getMonthlyLeaveCounts: builder.query({
        //     query: (leaveInfo) => ({
        //       url: "/leave/leave-counts",
        //       method: "GET",
        //       params: {
        //         employeeId: leaveInfo.employeeId,  // Pass employeeId as query parameter
        //         year: leaveInfo.year,              // Pass year as query parameter
        //         month: leaveInfo.month,            // Pass month as query parameter
        //       }
        //     }),
        //     providesTags: ['leave'],
        // }),


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
    useGetMonthlyLeaveCountsQuery,
    useGetSingleLeaveQuery,
    useGetCountLeaveTypeQuery,
    useCreateLeaveMutation,
    useUpdateLeaveMutation,
    useDeleteLeaveMutation} = leaveApi;