import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (userInfo) =>({
                url: "/auth/admin/login",
                method: "POST",
                body: userInfo
            })
        }),
        signUp: builder.mutation({
            query: (userInfo) =>({
                url: "/auth/admin/signup",
                method: "POST",
                body: userInfo
            })
        }),
        resetPass: builder.mutation({
            query: (userInfo) =>({
                url: "/auth/reset-password",
                method: "POST",
                body: userInfo
            })
        }),
        logout: builder.mutation({
            query: (userInfo) =>({
                url: "/auth/logout",
                method: "POST",
                body: userInfo
            })
        }),
    })
})

export const {useLoginMutation, useSignUpMutation, useResetPassMutation, useLogoutMutation} = authApi