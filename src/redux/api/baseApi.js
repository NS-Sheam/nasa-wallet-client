import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { createApi } from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../features/auth.Slice";
import { toast } from "react-toastify";
import { tagTypeList } from "../tagType";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);

  if (result?.error?.statusCode === 401) {
    const res = await fetch("http://localhost:7000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    if (result.error) {
      toast.error(result?.error?.message);
    }
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = api.getState().auth.user;
      result = await baseQuery(arg, api, extraOptions);
      api.dispatch(setUser({ user, token: data.data.accessToken }));
    } else {
      api.dispatch(logOut());
    }
  }
  // if (result.error) {
  //   console.log(result.error);

  //   toast.error(result?.error?.data?.errorSources[0].message || result?.error?.data?.message);
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
