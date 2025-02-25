import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardData: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [tagTypes.dashboard],
    }),

    getAgentDashboardData: builder.query({
      query: () => ({
        url: "/dashboard/agent",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [tagTypes.dashboard],
    }),

    getCustomerDashboardData: builder.query({
      query: () => ({
        url: "/dashboard/customer",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetAdminDashboardDataQuery, useGetAgentDashboardDataQuery, useGetCustomerDashboardDataQuery } =
  dashboardApi;
