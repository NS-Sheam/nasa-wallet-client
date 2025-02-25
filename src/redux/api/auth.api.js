import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
    getMyInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),

      providesTags: [tagTypes.user, tagTypes.admin, tagTypes.agent, tagTypes.customer, tagTypes.transaction],
    }),
  }),
});

export const { useLoginMutation, useCreateUserMutation, useChangePasswordMutation, useGetMyInfoQuery } = authApi;
