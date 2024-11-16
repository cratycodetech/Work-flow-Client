import { baseApi } from "@/redux/api/baseApi"

const attendanceApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getTodayTotalPresentEmployee: builder.query({
            query: (presentInfo) =>({
                url: "/attendance/TotalPresent",
                method: "GET",
                body: presentInfo
            }),
            providesTags: ['attendance'],
        }),
        getTodayTotalLateEmployee: builder.query({
            query: (lateInfo) =>({
                url: "/attendance/TotalLate",
                method: "GET",
                body: lateInfo
            }),
            providesTags: ['attendance'],
        }),
        getTodayTotalAbsentEmployee: builder.query({
            query: (absentInfo) =>({
                url: "/attendance/TotalAbsent",
                method: "GET",
                body: absentInfo
            }),
            providesTags: ['attendance'],
        }),
        getAllEmployeeMonthlyPresent: builder.query({
            query: (Info) =>({
                url: "/attendance/Total-Month-present",
                method: "GET",
                body: Info
            }),
            providesTags: ['attendance'],
        }),
        GetSingleEmployeeMonthlyPresent: builder.query({
            query: (employeeId) =>({
                url: `/attendance/monthly/${employeeId}`,
                method: "GET",
            }),
            providesTags: ['attendance'],
        }),
        GetSingleEmployeeMonthlyLate: builder.query({
            query: (employeeId) =>({
                url: `/attendance/monthly-late/${employeeId}`,
                method: "GET",
            }),
            providesTags: ['attendance'],
        }),
        getAllEmployeeAttendance: builder.query({
            query: (Info) =>({
                url: "/attendance/all",
                method: "GET",
                body: Info
            }),
            providesTags: ['attendance'],
        }),
        GetSingleEmployeeAttendance: builder.query({
            query: (employeeId) =>({
                url: `/attendance/single/${employeeId}`,
                method: "GET",
            }),
            providesTags: ['attendance'],
        }),
        CreateEmployeeAttendance: builder.mutation({
            query: (attendanceInfo) =>({
                url: "/attendance/create",
                method: "POST",
                body: attendanceInfo
            }),
            invalidatesTags: ['attendance'],
        }),
        updateEmployeeAttendance: builder.mutation({
            query: (options) =>({
                url: `/attendance/update/${options.id}`,
                method: "PUT",
                body: options.data,
            }),
            invalidatesTags: ['attendance'],
        }),
        deleteEmployeeAttendance: builder.mutation({
            query: (id) =>({
                url: `/attendance/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['attendance'],
        }),
        getTodayPresentCountEmployee: builder.query({
            query: (countInfo) =>({
                url: "/attendance/countPresent",
                method: "GET",
                body: countInfo
            }),
            providesTags: ['attendance'],
        }),
        getTodayAbsentCountEmployee: builder.query({
            query: (countInfo) =>({
                url: "/attendance/countAbsent",
                method: "GET",
                body: countInfo
            }),
            providesTags: ['attendance'],
        }),
    })
})

export const {
    useGetTodayTotalAbsentEmployeeQuery, 
    useGetTodayTotalLateEmployeeQuery, 
    useGetTodayTotalPresentEmployeeQuery,
    useGetAllEmployeeMonthlyPresentQuery,
    useGetSingleEmployeeMonthlyPresentQuery,
    useGetSingleEmployeeMonthlyLateQuery,
    useGetAllEmployeeAttendanceQuery,
    useGetSingleEmployeeAttendanceQuery,
    useCreateEmployeeAttendanceMutation,
    useUpdateEmployeeAttendanceMutation,
    useDeleteEmployeeAttendanceMutation,
    useGetTodayPresentCountEmployeeQuery,
    useGetTodayAbsentCountEmployeeQuery
} = attendanceApi;