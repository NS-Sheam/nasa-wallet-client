import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const cashOutRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCashOutRequests: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/cash-out-requests`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.cashOutRequest],
    }),
    addCashOutRequest: builder.mutation({
      query: (payload) => ({
        url: "/cash-out-requests",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.cashOutRequest],
    }),
    updateCashOutRequest: builder.mutation({
      query: (payload) => ({
        url: `/cash-out-requests/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [tagTypes.cashOutRequest],
    }),
  }),
});

export const { useGetAllCashOutRequestsQuery, useAddCashOutRequestMutation, useUpdateCashOutRequestMutation } =
  cashOutRequestApi;
