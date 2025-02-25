import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => ({
        url: "/transactions",
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["user", "transaction"],
    }),
    SendMoney: builder.mutation({
      query: (payload) => ({
        url: "/transactions/send-money",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    cashOut: builder.mutation({
      query: (payload) => ({
        url: "/transactions/cash-out",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
  }),
});

export const { useGetAllTransactionsQuery, useSendMoneyMutation, useCashOutMutation } = transactionApi;
