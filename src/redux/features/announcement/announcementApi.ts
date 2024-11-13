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
        getAllAnnouncement: builder.query({
            query: (announcementInfo) =>({
                url: "/announcement/all",
                method: "GET",
                body: announcementInfo
            }),
            providesTags: ['announcement'],
        }),
        getLatestAnnouncement: builder.query({
            query: (announcementInfo) =>({
                url: "/announcement/latest",
                method: "GET",
                body: announcementInfo
            }),
            providesTags: ['announcement'],
        }),
        // GetSingleEmployee: builder.query({
        //     query: (employeeId) =>({
        //         url: `/announcement/single/${employeeId}`,
        //         method: "GET",
        //     }),
        //     providesTags: ['employee'],
        // }),
        // updateEmployee: builder.mutation({
        //     query: (options) =>({
        //         url: `/announcement/update/${options.id}`,
        //         method: "PUT",
        //         body: options.data,
        //     }),
        //     invalidatesTags: ['employee'],
        // }),
        deleteAnnouncement: builder.mutation({
            query: (id) =>({
                url: `/announcement/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['announcement'],
        }),
    })
})

export const {useAddAnnouncementMutation, useGetAllAnnouncementQuery, useGetLatestAnnouncementQuery, useDeleteAnnouncementMutation } = announcementApi;