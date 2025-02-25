import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyUser: builder.mutation({
      query: (id) => ({
        url: `/users/verify/${id}`,
        method: "PATCH",
        body: { id },
      }),
      invalidatesTags: [tagTypes.user, tagTypes.admin, tagTypes.agent, tagTypes.customer],
    }),
    toggleUserStatus: builder.mutation({
      query: (id) => ({
        url: `/users/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.admin, tagTypes.agent, tagTypes.customer],
    }),
  }),
});

export const { useVerifyUserMutation, useToggleUserStatusMutation } = userApi;
