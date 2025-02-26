import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const cashInRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCashInRequests: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/cash-in-requests`,
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
      providesTags: [tagTypes.cashInRequest],
    }),
    addCashInRequest: builder.mutation({
      query: (payload) => ({
        url: "/cash-in-requests",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.cashInRequest],
    }),
    updateCashInRequest: builder.mutation({
      query: (payload) => ({
        url: `/cash-in-requests/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [tagTypes.cashInRequest],
    }),
  }),
});

export const { useGetAllCashInRequestsQuery, useAddCashInRequestMutation, useUpdateCashInRequestMutation } =
  cashInRequestApi;
