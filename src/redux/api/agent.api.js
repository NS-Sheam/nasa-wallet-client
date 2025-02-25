import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgents: builder.query({
      query: () => ({
        url: "/agents",
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.agent, tagTypes.user],
    }),
  }),
});

export const { useGetAllAgentsQuery } = agentApi;
