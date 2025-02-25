import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/agents`,
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
      providesTags: [tagTypes.agent, tagTypes.user],
    }),
  }),
});

export const { useGetAllAgentsQuery } = agentApi;
